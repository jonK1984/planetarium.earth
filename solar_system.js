
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const cname = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(cname) === 0) {
            return c.substring(cname.length, c.length);
        }
    }
    return "";
}

function isMobileDevice() {
    const userAgent = navigator.userAgent.toLowerCase();
    return /mobile|android|iphone|ipad|ipod|blackberry|windows phone/i.test(userAgent);
    /*let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;*/
}

const isMobileBool = isMobileDevice();

function setupSlideNavigation() {
    const slides = document.querySelectorAll('#gettingStartedSlides .slide');
    const dots = document.querySelectorAll('#slideNav .slide-dot');
    const maxSlide = slides.length;
    const minSlide = 0;

    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none';
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        currentSlide = index;
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });

    // Add swipe gesture support
    if (isMobileBool)
    {
        const slideContainer = document.getElementById('gettingStartedSlides');
        let touchStartX = 0;
        let touchEndX = 0;

        slideContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        slideContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const swipeDistance = touchEndX - touchStartX;
            const swipeThreshold = 50; // Minimum distance to register a swipe
            if (swipeDistance > swipeThreshold) {
                // Swipe right: go to previous slide
                if( currentSlide - 1 >= minSlide ) showSlide(currentSlide - 1);
            } else if (swipeDistance < -swipeThreshold) {
                // Swipe left: go to next slide
                if( currentSlide + 1 <= maxSlide ) showSlide(currentSlide + 1);
            }
        });
    }
    showSlide(0); // Initialize first slide
}

function showGettingStartedPopup() {
    return new Promise((resolve) => {
        const popup = document.getElementById('gettingStartedPopup');
        const safeModeButton = document.getElementById('safeModeButton');
        const currentSettingsButton = document.getElementById('currentSettingsButton');
        const recommendedSettingsButton = document.getElementById('recommendedSettingsButton');
        //const closeButton = document.getElementById('closeGettingStarted');
        const dontShowAgainCheckbox = document.getElementById('dontShowAgain');

        popup.style.display = 'block';

        // Setup slide navigation
        setupSlideNavigation();

        function closePopup() {
            popup.style.display = 'none';
            if (dontShowAgainCheckbox.checked) {
                setCookie('hideGettingStarted', 'true', 365);
            }
            resolve();
        }

        // Safe Mode: Lowest settings
        safeModeButton.addEventListener('click', () => {
            textureSize = 'None';
            areShadersEnabled = 'OFF';
            logarithmicDepthBuffer = 'OFF';
            complexMeshes = 'OFF';
            anisotropicFiltering = 'OFF';
            antiAliasing = 'OFF';
            pixelRatio = '0.5';
            setCookie('textureSize', textureSize, 30);
            setCookie('anisotropicFiltering', anisotropicFiltering, 30);
            setCookie('antiAliasing', antiAliasing, 30);
            setCookie('areShadersEnabled', areShadersEnabled, 30);
            setCookie('useLogDepthBuffer', logarithmicDepthBuffer, 30);
            setCookie('useComplexMeshes', complexMeshes, 30);
            setCookie('pixelRatio', pixelRatio, 30);
            closePopup();
        });

        // Current: Keep existing settings
        currentSettingsButton.addEventListener('click', () => {
            closePopup();
        });

        // Recommended: High-quality settings
        recommendedSettingsButton.addEventListener('click', () => {
            textureSize = 'Medium';
            areShadersEnabled = 'OFF';
            logarithmicDepthBuffer = 'ON';
            complexMeshes = 'ON';
            anisotropicFiltering = 'ON';
            antiAliasing = 'OFF';
            pixelRatio = '1.0';
            setCookie('textureSize', textureSize, 30);
            setCookie('anisotropicFiltering', anisotropicFiltering, 30);
            setCookie('antiAliasing', antiAliasing, 30);
            setCookie('areShadersEnabled', areShadersEnabled, 30);
            setCookie('useLogDepthBuffer', logarithmicDepthBuffer, 30);
            setCookie('useComplexMeshes', complexMeshes, 30);
            setCookie('pixelRatio', pixelRatio, 30);
            closePopup();
        });

        
    });
}

initializeSimulation();

async function initializeSimulation() {
    if (!getCookie('hideGettingStarted')) {
        document.getElementById('gettingStartedPopup').style.display = 'block';
        await showGettingStartedPopup();
    }
    // Resume simulation initialization here
    document.getElementById('loadingPopup').style.display = 'block';

    console.log('Starting simulation...'); // Replace with init() or equivalent


let updateConstants = true;

//Load Settings
const SHADER_OPTION_KEYS = [
    'shaderSunTurbulence',
    'shaderSunCorona',
    'shaderSunFlares',
    'shaderSunGlare',
    'shaderEarthNight',
    'shaderSoftLighting',
    'shaderRingLighting',
    'shaderMoonShadows',
    'shaderBloom',
    'shaderCloudMotion',
    'shaderAurora',
    'shaderIoGlow'
];

const SHADER_OPTION_LABELS = {
    shaderSunTurbulence: 'Sun Surface Turbulence',
    shaderSunCorona: 'Sun Corona & Fresnel',
    shaderSunFlares: 'Sun Plasma Flares & Ejecta',
    shaderSunGlare: 'Sun Glare & Horizon Rays',
    shaderEarthNight: 'Earth Night Lights',
    shaderSoftLighting: 'Soft Terminator Lighting',
    shaderRingLighting: 'Ring Lighting & Shadows',
    shaderMoonShadows: 'Moon Shadows on Planets',
    shaderBloom: 'Bloom & Tone Mapping',
    shaderCloudMotion: 'Cloud Motion',
    shaderAurora: 'Planet Auroras (Earth & Jupiter)',
    shaderIoGlow: 'Io Volcanic Glow'
};

/** Max moons fed to surface shaders for analytic umbra (must match GLSL MAX_MOON_SHADOWS). */
const MAX_MOON_SHADOWS = 8;

const defaultSettings = {
    pixelRatio: 0.5,
    anisotropicFiltering: 'ON',
    antiAliasing: 'OFF',
    textureSize: 'Medium',
    fpsVisible: true,
    areShadersEnabled: 'OFF',
    useComplexMeshes: 'OFF',  // New setting, default OFF
    useLogDepthBuffer: 'ON',
    // Discrete advanced-shader sub-options (defaults ON for first master-ON experience)
    shaderSunTurbulence: 'ON',
    shaderSunCorona: 'ON',
    shaderSunFlares: 'ON',
    shaderSunGlare: 'ON',
    shaderEarthNight: 'ON',
    shaderSoftLighting: 'ON',
    shaderRingLighting: 'ON',
    shaderMoonShadows: 'ON',
    shaderBloom: 'ON',
    shaderCloudMotion: 'ON',
    shaderAurora: 'ON',
    shaderIoGlow: 'ON'
};


// Near the top, after existing settings load
const defaultVideoSettings = {
    fpsVisible: true,
    planetOrbitsVisible: false,
    moonOrbitsVisible: false,
    planetTrailsVisible: true,
    moonTrailsVisible: true,
    planetRingsVisible: true,
    backdropVisible: true,
    ambientIntensity: 0.1,
    asteroidBeltsVisible: true,
    largeControls: false, // Add default value
    asteroidOrbitsVisible: false, // New setting
    asteroidTrailsVisible: true   // New setting
};


// Load video settings from cookies or use defaults
const videoSettings = {
    fpsVisible: getCookie('fpsVisible') !== "" ? getCookie('fpsVisible') === 'true' : defaultVideoSettings.fpsVisible,
    planetOrbitsVisible: getCookie('planetOrbitsVisible') !== "" ? getCookie('planetOrbitsVisible') === 'true' : defaultVideoSettings.planetOrbitsVisible,
    moonOrbitsVisible: getCookie('moonOrbitsVisible') !== "" ? getCookie('moonOrbitsVisible') === 'true' : defaultVideoSettings.moonOrbitsVisible,
    planetTrailsVisible: getCookie('planetTrailsVisible') !== "" ? getCookie('planetTrailsVisible') === 'true' : defaultVideoSettings.planetTrailsVisible,
    moonTrailsVisible: getCookie('moonTrailsVisible') !== "" ? getCookie('moonTrailsVisible') === 'true' : defaultVideoSettings.moonTrailsVisible,
    planetRingsVisible: getCookie('planetRingsVisible') !== "" ? getCookie('planetRingsVisible') === 'true' : defaultVideoSettings.planetRingsVisible,
    backdropVisible: getCookie('backdropVisible') !== "" ? getCookie('backdropVisible') === 'true' : defaultVideoSettings.backdropVisible,
    ambientIntensity: parseFloat(getCookie('ambientIntensity')) || defaultVideoSettings.ambientIntensity,
    asteroidBeltsVisible: getCookie('asteroidBeltsVisible') !== "" ? getCookie('asteroidBeltsVisible') === 'true' : defaultVideoSettings.asteroidBeltsVisible,
    largeControls: getCookie('largeControls') !== "" ? getCookie('largeControls') === 'true' : defaultVideoSettings.largeControls,
    asteroidOrbitsVisible: getCookie('asteroidOrbitsVisible') !== "" ? getCookie('asteroidOrbitsVisible') === 'true' : defaultVideoSettings.asteroidOrbitsVisible,
    asteroidTrailsVisible: getCookie('asteroidTrailsVisible') !== "" ? getCookie('asteroidTrailsVisible') === 'true' : defaultVideoSettings.asteroidTrailsVisible
};

// Load settings from cookies or use defaults
// Update the settings load section
const settings = {
    pixelRatio: parseFloat(getCookie('pixelRatio')) || defaultSettings.pixelRatio,
    anisotropicFiltering: getCookie('anisotropicFiltering') || defaultSettings.anisotropicFiltering,
    antiAliasing: getCookie('antiAliasing') || defaultSettings.antiAliasing,
    textureSize: getCookie('textureSize') || defaultSettings.textureSize,
    areShadersEnabled: getCookie('areShadersEnabled') || defaultSettings.areShadersEnabled,
    useComplexMeshes: getCookie('useComplexMeshes') || defaultSettings.useComplexMeshes,  // Add new setting
    useLogDepthBuffer: getCookie('useLogDepthBuffer') || defaultSettings.useLogDepthBuffer,  // Add new setting
    shaderSunTurbulence: getCookie('shaderSunTurbulence') || defaultSettings.shaderSunTurbulence,
    shaderSunCorona: getCookie('shaderSunCorona') || defaultSettings.shaderSunCorona,
    shaderSunFlares: getCookie('shaderSunFlares') || defaultSettings.shaderSunFlares,
    shaderSunGlare: getCookie('shaderSunGlare') || defaultSettings.shaderSunGlare,
    shaderEarthNight: getCookie('shaderEarthNight') || defaultSettings.shaderEarthNight,
    shaderSoftLighting: getCookie('shaderSoftLighting') || defaultSettings.shaderSoftLighting,
    shaderRingLighting: getCookie('shaderRingLighting') || defaultSettings.shaderRingLighting,
    shaderMoonShadows: getCookie('shaderMoonShadows') || defaultSettings.shaderMoonShadows,
    shaderBloom: getCookie('shaderBloom') || defaultSettings.shaderBloom,
    shaderCloudMotion: getCookie('shaderCloudMotion') || defaultSettings.shaderCloudMotion,
    shaderAurora: getCookie('shaderAurora') || defaultSettings.shaderAurora,
    shaderIoGlow: getCookie('shaderIoGlow') || defaultSettings.shaderIoGlow
};

/** True when master Advanced Shaders is ON and the named sub-option is ON. */
function isShaderOn(key) {
    return settings.areShadersEnabled === 'ON' && settings[key] === 'ON';
}


// Set TEXTURE_PATH based on textureSize
const TEXTURE_PATH_MAX = "./textures_mx/";
const TEXTURE_PATH_HIGH = "./textures_hi/";
const TEXTURE_PATH_MEDIUM = "./textures_md/";
const TEXTURE_PATH_LOW = "./textures_lo/";
const TEXTURE_PATH_NONE = ""; // No textures

let TEXTURE_PATH = TEXTURE_PATH_MEDIUM;
setTexturePath(settings.textureSize);

function setTexturePath(size) {
    switch (size) {
        case 'None': TEXTURE_PATH = TEXTURE_PATH_NONE; break;
        case 'Low': TEXTURE_PATH = TEXTURE_PATH_LOW; break;
        case 'Medium': TEXTURE_PATH = TEXTURE_PATH_MEDIUM; break;
        case 'High': TEXTURE_PATH = TEXTURE_PATH_HIGH; break;
        case 'Max': TEXTURE_PATH = TEXTURE_PATH_MAX; break;
        default: TEXTURE_PATH = TEXTURE_PATH_MAX; // Fallback
    }
    console.log(`Texture Path set to: ${TEXTURE_PATH}`);
}





// WebGL 2.0 is required (volumetric auroras, log depth, advanced shaders).
// (WebGL2RenderingContext also inherits from WebGLRenderingContext, so instanceof WebGLRenderingContext is not a WebGL1 test.)
function supportsWebGL2() {
    try {
        const probe = document.createElement('canvas');
        return !!(probe.getContext('webgl2'));
    } catch (e) {
        return false;
    }
}
const hasWebGL2 = supportsWebGL2();
if (!hasWebGL2) {
    console.error('planetarium.Earth requires WebGL 2.0. This browser only exposes WebGL 1.0.');
    alert('This simulation requires WebGL 2.0.\nPlease use a current version of Chrome, Edge, Firefox, or Safari.');
}
if (settings.useLogDepthBuffer === 'ON' && !hasWebGL2) {
    console.warn('Logarithmic depth buffer requires WebGL 2.0, but only WebGL 1.0 is available.');
    settings.useLogDepthBuffer = 'OFF';
}

// Initialize renderer with settings (Three.js prefers WebGL2 when available)
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('canvas'),
    antialias: settings.antiAliasing === 'ON', // Simple boolean toggle
    logarithmicDepthBuffer: settings.useLogDepthBuffer === 'ON' // Enable logarithmic depth
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio * settings.pixelRatio);
const gl = renderer.getContext();
if (hasWebGL2 && !(gl instanceof WebGL2RenderingContext)) {
    console.warn('WebGL 2.0 is available but Three.js did not create a WebGL2 context.');
}

// Tone mapping when bloom package is enabled
if (isShaderOn('shaderBloom')) {
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    if (THREE.sRGBEncoding !== undefined) {
        renderer.outputEncoding = THREE.sRGBEncoding;
    }
}

// ---------------------------------------------------------------------------
// Lightweight bloom (render target + bright extract + separable blur + combine)
// ---------------------------------------------------------------------------
let bloomPipeline = null;
function createBloomPipeline() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const pr = renderer.getPixelRatio();
    const rtOpts = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat };
    const sceneRT = new THREE.WebGLRenderTarget(w * pr, h * pr, rtOpts);
    const brightRT = new THREE.WebGLRenderTarget(w * pr * 0.5, h * pr * 0.5, rtOpts);
    const blurRT = new THREE.WebGLRenderTarget(w * pr * 0.5, h * pr * 0.5, rtOpts);

    const quadGeo = new THREE.PlaneGeometry(2, 2);
    const brightMat = new THREE.ShaderMaterial({
        uniforms: {
            tDiffuse: { value: null },
            threshold: { value: 0.72 }
        },
        vertexShader: ss_shaders.bloomCompositeVertex,
        fragmentShader: ss_shaders.bloomBrightFragment,
        depthTest: false,
        depthWrite: false
    });
    const blurMat = new THREE.ShaderMaterial({
        uniforms: {
            tDiffuse: { value: null },
            direction: { value: new THREE.Vector2(1, 0) },
            resolution: { value: new THREE.Vector2(w * pr * 0.5, h * pr * 0.5) }
        },
        vertexShader: ss_shaders.bloomCompositeVertex,
        fragmentShader: ss_shaders.bloomBlurFragment,
        depthTest: false,
        depthWrite: false
    });
    const combineMat = new THREE.ShaderMaterial({
        uniforms: {
            tDiffuse: { value: null },
            tBloom: { value: null },
            strength: { value: 0.55 }
        },
        vertexShader: ss_shaders.bloomCompositeVertex,
        fragmentShader: ss_shaders.bloomCombineFragment,
        depthTest: false,
        depthWrite: false
    });

    const brightScene = new THREE.Scene();
    const blurScene = new THREE.Scene();
    const combineScene = new THREE.Scene();
    const brightQuad = new THREE.Mesh(quadGeo, brightMat);
    const blurQuad = new THREE.Mesh(quadGeo, blurMat);
    const combineQuad = new THREE.Mesh(quadGeo, combineMat);
    brightScene.add(brightQuad);
    blurScene.add(blurQuad);
    combineScene.add(combineQuad);
    const orthoCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    return {
        sceneRT, brightRT, blurRT,
        brightMat, blurMat, combineMat,
        brightScene, blurScene, combineScene, orthoCam,
        quadGeo,
        resize(nw, nh, npr) {
            this.sceneRT.setSize(nw * npr, nh * npr);
            this.brightRT.setSize(nw * npr * 0.5, nh * npr * 0.5);
            this.blurRT.setSize(nw * npr * 0.5, nh * npr * 0.5);
            this.blurMat.uniforms.resolution.value.set(nw * npr * 0.5, nh * npr * 0.5);
        },
        dispose() {
            this.sceneRT.dispose();
            this.brightRT.dispose();
            this.blurRT.dispose();
            this.brightMat.dispose();
            this.blurMat.dispose();
            this.combineMat.dispose();
            this.quadGeo.dispose();
        },
        render(mainScene, mainCamera) {
            // 1) Scene → sceneRT
            renderer.setRenderTarget(this.sceneRT);
            renderer.clear();
            renderer.render(mainScene, mainCamera);

            // 2) Bright extract
            this.brightMat.uniforms.tDiffuse.value = this.sceneRT.texture;
            renderer.setRenderTarget(this.brightRT);
            renderer.clear();
            renderer.render(this.brightScene, this.orthoCam);

            // 3) Blur H
            this.blurMat.uniforms.tDiffuse.value = this.brightRT.texture;
            this.blurMat.uniforms.direction.value.set(1, 0);
            renderer.setRenderTarget(this.blurRT);
            renderer.clear();
            renderer.render(this.blurScene, this.orthoCam);

            // 4) Blur V (back into brightRT)
            this.blurMat.uniforms.tDiffuse.value = this.blurRT.texture;
            this.blurMat.uniforms.direction.value.set(0, 1);
            renderer.setRenderTarget(this.brightRT);
            renderer.clear();
            renderer.render(this.blurScene, this.orthoCam);

            // 5) Combine to screen
            this.combineMat.uniforms.tDiffuse.value = this.sceneRT.texture;
            this.combineMat.uniforms.tBloom.value = this.brightRT.texture;
            renderer.setRenderTarget(null);
            renderer.render(this.combineScene, this.orthoCam);
        }
    };
}

if (isShaderOn('shaderBloom')) {
    bloomPipeline = createBloomPipeline();
}

// ---------------------------------------------------------------------------
// Sun flares depth-aware composite
//
// Pass A: layer 0 scene → sceneRT (writes color + depth)
// Pass B: layer 1 flares → flareRT sharing the SAME depthTexture
//         clear COLOR only so planet depth occludes plasma at the limb
// Pass C: bloom scene (optional), then additive depth-tested flares
//         (flares after bloom avoids soft bloom bleed across the planet face)
//
// Layer 1 = sun flares only; main scene stays on layer 0.
// ---------------------------------------------------------------------------
const LAYER_SUN_FLARES = 1;
let flareDepthPipeline = null;

function createFlareDepthPipeline() {
    const w = Math.max(1, Math.floor(window.innerWidth * renderer.getPixelRatio()));
    const h = Math.max(1, Math.floor(window.innerHeight * renderer.getPixelRatio()));

    // Single full-res RT with depth. Pass A writes scene+depth; pass B draws
    // flares into the SAME buffer without clearing depth so planets occlude plasma.
    // (Sharing one DepthTexture across two FBOs is fragile in Three r132.)
    const sceneRT = new THREE.WebGLRenderTarget(w, h, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        depthBuffer: true,
        stencilBuffer: false
    });
    // Optional capture of scene-before-flares for bloom-without-plasma (limb soft-bleed control)
    const sceneOnlyRT = new THREE.WebGLRenderTarget(w, h, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        depthBuffer: false,
        stencilBuffer: false
    });

    const quadGeo = new THREE.PlaneGeometry(2, 2);
    const copyMat = new THREE.ShaderMaterial({
        uniforms: { tDiffuse: { value: null } },
        vertexShader: ss_shaders.bloomCompositeVertex,
        fragmentShader: `
            uniform sampler2D tDiffuse;
            varying vec2 vUv;
            void main() {
                gl_FragColor = texture2D(tDiffuse, vUv);
            }
        `,
        depthTest: false,
        depthWrite: false
    });
    const addMat = new THREE.ShaderMaterial({
        uniforms: { tDiffuse: { value: null } },
        vertexShader: ss_shaders.bloomCompositeVertex,
        fragmentShader: `
            uniform sampler2D tDiffuse;
            varying vec2 vUv;
            void main() {
                gl_FragColor = texture2D(tDiffuse, vUv);
            }
        `,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        depthWrite: false,
        transparent: true
    });
    // sceneOnly + (composited - sceneOnly) isn't available; we blit sceneOnly for bloom
    // then add (full sceneRT - needs delta). Simpler: bloom sceneOnly, then add
    // (sceneRT - sceneOnly) ≈ flares. Approximate via full sceneRT after flares for
    // non-bloom path; for bloom: bloom sceneOnly then additive-blit flare contribution.
    // Flare contribution = we re-render flares to a black RT… skip: use delta shader:
    const flareExtractMat = new THREE.ShaderMaterial({
        uniforms: {
            tFull: { value: null },
            tScene: { value: null }
        },
        vertexShader: ss_shaders.bloomCompositeVertex,
        fragmentShader: `
            uniform sampler2D tFull;
            uniform sampler2D tScene;
            varying vec2 vUv;
            void main() {
                vec3 full = texture2D(tFull, vUv).rgb;
                vec3 scn  = texture2D(tScene, vUv).rgb;
                // Positive difference ≈ additive plasma only
                vec3 flare = max(full - scn, 0.0);
                gl_FragColor = vec4(flare, 1.0);
            }
        `,
        depthTest: false,
        depthWrite: false
    });

    const quadScene = new THREE.Scene();
    const quad = new THREE.Mesh(quadGeo, copyMat);
    quadScene.add(quad);
    const orthoCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    return {
        sceneRT,
        sceneOnlyRT,
        copyMat,
        addMat,
        flareExtractMat,
        quadScene,
        quad,
        orthoCam,
        quadGeo,
        resize(nw, nh, npr) {
            const fw = Math.max(1, Math.floor(nw * npr));
            const fh = Math.max(1, Math.floor(nh * npr));
            this.sceneRT.setSize(fw, fh);
            this.sceneOnlyRT.setSize(fw, fh);
        },
        dispose() {
            this.sceneRT.dispose();
            this.sceneOnlyRT.dispose();
            this.copyMat.dispose();
            this.addMat.dispose();
            this.flareExtractMat.dispose();
            this.quadGeo.dispose();
        },
        /**
         * Two-pass depth-occluded flares on one RT, then present with optional bloom.
         * Bloom uses pre-flare scene; depth-correct flares are added after bloom.
         */
        render(mainScene, mainCamera, bloom) {
            const prevClear = new THREE.Color();
            renderer.getClearColor(prevClear);
            const prevAlpha = renderer.getClearAlpha();
            const prevAutoClear = renderer.autoClear;

            renderer.autoClear = false;

            // --- A: scene without flares (writes color + depth) ---
            mainCamera.layers.set(0);
            renderer.setRenderTarget(this.sceneRT);
            renderer.setClearColor(prevClear, prevAlpha);
            renderer.clear(true, true, true);
            renderer.render(mainScene, mainCamera);

            // Snapshot scene before flares (for bloom without plasma bleed)
            if (bloom) {
                this.quad.material = this.copyMat;
                this.copyMat.uniforms.tDiffuse.value = this.sceneRT.texture;
                renderer.setRenderTarget(this.sceneOnlyRT);
                renderer.clear(true, true, true);
                renderer.render(this.quadScene, this.orthoCam);
            }

            // --- B: flares into SAME RT; keep depth so planets occlude at the limb ---
            mainCamera.layers.set(LAYER_SUN_FLARES);
            renderer.setRenderTarget(this.sceneRT);
            // no clear — depth from pass A remains; additive flare material draws on top
            renderer.render(mainScene, mainCamera);

            // Restore layers
            mainCamera.layers.set(0);
            mainCamera.layers.enable(LAYER_SUN_FLARES);

            if (bloom) {
                // Bloom pre-flare scene only
                bloom.brightMat.uniforms.tDiffuse.value = this.sceneOnlyRT.texture;
                renderer.setRenderTarget(bloom.brightRT);
                renderer.clear(true, true, true);
                renderer.render(bloom.brightScene, bloom.orthoCam);

                bloom.blurMat.uniforms.tDiffuse.value = bloom.brightRT.texture;
                bloom.blurMat.uniforms.direction.value.set(1, 0);
                renderer.setRenderTarget(bloom.blurRT);
                renderer.clear(true, true, true);
                renderer.render(bloom.blurScene, bloom.orthoCam);

                bloom.blurMat.uniforms.tDiffuse.value = bloom.blurRT.texture;
                bloom.blurMat.uniforms.direction.value.set(0, 1);
                renderer.setRenderTarget(bloom.brightRT);
                renderer.clear(true, true, true);
                renderer.render(bloom.blurScene, bloom.orthoCam);

                bloom.combineMat.uniforms.tDiffuse.value = this.sceneOnlyRT.texture;
                bloom.combineMat.uniforms.tBloom.value = bloom.brightRT.texture;
                renderer.setRenderTarget(null);
                renderer.clear(true, true, true);
                renderer.render(bloom.combineScene, bloom.orthoCam);

                // Add depth-correct plasma (full - sceneOnly) after bloom
                this.quad.material = this.flareExtractMat;
                this.flareExtractMat.uniforms.tFull.value = this.sceneRT.texture;
                this.flareExtractMat.uniforms.tScene.value = this.sceneOnlyRT.texture;
                // Reuse addMat path: extract to... actually draw extract with additive
                // Switch to a one-shot: extract shader already outputs flare RGB; add it
                const extractAsAdd = this.flareExtractMat;
                extractAsAdd.blending = THREE.AdditiveBlending;
                extractAsAdd.transparent = true;
                extractAsAdd.depthTest = false;
                extractAsAdd.depthWrite = false;
                this.quad.material = extractAsAdd;
                renderer.render(this.quadScene, this.orthoCam);
            } else {
                // Blit composited scene+flares to screen
                this.quad.material = this.copyMat;
                this.copyMat.uniforms.tDiffuse.value = this.sceneRT.texture;
                renderer.setRenderTarget(null);
                renderer.clear(true, true, true);
                renderer.render(this.quadScene, this.orthoCam);
            }

            renderer.autoClear = prevAutoClear;
            renderer.setClearColor(prevClear, prevAlpha);
        }
    };
}

function getSunFlareMesh() {
    if (typeof celestialObjects === 'undefined' || !celestialObjects) return null;
    for (let i = 0; i < celestialObjects.length; i++) {
        const obj = celestialObjects[i];
        if (!obj || !obj.data || obj.data.type !== 'star' || !obj.mesh) continue;
        const sunMesh = obj.mesh.getObjectByName(obj.data.name) || obj.mesh.children[0];
        if (!sunMesh) continue;
        const flares = sunMesh.getObjectByName('sunFlares');
        if (flares) return flares;
    }
    return null;
}

/**
 * Full occult → kill flare intensity (fill-rate). Partial occult is handled
 * per-pixel by the depth composite (do not globally dim the crescent).
 */
function applySunFlareOcclusion(flareMesh) {
    if (!flareMesh || !flareMesh.material || !flareMesh.material.uniforms) return;
    const u = flareMesh.material.uniforms;
    if (!u.intensity) return;
    const base = flareMesh.userData.flareBaseIntensity != null
        ? flareMesh.userData.flareBaseIntensity
        : 0.72;
    const occ = computeSunOcclusion();
    u.intensity.value = occ.fullyOcculted ? 0 : base;
}

function ensureFlareDepthPipeline() {
    if (!flareDepthPipeline) {
        flareDepthPipeline = createFlareDepthPipeline();
    }
    return flareDepthPipeline;
}

/** True when volumetric flares should use the depth-aware two-pass composite. */
function shouldUseFlareDepthComposite(flareMesh) {
    if (!flareMesh || !flareMesh.visible) return false;
    if (typeof isShaderOn === 'function' && !isShaderOn('shaderSunFlares')) return false;
    if (flareMesh.material && flareMesh.material.uniforms && flareMesh.material.uniforms.intensity) {
        if (flareMesh.material.uniforms.intensity.value < 0.001) return false;
    }
    return true;
}

// ---------------------------------------------------------------------------
// Screen-space sun glare / horizon sunrays (mode-agnostic: orbit + flight)
// Analytic sphere occlusion of the camera→sun ray; procedural additive pass.
// ---------------------------------------------------------------------------
const SUN_GLARE_MAX_OCCLUDERS = 12;
const SUN_GLARE_BASE_INTENSITY = 0.50;
/** 1 AU in km (same constant used elsewhere in this file). */
const SUN_GLARE_AU_KM = 1.496e8;
/**
 * Near-sun kill zone: fully off at/inside 15M km so volumetric solar flares stay clean.
 * Soft ramp up to full by ~45M km (~0.3 AU).
 */
const SUN_GLARE_NEAR_OFF_KM = 15e6;
const SUN_GLARE_NEAR_FULL_KM = 45e6;
/**
 * Distance falloff: shrinks/dims when zooming out, but stays readable mid-system.
 * Middle ground — not a hard cliff, not a fixed screen stamp.
 */
const SUN_GLARE_DIST_REF_AU = 5.0;       // strong through inner + gas-giant range
const SUN_GLARE_DIST_POWER = 0.62;      // moderate fade with distance
const SUN_GLARE_DIST_INTENSITY_MIN = 0.18; // still visible far out, just quieter
const SUN_GLARE_DIST_SIZE_MIN = 0.22;   // smaller when zoomed out, not tiny
const SUN_GLARE_DIST_SIZE_POWER = 0.55;
let sunGlarePipeline = null;

// Scratch vectors (avoid per-frame alloc)
const _glareSunWorld = new THREE.Vector3(0, 0, 0);
const _glareCamPos = new THREE.Vector3();
const _glareToSun = new THREE.Vector3();
const _glareToBody = new THREE.Vector3();
const _glareBodyPos = new THREE.Vector3();
const _glareNdc = new THREE.Vector3();
const _glareViewDir = new THREE.Vector3();
const _glareOccluderScratch = [];

function createSunGlarePipeline() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const pr = renderer.getPixelRatio();
    const fw = Math.max(1, Math.floor(w * pr));
    const fh = Math.max(1, Math.floor(h * pr));
    const quadGeo = new THREE.PlaneGeometry(2, 2);

    // Half-float offscreen buffer so long soft rays aren't quantized mid-gradient
    // before additive composite (reduces contour banding on black).
    const rtType = (THREE.HalfFloatType !== undefined) ? THREE.HalfFloatType
        : (THREE.FloatType !== undefined ? THREE.FloatType : THREE.UnsignedByteType);
    const glareRT = new THREE.WebGLRenderTarget(fw, fh, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        type: rtType,
        depthBuffer: false,
        stencilBuffer: false
    });

    const mat = new THREE.ShaderMaterial({
        uniforms: {
            sunUV: { value: new THREE.Vector2(0.5, 0.5) },
            intensity: { value: 0.0 },
            rimBoost: { value: 0.0 },
            sunSize: { value: 0.02 },
            flareScale: { value: 1.0 }, // spatial scale of spikes/ghosts (shrinks with distance)
            resolution: { value: new THREE.Vector2(fw, fh) },
            time: { value: 0.0 }
        },
        vertexShader: ss_shaders.sunGlareVertex,
        fragmentShader: ss_shaders.sunGlareFragment,
        // Write into float RT with replace (full precision gradient), then additive blit
        blending: THREE.NoBlending,
        depthTest: false,
        depthWrite: false,
        transparent: false
    });
    const blitMat = new THREE.ShaderMaterial({
        uniforms: { tDiffuse: { value: null } },
        vertexShader: ss_shaders.bloomCompositeVertex,
        fragmentShader: `
            precision highp float;
            uniform sampler2D tDiffuse;
            varying vec2 vUv;
            void main() {
                vec4 c = texture2D(tDiffuse, vUv);
                gl_FragColor = c;
            }
        `,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        depthWrite: false,
        transparent: true
    });

    const sceneGlare = new THREE.Scene();
    const quad = new THREE.Mesh(quadGeo, mat);
    sceneGlare.add(quad);
    const blitScene = new THREE.Scene();
    const blitQuad = new THREE.Mesh(quadGeo, blitMat);
    blitScene.add(blitQuad);
    const orthoCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    return {
        mat,
        blitMat,
        glareRT,
        scene: sceneGlare,
        blitScene,
        orthoCam,
        quadGeo,
        resize(nw, nh, npr) {
            const rtw = Math.max(1, Math.floor(nw * npr));
            const rth = Math.max(1, Math.floor(nh * npr));
            this.glareRT.setSize(rtw, rth);
            this.mat.uniforms.resolution.value.set(rtw, rth);
        },
        dispose() {
            this.mat.dispose();
            this.blitMat.dispose();
            this.glareRT.dispose();
            this.quadGeo.dispose();
        },
        render() {
            const prevAutoClear = renderer.autoClear;
            const prevClear = new THREE.Color();
            renderer.getClearColor(prevClear);
            const prevAlpha = renderer.getClearAlpha();

            // 1) Evaluate glare into high-precision RT (black clear)
            renderer.autoClear = false;
            renderer.setClearColor(0x000000, 0);
            renderer.setRenderTarget(this.glareRT);
            renderer.clear(true, true, true);
            renderer.render(this.scene, this.orthoCam);

            // 2) Additive composite onto the backbuffer
            renderer.setRenderTarget(null);
            renderer.setClearColor(prevClear, prevAlpha);
            this.blitMat.uniforms.tDiffuse.value = this.glareRT.texture;
            renderer.render(this.blitScene, this.orthoCam);

            renderer.autoClear = prevAutoClear;
        }
    };
}

function ensureSunGlarePipeline() {
    if (!sunGlarePipeline) {
        sunGlarePipeline = createSunGlarePipeline();
    }
    return sunGlarePipeline;
}

function applySunGlareLive() {
    if (isShaderOn('shaderSunGlare')) {
        ensureSunGlarePipeline().resize(
            window.innerWidth,
            window.innerHeight,
            renderer.getPixelRatio()
        );
    } else if (sunGlarePipeline) {
        sunGlarePipeline.dispose();
        sunGlarePipeline = null;
    }
}

/**
 * Angular radius of a sphere as seen from the camera (radians).
 */
function angularRadiusFromCamera(camPos, bodyPos, radius) {
    const dist = camPos.distanceTo(bodyPos);
    if (dist <= radius * 1.001) return Math.PI * 0.5;
    return Math.asin(Math.min(1, radius / dist));
}

/**
 * Fraction of the sun disk occulted by a sphere, plus a limb "rim" score.
 * Uses angular separation between body center and sun as seen from camera.
 * Returns { visibilityFactor 0..1 remaining, rim 0..1, deepUmbra bool }.
 */
function sunOcclusionBySphere(camPos, sunPos, sunAngRad, bodyPos, bodyRadius) {
    const toSun = _glareToSun.copy(sunPos).sub(camPos);
    const distSun = toSun.length();
    if (distSun < 1e-8) {
        return { visibilityFactor: 0, rim: 0, deepUmbra: true };
    }
    toSun.multiplyScalar(1 / distSun);

    const toBody = _glareToBody.copy(bodyPos).sub(camPos);
    const distBody = toBody.length();
    if (distBody < 1e-8) {
        return { visibilityFactor: 0, rim: 0, deepUmbra: true };
    }

    // Body must be between camera and sun (or overlapping the ray segment)
    const along = toBody.dot(toSun);
    if (along < 0) {
        // Behind camera relative to sun direction
        return { visibilityFactor: 1, rim: 0, deepUmbra: false };
    }
    // If body is farther than the sun, it cannot occult the sun
    if (along > distSun + bodyRadius) {
        return { visibilityFactor: 1, rim: 0, deepUmbra: false };
    }

    const bodyAng = angularRadiusFromCamera(camPos, bodyPos, bodyRadius);
    // Angular separation sun vs body center
    toBody.multiplyScalar(1 / distBody);
    const cosSep = THREE.MathUtils.clamp(toSun.dot(toBody), -1, 1);
    const sep = Math.acos(cosSep);

    // Clear of limb
    if (sep > bodyAng + sunAngRad) {
        return { visibilityFactor: 1, rim: 0, deepUmbra: false };
    }

    // Fully covered (body angular radius engulfs sun disk)
    if (sep + sunAngRad < bodyAng) {
        // depthAng: how far the sun is buried past the limb in angular units
        const depthAng = bodyAng - sep - sunAngRad;
        const rimWidth = Math.max(sunAngRad * 2.2, 0.0015);
        const rim = Math.max(0, 1 - depthAng / rimWidth);
        // Deep umbra: disk fully hidden with no meaningful limb crest
        const deepUmbra = depthAng > rimWidth * 0.25;
        return { visibilityFactor: 0, rim: rim * rim, deepUmbra };
    }

    // Partial occultation — stronger kill as coverage increases
    const overlap = (bodyAng + sunAngRad - sep) / Math.max(2 * sunAngRad, 1e-6);
    const occ = THREE.MathUtils.clamp(overlap, 0, 1);
    // Rim peaks when sun center is near the limb (sep ≈ bodyAng)
    const limbDist = Math.abs(sep - bodyAng) / Math.max(sunAngRad * 2.5, 1e-6);
    const rim = Math.max(0, 1 - limbDist) * (0.55 + 0.45 * occ);
    return { visibilityFactor: 1 - occ, rim, deepUmbra: false };
}

function getSunRadiusWorld() {
    let sunRadiusWorld = 0.0046 * nHardCodeScaleFactor;
    if (typeof celestialObjects !== 'undefined' && celestialObjects) {
        for (let i = 0; i < celestialObjects.length; i++) {
            const o = celestialObjects[i];
            if (o && o.data && o.data.type === 'star' && o.data.radius) {
                sunRadiusWorld = o.data.radius * nHardCodeScaleFactor;
                break;
            }
        }
    }
    return sunRadiusWorld;
}

