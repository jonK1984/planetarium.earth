# planetarium.Earth

**Interactive 3D solar system simulation** (v0.9.3 beta)

A browser-based planetarium built with [Three.js](https://threejs.org/). Explore the Sun, planets, major moons, dwarf planets, and named asteroids with real orbital elements, science data, and customizable rendering — all running in WebGL.

**Author:** Jon Kakaley ([@JonKakaley](https://x.com/JonKakaley))  
**Repository:** [github.com/jonK1984/planetarium.earth](https://github.com/jonK1984/planetarium.earth)
**CURRENLTY HOSTED:** [http://planetarium.earth/](http://planetarium.earth/)
---

## Overview

planetarium.Earth visualizes solar system dynamics using a **two-body Keplerian** model in real time. It is intended as an educational tool for enthusiasts, students, and researchers: click bodies for descriptions and physical data, scrub time to watch orbits unfold, and switch between orbital camera and first-person flight modes.

Settings (texture quality, antialiasing, trails, etc.) are saved in browser cookies so your preferred render profile persists across sessions.

---

## Features

- **Bodies:** Sun, eight planets, major moons, dwarf planets (Ceres, Pluto, Haumea, Makemake, Eris), and named asteroids with optional complex meshes
- **Cameras:** Orbital controls (rotate / pan / zoom) and flight mode with throttle, pitch/yaw/roll, and crosshair focus
- **Time:** Pause/resume and a time-scale slider to speed up or reverse simulation time
- **Tracking:** Focus/search bodies; optional planet, moon, and asteroid orbits and trails
- **Visuals:** Rings, atmospheres, normal maps, asteroid belt sprites, star/milky-way backdrops; multiple texture quality tiers
- **Science UI:** Physical constants table, orbital elements, equations (MathJax), narrative descriptions, and photo galleries
- **Render settings:** Antialiasing, logarithmic depth buffer, complex meshes, ambient light, control size — persisted via cookies
- **Getting Started:** In-app walkthrough with example images and short videos

---

## Requirements

- A modern browser with **WebGL** (Microsoft Edge recommended; Chrome, Firefox, and Safari also tested)
- Faster CPU/GPU recommended for high texture tiers and complex meshes
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

## Repository layout

```
.
├── solar_system.html          # Entry page and UI shell
├── solar_system.js            # Main simulation, rendering, interaction
├── solar_system_style.css     # UI styles
├── solar_constants.js         # Orbital elements, masses, body catalog
├── solar_descriptions.js      # Narrative descriptions
├── solar_science_info.js      # Science / physical property data
├── solar_image_list.js        # Photo gallery file lists
├── shaders.js                 # Custom GLSL (sun, trails)
├── js/                        # Three.js, loaders, camera controls, MathJax
├── mesh/                      # Asteroid / small-body 3D models (GLB, OBJ)
├── textures_lo|md|hi|mx/      # Surface maps by quality tier
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

---

## Acknowledgements

- **NCSU** — North Carolina State University College of Mechanical and Aerospace Engineering
- **Orbital Mechanics for Engineering Students** (3rd ed.) — Howard D. Curtis
- **NASA** — planetary data, imagery, and scientific insights
- **JPL** — orbital elements and physical constants
- **Three.js** community — 3D rendering library
- **Solar System Scope**, **NASA Blue Marble**, **Celestia Motherlode**, and various 3D texture artists — planetary textures

---

## Version tracking

Code and documentation changes are recorded in plain language in:

- **VERSION_TRACKING.txt** — session IDs (`S-#####`) and numbered change lines
- **FILE_MANIFEST.txt** — which files exist and what they do

Git history shows diffs; these files record intent for future maintainers.

---

## Support

The simulation is free to use. If you find it useful and want to support hosting and development, consider following or subscribing to [@JonKakaley](https://x.com/JonKakaley) on X. Feedback and feature requests are welcome there as well.
