/**
 * Celestia Virtual Texture (VT) loader for planetarium.Earth
 *
 * Parses a Celestia .ctx VirtualTexture descriptor, loads levelN/tx_X_Y tiles,
 * stitches them into a single equirectangular canvas, and returns a THREE.Texture.
 *
 * Tile layout (BaseSplit 0, equirectangular 2:1):
 *   level L → cols = 2^(L+1), rows = 2^L
 *   tx_X_Y: X west→east, Y north→south (Y=0 at top of image)
 *
 * Usage (global):
 *   CelestiaVTLoader.load(ctxUrl, { quality, maxWidth, maxHeight, onProgress, onTileProgress })
 *     → Promise<THREE.Texture>
 */
(function (global) {
    'use strict';

    const DEFAULT_MAX_WIDTH = 8192;
    const DEFAULT_MAX_HEIGHT = 4096;
    const TILE_CONCURRENCY = 8;

    /**
     * Encode each path segment so spaces and special chars work with fetch/img.
     * Preserves leading ./ and does not encode slashes.
     */
    function encodePathUrl(path) {
        if (!path) return path;
        const parts = path.split('/');
        return parts.map((seg, i) => {
            // Keep empty segments (leading/trailing slash) and protocol-ish bits
            if (seg === '' || seg === '.' || seg === '..') return seg;
            // Don't double-encode
            try {
                if (decodeURIComponent(seg) !== seg) return seg;
            } catch (e) { /* fall through */ }
            return encodeURIComponent(seg);
        }).join('/');
    }

    function dirname(url) {
        const q = url.indexOf('?');
        const clean = q >= 0 ? url.slice(0, q) : url;
        const i = clean.lastIndexOf('/');
        return i >= 0 ? clean.slice(0, i + 1) : './';
    }

    /**
     * Parse Celestia VirtualTexture { ... } text.
     * @returns {{ imageDirectory: string, baseSplit: number, tileSize: number, tileType: string }}
     */
    function parseCtxText(text) {
        const blockMatch = text.match(/VirtualTexture\s*\{([\s\S]*?)\}/i);
        if (!blockMatch) {
            throw new Error('CelestiaVTLoader: no VirtualTexture block found in .ctx');
        }
        const body = blockMatch[1];
        const getStr = (key, fallback) => {
            const m = body.match(new RegExp(key + '\\s+"([^"]+)"', 'i'));
            return m ? m[1] : fallback;
        };
        const getNum = (key, fallback) => {
            const m = body.match(new RegExp(key + '\\s+(\\d+)', 'i'));
            return m ? parseInt(m[1], 10) : fallback;
        };

        const imageDirectory = getStr('ImageDirectory', null);
        if (!imageDirectory) {
            throw new Error('CelestiaVTLoader: ImageDirectory missing in .ctx');
        }
        return {
            imageDirectory,
            baseSplit: getNum('BaseSplit', 0),
            tileSize: getNum('TileSize', 512),
            tileType: (getStr('TileType', 'png') || 'png').replace(/^\./, '')
        };
    }

    /**
     * Grid size at level L for equirectangular VT.
     * Celestia: with BaseSplit B, level 0 has 2^(B+1) × 2^B tiles.
     */
    function gridForLevel(level, baseSplit) {
        const L = level + baseSplit;
        return {
            cols: Math.pow(2, L + 1),
            rows: Math.pow(2, L)
        };
    }

    /**
     * Output size cap for quality tier (before GPU maxTextureSize clamp).
     */
    function qualityOutputCap(quality, maxWidth, maxHeight, maxTextureSize) {
        const capW = Math.min(maxWidth || DEFAULT_MAX_WIDTH, maxTextureSize || DEFAULT_MAX_WIDTH);
        const capH = Math.min(maxHeight || DEFAULT_MAX_HEIGHT, maxTextureSize || DEFAULT_MAX_HEIGHT);
        if (quality === 'Low') {
            return { maxWidth: Math.min(capW, 2048), maxHeight: Math.min(capH, 1024) };
        }
        if (quality === 'Medium') {
            return { maxWidth: Math.min(capW, 4096), maxHeight: Math.min(capH, 2048) };
        }
        // High / Max: full app cap (8K×4K by default)
        return { maxWidth: capW, maxHeight: capH };
    }

    /**
     * Choose VT level from discovered existing levels + quality.
     * Prefers highest level that fits under the output cap; otherwise highest available
     * (caller will downscale). Max/High aim high; Low/Medium stay coarse when possible.
     */
    function pickLevelFromAvailable(quality, existingLevels, baseSplit, tileSizeEstimate, maxWidth, maxHeight) {
        if (!existingLevels || !existingLevels.length) {
            throw new Error('CelestiaVTLoader: no VT levels available');
        }
        const sorted = existingLevels.slice().sort((a, b) => a - b);
        const maxExisting = sorted[sorted.length - 1];

        // Preferred minimum level by quality (soft target)
        let preferred;
        switch (quality) {
            case 'Low': preferred = 0; break;
            case 'Medium': preferred = 0; break;
            case 'High': preferred = 2; break;
            case 'Max': preferred = 3; break;
            default: preferred = 0; break;
        }

        // Highest level whose estimated full size fits under maxWidth×maxHeight
        let bestFitting = sorted[0];
        for (let i = 0; i < sorted.length; i++) {
            const L = sorted[i];
            const { cols, rows } = gridForLevel(L, baseSplit);
            const w = cols * tileSizeEstimate;
            const h = rows * tileSizeEstimate;
            if (w <= maxWidth && h <= maxHeight) bestFitting = L;
        }

        if (quality === 'Max' || quality === 'High') {
            // Use best detail that fits; if nothing fits, use max existing (downscale later)
            const candidates = sorted.filter((L) => L >= Math.min(preferred, maxExisting));
            // Prefer bestFitting if it's at least as detailed as preferred-or-available
            if (sorted.indexOf(bestFitting) >= 0) {
                // Take the max of bestFitting and any preferred that still fits
                let chosen = bestFitting;
                for (let i = 0; i < sorted.length; i++) {
                    const L = sorted[i];
                    const { cols, rows } = gridForLevel(L, baseSplit);
                    if (cols * tileSizeEstimate <= maxWidth && rows * tileSizeEstimate <= maxHeight) {
                        chosen = L;
                    }
                }
                return chosen;
            }
            return maxExisting;
        }

        // Low / Medium: prefer coarse level if present
        if (sorted.indexOf(preferred) >= 0) return preferred;
        return sorted[0];
    }

    /** Probe level0..maxProbe for tx_0_0 existence; return sorted list of available levels. */
    async function discoverLevels(baseUrl, dirEnc, ext, maxProbe) {
        const found = [];
        const limit = maxProbe == null ? 6 : maxProbe;
        for (let L = 0; L <= limit; L++) {
            const probe = baseUrl + dirEnc + '/level' + L + '/tx_0_0.' + ext;
            try {
                await loadImage(probe);
                found.push(L);
            } catch (e) {
                // sparse pyramids (e.g. only level4) — keep scanning
            }
        }
        return found;
    }

    function loadImage(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error('Failed to load tile: ' + url));
            img.src = url;
        });
    }

    async function mapPool(items, limit, worker) {
        const results = new Array(items.length);
        let next = 0;
        async function run() {
            while (next < items.length) {
                const i = next++;
                results[i] = await worker(items[i], i);
            }
        }
        const runners = [];
        for (let r = 0; r < Math.min(limit, items.length); r++) {
            runners.push(run());
        }
        await Promise.all(runners);
        return results;
    }

    function makeGrayTile(size) {
        const c = document.createElement('canvas');
        c.width = size;
        c.height = size;
        const ctx = c.getContext('2d');
        ctx.fillStyle = '#808080';
        ctx.fillRect(0, 0, size, size);
        return c;
    }

    /**
     * @param {string} ctxUrl - path to .ctx file (may contain spaces)
     * @param {object} options
     * @param {string} [options.quality] - None|Low|Medium|High|Max
     * @param {number} [options.maxWidth]
     * @param {number} [options.maxHeight]
     * @param {number} [options.maxTextureSize]
     * @param {number} [options.level] - force level
     * @param {function} [options.onTileProgress] - (loaded, total) => void
     * @returns {Promise<THREE.Texture>}
     */
    async function load(ctxUrl, options) {
        options = options || {};
        if (typeof THREE === 'undefined') {
            throw new Error('CelestiaVTLoader requires THREE.js');
        }

        const encodedCtx = encodePathUrl(ctxUrl);
        const resp = await fetch(encodedCtx);
        if (!resp.ok) {
            throw new Error('CelestiaVTLoader: failed to fetch ' + ctxUrl + ' (' + resp.status + ')');
        }
        const text = await resp.text();
        const meta = parseCtxText(text);
        const baseUrl = dirname(encodedCtx);
        const ext = meta.tileType;
        const dirEnc = encodePathUrl(meta.imageDirectory);
        const quality = options.quality || 'Medium';

        const maxTextureSize = options.maxTextureSize || DEFAULT_MAX_WIDTH;
        const outCap = qualityOutputCap(
            quality,
            options.maxWidth || DEFAULT_MAX_WIDTH,
            options.maxHeight || DEFAULT_MAX_HEIGHT,
            maxTextureSize
        );
        const outMaxW = outCap.maxWidth;
        const outMaxH = outCap.maxHeight;

        // Discover which levels exist on disk for this tier (sparse pyramids OK)
        const existing = await discoverLevels(baseUrl, dirEnc, ext, 6);
        if (!existing.length) {
            throw new Error('CelestiaVTLoader: no tiles found under ' + baseUrl + dirEnc);
        }

        // Probe a mid/high existing level for real tile pixel size (ctx TileSize is often wrong)
        const probeLevel = existing[existing.length - 1];
        const probeImg = await loadImage(baseUrl + dirEnc + '/level' + probeLevel + '/tx_0_0.' + ext);
        const tileSizeEstimate = probeImg.width || meta.tileSize || 512;

        let level;
        if (typeof options.level === 'number') {
            level = options.level;
            if (existing.indexOf(level) < 0) {
                throw new Error('CelestiaVTLoader: requested level ' + level + ' not found');
            }
        } else {
            level = pickLevelFromAvailable(
                quality,
                existing,
                meta.baseSplit,
                tileSizeEstimate,
                outMaxW,
                outMaxH
            );
        }

        const { cols: useCols, rows: useRows } = gridForLevel(level, meta.baseSplit);
        const levelFirstUrl = baseUrl + dirEnc + '/level' + level + '/tx_0_0.' + ext;
        const levelFirstImg = (level === probeLevel)
            ? probeImg
            : await loadImage(levelFirstUrl);
        const levelTileW = levelFirstImg.width || tileSizeEstimate;
        const levelTileH = levelFirstImg.height || tileSizeEstimate;

        const fullW = useCols * levelTileW;
        const fullH = useRows * levelTileH;

        const jobs = [];
        for (let y = 0; y < useRows; y++) {
            for (let x = 0; x < useCols; x++) {
                jobs.push({
                    x: x,
                    y: y,
                    url: baseUrl + dirEnc + '/level' + level + '/tx_' + x + '_' + y + '.' + ext,
                    isFirst: x === 0 && y === 0
                });
            }
        }

        let loaded = 0;
        const total = jobs.length;
        const gray = makeGrayTile(levelTileW);

        const images = await mapPool(jobs, TILE_CONCURRENCY, async (job) => {
            try {
                const img = job.isFirst ? levelFirstImg : await loadImage(job.url);
                loaded++;
                if (options.onTileProgress) options.onTileProgress(loaded, total);
                return { x: job.x, y: job.y, img: img };
            } catch (e) {
                console.warn('CelestiaVTLoader: missing tile, using gray', job.url);
                loaded++;
                if (options.onTileProgress) options.onTileProgress(loaded, total);
                return { x: job.x, y: job.y, img: gray };
            }
        });

        // Stitch at full resolution using real tile pixel size; then scale to output cap
        const stitch = document.createElement('canvas');
        stitch.width = fullW;
        stitch.height = fullH;
        const sctx = stitch.getContext('2d');
        sctx.fillStyle = '#808080';
        sctx.fillRect(0, 0, fullW, fullH);
        for (let i = 0; i < images.length; i++) {
            const t = images[i];
            sctx.drawImage(t.img, t.x * levelTileW, t.y * levelTileH, levelTileW, levelTileH);
        }

        let outCanvas = stitch;
        let outW = fullW;
        let outH = fullH;
        const scale = Math.min(outMaxW / fullW, outMaxH / fullH, 1);
        if (scale < 1) {
            outW = Math.max(1, Math.round(fullW * scale));
            outH = Math.max(1, Math.round(fullH * scale));
            outCanvas = document.createElement('canvas');
            outCanvas.width = outW;
            outCanvas.height = outH;
            const octx = outCanvas.getContext('2d');
            octx.imageSmoothingEnabled = true;
            octx.imageSmoothingQuality = 'high';
            octx.drawImage(stitch, 0, 0, outW, outH);
        }

        const texture = new THREE.CanvasTexture(outCanvas);
        texture.needsUpdate = true;
        // Color maps: sRGB. Normal maps: leave linear (options.linearEncoding === true).
        const wantLinear = !!options.linearEncoding;
        if (!wantLinear && 'encoding' in texture && THREE.sRGBEncoding !== undefined) {
            texture.encoding = THREE.sRGBEncoding;
        }
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        // r132 CanvasTexture may leave userData undefined — guard before write
        if (!texture.userData) texture.userData = {};
        texture.userData.celestiaVT = {
            ctxUrl: ctxUrl,
            level: level,
            tileSize: { w: levelTileW, h: levelTileH },
            fullSize: { w: fullW, h: fullH },
            outputSize: { w: outW, h: outH }
        };
        return texture;
    }

    /**
     * Fire-and-forget helper: returns a THREE.Texture immediately; fills image when ready.
     * Calls onComplete(texture) or onError(err). Still resolves progress via callbacks.
     */
    function loadIntoTexture(ctxUrl, targetTexture, options) {
        options = options || {};
        return load(ctxUrl, options).then((tex) => {
            targetTexture.image = tex.image;
            targetTexture.needsUpdate = true;
            targetTexture.generateMipmaps = true;
            if ('encoding' in targetTexture) {
                if (options.linearEncoding) {
                    // leave linear (Three r132 default); do not copy sRGB from color path
                    if (THREE.LinearEncoding !== undefined) {
                        targetTexture.encoding = THREE.LinearEncoding;
                    }
                } else if (tex.encoding !== undefined) {
                    targetTexture.encoding = tex.encoding;
                }
            }
            targetTexture.wrapS = tex.wrapS;
            targetTexture.wrapT = tex.wrapT;
            targetTexture.userData = Object.assign(
                {},
                targetTexture.userData || {},
                tex.userData || {}
            );
            if (options.onComplete) options.onComplete(targetTexture);
            return targetTexture;
        }).catch((err) => {
            if (options.onError) options.onError(err);
            throw err;
        });
    }

    global.CelestiaVTLoader = {
        load: load,
        loadIntoTexture: loadIntoTexture,
        parseCtxText: parseCtxText,
        encodePathUrl: encodePathUrl,
        pickLevelFromAvailable: pickLevelFromAvailable,
        qualityOutputCap: qualityOutputCap,
        gridForLevel: gridForLevel,
        DEFAULT_MAX_WIDTH: DEFAULT_MAX_WIDTH,
        DEFAULT_MAX_HEIGHT: DEFAULT_MAX_HEIGHT
    };
})(typeof window !== 'undefined' ? window : this);