/**
 * Analytic sun-disk occlusion by nearby planet/moon spheres.
 * Cached once per frame (shared by glare + flare half-res gating).
 * @returns {{ visibility, rimBoost, fullyOcculted, partiallyOcculted, sunAngRad, sunRadiusWorld }}
 */
let _sunOccCache = null;
let _sunOccFrameCounter = 0;

function computeSunOcclusion() {
    // Simple per-call-frame cache: increment counter at start of renderSolarSystemFrame
    if (_sunOccCache && _sunOccCache._frame === _sunOccFrameCounter) {
        return _sunOccCache;
    }

    camera.getWorldPosition(_glareCamPos);
    _glareSunWorld.set(0, 0, 0);
    const sunRadiusWorld = getSunRadiusWorld();
    const sunAngRad = angularRadiusFromCamera(_glareCamPos, _glareSunWorld, sunRadiusWorld);

    _glareOccluderScratch.length = 0;
    if (typeof celestialObjects !== 'undefined' && celestialObjects) {
        for (let i = 0; i < celestialObjects.length; i++) {
            const obj = celestialObjects[i];
            if (!obj || !obj.data || !obj.mesh) continue;
            if (obj.data.type === 'star') continue;
            if (!(obj.data.radius > 0)) continue;

            obj.mesh.getWorldPosition(_glareBodyPos);
            let scale = 1;
            if (typeof getScaleForObject === 'function') {
                scale = getScaleForObject(obj).finalPlanetScale || 1;
            }
            const R = obj.data.radius * nHardCodeScaleFactor * scale;
            const dist = _glareCamPos.distanceTo(_glareBodyPos);
            if (dist < 1e-6) continue;
            const ang = Math.atan(R / dist);
            // Skip tiny on-screen bodies (~0.15° ≈ 0.0026 rad)
            if (ang < 0.0026) continue;

            _glareOccluderScratch.push({
                x: _glareBodyPos.x,
                y: _glareBodyPos.y,
                z: _glareBodyPos.z,
                R,
                ang
            });
        }
    }

    _glareOccluderScratch.sort((a, b) => b.ang - a.ang);
    if (_glareOccluderScratch.length > SUN_GLARE_MAX_OCCLUDERS) {
        _glareOccluderScratch.length = SUN_GLARE_MAX_OCCLUDERS;
    }

    let visibility = 1;
    let rimBoost = 0;
    let anyDeep = false;
    for (let i = 0; i < _glareOccluderScratch.length; i++) {
        const o = _glareOccluderScratch[i];
        _glareBodyPos.set(o.x, o.y, o.z);
        const res = sunOcclusionBySphere(
            _glareCamPos,
            _glareSunWorld,
            sunAngRad,
            _glareBodyPos,
            o.R
        );
        visibility = Math.min(visibility, res.visibilityFactor);
        rimBoost = Math.max(rimBoost, res.rim);
        if (res.deepUmbra) anyDeep = true;
    }

    // Fully occulted: disk gone and not a thin limb crest (or deep umbra)
    const fullyOcculted = (visibility < 0.02 && rimBoost < 0.22) || anyDeep;
    const partiallyOcculted = !fullyOcculted && visibility < 0.98;

    _sunOccCache = {
        _frame: _sunOccFrameCounter,
        visibility,
        rimBoost,
        fullyOcculted,
        partiallyOcculted,
        sunAngRad,
        sunRadiusWorld
    };
    return _sunOccCache;
}

/**
 * Project sun, compute analytic occlusion / rim boost, write glare uniforms.
 * Camera-mode agnostic (uses global `camera` only).
 */
function updateSunGlareUniforms(pipe) {
    if (!pipe || !pipe.mat) return 0;

    const u = pipe.mat.uniforms;
    camera.getWorldPosition(_glareCamPos);
    _glareSunWorld.set(0, 0, 0);

    // Behind camera?
    const camToSun = _glareToSun.copy(_glareSunWorld).sub(_glareCamPos);
    camera.getWorldDirection(_glareViewDir);
    const ahead = camToSun.dot(_glareViewDir);
    if (ahead <= 0) {
        u.intensity.value = 0;
        u.rimBoost.value = 0;
        return 0;
    }

    // NDC / UV of sun center
    _glareNdc.copy(_glareSunWorld).project(camera);
    const ndcX = _glareNdc.x;
    const ndcY = _glareNdc.y;
    const uvX = ndcX * 0.5 + 0.5;
    const uvY = ndcY * 0.5 + 0.5;
    u.sunUV.value.set(uvX, uvY);

    // Soft off-screen falloff (rays may still enter from FOV edge)
    const edge = 0.15;
    const ox = Math.max(0, Math.abs(ndcX) - 1) / edge;
    const oy = Math.max(0, Math.abs(ndcY) - 1) / edge;
    const offScreen = Math.min(1, Math.sqrt(ox * ox + oy * oy));
    const screenFade = 1 - THREE.MathUtils.clamp(offScreen, 0, 1);
    if (screenFade < 0.001) {
        u.intensity.value = 0;
        u.rimBoost.value = 0;
        return 0;
    }

    const occ = computeSunOcclusion();
    const sunAngRad = occ.sunAngRad;
    const camDist = Math.max(_glareCamPos.distanceTo(_glareSunWorld), 1e-4);
    // Orbit scale factor maps sim units ≈ AU (same as body semi-major axes)
    const distAU = camDist / Math.max(nHardCodeOrbitScaleFactor, 1e-6);
    const distKm = distAU * SUN_GLARE_AU_KM;

    // Close-up: fully kill glare by 15M km so ray-marched solar flares aren't washed out
    if (distKm <= SUN_GLARE_NEAR_OFF_KM) {
        u.intensity.value = 0;
        u.rimBoost.value = 0;
        u.flareScale.value = 0;
        return 0;
    }
    // Smooth ramp 15M → 45M km (0 → 1)
    const nearFade = THREE.MathUtils.clamp(
        (distKm - SUN_GLARE_NEAR_OFF_KM) / Math.max(SUN_GLARE_NEAR_FULL_KM - SUN_GLARE_NEAR_OFF_KM, 1),
        0,
        1
    );
    // Smoothstep-ish ease
    const nearFadeSmooth = nearFade * nearFade * (3 - 2 * nearFade);

    // Planet-range falloff: slow so Jupiter (~5 AU) / Saturn (~9.5 AU) stay strong
    const distIntensityRaw = Math.pow(
        SUN_GLARE_DIST_REF_AU / (SUN_GLARE_DIST_REF_AU + distAU),
        SUN_GLARE_DIST_POWER
    );
    const distIntensity = THREE.MathUtils.clamp(
        distIntensityRaw,
        SUN_GLARE_DIST_INTENSITY_MIN,
        1.35
    ) * nearFadeSmooth;
    const distSizeRaw = Math.pow(
        SUN_GLARE_DIST_REF_AU / (SUN_GLARE_DIST_REF_AU + distAU),
        SUN_GLARE_DIST_SIZE_POWER
    );
    const flareScale = THREE.MathUtils.clamp(
        distSizeRaw * (0.55 + 0.45 * nearFadeSmooth),
        SUN_GLARE_DIST_SIZE_MIN * nearFadeSmooth,
        1.15
    );
    u.flareScale.value = flareScale;

    // sunSize in UV: angular photosphere size (shrinks with distance) × optical scale
    const vFovRad = (camera.fov * Math.PI) / 180;
    const sunSizeUv = (sunAngRad / Math.max(vFovRad, 1e-4)) * 0.55 * flareScale;
    // Allow smaller far-out cores; only clamp extremes
    u.sunSize.value = THREE.MathUtils.clamp(sunSizeUv, 0.0012, 0.12);

    // --- Planet occlusion: never paint full flare through a blocking body ---
    let intensity = 0;
    let rimOut = 0;
    if (occ.fullyOcculted) {
        // Deep umbra / fully covered: no screen-space glare on the planet face
        intensity = 0;
        rimOut = 0;
    } else if (occ.visibility < 0.04) {
        // Thin limb crest only (disk just gone) — subtle, not a through-disk train
        if (occ.rimBoost > 0.28) {
            intensity = SUN_GLARE_BASE_INTENSITY * occ.rimBoost * 0.18 * screenFade * distIntensity;
            rimOut = occ.rimBoost * 0.35;
        }
    } else {
        // Partial or clear: scale by remaining sun disk; mild limb lift
        intensity = SUN_GLARE_BASE_INTENSITY * occ.visibility * screenFade * distIntensity;
        intensity *= 1 + occ.rimBoost * 0.75;
        rimOut = occ.rimBoost * (0.4 + 0.6 * occ.visibility);
    }

    u.intensity.value = intensity;
    u.rimBoost.value = rimOut;
    u.time.value = (typeof performance !== 'undefined' ? performance.now() : 0) * 0.001;

    return intensity;
}

function compositeSunGlare() {
    if (typeof isShaderOn === 'function' && !isShaderOn('shaderSunGlare')) return;
    const pipe = ensureSunGlarePipeline();
    const intensity = updateSunGlareUniforms(pipe);
    if (intensity < 0.001) return;
    pipe.render();
}

function renderSolarSystemFrame() {
    // Invalidate analytic occlusion cache for this frame
    _sunOccFrameCounter++;

    const flares = getSunFlareMesh();
    if (flares) {
        applySunFlareOcclusion(flares);
    }

    // Always depth-composite flares when active so limb partial occultation works
    if (shouldUseFlareDepthComposite(flares)) {
        ensureFlareDepthPipeline().render(scene, camera, bloomPipeline);
        compositeSunGlare();
        return;
    }

    // No flares (or fully occulted): standard scene path (layer 0 only)
    camera.layers.set(0);
    if (bloomPipeline) {
        bloomPipeline.render(scene, camera);
    } else {
        renderer.render(scene, camera);
    }
    // Keep flare layer enabled for the next frame's picking / side updates
    camera.layers.enable(LAYER_SUN_FLARES);
    compositeSunGlare();
}

const isLogDepthBuffer = settings.useLogDepthBuffer === 'ON';


const nHardCodeScaleFactor = isLogDepthBuffer ? 25000 : 5000; //Greater Distance if we are using log depth buffer
const nHardCodeOrbitScaleFactor = nHardCodeScaleFactor; //Must be a multiple of 100

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, nHardCodeOrbitScaleFactor * 500);
// Default world (0) + sun flares (1); half-res path temporarily isolates layers
camera.layers.enable(LAYER_SUN_FLARES);
const DEFAULT_CAM_X = 13 * nHardCodeOrbitScaleFactor / 1000;
const DEFAULT_CAM_Y = -1450 * nHardCodeOrbitScaleFactor / 1000;
const DEFAULT_CAM_Z = 360 * nHardCodeOrbitScaleFactor / 1000;
//Create trail lines for celestialObjects

//const N_TRAIL_POINTS = 100; // Number of points in each trail

// Speed of light in km/s
const SPEED_OF_LIGHT = 299792; // km/s

// Conversion factor from simulation units to km/s
// Assuming nHardCodeOrbitScaleFactor relates to AU, and 1 AU ≈ 1.496e8 km
const SIM_UNITS_TO_KM = (1.496e8 / nHardCodeOrbitScaleFactor); // km per simulation unit

// Function to convert throttle (simulation units per second) to km/s
function throttleToKmPerS(throttle) {
    //1s = timeScale days;
    return throttle * SIM_UNITS_TO_KM * (1/ ( timeScale * 24 * 3600)); // km/s
}

// Function to convert throttle to fraction of speed of light
function throttleToFractionOfC(throttle) {
    return throttleToKmPerS(throttle) / SPEED_OF_LIGHT; // Fraction of c
}


let isLargeControls = videoSettings.largeControls;
if (isLargeControls) {
    document.body.classList.add('large-controls');
}


let tableState = isMobileBool ? 1 : 0; // Default state based on device

// Initialize TEXTURE_PATH with current setting



//renderer.shadowMap.enabled = true; // Enable shadow mapping
//renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Optional: smoother shadows


camera.position.set(DEFAULT_CAM_X, DEFAULT_CAM_Y, DEFAULT_CAM_Z);

if( settings.useLogDepthBuffer === 'ON' )
{
    camera.near = 0.001;
    camera.far = nHardCodeOrbitScaleFactor * 1000;
    camera.updateProjectionMatrix();
}
else
{
    camera.near = 1;
    camera.far = nHardCodeOrbitScaleFactor * 1000;
    camera.updateProjectionMatrix();
}



//const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas') });
//renderer.setSize(window.innerWidth, window.innerHeight);
//renderer.setPixelRatio(window.devicePixelRatio * .5); // 2x resolution (adjustable)

const orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
const fpsControls = new THREE.TieFighterControls(camera, renderer.domElement);
fpsControls.enabled = false; // Start in orbital mode; enabled only when flight mode is on
fpsControls.addEventListener('change', updateThrottleIndicator);

let lastThrottle = 0; // Store last throttle value for orbit mode

//fpsControls.movementSpeed = 200;
fpsControls.throttle = 0;
fpsControls.maxThrottle = nHardCodeOrbitScaleFactor / 2;
fpsControls.maxReverse = -nHardCodeOrbitScaleFactor / 100;
fpsControls.rollSpeed = .7;
fpsControls.pitchSpeed = 3;
fpsControls.dragToLook = true;
fpsControls.autoForward = false;



const anisotropyExtension = gl.getExtension('EXT_texture_filter_anisotropic');
//const maxAnisotropy = anisotropyExtension ? gl.getParameter(gl.TEXTURE_MAX_ANISOTROPY_EXT) : 1;
const maxAnisotropy =  anisotropyExtension ? renderer.capabilities.getMaxAnisotropy() : 1;
console.log(`Max Anisotropy Level: ${maxAnisotropy}`); // Typically 16 on modern hardware

// Lighting
const sunLight = new THREE.PointLight(0xffffff, 1, 0);
sunLight.position.set(0, 0, 0);
scene.add(sunLight);


// Texture Loader
const textureLoader = new THREE.TextureLoader();

// Backdrop Sphere
const backdropRadius = nHardCodeOrbitScaleFactor * 200; // Large enough to encompass the solar system (in simulation units)
const backlight_geometry = new THREE.SphereGeometry(backdropRadius, 128 , 128 );

function createBlankBlackTexture(width = 2, height = 2) {
    // Create a small 2x2 pixel array (all black)
    const size = width * height;
    const data = new Uint8Array(4 * size); // RGBA format
    for (let i = 0; i < size; i++) {
        data[i * 4 + 0] = 0;   // R (0 = black)
        data[i * 4 + 1] = 0;   // G
        data[i * 4 + 2] = 0;   // B
        data[i * 4 + 3] = 255; // A (255 = fully opaque)
    }

    // Create DataTexture
    const texture = new THREE.DataTexture(data, width, height, THREE.RGBAFormat);
    texture.needsUpdate = true; // Ensure texture is updated
    return texture;
}

const blank_texture = createBlankBlackTexture(10,10);

const backlight_texture =  settings.textureSize === "None" ? blank_texture : textureLoader.load(
    TEXTURE_PATH + 'milky_way_backdrop.jpg',
    (tex) => {
        const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
        if (settings.anisotropicFiltering === 'ON' && maxAnisotropy) {
            tex.anisotropy = Math.min(16, maxAnisotropy);
            tex.minFilter = THREE.LinearMipMapLinearFilter;
            tex.magFilter = THREE.LinearFilter;
            tex.encoding = THREE.sRGBEncoding;
            console.log(`Backdrop anisotropy set to ${tex.anisotropy}`);
        } else {
            tex.anisotropy = 1;
        }
        console.log('Backdrop texture loaded');
    },
    undefined,
    (error) => console.error('Backdrop texture load error:', error)
);


const backlight_material =  new THREE.MeshBasicMaterial({
                                map: backlight_texture,
                                side: THREE.BackSide, // Render on the inner surface
                            });
const backlight_sphere = new THREE.Mesh(backlight_geometry, backlight_material);

backlight_sphere.name = "backdrop";
backlight_sphere.position.set(0, 0, 0); // Centered at origin
scene.add(backlight_sphere);


// Initialize Orbital plane mesh
const orbitalPlaneGeometry = new THREE.PlaneGeometry(1, 1); // Large plane
const orbitalPlaneMaterial = new THREE.MeshBasicMaterial({
    color: 0xFFB6C1, // Light pink
    transparent: true,
    opacity: 0.4,
    side: THREE.DoubleSide
});
const orbitalPlaneMesh = new THREE.Mesh(orbitalPlaneGeometry, orbitalPlaneMaterial);
orbitalPlaneMesh.visible = false; // Hidden by default
orbitalPlaneMesh.name = "orbitalPlane";
scene.add(orbitalPlaneMesh);

// Initialize Orbital plane axes
const axisLength = 1; // Base length, scaled later
const xAxisGeometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(axisLength, 0, 0)
]);
const yAxisGeometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, axisLength, 0)
]);
const zAxisGeometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 0, axisLength)
]);
const xAxisMaterial = new THREE.LineBasicMaterial({ color: 0xFF0000 }); // Red
const yAxisMaterial = new THREE.LineBasicMaterial({ color: 0x00FF00 }); // Green
const zAxisMaterial = new THREE.LineBasicMaterial({ color: 0x0000FF }); // Blue
const xAxisLine = new THREE.Line(xAxisGeometry, xAxisMaterial);
const yAxisLine = new THREE.Line(yAxisGeometry, yAxisMaterial);
const zAxisLine = new THREE.Line(zAxisGeometry, zAxisMaterial);
xAxisLine.visible = false;
yAxisLine.visible = false;
zAxisLine.visible = false;
xAxisLine.name = "xAxis";
yAxisLine.name = "yAxis";
zAxisLine.name = "zAxis";
scene.add(xAxisLine);
scene.add(yAxisLine);
scene.add(zAxisLine);

// Initialize Orbital plane axis labels
const xAxisLabel = createTextSprite('X', '#FF0000').sprite;
const yAxisLabel = createTextSprite('Y', '#00FF00').sprite;
const zAxisLabel = createTextSprite('Z', '#0000FF').sprite;
xAxisLabel.visible = false;
yAxisLabel.visible = false;
zAxisLabel.visible = false;
xAxisLabel.name = "xAxisLabel";
yAxisLabel.name = "yAxisLabel";
zAxisLabel.name = "zAxisLabel";
scene.add(xAxisLabel);
scene.add(yAxisLabel);
scene.add(zAxisLabel);

// Initialize Equatorial plane mesh
const equatorialPlaneGeometry = new THREE.PlaneGeometry(1, 1); // Same size as orbital plane
const equatorialPlaneMaterial = new THREE.MeshBasicMaterial({
    color: 0xffff00, // Yellow
    transparent: true,
    opacity: 0.4, // 40% opacity
    side: THREE.DoubleSide
});
const equatorialPlaneMesh = new THREE.Mesh(equatorialPlaneGeometry, equatorialPlaneMaterial);
equatorialPlaneMesh.visible = false; // Hidden by default
equatorialPlaneMesh.name = "equatorialPlane";
scene.add(equatorialPlaneMesh);

// Set Initial Simulation state
let isFPSMode = false; // Track FPS mode state
let simulationTime = 0;
let unitSystem = 0; // 0 = kg, km, s; 1 = kg, m, s; 2 = AU, M☉, yr

let iTimeValue = convertSliderValueInToTime(document.getElementById('timeScaleSlider').value); // Slider value as days
let timeScale = iTimeValue.timeReturn; // Initial value matches slider

function getTimeScaleTxt()
{
    iTimeValue = convertSliderValueInToTime(document.getElementById('timeScaleSlider').value); // Slider value as days
    if( isMobileBool )
    {
        return `1s = ${Math.abs(iTimeValue.timeText)} ${iTimeValue.unitText} ${timeScale < 0 ? " (rev)" : ""}`;
    }
    else
    {
        return `1 sec = ${Math.abs(iTimeValue.timeText)} ${iTimeValue.unitText} ${timeScale < 0 ? " (rev)" : ""}`;
    }
    
}
//Update time label
document.getElementById('timeRateLabel').textContent = getTimeScaleTxt();

// Apply loaded settings
let fpsVisible = videoSettings.fpsVisible;
let planetOrbitsVisible = videoSettings.planetOrbitsVisible;
let moonOrbitsVisible = videoSettings.moonOrbitsVisible;
let planetTrailsVisible = videoSettings.planetTrailsVisible;
let moonTrailsVisible = videoSettings.moonTrailsVisible;
let planetRingsVisible = videoSettings.planetRingsVisible;
let backdropVisible = videoSettings.backdropVisible;
let ambientIntensity = videoSettings.ambientIntensity;
let asteroidBeltsVisible = videoSettings.asteroidBeltsVisible;
let asteroidOrbitsVisible = videoSettings.asteroidOrbitsVisible; // New
let asteroidTrailsVisible = videoSettings.asteroidTrailsVisible; // New

// Atmosphere / aurora / GRS-lightning / sun-flare shells — toggle with 0 for bare view
// Declared early: createSimpleCelestialBody reads this while building meshes.
let atmosphereEffectsVisible = true;
const ATMOSPHERE_EFFECT_NAMES = ['atmosphere', 'aurora', 'grsLightning', 'sunFlares'];

function setAtmosphereEffectsVisible(visible) {
    atmosphereEffectsVisible = !!visible;
    if (typeof celestialObjects === 'undefined' || !celestialObjects.length) return;
    celestialObjects.forEach(obj => {
        if (!obj.mesh) return;
        obj.mesh.traverse(child => {
            if (child.name && ATMOSPHERE_EFFECT_NAMES.indexOf(child.name) !== -1) {
                child.visible = atmosphereEffectsVisible;
            }
        });
    });
}

function toggleAtmosphereEffects() {
    setAtmosphereEffectsVisible(!atmosphereEffectsVisible);
}

// Update initial states
const fpsCounter = document.getElementById('fpsCounter');
fpsCounter.style.display = fpsVisible ? 'block' : 'none';


// Initialize button text based on settings
document.getElementById('toggleFPSCounter').textContent = fpsVisible ? 'Hide FPS' : 'Show FPS';
document.getElementById('togglePlanetOrbits').textContent = planetOrbitsVisible ? 'Hide Planet Orbits' : 'Show Planet Orbits';
document.getElementById('toggleMoonOrbits').textContent = moonOrbitsVisible ? 'Hide Moon Orbits' : 'Show Moon Orbits';
document.getElementById('togglePlanetTrails').textContent = planetTrailsVisible ? 'Hide Planet Trails' : 'Show Planet Trails';
document.getElementById('toggleMoonTrails').textContent = moonTrailsVisible ? 'Hide Moon Trails' : 'Show Moon Trails';
document.getElementById('togglePlanetRings').textContent = planetRingsVisible ? 'Hide Planet Rings' : 'Show Planet Rings';
document.getElementById('toggleBackdrop').textContent = backdropVisible ? 'Hide Backdrop' : 'Show Backdrop';
document.getElementById('toggleAsteroidBelts').textContent = asteroidBeltsVisible ? 'Hide Asteroid Sprites' : 'Show Asteroid Sprites';
document.getElementById('toggleAsteroidOrbits').textContent = asteroidOrbitsVisible ? 'Hide Asteroid Orbits' : 'Show Asteroid Orbits'; // New
document.getElementById('toggleAsteroidTrails').textContent = asteroidTrailsVisible ? 'Hide Asteroid Trails' : 'Show Asteroid Trails'; // New

let paused = false;


fpsCounter.style.display = fpsVisible ? 'block' : 'none';



let lastTime = performance.now();
let frameCount = 0;
let fps = 0;

//planetScaleMultiplier = parseFloat(getCookie('planetScaleMultiplier')) || 64;
let planetScaleMultiplier = parseFloat(getCookie('planetScaleMultiplier')) || 128; // Starts at 64x, increases with button clicks
let orbitScaleToPlanetScale = 1;
let moonOrbitScaleMultiplier = planetScaleMultiplier * orbitScaleToPlanetScale;
let focusedPlanet = null; // Tracks the selected planet
let focusedCenterOfGravity = null;
let trackingPlanet = false; // Whether camera follows
let previousCameraPosition = new THREE.Vector3(DEFAULT_CAM_X, DEFAULT_CAM_Y, DEFAULT_CAM_Z); // Initial camera pos
let previousCameraTarget = new THREE.Vector3(0, 0, 0); // Default target

// Near the top of solar_system.js, after constants
let totalTextures = 0;
let loadedTextures = 0;
let totalObjects = 0;
let loadedObjects = 0;

let simulationStarted = false; // Flag to prevent multiple animate() calls

// Function to count total textures
function countTotalTextures() {
    bodies.forEach(body => {
        if (body.texture) totalTextures++;
        if (body.normalMap) totalTextures++;
        if (body.specularMap) totalTextures++;
        if (body.atmosphere_texture) totalTextures++;
        if (body.ring_texture) totalTextures++;
        if (body.bump_texture) totalTextures++;
        if (body.nightMap) totalTextures++;
        body.moons.forEach(moon => {
            if (moon.texture) totalTextures++;
            if (moon.normalMap) totalTextures++;
            if (moon.specularMap) totalTextures++;
            if (moon.atmosphere_texture) totalTextures++;
            if (moon.ring_texture) totalTextures++;
            if (moon.bump_texture) totalTextures++;
            if (moon.nightMap) totalTextures++;
        });
    });
}

// At the start of the file, after scene setup but before celestial body initialization
countTotalTextures();

console.log(`Total textures to load: ${totalTextures}`);

//Initialize the focus Cube
const focusCube = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.BoxGeometry(1, 1, 1)),
    new THREE.LineBasicMaterial({ color: 0x0000ff }) // Orange
);
scene.add(focusCube);
focusCube.visible = false;


//Initialize the cone geometry used for vectors
const coneGeometry = new THREE.ConeGeometry(0.5, 2, 16); // Radius 0.5, height 2, 16 segments

//Initialize Velocity arrowhead (green)
const velocityConeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const velocityCone = new THREE.Mesh(coneGeometry, velocityConeMaterial);
velocityCone.visible = false;
scene.add(velocityCone);

//Initialize Angular Momentum arrowhead (orange)
const angularMomentumConeMaterial = new THREE.MeshBasicMaterial({ color: 0xffa500 });
const angularMomentumCone = new THREE.Mesh(coneGeometry, angularMomentumConeMaterial);
angularMomentumCone.visible = false;
scene.add(angularMomentumCone);

//Initialize Angular Momentum arrowhead (orange)
const targetArrowConeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const targetArrowCone = new THREE.Mesh(coneGeometry, targetArrowConeMaterial);
targetArrowCone.visible = false;
scene.add(targetArrowCone);

//Initialize Radius, Velocity, and Angular Momentum Lines
const radiusLine = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)]),
    new THREE.LineBasicMaterial({ color: 0xff0000 }) // Red
);
const velocityLine = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)]),
    new THREE.LineBasicMaterial({ color: 0x00ff00 }) // Green
);
const angularMomentumLine = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)]),
    new THREE.LineBasicMaterial({ color: 0xffa500 }) // Orange
);

const targetDirectionLine = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)]),
    new THREE.LineBasicMaterial({ color: 0x00ff00 }) // Green
);




scene.add(radiusLine);
scene.add(velocityLine);
scene.add(angularMomentumLine);
scene.add(targetDirectionLine);


// Hide them initially
radiusLine.visible = false;
velocityLine.visible = false;
angularMomentumLine.visible = false;
targetDirectionLine.visible = false;


// Rotation axis line (purple)
const axisGeometry = new THREE.CylinderGeometry(0.3, 0.3, 1, 16); // Thin cylinder
const axisMaterial = new THREE.MeshBasicMaterial({ color: 0x00FFFF });
const axisMesh = new THREE.Mesh(axisGeometry, axisMaterial);
scene.add(axisMesh);
axisMesh.visible = false;


// Function for drawing labels (using Sprite for 2D text in 3D space)
function createTextSprite(message, color) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 512; // Increase resolution for clearer text with numbers
    canvas.height = 512;

    // Ensure the canvas background is transparent
    context.clearRect(0, 0, canvas.width, canvas.height); // Clear with transparent background

    context.font = 'Bold 40px Arial';
    context.fillStyle = color;
    context.textAlign = 'center';
    context.textBaseline = 'middle';

    // Initial text
    context.fillText(message, 256, 256);

    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    // Create sprite material with transparency enabled
    const spriteMaterial = new THREE.SpriteMaterial({
        map: texture,
        transparent: true, // Enable transparency
        depthWrite: false, // Prevent z-fighting with other objects
        depthTest: true    // Ensure proper rendering order
    });
    const sprite = new THREE.Sprite(spriteMaterial);
    const baseScale = message === 'r' ? 3 : 1; // Larger base for 'r'
    sprite.scale.set(baseScale, baseScale, 1);
    sprite.userData = { baseScale };
    sprite.frustumCulled = false;

    // Function to update text
    function updateText(newText) {
        context.clearRect(0, 0, canvas.width, canvas.height); // Clear previous text
        context.fillText(newText, 256, 256); // Center new text
        texture.needsUpdate = true; // Mark texture for update
    }

    return { sprite, updateText };
}

// Initialize labels
const radiusSpriteObj = createTextSprite('r', '#ff0000');
const velocitySpriteObj = createTextSprite('v', '#00ff00');
const angularMomentumSpriteObj = createTextSprite('h', '#ffa500');

const radiusLabel = radiusSpriteObj.sprite;
const velocityLabel = velocitySpriteObj.sprite;
const angularMomentumLabel = angularMomentumSpriteObj.sprite;

scene.add(radiusLabel);
scene.add(velocityLabel);
scene.add(angularMomentumLabel);

radiusLabel.visible = false;
velocityLabel.visible = false;
angularMomentumLabel.visible = false;

radiusLine.frustumCulled = false;
velocityLine.frustumCulled = false;
angularMomentumLine.frustumCulled = false;
targetDirectionLine.frustumCulled = false;

//Initialize Ambient Menu Descriptions and Add Ambient Light
document.getElementById('increaseAmbient').textContent = `Increase Ambient (${(ambientIntensity * 100).toFixed(0)}%)`;
document.getElementById('decreaseAmbient').textContent = `Decrease Ambient (${(ambientIntensity * 100).toFixed(0)}%)`;

const ambientLight = new THREE.AmbientLight(0xffffff, ambientIntensity); // Dim gray light
scene.add(ambientLight);
 
// Simulation state (add this with existing variables)


// Three.js objects (already exists, modified for clarity)
const celestialObjects = [];
const planetOrbitLines = [];
const moonOrbitLines = [];
const asteroidOrbitLines = [];

// Solve Kepler's equation for eccentric anomaly E
function solveKepler(M, e) {
    let E = M;
    for (let i = 0; i < KEPLER_ITERATION_PRECISION; i++) { // Simple iteration
        E = M + e * Math.sin(E);
    }
    return E;
}


// Calculate 3D position from orbital elements
function getPosition(orbitalElements, centralMass, time, type, orbitScale = 1) {
    const { a, e, i, Omega, omega, M0 } = orbitalElements;
    const T = Math.sqrt((a * a * a) / centralMass); // Orbital period
    const n = (2 * Math.PI) / T; // Mean motion
    const M = M0 * (Math.PI / 180) + n * time; // Mean anomaly
    const E = solveKepler(M, e); // Eccentric anomaly
    const theta = 2 * Math.atan2(Math.sqrt(1 + e) * Math.sin(E / 2), Math.sqrt(1 - e) * Math.cos(E / 2));

    //Scale Orbital Radius with 3D coordinates
    const rOrig = a * (1 - e * Math.cos(E));
    const r = rOrig * orbitScale * nHardCodeOrbitScaleFactor;

    // Position in orbital plane
    const x_orbit = r * Math.cos(theta);
    const y_orbit = r * Math.sin(theta);

    // Rotation matrices (angles in radians)
    const iRad = i * (Math.PI / 180);
    const OmegaRad = Omega * (Math.PI / 180);
    const omegaRad = omega * (Math.PI / 180);

    // Transformation to 3D coordinates
    const x = (Math.cos(OmegaRad) * Math.cos(omegaRad) - Math.sin(OmegaRad) * Math.sin(omegaRad) * Math.cos(iRad)) * x_orbit +
              (-Math.cos(OmegaRad) * Math.sin(omegaRad) - Math.sin(OmegaRad) * Math.cos(omegaRad) * Math.cos(iRad)) * y_orbit;
    const y = (Math.sin(OmegaRad) * Math.cos(omegaRad) + Math.cos(OmegaRad) * Math.sin(omegaRad) * Math.cos(iRad)) * x_orbit +
              (-Math.sin(OmegaRad) * Math.sin(omegaRad) + Math.cos(OmegaRad) * Math.cos(omegaRad) * Math.cos(iRad)) * y_orbit;
    const z = (Math.sin(omegaRad) * Math.sin(iRad)) * x_orbit + (Math.cos(omegaRad) * Math.sin(iRad)) * y_orbit;

    return { pos: new THREE.Vector3(x , y , z ), elements: {T: T, n: n, M: M, E: E, theta: theta, r: rOrig}}; // Scale for visibility

    
}

function getVelocityAndAngularMomentum(orbitalElements, centralMass, time, position, currentElements) {
    const { a, e, i, Omega, omega, M0 } = orbitalElements;
    /*const T = Math.sqrt((a * a * a) / centralMass); // Orbital period
    const n = (2 * Math.PI) / T; // Mean motion
    const M = M0 * (Math.PI / 180) + n * time; // Mean anomaly
    const E = solveKepler(M, e); // Eccentric anomaly
    const theta = 2 * Math.atan2(Math.sqrt(1 + e) * Math.sin(E / 2), Math.sqrt(1 - e) * Math.cos(E / 2));*/

    //const T = currentElements.T; // Orbital period
    //const n = currentElements.n; // Mean motion
    //const M = currentElements.M; // Mean anomaly

    const E = currentElements.E; // Eccentric anomaly
    const theta = currentElements.theta;

    //const r = a * (1 - e * Math.cos(E));

    const r = currentElements.r;

    // Velocity components in orbital plane (simplified Keplerian)
    const mu = G * centralMass; // Gravitational parameter
    //const vMag = Math.sqrt(mu * (2 / r - 1 / a)); // Magnitude from vis-viva equation
    const vXOrbit = -Math.sqrt(mu / (a * (1 - e * e))) * Math.sin(theta); // Radial component
    const vYOrbit = Math.sqrt(mu / (a * (1 - e * e))) * (e + Math.cos(theta)); // Tangential component

    // Transform to 3D space (similar to getPosition)
    const iRad = i * (Math.PI / 180);
    const OmegaRad = Omega * (Math.PI / 180);
    const omegaRad = omega * (Math.PI / 180);

    const vX = (Math.cos(OmegaRad) * Math.cos(omegaRad) - Math.sin(OmegaRad) * Math.sin(omegaRad) * Math.cos(iRad)) * vXOrbit +
               (-Math.cos(OmegaRad) * Math.sin(omegaRad) - Math.sin(OmegaRad) * Math.cos(omegaRad) * Math.cos(iRad)) * vYOrbit;
    const vY = (Math.sin(OmegaRad) * Math.cos(omegaRad) + Math.cos(OmegaRad) * Math.sin(omegaRad) * Math.cos(iRad)) * vXOrbit +
               (-Math.sin(OmegaRad) * Math.sin(omegaRad) + Math.cos(OmegaRad) * Math.cos(omegaRad) * Math.cos(iRad)) * vYOrbit;
    const vZ = (Math.sin(omegaRad) * Math.sin(iRad)) * vXOrbit + (Math.cos(omegaRad) * Math.sin(iRad)) * vYOrbit;

    //const velocity = new THREE.Vector3(vX * nHardCodeOrbitScaleFactor, vY * nHardCodeOrbitScaleFactor, vZ * nHardCodeOrbitScaleFactor); // Scale like position
    const velocity = new THREE.Vector3(vX , vY , vZ ); // Scale like position
    // Angular momentum = r × v (cross product)
    const angularMomentum = position.clone().cross(velocity);

    return { velocity, angularMomentum };
}

// Create orbit line
function createOrbitLine(orbitalElements, centralMass, color, steps = 100) {
    const points = [];
    for (let i = 0; i <= steps; i++) {
        const theta = (i / steps) * 2 * Math.PI;
        const r = (orbitalElements.a * (1 - orbitalElements.e * orbitalElements.e)) /
                  (1 + orbitalElements.e * Math.cos(theta));
        const {pos, elements} = getPosition({ ...orbitalElements, M0: theta * (180 / Math.PI) }, centralMass, 0, "planet", 1);
        points.push(pos);
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color });
    return new THREE.LineLoop(geometry, material);
}

function updateProgress(message) {
    loadedTextures++;
    const percentage = (loadedTextures / totalTextures) * 100;
    setTimeout(() => {
        const progressBar = document.getElementById('progressBar');
        const logDiv = document.getElementById('loadingLog');
        progressBar.style.width = `${percentage}%`;
        logDiv.innerHTML += `${message}<br>`;
        logDiv.scrollTop = logDiv.scrollHeight;
        if (loadedTextures === totalTextures && !simulationStarted) {
            simulationStarted = true;
            setTimeout(() => {
                document.getElementById('loadingPopup').style.display = 'none';
                updatePlanetScales();
                // Do not call animate() here — the loop is started once at the end of init.
                // A second start would run two rAF loops and advance simulation ~2× too fast.
            }, 500);
        }
    }, 0);
}

