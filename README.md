# planetarium.Earth

**Interactive 3D solar system simulation** (v0.9.5 beta)

A browser-based planetarium built with [Three.js](https://threejs.org/). Explore the Sun, planets, major moons, dwarf planets, and named asteroids with real orbital elements, science data, and customizable rendering — all running in **WebGL 2.0**.

**Author:** Jon Kakaley ([@JonKakaley](https://x.com/JonKakaley))  
**Repository:** [github.com/jonK1984/planetarium.earth](https://github.com/jonK1984/planetarium.earth)

**CURRENTLY HOSTED:** [http://planetarium.earth/](http://planetarium.earth/)

---

## Overview

planetarium.Earth visualizes solar system dynamics using a **two-body Keplerian** model in real time. It is intended as an educational tool for enthusiasts, students, and researchers: click bodies for descriptions and physical data, scrub time to watch orbits unfold, and switch between orbital camera and first-person flight modes.

Settings (texture quality, antialiasing, advanced shaders, trails, etc.) are saved in browser cookies so your preferred render profile persists across sessions.

---

## Features

- **Bodies:** Sun, eight planets, major moons, dwarf planets (Ceres, Pluto, Haumea, Makemake, Eris), and named asteroids with optional complex meshes
- **Cameras:** Orbital controls (rotate / pan / zoom) and flight mode with throttle, pitch/yaw/roll, and crosshair focus
- **Time:** Pause/resume and a time-scale slider to speed up or reverse simulation time
- **Tracking:** Focus/search bodies; optional planet, moon, and asteroid orbits and trails
- **Visuals:** Rings, cloud/atmosphere shells, normal maps, asteroid belt sprites, star/milky-way backdrops; multiple texture quality tiers
- **Advanced shaders (opt-in):** Master toggle plus a slide-out panel of discrete per-effect controls (see below)
- **Science UI:** Physical constants table, orbital elements, equations (MathJax), narrative descriptions, and photo galleries
- **Render settings:** Pixel ratio, anisotropic filtering, antialiasing, texture size, advanced shaders, complex meshes, logarithmic depth buffer — persisted via cookies
- **Getting Started:** In-app walkthrough with example images and short videos

---

## Advanced shaders

**Video → Render Settings → Enable Advanced Shaders.** Use **ON/OFF** for the master switch, then click **▶** to open **Advanced Shader Options**.

Each option is independent. An effect runs only when the **master is ON** and that option is **ON**. Defaults for sub-options are ON so the first time you enable the master, the full package is available; turn individual items off for performance or taste. Apply reloads the page (same as other render settings).

| Option | What it does |
|--------|----------------|
| Sun Surface Turbulence | Animated FBM noise on the Sun surface |
| Sun Corona & Fresnel | Stronger outer glow plus rim fresnel on the Sun |
| Sun Plasma Flares & Ejecta | Volumetric ray-marched solar flares: random CME-style plasma jets, magnetic prominence loops, corona streamers, and footpoint brightening (domain-warped FBM plasma) |
| Earth Night Lights | Day/night blend with real city lights (`earth_night_lights.png` from NASA Black Marble 2016); soft warm glow on the dark side that fades at the terminator |
| Soft Terminator Lighting | Soft wrap lighting on textured bodies (replaces hard day/night cut) |
| Ring Lighting & Shadows | Sun-lit rings with planet umbra on the ring plane |
| Bloom & Tone Mapping | Mild bloom on bright areas + ACES filmic tone mapping |
| Cloud Motion | Reserved cloud-motion control (cloud layers still use the standard Phong shells) |
| Planet Auroras (Earth & Jupiter) | Volumetric ray-marched auroras: Earth polar ribbons with radial green→blue→red spikes; Jupiter north-pole sparkling blue ice swirl |
| Volcanic & Plume Activity | Localized activity on Io, Venus, Enceladus, Triton, Europa: IR/lava hotspots (Io, Venus) and faint scientifically scaled plumes/jets (Io SO₂, Enceladus ice, Triton N₂ dust, rare Europa vapor). No whole-disk tint; Venus has surface hotspots only (cloud deck hides optical plumes) |

Atmospheres/cloud layers use the standard transparent Phong shells (advanced atmospheric scattering was removed after it distorted the scene).

**Performance tip:** Leave Advanced Shaders **OFF** on low-end devices. Bloom, high texture tiers, volumetric auroras, and solar plasma flares are the heaviest options when the master is ON.

---

## Requirements

- A modern browser with **WebGL 2.0** (required — Chrome, Edge, Firefox, and Safari on recent OS versions)
- Faster CPU/GPU recommended for high texture tiers, complex meshes, and advanced shaders (auroras use volumetric ray marching)
- No build toolchain — static HTML, CSS, and JavaScript only

---

## How to run

Serve the repo root over HTTP (preferred). Opening `solar_system.html` via `file://` often fails for texture/mesh loaders.

```bash
# From the repository root
python3 -m http.server 8080
```

Then open:

```
http://localhost:8080/solar_system.html
```

Any static file server works (VS Code Live Server, `npx serve`, nginx, etc.).

---

## Texture packs & Celestia Virtual Textures

Surface maps live under `textures_lo/`, `textures_md/`, `textures_hi/`, and `textures_mx/` (selected by **Render Settings → Texture Size**).

- **Normal maps:** a single file, e.g. `proteus_texture.png`, in each tier folder.
- **Celestia Virtual Textures (VT):** a `.ctx` plus a tile subfolder next to it, e.g.:

```
textures_mx/Triton.ctx
textures_mx/Triton/level0/tx_0_0.png …
textures_mx/Moon.ctx + Moon/level*…
textures_mx/MoonNormal.ctx + MoonNormal/level*…   # normal-map VT (linear, not sRGB)
```

Lower tiers may only ship the levels they need (`textures_lo` / `md` → `level0` only; `hi` / `mx` → deeper levels). The runtime loader (`js/CelestiaVTLoader.js`) stitches tiles into one equirectangular texture (capped at **8192×4096**), using each tile’s real pixel size (ctx `TileSize` can be wrong).

In `solar_constants.js`:

```js
texture: 'proteus_texture.png',                       // flat file under TEXTURE_PATH
texture: { type: 'celestia-vt', ctx: 'Moon.ctx' },    // albedo VT
normalMap: { type: 'celestia-vt', ctx: 'MoonNormal.ctx' },
```

External pack folders are **not** required at runtime once assets are copied into these trees.

---

## Repository layout

```
.
├── solar_system.html          # Entry page and UI shell
├── solar_system.js            # Main simulation, rendering, interaction, settings
├── solar_system_style.css     # UI styles (including advanced-shader panel)
├── solar_constants.js         # Orbital elements, masses, body catalog, texture keys
├── solar_descriptions.js      # Narrative descriptions
├── solar_science_info.js      # Science / physical property data
├── solar_image_list.js        # Photo gallery file lists
├── shaders.js                 # Custom GLSL (sun, flares, trails, Earth, soft planet, rings, aurora, volcanic plumes, bloom)
├── js/                        # Three.js, loaders, camera controls, MathJax
├── mesh/                      # Asteroid / small-body 3D models (GLB, OBJ)
├── textures_lo|md|hi|mx/      # Surface maps by quality tier (+ earth_night_lights.png)
├── images/                    # UI photographs for body info panels
├── getting_started/           # Onboarding media
├── VERSION_TRACKING.txt       # Session-based change log
└── FILE_MANIFEST.txt          # File inventory and roles
```

See **FILE_MANIFEST.txt** for a full inventory and role notes.

---

## Controls (summary)

Full tables live under the in-app **Help** menu (Simulation / Orbital / Flight controls). Quick reference:

| Action | Input |
|--------|--------|
| Rotate / pan / zoom (orbital) | Left-drag / right-drag / scroll |
| Toggle orbital ↔ flight | `C` |
| Time scale | Slider at top of UI; pause and T+/T− buttons |
| Search body | Search bar (“Search Planet…”) |
| Focus body under crosshair (flight) | `T` |
| Cycle previous / next body | `,` / `.` |
| Toggle atmospheres / auroras / storm lightning (bare planet) | `0` |
| Render / advanced shaders | Video → Render Settings |

---

## Acknowledgements

- **NCSU** — North Carolina State University College of Mechanical and Aerospace Engineering
- **Orbital Mechanics for Engineering Students** (3rd ed.) — Howard D. Curtis
- **NASA** — planetary data, imagery, and scientific insights
- **JPL** — orbital elements and physical constants
- **Three.js** community — 3D rendering library
- **Solar System Scope**, **NASA Blue Marble**, **NASA Black Marble** (Earth night lights), **Celestia Motherlode**, and various 3D texture artists — planetary textures

---

## Version tracking

Code and documentation changes are recorded in plain language in:

- **VERSION_TRACKING.txt** — session IDs (`S-#####`) and numbered change lines  
  - Recent: **S-00028** Celestia VT texture loader (Moon/Triton); **S-00026** volcanic/cryovolcanic plumes + hotspots; **S-00016** Earth aurora ribbons + `0` key atmosphere toggle
- **FILE_MANIFEST.txt** — which files exist and what they do

Git history shows diffs; these files record intent for future maintainers.

---

## Support

The simulation is free to use. If you find it useful and want to support hosting and development, consider following or subscribing to [@JonKakaley](https://x.com/JonKakaley) on X. Feedback and feature requests are welcome there as well.
