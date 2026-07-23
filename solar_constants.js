// Constants
const G = 4 * Math.PI * Math.PI; // Gravitational constant in AU^3 / (solar mass * year^2)
const SUN_MASS = 1; // Solar mass as 1 unit
const KEPLER_ITERATION_PRECISION = 7; //Determines the # of iterations to solve each kepler equation
const N_TRAIL_POINTS = 30;
// Orbital elements data 
const bodies = [
    {
      name: "Sun",
      type: "star",
      mass: 1, // Solar mass
      radius: 0.0046, // AU
      color: 0xffff00, // Yellow
      texture: 'sun_texture.png',
      moonScale: 1,
      moonOrbitScale: 1,
      rotationalAngularMomentum: 1.12e42,  // kg m²/s
      axialTilt: 7.25,
      siderealDay: 2217888, // 25.67 days in seconds
      k_value: 0.059, // Centralized mass due to fusion
      orbitalElements: {
        a: 0, // AU
        e: 0,
        i: 0, // degrees
        Omega: 0, // degrees
        omega: 0, // degrees
        M0: 0 // degrees
      },
      moons: [],
      density: 1410, // kg/m³ (NASA JPL Solar Fact Sheet)
      surface_gravity: 274.0 // m/s² (NASA JPL Solar Fact Sheet)
    },
    {
      name: "Mercury",
      type: "Terrestrial",
      mass: 1.66e-7, // Solar masses
      radius: 0.000016, // AU
      color: 0xaaaaaa, // Gray
      texture: 'mercury_texture.jpg',
      moonScale: 1,
      moonOrbitScale: 1,
      rotationalAngularMomentum: 9.74e29,  // kg m²/s
      axialTilt: 0.03,
      siderealDay: 5067014, // 58.646 days in seconds
      k_value: 0.346, // Dense core, rocky
      orbitalElements: {
        a: 0.387, // AU
        e: 0.2056,
        i: 7, // degrees
        Omega: 48.33, // degrees
        omega: 29.12, // degrees
        M0: 174.796 // degrees
      },
      moons: [],
      density: 5429, // kg/m³ (NASA JPL Planetary Fact Sheet)
      surface_gravity: 3.7 // m/s² (NASA JPL Planetary Fact Sheet)
    },
    {
      name: "Venus",
      type: "Terrestrial",
      mass: 2.45e-6, // Solar masses
      radius: 0.000040, // AU
      color: 0xffff99, // Yellowish
      texture: 'venus_texture.jpg',
      normalMap: 'normal_map_venus.png',
      atmosphere_texture: 'atmosphere_venus_texture.jpg',
      moonScale: 1,
      moonOrbitScale: 1,
      rotationalAngularMomentum: 2.13e31,  // kg m²/s
      axialTilt: -177.36,  // retrograde
      siderealDay: 20996755, // 243.018 days in seconds, retrograde
      k_value: 0.33, // Assumed Earth-like
      orbitalElements: {
        a: 0.723, // AU
        e: 0.0068,
        i: 3.39, // degrees
        Omega: 76.68, // degrees
        omega: 55.19, // degrees
        M0: 50.416 // degrees
      },
      moons: [],
      density: 5243, // kg/m³ (NASA JPL Planetary Fact Sheet)
      surface_gravity: 8.9 // m/s² (NASA JPL Planetary Fact Sheet)
    },
    {
      name: "Earth",
      type: "Terrestrial",
      mass: 3.003e-6, // Solar masses
      radius: 0.0000426, // AU
      color: 0x0000ff, // Blue
      texture: 'earth_texture.jpg',
      atmosphere_texture: 'atmosphere_earth_texture.jpg',
      normalMap: 'normal_map_earth.png',
      specularMap: 'specular_map_earth.png',
      nightMap: 'earth_night_lights.png',
      moonScale: 1,
      moonOrbitScale: 1,
      rotationalAngularMomentum: 7.07e33,  // kg m²/s
      axialTilt: 23.44,
      siderealDay: 86164, // 23h 56m 4s in seconds
      k_value: 0.3308, // Well-measured
      orbitalElements: {
        a: 1.0, // AU
        e: 0.0167,
        i: 0, // degrees
        Omega: 0, // degrees
        omega: 102.947, // degrees
        M0: 100.464 // degrees
      },
      moons: [
        {
          name: "Moon",
          type: "moon",
          mass: 3.69e-8, // Solar masses
          radius: 0.000011, // AU
          color: 0xcccccc, // Light gray
          // Celestia VT under textures_*/Moon and textures_*/MoonNormal
          texture: {
            type: 'celestia-vt',
            ctx: 'Moon.ctx'
          },
          normalMap: {
            type: 'celestia-vt',
            ctx: 'MoonNormal.ctx'
          },
          rotationalAngularMomentum: 2.36e29,  // kg m²/s
          axialTilt: 6.68,  // relative to ecliptic
          siderealDay: 2360520, // 27.32166 days in seconds, tidally locked
          k_value: 0.393, // Near-uniform
          orbitalElements: {
            a: 0.00257, // AU
            e: 0.0549,
            i: 5.145, // degrees
            Omega: 125.08, // degrees
            omega: 318.15, // degrees
            M0: 135.27 // degrees
          },
          density: 3340, // kg/m³ (NASA JPL Planetary Fact Sheet)
          surface_gravity: 1.6 // m/s² (NASA JPL Planetary Fact Sheet)
        }
      ],
      density: 5514, // kg/m³ (NASA JPL Planetary Fact Sheet)
      surface_gravity: 9.8 // m/s² (NASA JPL Planetary Fact Sheet)
    },
    {
      name: "Mars",
      type: "Terrestrial",
      mass: 3.22e-7, // Solar masses
      radius: 0.0000227, // AU
      color: 0xff8080, // Light red
      texture: 'mars_texture.png',
      normalMap: 'normal_map_mars.png',
      atmosphere_texture: 'atmosphere_mars_texture.png',
      moonScale: 10,
      moonOrbitScale: 1,//5,
      rotationalAngularMomentum: 2.09e32,  // kg m²/s
      axialTilt: 25.19,
      siderealDay: 88643, // 1.02596 days in seconds
      k_value: 0.366, // Less dense core
      orbitalElements: {
        a: 1.523662, // AU
        e: 0.0934,
        i: 1.85, // degrees
        Omega: 49.56, // degrees
        omega: 286.53, // degrees
        M0: 19.45 // degrees
      },
      moons: [
        
        {
          name: "Deimos",
          type: "moon",
          mass: 7.42e-16, // Solar masses
          radius: 0.0000000414, // AU
          color: 0x808080, // Gray
          texture: 'deimos_texture.png',
          mesh: 'deimos.glb',
          rotationalAngularMomentum: 8.36e17,  // kg m²/s
          axialTilt: 0.03,  // assumed aligned with Mars’ equator
          siderealDay: 109105, // 1.26244 days (30.3h) in seconds, tidally locked
          k_value: 0.4, // Assumed uniform
          orbitalElements: {
            a: 0.0001568, // AU
            e: 0.00033,
            i: 26.98, // degrees
            Omega: 0, // Assumed
            omega: 0, // Assumed
            M0: 0 // Assumed
          },
          density: 1471, // kg/m³ (NASA JPL Mars Fact Sheet)
          surface_gravity: 0.003 // m/s² (NASA JPL Mars Fact Sheet)
        },
        {
          name: "Phobos",
          type: "moon",
          mass: 5.36e-15, // Solar masses
          radius: 0.0000000735, // AU
          color: 0x808080, // Gray
          texture: 'phobos_texture.png',
          mesh: 'phobos.glb',
          rotationalAngularMomentum: 2.29e19,  // kg m²/s
          axialTilt: 0.01, // assumed aligned with Mars’ equator
          siderealDay: 27553, // 0.319 days (7.66h) in seconds, tidally locked
          k_value: 0.4, // Assumed uniform
          orbitalElements: {
            a: 0.0000627, // AU
            e: 0.0151,
            i: 26.27, // degrees
            Omega: 0, // Assumed
            omega: 0, // Assumed
            M0: 0 // Assumed
          },
          density: 1871, // kg/m³ (NASA JPL Mars Fact Sheet)
          surface_gravity: 0.0057 // m/s² (NASA JPL Mars Fact Sheet)
        }
      ],
      density: 3934, // kg/m³ (NASA JPL Planetary Fact Sheet)
      surface_gravity: 3.7 // m/s² (NASA JPL Planetary Fact Sheet)
    },
    {
      name: "Ceres",
      type: "Dwarf",
      mass: 4.72e-10, // Solar masses
      radius: 3.16e-6, // AU
      color: 0x808080, // Gray
      texture: 'ceres_texture.jpg',
      moonScale: 1,
      moonOrbitScale: 1,
      rotationalAngularMomentum: 5.31e27,  // kg m²/s (based on ~9 hr rotation)
      axialTilt: 4,
      siderealDay: 32760, // 9.1 hours in seconds
      k_value: 0.37, // Rocky, partially differentiated
      orbitalElements: {
        a: 2.767, // AU
        e: 0.0758,
        i: 10.59, // degrees
        Omega: 80.31, // degrees
        omega: 72.52, // degrees
        M0: 291.42 // degrees
      },
      moons: [],
      density: 2162, // kg/m³ (NASA JPL Ceres Fact Sheet, Dawn mission)
      surface_gravity: 0.3 // m/s² (NASA JPL Ceres Fact Sheet, Dawn mission)
    },
    {
      name: "Jupiter",
      type: "Gas Giant",
      mass: 0.000954, // Solar masses
      radius: 0.000467, // AU
      color: 0xffd700, // Gold
      texture: 'jupiter_texture.jpg',
      ring_texture: 'jupiter_ring_texture.png',
      moonScale: 1,
      moonOrbitScale: 1, //2,
      rotationalAngularMomentum: 6.53e38,  // kg m²/s
      axialTilt: 3.13,
      siderealDay: 35730, // 0.41354 days (9h 55m 30s) in seconds
      k_value: 0.254, // Gas giant, dense core
      orbitalElements: {
        a: 5.202887, // AU
        e: 0.04839,
        i: 1.301, // degrees
        Omega: 100.46, // degrees
        omega: 273.86, // degrees
        M0: 18.22 // degrees
      },
      rings: 
      [
        {
          inner_radius: 0.00062, // AU
          outer_radius: 0.00151, // AU
          ring_inclination: 0.1 // degrees relative to the equatorial plane
        }
      ],
      moons: [
        {
          name: "Io",
          type: "moon",
          mass: 4.49e-8, // Solar masses
          radius: 0.0000122, // AU
          color: 0xffff00, // Yellow
          texture: 'io_texture.png',
          normalMap: 'normal_map_io.png',
          rotationalAngularMomentum: 2.46e29,  // kg m²/s (tidally locked)
          axialTilt: 0,  // tidally locked, aligned with Jupiter’s equator
          siderealDay: 152842, // 1.769 days in seconds, tidally locked
          k_value: 0.37, // Rocky, differentiated
          orbitalElements: {
            a: 0.00282, // AU
            e: 0.0041,
            i: 3.18, // degrees
            Omega: 0, // Assumed
            omega: 0, // Assumed
            M0: 0 // Assumed
          },
          density: 3528, // kg/m³ (NASA JPL Jupiter Fact Sheet)
          surface_gravity: 1.8 // m/s² (NASA JPL Jupiter Fact Sheet)
        },
        {
          name: "Europa",
          type: "moon",
          mass: 2.41e-8, // Solar masses
          radius: 0.0000104, // AU
          color: 0x0000ff, // Blue
          texture: 'europa_texture.png',
          rotationalAngularMomentum: 8.53e28,  // kg m²/s (tidally locked)
          axialTilt: 0,  // tidally locked
          siderealDay: 306806, // 3.551 days in seconds, tidally locked
          k_value: 0.346, // Icy with core
          orbitalElements: {
            a: 0.00450, // AU
            e: 0.0094,
            i: 3.60, // degrees
            Omega: 0, // Assumed
            omega: 0, // Assumed
            M0: 0 // Assumed
          },
          density: 3013, // kg/m³ (NASA JPL Jupiter Fact Sheet)
          surface_gravity: 1.3 // m/s² (NASA JPL Jupiter Fact Sheet)
        },
        {
          name: "Ganymede",
          type: "moon",
          mass: 7.45e-8, // Solar masses
          radius: 0.0000176, // AU
          color: 0x808080, // Gray
          texture: 'ganymede_texture.jpg',
          rotationalAngularMomentum: 1.06e30,  // kg m²/s (tidally locked)
          axialTilt: 0,  // tidally locked
          siderealDay: 618192, // 7.154 days in seconds, tidally locked
          k_value: 0.311, // Differentiated, icy
          orbitalElements: {
            a: 0.00715, // AU
            e: 0.0011,
            i: 3.33, // degrees
            Omega: 0, // Assumed
            omega: 0, // Assumed
            M0: 0 // Assumed
          },
          density: 1942, // kg/m³ (NASA JPL Jupiter Fact Sheet)
          surface_gravity: 1.4 // m/s² (NASA JPL Jupiter Fact Sheet)
        },
        {
          name: "Callisto",
          type: "moon",
          mass: 5.41e-8, // Solar masses
          radius: 0.0000161, // AU
          color: 0x808080, // Gray
          texture: 'callisto_texture.png',
          normalMap: 'normal_map_callisto.png',
          rotationalAngularMomentum: 5.37e29,  // kg m²/s (tidally locked)
          axialTilt: 0,  // tidally locked
          siderealDay: 1442880, // 16.689 days in seconds, tidally locked
          k_value: 0.378, // Less differentiated
          orbitalElements: {
            a: 0.0126, // AU
            e: 0.0074,
            i: 3.32, // degrees
            Omega: 0, // Assumed
            omega: 0, // Assumed
            M0: 0 // Assumed
          },
          density: 1834, // kg/m³ (NASA JPL Jupiter Fact Sheet)
          surface_gravity: 1.2 // m/s² (NASA JPL Jupiter Fact Sheet)
        }
      ],
      density: 1326, // kg/m³ (NASA JPL Planetary Fact Sheet)
      surface_gravity: 23.1 // m/s² (NASA JPL Planetary Fact Sheet, at 1 bar)
    },
    {
      name: "Saturn",
      type: "Gas Giant",
      mass: 0.0002857, // Solar masses
      radius: 0.00039, // AU
      color: 0xffff00, // Yellow
      texture: 'saturn_texture.png',
      ring_texture: 'saturn_ring_texture.png',
      atmosphere_texture: 'atmosphere_saturn_texture.png',
      bump_texture: 'bump_map_saturn.png',
      moonScale: 1,
      moonOrbitScale: 1, //3.5,
      rotationalAngularMomentum: 1.26e38,  // kg m²/s
      axialTilt: 26.73,
      siderealDay: 38366, // 0.44401 days (10h 39m) in seconds
      k_value: 0.21, // Low density, gas giant
      orbitalElements: {
        a: 9.5388, // AU
        e: 0.0541,
        i: 2.48, // degrees
        Omega: 113.66, // degrees
        omega: 339.39, // degrees
        M0: 359.78 // degrees
      },
      rings: 
      [
        {
          inner_radius: 0.000447, // AU
          outer_radius: 0.000914, // AU
          ring_inclination: 2.5 // degrees relative (below) the equatorial plane
        }
      ],
      moons: [
        {
          name: "Titan",
          type: "moon",
          mass: 6.76e-8, // Solar masses
          radius: 0.0000172, // AU
          color: 0x808080, // Gray
          texture: 'titan_texture.png',
          atmosphere_texture: 'atmosphere_titan_texture.jpg',
          rotationalAngularMomentum: 5.66e29,  // kg m²/s (tidally locked)
          axialTilt: 0,  // tidally locked
          siderealDay: 1377648, // 15.945 days in seconds, tidally locked
          k_value: 0.341, // Differentiated, thick atmosphere
          orbitalElements: {
            a: 0.00817, // AU (semi-major axis)
            e: 0.029, // Eccentricity
            i: 27.06, // Inclination (degrees)
            Omega: 78.6, // Longitude of ascending node (degrees)
            omega: 78.3, // Argument of periapsis (degrees)
            M0: 11.7 // Mean anomaly at epoch (degrees)
          },
          density: 1881, // kg/m³ (NASA JPL Saturn Fact Sheet)
          surface_gravity: 1.4 // m/s² (NASA JPL Saturn Fact Sheet)
        },
        {
          name: "Rhea",
          type: "moon",
          mass: 1.16e-9, // Solar masses
          radius: 0.00000511, // AU
          color: 0x808080, // Gray
          texture: 'rhea_texture.jpg',
          moonScale: 1,
          moonOrbitScale: 1,
          rotationalAngularMomentum: 6.45e27,  // kg m²/s (tidally locked)
          axialTilt: 0,  // tidally locked
          siderealDay: 390528, // 4.518 days in seconds, tidally locked
          k_value: 0.391, // Icy, near-uniform
          orbitalElements: {
            a: 0.00352, // AU
            e: 0.001,
            i: 27.08, // degrees
            Omega: 29.7, // degrees
            omega: 274.2, // degrees
            M0: 16.1 // degrees
          },
          density: 1236, // kg/m³ (NASA JPL Saturn Fact Sheet)
          surface_gravity: 0.3 // m/s² (NASA JPL Saturn Fact Sheet)
        },
        {
          name: "Dione",
          type: "moon",
          mass: 5.53e-10, // Solar masses
          radius: 0.00000376, // AU
          color: 0x808080, // Gray
          texture: 'dione_texture.png',
          rotationalAngularMomentum: 5.60e27,  // kg m²/s (tidally locked)
          axialTilt: 0,  // tidally locked
          siderealDay: 236736, // 2.737 days in seconds, tidally locked
          k_value: 0.4, // Assumed uniform
          orbitalElements: {
            a: 0.00252, // AU
            e: 0.002,
            i: 26.78, // degrees
            Omega: 18.3, // degrees
            omega: 257.3, // degrees
            M0: 18.3 // degrees
          },
          density: 1477, // kg/m³ (NASA JPL Saturn Fact Sheet)
          surface_gravity: 0.2 // m/s² (NASA JPL Saturn Fact Sheet)
        },
        {
          name: "Tethys",
          type: "moon",
          mass: 3.11e-10, // Solar masses
          radius: 0.0000036, // AU
          color: 0x808080, // Gray
          texture: 'tethys_texture.jpg',
          rotationalAngularMomentum: 4.81e27,  // kg m²/s (tidally locked)
          axialTilt: 0,  // tidally locked
          siderealDay: 163123, // 1.888 days in seconds, tidally locked
          k_value: 0.4, // Assumed uniform
          orbitalElements: {
            a: 0.00197, // AU
            e: 0.0,
            i: 27.85, // degrees
            Omega: 18.1, // degrees
            omega: 0.0, // degrees
            M0: 0.0 // degrees
          },
          density: 973, // kg/m³ (NASA JPL Saturn Fact Sheet)
          surface_gravity: 0.1 // m/s² (NASA JPL Saturn Fact Sheet)
        },
        {
          name: "Enceladus",
          type: "moon",
          mass: 5.43e-11, // Solar masses
          radius: 0.00000172, // AU
          color: 0x808080, // Gray
          texture: 'enceladus_texture.png',
          rotationalAngularMomentum: 2.66e26,  // kg m²/s (tidally locked)
          axialTilt: 0,  // tidally locked
          siderealDay: 118195, // 1.370 days in seconds, tidally locked
          k_value: 0.4, // Assumed uniform
          orbitalElements: {
            a: 0.00159, // AU
            e: 0.005,
            i: 26.75, // degrees
            Omega: 18.3, // degrees
            omega: 15.3, // degrees
            M0: 18.2 // degrees
          },
          density: 1609, // kg/m³ (NASA JPL Saturn Fact Sheet)
          surface_gravity: 0.1 // m/s² (NASA JPL Saturn Fact Sheet)
        },
        {
          name: "Mimas",
          type: "moon",
          mass: 1.90e-11, // Solar masses
          radius: 0.00000139, // AU
          color: 0x808080, // Gray
          texture: 'mimas_texture.jpg',
          rotationalAngularMomentum: 1.98e26,  // kg m²/s (tidally locked)
          axialTilt: 0,  // tidally locked
          siderealDay: 81734, // 0.946 days in seconds, tidally locked
          k_value: 0.4, // Assumed uniform
          orbitalElements: {
            a: 0.00124, // AU
            e: 0.020,
            i: 28.30, // degrees
            Omega: 329.4, // degrees
            omega: 292.6, // degrees
            M0: 297.5 // degrees
          },
          density: 1149, // kg/m³ (NASA JPL Saturn Fact Sheet)
          surface_gravity: 0.1 // m/s² (NASA JPL Saturn Fact Sheet)
        },
        {
          name: "Iapetus",
          type: "moon",
          mass: 9.05e-10, // Solar masses
          radius: 0.00000491, // AU
          color: 0x808080, // Gray
          texture: 'iapetus_texture.jpg',
          rotationalAngularMomentum: 2.51e27,  // kg m²/s (tidally locked)
          axialTilt: 0,  // tidally locked
          siderealDay: 6858432, // 79.33 days in seconds, tidally locked
          k_value: 0.4, // Assumed uniform
          orbitalElements: {
            a: 0.0238, // AU
            e: 0.028,
            i: 42.40, // degrees
            Omega: 332.4, // degrees
            omega: 163.6, // degrees
            M0: 24.1 // degrees
          },
          density: 1083, // kg/m³ (NASA JPL Saturn Fact Sheet)
          surface_gravity: 0.2 // m/s² (NASA JPL Saturn Fact Sheet)
        }
      ],
      density: 687, // kg/m³ (NASA JPL Planetary Fact Sheet)
      surface_gravity: 9.0 // m/s² (NASA JPL Planetary Fact Sheet, at 1 bar)
    },
    {
      name: "Uranus",
      type: "Ice Giant",
      mass: 0.00004365, // Solar masses
      radius: 0.00017, // AU
      color: 0x0000ff, // Blue
      texture: 'uranus_texture.jpg',
      ring_texture: 'uranus_ring_texture.png',
      moonScale: 1.5,
      moonOrbitScale: 1, //2,
      rotationalAngularMomentum: 2.26e36,  // kg m²/s
      axialTilt: -97.77,  // retrograde
      siderealDay: 62064, // 0.71833 days (17h 14m) in seconds, retrograde
      k_value: 0.225, // Ice giant
      orbitalElements: {
        a: 19.1913, // AU
        e: 0.0472,
        i: 0.77, // degrees
        Omega: 74.01, // degrees
        omega: 96.66, // degrees
        M0: 142.59 // degrees
      },
      rings: 
      [
        {
          inner_radius: 0.00028, // AU
          outer_radius: 0.00069, // AU
          ring_inclination: 0.1 // degrees
        }
      ],
      moons: [
        {
          name: "Titania",
          type: "moon",
          mass: 1.72e-9, // Solar masses
          radius: 0.00000527, // AU
          color: 0x808080, // Gray
          texture: 'titania_texture.jpg',
          rotationalAngularMomentum: 8.40e27,  // kg m²/s (tidally locked)
          axialTilt: 0,
          siderealDay: 752112, // 8.706 days in seconds, tidally locked
          k_value: 0.4, // Assumed uniform
          orbitalElements: {
            a: 0.00292, // AU
            e: 0.0011,
            i: 98, // degrees
            Omega: 0, // Assumed
            omega: 0, // Assumed
            M0: 0 // Assumed
          },
          density: 1718, // kg/m³ (NASA JPL Uranus Fact Sheet)
          surface_gravity: 0.4 // m/s² (NASA JPL Uranus Fact Sheet)
        },
        {
          name: "Oberon",
          type: "moon",
          mass: 1.45e-9, // Solar masses
          radius: 0.00000509, // AU
          color: 0x808080, // Gray
          texture: 'oberon_texture.jpg',
          rotationalAngularMomentum: 5.62e27,  // kg m²/s (tidally locked)
          axialTilt: 0,
          siderealDay: 1162944, // 13.463 days in seconds, tidally locked
          k_value: 0.4, // Assumed uniform
          orbitalElements: {
            a: 0.00390, // AU
            e: 0.0001,
            i: 98, // degrees
            Omega: 0, // Assumed
            omega: 0, // Assumed
            M0: 0 // Assumed
          },
          density: 1636, // kg/m³ (NASA JPL Uranus Fact Sheet)
          surface_gravity: 0.3 // m/s² (NASA JPL Uranus Fact Sheet)
        },
        {
          name: "Umbriel",
          type: "moon",
          mass: 6.13e-10, // Solar masses
          radius: 0.00000391, // AU
          color: 0x808080, // Gray
          texture: 'umbriel_texture.png',
          rotationalAngularMomentum: 4.41e27,  // kg m²/s (tidally locked)
          axialTilt: 0,
          siderealDay: 357696, // 4.144 days in seconds, tidally locked
          k_value: 0.4, // Assumed uniform
          orbitalElements: {
            a: 0.00178, // AU
            e: 0.0039,
            i: 98, // degrees
            Omega: 0, // Assumed
            omega: 0, // Assumed
            M0: 0 // Assumed
          },
          density: 1397, // kg/m³ (NASA JPL Uranus Fact Sheet)
          surface_gravity: 0.2 // m/s² (NASA JPL Uranus Fact Sheet)
        },
        {
          name: "Ariel",
          type: "moon",
          mass: 6.48e-10, // Solar masses
          radius: 0.00000389, // AU
          color: 0x808080, // Gray
          rotationalAngularMomentum: 5.81e27,  // kg m²/s (tidally locked)
          axialTilt: 0,
          siderealDay: 217728, // 2.52 days in seconds, tidally locked
          k_value: 0.4, // Assumed uniform
          texture: 'ariel_texture.jpg',
          orbitalElements: {
            a: 0.00128, // AU
            e: 0.0012,
            i: 98, // degrees
            Omega: 0, // Assumed
            omega: 0, // Assumed
            M0: 0 // Assumed
          },
          density: 1519, // kg/m³ (NASA JPL Uranus Fact Sheet)
          surface_gravity: 0.3 // m/s² (NASA JPL Uranus Fact Sheet)
        },
        {
          name: "Miranda",
          type: "moon",
          mass: 3.32e-11, // Solar masses
          radius: 0.00000160, // AU
          color: 0x808080, // Gray
          texture: 'miranda_texture.jpg',
          normalMap: 'normal_map_miranda.png',
          rotationalAngularMomentum: 5.79e26,  // kg m²/s (tidally locked)
          axialTilt: 0,
          siderealDay: 121824, // 1.413 days in seconds, tidally locked
          k_value: 0.4, // Assumed uniform
          orbitalElements: {
            a: 0.000865, // AU
            e: 0.0013,
            i: 98, // degrees
            Omega: 0, // Assumed
            omega: 0, // Assumed
            M0: 0 // Assumed
          },
          density: 1200, // kg/m³ (NASA JPL Uranus Fact Sheet)
          surface_gravity: 0.1 // m/s² (NASA JPL Uranus Fact Sheet)
        }
      ],
      density: 1270, // kg/m³ (NASA JPL Planetary Fact Sheet)
      surface_gravity: 8.7 // m/s² (NASA JPL Planetary Fact Sheet, at 1 bar)
    },
    {
      name: "Neptune",
      type: "Ice Giant",
      mass: 0.00005149, // Solar masses
      radius: 0.000164, // AU
      color: 0x0000ff, // Blue
      texture: 'neptune_texture.jpg',
      ring_texture: 'neptune_ring_texture.png',
      moonScale: 4,
      moonOrbitScale: 1,//3,
      rotationalAngularMomentum: 2.69e36,  // kg m²/s
      axialTilt: 28.32,
      siderealDay: 58008, // 0.67125 days (16h 6m) in seconds
      k_value: 0.23, // Ice giant
      orbitalElements: {
        a: 30.0691, // AU
        e: 0.0086,
        i: 1.77, // degrees
        Omega: 131.78, // degrees
        omega: 272.85, // degrees
        M0: 260.24 // degrees
      },
      rings: 
      [
        {
          inner_radius: 0.00028, // AU
          outer_radius: 0.00042, // AU
          ring_inclination: 0.1 // degrees relative (below) to the euatorial plane
        }
      ],
      moons: [
        {
          name: "Triton",
          type: "moon",
          mass: 1.08e-8, // Solar masses (~2.14e22 kg; was 1.08e-7, 10× too high vs density/g)
          radius: 0.00000905, // AU
          color: 0x808080, // Gray
          // Celestia VT under textures_*/Triton/ (stitched at runtime, capped 8K×4K)
          texture: {
            type: 'celestia-vt',
            ctx: 'Triton.ctx'
          },
          moonScale: 1,
          moonOrbitScale: 1,
          rotationalAngularMomentum: 2.02e28,  // kg m²/s (retrograde, tidally locked)
          axialTilt: 156.8,  // retrograde, relative to Neptune’s equator
          siderealDay: 507600, // 5.8766 days in seconds, tidally locked
          k_value: 0.35, // Differentiated, icy
          orbitalElements: {
            a: 0.00355, // AU
            e: 0.0,
            i: 124.85, // degrees
            Omega: 0, // Assumed
            omega: 0, // Assumed
            M0: 0 // Assumed
          },
          density: 2066, // kg/m³ (NASA JPL Neptune Fact Sheet)
          surface_gravity: 0.8 // m/s² (NASA JPL Neptune Fact Sheet)
        },
        {
          name: "Nereid",
          type: "moon",
          mass: 1.51e-11, // Solar masses
          radius: 0.00000114, // AU
          color: 0x808080, // Gray
          rotationalAngularMomentum: 5.47e24,  // kg m²/s (non-synchronous, estimated)
          axialTilt: 0,  // unknown, assumed negligible
          siderealDay: 41472, // ~11.52 hours (estimated, not tidally locked)
          k_value: 0.4, // Assumed uniform
          orbitalElements: {
            a: 0.0357, // AU
            e: 0.7512,
            i: 35.55, // degrees
            Omega: 0, // Assumed
            omega: 0, // Assumed
            M0: 0 // Assumed
          },
          density: 1500, // kg/m³ (NASA JPL estimate, approximate)
          surface_gravity: 0.07 // m/s² (NASA JPL estimate, approximate)
        },
        {
          name: "Proteus",
          type: "moon",
          mass: 2.51e-11, // Solar masses
          radius: 0.00000147, // AU
          color: 0x808080, // Gray
          texture: 'proteus_texture.png',
          rotationalAngularMomentum: 2.18e26,  // kg m²/s (tidally locked)
          axialTilt: 0,
          siderealDay: 96768, // 1.12 days in seconds, tidally locked
          k_value: 0.4, // Assumed uniform
          orbitalElements: {
            a: 0.00118, // AU
            e: 0.0004,
            i: 28.36, // degrees
            Omega: 0, // Assumed
            omega: 0, // Assumed
            M0: 0 // Assumed
          },
          density: 1300, // kg/m³ (NASA JPL Neptune Fact Sheet, approximate)
          surface_gravity: 0.07 // m/s² (NASA JPL Neptune Fact Sheet, approximate)
        },
        {
          name: "Larissa",
          type: "moon",
          mass: 2.51e-12, // Solar masses
          radius: 0.00000072, // AU
          color: 0x808080, // Gray
          texture: 'larissa_texture.png',
          rotationalAngularMomentum: 5.17e25,  // kg m²/s (tidally locked)
          axialTilt: 0,
          siderealDay: 47693, // 0.554 days in seconds, tidally locked
          k_value: 0.4, // Assumed uniform
          orbitalElements: {
            a: 0.000736, // AU
            e: 0.0014,
            i: 28.52, // degrees
            Omega: 0, // Assumed
            omega: 0, // Assumed
            M0: 0 // Assumed
          },
          density: 1300, // kg/m³ (NASA JPL estimate, approximate)
          surface_gravity: 0.03 // m/s² (NASA JPL estimate, approximate)
        },
        {
          name: "Despina",
          type: "moon",
          mass: 1.00e-12, // Solar masses
          radius: 0.00000060, // AU
          color: 0x808080, // Gray
          rotationalAngularMomentum: 3.58e25,  // kg m²/s (tidally locked)
          axialTilt: 0,
          siderealDay: 28944, // 0.335 days in seconds, tidally locked
          k_value: 0.4, // Assumed uniform
          orbitalElements: {
            a: 0.000635, // AU
            e: 0.0001,
            i: 28.54, // degrees
            Omega: 0, // Assumed
            omega: 0, // Assumed
            M0: 0 // Assumed
          },
          density: 1300, // kg/m³ (NASA JPL estimate, approximate)
          surface_gravity: 0.02 // m/s² (NASA JPL estimate, approximate)
        },
        {
          name: "Galatea",
          type: "moon",
          mass: 1.00e-12, // Solar masses
          radius: 0.00000068, // AU
          color: 0x808080, // Gray
          rotationalAngularMomentum: 3.21e25,  // kg m²/s (tidally locked)
          axialTilt: 0,
          siderealDay: 37210, // 0.43 days in seconds, tidally locked
          k_value: 0.4, // Assumed uniform
          orbitalElements: {
            a: 0.000629, // AU
            e: 0.0001,
            i: 28.37, // degrees
            Omega: 0, // Assumed
            omega: 0, // Assumed
            M0: 0 // Assumed
          },
          density: 1300, // kg/m³ (NASA JPL estimate, approximate)
          surface_gravity: 0.02 // m/s² (NASA JPL estimate, approximate)
        }
      ],
      density: 1638, // kg/m³ (NASA JPL Planetary Fact Sheet)
      surface_gravity: 11.0 // m/s² (NASA JPL Planetary Fact Sheet, at 1 bar)
    },
    // Dwarf Planets
    
    {
      name: "Pluto",
      type: "Dwarf",
      mass: 6.59e-9, // Solar masses
      radius: 7.94e-6, // AU
      color: 0x8B4513, // Saddle brown
      texture: 'pluto_texture.png',
      atmosphere_texture: 'atmosphere_pluto_texture.png',
      normalMap: 'normal_map_pluto.png',
      moonScale: 2,
      moonOrbitScale: 1,//2, //10,
      rotationalAngularMomentum: 2.22e28,  // kg m²/s (based on 6.39 day rotation)
      axialTilt: 119.6,
      siderealDay: 551857, // 6.38723 days in seconds
      k_value: 0.35, // Rocky/icy, assumed
      orbitalElements: {
        a: 39.482, // AU
        e: 0.2488,
        i: 17.14, // degrees
        Omega: 110.30, // degrees
        omega: 113.76, // degrees
        M0: 14.53 // degrees
      },
      moons: [
        {
          name: "Charon",
          type: "moon",
          mass: 7.97e-10, // Solar masses
          radius: 0.00000405, // AU
          color: 0x808080, // Gray (placeholder; could adjust for two-toned nature)
          texture: 'charon_texture.png',
          atmosphere_texture: 'atmosphere_charon_texture.png',
          normalMap: 'normal_map_charon.png',
          rotationalAngularMomentum: 2.62e27,  // kg m²/s (tidally locked to Pluto)
          axialTilt: 0,  // tidally locked to Pluto
          siderealDay: 551857, // 6.38723 days in seconds, tidally locked to Pluto
          k_value: 0.38, // Icy, partially differentiated
          orbitalElements: {
            a: 0.000131, // AU
            e: 0.0002,
            i: 119.6, // degrees
            Omega: 223.046, // degrees (real value)
            omega: 175.84, // degrees (real value)
            M0: 0 // degrees (placeholder)
          },
          density: 1702, // kg/m³ (NASA JPL Pluto Fact Sheet, New Horizons)
          surface_gravity: 0.3 // m/s² (NASA JPL Pluto Fact Sheet, New Horizons)
        }
      ],
      density: 1850, // kg/m³ (NASA JPL Planetary Fact Sheet)
      surface_gravity: 0.7 // m/s² (NASA JPL Planetary Fact Sheet)
    },
    {
      name: "Haumea",
      type: "Dwarf",
      mass: 2.01e-9, // Solar masses
      radius: 4.14e-6, // AU
      color: 0xFFFFFF, // White
      texture: 'haumea_texture.jpg',
      moonScale: 1,
      moonOrbitScale: 1,
      rotationalAngularMomentum: 2.11e28,  // kg m²/s (based on ~3.9 hr rotation)
      axialTilt: 0,  // unknown, assumed small
      siderealDay: 14040, // 3.915 hours in seconds
      k_value: 0.36, // Elongated, icy, assumed
      orbitalElements: {
        a: 43.335, // AU
        e: 0.189,
        i: 28.19, // degrees
        Omega: 121.79, // degrees
        omega: 239.04, // degrees
        M0: 207.92 // degrees
      },
      moons: [],
      density: 2600, // kg/m³ (NASA JPL estimate, approximate due to elongated shape)
      surface_gravity: 0.4 // m/s² (NASA JPL estimate, approximate)
    },
    {
      name: "Makemake",
      type: "Dwarf",
      mass: 1.56e-9, // Solar masses
      radius: 4.78e-6, // AU
      color: 0xD2B48C, // Tan
      texture: 'makemake_texture.jpg',
      moonScale: 1,
      moonOrbitScale: 1,
      rotationalAngularMomentum: 6.08e27,  // kg m²/s (based on ~22.8 hr rotation)
      axialTilt: 0,  // unknown, assumed small
      siderealDay: 82080, // 22.8 hours in seconds
      k_value: 0.35, // Icy, assumed
      orbitalElements: {
        a: 45.791, // AU
        e: 0.159,
        i: 29.01, // degrees
        Omega: 79.36, // degrees
        omega: 297.24, // degrees
        M0: 142.97 // degrees
      },
      moons: [],
      density: 1700, // kg/m³ (NASA JPL estimate, approximate)
      surface_gravity: 0.5 // m/s² (NASA JPL estimate, approximate)
    },
    {
      name: "Eris",
      type: "Dwarf",
      texture: 'eris_texture.jpg',
      mass: 8.34e-9, // Solar masses
      radius: 7.77e-6, // AU
      color: 0xADD8E6, // Light blue
      moonScale: 1,
      moonOrbitScale: 1,
      rotationalAngularMomentum: 2.38e28,  // kg m²/s (based on ~25.9 hr rotation)
      axialTilt: 0,  // unknown, assumed small
      siderealDay: 93240, // 25.9 hours in seconds
      k_value: 0.35, // Icy, assumed
      orbitalElements: {
        a: 67.781, // AU
        e: 0.440,
        i: 44.04, // degrees
        Omega: 35.95, // degrees
        omega: 150.98, // degrees
        M0: 205.99 // degrees
      },
      moons: [],
      density: 2310, // kg/m³ (NASA JPL estimate, New Horizons-era data)
      surface_gravity: 0.8 // m/s² (NASA JPL estimate)
    },
    // Add these to the 'bodies' array in solar_constants.js

{
  name: "Bacchus",
  type: "asteroid",
  mass: 1.230e-18, // Estimated, ~1.5e12 kg
  radius: 4.01e-9, // ~0.6 km mean radius
  color: 0x8B4513, // S-type, reddish-brown
  texture: "asteroid/bacchus.dds",
  moonScale: 1,
  moonOrbitScale: 1,
  rotationalAngularMomentum: 1.2e23, // Estimated
  axialTilt: 0, // Unknown, assumed
  siderealDay: 54000, // ~15 hrs, estimated
  k_value: 0.4, // Rubble pile
  density: 2710, // S-type
  surface_gravity: 0.0002, // Estimated
  orbitalElements: {
    a: 1.077978810322309,
    e: 0.349449573190996,
    i: 9.435116327738598,
    Omega: 33.03894819784168,
    omega: 55.34113913312171,
    M0: 58.67697192648382
  },
  moons: [],
  mesh: "bacchus.glb"
},
{
  name: "Castalia",
  type: "asteroid",
  mass: 2.920e-18, // ~7.5e11 kg
  radius: 5.35e-9, // ~0.8 km
  color: 0x8B4513, // S-type
  texture: "asteroid/castalia.dds",
  moonScale: 1,
  moonOrbitScale: 1,
  rotationalAngularMomentum: 5.0e22, // Estimated
  axialTilt: 0, // Unknown
  siderealDay: 14400, // ~4 hrs
  k_value: 0.4,
  density: 2710, // S-type
  surface_gravity: 0.0001,
  orbitalElements: {
    a: 1.063209500589013,
    e: 0.4831578587846303,
    i: 8.886113533141238,
    Omega: 121.5833483888428,
    omega: 325.5921692253928,
    M0: 313.6020925666297
  },
  moons: [],
  mesh: "castalia.glb"
},
{
  name: "Eros",
  type: "asteroid",
  mass: 3.360e-15, // ~6.69e15 kg
  radius: 5.63e-8, // ~8.42 km
  color: 0x8B4513, // S-type
  texture: "asteroid/eros2.dds",
  moonScale: 1,
  moonOrbitScale: 1,
  rotationalAngularMomentum: 1.8e25, // ~5.27 hrs
  axialTilt: 10, // Estimated
  siderealDay: 18972, // 5.27 hrs
  k_value: 0.4,
  density: 2670, // Measured
  surface_gravity: 0.0059,
  orbitalElements: {
    a: 1.457815891763328,
    e: 0.2228203924944679,
    i: 10.82879878985265,
    Omega: 304.2833126140998,
    omega: 178.8893367501919,
    M0: 213.3115067981279
  },
  moons: [],
  mesh: "eros.glb"
},
{
  name: "Gaspra",
  type: "asteroid",
  mass: 1.300e-15, // ~1e16 kg
  radius: 4.08e-8, // ~6.1 km
  color: 0x8B4513, // S-type
  texture: "asteroid/gaspra.dds",
  moonScale: 1,
  moonOrbitScale: 1,
  rotationalAngularMomentum: 2.0e25, // ~7 hrs
  axialTilt: 0,
  siderealDay: 25320, // 7.042 hrs
  k_value: 0.4,
  density: 2710, // S-type
  surface_gravity: 0.004,
  orbitalElements: {
    a: 2.209493717282101,
    e: 0.1736143021167021,
    i: 4.100937849875426,
    Omega: 253.1358930528564,
    omega: 129.5483663763446,
    M0: 111.2930650540081
  },
  moons: [],
  mesh: "gaspra.glb"
},
{
  name: "Geographos",
  type: "asteroid",
  mass: 1.120e-17, // ~4e12 kg
  radius: 8.36e-9, // ~2 km
  color: 0x8B4513, // S-type
  texture: "asteroid/geographos.dds",
  moonScale: 1,
  moonOrbitScale: 1,
  rotationalAngularMomentum: 2.5e23, // ~5.22 hrs
  axialTilt: 0,
  siderealDay: 18792, // 5.222 hrs
  k_value: 0.4,
  density: 2710, // S-type
  surface_gravity: 0.0005,
  orbitalElements: {
    a: 1.245407492680553,
    e: 0.3356198466833917,
    i: 13.33775904748304,
    Omega: 337.2382975999844,
    omega: 276.8585131350808,
    M0: 306.0643525139814
  },
  moons: [],
  mesh: "geographos.glb"
},
{
  name: "Golevka",
  type: "asteroid",
  mass: 8.900e-20, // ~1.5e12 kg
  radius: 1.67e-9, // ~0.5 km
  color: 0x8B4513, // S-type
  texture: "asteroid/golevka.dds",
  moonScale: 1,
  moonOrbitScale: 1,
  rotationalAngularMomentum: 1.0e23, // Estimated
  axialTilt: 0,
  siderealDay: 21600, // ~6 hrs, estimated
  k_value: 0.4,
  density: 2710, // S-type
  surface_gravity: 0.0003,
  orbitalElements: {
    a: 2.516672963615626,
    e: 0.6080045869993968,
    i: 2.275013234537672,
    Omega: 65.55789739139128,
    omega: 210.4048803224947,
    M0: 83.86531818653348
  },
  moons: [],
  mesh: "golevka.glb"
},
{
  name: "Ida",
  type: "asteroid",
  mass: 2.110e-14, // ~4.2e16 kg
  radius: 1.05e-7, // ~15.7 km
  color: 0x8B4513, // S-type
  texture: "asteroid/ida.dds",
  moonScale: 10,
  moonOrbitScale: 10,
  rotationalAngularMomentum: 8.0e25, // ~4.63 hrs
  axialTilt: 0,
  siderealDay: 16668, // 4.633 hrs
  k_value: 0.4,
  density: 2600, // Measured
  surface_gravity: 0.01,
  orbitalElements: {
    a: 2.860827628028299,
    e: 0.04511384411233205,
    i: 1.137421632174051,
    Omega: 324.2204107324366,
    omega: 110.9278111479991,
    M0: 287.5948042464729
  },
  moons: [
    {
      name: "Dactyl",
      type: "moon",
      mass: 5.03e-19,//2.11e-17, // ~4.2e13 kg
      radius: 4.68e-9, // ~1.4 km
      color: 0x8B4513, // Similar to Ida
      texture: "/asteroid/dactyl.dds", // No specific texture available
      mesh: "dactyl.glb",
      rotationalAngularMomentum: 1.16e22, // Estimated, tidally locked
      axialTilt: 0, // Assumed aligned with Ida
      siderealDay: 16668, // 4.63 hrs, tidally locked to Ida
      k_value: 0.4, // Assumed uniform
      orbitalElements: {
        a: 0.000000602, // ~90 km
        e: 0.0, // Assumed circular
        i: 8.5, // Assumed coplanar with Ida’s equator
        Omega: 0, // Arbitrary
        omega: 0, // Arbitrary
        M0: 0 // Arbitrary
      },
      density: 2600, // Assumed similar to Ida
      surface_gravity: 0.001 // Estimated
    }
  ],
  mesh: "ida.glb"
},
{
  name: "Juno",
  type: "asteroid",
  mass: 1.340e-12, // ~2e16 kg
  radius: 8.49e-7, // ~234 km
  color: 0x8B4513, // S-type
  texture: "asteroid/juno.dds",
  moonScale: 1,
  moonOrbitScale: 1,
  rotationalAngularMomentum: 5.0e27, // ~7.21 hrs
  axialTilt: 0,
  siderealDay: 25956, // 7.21 hrs
  k_value: 0.37, // Differentiated
  density: 2710, // S-type
  surface_gravity: 0.12,
  orbitalElements: {
    a: 2.668698975796075,
    e: 0.2559348917747177,
    i: 12.99196748841102,
    Omega: 169.8395207361778,
    omega: 248.1385894938287,
    M0: 256.2700925120947
  },
  moons: [],
  mesh: "juno.glb"
},
{
  name: "Kleopatra",
  type: "asteroid",
  mass: 2.330e-12, // ~4.7e15 kg
  radius: 4.51e-7, // ~108.5 km
  color: 0x808080, // M-type, metallic gray
  texture: "asteroid/kleopatra.dds",
  moonScale: 1,
  moonOrbitScale: 1,
  rotationalAngularMomentum: 1.2e27, // ~5.385 hrs
  axialTilt: 0,
  siderealDay: 19386, // 5.385 hrs
  k_value: 0.45, // Metallic
  density: 5320, // M-type
  surface_gravity: 0.03,
  orbitalElements: {
    a: 2.794008374621022,
    e: 0.2528760916060135,
    i: 13.11224929588441,
    Omega: 215.3542491043159,
    omega: 76.83157383698542,
    M0: 16.58361483551747
  },
  moons: [],
  mesh: "kleopatra.glb"
},
{
  name: "1998 KY26",
  type: "asteroid",
  mass: 1.920e-20, // ~2.7e10 kg
  radius: 1.00e-10, // ~30 meters
  color: 0x8B4513, // S-type, reddish-brown (potentially metallic X-type)
  texture: "asteroid/ky26.dds", // No specific texture available
  objectScale: 10,
  moonScale: 1,
  moonOrbitScale: 1,
  rotationalAngularMomentum: 3.54e18, // ~10.7 minutes
  axialTilt: 0, // Unknown, assumed negligible
  siderealDay: 642, // 10.7 minutes
  k_value: 0.4, // Assumed uniform (monolithic)
  density: 2710, // S-type assumption
  surface_gravity: 0.00001, // Estimated
  orbitalElements: {
    a: 1.2328523, // AU
    e: 0.2018024,
    i: 1.48097, // degrees
    Omega: 83.7053, // degrees
    omega: 209.3722, // degrees
    M0: 152.4478 // degrees (J2000 epoch)
  },
  moons: [],
  mesh: "ky26.glb" // No mesh available
},
{
  name: "Mathilde",
  type: "asteroid",
  mass: 5.190e-14, // ~1.033e17 kg
  radius: 1.77e-7, // ~26.5 km
  color: 0x808080, // C-type, gray
  texture: "asteroid/mathilde.dds",
  moonScale: 1,
  moonOrbitScale: 1,
  rotationalAngularMomentum: 1.0e26, // ~417.7 hrs
  axialTilt: 0,
  siderealDay: 1503720, // 417.7 hrs
  k_value: 0.4,
  density: 1300, // C-type
  surface_gravity: 0.01,
  orbitalElements: {
    a: 2.646238144852991,
    e: 0.266009849833683,
    i: 6.735614813787456,
    Omega: 179.6397675121478,
    omega: 156.7141535861456,
    M0: 112.9931140985974
  },
  moons: [],
  mesh: "mathilde.glb"
},
{
  name: "Pallas",
  type: "asteroid",
  mass: 1.03e-10, // ~2.05e20 kg
  radius: 1.71e-6, // ~272 km
  color: 0x808080, // C-type
  texture: "asteroid/pallas.dds",
  moonScale: 1,
  moonOrbitScale: 1,
  rotationalAngularMomentum: 6.0e28, // ~7.813 hrs
  axialTilt: 0,
  siderealDay: 28128, // 7.813 hrs
  k_value: 0.37,
  density: 1380, // C-type
  surface_gravity: 0.18,
  orbitalElements: {
    a: 2.770193724898379,
    e: 0.2305403909377643,
    i: 34.92402104502746,
    Omega: 172.8953075413112,
    omega: 310.910359534388,
    M0: 168.7987109638817
  },
  moons: [],
  mesh: "pallas.glb"
},
{
  name: "Toutatis",
  type: "asteroid",
  mass: 2.510e-17, // ~5e13 kg
  radius: 8.36e-9, // ~2.5 km
  color: 0x8B4513, // S-type
  texture: "asteroid/toutatis.dds",
  moonScale: 1,
  moonOrbitScale: 1,
  rotationalAngularMomentum: 1.0e25, // Complex, ~130 hrs
  axialTilt: 0,
  siderealDay: 468000, // ~130 hrs
  k_value: 0.4,
  density: 2710, // S-type
  surface_gravity: 0.0002,
  orbitalElements: {
    a: 2.529947290519312,
    e: 0.6295330868850405,
    i: 0.446439667991445,
    Omega: 278.6533577667747,
    omega: 128.6971551103996,
    M0: 20.61142728509846
  },
  moons: [],
  mesh: "toutatis.glb"
},
{
  name: "Vesta",
  type: "asteroid",
  mass: 1.3e-10, // ~2.59e20 kg
  radius: 1.76e-6, // ~262.7 km
  color: 0x808080, // V-type (basaltic), gray
  texture: "asteroid/vesta.dds",
  moonScale: 1,
  moonOrbitScale: 1,
  rotationalAngularMomentum: 7.0e28, // ~5.342 hrs
  axialTilt: 0,
  siderealDay: 19231, // 5.342 hrs
  k_value: 0.35, // Differentiated
  density: 3456, // Measured
  surface_gravity: 0.25,
  orbitalElements: {
    a: 2.361592888047149,
    e: 0.08862476726002632,
    i: 7.140969832951093,
    Omega: 103.8103268732564,
    omega: 150.7285055892477,
    M0: 101.3395890116502
  },
  moons: [],
  mesh: "vesta.glb"
}
];