// Modified getTexturesForPlanet with responsive updates
function getTexturesForPlanet(oPlanet) {
    const imageTextureLoader = new THREE.TextureLoader();
    const textureLoaderDDS = new THREE.DDSLoader();
    let textureLoader = imageTextureLoader;
    let surfaceTexture = null;
    let normalMap = null;
    let specularMap = null;
    let cloudTexture = null;
    let ringTexture = null;
    let bumpTexture = null;
    let nightMap = null;

    if (TEXTURE_PATH === "") {
        // Skip loading textures if "None" is selected
        if (oPlanet.texture) updateProgress(`${oPlanet.name} surface texture skipped (Texture Size: None)`);
        if (oPlanet.normalMap) updateProgress(`${oPlanet.name} normal map texture skipped (Texture Size: None)`);
        if (oPlanet.specularMap) updateProgress(`${oPlanet.name} specular map texture skipped (Texture Size: None)`);
        if (oPlanet.atmosphere_texture) updateProgress(`${oPlanet.name} atmosphere texture skipped (Texture Size: None)`);
        if (oPlanet.ring_texture) updateProgress(`${oPlanet.name} ring texture skipped (Texture Size: None)`);
        if (oPlanet.bump_texture) updateProgress(`${oPlanet.name} bump texture skipped (Texture Size: None)`);
        if (oPlanet.nightMap) updateProgress(`${oPlanet.name} night map texture skipped (Texture Size: None)`);

        return { surfaceTexture, normalMap, specularMap, cloudTexture, ringTexture, bumpTexture, nightMap };
    }

    function applyAnisotropic(texture, name, isDDS=false) {
        const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
        if (texture && settings.anisotropicFiltering === 'ON' && maxAnisotropy) {
            if( isDDS )
            {
                texture.anisotropy = Math.min(16, maxAnisotropy);
                console.log(`DDS ${name} anisotropy set to ${texture.anisotropy}`);
            }
            else
            {
                texture.anisotropy = Math.min(16, maxAnisotropy);
                texture.minFilter = THREE.LinearMipMapLinearFilter;
                texture.magFilter = THREE.LinearFilter;
                texture.generateMipmaps = true; // Ensure Three.js generates mipmaps
                texture.encoding = THREE.sRGBEncoding;
                console.log(`${name} anisotropy set to ${texture.anisotropy}`);
            }
        } else {
            texture.anisotropy = 1;
            texture.minFilter = THREE.LinearFilter; // Fallback
            texture.magFilter = THREE.LinearFilter;
            //texture.generateMipmaps = true;
        }
        return texture;
    }

    if (oPlanet.texture) {
        const isDDS = oPlanet.texture.toLowerCase().endsWith('.dds');
        if (oPlanet.texture && isDDS) {
            // Do something here
            textureLoader = textureLoaderDDS;
        }
        else
        {
            textureLoader = imageTextureLoader;
        }

        surfaceTexture = textureLoader.load(
            TEXTURE_PATH + oPlanet.texture,
            (tex) => {
                applyAnisotropic(tex, `${oPlanet.name} surface`, isDDS);
                updateProgress(`${oPlanet.name} texture map loaded`);
            },
            undefined,
            (error) => {
                console.error(`${oPlanet.name} texture map load error:`, error);
                updateProgress(`${oPlanet.name} texture map load error`);
            }
        );
    }
    if (oPlanet.normalMap) {
        const isDDS = oPlanet.normalMap.toLowerCase().endsWith('.dds');
        if (oPlanet.normalMap && isDDS) {
            // Do something here
            textureLoader = textureLoaderDDS;
        }
        else
        {
            textureLoader = imageTextureLoader;
        }
        normalMap = textureLoader.load(
            TEXTURE_PATH + oPlanet.normalMap,
            (tex) => {
                applyAnisotropic(tex, `${oPlanet.name} normal`, isDDS);
                updateProgress(`${oPlanet.name} normal map loaded`);
            },
            undefined,
            (error) => {
                console.error(`${oPlanet.name} normal map load error:`, error);
                updateProgress(`${oPlanet.name} normal map load error`);
            }
        );
    }
    if (oPlanet.specularMap) {
        const isDDS = oPlanet.specularMap.toLowerCase().endsWith('.dds');
        if (oPlanet.specularMap && isDDS) {
            // Do something here
            textureLoader = textureLoaderDDS;
        }
        else
        {
            textureLoader = imageTextureLoader;
        }

        specularMap = textureLoader.load(
            TEXTURE_PATH + oPlanet.specularMap,
            (tex) => {
                applyAnisotropic(tex, `${oPlanet.name} specular`, isDDS);
                updateProgress(`${oPlanet.name} specular map loaded`);
            },
            undefined,
            (error) => {
                console.error(`${oPlanet.name} specular map load error:`, error);
                updateProgress(`${oPlanet.name} specular map load error`);
            }
        );
    }
    if (oPlanet.atmosphere_texture) {
        const isDDS = oPlanet.atmosphere_texture.toLowerCase().endsWith('.dds');
        if (oPlanet.atmosphere_texture && isDDS) {
            // Do something here
            textureLoader = textureLoaderDDS;
        }
        else
        {
            textureLoader = imageTextureLoader;
        }
        cloudTexture = textureLoader.load(
            TEXTURE_PATH + oPlanet.atmosphere_texture,
            (tex) => {
                applyAnisotropic(tex, `${oPlanet.name} atmosphere`, isDDS);
                updateProgress(`${oPlanet.name} cloud texture loaded`);
            },
            undefined,
            (error) => {
                console.error(`${oPlanet.name} cloud texture load error:`, error);
                updateProgress(`${oPlanet.name} cloud texture load error`);
            }
        );
    }
    if (oPlanet.ring_texture) {
        const isDDS = oPlanet.ring_texture.toLowerCase().endsWith('.dds');
        if (oPlanet.ring_texture && isDDS) {
            // Do something here
            textureLoader = textureLoaderDDS;
        }
        else
        {
            textureLoader = imageTextureLoader;
        }
        ringTexture = textureLoader.load(
            TEXTURE_PATH + oPlanet.ring_texture,
            (tex) => {
                applyAnisotropic(tex, `${oPlanet.name} ring`,isDDS);
                updateProgress(`${oPlanet.name} ring texture loaded`);
            },
            undefined,
            (error) => {
                console.error(`${oPlanet.name} ring texture load error:`, error);
                updateProgress(`${oPlanet.name} ring texture load error`);
            }
        );
    }
    if (oPlanet.bump_texture) {
        const isDDS = oPlanet.bump_texture.toLowerCase().endsWith('.dds');
        if (oPlanet.bump_texture && isDDS) {
            // Do something here
            textureLoader = textureLoaderDDS;
        }
        else
        {
            textureLoader = imageTextureLoader;
        }
        bumpTexture = textureLoader.load(
            TEXTURE_PATH + oPlanet.bump_texture,
            (tex) => {
                applyAnisotropic(tex, `${oPlanet.name} bump`,isDDS);
                updateProgress(`${oPlanet.name} bump texture loaded`);
            },
            undefined,
            (error) => {
                console.error(`${oPlanet.name} bump texture load error:`, error);
                updateProgress(`${oPlanet.name} bump texture load error`);
            }
        );
    }
    if (oPlanet.nightMap) {
        const isDDS = oPlanet.nightMap.toLowerCase().endsWith('.dds');
        textureLoader = isDDS ? textureLoaderDDS : imageTextureLoader;
        nightMap = textureLoader.load(
            TEXTURE_PATH + oPlanet.nightMap,
            (tex) => {
                applyAnisotropic(tex, `${oPlanet.name} night`, isDDS);
                updateProgress(`${oPlanet.name} night map loaded`);
            },
            undefined,
            (error) => {
                console.error(`${oPlanet.name} night map load error:`, error);
                updateProgress(`${oPlanet.name} night map load error`);
            }
        );
    }

    return { surfaceTexture, normalMap, specularMap, cloudTexture, ringTexture, bumpTexture, nightMap };
}

/** Shared moon-umbra uniforms for soft / Earth surface shaders (analytic sphere occlusion). */
function createMoonShadowUniforms() {
    const positions = [];
    for (let i = 0; i < MAX_MOON_SHADOWS; i++) {
        positions.push(new THREE.Vector3());
    }
    return {
        moonPositions: { value: positions },
        moonRadii: { value: new Array(MAX_MOON_SHADOWS).fill(0) },
        moonCount: { value: 0 },
        enableMoonShadows: { value: isShaderOn('shaderMoonShadows') ? 1.0 : 0.0 }
    };
}

/**
 * Push moon world centers + scaled radii into surface-shader uniforms.
 * Call after moon local positions are updated for this frame.
 */
function updateMoonShadowUniforms(planetObj) {
    if (!planetObj.advancedUniforms || !planetObj.advancedUniforms.length) return;

    let moonShadowCount = 0;
    const moonShadowPos = [];
    const moonShadowRad = [];

    if (isShaderOn('shaderMoonShadows') && planetObj.data.moons && planetObj.data.moons.length) {
        for (let mi = 0; mi < planetObj.data.moons.length && moonShadowCount < MAX_MOON_SHADOWS; mi++) {
            const moonData = planetObj.data.moons[mi];
            const moonObj = getMeshByName(moonData.name);
            if (!moonObj || !moonObj.mesh) continue;
            const mPos = new THREE.Vector3();
            moonObj.mesh.getWorldPosition(mPos);
            const mScale = getScaleForObject(moonObj).finalPlanetScale || 1;
            const mRadius = (moonData.radius || moonObj.data.radius || 0) * nHardCodeScaleFactor * mScale;
            if (mRadius < 1e-12) continue;
            moonShadowPos.push(mPos);
            moonShadowRad.push(mRadius);
            moonShadowCount++;
        }
    }

    const enabled = isShaderOn('shaderMoonShadows') ? 1.0 : 0.0;
    planetObj.advancedUniforms.forEach(u => {
        if (!u.moonCount || !u.moonPositions || !u.moonRadii) return;
        u.enableMoonShadows.value = enabled;
        u.moonCount.value = moonShadowCount;
        for (let i = 0; i < moonShadowCount; i++) {
            u.moonPositions.value[i].copy(moonShadowPos[i]);
            u.moonRadii.value[i] = moonShadowRad[i];
        }
        for (let i = moonShadowCount; i < MAX_MOON_SHADOWS; i++) {
            u.moonRadii.value[i] = 0;
        }
    });
}

function createEarthMaterial(surfaceTexture, normalMap, specularMap, nightMap) {
    const dummy = new THREE.Texture();
    const soft = isShaderOn('shaderSoftLighting') ? 0.35 : 0.05;
    return new THREE.ShaderMaterial({
        uniforms: {
            dayMap: { value: surfaceTexture },
            nightMap: { value: nightMap || dummy },
            normalMap: { value: normalMap || dummy },
            specularMap: { value: specularMap || dummy },
            sunDirection: { value: new THREE.Vector3(1, 0, 0) },
            ambientColor: { value: new THREE.Color(ambientIntensity, ambientIntensity, ambientIntensity) },
            softTerminator: { value: soft },
            nightLightsEnabled: { value: isShaderOn('shaderEarthNight') ? 1.0 : 0.0 },
            hasNightMap: { value: nightMap ? 1.0 : 0.0 },
            hasNormalMap: { value: normalMap ? 1.0 : 0.0 },
            hasSpecularMap: { value: specularMap ? 1.0 : 0.0 },
            shininess: { value: 48.0 },
            ...createMoonShadowUniforms()
        },
        vertexShader: ss_shaders.advancedPlanetVertex,
        fragmentShader: ss_shaders.earthSurfaceFragment
    });
}

function createSoftPlanetMaterial(oPlanet, surfaceTexture, normalMap, specularMap) {
    const dummy = new THREE.Texture();
    const isIo = oPlanet.name === 'Io';
    const ioGlow = isIo && isShaderOn('shaderIoGlow');
    return new THREE.ShaderMaterial({
        uniforms: {
            map: { value: surfaceTexture },
            normalMap: { value: normalMap || dummy },
            specularMap: { value: specularMap || dummy },
            sunDirection: { value: new THREE.Vector3(1, 0, 0) },
            ambientColor: { value: new THREE.Color(ambientIntensity, ambientIntensity, ambientIntensity) },
            softTerminator: { value: isShaderOn('shaderSoftLighting') ? 0.4 : 0.05 },
            hasNormalMap: { value: normalMap ? 1.0 : 0.0 },
            hasSpecularMap: { value: specularMap ? 1.0 : 0.0 },
            shininess: { value: 20.0 },
            emissiveColor: { value: new THREE.Color(ioGlow ? 0xff6622 : 0x000000) },
            emissiveIntensity: { value: ioGlow ? 0.22 : 0.0 },
            ...createMoonShadowUniforms()
        },
        vertexShader: ss_shaders.advancedPlanetVertex,
        fragmentShader: ss_shaders.softPlanetFragment
    });
}

function createMaterialFromTextures( oPlanet, surfaceTexture, normalMap, specularMap, cloudTexture, nightMap )
{
    let material = null;
    const normalScale = 1;

    // Advanced Earth path (day/night + soft lighting + moon umbra)
    if (oPlanet.name === 'Earth' && surfaceTexture && settings.areShadersEnabled === 'ON' &&
        (isShaderOn('shaderEarthNight') || isShaderOn('shaderSoftLighting') || isShaderOn('shaderMoonShadows'))) {
        return createEarthMaterial(surfaceTexture, normalMap, specularMap, nightMap);
    }

    // Soft terminator / Io glow / moon umbra for textured bodies
    if (surfaceTexture && settings.areShadersEnabled === 'ON' &&
        (isShaderOn('shaderSoftLighting') || isShaderOn('shaderMoonShadows') ||
         (oPlanet.name === 'Io' && isShaderOn('shaderIoGlow')))) {
        return createSoftPlanetMaterial(oPlanet, surfaceTexture, normalMap, specularMap);
    }

    if( surfaceTexture )
    {
        surfaceTexture.wrapS = THREE.RepeatWrapping;
        surfaceTexture.wrapT = THREE.RepeatWrapping;
        if( specularMap )
        {
            material = new THREE.MeshPhongMaterial({
                map: surfaceTexture, // Apply texture
                normalMap: normalMap,      // Normal map for surface detail
                normalScale: new THREE.Vector2(normalScale, normalScale), // Strength of normal effect (adjustable)
                specularMap: specularMap,  // Specular map for reflectivity
                //color: 0x0000ff,  // Base color (will be modulated by texture)
                specular: 0x222222, // Add some shininess
                shininess: 25
                });
        }
        else
        {
            material = new THREE.MeshPhongMaterial({
                map: surfaceTexture, // Apply texture
                normalMap: normalMap,      // Normal map for surface detail
                normalScale: new THREE.Vector2(normalScale, normalScale), // Strength of normal effect (adjustable)
                });
        }

        // Io volcanic glow without full soft-planet shader path
        if (oPlanet.name === 'Io' && isShaderOn('shaderIoGlow') && material.emissive) {
            material.emissive = new THREE.Color(0xff5522);
            material.emissiveIntensity = 0.25;
        }
    }
    else
    {
        material = new THREE.MeshPhongMaterial({ color: oPlanet.color });
        if (oPlanet.name === 'Io' && isShaderOn('shaderIoGlow')) {
            material.emissive = new THREE.Color(0xff5522);
            material.emissiveIntensity = 0.25;
        }
    }
    return material;
}

function createRingShaderMaterial(ringTexture, planetRadiusScaled) {
    return new THREE.ShaderMaterial({
        uniforms: {
            ringMap: { value: ringTexture },
            sunDirection: { value: new THREE.Vector3(1, 0, 0) },
            planetPosition: { value: new THREE.Vector3(0, 0, 0) },
            planetRadius: { value: planetRadiusScaled },
            ambient: { value: 0.2 },
            enableShadows: { value: 1.0 }
        },
        vertexShader: ss_shaders.ringVertex,
        fragmentShader: ss_shaders.ringFragment,
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false
    });
}

function createAuroraMesh(celestialBody) {
    const surfaceR = celestialBody.radius * nHardCodeScaleFactor;
    const isJupiter = celestialBody.name === 'Jupiter';
    const isEarth = celestialBody.name === 'Earth';

    // --- Earth: ribbon shell + volumetric radial spike rays ---
    if (isEarth) {
        const group = new THREE.Group();
        group.name = 'aurora';

        // Ribbons: higher tessellation so vertex bulge stays smooth; detail is fragment-driven
        const ribbonGeo = new THREE.SphereGeometry(surfaceR * 1.008, 192, 192);
        const ribbonMat = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0.0 },
                sunDirection: { value: new THREE.Vector3(1, 0, 0) },
                intensity: { value: 0.55 },
                maxHeight: { value: 0.04 }
            },
            vertexShader: ss_shaders.earthAuroraVertex,
            fragmentShader: ss_shaders.earthAuroraFragment,
            transparent: true,
            depthWrite: false,
            depthTest: true,
            blending: THREE.AdditiveBlending,
            side: THREE.FrontSide
        });
        const ribbons = new THREE.Mesh(ribbonGeo, ribbonMat);
        ribbons.name = 'auroraRibbons';
        ribbons.renderOrder = 3;
        ribbons.frustumCulled = true;
        group.add(ribbons);

        // Spikes: tall volumetric shell — field-aligned needles shoot outward along normals
        const spikeScale = 1.085;
        const spikeGeo = new THREE.SphereGeometry(surfaceR * spikeScale, 128, 128);
        const spikeMat = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0.0 },
                sunDirection: { value: new THREE.Vector3(1, 0, 0) },
                intensity: { value: 0.28 },
                planetRadius: { value: surfaceR },
                atmosphereScale: { value: spikeScale }
            },
            vertexShader: ss_shaders.earthAuroraSpikeVertex,
            fragmentShader: ss_shaders.earthAuroraSpikeFragment,
            transparent: true,
            depthWrite: false,
            depthTest: true,
            blending: THREE.AdditiveBlending,
            side: THREE.DoubleSide
        });
        const spikes = new THREE.Mesh(spikeGeo, spikeMat);
        spikes.name = 'auroraSpikes';
        spikes.renderOrder = 4;
        spikes.frustumCulled = true;
        group.add(spikes);

        return group;
    }

    // --- Jupiter: volumetric ray-marched polar swirl (unchanged) ---
    const atmosphereScale = 1.045;
    const outerR = surfaceR * atmosphereScale;
    const geo = new THREE.SphereGeometry(outerR, 128, 128);
    const mat = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0.0 },
            sunDirection: { value: new THREE.Vector3(1, 0, 0) },
            intensity: { value: 0.3 },
            variant: { value: 1.0 },
            planetRadius: { value: surfaceR },
            atmosphereScale: { value: atmosphereScale }
        },
        vertexShader: ss_shaders.auroraVertex,
        fragmentShader: ss_shaders.auroraFragment,
        transparent: true,
        depthWrite: false,
        depthTest: true,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.name = 'aurora';
    mesh.renderOrder = 3;
    mesh.frustumCulled = true;
    return mesh;
}

// Named southern-hemisphere storm cells (Three.js UV: v=0 north, v=1 south).
// GRS ~22°S → v ≈ 0.622; other sites spread across the lower hemisphere.
const JUPITER_STORM_SITES = [
    // Great Red Spot (primary)
    { u: 0.48, v: 0.622, ew: 0.065, ns: 0.038, weight: 2.5 },
    // Other SEB / southern belt storm cells (approximate longitudes)
    { u: 0.12, v: 0.64, ew: 0.04, ns: 0.028, weight: 1.0 },
    { u: 0.78, v: 0.61, ew: 0.045, ns: 0.03, weight: 1.0 },
    { u: 0.30, v: 0.70, ew: 0.035, ns: 0.025, weight: 0.9 },
    { u: 0.62, v: 0.68, ew: 0.038, ns: 0.026, weight: 0.9 },
    { u: 0.90, v: 0.75, ew: 0.04, ns: 0.03, weight: 0.8 },
    { u: 0.22, v: 0.80, ew: 0.035, ns: 0.028, weight: 0.7 },
    { u: 0.55, v: 0.58, ew: 0.042, ns: 0.03, weight: 0.8 }
];

/** Pick a storm site (weighted) or a random southern-hemisphere cell. */
function pickJupiterStormSite() {
    // ~35% fully random southern cell so the whole lower hemisphere can flash
    if (Math.random() < 0.35) {
        return {
            u: Math.random(),
            // v 0.52–0.88 ≈ equator-south through deep southern mid-latitudes
            v: 0.52 + Math.random() * 0.36,
            ew: 0.028 + Math.random() * 0.035,
            ns: 0.02 + Math.random() * 0.02
        };
    }
    let total = 0;
    for (let i = 0; i < JUPITER_STORM_SITES.length; i++) total += JUPITER_STORM_SITES[i].weight;
    let r = Math.random() * total;
    for (let i = 0; i < JUPITER_STORM_SITES.length; i++) {
        r -= JUPITER_STORM_SITES[i].weight;
        if (r <= 0) {
            const s = JUPITER_STORM_SITES[i];
            // Slight jitter so bolts don't always hit the exact same pixel
            return {
                u: (s.u + (Math.random() - 0.5) * 0.04 + 1) % 1,
                v: s.v + (Math.random() - 0.5) * 0.02,
                ew: s.ew * (0.85 + Math.random() * 0.35),
                ns: s.ns * (0.85 + Math.random() * 0.35)
            };
        }
    }
    const s = JUPITER_STORM_SITES[0];
    return { u: s.u, v: s.v, ew: s.ew, ns: s.ns };
}

/**
 * Southern-storm lightning shell — separate from polar aurora.
 * Flashes near GRS and other lower-hemisphere storm cells.
 */
function createJupiterGrsLightningMesh(celestialBody) {
    const surfaceR = celestialBody.radius * nHardCodeScaleFactor;
    const shellR = surfaceR * 1.012;
    const geo = new THREE.SphereGeometry(shellR, 96, 96);
    const site = pickJupiterStormSite();
    const mat = new THREE.ShaderMaterial({
        uniforms: {
            lightningFlash: { value: 0.0 },
            lightningSeed: { value: 0.0 },
            stormUV: { value: new THREE.Vector2(site.u, site.v) },
            stormScale: { value: new THREE.Vector2(site.ew, site.ns) },
            intensity: { value: 0.85 }
        },
        vertexShader: ss_shaders.grsLightningVertex,
        fragmentShader: ss_shaders.grsLightningFragment,
        transparent: true,
        depthWrite: false,
        depthTest: true,
        blending: THREE.AdditiveBlending,
        side: THREE.FrontSide
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.name = 'grsLightning';
    mesh.renderOrder = 4;
    mesh.frustumCulled = true;
    // First bolt 3–8s from now (real wall-clock, not sim timeScale)
    mesh.userData.lightning = {
        nextFlashAt: performance.now() + (3 + Math.random() * 5) * 1000,
        flashStart: -1e9,
        flashDuration: 0.9,
        seed: Math.random() * 1000
    };
    return mesh;
}

/**
 * Advance Jupiter southern-storm lightning using real wall-clock ms.
 * Interval 3–8s; arc duration 0.9s ± 0.4s; new site + pattern seed each event.
 */
function updateJupiterGrsLightning(lightningMesh, nowMs) {
    if (!lightningMesh || !lightningMesh.material || !lightningMesh.material.uniforms) return;
    const u = lightningMesh.material.uniforms;
    if (!u.lightningFlash) return;

    let state = lightningMesh.userData.lightning;
    if (!state) {
        state = {
            nextFlashAt: nowMs + (3 + Math.random() * 5) * 1000,
            flashStart: -1e9,
            flashDuration: 0.9,
            seed: Math.random() * 1000
        };
        lightningMesh.userData.lightning = state;
    }

    if (nowMs >= state.nextFlashAt) {
        state.flashStart = nowMs;
        state.seed = Math.random() * 10000;
        state.flashDuration = 0.9 + (Math.random() * 0.8 - 0.4);
        state.nextFlashAt = nowMs + (3 + Math.random() * 5) * 1000;

        // New storm cell: GRS / named southern sites / random lower hemisphere
        const site = pickJupiterStormSite();
        if (u.stormUV) u.stormUV.value.set(site.u, site.v);
        if (u.stormScale) u.stormScale.value.set(site.ew, site.ns);
    }

    const age = (nowMs - state.flashStart) / 1000;
    const dur = state.flashDuration || 0.9;
    let flash = 0.0;
    if (age >= 0.0 && age < dur) {
        const t = age / dur;
        const env = Math.exp(-t * 2.8) * (1.0 - t * 0.15);
        const flicker = 0.55 + 0.45 * Math.max(0, Math.sin(age * 22.0 + 0.4));
        const pulse2 = t > 0.15 ? Math.exp(-(t - 0.15) * 5.5) * 0.55 : 0.0;
        const pulse3 = t > 0.35 ? Math.exp(-(t - 0.35) * 4.5) * 0.4 : 0.0;
        const pulse4 = t > 0.55 ? Math.exp(-(t - 0.55) * 4.0) * 0.28 : 0.0;
        flash = Math.min(1.0, env * flicker + pulse2 + pulse3 + pulse4);
    }

    u.lightningFlash.value = flash;
    u.lightningSeed.value = state.seed;
}

function createPlanetRingGeometry( innerRadius = 0.5, outerRadius = 1, thetaSegments = 32, phiSegments = 1, thetaStart = 0, thetaLength = Math.PI * 2)
{
    const ringGeometry = new THREE.BufferGeometry;
    // buffers
    const indices = [];
    const vertices = [];
    const normals = [];
    const uvs = [];

    // some helper variables

    let radius = innerRadius;
    const radiusStep = (outerRadius - innerRadius) / phiSegments;
    const vertex = new THREE.Vector3();
    let uv = new THREE.Vector2();

    // generate vertices, normals and uvs

    for (let j = 0; j <= phiSegments; j++) {
      for (let i = 0; i <= thetaSegments; i++) {
        // values are generate from the inside of the ring to the outside

        const segment = thetaStart + (i / thetaSegments) * thetaLength;

        // vertex

        vertex.x = radius * Math.cos(segment);
        vertex.y = radius * Math.sin(segment);

        vertices.push(vertex.x, vertex.y, vertex.z);

        // normal

        normals.push(0, 0, 1);

        // uv
        uv = new THREE.Vector2(j / phiSegments, i / thetaSegments);

        uvs.push(uv.x, uv.y);
      }

      // increase the radius for next row of vertices

      radius += radiusStep;
    }

    // indices

    for (let j = 0; j < phiSegments; j++) {
      const thetaSegmentLevel = j * (thetaSegments + 1);

      for (let i = 0; i < thetaSegments; i++) {
        const segment = i + thetaSegmentLevel;

        const a = segment;
        const b = segment + thetaSegments + 1;
        const c = segment + thetaSegments + 2;
        const d = segment + 1;

        // faces

        indices.push(a, b, d);
        indices.push(b, c, d);
      }
    }

    ringGeometry.setIndex(indices);
    ringGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    ringGeometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
    ringGeometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    return ringGeometry;
}

initializeCelestialBodies();


function loadCelestialObjectFromMesh( celestialBody )
{   
    const dracoLoader = new THREE.DRACOLoader();
    dracoLoader.setDecoderPath('./js/draco/'); // CDN path
    //dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
    //dracoLoader.setDecoderConfig({ type: 'js' }); // Optional: Use JS decoder (less memory-intensive)


    const GLTFLoader = new THREE.GLTFLoader();
    GLTFLoader.setDRACOLoader(dracoLoader);
    const celestialBodyGroup = new THREE.Group();
    let hasAtmosphere = 0;
    let hasRing = 0;
    return new Promise((resolve, reject) => {
        GLTFLoader.load(
            `./mesh/${celestialBody.mesh}`,
            (obj) => {
                const loadedCelestialMesh = obj.scene.children[0];
                if (loadedCelestialMesh && loadedCelestialMesh.isMesh) {
                    celestialGeometry = loadedCelestialMesh.geometry;
                    celestialGeometry.computeVertexNormals();

                    if (!celestialGeometry.attributes.normal || celestialGeometry.attributes.normal.count === 0) {
                        console.warn(`${celestialBody.name} has no normals, recomputing...`);
                        celestialGeometry.computeVertexNormals();
                    }

                    // Center and scale
                    celestialGeometry.center();
                    celestialGeometry.computeBoundingSphere();
                    

                    const boundingRadius = celestialGeometry.boundingSphere.radius;
                    const desiredRadius = celestialBody.radius * nHardCodeScaleFactor;
                    const scaleFactor = desiredRadius / boundingRadius;
                    
                    //Assign the name
                    loadedCelestialMesh.name = celestialBody.name;
                    
                    //set the initialScale to scaleFactor;
                    loadedCelestialMesh.userData.initialScale = scaleFactor ;
                    
                    //initial rotation
                    loadedCelestialMesh.rotation.x = Math.PI / 2;
                    loadedCelestialMesh.visible = true;
                    
                    loadedCelestialMesh.geometry.normalsNeedUpdate = true;
                    loadedCelestialMesh.geometry.scale(scaleFactor, scaleFactor, scaleFactor);

                    


                    celestialBodyGroup.add(loadedCelestialMesh);
                    
                    scene.add(celestialBodyGroup);

                    const celestialObject = { mesh: celestialBodyGroup, data: celestialBody, hasAtmosphere: hasAtmosphere, hasRing: hasRing };
                    
                    // Skip loading textures if "Mesh" successfully loaded
                    if (celestialBody.texture) updateProgress(`${celestialBody.name} surface texture skipped (Texture Size: None)`);
                    if (celestialBody.normalMap) updateProgress(`${celestialBody.name} normal map texture skipped (Texture Size: None)`);
                    if (celestialBody.specularMap) updateProgress(`${celestialBody.name} specular map texture skipped (Texture Size: None)`);
                    if (celestialBody.atmosphere_texture) updateProgress(`${celestialBody.name} atmosphere texture skipped (Texture Size: None)`);
                    if (celestialBody.ring_texture) updateProgress(`${celestialBody.name} ring texture skipped (Texture Size: None)`);
                    if (celestialBody.bump_texture) updateProgress(`${celestialBody.name} bump texture skipped (Texture Size: None)`);
            
                    //if (celestialBody.mesh) updateProgress(`${celestialBody.name} mesh 100% loaded`);
                    
                    resolve(celestialObject);
                    
                } else {
                    console.error(`No valid mesh in ${celestialBody.mesh}`);
                    reject(`No valid mesh in ${celestialBody.mesh}`);
                    //if (celestialBody.mesh) updateProgress(`${celestialBody.name} mesh not loaded`);
                }
                
            },
            (xhr) => console.log(`${celestialBody.mesh}: ${(xhr.loaded / xhr.total * 100).toFixed(2)}% loaded`),
            (error) => {
                console.error(`Error loading ${celestialBody.mesh}:`, error);
                reject(error);
                //if (celestialBody.mesh) updateProgress(`${celestialBody.name} mesh not loaded`);
            }
        ); 
    });
}


function getSunMaterial(surfaceTexture, celestialBody)
{
    if(surfaceTexture )
    {
        const sunMaterial = new THREE.ShaderMaterial({
            uniforms: {
                emissiveColor: { value: new THREE.Color(0xffff00) },
                intensity: { value: 1.0 },
                sunTexture: { value: surfaceTexture },
                time: { value: 0.0 }, // Add time uniform
                shader_enable: { value: isShaderOn('shaderSunTurbulence') }
            },
            vertexShader: ss_shaders.sunEmissiveVertex,
            fragmentShader: ss_shaders.sunEmissiveFragment
        });
        return sunMaterial;
    }
    else
    {   
        const sunMaterial = new THREE.MeshBasicMaterial({
            color: celestialBody.color, // Bright yellow
            emissive: celestialBody.color, // Ensure emissive glow
            emissiveIntensity: 1.0
        });
        
        return sunMaterial;
    }
    
}

function getStarGlowMesh( starBody)
{
    // Subtle shell past the photosphere (middle ground: not balloon, not invisible)
    const glowRadius = starBody.radius * nHardCodeScaleFactor * 1.03;
    const glowGeometry = new THREE.SphereGeometry(glowRadius, 48, 48);
    const coronaOn = isShaderOn('shaderSunCorona');

    const glowUniforms = {
        u_color: { value: new THREE.Color(coronaOn ? 0xffb040 : 0xffa500) }
    };

    const glowMaterial = new THREE.ShaderMaterial({
        vertexShader: ss_shaders.sunGlowVertex,
        fragmentShader: ss_shaders.sunGlowFragment,
        uniforms: glowUniforms,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthTest: true,
        depthWrite: false
    });

    const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
    glowMesh.name = 'sunGlow';
    // Size stays at 1.03×; corona only warms the color (no scale-up)
    return glowMesh;
}

function getStarFresnelMesh(starBody) {
    // Match glow shell; size only (shader formula unchanged)
    const radius = starBody.radius * nHardCodeScaleFactor * 1.03;
    const geo = new THREE.SphereGeometry(radius, 48, 48);
    const mat = new THREE.ShaderMaterial({
        vertexShader: ss_shaders.sunGlowVertex,
        fragmentShader: ss_shaders.sunFresnelFragment,
        uniforms: {
            u_color: { value: new THREE.Color(0xffcc66) }
        },
        side: THREE.FrontSide,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthTest: true,
        depthWrite: false
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.name = 'sunFresnel';
    return mesh;
}

/**
 * Volumetric solar flare / plasma-ejecta shell.
 * Ray-marched CMEs, prominence loops, and corona streamers (see sunFlareFragment).
 * Child of the surface mesh so active regions co-rotate with the photosphere.
 *
 * Single-sided shading (not DoubleSide): one ray-march per pixel.
 * Outside shell → FrontSide (near faces pass depth vs photosphere).
 * Inside shell  → BackSide  (interior of outer sphere fills the FOV).
 * Side is refreshed each frame by updateSunFlareMeshSide().
 */
function createSunFlareMesh(starBody) {
    const surfaceR = starBody.radius * nHardCodeScaleFactor;
    // Compact footprint, a bit more height for ejecta + heat haze (~22% R)
    const atmosphereScale = 1.22;
    const outerR = surfaceR * atmosphereScale;
    const geo = new THREE.SphereGeometry(outerR, 96, 96);
    const baseIntensity = 0.72;
    const mat = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0.0 },
            intensity: { value: baseIntensity },
            sunRadius: { value: surfaceR },
            atmosphereScale: { value: atmosphereScale }
        },
        vertexShader: ss_shaders.sunFlareVertex,
        fragmentShader: ss_shaders.sunFlareFragment,
        transparent: true,
        depthWrite: false,
        depthTest: true,
        blending: THREE.AdditiveBlending,
        side: THREE.FrontSide
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.name = 'sunFlares';
    mesh.renderOrder = 2;
    mesh.frustumCulled = true;
    // Dedicated layer so we can render flares alone at half-res when zoomed in
    mesh.layers.set(LAYER_SUN_FLARES);
    mesh.userData.flareOuterRadius = outerR;
    mesh.userData.flareAtmosphereScale = atmosphereScale;
    mesh.userData.flareBaseIntensity = baseIntensity;
    return mesh;
}

/**
 * Pick the single shell face that covers the volume without DoubleSide overdraw.
 * Must run after the sun mesh has a valid world matrix for the frame.
 */
function updateSunFlareMeshSide(flareMesh) {
    if (!flareMesh || !flareMesh.material) return;
    const localOuter = flareMesh.userData.flareOuterRadius;
    if (!(localOuter > 0)) return;

    const sunWorldPos = new THREE.Vector3();
    flareMesh.getWorldPosition(sunWorldPos);
    const worldScale = new THREE.Vector3();
    flareMesh.getWorldScale(worldScale);
    const worldOuter = localOuter * worldScale.x;
    const camDist = camera.position.distanceTo(sunWorldPos);

    // Inside (or nearly inside) the outer shell: draw back faces so the sky is covered.
    // Outside: draw front faces so fragments sit in front of the photosphere depth buffer.
    const wantSide = (camDist < worldOuter * 0.98) ? THREE.BackSide : THREE.FrontSide;
    if (flareMesh.material.side !== wantSide) {
        flareMesh.material.side = wantSide;
        flareMesh.material.needsUpdate = true;
    }
}


function createSimpleCelestialBody(celestialBody) {

    //Create the Group Object the Funciton will Return
    const celestialBodyGroup = new THREE.Group();
    let hasAtmosphere = 0;
    let hasRing = 0;
    const advancedUniforms = [];

    //Create the Sphere
    const celestialGeometry = new THREE.SphereGeometry(celestialBody.radius * nHardCodeScaleFactor, 64, 64);

    //Load the Textures
    const {surfaceTexture, normalMap, specularMap, cloudTexture, ringTexture, bumpTexture, nightMap} = getTexturesForPlanet(celestialBody);

    //Create the Celestial Material Based on the Textures
    let celestialMaterial = null;

    if (celestialBody.type === "star") {
        celestialMaterial = getSunMaterial(surfaceTexture, celestialBody );
    }
    else
    {
        celestialMaterial = createMaterialFromTextures( celestialBody, surfaceTexture, normalMap, specularMap, cloudTexture, nightMap );
    }

    //Create the Mesh
    simpleCelestialMesh = new THREE.Mesh(celestialGeometry, celestialMaterial);
    simpleCelestialMesh.name = celestialBody.name;
    simpleCelestialMesh.userData.initialScale = celestialBody.radius * nHardCodeScaleFactor;

    //Apply 90-degree rotation to any planet with a surface texture
    if (surfaceTexture) {
        simpleCelestialMesh.rotation.x = Math.PI / 2; // 90° rotation around X-axis (horizontal axis)
    }

    celestialBodyGroup.add(simpleCelestialMesh);

    if (celestialMaterial && celestialMaterial.uniforms && celestialMaterial.uniforms.sunDirection) {
        advancedUniforms.push(celestialMaterial.uniforms);
    }

    //if a star, add a glow mesh (+ optional fresnel rim + plasma flares)
    if (celestialBody.type === "star") {
        const glowMesh = getStarGlowMesh(celestialBody);
        celestialBodyGroup.add(glowMesh);
        if (isShaderOn('shaderSunCorona')) {
            celestialBodyGroup.add(getStarFresnelMesh(celestialBody));
        }
        // Flares are children of the surface mesh so they co-rotate with active regions
        if (isShaderOn('shaderSunFlares')) {
            const flareMesh = createSunFlareMesh(celestialBody);
            if (flareMesh.material.uniforms) advancedUniforms.push(flareMesh.material.uniforms);
            flareMesh.visible = atmosphereEffectsVisible;
            simpleCelestialMesh.add(flareMesh);
        }
    }

    // Atmosphere / cloud layer
    if (cloudTexture) {
        hasAtmosphere = 1;
        const cloudRadius = celestialBody.radius * nHardCodeScaleFactor * 1.02;
        const cloudGeometry = new THREE.SphereGeometry(cloudRadius, 64, 64);

        const cloudMaterial = new THREE.MeshPhongMaterial({
            map: cloudTexture,
            transparent: true,
            opacity: 0.8,
            depthWrite: false,
            depthTest: true,
            blending: THREE.NormalBlending
        });

        const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
        cloudMesh.name = "atmosphere";
        cloudMesh.rotation.x = Math.PI / 2;
        cloudMesh.visible = atmosphereEffectsVisible;
        celestialBodyGroup.add(cloudMesh);
    }

    // Planet auroras — child of surface mesh so group child indices stay stable
    // Earth returns a Group (ribbons + spikes); Jupiter is a single mesh.
    if ((celestialBody.name === 'Earth' || celestialBody.name === 'Jupiter') && isShaderOn('shaderAurora')) {
        const auroraRoot = createAuroraMesh(celestialBody);
        auroraRoot.traverse(child => {
            if (child.isMesh && child.material && child.material.uniforms) {
                advancedUniforms.push(child.material.uniforms);
            }
        });
        auroraRoot.visible = atmosphereEffectsVisible;
        simpleCelestialMesh.add(auroraRoot);
    }

    // Jupiter Great Red Spot lightning — independent of aurora (always on when body exists)
    if (celestialBody.name === 'Jupiter') {
        const grsMesh = createJupiterGrsLightningMesh(celestialBody);
        grsMesh.visible = atmosphereEffectsVisible;
        simpleCelestialMesh.add(grsMesh);
    }

    if (ringTexture)
    {
        hasRing = 1;

        const innerRadius = celestialBody.rings[0].inner_radius * nHardCodeScaleFactor;
        const outerRadius = celestialBody.rings[0].outer_radius * nHardCodeScaleFactor;

        const ringGeometry = createPlanetRingGeometry(innerRadius, outerRadius, 64, 1, 0, Math.PI * 2, 0.05 * nHardCodeScaleFactor);

        ringTexture.minFilter = THREE.NearestFilter;

        let ringMaterial;
        if (isShaderOn('shaderRingLighting')) {
            const planetRadiusScaled = celestialBody.radius * nHardCodeScaleFactor;
            ringMaterial = createRingShaderMaterial(ringTexture, planetRadiusScaled);
            advancedUniforms.push(ringMaterial.uniforms);
        } else {
            ringMaterial = new THREE.MeshPhongMaterial({
                map: ringTexture,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: .95,
                emissive: 0x111111,
                emissiveIntensity: 0.3,
                alphaTest: 0.05,
                depthTest: true,
                blending: THREE.NormalBlending,
                depthWrite: false
            });
        }

        const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
        ringMesh.name = "ring";
        ringMesh.visible = planetRingsVisible;

        celestialBodyGroup.add(ringMesh);
    }

    scene.add(celestialBodyGroup);

    const celestialObject = {
        mesh: celestialBodyGroup,
        data: celestialBody,
        hasAtmosphere: hasAtmosphere,
        hasRing: hasRing,
        advancedUniforms: advancedUniforms,
        // Keep texture refs so live shader toggles can rebuild materials without reload
        textures: {
            surfaceTexture,
            normalMap,
            specularMap,
            cloudTexture,
            ringTexture,
            bumpTexture,
            nightMap
        }
    };

    return celestialObject;
}

// Initialize celestial bodies (modified)
async function initializeCelestialBodies() {
    
    bodies.forEach(async body => {

        let bodyObject = null;

        // Compute orbital plane normal


        //First thing is load the mesh into the celestial object
        if(settings.useComplexMeshes === 'ON' && body.mesh)
        {
            bodyObject = await loadCelestialObjectFromMesh(body);
            
        }
        else
        {
            bodyObject = createSimpleCelestialBody(body);

        }

        //Add the Sun as the parent of the main planets
        bodyObject.parent = bodies[0];

        //Add orbit line
        if (body.type === 'asteroid') {
            const orbitLine = createOrbitLine(body.orbitalElements, SUN_MASS, 0x002500);
            orbitLine.visible = asteroidOrbitsVisible;
            asteroidOrbitLines.push(orbitLine);
            scene.add(orbitLine);
            bodyObject.orbitLine = orbitLine;
        }
        else
        {
            const orbitLine = createOrbitLine(body.orbitalElements, SUN_MASS, 0xffffff);
            orbitLine.visible = planetOrbitsVisible;
            planetOrbitLines.push(orbitLine);
            scene.add(orbitLine);
            bodyObject.orbitLine = orbitLine;
        }

        createTrailLine(bodyObject);
        
        //Add Moons
        for (const moon of body.moons)
        {
            if(settings.useComplexMeshes === 'ON' && moon.mesh)
            {
                moonObject = await loadCelestialObjectFromMesh(moon);
            }
            else
            {
                moonObject = createSimpleCelestialBody(moon);
            }

            moonObject.parent = body;

            //Add moon orbit line
            if (moonObject) {

                //Add the moonmesh to the bodyObject's mesh group
                bodyObject.mesh.add(moonObject.mesh);

                //Create the moon's orbit line
                const moonOrbitLine = createOrbitLine(moon.orbitalElements, body.mass, 0xffff00);
                moonOrbitLine.visible = moonOrbitsVisible;
                moonOrbitLines.push(moonOrbitLine);

                //Add the moon's Orbit Line to the bodyObject's mesh group
                bodyObject.mesh.add(moonOrbitLine);
                moonObject.orbitLine =  moonOrbitLine;


                initializeRotationalDynamics(moonObject);
                // Parent trail under planet group so it shares the orbit-line frame
                createTrailLine(moonObject, bodyObject.mesh);

                celestialObjects.push(moonObject);
            }
        }
        
        initializeRotationalDynamics(bodyObject);
        celestialObjects.push(bodyObject);
    });

    
}
/*
function setCelestialBodyTilt(mesh, bodyData) {
    // Default rotation axis (local Z-axis)
    let rotationAxis = new THREE.Vector3(0, 0, 1);

    if (bodyData.axialTilt !== undefined) {
        const axialTilt = bodyData.axialTilt * (Math.PI / 180); // Convert to radians

        if (bodyData.orbitalElements && bodyData.name !== "Sun") {
            // Get orbital elements
            const i = bodyData.orbitalElements.i * (Math.PI / 180); // Inclination
            const Omega = bodyData.orbitalElements.Omega * (Math.PI / 180); // Longitude of ascending node
            const omega = bodyData.orbitalElements.omega * (Math.PI / 180); // Argument of periapsis

            // Create a quaternion for the orbital plane orientation
            const orbitQuaternion = new THREE.Quaternion();

            // 1. Rotate by Omega around Z-axis (align with ascending node)
            orbitQuaternion.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), Omega));

            // 2. Rotate by inclination around X-axis (tilt the orbital plane)
            orbitQuaternion.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), i));

            // 3. Rotate by omega around Z-axis (align with periapsis)
            orbitQuaternion.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), omega));

            // Apply axial tilt relative to the orbital plane (around local Z-axis)
            const axialQuaternion = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), axialTilt);

            // Combine quaternions: orbital plane orientation + axial tilt
            const finalQuaternion = new THREE.Quaternion().multiplyQuaternions(orbitQuaternion, axialQuaternion);

            // Apply the orientation to the mesh
            mesh.setRotationFromQuaternion(finalQuaternion);

            // Compute the rotation axis in world space
            rotationAxis.applyQuaternion(finalQuaternion);
        } else {
            // No orbital elements (e.g., Sun or bodies without orbits)
            // Apply axial tilt directly around X-axis (or another axis if preferred)
            mesh.rotation.x = axialTilt;
            rotationAxis = new THREE.Vector3(0, 0, 1); // Keep Z-axis as default
        }
    }

    // Normalize the rotation axis and store it
    mesh.userData.rotationAxis = rotationAxis.normalize();
}*/


/**
 * Create a motion trail for a body.
 * @param {object} objToTrail - celestial object ({ data, parent, ... })
 * @param {THREE.Object3D|null} parentObject3D - optional parent for the trail line.
 *   Moons should pass the planet group so trails stay planet-relative (aligned with orbit lines).
 *   Planets/asteroids leave null (scene root / heliocentric).
 */
function createTrailLine( objToTrail, parentObject3D = null )
{
    //Create Trail Lines
    let materialSelect = trailMaterial;
    let orbitFraction = 4;
    switch(objToTrail.data.type.toLowerCase()) 
    {
        case 'asteroid':
            materialSelect = asteroidTrailMaterial;
            orbitFraction = 64;
            break;
        case 'moon':
            materialSelect = moonTrailMaterial;
            orbitFraction = 4;
            break;
        case 'terrestrial':
        case 'dwarf':
        case 'gas giant':
        case 'ice giant':
        default:
            materialSelect = trailMaterial;
            orbitFraction = 16;
            break;
        
    }

    const a = objToTrail.data.orbitalElements.a; // Semi-major axis of moon's orbit
    const centralMass = objToTrail.parent.mass; // Central planet's mass
    const T = Math.sqrt(a ** 3 / centralMass); // Orbital period
    objToTrail.trailDeltaT = T / (orbitFraction * N_TRAIL_POINTS); // Time step for 1/4th orbit

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(N_TRAIL_POINTS * 3);
    const opacities = new Float32Array(N_TRAIL_POINTS);
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('opacity', new THREE.BufferAttribute(opacities, 1));

    

    const trailLine = new THREE.Line(geometry, materialSelect);
    trailLine.visible = moonTrailsVisible; // Hidden initially
    trailLine.frustumCulled = false;
    trailLine.name = `${objToTrail.data.name}_trail`;

    // Moons: parent under planet group (same frame as moon orbit lines).
    // Planets/asteroids: scene root (heliocentric).
    if (parentObject3D) {
        parentObject3D.add(trailLine);
    } else {
        scene.add(trailLine);
    }

    // Set initial visibility based on type
    if (objToTrail.data.type === "asteroid") {
        trailLine.visible = asteroidTrailsVisible && !asteroidOrbitsVisible;
    } else if (objToTrail.data.type === "moon") {
        trailLine.visible = moonTrailsVisible && !moonOrbitsVisible;
    } else {
        trailLine.visible = planetTrailsVisible && !planetOrbitsVisible;
    }
    
    objToTrail.trailLine = trailLine;
}
// Initialize moon trails
/*
celestialObjects.forEach(obj => {
  if (obj.data.type === "moon") {
      const a = obj.data.orbitalElements.a; // Semi-major axis of moon's orbit
      const centralMass = obj.parent.mass; // Central planet's mass
      const T = Math.sqrt(a ** 3 / centralMass); // Orbital period
      obj.trailDeltaT = T / (4 * N_TRAIL_POINTS); // Time step for 1/4th orbit

      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(N_TRAIL_POINTS * 3);
      const opacities = new Float32Array(N_TRAIL_POINTS);
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('opacity', new THREE.BufferAttribute(opacities, 1));

      const trailLine = new THREE.Line(geometry, moonTrailMaterial);
      trailLine.visible = moonTrailsVisible; // Hidden initially
      trailLine.frustumCulled = false;
      scene.add(trailLine);
      obj.trailLine = trailLine;
  }
});*/


/*ASTEROIDS*/

//POINT ASTEROIDS FOR MAIN ASTEROID BELT

// Global variables

let asteroidPoints;
let asteroidPointsData = [];
let kboData = [];
let kboPoints;

// Helper functions
function createCircleTexture(size) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2 - 1, 0, 2 * Math.PI);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  
  return new THREE.CanvasTexture(canvas);
}

function getAsteroidColor(type) {
  if (type === 'C') {
    const gray = 0x11 + Math.random() * (0x44 - 0x11);
    return new THREE.Color(gray / 255, gray / 255, gray / 255);
  } else if (type === 'S') {
    const color1 = new THREE.Color(0xcccccc);
    const color2 = new THREE.Color(0xd2b48c);
    const factor = Math.random();
    return color1.clone().lerp(color2, factor);
  } else if (type === 'M') {
    const color1 = new THREE.Color(0x8b0000);
    const color2 = new THREE.Color(0x8b4513);
    const factor = Math.random();
    return color1.clone().lerp(color2, factor);
  }
}

// Initialize point asteroids
function initializePointAsteroids() {
  const numPointAsteroids = 5000;
  
  const positions = new Float32Array(numPointAsteroids * 3);
  const colors = new Float32Array(numPointAsteroids * 3);
  
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  
  const circleTexture = createCircleTexture(16);
  const material = new THREE.PointsMaterial({
    size: 1,
    map: circleTexture,
    vertexColors: true,
    transparent: true,
    sizeAttenuation: false
  });
  
  asteroidPoints = new THREE.Points(geometry, material);
  asteroidPoints.visible = asteroidBeltsVisible; // Apply initial state
  scene.add(asteroidPoints);
  
  for (let i = 0; i < numPointAsteroids; i++) {
    const a = 2.2 + Math.random() * (3.2 - 2.2);
    const e = Math.random() * 0.3;
    const iAngle = (Math.random() - 0.5) * 40;
    const Omega = Math.random() * 2 * 180;
    const omega = Math.random() * 2 * 180;
    const M0 = Math.random() * 2 * 180;
    
    const rand = Math.random();
    let type;
    if (rand < 0.75) {
      type = 'C';
    } else if (rand < 0.92) {
      type = 'S';
    } else {
      type = 'M';
    }
    
    const color = getAsteroidColor(type);
    
    asteroidPointsData.push({
      orbitalElements: { a, e, i: iAngle, Omega, omega, M0 },
      color
    });
    
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  //POINT ASTEROIDS FOR KUIPER BELT
    // Define constants
    const numKBOs = 10000;
    const kboPositions = new Float32Array(numKBOs * 3);
    const kboColors = new Float32Array(numKBOs * 3);
    
    // Create geometry and material
    const kboGeometry = new THREE.BufferGeometry();
    kboGeometry.setAttribute('position', new THREE.BufferAttribute(kboPositions, 3));
    kboGeometry.setAttribute('color', new THREE.BufferAttribute(kboColors, 3));

    const kboMaterial = new THREE.PointsMaterial({
        size: 1.0,
        map: circleTexture, // Assumes circleTexture is defined
        vertexColors: true,
        transparent: true,
        sizeAttenuation: false
    });

    kboPoints = new THREE.Points(kboGeometry, kboMaterial);
    kboPoints.visible = asteroidBeltsVisible; // Apply initial state
    scene.add(kboPoints);

  // Initialize KBOs
    for (let i = 0; i < numKBOs; i++) {
        const orbitalElements = generateKBOOrbitalElements();
        const color = getKBOColor(orbitalElements.i);
        const {pos, elements} = getPosition(orbitalElements, SUN_MASS, 0, "kbo", 1);
        kboPositions[i * 3] = pos.x;
        kboPositions[i * 3 + 1] = pos.y;
        kboPositions[i * 3 + 2] = pos.z;
        kboColors[i * 3] = color.r;
        kboColors[i * 3 + 1] = color.g;
        kboColors[i * 3 + 2] = color.b;
        kboData.push({ orbitalElements, color });
    }

    

}



function generateKBOOrbitalElements() {
    const type = Math.random();
    let a, e, i;
    if (type < 0.6) { // Classical Cold
        a = 39.5 + Math.random() * (48 - 39.5);
        e = Math.random() * 0.1;
        i = Math.random() * 10;
    } else if (type < 0.8) { // Classical Hot
        a = 39.5 + Math.random() * (48 - 39.5);
        e = 0.1 + Math.random() * (0.3 - 0.1);
        i = 10 + Math.random() * (30 - 10);
    } else if (type < 0.9) { // Resonant
        const resonances = [39.4, 47.7];
        const res = resonances[Math.floor(Math.random() * resonances.length)];
        a = res - 0.1 + Math.random() * 0.2;
        e = Math.random() * 0.2;
        i = Math.random() * 20;
    } else { // Scattered Disk
        a = 50 + Math.random() * 50;
        e = 0.3 + Math.random() * 0.6;
        i = Math.random() * 40;
    }
    const Omega = Math.random() * 360;
    const omega = Math.random() * 360;
    const M0 = Math.random() * 360;
    return { a, e, i, Omega, omega, M0 };
}

function getKBOColor(i) {
    const red = new THREE.Color(0x8B0000);
    const grey = new THREE.Color(0x808080);
    const factor = Math.min(i / 30, 1);
    return red.clone().lerp(grey, factor);
}



initializePointAsteroids();
asteroidPoints.frustumCulled = false;
kboPoints.frustumCulled = false;

/*END ASTEROIDS*/

// Update initial states
fpsCounter.style.display = fpsVisible ? 'block' : 'none';
document.getElementById('toggleFPSCounter').textContent = fpsVisible ? 'Hide FPS' : 'Show FPS';

planetOrbitLines.forEach(line => line.visible = planetOrbitsVisible);
document.getElementById('togglePlanetOrbits').textContent = planetOrbitsVisible ? 'Hide Planet Orbits' : 'Show Planet Orbits';

moonOrbitLines.forEach(line => line.visible = moonOrbitsVisible);
document.getElementById('toggleMoonOrbits').textContent = moonOrbitsVisible ? 'Hide Moon Orbits' : 'Show Moon Orbits';

document.getElementById('toggleAsteroidBelts').textContent = asteroidBeltsVisible ? 'Hide Asteroid Sprites' : 'Show Asteroid Sprites';

celestialObjects.forEach(obj => {
    if (obj.trailLine) {
        if (obj.data.type === "moon") {
            obj.trailLine.visible = moonTrailsVisible && !moonOrbitsVisible;
        } else if (obj.data.name !== "Sun") {
            obj.trailLine.visible = planetTrailsVisible && !planetOrbitsVisible;
        }
    }
});
document.getElementById('togglePlanetTrails').textContent = planetTrailsVisible ? 'Hide Planet Trails' : 'Show Planet Trails';
document.getElementById('toggleMoonTrails').textContent = moonTrailsVisible ? 'Hide Moon Trails' : 'Show Moon Trails';

celestialObjects.forEach(obj => {
    if (obj.hasRing) {
        const ringMesh = obj.mesh.getObjectByName('ring');
        if (ringMesh) {
            ringMesh.visible = planetRingsVisible;
        }
    }
});
document.getElementById('togglePlanetRings').textContent = planetRingsVisible ? 'Hide Planet Rings' : 'Show Planet Rings';

backlight_sphere.visible = backdropVisible;
document.getElementById('toggleBackdrop').textContent = backdropVisible ? 'Hide Backdrop' : 'Show Backdrop';

ambientLight.intensity = ambientIntensity;
document.getElementById('increaseAmbient').textContent = `Increase Ambient (${(ambientIntensity * 100).toFixed(0)}%)`;
document.getElementById('decreaseAmbient').textContent = `Decrease Ambient (${(ambientIntensity * 100).toFixed(0)}%)`;


updatePlanetScales();

function getMeshWorldYAxis(mesh) {
    // Ensure the mesh's world matrix is up-to-date
    mesh.updateMatrixWorld();
    
    // Get the world matrix
    const worldMatrix = mesh.matrixWorld;
    
    // Local Y-axis
    const localYAxis = new THREE.Vector3(0, 1, 0);
    
    // Transform the local Y-axis to world space
    const worldYAxis = localYAxis.clone().applyMatrix4(worldMatrix).normalize();
    
    // Subtract the mesh's world position to get direction only (remove translation)
    const worldPosition = new THREE.Vector3();
    mesh.getWorldPosition(worldPosition);
    worldYAxis.sub(worldPosition).normalize();
    
    return worldYAxis;
}

function alignQuaternionToNormal(normal, referenceAxis = new THREE.Vector3(0, 0, 1)) {
    const quaternion = new THREE.Quaternion();
    // Ensure normal is normalized
    const targetNormal = normal.clone().normalize();
    // Ensure reference axis is normalized
    const refAxis = referenceAxis.clone().normalize();
    
    // Use setFromUnitVectors to align refAxis to targetNormal
    quaternion.setFromUnitVectors(refAxis, targetNormal);
    
    return quaternion;
}

function initializeRotationalDynamics(obj)
{


    const SOLAR_MASS = 1.989e30;  // kg
    const AU = 1.496e11;         // meters

   
    const body = obj.data;
    const mass = body.mass * SOLAR_MASS;    // Convert to kg
    const radius = body.radius * AU;        // Convert to meters
    // Calculate moment of inertia (I = 2/5 * M * R^2)
    const I = (2 / 5) * mass * radius * radius;
    // Get rotational angular momentum
    const L = body.rotationalAngularMomentum || 0;
    // Calculate angular velocity in rad/s
    //const omegaRadPerSec = L / I;
    const omegaRadPerSec = (Math.PI * 2) / body.siderealDay;

    // Convert to rad/year for simulation (1 year ≈ 31,557,600 seconds)
    obj.rotationalOmega = omegaRadPerSec * 31557600;  // rad/year

    //For Tidal Locked Moons
    if (!body.rotationalAngularMomentum && body.type === "moon") 
    {
        const centralMass = obj.parent.mass * SOLAR_MASS;  // Parent planet mass in kg
        const a = body.orbitalElements.a * AU;             // Semi-major axis in meters
        const T_orb_years = Math.sqrt((a ** 3) / (centralMass * 6.6743e-11));  // years, using G in m³/kg/s²
        const T_orb_sec = T_orb_years * 31557600;
        const omegaRadPerSec = 2 * Math.PI / T_orb_sec;
        const I = (2 / 5) * mass * radius * radius;
        body.rotationalAngularMomentum = I * omegaRadPerSec;  // Precompute L
    }

    

    // Get the Mesh in Question
    let targetMesh;
    if (obj.mesh instanceof THREE.Group) {
        targetMesh = obj.mesh.children[0];  // Planet mesh is first child
    } else {
        targetMesh = obj.mesh;  // Sun or moons
    }

    // Reset rotation to identity to avoid compounding with existing rotations
    targetMesh.rotation.set(0, 0, 0);


    const bodyData = body;
    

    if (bodyData.axialTilt !== undefined) {

        const axialTilt = bodyData.axialTilt * (Math.PI / 180); // Convert to radians

        if (bodyData.orbitalElements && bodyData.name !== "Sun") {
            // Get orbital elements
            const iRad = bodyData.orbitalElements.i * (Math.PI / 180);
            const OmegaRad = bodyData.orbitalElements.Omega * (Math.PI / 180);

            //STEP 1: Get the mesh Y-axis (axis the object rotates around)
            const meshLocalYAxis = getMeshWorldYAxis(targetMesh);
            
            //STEP 2: Get the orbital plane normal
            const normal = new THREE.Vector3(
                Math.sin(iRad) * Math.sin(OmegaRad),
                -Math.sin(iRad) * Math.cos(OmegaRad),
                Math.cos(iRad)
            ).normalize();

            //STEP 3: Create a Quaternion that aligns the Y-axis to the orbital normal
            const alignedQuaternion = alignQuaternionToNormal(normal,meshLocalYAxis)
            

            //STEP 4: Create an axis quaternion and apply it to the quaternion from step 3
            const axialQuaternion = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), axialTilt);
            const finalQuaternion = new THREE.Quaternion().multiplyQuaternions(alignedQuaternion, axialQuaternion);

            //STEP 5: Update the mesh with the final quaternion that combines
            targetMesh.setRotationFromQuaternion(finalQuaternion);

            //rotationAxis.applyQuaternion(finalQuaternion);
        } else {
            // Something that doesn't have orbital constants (aka the Sun)
            // Gets processed here. Same as above but i and OMEGA are zero

            //STEP 1: Get the mesh Y-axis (axis the object rotates around)
            const meshLocalYAxis = getMeshWorldYAxis(targetMesh);
            
            //STEP 2: Get the orbital plane normal
            const normal = new THREE.Vector3(
                Math.sin(0) * Math.sin(0),
                -Math.sin(0) * Math.cos(0),
                Math.cos(0)
            ).normalize();

            //STEP 3: Create a Quaternion that aligns the Y-axis to the orbital normal
            const alignedQuaternion = alignQuaternionToNormal(normal,meshLocalYAxis)
            

            //STEP 4: Create an axis quaternion and apply it to the quaternion from step 3
            const axialQuaternion = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), axialTilt);
            const finalQuaternion = new THREE.Quaternion().multiplyQuaternions(alignedQuaternion, axialQuaternion);

            //STEP 5: Update the mesh with the final quaternion that combines
            targetMesh.setRotationFromQuaternion(finalQuaternion);
        }
    }
    // Store initial quaternion for rotation reference
    obj.initialQuaternion = targetMesh.quaternion.clone();

    //Apply the tilt to the rings
    if (obj.hasRing) {
        const ringMesh = obj.mesh.getObjectByName('ring') || obj.mesh.children[obj.hasAtmosphere ? 2 : 1];

        const ringTiltFromEquatorRAD = obj.data.rings[0].ring_inclination * (Math.PI / 180 );

        //ringMesh.rotateX(ringTilt);
        const orientationQuaternion = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), (Math.PI / 2 ) );
        const ringTiltQuaternion = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), ringTiltFromEquatorRAD );
        const equatorialQuanternion = new THREE.Quaternion().multiplyQuaternions(orientationQuaternion, obj.initialQuaternion)
        const ringQuanternion = new THREE.Quaternion().multiplyQuaternions(equatorialQuanternion, ringTiltQuaternion);
        ringMesh.quaternion.copy(ringQuanternion);
    }

    
    
    
}






// Event listener for increasing scale (already exists, updated text for consistency)
document.getElementById('scalePlanets').addEventListener('click', () => {
    planetScaleMultiplier = Math.min(256, planetScaleMultiplier * 2) // Double the scale up to 512
    moonOrbitScaleMultiplier = Math.min(256 * orbitScaleToPlanetScale, planetScaleMultiplier * orbitScaleToPlanetScale);
    if( moonOrbitScaleMultiplier < 1 ) moonOrbitScaleMultiplier = 1;
    updatePlanetScales();
    document.getElementById('scalePlanets').textContent = `Increase Planet Scale (x${planetScaleMultiplier})`;
    document.getElementById('decreaseScale').textContent = `Decrease Planet Scale (x${planetScaleMultiplier})`;
    setCookie('planetScaleMultiplier', planetScaleMultiplier, 30);
    
});

// Event listener for decreasing scale (new)
document.getElementById('decreaseScale').addEventListener('click', () => {
    planetScaleMultiplier = Math.max(1, planetScaleMultiplier / 2); // Halve the scale, min 1x (corresponds to 1:1 scale)
    moonOrbitScaleMultiplier = Math.max(1, planetScaleMultiplier * orbitScaleToPlanetScale);
    
    updatePlanetScales();
    document.getElementById('scalePlanets').textContent = `Increase Planet Scale (x${planetScaleMultiplier})`;
    document.getElementById('decreaseScale').textContent = `Decrease Planet Scale (x${planetScaleMultiplier})`;
    setCookie('planetScaleMultiplier', planetScaleMultiplier, 30);
});

// Set Planet Scale to 1:1
document.getElementById('setPlanetScaleOne').addEventListener('click', () => {
    planetScaleMultiplier = 1;
    moonOrbitScaleMultiplier = Math.max(1, planetScaleMultiplier * orbitScaleToPlanetScale);
    updatePlanetScales();
    document.getElementById('scalePlanets').textContent = `Increase Planet Scale (x${planetScaleMultiplier})`;
    document.getElementById('decreaseScale').textContent = `Decrease Planet Scale (x${planetScaleMultiplier})`;
    setCookie('planetScaleMultiplier', planetScaleMultiplier, 30);
});

// Reset Planet Scale to 64
document.getElementById('resetPlanetScale').addEventListener('click', () => {
    planetScaleMultiplier = 128;
    moonOrbitScaleMultiplier = planetScaleMultiplier * orbitScaleToPlanetScale;
    updatePlanetScales();
    document.getElementById('scalePlanets').textContent = `Increase Planet Scale (x${planetScaleMultiplier})`;
    document.getElementById('decreaseScale').textContent = `Decrease Planet Scale (x${planetScaleMultiplier})`;
    setCookie('planetScaleMultiplier', planetScaleMultiplier, 30);
});

// Restart Simulation
document.getElementById('restartSimulation').addEventListener('click', () => {
    // Reset simulation time
    simulationTime = 0;

    // Reset time scale to initial value
    const slider = document.getElementById('timeScaleSlider');
    slider.value = 2; // Initial slider value
    const { timeReturn, timeText, unitText } = convertSliderValueInToTime(slider.value);
    timeScale = timeReturn;
    document.getElementById('timeRateLabel').textContent = getTimeScaleTxt();

    // Reset paused state
    paused = false;
    document.getElementById('pauseResume').textContent = '⏸';


    // Reload video settings from cookies
    fpsVisible = videoSettings.fpsVisible;
    planetOrbitsVisible = videoSettings.planetOrbitsVisible;
    moonOrbitsVisible = videoSettings.moonOrbitsVisible;
    planetTrailsVisible = videoSettings.planetTrailsVisible;
    moonTrailsVisible = videoSettings.moonTrailsVisible;
    planetRingsVisible = videoSettings.planetRingsVisible;
    backdropVisible = videoSettings.backdropVisible;
    ambientIntensity = videoSettings.ambientIntensity;

    // Update visibility of orbit lines and trails
    planetOrbitLines.forEach(line => line.visible = planetOrbitsVisible);
    moonOrbitLines.forEach(line => line.visible = moonOrbitsVisible);
    celestialObjects.forEach(obj => {
        if (obj.trailLine) {
            if (obj.data.type === "moon") {
                obj.trailLine.visible = moonTrailsVisible && !moonOrbitsVisible;
            } else if (obj.data.name !== "Sun") {
                obj.trailLine.visible = planetTrailsVisible && !planetOrbitsVisible;
            }
        }
        if (obj.hasRing) {
            const ringMesh = obj.mesh.getObjectByName('ring');
            if (ringMesh) {
                ringMesh.visible = planetRingsVisible;
            }
        }
    });
    backlight_sphere.visible = backdropVisible;

    // Reset button text
    document.getElementById('togglePlanetOrbits').textContent = 'Show Planet Orbits';
    document.getElementById('toggleMoonOrbits').textContent = 'Show Moon Orbits';
    document.getElementById('togglePlanetTrails').textContent = 'Hide Planet Trails';
    document.getElementById('toggleMoonTrails').textContent = 'Hide Moon Trails';
    document.getElementById('togglePlanetRings').textContent = 'Hide Planet Rings';
    document.getElementById('toggleBackdrop').textContent = 'Hide Backdrop';

    // Reset planet scale
    planetScaleMultiplier = 128;
    moonOrbitScaleMultiplier = planetScaleMultiplier * orbitScaleToPlanetScale;
    updatePlanetScales();
    document.getElementById('scalePlanets').textContent = `Increase Planet Scale (x${planetScaleMultiplier })`;
    document.getElementById('decreaseScale').textContent = `Decrease Planet Scale (x${planetScaleMultiplier })`;

    // Reset ambient light
    ambientLight.intensity = ambientIntensity;
    document.getElementById('increaseAmbient').textContent = `Increase Ambient (${(ambientIntensity * 100).toFixed(0)}%)`;
    document.getElementById('decreaseAmbient').textContent = `Decrease Ambient (${(ambientIntensity * 100).toFixed(0)}%)`;

    // Reset focus and tracking
    focusedPlanet = null;
    focusedCenterOfGravity = null;
    trackingPlanet = false;
    focusCube.visible = false;
    radiusLine.visible = false;
    velocityLine.visible = false;
    angularMomentumLine.visible = false;
    radiusLabel.visible = false;
    velocityLabel.visible = false;
    angularMomentumLabel.visible = false;
    velocityCone.visible = false;
    angularMomentumCone.visible = false;
    axisMesh.visible = false;

    document.getElementById('focusBox').style.display = 'none';

    // Reset camera to initial position
    camera.position.set(DEFAULT_CAM_X, DEFAULT_CAM_Y, DEFAULT_CAM_Z);
    orbitControls.target.set(0, 0, 0);
    orbitControls.update();
});

// Reset Camera Position
document.getElementById('resetCameraPosition').addEventListener('click', () => {
    // Reset camera to initial position without affecting simulation state
    camera.position.set(DEFAULT_CAM_X, DEFAULT_CAM_Y, DEFAULT_CAM_Z);
    orbitControls.target.set(0, 0, 0); // Look at origin (Sun)
    orbitControls.update();

    // If tracking a planet, stop tracking but keep focus
    if (trackingPlanet && focusedPlanet) {
        trackingPlanet = false;
        previousCameraPosition.copy(camera.position);
        previousCameraTarget.copy(orbitControls.target);
    }
});

function getMeshByName( sName )
{
  let rObj = null;
  celestialObjects.forEach( obj => {
    if(obj.data.name == sName) 
     {
       //console.log('true');
       rObj = obj;
     }

     /*const hasRing = obj.hasRing;
     const hasAtmosphere = obj.hasAtmosphere;
     
    obj.data.moons.forEach( moon, index => {

        if(moon.name == sName)
        {
            rObj = obj.children[index]
        }
    });*/

    
   });
   return rObj; 
}
function getTypeScaleMultiplier( type )
{
    let typeScaleMultiplier = 1;
    switch(type)
            {
                case "star":
                    typeScaleMultiplier = .25;
                    break;
                case "Terrestrial":
                    typeScaleMultiplier = 1;
                    break;
                case "asteroid":
                    typeScaleMultiplier = 10;
                    break;
                case "Ice Giant":
                    typeScaleMultiplier = 1;
                    break;
                case "moon":
                    typeScaleMultiplier = 1;
                    break;
                case "Dwarf":
                    typeScaleMultiplier = 4;
                    break;

            }
    return typeScaleMultiplier;
}
// Helper function to update planet scales (new, refactored for reuse)

function getScaleForObject(oCelestialObject){

    const mesh = oCelestialObject.mesh instanceof THREE.Group ? oCelestialObject.mesh.children[0] : oCelestialObject.mesh;
    const obj = oCelestialObject;
    let finalPlanetScale = 1;
    let finalMoonOrbitScale = 1;
    let scaleOverride = 1;

    if(obj.data.objectScale)
    {
        scaleOverride = obj.data.objectScale;
    }
    // Scale only planets (not Sun)
    if (obj.data.orbitalElements /*&& obj.data.name !== "Sun"*/) {
        const typeScaleMultiplier = getTypeScaleMultiplier(obj.data.type);
        const initialScale = mesh.userData.initialScale;
        if( obj.data.type == "moon" )
        {
        const moonOrbitScale = obj.parent.moonOrbitScale;
        const moonScale = obj.parent.moonScale;
        finalMoonOrbitScale = moonOrbitScaleMultiplier * moonOrbitScale;
        //finalPlanetScale = planetScaleMultiplier * typeScaleMultiplier * moonScale * initialScale / mesh.geometry.parameters.radius;
        //finalPlanetScale = planetScaleMultiplier * typeScaleMultiplier * moonScale * initialScale / (oCelestialObject.data.radius*nHardCodeScaleFactor);
        finalPlanetScale = scaleOverride * planetScaleMultiplier * typeScaleMultiplier * moonScale * initialScale / (initialScale);
        //oCelestialObject.data.radius
        }
        else
        {
        //finalPlanetScale = planetScaleMultiplier * typeScaleMultiplier * initialScale / mesh.geometry.parameters.radius;
        //finalPlanetScale = planetScaleMultiplier * typeScaleMultiplier * initialScale / (oCelestialObject.data.radius*nHardCodeScaleFactor);
        finalPlanetScale = scaleOverride * planetScaleMultiplier * typeScaleMultiplier * initialScale / (initialScale);
        }
    }
    finalPlanetScale = Math.max(1,finalPlanetScale);
    finalMoonOrbitScale = Math.max(1,finalMoonOrbitScale);

    return {finalPlanetScale: finalPlanetScale, finalOrbitScale: finalMoonOrbitScale};
}

function updatePlanetScales() {
    celestialObjects.forEach(obj => {
        const mesh = obj.mesh instanceof THREE.Group
            ? (obj.mesh.getObjectByName(obj.data.name) || obj.mesh.children[0])
            : obj.mesh;

        const atmMesh = obj.mesh.getObjectByName ? obj.mesh.getObjectByName('atmosphere') : null;
        const ringMesh = obj.mesh.getObjectByName ? obj.mesh.getObjectByName('ring') : null;

        // Scale only planets (not Sun)
        if (obj.data.orbitalElements /*&& obj.data.name !== "Sun"*/) {
            const typeScaleMultiplier = getTypeScaleMultiplier(obj.data.type);
            
            const orbitLine = obj.orbitLine;
            const trailLine = obj.trailLine;
            const planetType = obj.data.type;
            
            const isMesh = obj.data.mesh ? true : false;

            //Grab the initial scale factor
            const initialScale = mesh.userData.initialScale;
            
            const {finalPlanetScale, finalOrbitScale} = getScaleForObject(obj);

            if( atmMesh instanceof THREE.Mesh)
            {
                atmMesh.scale.setScalar(finalPlanetScale);
            }

            if( ringMesh instanceof THREE.Mesh)
            {
                ringMesh.scale.setScalar(finalPlanetScale);
            }

            //Scale the orbit line
            if( orbitLine instanceof THREE.LineLoop)
            {
              orbitLine.scale.setScalar(finalOrbitScale);
              //trailLine.scale.setScalar(finalOrbitScale);
            }

            // Scale the celestial object (moon, planet, etc) mesh
            if( !isMesh )
            {
                mesh.scale.setScalar(finalPlanetScale);
            }
            else
            {   
                mesh.scale.setScalar(finalPlanetScale);
                //mesh.geometry.normalsNeedUpdate = true; // Mark normals for update after scaling
            }
            

            //Then scale up the focus cube appropriately 
            if( focusedPlanet )
            {
                const { data, parent } = focusedPlanet;
                if( data.name == obj.data.name)
                {
                    const planetRadius = obj.data.radius * nHardCodeScaleFactor;
                    //focusCube.scale.set(planetRadius * planetScaleMultiplier * typeScaleMultiplier * 2.2 , planetRadius * planetScaleMultiplier * typeScaleMultiplier * 2.2, planetRadius * planetScaleMultiplier * typeScaleMultiplier * 2.2);
                    focusCube.scale.set(planetRadius * finalPlanetScale * 2.2 , planetRadius * finalPlanetScale * 2.2, planetRadius * finalPlanetScale * 2.2);
                    updateOrbitControlScale(planetRadius, finalPlanetScale);

                }
                
            }
        }
    });
  
}


// Initialize button text (add this after celestialObjects setup for consistency)
document.getElementById('scalePlanets').textContent = `Increase Planet Scale (x${planetScaleMultiplier})`;
document.getElementById('decreaseScale').textContent = `Decrease Planet Scale (x${planetScaleMultiplier})`;


// Date formatting
function formatDateTime(timeInYears) {
    const epoch = new Date("2000-01-01T12:00:00Z");
    const days = timeInYears * 365.25;
    const date = new Date(epoch.getTime() + days * 86400000);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${months[date.getMonth()]}-${date.getDate().toString().padStart(2, '0')}-${date.getFullYear()} ` +
           `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}

// Raycaster for hover
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const popup = document.getElementById('hoverPopup');

let PopupObj = null;
//MouseMoveEvent
//function onMouseMove(event) {
function onMouseMove(event) {

    const isMobile = isMobileBool;

    if( !isFPSMode )
    {

        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(celestialObjects.map(obj => obj.mesh instanceof THREE.Group ? obj.mesh.children[0] : obj.mesh));
        if (intersects.length > 0) {
            const obj = celestialObjects.find(o => (o.mesh instanceof THREE.Group ? o.mesh.children[0] : o.mesh) === intersects[0].object);
            if(!isMobile)
            {
                PopupObj = obj;
                popup.innerHTML = getFocusHTML( PopupObj );
                popup.style.display = 'block';

                // Get popup dimensions after content is set
                const popupWidth = popup.offsetWidth;
                const popupHeight = popup.offsetHeight;

                // Default position: to the right and below the cursor
                let popupX = event.clientX + 10; // Small offset from cursor
                let popupY = event.clientY + 10;

                // Adjust X position (left/right)
                if (popupX + popupWidth > window.innerWidth) {
                    // If it overflows right edge, flip to left of cursor
                    popupX = event.clientX - popupWidth - 10;
                }
                if (popupX < 0) {
                    // If it overflows left edge, clamp to edge
                    popupX = 0;
                }

                // Adjust Y position (top/bottom)
                if (popupY + popupHeight > window.innerHeight) {
                    // If it overflows bottom edge, flip above cursor
                    popupY = event.clientY - popupHeight - 10;
                }
                if (popupY < 0) {
                    // If it overflows top edge, clamp to edge
                    popupY = 0;
                }

                // Apply adjusted position
                popup.style.left = `${popupX}px`;
                popup.style.top = `${popupY}px`;
                popup.style.right = 'auto'; // Reset right to avoid conflicts
            }
            else
            {
                // focusOnCelestialBody expects a name string, not the body object
                focusOnCelestialBody(obj.data.name);
            }
        } else {
            popup.style.display = 'none';
            PopupObj = null;
        }
    }
}
window.addEventListener('mousemove', onMouseMove);

// After renderer and scene setup
//const raycaster = new THREE.Raycaster();
//const mouse = new THREE.Vector2();
let mouseDownTime;
// Mouse down event
renderer.domElement.addEventListener('mousedown', (event) => {
    if (event.button === 0) { // Left click
        mouseDownTime = performance.now(); // Record start time
    }
});

// Mouse up event (triggers focus logic)
renderer.domElement.addEventListener('mouseup', (event) => {
    if (event.button !== 0 || mouseDownTime === null) return; // Only left click

    const duration = performance.now() - mouseDownTime;
    mouseDownTime = null; // Reset

    const HOLD_THRESHOLD = 500;
    if (duration <= HOLD_THRESHOLD && !isFPSMode) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(celestialObjects.map(obj => obj.mesh instanceof THREE.Group ? obj.mesh.children[0] : obj.mesh));
        
        if (intersects.length > 0) {
           

            const obj = celestialObjects.find(o => (o.mesh instanceof THREE.Group ? o.mesh.children[0] : o.mesh) === intersects[0].object);
            focusedPlanet = getMeshByName(obj.data.name);

            if(focusedPlanet)
            {
                focusOnPlanet(focusedPlanet);
            }

            }
    } 
    else {
        // Held too long: ignore for focus, let OrbitControls handle panning
        console.log('Mouse held too long, ignoring focus action');
    }
});

//Mouse Click Event (Planet Focus)
/*
function onMouseClick(event) {
    if( !isFPSMode )
    {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(celestialObjects.map(obj => obj.mesh instanceof THREE.Group ? obj.mesh.children[0] : obj.mesh));
        
        if (intersects.length > 0) {
            


            const obj = celestialObjects.find(o => (o.mesh instanceof THREE.Group ? o.mesh.children[0] : o.mesh) === intersects[0].object);
            focusedPlanet = getMeshByName(obj.data.name);

            if(focusedPlanet)
            {
                focusOnPlanet(focusedPlanet);
            }

        
        } 
    }
}
window.addEventListener('click', onMouseClick);*/


// Clear Tracked planet button
document.getElementById('clearPlanet').addEventListener('click', () => {
    focusedPlanet = null;
    focusedCenterOfGravity = null;

    trackingPlanet = false;
    document.getElementById('focusBox').style.display = 'none';
    focusCube.visible = false;
    radiusLine.visible = false;
    velocityLine.visible = false;
    angularMomentumLine.visible = false;
    radiusLabel.visible = false;
    velocityLabel.visible = false;
    angularMomentumLabel.visible = false;
    velocityCone.visible = false;
    angularMomentumCone.visible = false;
    axisMesh.visible = false;
    orbitalPlaneMesh.visible = false;
    equatorialPlaneMesh.visible = false;
    xAxisLine.visible = false;
    yAxisLine.visible = false;
    zAxisLine.visible = false;
    xAxisLabel.visible = false;
    yAxisLabel.visible = false;
    zAxisLabel.visible = false;

    // Reset camera
    /*camera.position.copy(previousCameraPosition);
    camera.position.set(DEFAULT_CAM_X, DEFAULT_CAM_Y, DEFAULT_CAM_Z);
    orbitControls.target.copy(previousCameraTarget);
    orbitControls.update();*/
    // Reset OrbitControls zoom limits
    if( !isFPSMode )
    {
        orbitControls.minDistance = 0; // Allow zooming in fully when not focused
        orbitControls.maxDistance = Infinity;
        orbitControls.target.set(0, 0, 0); // Reset target to origin (Sun)
        camera.position.set(DEFAULT_CAM_X, DEFAULT_CAM_Y, DEFAULT_CAM_Z);
        orbitControls.update();
    }

    //focusOnPlanet(celestialObjects[0])
});

// Track planet button
/*
document.getElementById('trackPlanet').addEventListener('click', () => {
    if (focusedPlanet) {
        trackingPlanet = true;
        // Store current camera position before tracking
        if (!trackingPlanet) {
            previousCameraPosition.copy(camera.position);
            previousCameraTarget.copy(orbitControls.target);
        }
    }
});*/

function convertPosToAU( position, object )
{
  const {finalPlanetScale, finalOrbitScale} = getScaleForObject( object );
  //const realCoordinates = position / ( nHardCodeOrbitScaleFactor * finalOrbitScale )
  const realCoordinates = new THREE.Vector3(position.x / ( nHardCodeOrbitScaleFactor * finalOrbitScale ),position.y / ( nHardCodeOrbitScaleFactor * finalOrbitScale ),position.z / ( nHardCodeOrbitScaleFactor * finalOrbitScale ))
  return realCoordinates;
}

function formatNumToString( number )
{
    if( number > 1e6 )
    {
        return number.toExponential(4);
    }
    else if( number > 1 )
    {
        return number.toFixed(2);
    }
    else if( number > 1e-4)
    {
        return number.toFixed(6);
    }
    {
        return number.toExponential(3);
    }
}

function updateFocusConstants(oPlanet)
{
    // Conversion constants
    const AU_TO_KM = 1.496e8;
    const M_TO_KM = 1e-3;
    const AU_TO_M = 1.496e11;
    const SOLAR_MASS_TO_KG = 1.989e30;
    const YEAR_TO_SECONDS = 365.25 * 24 * 60 * 60;
    const M_TO_AU = 1 / AU_TO_M;
    const S_TO_YR = 1 / YEAR_TO_SECONDS;
    const KM3_TO_M3 = 1e9;

    const sciData = celestialBodyScientificInfo[oPlanet.data.name];


    const scientificInfoTable = document.getElementById('scientificInfoTable');
    const atmospherelTable = document.getElementById('atmosphereInfoTable');
    scientificInfoTable.innerHTML = '';
    atmospherelTable.innerHTML = '';
    if (!sciData) {
        scientificInfoTable.innerHTML = `<tr><td colspan="2">No scientific data available</td></tr>`;
    }
    else
    {
        const infoRows = [
            { symbol: 'V', label: 'Volume', value: sciData['Volume'], unitFn: (val) => {
                switch (unitSystem) {
                    case 0: return `${(val / KM3_TO_M3).toExponential(2)} km³`; // km³
                    case 1: return `${val.toExponential(2)} m³`; // m³
                    case 2: return `${(val / (AU_TO_M ** 3)).toExponential(2)} AU³`; // AU³
                }
            }},
            { symbol: 'P<sub>surf</sub>', label: 'Surface Pressure', value: sciData['Surface_Pressure'], unitFn: (val) => {
                return val === null ? 'N/A' : `${val.toExponential(2)} Pa`;
            }},
            { symbol: 'V', label: 'Escape Velocity', value: sciData['Escape_Velocity'], unitFn: (val) => {
                switch (unitSystem) {
                    case 0: return `${(val / 1e3).toFixed(2)} km/s`; // km/s
                    case 1: return `${val.toFixed(0)} m/s`; // m/s
                    case 2: return `${(val / (AU_TO_M / 365.25 / 24 / 3600)).toFixed(2)} AU/yr`; // AU/yr
                }
            }},
            { symbol: 'T<sub>av</sub>', label: 'Average Temp', value: sciData['Temp_Avg'], unitFn: (val) => {
                return val === null ? 'N/A' : (oPlanet.data.name === 'Sun' ? `${val.toFixed(0)} K` : `${val.toFixed(0)} °C`);
            }},
            { symbol: 'T<sub>lo</sub>', label: 'Daily Low Temp', value: sciData['Temp_Daily_Low'], unitFn: (val) => {
                return val === null ? 'N/A' : `${val.toFixed(1)} °C`;
            }},
            { symbol: 'T<sub>hi</sub>', label: 'Daily High Temp', value: sciData['Temp_Daily_High'], unitFn: (val) => {
                return val === null ? 'N/A' : `${val.toFixed(1)} °C`;
            }},
            { symbol: 'U', label: 'Average Wind Speed', value: sciData['Wind_Speed_Avg'], unitFn: (val) => {
                switch (unitSystem) {
                    case 0: return val === null ? 'N/A' : `${(val / 1e3).toFixed(2)} km/s`; // km/s
                    case 1: return val === null ? 'N/A' : `${val.toFixed(1)} m/s`; // m/s
                    case 2: return val === null ? 'N/A' : `${(val / (AU_TO_M / 365.25 / 24 / 3600)).toFixed(2)} AU/yr`; // AU/yr
                }
            }},
            { symbol: 'n', label: 'Number of Moons', value: sciData['Num_Of_Satellite'], unitFn: (val) => `${val}` },
            { symbol: 'I', label: 'Solar Irradiance', value: sciData['Solar_Irradiance'], unitFn: (val) => {
                return val === null ? 'N/A' : `${val.toFixed(0)} W/m²`;
            }},
            { symbol: 'J<sub>2</sub>', label: 'J2 Perturbation', value: sciData['J2_Perturbation'], unitFn: (val) => {
                return val === null ? 'N/A' : `${val.toExponential(2)}`;
            }}//,
            //{ symbol: 'l', label: 'k Value', value: sciData['k_value'], unitFn: (val) => `${val.toFixed(3)}` }
        ];
    
        infoRows.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${row.symbol}</td>
                <td>${row.unitFn(row.value)}</td>
                <td class='f_description'>${row.label}</td>
            `;
            scientificInfoTable.appendChild(tr);
            scientificInfoTable.parentElement.style.display = 'block';
        });
        if( sciData[ "Atmospheric_Comp"] == null)
        {
            atmospherelTable.innerHTML = `<em>No Atmospheric Data Available</em>`;
        }
        else
        {
            Object.keys(sciData[ "Atmospheric_Comp"]).forEach( row => {
            const tr = document.createElement('tr');
            const value = sciData[ "Atmospheric_Comp"][row];
            tr.innerHTML = `
                <td>${row}</td>
                <td>${value.toFixed(3)}%</td>
                <td class='f_description'>${moleculeLookup[row]}</td>
            `;
            atmospherelTable.appendChild(tr);
            
            });
        }
        atmospherelTable.parentElement.style.display = 'block';
        

    }
}

function updateFocusBox(oPlanet) {
    const mesh = oPlanet.mesh instanceof THREE.Group ? oPlanet.mesh : oPlanet.mesh;
    const parentMass = oPlanet.parent ? oPlanet.parent.mass : SUN_MASS;
    
    const pos = mesh.position;
    const { data, parent } = oPlanet;
    const diameter = data.radius * 2;
    const positionInAU = convertPosToAU(pos, oPlanet);
    const rAU = positionInAU.length();
    const vAUyr = Math.sqrt(G * (parent ? parent.mass : SUN_MASS) * (2 / rAU - 1 / data.orbitalElements.a));
    const LAU2yr = data.mass * rAU * vAUyr;
    const k_value = data.k_value;

    // Conversion constants
    const AU_TO_KM = 1.496e8;
    const M_TO_KM = 1e-3;
    const AU_TO_M = 1.496e11;
    const SOLAR_MASS_TO_KG = 1.989e30;
    const YEAR_TO_SECONDS = 365.25 * 24 * 60 * 60;
    const M_TO_AU = 1 / AU_TO_M;
    const S_TO_YR = 1 / YEAR_TO_SECONDS;

    // Base values in AU, M☉, yr
    const massSolar = data.mass;
    const diameterAU = diameter;
    const semiMajorAxisAU = data.orbitalElements?.a;
    const radiusAU = rAU;
    const velocityAUyr = vAUyr;
    const angularMomentumAU2yr = LAU2yr;

    //Density and Surface Gravity
    const density = data.density;
    const surface_gravity = data.surface_gravity;
    // Calculate Orbital Period T in years
    const a = data.orbitalElements.a;
    const T = Math.sqrt((a * a * a) / parentMass); // Orbital period in years

    //Rotational Calculations
    const tiltAngle = oPlanet.data.axialTilt || 0;  // degrees

    const siderealT = data.siderealDay; //seconds
    const solarT = (siderealT * (T *  YEAR_TO_SECONDS)) / (( T *  YEAR_TO_SECONDS) - siderealT ); //seconds
    //const L = oPlanet.data.rotationalAngularMomentum || 0;  // kg m²/s
    const I = (k_value) * ( oPlanet.data.mass * SOLAR_MASS_TO_KG ) * ( oPlanet.data.radius * oPlanet.data.radius * AU_TO_M * AU_TO_M );  // kg m²
    const omegaRadPerSec = (2 * Math.PI) / siderealT;  // rad/s
    const L = I * omegaRadPerSec;  // kg m²/s
 
    //const omegaRadPerSec = L / I;  // rad/s
    //const periodSec = 2 * Math.PI / omegaRadPerSec;  // seconds

    // Converted values based on unit system
    let mass, diameterVal, radius, velocity, angularMomentum, semiMajorAxis, unitLabel;
    let massUnit, lengthUnit, timeUnit;
    let LText, IText, omegaText, rotationalPeriodText, solarPeriodText;
    let period, siderealPeriod, solarPeriod;
    let densityText, gravityText;
    //dynamics
    switch (unitSystem)
    {
        case 0: // kg, km, s
            radius = radiusAU * AU_TO_KM;
            velocity = velocityAUyr * AU_TO_KM / YEAR_TO_SECONDS;
            angularMomentum = angularMomentumAU2yr * SOLAR_MASS_TO_KG * (AU_TO_KM * AU_TO_KM) / YEAR_TO_SECONDS;
            massUnit = "kg";
            lengthUnit = "km";
            timeUnit = "s";
            unitLabel = "Metric (km, kg, s)";
            break;
        case 1: // kg, m, s
            radius = radiusAU * AU_TO_M;
            velocity = velocityAUyr * AU_TO_M / YEAR_TO_SECONDS;
            angularMomentum = angularMomentumAU2yr * SOLAR_MASS_TO_KG * (AU_TO_M * AU_TO_M) / YEAR_TO_SECONDS;
            massUnit = "kg";
            lengthUnit = "m";
            timeUnit = "s";
            unitLabel = "Metric (m, kg, s)";
            break;
        case 2:
            radius = radiusAU * AU_TO_M;
            velocity = velocityAUyr * AU_TO_M / YEAR_TO_SECONDS;
            angularMomentum = angularMomentumAU2yr * SOLAR_MASS_TO_KG * (AU_TO_M * AU_TO_M) / YEAR_TO_SECONDS;
            massUnit = "M☉";
            lengthUnit = "AU";
            timeUnit = "yr";
            unitLabel = "Astronomical (AU, M☉, yr)";
            break;
    }

    //constants
    if( updateConstants)
    {
        switch (unitSystem) {
            case 0: // kg, km, s
                mass = massSolar * SOLAR_MASS_TO_KG;
                diameterVal = diameterAU * AU_TO_KM;
                semiMajorAxis = semiMajorAxisAU * AU_TO_KM;
                
                period = T * YEAR_TO_SECONDS / (24 * 60 * 60); // Convert to days
                LText = `${(L * M_TO_KM * M_TO_KM).toExponential(2)} kg·km²/s`;
                IText = `${(( I / 1e6)* M_TO_KM * M_TO_KM).toExponential(2) } kg·km²`;  // Convert m² to km²
                omegaText = `${(omegaRadPerSec * 1e3).toFixed(5)} mrad/s`;  // Convert to milliradians/s
                siderealPeriod = siderealT / ( 3600 * 24 ); // Convert to days
                solarPeriod = solarT / ( 3600 * 24 ); // Convert to days
                //rotationalPeriodText = `${(siderealT / 3600).toFixed(2)} hr`;  // Convert to hours
                //solarPeriodText = `${(solarT / 3600).toFixed(2)} hr`;  // Convert to hours
                break;
            case 1: // kg, m, s
                mass = massSolar * SOLAR_MASS_TO_KG;
                diameterVal = diameterAU * AU_TO_M;
                semiMajorAxis = semiMajorAxisAU * AU_TO_M;
                
                period = T * YEAR_TO_SECONDS; // Convert to seconds
                LText = `${L.toExponential(2)} kg·m²/s`;
                IText = `${I.toExponential(2)} kg·m²`;
                omegaText = `${omegaRadPerSec.toFixed(5)} rad/s`;
                siderealPeriod = siderealT; // Convert to seconds
                solarPeriod = solarT; // Convert to seconds
                break;
            case 2: // AU, M☉, yr
                mass = massSolar;
                diameterVal = diameterAU;
                semiMajorAxis = semiMajorAxisAU;
                
                period = T; // Keep in years
                LText = `${(L / (1.989e30 * (1.496e11 * 1.496e11) / (365.25 * 24 * 60 * 60))).toExponential(2)} M☉·AU²/yr`;
                IText = `${(I / (1.989e30 * (1.496e11 * 1.496e11))).toExponential(2)} M☉·AU²`;
                omegaText = `${(omegaRadPerSec * (365.25 * 24 * 60 * 60)).toFixed(3)} rad/yr`;
                siderealPeriod = siderealT / ( 24 * 3600 * 365.25 ); // Convert to years
                solarPeriod = solarT / ( 24 * 3600 * 365.25 ); // Convert to years
                radius = radiusAU;
                velocity = velocityAUyr;
                angularMomentum = angularMomentumAU2yr;
                
                break;
        }
    }

    // Format period based on unit system
    let periodText;
    if( updateConstants)
    {
        switch (unitSystem) {
            case 0: // kg, km, s
            periodText = period > 365.25 ? `${(period / 365.25).toFixed(2)} yr` : `${period.toFixed(1)} d`;
            rotationalPeriodText = siderealPeriod > 365.25 ? `${(siderealPeriod / 365.25).toFixed(2)} yr` : `${siderealPeriod.toFixed(4)} d`;
            solarPeriodText = solarPeriod > 365.25 ? `${(solarPeriod / 365.25).toFixed(2)} yr` : `${solarPeriod.toFixed(4)} d`;
            densityText = `${density.toFixed(0)} kg/m³`;
            gravityText = `${surface_gravity.toFixed(1)} m/s²`;
            break;
            case 1: // kg, m, s
            periodText = period >= 1e6 ? `${(period / 1e6).toFixed(2)} Ms` : `${period.toFixed(0)} s`;
            rotationalPeriodText = siderealPeriod >= 1e6 ? `${(siderealPeriod / 1e6).toFixed(2)} Ms` : `${siderealPeriod.toFixed(0)} s`;
            solarPeriodText = solarPeriod >= 1e6 ? `${(solarPeriod / 1e6).toFixed(2)} Ms` : `${solarPeriod.toFixed(0)} s`;
            densityText = `${density.toFixed(0)} kg/m³`;
            gravityText = `${surface_gravity.toFixed(1)} m/s²`;
            break;
            case 2: // AU, M☉, yr
            periodText = `${period.toFixed(3)} yr`;
            rotationalPeriodText = `${siderealPeriod.toFixed(3)} yr`;
            solarPeriodText = `${solarPeriod.toFixed(3)} yr`;
            densityText = `${density.toFixed(0)} kg/m³`; // Density remains in kg/m³
            gravityText = `${surface_gravity.toFixed(1)} m/s²`; // Gravity remains in m/s²
            break;
        }
    }
    const { finalPlanetScale, finalOrbitScale } = getScaleForObject(oPlanet);

    if( updateConstants ) updateFocusConstants(oPlanet);
    //<td>${diameterVal >= 1e6 ? diameterVal.toExponential(2) : diameterVal.toFixed(6)} ${lengthUnit}</td>
    // Update Planet Info
    if( updateConstants) {
        document.getElementById('planetName').textContent = `${data.name} (${data.type})`;
        const planetTable = document.getElementById('planetTable');
        planetTable.innerHTML = `
            <tr>
                <td>m</td>
                <td>${mass >= 1e6 ? mass.toExponential(2) : mass.toFixed(6)} ${massUnit}</td>
                <td class='f_description'>Mass</td>
            </tr>
            <tr><td>ρ</td><td>${densityText}</td><td class='f_description'>Density</td></tr>
            <tr><td>g</td><td>${gravityText}</td><td class='f_description'>Surface Gravity</td></tr>
            <tr>
                <td>D</td>
                <td>${formatNumToString(diameterVal)} ${lengthUnit}</td>
                <td class='f_description'>Diameter</td>
            </tr>
            <tr>
                <td>{s}</td>
                <td>${finalPlanetScale * nHardCodeScaleFactor / nHardCodeScaleFactor}x</td>
                <td class='f_description'>Scale Factor</td>
            </tr>
            ${data.type != "star" ? `<tr><td>{o}</td><td>${finalOrbitScale * nHardCodeScaleFactor / nHardCodeScaleFactor}x</td><td class='f_description'>Orbit Scale Factor</td></tr>` : ''}
        `;
        planetTable.parentElement.style.display = 'block';
    }

    // Update Orbital Constants (if not a star)
    //<td>${semiMajorAxis >= 1e6 ? semiMajorAxis.toExponential(4) : semiMajorAxis.toFixed(6)} ${lengthUnit}</td>
    if( updateConstants) {
        const constantsTable = document.getElementById('orbConstantsTable');
        if (data.type != "star") {

            constantsTable.innerHTML = `
                <tr>
                    <td>a</td>
                    <td>${formatNumToString(semiMajorAxis)} ${lengthUnit}</td>
                    <td class='f_description'>Semi-Major Axis</td>
                </tr>
                <tr>
                    <td>e</td>
                    <td>${data.orbitalElements?.e.toFixed(4)}</td>
                    <td class='f_description'>Eccentricity</td>
                </tr>
                <tr>
                    <td>i</td>
                    <td>${data.orbitalElements?.i.toFixed(2)}°</td>
                    <td class='f_description'>Inclination</td>
                </tr>
                <tr>
                    <td>Ω</td>
                    <td>${data.orbitalElements?.Omega.toFixed(2)}°</td>
                    <td class='f_description'>Ascending Node</td>
                </tr>
                <tr>
                    <td>ω</td>
                    <td>${data.orbitalElements?.omega.toFixed(2)}°</td>
                    <td class='f_description'>Argument of Periapsis</td>
                </tr>
                <tr><td>T<sub>orb</sub></td><td>${periodText}</td><td class='f_description'>Orbital Period</td></tr>
                
            `;
            constantsTable.parentElement.style.display = 'block';
        } else {
            constantsTable.innerHTML = '';
            constantsTable.parentElement.style.display = 'none';
        }
    }
    
    // Update Orbital Dynamics (if not a star)
    //<td>${angularMomentum >= 1e6 ? angularMomentum.toExponential(2) : angularMomentum.toFixed(6)} ${massUnit}·${lengthUnit}²/${timeUnit}</td>
    const dynamicsTable = document.getElementById('dynamicsTable');
    if (data.type != "star") {
        dynamicsTable.innerHTML = `
            <tr>
                <td>|r|</td>
                <td>${formatNumToString(radius)} ${lengthUnit}</td>
                <td class='f_description'>Orbital Radius</td>
            </tr>
            <tr>
                <td>|v|</td>
                <td>${velocity >= 1e6 ? velocity.toExponential(3) : velocity.toFixed(3)} ${lengthUnit}/${timeUnit}</td>
                <td class='f_description'>Velocity</td>
            </tr>
            <tr>
                <td>|h|</td>
                <td>${angularMomentum > 1e6 ? angularMomentum.toExponential(3) : velocity.toFixed(3)} ${massUnit}·${lengthUnit}²/${timeUnit}</td>
                <td class='f_description'>Angular Momentum</td>
            </tr>
        `;
        dynamicsTable.parentElement.style.display = 'block';
    } else {
        dynamicsTable.innerHTML = '';
        dynamicsTable.parentElement.style.display = 'none';
    }

    if( updateConstants ) {
        const rotationalTable = document.getElementById('rotationalTable');
        rotationalTable.innerHTML = `
            <tr><td>ε</td><td>${tiltAngle.toFixed(2)}°</td><td class='f_description'>Tilt Angle</td></tr>
            <tr><td>L</td><td>${LText}</td><td class='f_description'>Angular Momentum</td></tr>
            <tr><td>I</td><td>${IText}</td><td class='f_description'>Moment of Inertia</td></tr>
            <tr><td>ω</td><td>${omegaText}</td><td class='f_description'>Angular Velocity</td></tr>
            <tr><td>T<sub>sid</sub></td><td>${rotationalPeriodText}</td><td class='f_description'>Sidereal Period</td></tr>
            <tr><td>T<sub>sol</sub></td><td>${solarPeriodText}</td><td class='f_description'>Solar Period</td></tr>
        `;
        rotationalTable.parentElement.style.display = 'block';
    }

    updateTableState();
    // Update Unit Label
    document.getElementById('unitLabel').textContent = unitLabel;
}

function updateTableState() {
    const hToggleButton = document.querySelector('.h-toggle-button');
    
    const tables = document.querySelectorAll('#focusBox table');
    const descriptionCells = document.querySelectorAll('#focusBox .f_description'); // Description column
    const focusBox = document.querySelectorAll('#focusBox')[0];
    const sectionHeaders = focusBox.querySelectorAll('.section-header');

    const maxWidthTxt = isLargeControls ? '500px': '350px';

    switch(tableState) {
        case 0: // Full tables
            focusBox.style.maxWidth = maxWidthTxt;

            tables.forEach(table => {
                table.style.maxWidth = maxWidthTxt;
                table.style.display = 'table';
            });
            sectionHeaders.forEach(div => {
                div.style.display = '';
            });
            descriptionCells.forEach(cell => {
                cell.style.display = 'table-cell';
            });
            hToggleButton.textContent = '◀';
            break;
            
        case 1: // No descriptions
            focusBox.style.maxWidth = '220px';

            descriptionCells.forEach(cell => {
                    
                cell.style.display = 'none';
                
            });
            sectionHeaders.forEach(div => {
                div.style.display = '';
            });
            tables.forEach(table => {
                table.style.maxWidth = '220px';
                table.style.display = 'table';
            });
            
            hToggleButton.textContent = '◀';
            break;
            
        case 2: // Collapsed
            sectionHeaders.forEach(div => {
                const b_cond = (div.parentElement.id != "unitInfo") && (div.parentElement.id != "description") && (div.parentElement.id != "photos"); 
                if( b_cond )
                {
                    div.style.display = 'none';
                }
            });
            tables.forEach(table => {
                table.style.maxWidth = '0px';
                table.style.display = 'none';
            });
            hToggleButton.textContent = '▶';
            break;
    }
}

function getFocusHTML(oPlanet) {
    const mesh = oPlanet.mesh instanceof THREE.Group ? oPlanet.mesh : oPlanet.mesh;
    const parentMass = oPlanet.parent ? oPlanet.parent.mass : SUN_MASS; // Sun's mass if no parent
    const pos = mesh.position;
    const { data, parent } = oPlanet;
    const diameter = data.radius * 2;
    const positionInAU = convertPosToAU(pos, oPlanet);
    const rAU = positionInAU.length();
    const vAUyr = Math.sqrt(G * (parent ? parent.mass : SUN_MASS) * (2 / rAU - 1 / data.orbitalElements.a));
    const LAU2yr = data.mass * rAU * vAUyr;

    // Conversion constants
    const AU_TO_KM = 1.496e8;
    const AU_TO_M = 1.496e11;
    const SOLAR_MASS_TO_KG = 1.989e30;
    const YEAR_TO_SECONDS = 365.25 * 24 * 60 * 60;

    // Base values in AU, M☉, yr
    const massSolar = data.mass;
    const diameterAU = diameter;
    const semiMajorAxisAU = data.orbitalElements?.a;
    const radiusAU = rAU;
    const velocityAUyr = vAUyr;
    const angularMomentumAU2yr = LAU2yr;

    // Calculate Orbital Period T in years
    const a = data.orbitalElements.a; // Semi-major axis in AU
    const T = Math.sqrt((a * a * a) / parentMass); // Orbital period in years

    // Converted values based on unit system
    let mass, diameterVal, radius, velocity, angularMomentum, semiMajorAxis, unitLabel, period;
    let massUnit, lengthUnit, timeUnit;

    switch (unitSystem) { // Assume unitSystem is a global variable
        case 0: // kg, km, s
            mass = massSolar * SOLAR_MASS_TO_KG;
            diameterVal = diameterAU * AU_TO_KM;
            radius = radiusAU * AU_TO_KM;
            velocity = velocityAUyr * AU_TO_KM / YEAR_TO_SECONDS;
            angularMomentum = angularMomentumAU2yr * SOLAR_MASS_TO_KG * (AU_TO_KM * AU_TO_KM) / YEAR_TO_SECONDS;
            semiMajorAxis = semiMajorAxisAU * AU_TO_KM;
            massUnit = "kg";
            lengthUnit = "km";
            timeUnit = "s";
            unitLabel = "Metric (km, kg, s)";
            period = T * YEAR_TO_SECONDS / (24 * 60 * 60); // Convert years to days
            break;
        case 1: // kg, m, s
            mass = massSolar * SOLAR_MASS_TO_KG;
            diameterVal = diameterAU * AU_TO_M;
            radius = radiusAU * AU_TO_M;
            velocity = velocityAUyr * AU_TO_M / YEAR_TO_SECONDS;
            angularMomentum = angularMomentumAU2yr * SOLAR_MASS_TO_KG * (AU_TO_M * AU_TO_M) / YEAR_TO_SECONDS;
            semiMajorAxis = semiMajorAxisAU * AU_TO_M;
            massUnit = "kg";
            lengthUnit = "m";
            timeUnit = "s";
            unitLabel = "Metric (m, kg, s)";
            period = T * YEAR_TO_SECONDS; // Convert years to seconds
            break;
        case 2: // AU, M☉, yr
            mass = massSolar;
            diameterVal = diameterAU;
            radius = radiusAU;
            velocity = velocityAUyr;
            angularMomentum = angularMomentumAU2yr;
            semiMajorAxis = semiMajorAxisAU;
            massUnit = "M☉";
            lengthUnit = "AU";
            timeUnit = "yr";
            unitLabel = "Astronomical (AU, M☉, yr)";
            period = T; // Already in years
            break;
    }

    // Format period based on unit system
    let periodText;
    switch (unitSystem) {
        case 0: // kg, km, s
        periodText = period >= 365 ? `${(period / 365.25).toFixed(2)} yr` : `${period.toFixed(1)} d`;
        break;
        case 1: // kg, m, s
        periodText = period >= 1e6 ? `${(period / 1e6).toFixed(2)} Ms` : `${period.toFixed(0)} s`;
        break;
        case 2: // AU, M☉, yr
        periodText = `${period.toFixed(3)} yr`;
        break;
    }

    // Scales (assuming getScaleForObject is defined elsewhere)
    const { finalPlanetScale, finalOrbitScale } = getScaleForObject(oPlanet);

    // HTML with sections and toggle buttons
    let sHTML = `
        <div class="section">
            <div class="section-header">
                <b>${data.name} (${data.type})</b>
                <button class="toggle-button">▲</button>
            </div>
            <table class="collapsible">
                <tr>
                    <td>m</td>
                    <td>${mass >= 1e6 ? mass.toExponential(2) : mass.toFixed(6)} ${massUnit}</td>
                    <td>Object Mass</td>
                </tr>
                <tr>
                    <td>D</td>
                    <td>${diameterVal >= 1e6 ? diameterVal.toExponential(2) : diameterVal.toFixed(6)} ${lengthUnit}</td>
                    <td>Object Diameter</td>
                </tr>
                <tr>
                    <td>{s}</td>
                    <td>${finalPlanetScale * nHardCodeScaleFactor / nHardCodeScaleFactor}x</td>
                    <td>Scale Factor</td>
                </tr>
                ${data.type != "star" ? `<tr><td>{o}</td><td>${finalOrbitScale * nHardCodeScaleFactor / nHardCodeScaleFactor}x</td><td>Orbit Scale Factor</td></tr>` : ''}
            </table>
        </div>`;
/*
    if (data.type != "star") {
        sHTML += `
            <div class="section">
                <div class="section-header">
                    <h4>Orbital Constants</h4>
                    <button class="toggle-button">▲</button>
                </div>
                <table class="collapsible">
                    <tr>
                        <td>a</td>
                        <td>${semiMajorAxis >= 1e6 ? semiMajorAxis.toExponential(4) : semiMajorAxis.toFixed(6)} ${lengthUnit}</td>
                        <td>Semi-Major Axis</td>
                    </tr>
                    <tr>
                        <td>e</td>
                        <td>${data.orbitalElements?.e.toFixed(4)}</td>
                        <td>Eccentricity</td>
                    </tr>
                    <tr>
                        <td>i</td>
                        <td>${data.orbitalElements?.i.toFixed(2)}°</td>
                        <td>Inclination</td>
                    </tr>
                    <tr>
                        <td>Ω</td>
                        <td>${data.orbitalElements?.Omega.toFixed(2)}°</td>
                        <td>Ascending Node</td>
                    </tr>
                    <tr>
                        <td>ω</td>
                        <td>${data.orbitalElements?.omega.toFixed(2)}°</td>
                        <td>Argument of Periapsis</td>
                    </tr>
                    <tr><td>T</td><td>${periodText}</td><td>Orbital Period</td></tr>
                </table>
            </div>
            <div class="section">
                <div class="section-header">
                    <h4>Orbital Dynamics</h4>
                    <button class="toggle-button">▲</button>
                </div>
                <table class="collapsible">
                    <tr>
                        <td>|r|</td>
                        <td>${radius >= 1e6 ? radius.toExponential(4) : radius.toFixed(6)} ${lengthUnit}</td>
                        <td>Orbital Radius</td>
                    </tr>
                    <tr>
                        <td>|v|</td>
                        <td>${velocity >= 1e6 ? velocity.toExponential(3) : velocity.toFixed(3)} ${lengthUnit}/${timeUnit}</td>
                        <td>Velocity</td>
                    </tr>
                    <tr>
                        <td>|h|</td>
                        <td>${angularMomentum >= 1e6 ? angularMomentum.toExponential(2) : angularMomentum.toFixed(5)} ${massUnit}·${lengthUnit}²/${timeUnit}</td>
                        <td>Angular Momentum</td>
                    </tr>
                </table>
            </div>
            ${unitLabel}
        `;
    }*/
    return sHTML;
}


function scaleVelocityVector(velocity, planetScale) {
  let vMin, vMax, lineMin = 1, lineMax = 2.5, scaleFactor = planetScale*2;
  switch (unitSystem) {
      case 0: // km/s
          vMin = 0.5;
          vMax = 50;
          break;
      case 1: // m/s
          vMin = 500;
          vMax = 50000;
          break;
      case 2: // AU/yr
          vMin = .106;
          vMax = 10.55;
          break;
  }
  let vScale = lineMin * scaleFactor;
  vScale += (velocity / vMax) * (lineMax * scaleFactor);
  return Math.max(vScale, lineMin * scaleFactor); // Ensure minimum length
}

function scaleAngularMomentumVector(angularMomentum, planetScale) {
  let hMin, hMax, lineMin = 0.5, lineMax = 1.8, scaleFactor = planetScale*5;
  switch (unitSystem) {
      case 0: // kg·km²/s
          hMin = 1e34;
          hMax = 1e43;
          break;
      case 1: // kg·m²/s
          hMin = 1e40;
          hMax = 1e49;
          break;
      case 2: // M☉·AU²/yr
          hMin = 7.094e-8;
          hMax = 7.094;
          break;
  }
  let hScale = lineMin * scaleFactor;
  hScale += (angularMomentum / hMax) * (lineMax * scaleFactor);
  return Math.max(hScale, lineMin * scaleFactor); // Ensure minimum length
}


function animateFocusPlanet(oPlanet, oCenter) {
  //const mesh = oPlanet.mesh instanceof THREE.Group ? oPlanet.mesh.children[0] : oPlanet.mesh;
  const mesh = oPlanet.mesh;
  const isSun = oPlanet.data.name == "Sun";
  const PlanetPosABS = new THREE.Vector3();

  mesh.getWorldPosition(PlanetPosABS);
  const pos = PlanetPosABS;

  //const pos = oPlanet.currentPos ? oPlanet.currentPos : new THREE.Vector3(0, 0, 0);
  const currentElements = oPlanet.currentElements ? oPlanet.currentElements : { T: 0, n: 0, M: 0, E: 0, theta: 0, r: 0};

  //const relativePOS = oPlanet.mesh instanceof THREE.Group ? pos : mesh.position;
  const relativePOS = mesh.position;

  const centralPos = oCenter.mesh.position ? oCenter.mesh.position : new THREE.Vector3(0, 0, 0);
  focusCube.position.copy(pos);

  //document.getElementById('focusContent').innerHTML = getFocusHTML(oPlanet);
  updateFocusBox(oPlanet);

  const {finalPlanetScale, finalOrbitScale} = getScaleForObject(oPlanet);

  //const typeScaleMultiplier = getTypeScaleMultiplier(oPlanet.data.type);

  const distanceToRadiusLabel = camera.position.distanceTo(radiusLabel.position);
  const distanceToVelocityLabel = camera.position.distanceTo(velocityLabel.position);
  const distanceToAngularMomentumLabel = camera.position.distanceTo(angularMomentumLabel.position);
  const distanceToVelocityCone = camera.position.distanceTo(velocityCone.position);
  const distanceToMomentumCone = camera.position.distanceTo(angularMomentumCone.position);

  const radiusLabelScale = distanceToRadiusLabel / 7;
  const velocityLabelScale = distanceToVelocityLabel / 3;
  const angularMomentumLabelScale = distanceToAngularMomentumLabel / 3;
  const vConeScale = distanceToVelocityCone / 100;
  const hConeScale = distanceToMomentumCone / 100;

  //const labelScale = planetScaleMultiplier * typeScaleMultiplier;
  const labelScale = finalPlanetScale;
  radiusLabel.scale.set(radiusLabel.userData.baseScale * radiusLabelScale, radiusLabel.userData.baseScale * radiusLabelScale, 1);
  velocityLabel.scale.set(velocityLabel.userData.baseScale * velocityLabelScale, velocityLabel.userData.baseScale * velocityLabelScale, 1);
  angularMomentumLabel.scale.set(angularMomentumLabel.userData.baseScale * angularMomentumLabelScale, angularMomentumLabel.userData.baseScale * angularMomentumLabelScale, 1);

  // Conversion constants
  const AU_TO_KM = 1.496e8;
  const AU_TO_M = 1.496e11;
  const SOLAR_MASS_TO_KG = 1.989e30;
  const YEAR_TO_SECONDS = 365.25 * 24 * 60 * 60;

  // Base values in AU, M☉, yr
  const rAUVector = convertPosToAU(relativePOS, oPlanet);
  const rAU = rAUVector.length();
  const { velocity, angularMomentum } = getVelocityAndAngularMomentum(
      oPlanet.data.orbitalElements,
      oPlanet.parent ? oPlanet.parent.mass : SUN_MASS,
      simulationTime,
      rAUVector,
      currentElements
  );
  const vAUyr = velocity.length();
  const hAU2yr = angularMomentum.length() * oPlanet.data.mass;

  

  let rText, vText, hText;
  switch (unitSystem) {
      case 0: // kg, km, s
          rText = rAU * AU_TO_KM >= 1e6 ? `r̂ = ${(rAU * AU_TO_KM / 1e6).toFixed(1)}M km` : `${(rAU * AU_TO_KM).toFixed(0)} km`;
          vText = `v̂ = ${(vAUyr * AU_TO_KM / YEAR_TO_SECONDS).toFixed(2)} km/s`;
          hText = hAU2yr * SOLAR_MASS_TO_KG * (AU_TO_KM * AU_TO_KM) / YEAR_TO_SECONDS >= 1e40
              ? `ĥ = ${(hAU2yr * SOLAR_MASS_TO_KG * (AU_TO_KM * AU_TO_KM) / YEAR_TO_SECONDS / 1e40).toFixed(2)}e40 kg·km²/s`
              : `ĥ = ${(hAU2yr * SOLAR_MASS_TO_KG * (AU_TO_KM * AU_TO_KM) / YEAR_TO_SECONDS).toExponential(2)} kg·km²/s`;
          break;
      case 1: // kg, m, s
          rText = rAU * AU_TO_M >= 1e9 ? `r̂ = ${(rAU * AU_TO_M / 1e9).toFixed(1)}B m` : `${(rAU * AU_TO_M).toFixed(0)} m`;
          vText = `v̂ = ${(vAUyr * AU_TO_M / YEAR_TO_SECONDS).toFixed(2)} m/s`;
          hText = hAU2yr * SOLAR_MASS_TO_KG * (AU_TO_M * AU_TO_M) / YEAR_TO_SECONDS >= 1e46
              ? `ĥ = ${(hAU2yr * SOLAR_MASS_TO_KG * (AU_TO_M * AU_TO_M) / YEAR_TO_SECONDS / 1e46).toFixed(2)}e46 kg·m²/s`
              : `ĥ = ${(hAU2yr * SOLAR_MASS_TO_KG * (AU_TO_M * AU_TO_M) / YEAR_TO_SECONDS).toExponential(2)} kg·m²/s`;
          break;
      case 2: // AU, M☉, yr
          rText = `r̂ = ${rAU.toFixed(6)} AU`;
          vText = `v̂ = ${vAUyr.toFixed(3)} AU/yr`;
          hText = hAU2yr >= 1e-4 
                ? `ĥ =  ${hAU2yr.toFixed(6)} M☉·AU²/yr`
                : `ĥ =  ${hAU2yr.toExponential(3)} M☉·AU²/yr`;
          break;
  }

    // Radius line (red)
    if( vectorsVisible && !isSun )
    {
        radiusLine.geometry.setFromPoints([centralPos, pos]);
        radiusLine.visible = vectorsVisible && !isSun;
        const radiusMid = centralPos.clone().lerp(pos, 0.5);
        radiusLabel.position.copy(radiusMid);
        radiusLabel.visible = vectorsVisible && !isSun;
        radiusSpriteObj.updateText(rText);
    }
    
  

    // Velocity line (green)
    const radius = oPlanet.data.radius * nHardCodeScaleFactor * mesh.scale.x;
    if( vectorsVisible && !isSun )
    {
        const vDir = velocity.clone().normalize();
        const vSurfaceStart = pos.clone().add(vDir.multiplyScalar(radius));
        const vScale = scaleVelocityVector(unitSystem === 0 ? vAUyr * AU_TO_KM / YEAR_TO_SECONDS : unitSystem === 1 ? vAUyr * AU_TO_M / YEAR_TO_SECONDS : vAUyr, finalPlanetScale);
        const vEnd = vSurfaceStart.clone().add(vDir.multiplyScalar(vScale));
        velocityLine.geometry.setFromPoints([vSurfaceStart, vEnd]);
        velocityLine.visible = vectorsVisible && !isSun;

        velocityCone.position.copy(vEnd);
        velocityCone.scale.set(vConeScale, vConeScale, vConeScale);
        velocityCone.lookAt(pos);
        velocityCone.rotateX(-Math.PI / 2);
        velocityCone.visible = vectorsVisible && !isSun;
        const vConeLength = 2 * vConeScale;

        const upDir = new THREE.Vector3(0, 4, 0);
        const labelOffset = upDir.multiplyScalar(vConeLength * 1.5);
        velocityLabel.position.copy(vEnd).add(labelOffset);
        velocityLabel.visible = vectorsVisible && !isSun;
        velocitySpriteObj.updateText(vText);
    }

  // Angular Momentum line (orange)
  if( vectorsVisible && !isSun )
  {
    const hDir = angularMomentum.clone().normalize();
    const hSurfaceStart = pos.clone().add(hDir.multiplyScalar(radius));
    const hScale = scaleAngularMomentumVector(unitSystem === 0 ? hAU2yr * SOLAR_MASS_TO_KG * (AU_TO_KM * AU_TO_KM) / YEAR_TO_SECONDS : unitSystem === 1 ? hAU2yr * SOLAR_MASS_TO_KG * (AU_TO_M * AU_TO_M) / YEAR_TO_SECONDS : hAU2yr, finalPlanetScale);
    const hEnd = hSurfaceStart.clone().add(hDir.multiplyScalar(hScale));
    angularMomentumLine.geometry.setFromPoints([hSurfaceStart, hEnd]);
    angularMomentumLine.visible = vectorsVisible && !isSun;

    angularMomentumCone.position.copy(hEnd);
    angularMomentumCone.scale.set(hConeScale, hConeScale, hConeScale);
    angularMomentumCone.lookAt(pos);
    angularMomentumCone.rotateX(-Math.PI / 2);
    angularMomentumCone.visible = vectorsVisible && !isSun;
    const hConeLength = 2 * hConeScale;

    const upDirH = new THREE.Vector3(0, 1, 0);
    const hLabelOffset = upDirH.multiplyScalar(hConeLength * 6);
    angularMomentumLabel.position.copy(hEnd).add(hLabelOffset);
    angularMomentumLabel.visible = vectorsVisible && !isSun;
    angularMomentumSpriteObj.updateText(hText);
}


  // Rotation axis line (purple)
  if (vectorsVisible && !isSun) {  // Exclude Sun for clarity, or include if desired
    
    const axisLength = radius * 4 * finalPlanetScale; // Total length (2x radius each side)
    axisScalePercent = (oPlanet.data.radius / 0.0000426) * ( finalPlanetScale / 20) ; //Scale the axis size based on Earth's Radius

    axisMesh.scale.set(axisScalePercent, axisLength, axisScalePercent);
    axisMesh.position.copy(pos);

    //Line up the Axis Mesh with the planet's rotational Quaternion
    axisMesh.quaternion.copy(oPlanet.initialQuaternion);
    axisMesh.visible = vectorsVisible && !isSun;

  } else {
    axisMesh.visible = false;
  }

    if (orbitalPlaneMesh.visible || equatorialPlaneMesh.visible) {
        updatePlanes(oPlanet);
    }

  if( updateConstants) updateConstants = false;

  if (trackingPlanet && !isFPSMode) {
      const offset = camera.position.clone().sub(orbitControls.target);
      orbitControls.target.copy(pos);
      camera.position.copy(pos.clone().add(offset));
      orbitControls.update();
  }

}




function getScreenCoordinatesOfLine(line, camera, renderer) {
    // Get the geometry's position attribute (contains start and end points)
    const positions = line.geometry.attributes.position.array; // [x1, y1, z1, x2, y2, z2]
    
    // Create vectors for start and end points
    const startPoint = new THREE.Vector3(positions[0], positions[1], positions[2]);
    const endPoint = new THREE.Vector3(positions[3], positions[4], positions[5]);
    
    // Convert to world coordinates (if the line is part of a group or has transformations)
    line.localToWorld(startPoint);
    line.localToWorld(endPoint);
    
    // Project to NDC
    startPoint.project(camera);
    endPoint.project(camera);
    
    // Get canvas dimensions
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Convert NDC to screen coordinates
    const startScreen = {
        x: (startPoint.x * 0.5 + 0.5) * width,
        y: (1 - (startPoint.y * 0.5 + 0.5)) * height, // Flip y-axis (NDC y=1 is top, screen y=0 is top)
        visible: startPoint.z < 1 // Check if in front of camera
    };
    
    const endScreen = {
        x: (endPoint.x * 0.5 + 0.5) * width,
        y: (1 - (endPoint.y * 0.5 + 0.5)) * height,
        visible: endPoint.z < 1
    };
    
    return { start: startScreen, end: endScreen };
}

function updateDirectionalArrow() {
    const arrow = document.getElementById('directionalArrow');
    if (!isFPSMode || !focusedPlanet) {
        arrow.style.display = 'none';
        //targetDirectionLine.visible = false;
        return;
    }
    //only used for
    targetDirectionLine.visible = false;

    // Get the planet's position in world space
    const planetPos = new THREE.Vector3();
    focusedPlanet.mesh.getWorldPosition(planetPos);

    // Get the camera's position and direction
    //const cameraPos = camera.position.clone();
    //const cameraDir = new THREE.Vector3();
    //camera.getWorldDirection(cameraDir); // Direction the camera is facing

    // Calculate direction from camera to planet in 3D space
    /*const directionToPlanet = planetPos.clone().sub(cameraPos).normalize();

    const projVector = projectVectorOntoPlane(directionToPlanet, cameraDir);

    const transMatrix = getCameraDirectionMatrix(camera);
    const {x, y} = getPlaneCoordinates(projVector, cameraDir,transMatrix)*/


    //The distance in front of the camera is the throttle + 2 units
    //With a minimum of '0'
    const distance = Math.max(fpsControls.throttle,0) + 2;

    //Get the vector normal to the camera's forward direction
    const forward = new THREE.Vector3();
    camera.getWorldDirection(forward); // Normalized direction camera is facing

    // Scale the direction by the distance (2 units)
    const directionVector = forward.clone().multiplyScalar(distance);

    // Compute the point 2 units in front of the camera (relative to camera position)
    const pointInFront = camera.position.clone().add(directionVector);

    //const vDir = velocity.clone().normalize();
        //const vSurfaceStart = pos.clone().add(vDir.multiplyScalar(radius));
        //const vScale = scaleVelocityVector(unitSystem === 0 ? vAUyr * AU_TO_KM / YEAR_TO_SECONDS : unitSystem === 1 ? vAUyr * AU_TO_M / YEAR_TO_SECONDS : vAUyr, finalPlanetScale);
        //const vEnd = vSurfaceStart.clone().add(vDir.multiplyScalar(vScale));

    // Create a vector from point1 to point2
    const point1 = pointInFront.clone();
    const point2 = planetPos.clone();
    const vector = new THREE.Vector3();
    vector.subVectors(point2, point1);
    const vDir = vector.clone().normalize();
    

    const vEnd = pointInFront.clone().add(vDir.multiplyScalar(Math.max(fpsControls.throttle,0) + 2));

    targetDirectionLine.geometry.setFromPoints([pointInFront, vEnd]);

    

    const {start, end} = getScreenCoordinatesOfLine(targetDirectionLine, camera, renderer);

    const circleRadius = 125; // Pixels; adjust as needed

    // Crosshair is at screen center
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const crosshairX = screenWidth / 2;
    const crosshairY = screenHeight / 2;


    const xComponent = end.x - crosshairX;
    const yComponent = crosshairY - end.y;
    const vMag = Math.sqrt(Math.pow(xComponent,2) + Math.pow(yComponent,2));
    const xNorm = xComponent/vMag;
    const yNorm = yComponent/vMag;
    const angle = Math.atan(xComponent/yComponent)
    
    const xOffset = Math.abs(xComponent) < Math.abs(xNorm * circleRadius) ? xComponent : xNorm * circleRadius;
    const yOffset = Math.abs(yComponent) < Math.abs(yNorm * circleRadius) ? yComponent : yNorm * circleRadius;
    // Position the arrow on the circle
   
    const arrowX = crosshairX + xOffset;
    const arrowY = crosshairY - yOffset;
    if( Math.sqrt( Math.pow(xOffset,2)  + Math.pow(yOffset,2) ) > 20  ) 
    {
        arrow.style.display = 'block';
    }
    else
    {
        arrow.style.display = 'none';
    }

    // Update arrow position
    arrow.style.left = `${arrowX}px`;
    arrow.style.top = `${arrowY}px`;
   

    // Rotate arrow to point toward the planet
    const rotationDegrees = (angle * 180) / Math.PI;

    const finalRotation = yComponent > 0 ? rotationDegrees : rotationDegrees - 180;
    arrow.style.transform = `translate(-50%, -50%) rotate(${finalRotation}deg)`;
    
}

function getCameraDistances()
{
  // Update camera position display with distances
  const camPos = camera.position;
  const sunPos = new THREE.Vector3(0, 0, 0); // Sun is at origin
  const distanceToSun = camPos.distanceTo(sunPos); // In simulation units (scaled AU * nHardCodeOrbitScaleFactor)

  // Conversion constants
  const AU_TO_KM = 1.496e8;
  const AU_TO_M = 1.496e11;
  const simulationScale = nHardCodeOrbitScaleFactor; // From getPosition scaling

  let posText, sunDistText, planetDistText = "N/A";
  let unitLabel;
  switch (unitSystem) {
      case 0: // kg, km, s
          posText = `(${(camPos.x / simulationScale * AU_TO_KM).toFixed(1)}, ${(camPos.y / simulationScale * AU_TO_KM).toFixed(1)}, ${(camPos.z / simulationScale * AU_TO_KM).toFixed(1)}) km`;
          sunDistText = `${(distanceToSun / simulationScale * AU_TO_KM / 1e6).toFixed(2)}M km`;
          if (focusedPlanet) {
              const planetPos = focusedPlanet.mesh instanceof THREE.Group ? focusedPlanet.mesh.children[0].position : focusedPlanet.mesh.position;
              const absPlanetPos = new THREE.Vector3();
              focusedPlanet.mesh.getWorldPosition(absPlanetPos);
              const distanceToPlanet = camPos.distanceTo(absPlanetPos);
              planetDistText = `${(distanceToPlanet / simulationScale * AU_TO_KM / 1e6).toFixed(2)}M km`;
          }
          if(PopupObj)
          {
              const planetPos = PopupObj.mesh instanceof THREE.Group ? PopupObj.mesh.children[0].position : PopupObj.mesh.position;
              const absPlanetPos = new THREE.Vector3();
              PopupObj.mesh.getWorldPosition(absPlanetPos);
              const distanceToPlanet = camPos.distanceTo(absPlanetPos);
              planetDistText = `${(distanceToPlanet / simulationScale * AU_TO_KM / 1e6).toFixed(2)}M km`;
          }
          unitLabel = "km";
          break;
      case 1: // kg, m, s
          posText = `(${(camPos.x / simulationScale * AU_TO_M / 1e9).toFixed(1)}B, ${(camPos.y / simulationScale * AU_TO_M / 1e9).toFixed(1)}B, ${(camPos.z / simulationScale * AU_TO_M / 1e9).toFixed(1)}B) m`;
          sunDistText = `${(distanceToSun / simulationScale * AU_TO_M / 1e9).toFixed(2)}B m`;
          if (focusedPlanet) {
              const planetPos = focusedPlanet.mesh instanceof THREE.Group ? focusedPlanet.mesh.children[0].position : focusedPlanet.mesh.position;
              const absPlanetPos = new THREE.Vector3();
              focusedPlanet.mesh.getWorldPosition(absPlanetPos);
              const distanceToPlanet = camPos.distanceTo(absPlanetPos);
              planetDistText = `${(distanceToPlanet / simulationScale * AU_TO_M / 1e9).toFixed(2)}B m`;
          }
          if (PopupObj) {
            const planetPos = PopupObj.mesh instanceof THREE.Group ? PopupObj.mesh.children[0].position : PopupObj.mesh.position;
            const absPlanetPos = new THREE.Vector3();
            PopupObj.mesh.getWorldPosition(absPlanetPos);
            const distanceToPlanet = camPos.distanceTo(absPlanetPos);
            planetDistText = `${(distanceToPlanet / simulationScale * AU_TO_M / 1e9).toFixed(2)}B m`;
          }
          unitLabel = "m";
          break;
      case 2: // AU, M☉, yr
          posText = `(${(camPos.x / simulationScale).toFixed(2)}, ${(camPos.y / simulationScale).toFixed(2)}, ${(camPos.z / simulationScale).toFixed(2)}) AU`;
          sunDistText = `${(distanceToSun / simulationScale).toFixed(2)} AU`;
          if (focusedPlanet) {
              const planetPos = focusedPlanet.mesh instanceof THREE.Group ? focusedPlanet.mesh.children[0].position : focusedPlanet.mesh.position;
              const absPlanetPos = new THREE.Vector3();
              focusedPlanet.mesh.getWorldPosition(absPlanetPos);
              const distanceToPlanet = camPos.distanceTo(absPlanetPos);
              planetDistText = `${(distanceToPlanet / simulationScale).toFixed(2)} AU`;
          }
          if (PopupObj) {
            const planetPos = PopupObj.mesh instanceof THREE.Group ? PopupObj.mesh.children[0].position : PopupObj.mesh.position;
            const absPlanetPos = new THREE.Vector3();
            PopupObj.mesh.getWorldPosition(absPlanetPos);
            const distanceToPlanet = camPos.distanceTo(absPlanetPos);
            planetDistText = `${(distanceToPlanet / simulationScale).toFixed(2)} AU`;
          }
          unitLabel = "AU";
          break;
  }
  return {posText, sunDistText, planetDistText };
}

// Movement variables for FPS mode
const moveSpeed = 200; // Units per second
const verticalSpeed = 50; // Units per second for up/down
const keys = {
    w: false,
    a: false,
    s: false,
    d: false,
    space: false,
    shift: false
};

function updateThrottleIndicator() {
    const throttleIndicator = document.getElementById('throttleIndicator');
    const positiveThrottleBar = document.getElementById('positiveThrottleBar');
    const negativeThrottleBar = document.getElementById('negativeThrottleBar');
    const throttleValue = document.getElementById('throttleValue');
    
    const min = fpsControls.maxReverse; // -10
    const max = fpsControls.maxThrottle; // 200
    const throttle = fpsControls.throttle;
    
    if (throttle >= 0) {
        // Positive throttle (including zero)
        const positiveRange = max; // 0 to 200
        const positivePercentage = (throttle / positiveRange) * 100;
        positiveThrottleBar.style.height = `${Math.max(0, Math.min(100, positivePercentage))}%`;
        negativeThrottleBar.style.height = '0%'; // Reset negative bar
        negativeThrottleBar.classList.remove('active');
    } else {
        // Negative throttle
        const negativeRange = Math.abs(min); // 10 (from -10 to 0)
        const negativePercentage = (Math.abs(throttle) / negativeRange) * 100;
        negativeThrottleBar.style.height = `${Math.max(0, Math.min(100, negativePercentage))}%`;
        positiveThrottleBar.style.height = '0%'; // Reset positive bar
        negativeThrottleBar.classList.add('active'); // Turn red
    }
    // Convert throttle to km/s and fraction of c
    const speedKmS = throttleToKmPerS(throttle);
    const speedC = throttleToFractionOfC(throttle);

    // Update throttle value display on two rows
    throttleValue.innerHTML = `${(speedKmS).toFixed(1)} km/s<br>${speedC.toFixed(4)} c`;
    //throttleValue.textContent = `${throttle.toFixed(0)}`;
}

// Toggle FPS mode
function toggleFPSMode(enable) {
    const throttleIndicator = document.getElementById('throttleIndicator');
    if (enable) {
        orbitControls.enabled = false;
        fpsControls.enabled = true;
        isFPSMode = true;
        fpsControls.throttle = 0;
        crosshair.style.display = 'block';
        throttleIndicator.style.display = 'block'; // Show throttle indicator
        updateThrottleIndicator(); // Initial update
        renderer.domElement.focus();
        console.log('Fly Mode Enabled with FlyControls');
        //focusedPlanet = null;
        //trackingPlanet = null;
        vectorsVisible = false;

        radiusLine.visible = false;
        velocityLine.visible = false;
        angularMomentumLine.visible = false;
        velocityCone.visible = false;
        angularMomentumCone.visible = false;
        radiusLabel.visible = false;
        velocityLabel.visible = false;
        angularMomentumLabel.visible = false;
        axisMesh.visible = false;
        
        
    } else {
        fpsControls.enabled = false;
        orbitControls.enabled = true;
        isFPSMode = false;
        crosshair.style.display = 'none';
        throttleIndicator.style.display = 'none'; // Hide throttle indicator
        console.log('Fly Mode Disabled, OrbitControls Active');
        // Restore OrbitControls target
        if (focusedPlanet && trackingPlanet) {
            vectorsVisible = true;
            const mesh = focusedPlanet.mesh instanceof THREE.Group ? focusedPlanet.mesh.children[0] : focusedPlanet.mesh;
            const planetPos = new THREE.Vector3();
            mesh.getWorldPosition(planetPos);
            orbitControls.target.copy(planetPos);
        } else {
            orbitControls.target.set(0, 0, 0); // Default to Sun
        }
        orbitControls.update();
    }
}

// Toggle with 'F' key
window.addEventListener('keydown', (e) => {
    if (document.activeElement === planetSearch) {
        // If typing in the search box, ignore 'C' for mode toggle
        return;
    }

    if (e.key.toLowerCase() === 'c') {
        toggleFPSMode(!isFPSMode);
    }
});



function animate() {
    requestAnimationFrame(animate);
    const currentTime = performance.now();

    const delta = (currentTime - lastTime) / 1000; // Delta time in seconds
    frameCount++;

    if (delta >= 1) { // Update FPS every second
        fps = frameCount / delta;
        frameCount = 0;
        lastTime = currentTime;
        if (fpsVisible) {
            document.getElementById('fpsCounter').textContent = `FPS: ${fps.toFixed(1)}`;
        }
    }

    const simulationDelta = 1 / 60; // Assuming 60 FPS for consistent movement

    if (!paused) {
        simulationTime += (timeScale / 365.25) * (1 / 60); // Assuming 60 FPS
        //simulationTime += (timeScale / 365.25) * delta; // Assuming 60 FPS
    }

    
    // Cloud UV scroll rate (radians-equivalent texture offset)
    const cloudUvScroll = isShaderOn('shaderCloudMotion') ? currentTime * 0.000015 : 0.0;
    const sunOrigin = new THREE.Vector3(0, 0, 0);

    let nStarCount = 0;
    celestialObjects.forEach(obj => {

        const rotationAngle = obj.rotationalOmega * simulationTime;

        // Update advanced shader uniforms (sun direction from body → sun)
        if (obj.advancedUniforms && obj.advancedUniforms.length) {
            const bodyPos = new THREE.Vector3();
            obj.mesh.getWorldPosition(bodyPos);
            // Light comes from the sun (origin) toward the body: direction to light = -bodyPos
            const sunDir = sunOrigin.clone().sub(bodyPos);
            if (sunDir.lengthSq() < 1e-12) {
                sunDir.set(0, 1, 0);
            } else {
                sunDir.normalize();
            }
            // For bodies near origin (sun), use a fixed direction
            if (obj.data.type === 'star') {
                sunDir.set(0, 0, 1);
            }
            const planetRadiusScaled = (obj.data.radius || 0) * nHardCodeScaleFactor *
                (typeof getScaleForObject === 'function' ? (getScaleForObject(obj).finalPlanetScale || 1) : 1);

            obj.advancedUniforms.forEach(u => {
                if (u.sunDirection) u.sunDirection.value.copy(sunDir);
                if (u.planetPosition) u.planetPosition.value.copy(bodyPos);
                if (u.planetRadius) u.planetRadius.value = planetRadiusScaled;
                if (u.time) u.time.value = currentTime * 0.001;
                if (u.uvOffset) u.uvOffset.value = cloudUvScroll;
                if (u.ambientColor) {
                    u.ambientColor.value.set(ambientIntensity, ambientIntensity, ambientIntensity);
                }
            });

            // Jupiter GRS lightning: wall-clock 5–30s cadence (ignores sim timeScale; not aurora)
            if (obj.data.name === 'Jupiter') {
                const planetMesh = obj.mesh.getObjectByName('Jupiter') || obj.mesh.children[0];
                const grs = planetMesh && planetMesh.getObjectByName
                    ? planetMesh.getObjectByName('grsLightning')
                    : null;
                if (grs) updateJupiterGrsLightning(grs, currentTime);
            }
        }

        if (obj.data.type === "star") {

            const sunMesh = obj.mesh.children[0];
            if(sunMesh.material.uniforms)
            {
                sunMesh.material.uniforms.time.value = currentTime * 0.001;
            }
            
             // Sun’s position is fixed
            //const rotationAngleSun = obj.rotationalOmega * (timeScale / 365.25) * (1 / 60);
            
            sunMesh.quaternion.copy(obj.initialQuaternion);
            sunMesh.rotateY(rotationAngle);;  // Already tilted by axialTilt

            // Single-face flare shell: FrontSide outside / BackSide when camera is inside
            const flares = sunMesh.getObjectByName('sunFlares');
            if (flares && flares.visible) {
                updateSunFlareMeshSide(flares);
            }

            nStarCount++;

            return;  
        }


        //Orbital Position
        const {pos, elements} = getPosition(obj.data.orbitalElements, obj.parent ? obj.parent.mass : SUN_MASS, simulationTime, obj.data.type, 1);
        
        //is it a valid object
        if (obj.mesh instanceof THREE.Group && ( obj.data.type != "moon") ) {
        
            obj.mesh.position.copy(pos);

            const planetMesh = obj.mesh.getObjectByName(obj.data.name) || obj.mesh.children[0];
            const atmMesh = obj.mesh.getObjectByName('atmosphere');
            const ringMesh = obj.mesh.getObjectByName('ring');

            // Apply rotation with tilt
            planetMesh.quaternion.copy(obj.initialQuaternion);  // Reset to tilted orientation
            planetMesh.rotateY(rotationAngle);  // Rotate around local Z-axis

            if(atmMesh instanceof THREE.Mesh)
            {
                
                const cloudRotationAngle = ( obj.rotationalOmega * 1.4) * simulationTime;
                atmMesh.quaternion.copy(obj.initialQuaternion);
                atmMesh.rotateY(cloudRotationAngle);

                const {finalPlanetScale, finalOrbitScale} = getScaleForObject(getMeshByName(obj.data.name));
                
                const planetPos = new THREE.Vector3();
                obj.mesh.getWorldPosition(planetPos);

                if( !isLogDepthBuffer )
                {
                    
                    const distance = camera.position.distanceTo(planetPos);
                    const baseRadius = obj.data.radius * nHardCodeScaleFactor * finalPlanetScale;
                    const distanceFactor = Math.min(1, distance / (baseRadius * 50)); // Adjust 50 as needed
                }
              
            }

            if(ringMesh instanceof THREE.Mesh)
            {
                ringMesh.rotateZ(rotationAngle);

                const {finalPlanetScale, finalOrbitScale} = getScaleForObject(getMeshByName(obj.data.name));

                const planetPos = new THREE.Vector3();
                obj.mesh.getWorldPosition(planetPos);

                if( !isLogDepthBuffer )
                {
                    
                    const distance = camera.position.distanceTo(planetPos);
                    const baseRadius = obj.data.radius * nHardCodeScaleFactor * finalPlanetScale;
                    const distanceFactor = Math.min(1, distance / (baseRadius * 36.2)); // Adjust 50 as needed

                    ringMesh.material.opacity = Math.max(0, 0.8 - distanceFactor * 0.8); // Fade slightly
                }

            }

            obj.data.moons.forEach((moon) => {
                const moonObj = getMeshByName(moon.name);
                // Use the moon object's own group (not fragile children[i*2] indices).
                // Planet group children also include orbit lines and planet-relative trails.
                if (!moonObj || !moonObj.mesh) return;

                const moonMesh = moonObj.mesh;
                const { finalOrbitScale } = getScaleForObject(moonObj);
                const { pos: moonPos, elements: moonElements } = getPosition(
                    moon.orbitalElements,
                    obj.data.mass,
                    simulationTime,
                    moon.type,
                    finalOrbitScale
                );
                const moonRotationAngle = moonObj.rotationalOmega * simulationTime;

                moonMesh.position.copy(moonPos);
                moonMesh.quaternion.copy(moonObj.initialQuaternion);
                moonMesh.rotateY(moonRotationAngle);

                moon.currentPos = moonPos;
                moon.currentElements = moonElements;
            });

            // Moon umbra uniforms after moon positions are set (same analytic sphere occlusion as rings)
            if (obj.advancedUniforms && obj.advancedUniforms.length &&
                isShaderOn('shaderMoonShadows') && obj.data.moons && obj.data.moons.length) {
                updateMoonShadowUniforms(obj);
            } else if (obj.advancedUniforms && obj.advancedUniforms.length) {
                // Clear / disable when feature off so stale umbrae don't linger
                obj.advancedUniforms.forEach(u => {
                    if (u.moonCount) {
                        u.enableMoonShadows.value = 0.0;
                        u.moonCount.value = 0;
                    }
                });
            }
        } else {
            //Don't process moon submeshes
           
        }

        //Store the current position so we don't have to calculate it again
        obj.currentPos = pos;
        obj.currentElements = elements;
        

    });

    if( PopupObj != null)
    {
        popup.innerHTML = getFocusHTML( PopupObj );
        
    }

    if (focusedPlanet) {
        animateFocusPlanet(focusedPlanet, focusedCenterOfGravity);
    } else {
        // Hide lines and labels when no planet is focused
        radiusLine.visible = false;
        velocityLine.visible = false;
        angularMomentumLine.visible = false;
        radiusLabel.visible = false;
        velocityLabel.visible = false;
        angularMomentumLabel.visible = false;
    }
    //Update the directional Arrow
    updateDirectionalArrow();
    //Asteroid Trail Material
    //asteroidTrailMaterial.uniforms.time.value += delta;

    // Planet trails
    if (!planetOrbitsVisible) {
        celestialObjects.forEach(obj => {
            if (obj.data.type !== "moon" && obj.data.type !== "asteroid" && obj.trailLine) {
                const positions = obj.trailLine.geometry.attributes.position.array;
                const opacities = obj.trailLine.geometry.attributes.opacity.array;

                for (let i = 0; i < N_TRAIL_POINTS; i++) {
                    const timeOffset = i * obj.trailDeltaT;
                    const {pos: pastPos, elements: pastElements} = getPosition(
                        obj.data.orbitalElements,
                        obj.parent.mass,
                        simulationTime - timeOffset,
                        obj.data.type,
                        1
                    );
                    //const pastPos = pos;
                    positions[i * 3] = pastPos.x;
                    positions[i * 3 + 1] = pastPos.y;
                    positions[i * 3 + 2] = pastPos.z;
                    opacities[i] = 1 - (i / (N_TRAIL_POINTS - 1));
                }

                obj.trailLine.geometry.attributes.position.needsUpdate = true;
                obj.trailLine.geometry.attributes.opacity.needsUpdate = true;
                obj.trailLine.visible = planetTrailsVisible && !planetOrbitsVisible;
            }
        });
    }

    // Moon trails — planet-relative only (same frame as moon orbit lines).
    // Trail is parented under the planet group; do not add past heliocentric planet positions
    // or the path becomes a solar-system spiral instead of an arc of the moon ellipse.
    if (!moonOrbitsVisible) {
        celestialObjects.forEach(obj => {
            if (obj.data.type === "moon" && obj.trailLine) {
                const positions = obj.trailLine.geometry.attributes.position.array;
                const opacities = obj.trailLine.geometry.attributes.opacity.array;
                const { finalOrbitScale } = getScaleForObject(obj);

                for (let i = 0; i < N_TRAIL_POINTS; i++) {
                    const timeOffset = i * obj.trailDeltaT;
                    const pastTime = simulationTime - timeOffset;
                    // Same scale/Kepler path as live moon mesh & orbit ellipse (baked into vertices)
                    const { pos: moonRelPast } = getPosition(
                        obj.data.orbitalElements,
                        obj.parent.mass,
                        pastTime,
                        obj.data.type,
                        finalOrbitScale
                    );

                    positions[i * 3] = moonRelPast.x;
                    positions[i * 3 + 1] = moonRelPast.y;
                    positions[i * 3 + 2] = moonRelPast.z;
                    opacities[i] = 1 - (i / (N_TRAIL_POINTS - 1));
                }
                obj.trailLine.geometry.attributes.position.needsUpdate = true;
                obj.trailLine.geometry.attributes.opacity.needsUpdate = true;
                obj.trailLine.visible = moonTrailsVisible && !moonOrbitsVisible;
            }
        });
    }

    // Asteroid trails
    if (!asteroidOrbitsVisible) {
        celestialObjects.forEach(obj => {
            if (obj.data.type === "asteroid" && obj.trailLine) {
                const positions = obj.trailLine.geometry.attributes.position.array;
                const opacities = obj.trailLine.geometry.attributes.opacity.array;

                for (let i = 0; i < N_TRAIL_POINTS; i++) {
                    const timeOffset = i * obj.trailDeltaT;
                    const {pos: pastPos, elements: pastElements} = getPosition(
                        obj.data.orbitalElements,
                        obj.parent.mass,
                        simulationTime - timeOffset,
                        obj.data.type,
                        1
                    );
                    //const pastPos = pos;
                    positions[i * 3] = pastPos.x;
                    positions[i * 3 + 1] = pastPos.y;
                    positions[i * 3 + 2] = pastPos.z;
                    opacities[i] = 1 - (i / (N_TRAIL_POINTS - 1));
                }

                obj.trailLine.geometry.attributes.position.needsUpdate = true;
                obj.trailLine.geometry.attributes.opacity.needsUpdate = true;
                obj.trailLine.visible = asteroidTrailsVisible && !asteroidOrbitsVisible;
            }
        });
    }


    if (asteroidPoints) {
        const positions = asteroidPoints.geometry.attributes.position.array;
        asteroidPointsData.forEach((data, index) => {
        const {pos, elements} = getPosition(data.orbitalElements, SUN_MASS, simulationTime, "asteroid", 1);
        positions[index * 3] = pos.x;
        positions[index * 3 + 1] = pos.y;
        positions[index * 3 + 2] = pos.z;
        });
        asteroidPoints.geometry.attributes.position.needsUpdate = true;
    }

    if (kboPoints) {
        const positions = kboPoints.geometry.attributes.position.array;
        kboData.forEach((data, index) => {
            const {pos, elements} = getPosition(data.orbitalElements, SUN_MASS, simulationTime, "kbo", 1);
            positions[index * 3] = pos.x;
            positions[index * 3 + 1] = pos.y;
            positions[index * 3 + 2] = pos.z;
        });
        kboPoints.geometry.attributes.position.needsUpdate = true;
    }



    document.getElementById('dateTimeLabel').textContent = formatDateTime(simulationTime);

    // Add camera position display
    const camPos = camera.position;
    const {posText, sunDistText, planetDistText } = getCameraDistances()

    targetName = focusedPlanet ? focusedPlanet.data.name : "N/A";
    targetName = PopupObj ? "Target" : targetName;
    document.getElementById('cameraPosition').textContent = 
        `Camera: \n(${camPos.x.toFixed(1)}, ${camPos.y.toFixed(1)}, ${camPos.z.toFixed(1)})\n` +
        `Dist to Sun: ${sunDistText}\n` +
        `Dist to ${targetName}: ${planetDistText}`;
    
        
    // FPS movement logic
    // Update controls
    if (isFPSMode) {
        fpsControls.update(simulationDelta); // Update FlyControls with delta time
        updateThrottleIndicator();
        let target = new THREE.Vector2;
        target.x = 0;
        target.y = 0;

        raycaster.setFromCamera(target, camera);
        const intersects = raycaster.intersectObjects(celestialObjects.map(obj => obj.mesh instanceof THREE.Group ? obj.mesh.children[0] : obj.mesh));
        if (intersects.length > 0) {
            const obj = celestialObjects.find(o => (o.mesh instanceof THREE.Group ? o.mesh.children[0] : o.mesh) === intersects[0].object);
            PopupObj = obj;

            popup.innerHTML = getFocusHTML( PopupObj );
            
            popup.style.left = 'auto';
            popup.style.right = '10px';
            popup.style.top = '100px';
            popup.style.maxWidth = '350px';
            popup.style.display = 'block';
        } else {
            popup.style.display = 'none';
            PopupObj = null;
        }

    } else if (trackingPlanet && focusedPlanet) {
        /*const mesh = focusedPlanet.mesh instanceof THREE.Group ? focusedPlanet.mesh.children[0] : focusedPlanet.mesh;
        const planetPos = new THREE.Vector3();

        mesh.getWorldPosition(planetPos);
        orbitControls.target.copy(planetPos);*/

        /*if (orbitalPlaneMesh.visible || equatorialPlaneMesh.visible) {
            updatePlanes(focusedPlanet);
        }*/

        orbitControls.update();
    } else {
        orbitControls.update();
    }
    
    renderSolarSystemFrame();
}
animate();

function convertSliderValueInToTime(sliderValue)
{
    sliderABS = Math.abs(sliderValue);
    const isMobile = isMobileBool;
    let timeReturn = sliderValue;
    let timeText = sliderValue;
    let unitText = !isMobile ? "hours" : "hrs";
    if( sliderABS > 0 && sliderABS <= 10 )
    {
        timeReturn = (sliderValue * 5) / (1440);
        timeText = sliderValue * 5;
        unitText = !isMobile ? "mins" : "m";
        if(  Math.abs(timeText) == 1) unitText = !isMobile ? "min" : "m";;
    }
    if( sliderABS > 10 && sliderABS <= 34 )
    {
        timeReturn = Math.sign(sliderValue) * (sliderABS - 10) / 24;
        timeText = Math.sign(sliderValue) * (sliderABS - 10);
        unitText = !isMobile ? "hours" : "hrs";
        if(  Math.abs(timeText) == 1) unitText = !isMobile ? "hour" : "hr";;
    }
    if( sliderABS > 34 && sliderABS <= 398 )
    {
        timeReturn = Math.sign(sliderValue) * (sliderABS - 33);
        timeText = timeReturn;
        unitText = !isMobile ? "days" : "d";;
    }
    if( sliderABS > 398)
    {
            timeText = Math.sign(sliderValue) * ( (sliderABS - 397) * 1 );
            timeReturn = timeText * 365;
            unitText = !isMobile ? "years" : "yrs";;
    }
    return {timeReturn, timeText, unitText};
}
/*
function checkPlanetScale(planetName) {
    const planetObj = celestialObjects.find(obj => obj.data.name === planetName);
    if (!planetObj) {
        console.log(`Planet ${planetName} not found`);
        return;
    }
    const mesh = planetObj.mesh instanceof THREE.Group ? planetObj.mesh.children[0] : planetObj.mesh;

    // Local scale
    const localScale = mesh.scale;
    console.log(`${planetName} local scale: (${localScale.x}, ${localScale.y}, ${localScale.z})`);

    // World scale
    const worldScale = new THREE.Vector3();
    mesh.getWorldScale(worldScale);
    console.log(`${planetName} world scale: (${worldScale.x}, ${worldScale.y}, ${worldScale.z})`);
}

// Test with Phobos
checkPlanetScale("Phobos");*/

// Event listeners for controls
document.getElementById('pauseResume').addEventListener('click', function() {
    paused = !paused;
    this.textContent = paused ? '▶' : '⏸'; // Play (▶) when paused, Pause (⏸) when playing
});


document.getElementById('togglePlanetOrbits').addEventListener('click', function() {
    planetOrbitsVisible = !planetOrbitsVisible;
    planetOrbitLines.forEach(line => line.visible = planetOrbitsVisible);
    celestialObjects.forEach(obj => {
        if (obj.trailLine && obj.data.type !== "moon" && obj.data.name !== "Sun") {
            obj.trailLine.visible = planetTrailsVisible && !planetOrbitsVisible;
        }
    });
    this.textContent = planetOrbitsVisible ? 'Hide Planet Orbits' : 'Show Planet Orbits';
    setCookie('planetOrbitsVisible', planetOrbitsVisible, 30);
});


document.getElementById('toggleMoonOrbits').addEventListener('click', function() {
    moonOrbitsVisible = !moonOrbitsVisible;
    moonOrbitLines.forEach(line => line.visible = moonOrbitsVisible);
    celestialObjects.forEach(obj => {
        if (obj.data.type === "moon" && obj.trailLine) {
            obj.trailLine.visible = moonTrailsVisible && !moonOrbitsVisible;
        }
    });
    this.textContent = moonOrbitsVisible ? 'Hide Moon Orbits' : 'Show Moon Orbits';
    setCookie('moonOrbitsVisible', moonOrbitsVisible, 30);
});

// Toggle Planet Trails

document.getElementById('togglePlanetTrails').addEventListener('click', function() {
    planetTrailsVisible = !planetTrailsVisible;
    celestialObjects.forEach(obj => {
        if (obj.data.type !== "moon" && obj.trailLine) {
            obj.trailLine.visible = planetTrailsVisible && !planetOrbitsVisible;
        }
    });
    this.textContent = planetTrailsVisible ? 'Hide Planet Trails' : 'Show Planet Trails';
    setCookie('planetTrailsVisible', planetTrailsVisible, 30);
});

// Toggle Moon Trails
document.getElementById('toggleMoonTrails').addEventListener('click', function() {
    moonTrailsVisible = !moonTrailsVisible;
    celestialObjects.forEach(obj => {
        if (obj.data.type === "moon" && obj.trailLine) {
            obj.trailLine.visible = moonTrailsVisible && !moonOrbitsVisible;
        }
    });
    this.textContent = moonTrailsVisible ? 'Hide Moon Trails' : 'Show Moon Trails';
    setCookie('moonTrailsVisible', moonTrailsVisible, 30);
});

/*document.getElementById('help').addEventListener('click', () => {
    document.getElementById('helpPopup').style.display = 'block';
});*/

document.getElementById('increaseAmbient').addEventListener('click', () => {
    ambientIntensity = Math.min(1.0, ambientIntensity + 0.1);
    ambientLight.intensity = ambientIntensity;
    document.getElementById('increaseAmbient').textContent = `Increase Ambient (${(ambientIntensity * 100).toFixed(0)}%)`;
    document.getElementById('decreaseAmbient').textContent = `Decrease Ambient (${(ambientIntensity * 100).toFixed(0)}%)`;
    setCookie('ambientIntensity', ambientIntensity, 30);
});

document.getElementById('decreaseAmbient').addEventListener('click', () => {
    ambientIntensity = Math.max(0.0, ambientIntensity - 0.1);
    ambientLight.intensity = ambientIntensity;
    document.getElementById('increaseAmbient').textContent = `Increase Ambient (${(ambientIntensity * 100).toFixed(0)}%)`;
    document.getElementById('decreaseAmbient').textContent = `Decrease Ambient (${(ambientIntensity * 100).toFixed(0)}%)`;
    setCookie('ambientIntensity', ambientIntensity, 30);
});

//Time Scale Controls
document.getElementById('timeForward').addEventListener('click', () => {

  // Get the slider element
  const slider = document.getElementById('timeScaleSlider');

  //Increase the slider value by '1' unit
  slider.value = parseInt(slider.value) + 1; // Sets the slider to 50

  //Trigger the 'input' event
  slider.dispatchEvent(new Event('input'));
});

document.getElementById('timeBackward').addEventListener('click', () => {

  // Get the slider element
  const slider = document.getElementById('timeScaleSlider');

  //Decrease the slider value by '1' unit
  slider.value = parseInt(slider.value) - 1; // Sets the slider to 50

  //Trigger the 'input' event
  slider.dispatchEvent(new Event('input'));

});
document.getElementById('timeScaleSlider').addEventListener('input', (event) => {
    const {timeReturn, timeText, unitText} = convertSliderValueInToTime(event.target.value); // Slider value as days
    timeScale = timeReturn;
    document.getElementById('timeRateLabel').textContent = getTimeScaleTxt();
});

document.getElementById('toggleUnits').addEventListener('click', () => {
  unitSystem = (unitSystem + 1) % 3; // Cycle through 0, 1, 2
  if (focusedPlanet) {
      //document.getElementById('focusContent').innerHTML = getFocusHTML(focusedPlanet);
      updateConstants = true;
      updateFocusBox(focusedPlanet);
  }
  if (PopupObj) {
      popup.innerHTML = getFocusHTML(PopupObj);
      
  }
});



document.getElementById('togglePlanetRings').addEventListener('click', () => {
    planetRingsVisible = !planetRingsVisible;
    celestialObjects.forEach(obj => {
        if (obj.hasRing) {
            const ringMesh = obj.mesh.getObjectByName('ring');
            if (ringMesh) {
                ringMesh.visible = planetRingsVisible;
            }
        }
    });
    document.getElementById('togglePlanetRings').textContent = planetRingsVisible ? 'Hide Planet Rings' : 'Show Planet Rings';
    setCookie('planetRingsVisible', planetRingsVisible, 30);
});

document.getElementById('toggleBackdrop').addEventListener('click', () => {
    backdropVisible = !backdropVisible;
    backlight_sphere.visible = backdropVisible;
    document.getElementById('toggleBackdrop').textContent = backdropVisible ? 'Hide Backdrop' : 'Show Backdrop';
    setCookie('backdropVisible', backdropVisible, 30);
});


document.getElementById('showEquations').addEventListener('click', () => {
    const equations = [
        { name: "Kepler's Equation", latex: "M = E - e \\sin(E)" },
        { name: "Orbital Period", latex: "T = \\sqrt{\\frac{a^3}{M}}" },
        { name: "Mean Motion", latex: "n = \\frac{2\\pi}{T}" },
        { name: "True Anomaly", latex: "\\theta = 2 \\arctan\\left(\\sqrt{\\frac{1+e}{1-e}} \\tan\\left(\\frac{E}{2}\\right)\\right)" },
        { name: "Orbital Radius", latex: "r = a (1 - e \\cos(E))" },
        { name: "Vis-Viva Equation", latex: "v = \\sqrt{G M \\left(\\frac{2}{r} - \\frac{1}{a}\\right)}" },
        { name: "Angular Momentum", latex: "h = r \\times v" }
    ];
    const content = document.getElementById('equationsContent');
    content.innerHTML = equations.map(eq => `
        <p><strong>${eq.name}:</strong></p>
        <p>$$ ${eq.latex} $$</p>
    `).join('');
    MathJax.typesetPromise().then(() => {
        document.getElementById('equationsPopup').style.display = 'block';
    }).catch(err => console.error('MathJax typesetting error:', err));
});

// Helper function to flatten bodies and moons into a single array
function getAllCelestialBodies() {
    const allBodies = [];
    bodies.forEach(body => {
        allBodies.push(body);
        if (body.moons && body.moons.length > 0) {
            body.moons.forEach(moon => allBodies.push(moon));
        }
    });
    return allBodies;
}

// Helper function to format values based on unit system
function formatValue(value, type, unitSystem) {
    const AU_TO_KM = 1.496e8;
    const AU_TO_M = 1.496e11;
    const SOLAR_MASS_TO_KG = 1.989e30;

    if (type === 'mass') {
        switch (unitSystem) {
            case 0: // kg, km, s
            case 1: // kg, m, s
                return (value * SOLAR_MASS_TO_KG).toExponential(2) + ' kg';
            case 2: // AU, M☉, yr
                return value.toExponential(2) + ' M☉';
        }
    } else if (type === 'a') {
        switch (unitSystem) {
            case 0: // kg, km, s
                return (value * AU_TO_KM).toExponential(2) + ' km';
            case 1: // kg, m, s
                return (value * AU_TO_M).toExponential(2) + ' m';
            case 2: // AU, M☉, yr
                return value.toFixed(6) + ' AU';
        }
    } else {
        return value.toFixed(type === 'e' ? 4 : 2);
    }
}
/*
function generateSettingsHTML() {
    const settingsContent = document.getElementById('settingsContent');
    settingsContent.innerHTML = `
        <div>
            <label>Pixel Ratio:</label>
            <div class="settings-group" data-setting="pixelRatio">
                <button class="settings-button" data-value="0.5">0.5</button>
                <button class="settings-button" data-value="0.75">0.75</button>
                <button class="settings-button" data-value="1.0">1.0</button>
                <button class="settings-button" data-value="1.25">1.25</button>
                <button class="settings-button" data-value="1.5">1.5</button>
                <button class="settings-button" data-value="2.0">2.0</button>
            </div>
        </div>
        <div>
            <label>Anisotropic Filtering:</label>
            <div class="settings-group" data-setting="anisotropicFiltering">
                <button class="settings-button" data-value="ON">ON</button>
                <button class="settings-button" data-value="OFF">OFF</button>
            </div>
        </div>
        <div>
            <label>Anti Aliasing:</label>
            <div class="settings-group" data-setting="antiAliasing">
                <button class="settings-button" data-value="ON">ON</button>
                <button class="settings-button" data-value="OFF">OFF</button>
            </div>
        </div>
        <div>
            <label>Texture Size:</label>
            <div class="settings-group" data-setting="textureSize">
                <button class="settings-button" data-value="None">None</button>
                <button class="settings-button" data-value="Low">Low</button>
                <button class="settings-button" data-value="Medium">Medium</button>
                <button class="settings-button" data-value="High">High</button>
                <button class="settings-button" data-value="Max">Max</button>
            </div>
        </div>
        <div>
            <label>Asteroid Diversity:</label>
            <div class="settings-group" data-setting="asteroidDiversity">
                <button class="settings-button" data-value="Low">Low (2)</button>
                <button class="settings-button" data-value="Medium">Medium (8)</button>
                <button class="settings-button" data-value="High">High (16)</button>
            </div>
        </div>
        <div>
            <label>Asteroid Quality:</label>
            <div class="settings-group" data-setting="asteroidQuality">
                <button class="settings-button" data-value="Low">Low (32)</button>
                <button class="settings-button" data-value="Medium">Medium (100)</button>
                <button class="settings-button" data-value="High">High (200)</button>
            </div>
        </div>
        <div>
            <label>Enable Advanced Shaders:</label>
            <div class="settings-group" data-setting="areShadersEnabled">
                <button class="settings-button" data-value="ON">ON</button>
                <button class="settings-button" data-value="OFF">OFF</button>
            </div>
        </div>
        <div>
            <label>Use Complex Meshes:</label>
            <div class="settings-group" data-setting="useComplexMeshes">
                <button class="settings-button" data-value="ON">ON</button>
                <button class="settings-button" data-value="OFF">OFF</button>
            </div>
        </div>
    `;

    // Add click handlers for selection
    document.querySelectorAll('.settings-group').forEach(group => {
        group.addEventListener('click', (event) => {
            if (event.target.classList.contains('settings-button')) {
                group.querySelectorAll('.settings-button').forEach(btn => btn.classList.remove('selected'));
                event.target.classList.add('selected');
            }
        });
    });
}*/
function generateShaderOptionRowsHTML() {
    return SHADER_OPTION_KEYS.map(key => `
        <div class="shader-option-row">
            <label>${SHADER_OPTION_LABELS[key]}:</label>
            <div class="settings-group" data-setting="${key}">
                <button class="settings-button" data-value="ON">ON</button>
                <button class="settings-button" data-value="OFF">OFF</button>
            </div>
        </div>
    `).join('');
}

function ensureAdvancedShaderPanel() {
    const popup = document.getElementById('settingsPopup');
    let panel = document.getElementById('advancedShaderPanel');
    if (!panel) {
        panel = document.createElement('div');
        panel.id = 'advancedShaderPanel';
        panel.className = 'advanced-shader-panel';
        panel.setAttribute('aria-hidden', 'true');
        popup.appendChild(panel);
    }
    panel.innerHTML = `
        <h4>Advanced Shader Options</h4>
        ${generateShaderOptionRowsHTML()}
    `;
    return panel;
}

function bindSettingsGroupClicks(root) {
    (root || document).querySelectorAll('.settings-group').forEach(group => {
        // Avoid double-binding if regenerate
        if (group.dataset.bound === '1') return;
        group.dataset.bound = '1';
        group.addEventListener('click', (event) => {
            if (event.target.classList.contains('settings-button')) {
                group.querySelectorAll('.settings-button').forEach(btn => btn.classList.remove('selected'));
                event.target.classList.add('selected');
            }
        });
    });
}

/** Settings that can be applied without a page reload. */
const LIVE_RENDER_SETTING_KEYS = [
    'pixelRatio',
    'anisotropicFiltering',
    'areShadersEnabled',
    ...SHADER_OPTION_KEYS
];

/** Settings that require a full page reload to take effect. */
const RELOAD_RENDER_SETTING_KEYS = [
    'textureSize',
    'antiAliasing',
    'useComplexMeshes',
    'useLogDepthBuffer'
];

function disposeMaterialKeepTextures(material) {
    if (material && material.dispose) material.dispose();
}

function disposeMeshDeep(mesh) {
    if (!mesh) return;
    // Recurse so Groups (e.g. Earth aurora ribbons + spikes) free all GPU resources
    while (mesh.children && mesh.children.length) {
        const child = mesh.children[0];
        mesh.remove(child);
        disposeMeshDeep(child);
    }
    if (mesh.geometry) mesh.geometry.dispose();
    disposeMaterialKeepTextures(mesh.material);
}

function setTextureAnisotropy(texture, enabled, maxAnisotropy) {
    if (!texture || !texture.isTexture) return;
    if (enabled && maxAnisotropy) {
        texture.anisotropy = Math.min(16, maxAnisotropy);
        if (texture.minFilter !== THREE.NearestFilter) {
            texture.minFilter = THREE.LinearMipMapLinearFilter;
            texture.magFilter = THREE.LinearFilter;
        }
    } else {
        texture.anisotropy = 1;
    }
    texture.needsUpdate = true;
}

function applyAnisotropicFilteringLive() {
    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
    const enabled = settings.anisotropicFiltering === 'ON';

    function visitMaterial(mat) {
        if (!mat) return;
        const mats = Array.isArray(mat) ? mat : [mat];
        mats.forEach(m => {
            ['map', 'normalMap', 'specularMap', 'bumpMap', 'emissiveMap', 'alphaMap', 'lightMap', 'aoMap']
                .forEach(key => setTextureAnisotropy(m[key], enabled, maxAnisotropy));
            if (m.uniforms) {
                Object.keys(m.uniforms).forEach(ukey => {
                    setTextureAnisotropy(m.uniforms[ukey] && m.uniforms[ukey].value, enabled, maxAnisotropy);
                });
            }
        });
    }

    scene.traverse(obj => {
        if (obj.material) visitMaterial(obj.material);
    });
    if (typeof backlight_texture !== 'undefined') {
        setTextureAnisotropy(backlight_texture, enabled, maxAnisotropy);
    }
}

function applyBloomLive() {
    if (isShaderOn('shaderBloom')) {
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.05;
        if (THREE.sRGBEncoding !== undefined) {
            renderer.outputEncoding = THREE.sRGBEncoding;
        }
        if (!bloomPipeline) {
            bloomPipeline = createBloomPipeline();
        } else {
            bloomPipeline.resize(window.innerWidth, window.innerHeight, renderer.getPixelRatio());
        }
    } else {
        renderer.toneMapping = THREE.NoToneMapping;
        renderer.toneMappingExposure = 1.0;
        if (bloomPipeline) {
            bloomPipeline.dispose();
            bloomPipeline = null;
        }
    }
}

function createPhongRingMaterial(ringTexture) {
    return new THREE.MeshPhongMaterial({
        map: ringTexture,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.95,
        emissive: 0x111111,
        emissiveIntensity: 0.3,
        alphaTest: 0.05,
        depthTest: true,
        blending: THREE.NormalBlending,
        depthWrite: false
    });
}

function rebuildAdvancedUniforms(obj) {
    const list = [];
    if (!obj.mesh) return;
    obj.mesh.traverse(child => {
        if (!child.isMesh || !child.material || !child.material.uniforms) return;
        const u = child.material.uniforms;
        if (u.sunDirection || u.ringMap || u.dayMap || u.softTerminator || u.intensity) {
            list.push(u);
        }
    });
    obj.advancedUniforms = list;
}

function syncSunCoronaLive(obj) {
    if (!obj.data || obj.data.type !== 'star') return;
    const group = obj.mesh;
    const glow = group.getObjectByName('sunGlow');
    const coronaOn = isShaderOn('shaderSunCorona');

    if (glow) {
        // Keep tight 1.03× shell; corona only adjusts glow color
        glow.scale.setScalar(1.0);
        if (glow.material && glow.material.uniforms && glow.material.uniforms.u_color) {
            glow.material.uniforms.u_color.value.set(coronaOn ? 0xffb040 : 0xffa500);
        }
    }

    let fresnel = group.getObjectByName('sunFresnel');
    if (coronaOn && !fresnel) {
        group.add(getStarFresnelMesh(obj.data));
    } else if (!coronaOn && fresnel) {
        group.remove(fresnel);
        disposeMeshDeep(fresnel);
    }
}

function syncSunFlaresLive(obj) {
    if (!obj.data || obj.data.type !== 'star') return;
    const sunMesh = obj.mesh.getObjectByName(obj.data.name) || obj.mesh.children[0];
    if (!sunMesh || !sunMesh.isMesh) return;

    let flares = sunMesh.getObjectByName('sunFlares');
    if (isShaderOn('shaderSunFlares')) {
        if (!flares) {
            const flareMesh = createSunFlareMesh(obj.data);
            flareMesh.visible = atmosphereEffectsVisible;
            sunMesh.add(flareMesh);
            // rebuildAdvancedUniforms() (caller) will pick up time/intensity
        } else {
            flares.visible = atmosphereEffectsVisible;
        }
    } else if (flares) {
        sunMesh.remove(flares);
        disposeMeshDeep(flares);
    }
}

function syncAuroraLive(obj) {
    if (!obj.data || (obj.data.name !== 'Earth' && obj.data.name !== 'Jupiter')) return;
    const planetMesh = obj.mesh.getObjectByName(obj.data.name) || obj.mesh.children[0];
    if (!planetMesh || !planetMesh.isMesh) return;

    let aurora = planetMesh.getObjectByName('aurora');
    if (isShaderOn('shaderAurora')) {
        if (!aurora) {
            const auroraMesh = createAuroraMesh(obj.data);
            auroraMesh.visible = atmosphereEffectsVisible;
            planetMesh.add(auroraMesh);
            // rebuildAdvancedUniforms() (caller) will pick up time/sun/planetRadius
        } else {
            aurora.visible = atmosphereEffectsVisible;
        }
    } else if (aurora) {
        planetMesh.remove(aurora);
        disposeMeshDeep(aurora);
    }
}

function syncRingMaterialLive(obj) {
    if (!obj.textures || !obj.textures.ringTexture) return;
    const ringMesh = obj.mesh.getObjectByName('ring');
    if (!ringMesh || !ringMesh.isMesh) return;

    const ringTexture = obj.textures.ringTexture;
    const oldMat = ringMesh.material;
    let ringMaterial;
    if (isShaderOn('shaderRingLighting')) {
        const planetRadiusScaled = obj.data.radius * nHardCodeScaleFactor;
        ringMaterial = createRingShaderMaterial(ringTexture, planetRadiusScaled);
    } else {
        ringMaterial = createPhongRingMaterial(ringTexture);
    }
    ringMesh.material = ringMaterial;
    disposeMaterialKeepTextures(oldMat);
}

function syncSurfaceMaterialLive(obj) {
    if (!obj.textures) return; // complex-mesh bodies have no tier textures
    const planetMesh = obj.mesh.getObjectByName(obj.data.name) || obj.mesh.children[0];
    if (!planetMesh || !planetMesh.isMesh) return;

    const t = obj.textures;
    const oldMat = planetMesh.material;
    let newMat;

    if (obj.data.type === 'star') {
        if (oldMat && oldMat.uniforms && oldMat.uniforms.shader_enable) {
            oldMat.uniforms.shader_enable.value = isShaderOn('shaderSunTurbulence');
            return;
        }
        newMat = getSunMaterial(t.surfaceTexture, obj.data);
    } else {
        newMat = createMaterialFromTextures(
            obj.data,
            t.surfaceTexture,
            t.normalMap,
            t.specularMap,
            t.cloudTexture,
            t.nightMap
        );
    }

    planetMesh.material = newMat;
    disposeMaterialKeepTextures(oldMat);
}

function syncCelestialObjectShadersLive(obj) {
    if (!obj || !obj.mesh || !obj.data) return;
    // Complex meshes keep GLB materials; only corona-free / bloom-level effects apply globally
    if (obj.textures) {
        syncSurfaceMaterialLive(obj);
        syncRingMaterialLive(obj);
        syncAuroraLive(obj);
        syncSunCoronaLive(obj);
        syncSunFlaresLive(obj);
        rebuildAdvancedUniforms(obj);
    } else if (obj.data.type === 'star') {
        syncSunCoronaLive(obj);
        syncSunFlaresLive(obj);
        rebuildAdvancedUniforms(obj);
    }
}

function applyLiveRenderSettings() {
    renderer.setPixelRatio(window.devicePixelRatio * settings.pixelRatio);
    applyAnisotropicFilteringLive();
    applyBloomLive();
    applySunGlareLive();

    if (typeof celestialObjects !== 'undefined' && celestialObjects.length) {
        celestialObjects.forEach(syncCelestialObjectShadersLive);
    }

    const pr = renderer.getPixelRatio();
    if (bloomPipeline) {
        bloomPipeline.resize(window.innerWidth, window.innerHeight, pr);
    }
    if (flareDepthPipeline) {
        flareDepthPipeline.resize(window.innerWidth, window.innerHeight, pr);
    }
    if (sunGlarePipeline) {
        sunGlarePipeline.resize(window.innerWidth, window.innerHeight, pr);
    }
}

function generateSettingsHTML() {
    const settingsContent = document.getElementById('settingsContent');
    settingsContent.innerHTML = `
        <p class="settings-section-heading">Immediate (no reload)</p>
        <div>
            <label>Pixel Ratio:</label>
            <div class="settings-group" data-setting="pixelRatio">
                <button class="settings-button" data-value="0.5">0.5</button>
                <button class="settings-button" data-value="0.75">0.75</button>
                <button class="settings-button" data-value="1.0">1.0</button>
                <button class="settings-button" data-value="1.25">1.25</button>
                <button class="settings-button" data-value="1.5">1.5</button>
                <button class="settings-button" data-value="2.0">2.0</button>
            </div>
        </div>
        <div>
            <label>Anisotropic Filtering:</label>
            <div class="settings-group" data-setting="anisotropicFiltering">
                <button class="settings-button" data-value="ON">ON</button>
                <button class="settings-button" data-value="OFF">OFF</button>
            </div>
        </div>
        <div>
            <label>Enable Advanced Shaders:</label>
            <div class="settings-group-row">
                <div class="settings-group" data-setting="areShadersEnabled">
                    <button class="settings-button" data-value="ON">ON</button>
                    <button class="settings-button" data-value="OFF">OFF</button>
                </div>
                <button type="button" id="toggleShaderPanel" class="shader-panel-arrow" title="Advanced shader options">▶</button>
            </div>
        </div>

        <hr class="settings-section-divider" />
        <p class="settings-section-heading">Requires page reload</p>

        <div>
            <label>Texture Size:</label>
            <div class="settings-group" data-setting="textureSize">
                <button class="settings-button" data-value="None">None</button>
                <button class="settings-button" data-value="Low">Low</button>
                <button class="settings-button" data-value="Medium">Medium</button>
                <button class="settings-button" data-value="High">High</button>
                <button class="settings-button" data-value="Max">Max</button>
            </div>
        </div>
        <div>
            <label>Anti Aliasing:</label>
            <div class="settings-group" data-setting="antiAliasing">
                <button class="settings-button" data-value="ON">ON</button>
                <button class="settings-button" data-value="OFF">OFF</button>
            </div>
        </div>
        <div>
            <label>Use Complex Meshes:</label>
            <div class="settings-group" data-setting="useComplexMeshes">
                <button class="settings-button" data-value="ON">ON</button>
                <button class="settings-button" data-value="OFF">OFF</button>
            </div>
        </div>
        <div>
            <label>Use Logarithmic Depth Buffer: </label>
            <div class="settings-group" data-setting="useLogDepthBuffer">
                <button class="settings-button" data-value="ON">ON</button>
                <button class="settings-button" data-value="OFF">OFF</button>
            </div>
            <label class="settings-hint">[recommended, requires WebGL 2.0]</label>
        </div>
    `;

    const panel = ensureAdvancedShaderPanel();
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');

    bindSettingsGroupClicks(document.getElementById('settingsPopup'));

    const arrow = document.getElementById('toggleShaderPanel');
    if (arrow) {
        arrow.classList.remove('open');
        arrow.textContent = '▶';
        arrow.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            const isOpen = panel.classList.toggle('open');
            panel.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
            arrow.classList.toggle('open', isOpen);
            arrow.textContent = isOpen ? '◀' : '▶';
        };
    }
}

function selectSettingButton(settingKey, value) {
    const btn = document.querySelector(`.settings-group[data-setting="${settingKey}"] .settings-button[data-value="${value}"]`);
    if (btn) btn.classList.add('selected');
}

function loadSettings() {
    const pixelRatio = getCookie('pixelRatio') || defaultSettings.pixelRatio;
    const anisotropicFiltering = getCookie('anisotropicFiltering') || defaultSettings.anisotropicFiltering;
    const antiAliasing = getCookie('antiAliasing') || defaultSettings.antiAliasing;
    const textureSize = getCookie('textureSize') || defaultSettings.textureSize;
    const areShadersEnabled = getCookie('areShadersEnabled') || defaultSettings.areShadersEnabled;
    const useComplexMeshes = getCookie('useComplexMeshes') || defaultSettings.useComplexMeshes;
    const useLogDepthBuffer = getCookie('useLogDepthBuffer') || defaultSettings.useLogDepthBuffer;

    selectSettingButton('pixelRatio', pixelRatio);
    selectSettingButton('anisotropicFiltering', anisotropicFiltering);
    selectSettingButton('antiAliasing', antiAliasing);
    selectSettingButton('textureSize', textureSize);
    selectSettingButton('areShadersEnabled', areShadersEnabled);
    selectSettingButton('useComplexMeshes', useComplexMeshes);
    selectSettingButton('useLogDepthBuffer', useLogDepthBuffer);

    SHADER_OPTION_KEYS.forEach(key => {
        const value = getCookie(key) || defaultSettings[key];
        selectSettingButton(key, value);
    });
}

function getSelectedSetting(settingKey) {
    const el = document.querySelector(`.settings-group[data-setting="${settingKey}"] .settings-button.selected`);
    return el ? el.getAttribute('data-value') : null;
}

/** Make the Render Settings popup draggable; advanced shader panel is a child and stays attached. */
function setupSettingsPopupDragging() {
    const popup = document.getElementById('settingsPopup');
    if (!popup || popup.dataset.dragBound === '1') return;
    popup.dataset.dragBound = '1';

    const handle = popup.querySelector('.settings-drag-handle') || popup.querySelector('h3');
    if (!handle) return;

    let dragging = false;
    let startX = 0;
    let startY = 0;
    let originLeft = 0;
    let originTop = 0;

    function pinPopupToPixels() {
        const rect = popup.getBoundingClientRect();
        popup.style.transform = 'none';
        popup.style.left = `${rect.left}px`;
        popup.style.top = `${rect.top}px`;
        return rect;
    }

    handle.addEventListener('pointerdown', (e) => {
        if (e.button !== 0) return;
        const rect = pinPopupToPixels();
        dragging = true;
        popup.classList.add('dragging');
        startX = e.clientX;
        startY = e.clientY;
        originLeft = rect.left;
        originTop = rect.top;
        try {
            handle.setPointerCapture(e.pointerId);
        } catch (_) { /* ignore */ }
        e.preventDefault();
    });

    handle.addEventListener('pointermove', (e) => {
        if (!dragging) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        // Keep a bit of the popup on-screen
        const minVisible = 40;
        const maxLeft = window.innerWidth - minVisible;
        const maxTop = window.innerHeight - minVisible;
        const nextLeft = Math.min(maxLeft, Math.max(0, originLeft + dx));
        const nextTop = Math.min(maxTop, Math.max(0, originTop + dy));
        popup.style.left = `${nextLeft}px`;
        popup.style.top = `${nextTop}px`;
    });

    function endDrag(e) {
        if (!dragging) return;
        dragging = false;
        popup.classList.remove('dragging');
        if (e && e.pointerId != null) {
            try {
                handle.releasePointerCapture(e.pointerId);
            } catch (_) { /* ignore */ }
        }
    }

    handle.addEventListener('pointerup', endDrag);
    handle.addEventListener('pointercancel', endDrag);
}

setupSettingsPopupDragging();

document.getElementById('openSettings').addEventListener('click', () => {
    generateSettingsHTML();
    loadSettings();
    document.getElementById('settingsPopup').style.display = 'block';
});

document.getElementById('applySettings').addEventListener('click', () => {
    const selected = {
        pixelRatio: getSelectedSetting('pixelRatio'),
        anisotropicFiltering: getSelectedSetting('anisotropicFiltering'),
        antiAliasing: getSelectedSetting('antiAliasing'),
        textureSize: getSelectedSetting('textureSize'),
        areShadersEnabled: getSelectedSetting('areShadersEnabled'),
        useComplexMeshes: getSelectedSetting('useComplexMeshes'),
        useLogDepthBuffer: getSelectedSetting('useLogDepthBuffer')
    };

    SHADER_OPTION_KEYS.forEach(key => {
        selected[key] = getSelectedSetting(key) || defaultSettings[key];
    });

    const needsReload =
        selected.textureSize !== settings.textureSize ||
        selected.antiAliasing !== settings.antiAliasing ||
        selected.useComplexMeshes !== settings.useComplexMeshes ||
        selected.useLogDepthBuffer !== settings.useLogDepthBuffer;

    // Persist all render settings (live + reload)
    setCookie('pixelRatio', selected.pixelRatio, 30);
    setCookie('anisotropicFiltering', selected.anisotropicFiltering, 30);
    setCookie('antiAliasing', selected.antiAliasing, 30);
    setCookie('textureSize', selected.textureSize, 30);
    setCookie('areShadersEnabled', selected.areShadersEnabled, 30);
    setCookie('useComplexMeshes', selected.useComplexMeshes, 30);
    setCookie('useLogDepthBuffer', selected.useLogDepthBuffer, 30);
    SHADER_OPTION_KEYS.forEach(key => setCookie(key, selected[key], 30));

    if (needsReload) {
        location.reload();
        return;
    }

    // Live-apply path: update in-memory settings and scene immediately; keep popup open
    settings.pixelRatio = parseFloat(selected.pixelRatio) || defaultSettings.pixelRatio;
    settings.anisotropicFiltering = selected.anisotropicFiltering || defaultSettings.anisotropicFiltering;
    settings.areShadersEnabled = selected.areShadersEnabled || defaultSettings.areShadersEnabled;
    SHADER_OPTION_KEYS.forEach(key => {
        settings[key] = selected[key] || defaultSettings[key];
    });

    applyLiveRenderSettings();
});

function closeSettingsPopup() {
    const panel = document.getElementById('advancedShaderPanel');
    if (panel) {
        panel.classList.remove('open');
        panel.setAttribute('aria-hidden', 'true');
    }
    document.getElementById('settingsPopup').style.display = 'none';
}

document.getElementById('doneSettings').addEventListener('click', () => {
    closeSettingsPopup();
});

// Physics Submenu Event Listeners
document.getElementById('showConstants').addEventListener('click', () => {
    const tableBody = document.getElementById('constantsTable').querySelector('tbody');
    tableBody.innerHTML = '';
    const allBodies = getAllCelestialBodies();
    
    allBodies.forEach(body => {
        const row = document.createElement('tr');
        const hasOrbit = body.orbitalElements && body.name !== "Sun";
        // Prepend '▶' if the body is a moon
        const displayName = body.type === "moon" ? `\u25B6 ${body.name}` : body.name;
        row.innerHTML = `
            <td title="Name of the celestial body (planet, moon, or star)">${displayName}</td>
            <td title="Type of celestial body (e.g., Terrestrial, Gas Giant, moon, star)">${body.type}</td>
            <td title="Mass of the body in kilograms (kg) or solar masses (M☉)">${formatValue(body.mass, 'mass', unitSystem)}</td>
            <td title="Semi-major axis of the orbit in kilometers (km), meters (m), or astronomical units (AU)">${hasOrbit ? formatValue(body.orbitalElements.a, 'a', unitSystem) : 'N/A'}</td>
            <td title="Eccentricity of the orbit (unitless, 0 = circular, >0 = elliptical)">${hasOrbit ? formatValue(body.orbitalElements.e, 'e', unitSystem) : 'N/A'}</td>
            <td title="Inclination of the orbit relative to the reference plane in degrees (°)">${hasOrbit ? formatValue(body.orbitalElements.i, 'i', unitSystem) : 'N/A'}</td>
            <td title="Longitude of the ascending node in degrees (°)">${hasOrbit ? formatValue(body.orbitalElements.Omega, 'Omega', unitSystem) : 'N/A'}</td>
            <td title="Argument of periapsis in degrees (°)">${hasOrbit ? formatValue(body.orbitalElements.omega, 'omega', unitSystem) : 'N/A'}</td>
            <td title="Mean anomaly at epoch (January 1, 2000) in degrees (°)">${hasOrbit ? formatValue(body.orbitalElements.M0, 'M0', unitSystem) : 'N/A'}</td>
        `;
        tableBody.appendChild(row);
    });
    document.getElementById('constantsPopup').style.display = 'block';
});

document.getElementById('toggleConstantsUnits').addEventListener('click', () => {
    unitSystem = (unitSystem + 1) % 3;
    document.getElementById('showConstants').click();
});

document.getElementById('toggleFPSCounter').addEventListener('click', () => {
    fpsVisible = !fpsVisible;
    fpsCounter.style.display = fpsVisible ? 'block' : 'none';
    document.getElementById('toggleFPSCounter').textContent = fpsVisible ? 'Hide FPS' : 'Show FPS';
    setCookie('fpsVisible', fpsVisible, 30);
    if (fpsVisible) {
        fpsCounter.textContent = `FPS: ${fps.toFixed(1)}`;
    }
});

document.getElementById('toggleAsteroidBelts').addEventListener('click', function() {
    asteroidBeltsVisible = !asteroidBeltsVisible;
    if (asteroidPoints) asteroidPoints.visible = asteroidBeltsVisible;
    if (kboPoints) kboPoints.visible = asteroidBeltsVisible;
    this.textContent = asteroidBeltsVisible ? 'Hide Asteroid Sprites' : 'Show Asteroid Sprites';
    setCookie('asteroidBeltsVisible', asteroidBeltsVisible, 30);
  });

// Hamburger Menu and Submenu Control
const menuToggle = document.getElementById('menuToggle');
const menu = document.getElementById('menu');
const submenus = document.querySelectorAll('.submenu');
const submenuContainers = document.querySelectorAll('.submenu-container');

// Function to hide all menus
function hideAllMenus() {
    menu.classList.remove('active');
    submenus.forEach(submenu => submenu.classList.remove('active'));
}

// Show main menu on mouse enter
menuToggle.addEventListener('mouseenter', () => {
    menu.classList.add('active');
});

// Hide all menus when mouse leaves the menu toggle, unless moving to the menu
menuToggle.addEventListener('mouseleave', (event) => {
    const relatedTarget = event.relatedTarget || event.toElement;
    if (!menu.contains(relatedTarget)) {
        hideAllMenus();
    }
});

// Keep menu open when mouse enters the menu, and handle submenu visibility
menu.addEventListener('mouseenter', () => {
    menu.classList.add('active');
});

// Hide all menus when mouse leaves the menu, unless moving back to the toggle
menu.addEventListener('mouseleave', (event) => {
    const relatedTarget = event.relatedTarget || event.toElement;
    if (!menuToggle.contains(relatedTarget)) {
        hideAllMenus();
    }
});

// Remove existing submenu toggle click events to avoid conflicts
/*document.getElementById('videoSubmenuToggle').removeEventListener('click', toggleVideoSubmenu);
document.getElementById('simulationSubmenuToggle').removeEventListener('click', toggleSimulationSubmenu);*/

// We won't add click listeners for submenus since we're using hover from CSS
// Ensure submenu hover behavior is handled by CSS (already present)

document.querySelectorAll('#focusBox .toggle-button').forEach(button => {
    button.addEventListener('click', (event) => {
        const section = event.target.closest('.section');
        const container = section.querySelector('.collapsible');
        if (container.classList.contains('collapsed')) {
            container.classList.remove('collapsed');
            container.classList.add('expand-bounce');
            event.target.textContent = '▲';
            container.addEventListener('animationend', () => {
                container.classList.remove('expand-bounce');
            }, { once: true });
        } else {
            container.classList.add('collapsed');
            event.target.textContent = '▼';
        }
    });
});

// Help Submenu Event Listeners
document.getElementById('showSimulationControls').addEventListener('click', () => {
    document.getElementById('simulationControlsPopup').style.display = 'block';
});

document.getElementById('showOrbitalControls').addEventListener('click', () => {
    document.getElementById('orbitalControlsPopup').style.display = 'block';
});

document.getElementById('showFlightControls').addEventListener('click', () => {
    document.getElementById('flightControlsPopup').style.display = 'block';
});

const tooltips = {
    'infoOrbit': 'Orbital Constants & Dynamics',
    'infoRotate': 'Rotational Constants',
    'infoCelestialBody': 'Scientific Information',
    'infoAtmosphere': 'Atmospheric Information',
    'infoDescription': 'Celestial Body Description',
    'infoPhoto': 'Photographs',
    'toggleVectors': 'Toggle Vectors & Axis Line',
    'toggleUnits': 'Toggle Units (km, m, AU)',
    'clearPlanet': 'Exit',
    'toggleOrbitalPlane': 'Toggle Orbital Plane',
    'toggleEquatorialPlane': 'Toggle Equatorial Plane'
};

// Add event listener for toggleOrbitalPlane (near other button-focus listeners)
document.getElementById('toggleOrbitalPlane').addEventListener('click', () => {
    orbitalPlaneMesh.visible = !orbitalPlaneMesh.visible;
    xAxisLine.visible = orbitalPlaneMesh.visible;
    yAxisLine.visible = orbitalPlaneMesh.visible;
    zAxisLine.visible = orbitalPlaneMesh.visible;
    xAxisLabel.visible = orbitalPlaneMesh.visible;
    yAxisLabel.visible = orbitalPlaneMesh.visible;
    zAxisLabel.visible = orbitalPlaneMesh.visible;
});

document.getElementById('toggleOrbitalPlane').addEventListener('mouseenter', () => {
    document.getElementById('buttonToolTip').textContent = tooltips['toggleOrbitalPlane'];
});

document.getElementById('toggleOrbitalPlane').addEventListener('mouseleave', () => {
    document.getElementById('buttonToolTip').innerHTML = `<em>Button ToolTip Info</em>`;
});

document.getElementById('toggleEquatorialPlane').addEventListener('mouseenter', () => {
    document.getElementById('buttonToolTip').textContent = tooltips['toggleEquatorialPlane'];
});

document.getElementById('toggleEquatorialPlane').addEventListener('mouseleave', () => {
    document.getElementById('buttonToolTip').innerHTML = `<em>Button ToolTip Info</em>`;
});

document.getElementById('toggleEquatorialPlane').addEventListener('click', () => {
    equatorialPlaneMesh.visible = !equatorialPlaneMesh.visible;
    if (focusedPlanet && equatorialPlaneMesh.visible) {
        updatePlanes(focusedPlanet); // Ensure plane is correctly positioned and oriented
    }
});


// Add event listeners to all button-focus buttons
document.querySelectorAll('.button-focus').forEach(button => {
    button.addEventListener('mouseenter', () => {
        const tooltipText = tooltips[button.id] || 'No tooltip available';
        document.getElementById('buttonToolTip').textContent = tooltipText;
    });

    button.addEventListener('mouseleave', () => {
        document.getElementById('buttonToolTip').innerHTML = `<em>Button ToolTip Info</em>`;
    });
});

// Helper function to show/hide sections
function showSections(sectionsToShow) {
    const allSections = ['planetInfo', 'orbitalConstants', 'orbitalDynamics', 'rotationalConstants', 'description', 'photos','scientificInfo','atmosphereInfo','unitInfo'];
    allSections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (sectionsToShow.includes(sectionId)) {
            section.style.display = 'block';
            const collapsible = section.querySelector('.collapsible');
            if (collapsible.classList.contains('collapsed')) {
                collapsible.classList.remove('collapsed');
                section.querySelector('.toggle-button').textContent = '▲';
            }
        } else {
            section.style.display = 'none';
        }
    });
}
//By Default show the sections for Orbital Mechanics
showSections(['planetInfo', 'orbitalConstants', 'orbitalDynamics','unitInfo']);

// Descriptions for planets (placeholder, expand as needed)


// Button actions
document.getElementById('infoOrbit').addEventListener('click', () => {
    showSections(['planetInfo', 'orbitalConstants', 'orbitalDynamics','unitInfo']);
});

document.getElementById('infoRotate').addEventListener('click', () => {
    showSections(['planetInfo', 'rotationalConstants','unitInfo']);
});

document.getElementById('infoCelestialBody').addEventListener('click', () => {
    showSections(['planetInfo','scientificInfo','unitInfo']);
    // Placeholder for future planetary info
    console.log('Additional celestial body info to be implemented');
});

document.getElementById('infoAtmosphere').addEventListener('click', () => {
    showSections(['planetInfo','atmosphereInfo','unitInfo']);
});

document.getElementById('infoDescription').addEventListener('click', () => {
    showSections(['description']);
    const descriptionText = document.getElementById('descriptionContent');
    if (focusedPlanet) {
        descriptionText.innerHTML = planetDescriptions[focusedPlanet.data.name] || 'No description available.';
    } else {
        descriptionText.innerHTML = 'Select a planet to see its description.';
    }
});

// Update the infoNews button event listener
/*document.getElementById('infoPhoto').addEventListener('click',  () => {
    showSections(['photos']);
    const photoContent = document.getElementById('photoContent');
    
});*/

let vectorsVisible = true; // Track vector visibility state

document.getElementById('toggleVectors').addEventListener('click', () => {
    vectorsVisible = !vectorsVisible;
    radiusLine.visible = vectorsVisible && focusedPlanet && focusedPlanet.data.name !== 'Sun';
    velocityLine.visible = vectorsVisible && focusedPlanet && focusedPlanet.data.name !== 'Sun';
    angularMomentumLine.visible = vectorsVisible && focusedPlanet && focusedPlanet.data.name !== 'Sun';
    velocityCone.visible = vectorsVisible && focusedPlanet && focusedPlanet.data.name !== 'Sun';
    angularMomentumCone.visible = vectorsVisible && focusedPlanet && focusedPlanet.data.name !== 'Sun';
    radiusLabel.visible = vectorsVisible && focusedPlanet && focusedPlanet.data.name !== 'Sun';
    velocityLabel.visible = vectorsVisible && focusedPlanet && focusedPlanet.data.name !== 'Sun';
    angularMomentumLabel.visible = vectorsVisible && focusedPlanet && focusedPlanet.data.name !== 'Sun';
    axisMesh.visible = vectorsVisible && focusedPlanet && focusedPlanet.data.name !== 'Sun';
});

// Existing clearPlanet action (for completeness)
/*
document.getElementById('clearPlanet').addEventListener('click', () => {
    focusedPlanet = null;
    focusedCenterOfGravity = null;
    trackingPlanet = false;
    focusCube.visible = false;
    document.getElementById('focusBox').style.display = 'none';
    radiusLine.visible = false;
    velocityLine.visible = false;
    angularMomentumLine.visible = false;
    velocityCone.visible = false;
    angularMomentumCone.visible = false;
    radiusLabel.visible = false;
    velocityLabel.visible = false;
    angularMomentumLabel.visible = false;
    axisMesh.visible = false;
});*/

// Ensure toggleUnits updates visibility correctly
document.getElementById('toggleUnits').addEventListener('click', () => {
    unitSystem = (unitSystem + 1) % 3; // Cycle through 0, 1, 2
    if (focusedPlanet) {
        animateFocusPlanet(focusedPlanet, focusedCenterOfGravity); // Update vectors and labels
        // Re-show the currently active sections with updated units
        const visibleSections = Array.from(document.querySelectorAll('#focusBox .section')).filter(section => section.style.display === 'block').map(section => section.id);
        showSections(visibleSections);
    }
});

// Simulated Grok news fetching function
async function fetchXPosts(celestialBodyName) {
    const response = await fetch(`https://api.twitter.com/2/tweets/search/recent?query=${celestialBodyName}+news`, {
        headers: {
            'Authorization': 'Bearer YOUR_X_API_TOKEN'
        }
    });
    const data = await response.json();
    return data.data.map(tweet => tweet.text).join('\n');
}

async function fetchGrokNews(celestialBodyName) {
    /*const response = await fetch('https://api.xai.com/grok/v1/query', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer YOUR_API_KEY',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: `Latest news about ${celestialBodyName}`,
            date: '2025-03-29'
        })
    });*/
    //const data = await response.json();

    const response = "still working on it";    
    const data = {response: response}
    return data.response || 'No news available.';
}

// Add these event listeners near the other menu-related event listeners (e.g., after the Help submenu listeners)

// Acknowledgements Button
document.getElementById('acknowledgementsButton').addEventListener('click', () => {
    document.getElementById('acknowledgementsPopup').style.display = 'block';
    hideAllMenus(); // Close the hamburger menu after clicking
});

// Close Acknowledgements Popup
document.getElementById('closeAcknowledgements').addEventListener('click', () => {
    document.getElementById('acknowledgementsPopup').style.display = 'none';
});

// About Button
document.getElementById('aboutButton').addEventListener('click', () => {
    document.getElementById('aboutPopup').style.display = 'block';
    hideAllMenus(); // Close the hamburger menu after clicking
});

// Close About Popup
document.getElementById('closeAbout').addEventListener('click', () => {
    document.getElementById('aboutPopup').style.display = 'none';
});

// Add this near the top of solar_system.js (after scene setup)
const IMAGE_PATH = './images/';

// Simulated API function to fetch image list (replace with actual server call)
async function fetchImageList() {
    // In a real setup, this would be a fetch to your server, e.g., fetch('/images')
    // For simulation, we'll use a static list; replace this with your actual API call
    
    return simulatedImages;

    // Example with actual fetch (uncomment and adjust for your server):
    /*
    try {
        const response = await fetch('/images');
        if (!response.ok) throw new Error('Failed to fetch image list');
        const data = await response.json();
        return data.images; // Assuming server returns { images: ['file1.jpg', 'file2.png', ...] }
    } catch (error) {
        console.error('Error fetching images:', error);
        return [];
    }*/
    
}

// Function to create and show full-size image popup
function showFullImage(src, planetName) {
    const popup = document.createElement('div');
    popup.id = 'fullImagePopup';
    popup.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 100;
    `;

    // Create a wrapper div to hold the image and credit
    const imageWrapper = document.createElement('div');
    imageWrapper.style.position = 'relative'; // Relative positioning for the wrapper

    const img = document.createElement('img');
    img.src = src;
    img.style.cssText = `
        width: 100%;
        height: 100%;
        object-fit: contain; /* Ensures image scales down to fit while preserving aspect ratio */
        border: 2px solid white;
        border-radius: 5px;
        vertical-align: middle;
    `;

    // Extract the LHS of the filename (before the last underscore or extension)
    const filename = src.split('/').pop(); // Get the filename from the path
    const baseName = filename.split('.').slice(0, -1).join('.'); // Remove extension
    

    // Get the credit from imageCredits
    const credit = imageCredits[baseName.toLowerCase()] || 'Credit: Unknown';

    // Create a div for the credit overlay
    const creditDiv = document.createElement('div');
    creditDiv.style.cssText = `
        position: absolute;
        top: 10px;
        left: 10px;
        color: white;
        background: rgba(0, 0, 0, 0.7);
        padding: 5px 10px;
        border-radius: 3px;
        font-family: 'Roboto', sans-serif;
        font-size: 0.9rem;
        pointer-events: none; /* Prevents the credit from intercepting clicks */
    `;
    creditDiv.textContent = `Photograph of ${planetName}. Credit ${credit}`;

    // Append the image and credit to the wrapper
    imageWrapper.appendChild(img);
    imageWrapper.appendChild(creditDiv);

    // Append the wrapper to the popup
    popup.appendChild(imageWrapper);

    // Close on click
    popup.addEventListener('click', () => {
        document.body.removeChild(popup);
    });

    document.body.appendChild(popup);
    // Ensure the image loads and adjusts size properly
    img.onload = () => {
        const naturalWidth = img.naturalWidth;
        const naturalHeight = img.naturalHeight;
        const viewportWidth = window.innerWidth * 0.9; // 90% of viewport width
        const viewportHeight = window.innerHeight * 0.9; // 90% of viewport height

        // Calculate scaling factor to fit within viewport
        const widthRatio = viewportWidth / naturalWidth;
        const heightRatio = viewportHeight / naturalHeight;
        const scale = Math.min(widthRatio, heightRatio, 1); // Don't scale up, only down

        // Apply scaled dimensions
        img.style.width = `${naturalWidth * scale}px`;
        img.style.height = `${naturalHeight * scale}px`;
    };
}

async function displayPhotoContent()
{
    const photoContent = document.getElementById('photoContentDynamic');

    if (!focusedPlanet) {
        photoContent.innerHTML = '<p>Please select a planet to view photos.</p>';
        return;
    }

    photoContent.innerHTML = '<p>Loading photos...</p>';

    const planetName = focusedPlanet.data.name.toLowerCase();
    const imageList = await fetchImageList();

    // Filter images that contain the planet's name (case-insensitive)
    const planetImages = imageList.filter(filename => 
        filename.toLowerCase().includes(planetName)
    );

    if (planetImages.length === 0) {
        photoContent.innerHTML = '<p>No photos available for this celestial body.</p>';
        return;
    }

    // Clear existing content and create thumbnail grid
    photoContent.innerHTML = '';
    const thumbnailContainer = document.createElement('div');
    thumbnailContainer.style.cssText = `
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        gap: 10px;
        max-height: 500px;
        overflow-y: auto;
        padding: 10px;
    `;

    planetImages.forEach(image => {
        const img = document.createElement('img');
        img.src = `${IMAGE_PATH}${image}`;
        img.alt = `${focusedPlanet.data.name} Photo`;
        img.style.cssText = `
            width: 100px;
            height: 100px;
            object-fit: cover;
            border: 1px solid white;
            border-radius: 3px;
            cursor: pointer;
        `;
        img.addEventListener('click', () => {
            showFullImage(`${IMAGE_PATH}${image}`,focusedPlanet.data.name);
        });
        thumbnailContainer.appendChild(img);
    });

    photoContent.appendChild(thumbnailContainer);
}
// Update the infoPhoto event listener
document.getElementById('infoPhoto').addEventListener('click', async () => {
    showSections(['photos']);
    displayPhotoContent();
});

// Function to handle window resize
function onWindowResize() {
    // Update camera aspect ratio
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    // Update renderer size
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Optional: Ensure pixel ratio remains consistent
    renderer.setPixelRatio(window.devicePixelRatio * settings.pixelRatio);

    if (bloomPipeline) {
        bloomPipeline.resize(window.innerWidth, window.innerHeight, renderer.getPixelRatio());
    }
    if (flareDepthPipeline) {
        flareDepthPipeline.resize(window.innerWidth, window.innerHeight, renderer.getPixelRatio());
    }
    if (sunGlarePipeline) {
        sunGlarePipeline.resize(window.innerWidth, window.innerHeight, renderer.getPixelRatio());
    }
}

// Attach resize event listener
window.addEventListener('resize', onWindowResize);

// Call it once to ensure initial sizing is correct
onWindowResize();

// Get all celestial bodies (planets, moons, etc.) from the bodies array
function getAllCelestialNames() {
    const names = [];
    bodies.forEach(body => {
        names.push(body.name);
        body.moons.forEach(moon => names.push(moon.name));
    });
    return names.sort(); // Sort alphabetically for better user experience
}

const celestialNames = getAllCelestialNames();
const planetSearch = document.getElementById('planetSearch');
const searchDropdown = document.getElementById('searchDropdown');
const planetSearchContainer = document.getElementById('planetSearchContainer');

// Function to populate the dropdown based on input
function updateDropdown(searchValue) {
    searchDropdown.innerHTML = '';
    const filteredNames = celestialNames.filter(name => 
        name.toLowerCase().includes(searchValue.toLowerCase())
    );

    if (filteredNames.length > 0 && searchValue !== '') {
        filteredNames.forEach(name => {
            const option = document.createElement('div');
            option.textContent = name;
            option.addEventListener('click', () => {
                focusOnCelestialBody(name);
                planetSearch.value = name;
                searchDropdown.style.display = 'none';
                planetSearch.value = '';
            });
            searchDropdown.appendChild(option);
        });
        searchDropdown.style.display = 'block';
    } else {
        searchDropdown.style.display = 'none';
    }
}

// Function to focus on a celestial body by name
function focusOnCelestialBody(name) {
    const celestialObj = celestialObjects.find(obj => obj.data.name === name);
    if (celestialObj) {
        focusedPlanet = celestialObj;
        focusOnPlanet(focusedPlanet);
        updateFocusBox(focusedPlanet); // Ensure focus box updates immediately
    }
}

// Event listener for search input
planetSearch.addEventListener('input', (e) => {
    updateDropdown(e.target.value);
    
});

// Event listener for Enter key
planetSearch.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && planetSearch.value) {
        const exactMatch = celestialNames.find(name => 
            name.toLowerCase() === planetSearch.value.toLowerCase()
        );
        if (exactMatch) {
            focusOnCelestialBody(exactMatch);
            searchDropdown.style.display = 'none';
            planetSearch.value = '';
        } else if (searchDropdown.children.length > 0) {
            // If no exact match but suggestions exist, focus on the first suggestion
            const firstSuggestion = searchDropdown.children[0].textContent;
            focusOnCelestialBody(firstSuggestion);
            planetSearch.value = firstSuggestion;
            searchDropdown.style.display = 'none';
            planetSearch.value = '';
        }
    }
});

// Hide dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!planetSearchContainer.contains(e.target)) {
        searchDropdown.style.display = 'none';
    }
});

// Add to existing event listeners in solar_system.js
document.querySelector('.h-toggle-button').addEventListener('click', () => {
    tableState = (tableState + 1) % 3;
    updateTableState();
});


// Call updateTableState on initial load
document.addEventListener('DOMContentLoaded', () => {
    updateTableState();
});

// Track the state of control sizes (false = default, true = larger/mobile)

// Function to toggle control sizes
function toggleControlSizes() {
    videoSettings.largeControls = !videoSettings.largeControls;
    isLargeControls = videoSettings.largeControls;
    const toggleButton = document.getElementById('toggleControlSize');
    toggleButton.textContent = videoSettings.largeControls ? 'Smaller Controls' : 'Larger Controls';

    // Apply or remove the large-controls class on the body
    if (videoSettings.largeControls) {
        document.body.classList.add('large-controls');
    } else {
        document.body.classList.remove('large-controls');
    }

    // Save the preference in a cookie
    setCookie('largeControls', videoSettings.largeControls, 30);
}

// Event listener for the toggle button
document.getElementById('toggleControlSize').addEventListener('click', () => {
    toggleControlSizes();
});

// Load and apply the saved preference from cookie on page load (already handled in videoSettings initialization)
document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggleControlSize');
    toggleButton.textContent = videoSettings.largeControls ? 'Smaller Controls' : 'Larger Controls';
});

document.getElementById('toggleAsteroidOrbits').addEventListener('click', function() {
    asteroidOrbitsVisible = !asteroidOrbitsVisible;
    asteroidOrbitLines.forEach(line => line.visible = asteroidOrbitsVisible);
    celestialObjects.forEach(obj => {
        if (obj.data.type === "asteroid" && obj.trailLine) {
            obj.trailLine.visible = asteroidTrailsVisible && !asteroidOrbitsVisible;
        }
    });
    this.textContent = asteroidOrbitsVisible ? 'Hide Asteroid Orbits' : 'Show Asteroid Orbits';
    setCookie('asteroidOrbitsVisible', asteroidOrbitsVisible, 30);
});

document.getElementById('toggleAsteroidTrails').addEventListener('click', function() {
    asteroidTrailsVisible = !asteroidTrailsVisible;
    celestialObjects.forEach(obj => {
        if (obj.data.type === "asteroid" && obj.trailLine) {
            obj.trailLine.visible = asteroidTrailsVisible && !asteroidOrbitsVisible;
        }
    });
    this.textContent = asteroidTrailsVisible ? 'Hide Asteroid Trails' : 'Show Asteroid Trails';
    setCookie('asteroidTrailsVisible', asteroidTrailsVisible, 30);
});


// Add keydown event listener for cycling celestial bodies, exiting focus mode, and targeting in FPS mode
document.addEventListener('keydown', (event) => {
    // Ignore when typing in search / text fields
    const active = document.activeElement;
    if (active && (
        active.tagName === 'INPUT' ||
        active.tagName === 'TEXTAREA' ||
        active.isContentEditable
    )) {
        return;
    }

    if (event.key === ',' || event.key === '.') {
        if (!celestialObjects.length) return; // No celestial bodies to cycle

        // Find current focused planet index
        let currentIndex = focusedPlanet
            ? celestialObjects.findIndex(obj => obj.data.name === focusedPlanet.data.name)
            : -1;

        // Calculate new index based on key
        if (event.key === '.') {
            // Cycle forward
            currentIndex = (currentIndex + 1) % celestialObjects.length;
        } else if (event.key === ',') {
            // Cycle backward
            currentIndex = (currentIndex - 1 + celestialObjects.length) % celestialObjects.length;
        }

        // Update focused planet
        focusedPlanet = celestialObjects[currentIndex];
        if (focusedPlanet) {
            focusOnPlanet(focusedPlanet);
            updateFocusBox(focusedPlanet);
        }

        event.preventDefault(); // Prevent default browser behavior
    } else if (event.key === '0') {
        // Toggle atmosphere shells, auroras, and GRS lightning — bare planet surface
        toggleAtmosphereEffects();
        event.preventDefault();
    } else if (event.key === 'Escape') {
        // Exit focus mode
        focusedPlanet = null;
        focusedCenterOfGravity = null;
        trackingPlanet = false;
        focusCube.visible = false;
        document.getElementById('focusBox').style.display = 'none';
        radiusLine.visible = false;
        velocityLine.visible = false;
        angularMomentumLine.visible = false;
        velocityCone.visible = false;
        angularMomentumCone.visible = false;
        radiusLabel.visible = false;
        velocityLabel.visible = false;
        angularMomentumLabel.visible = false;
        axisMesh.visible = false;
        orbitalPlaneMesh.visible = false;
        equatorialPlaneMesh.visible = false;
        xAxisLine.visible = false;
        yAxisLine.visible = false;
        zAxisLine.visible = false;
        xAxisLabel.visible = false;
        yAxisLabel.visible = false;
        zAxisLabel.visible = false;

        event.preventDefault(); // Prevent default browser behavior
    } else if (event.key === 't' && isFPSMode) {
        // Focus on celestial body in crosshairs in FPS mode
        // Set raycaster from camera through screen center (crosshairs)
        raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);

        // Collect all meshes to check for intersection
        const meshes = celestialObjects.map(obj => 
            obj.mesh instanceof THREE.Group ? obj.mesh.children[0] : obj.mesh
        );

        // Find intersections
        const intersects = raycaster.intersectObjects(meshes, true);

        if (intersects.length > 0) {
            // Get the closest intersected object
            const closest = intersects[0].object;

            // Find the corresponding celestial object
            const targetObj = celestialObjects.find(obj => 
                (obj.mesh instanceof THREE.Group ? obj.mesh.children[0] : obj.mesh) === closest ||
                closest.parent === obj.mesh
            );

            if (targetObj) {
                focusedPlanet = targetObj;
                focusOnPlanet(focusedPlanet);
                updateFocusBox(focusedPlanet);
            }
        }

        event.preventDefault(); // Prevent default browser behavior
    }
});


//BEGINNING OF POPULATE TRACK CODE
// Populate Track submenu
const trackSubmenu = document.getElementById('trackSubmenu');
// Array to hold third-level submenus, one per body (Sun + planets) plus Asteroids
const bodySubmenus = [];


function updatePlanes(focusedPlanet) {
    // Hide both planes if no valid planet or no orbital elements
    if (!focusedPlanet || !focusedPlanet.data.orbitalElements ) {
        orbitalPlaneMesh.visible = false;
        equatorialPlaneMesh.visible = false;
        xAxisLine.visible = false;
        yAxisLine.visible = false;
        zAxisLine.visible = false;
        xAxisLabel.visible = false;
        yAxisLabel.visible = false;
        zAxisLabel.visible = false;
        return;
    }

    const planetRadius = focusedPlanet.data.radius * nHardCodeScaleFactor;
    const { finalPlanetScale } = getScaleForObject(focusedPlanet);
    const scaledRadius = planetRadius * finalPlanetScale;
    const planeSize = 6 * scaledRadius;

    // Get planet's world position
    const planetPos = new THREE.Vector3();
    const mesh = focusedPlanet.mesh instanceof THREE.Group ? focusedPlanet.mesh.children[0] : focusedPlanet.mesh;
    mesh.getWorldPosition(planetPos);

    if(focusedPlanet.data.name != "Sun")
    {

        // Update Orbital Plane (existing logic)
        const { i, Omega } = focusedPlanet.data.orbitalElements;
        const iRad = i * (Math.PI / 180);
        const OmegaRad = Omega * (Math.PI / 180);

        // Orbital plane normal
        const orbitalNormal = new THREE.Vector3(
            Math.sin(iRad) * Math.sin(OmegaRad),
            -Math.sin(iRad) * Math.cos(OmegaRad),
            Math.cos(iRad)
        ).normalize();

        // Position and orient orbital plane
        orbitalPlaneMesh.position.copy(planetPos);
        orbitalPlaneMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), orbitalNormal);
        orbitalPlaneMesh.scale.set(planeSize, planeSize, 1);

        // Update axes (same as before)
        const cornerOffset = new THREE.Vector3(-planeSize / 2, planeSize / 2, 0);
        const cornerPos = planetPos.clone().add(
        cornerOffset.clone().applyQuaternion(
            new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), orbitalNormal)
        )
        );

        const axisScale = scaledRadius;
        xAxisLine.scale.set(axisScale, 1, 1);
        yAxisLine.scale.set(1, axisScale, 1);
        zAxisLine.scale.set(1, 1, axisScale);

        xAxisLine.quaternion.set(0, 0, 0, 1);
        yAxisLine.quaternion.set(0, 0, 0, 1);
        zAxisLine.quaternion.set(0, 0, 0, 1);

        xAxisLine.position.copy(cornerPos);
        yAxisLine.position.copy(cornerPos);
        zAxisLine.position.copy(cornerPos);

        xAxisLabel.position.copy(cornerPos).add(new THREE.Vector3(axisScale, 0, 0));
        yAxisLabel.position.copy(cornerPos).add(new THREE.Vector3(0, axisScale, 0));
        zAxisLabel.position.copy(cornerPos).add(new THREE.Vector3(0, 0, axisScale));

        const labelScale = scaledRadius * 5;
        xAxisLabel.scale.set(labelScale, labelScale, 1);
        yAxisLabel.scale.set(labelScale, labelScale, 1);
        zAxisLabel.scale.set(labelScale, labelScale, 1);

        // Toggle axes visibility with orbital plane
        xAxisLine.visible = orbitalPlaneMesh.visible;
        yAxisLine.visible = orbitalPlaneMesh.visible;
        zAxisLine.visible = orbitalPlaneMesh.visible;
        xAxisLabel.visible = orbitalPlaneMesh.visible;
        yAxisLabel.visible = orbitalPlaneMesh.visible;
        zAxisLabel.visible = orbitalPlaneMesh.visible;

        
    }
    else
    {
        orbitalPlaneMesh.visible = false;
        xAxisLine.visible = false;
        yAxisLine.visible = false;
        zAxisLine.visible = false;
        xAxisLabel.visible = false;
        yAxisLabel.visible = false;
        zAxisLabel.visible = false;
    }
    // Update Equatorial Plane
    equatorialPlaneMesh.position.copy(planetPos);
    // Use initialQuaternion for alignment
    if (focusedPlanet.initialQuaternion) {
        const orientationQuaternion = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), (Math.PI / 2 ) );
        const equatorialQuanternion = new THREE.Quaternion().multiplyQuaternions(focusedPlanet.initialQuaternion, orientationQuaternion);
        equatorialPlaneMesh.quaternion.copy(equatorialQuanternion);
    } else {
        // Fallback: align with planet's rotation axis (Z-axis in model space)
        //equatorialPlaneMesh.quaternion.copy(mesh.quaternion);
    }
    equatorialPlaneMesh.scale.set(planeSize, planeSize, 1);

    

    
}

function updateOrbitControlScale(planetRadius, finalPlanetScale )
{
    const scaledRadius = planetRadius * finalPlanetScale;

    orbitControls.minDistance = scaledRadius * 1.2;
    orbitControls.maxDistance = Infinity;

    orbitControls.update();
}
function focusOnPlanet(focusedPlanet) {
    const cogName = focusedPlanet.data.type === "star" ? focusedPlanet.data.name : focusedPlanet.parent.name;
    updateConstants = true;

    focusedCenterOfGravity = getMeshByName(cogName);
    displayPhotoContent();

    trackingPlanet = true;
    document.getElementById('focusBox').style.display = 'block';
    focusCube.visible = true;

    const isMesh = focusedPlanet.data.mesh ? true : false;
    const planetRadius = focusedPlanet.data.radius * nHardCodeScaleFactor;
    //const typeScaleMultiplier = getTypeScaleMultiplier(focusedPlanet.data.type);
    const { finalPlanetScale, finalOrbitScale } = getScaleForObject(focusedPlanet);
    const scaledRadius = planetRadius * finalPlanetScale;

    focusCube.scale.set(planetRadius * finalPlanetScale * 2.2, planetRadius * finalPlanetScale * 2.2, planetRadius * finalPlanetScale * 2.2);

    const distanceMultiplier = focusedPlanet.data.type === "moon" ? 20 : 15;
    const targetDistance = scaledRadius * distanceMultiplier;

    const planetPos = new THREE.Vector3();
    const mesh = focusedPlanet.mesh instanceof THREE.Group ? focusedPlanet.mesh.children[0] : focusedPlanet.mesh;
    mesh.getWorldPosition(planetPos);

    const direction = camera.position.clone().sub(orbitControls.target).normalize();
    
    if( !isFPSMode)
    {
        camera.position.copy(planetPos).add(direction.multiplyScalar(targetDistance));
        orbitControls.target.copy(planetPos);
    
        updateOrbitControlScale(planetRadius,finalPlanetScale);
    }
    /*orbitControls.minDistance = scaledRadius * 1.2;
    orbitControls.maxDistance = Infinity;

    orbitControls.update();*/

    const descriptionText = document.getElementById('descriptionContent');
    if (focusedPlanet) {
        descriptionText.innerHTML = planetDescriptions[focusedPlanet.data.name] || 'No description available.';
    } else {
        descriptionText.innerHTML = 'Select a planet to see its description.';
    }

    // Update orbital plane
    updatePlanes(focusedPlanet);

    if (isFPSMode) {
        //focusedPlanet = null;
        //trackingPlanet = null;
        orbitalPlaneMesh.visible = false;
        xAxisLine.visible = false;
        yAxisLine.visible = false;
        zAxisLine.visible = false;
        xAxisLabel.visible = false;
        yAxisLabel.visible = false;
        zAxisLabel.visible = false;
    }

}

// Separate asteroids from other bodies
const asteroids = bodies.filter(body => body.type === "asteroid");
const nonAsteroidBodies = bodies.filter(body => body.type !== "asteroid");

// Create containers for all non-asteroid bodies first
const bodyContainers = nonAsteroidBodies.map((body, index) => {
    const bodyContainer = document.createElement('div');
    bodyContainer.className = 'submenu-container';

    const bodyButton = document.createElement('button');
    bodyButton.className = 'button submenu-toggle';
    bodyButton.textContent = body.name;
    bodyContainer.appendChild(bodyButton);

    const bodySubmenu = document.createElement('div');
    bodySubmenu.className = 'submenu';
    bodySubmenu.id = `track-submenu-${body.name.toLowerCase().replace(/\s+/g, '-')}`;
    bodySubmenus[index] = bodySubmenu;

    const bodyFocusButton = document.createElement('button');
    bodyFocusButton.className = 'button';
    bodyFocusButton.textContent = body.name;
    bodyFocusButton.addEventListener('click', () => {
        focusedPlanet = getMeshByName(body.name);
        if (focusedPlanet) {
            focusOnPlanet(focusedPlanet);
        }
    });
    bodySubmenu.appendChild(bodyFocusButton);

    body.moons.forEach(moon => {
        const moonButton = document.createElement('button');
        moonButton.className = 'button';
        moonButton.textContent = moon.name;
        moonButton.addEventListener('click', () => {
            focusedPlanet = getMeshByName(moon.name);
            if (focusedPlanet) {
                focusOnPlanet(focusedPlanet);
            }
        });
        bodySubmenu.appendChild(moonButton);
    });

    bodyContainer.appendChild(bodySubmenu);
    bodySubmenu.style.display = 'none';

    bodyButton.addEventListener('mouseenter', () => {
        bodySubmenus.forEach(submenu => submenu.style.display = 'none');
        bodySubmenu.style.display = 'flex';
    });

    bodyContainer.addEventListener('mouseleave', () => {
        bodySubmenu.style.display = 'none';
    });

    return bodyContainer;
});

// Find the index of Mars
const marsIndex = nonAsteroidBodies.findIndex(body => body.name === "Mars");

// Append non-asteroid bodies up to Mars
for (let i = 0; i <= marsIndex; i++) {
    trackSubmenu.appendChild(bodyContainers[i]);
}

// Add Asteroids submenu after Mars
const asteroidContainer = document.createElement('div');
asteroidContainer.className = 'submenu-container';

const asteroidButton = document.createElement('button');
asteroidButton.className = 'button submenu-toggle';
asteroidButton.textContent = 'Asteroid Belt';
asteroidContainer.appendChild(asteroidButton);

const asteroidSubmenu = document.createElement('div');
asteroidSubmenu.className = 'submenu';
asteroidSubmenu.id = 'track-submenu-asteroids';
bodySubmenus.push(asteroidSubmenu);

asteroids.forEach(asteroid => {
    const asteroidFocusButton = document.createElement('button');
    asteroidFocusButton.className = 'button';
    asteroidFocusButton.textContent = asteroid.name;
    asteroidFocusButton.addEventListener('click', () => {
        focusedPlanet = getMeshByName(asteroid.name);
        if (focusedPlanet) {
            focusOnPlanet(focusedPlanet);
        }
    });
    asteroidSubmenu.appendChild(asteroidFocusButton);
});

asteroidContainer.appendChild(asteroidSubmenu);
trackSubmenu.appendChild(asteroidContainer);
asteroidSubmenu.style.display = 'none';


function adjustSubmenuPosition(submenu) {
    const numOfButtons = submenu.querySelectorAll('button').length;
    const parentSubmenuPosition = 1;
    if(numOfButtons > 10)
    {
        asteroidSubmenu.style.display = 'flex';
        asteroidSubmenu.style.visibility = 'hidden';
        
        let offset = -5;
        let hPerButton = -42;
        
        if( isLargeControls )
        {
            hPerButton = -53;
        }
        let top = offset + hPerButton * (numOfButtons - 10);
        if( top > 220) top = 220;
    
    asteroidSubmenu.style.position = 'absolute';
    //asteroidSubmenu.style.left = `${left}px`;
    asteroidSubmenu.style.top = `${top}px`;
    asteroidSubmenu.style.visibility = 'visible';
    asteroidSubmenu.style.display = 'none';
    }
}

asteroidButton.addEventListener('mouseenter', () => {
    bodySubmenus.forEach(submenu => submenu.style.display = 'none');
    adjustSubmenuPosition(asteroidSubmenu);
    asteroidSubmenu.style.display = 'flex';
});

asteroidContainer.addEventListener('mouseleave', () => {
    asteroidSubmenu.style.display = 'none';
});

const restartWithGettingStartedButton = document.getElementById('restartWithGettingStarted');

restartWithGettingStartedButton.addEventListener('click', () => {
    // Clear the cookie to show the Getting Started popup
    setCookie('hideGettingStarted', '', -1);
    // Reload the page to restart the simulation
    window.location.reload();
});

// Adjust position on window resize for asteroids
window.addEventListener('resize', () => adjustSubmenuPosition(asteroidSubmenu));

// Append the remaining non-asteroid bodies after Asteroids
for (let i = marsIndex + 1; i < bodyContainers.length; i++) {
    trackSubmenu.appendChild(bodyContainers[i]);
}

// Event listener for the Hide button on the loading popup
const hideLoadingPopupButton = document.getElementById('hideLoadingPopup');
hideLoadingPopupButton.addEventListener('click', () => {
    const loadingPopup = document.getElementById('loadingPopup');
    loadingPopup.style.display = 'none';
});
// Verify the array size matches the number of non-asteroid bodies plus Asteroids submenu
console.log(`Total non-asteroid bodies: ${nonAsteroidBodies.length}, Asteroids: ${asteroids.length}, bodySubmenus length: ${bodySubmenus.length}`);
}