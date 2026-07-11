/*Units
Volume: m^3
Surface_Pressure: Pa
Escape_Velocity: m/s
Temp_Avg: °C
Temp_Daily_Low: °C
Temp_Daily_High: °C
Wind_Speed: m/s
Solar_Irradiance: W/m^2
*/


const moleculeLookup = {
    "H": 'Hydrogen',
    "He": 'Helium',
    "O": 'Oxygen',
    "C": 'Carbon',
    "Ne": 'Neon',
    "N": 'Nitrogen',
    "Fe": 'Iron',
    "Mg": 'Magnesium',
    "Si": 'Silicon',
    "S": 'Sulfer',
    "Na": 'Sodium',
    "N<SUB>2</SUB>":'Molecular Nitrogen',
    "O<SUB>2</SUB>": 'Molecular Oxygen',
    "Ar": 'Argon',
    "CO<sub>2</sub>": 'Carbon Dioxide',
    "CO": 'Carbon Monoxide',
    "SO<sub>2</sub>": 'Sulfur Dioxide',
    "H<SUB>2</SUB>": 'Molecular Hydrogen',
    "H<sub>2</sub>": 'Molecular Hydrogen',
    "CH<SUB>4</SUB>":'Methane',
    "NH<SUB>3</SUB>": 'Ammonia',
    "H<SUB>2</SUB>O": 'Water'
}
const celestialBodyScientificInfo = {
    "Sun": {
      "Volume": 1.412e27, // m^3
      "Surface_Pressure": 86.8, // Pa
      "Escape_Velocity": 617600, // m/s
      "Temp_Avg": 5772, // K
      "Temp_Daily_Low": null,
      "Temp_Daily_High": null,
      "Wind_Speed_Avg": null,
      "Num_Of_Satellite": 0,
      "Solar_Irradiance": null,
      "J2_Perturbation": null,
      "k_value": "Sun",
      "Atmospheric_Comp": {
        "H": 90.965,
        "He": 8.889,
        "O": 0.0774,
        "C": 0.033,
        "Ne": 0.0112,
        "N": 0.0102,
        "Fe": 0.0043,
        "Mg": 0.0035,
        "Si": 0.0032,
        "S": 0.0015
      }
    },
    "Mercury": {
      "Volume": 6.083e19, // m^3
      "Surface_Pressure": 0, // Pa
      "Escape_Velocity": 4300, // m/s
      "Temp_Avg": 167, // °C
      "Temp_Daily_Low": -173, // °C
      "Temp_Daily_High": 427, // °C
      "Wind_Speed_Avg": 0, // m/s
      "Num_Of_Satellite": 0,
      "Solar_Irradiance": 9090, // W/m^2
      "J2_Perturbation": 50.3e-6,
      "k_value": "Mercury",
      "Atmospheric_Comp": null
    },
    "Venus": {
      "Volume": 9.284e20, // m^3
      "Surface_Pressure": 9.2e6, // Pa
      "Escape_Velocity": 10400, // m/s
      "Temp_Avg": 464, // °C
      "Temp_Daily_Low": 464, // °C
      "Temp_Daily_High": 464, // °C
      "Wind_Speed_Avg": 0.65, // m/s
      "Num_Of_Satellite": 0,
      "Solar_Irradiance": 2600, // W/m^2
      "J2_Perturbation": 4.458e-6,
      "k_value": "Venus",
      "Atmospheric_Comp": {
        "CO<sub>2</sub>": 96.5,
        "N<SUB>2</SUB>": 3.5,
        "SO<sub>2</sub>": 0.015,
        "Ar": 0.007,
        "H<SUB>2</SUB>O": 0.002,
        "CO": 0.0017,
        "He": 0.0012,
        "Ne": 0.0007
      }
    },
    "Earth": {
      "Volume": 1.08321e21, // m^3
      "Surface_Pressure": 101325, // Pa
      "Escape_Velocity": 11186, // m/s
      "Temp_Avg": 15, // °C
      "Temp_Daily_Low": -89.2, // °C
      "Temp_Daily_High": 56.7, // °C
      "Wind_Speed_Avg": 5, // m/s
      "Num_Of_Satellite": 1,
      "Solar_Irradiance": 1361, // W/m^2
      "J2_Perturbation": 1082.63e-6,
      "k_value": "Earth",
      "Atmospheric_Comp": {
        "N<SUB>2</SUB>": 78.08,
        "O<SUB>2</SUB>": 20.95,
        "Ar": 0.93,
        "CO<sub>2</sub>": 0.04
      }
    },
    "Mars": {
      "Volume": 1.631e20, // m^3
      "Surface_Pressure": 1000, // Pa
      "Escape_Velocity": 5000, // m/s
      "Temp_Avg": -65, // °C
      "Temp_Daily_Low": -89, // °C
      "Temp_Daily_High": -31, // °C
      "Wind_Speed_Avg": 5, // m/s
      "Num_Of_Satellite": 2,
      "Solar_Irradiance": 585, // W/m^2
      "J2_Perturbation": 1960.45e-6,
      "k_value": "Mars",
      "Atmospheric_Comp": {
        "CO<sub>2</sub>": 95.1,
        "N<SUB>2</SUB>": 2.6,
        "Ar": 1.9,
        "O<SUB>2</SUB>": 0.174,
        "CO": 0.0747,
        "H<SUB>2</SUB>O": 0.03
      }
    },
    "Jupiter": {
      "Volume": 1.431e24, // m^3
      "Surface_Pressure": null, // not defined
      "Escape_Velocity": 59500, // m/s
      "Temp_Avg": -110, // °C at 1 bar
      "Temp_Daily_Low": null,
      "Temp_Daily_High": null,
      "Wind_Speed_Avg": 50, // m/s
      "Num_Of_Satellite": 95,
      "Solar_Irradiance": 50, // W/m^2
      "J2_Perturbation": 14736e-6,
      "k_value": "Jupiter",
      "Atmospheric_Comp": {
        "H<SUB>2</SUB>": 89.8,
        "He": 10.2,
        "CH<SUB>4</SUB>": 0.3,
        "NH<SUB>3</SUB>": 0.026
      }
    },
    "Saturn": {
      "Volume": 8.271e23, // m^3
      "Surface_Pressure": null,
      "Escape_Velocity": 35500,
      "Temp_Avg": -140,
      "Temp_Daily_Low": null,
      "Temp_Daily_High": null,
      "Wind_Speed_Avg": 400,
      "Num_Of_Satellite": 274,
      "Solar_Irradiance": 15,
      "J2_Perturbation": 16290e-6,
      "k_value": "Saturn",
      "Atmospheric_Comp": {
        "H<SUB>2</SUB>": 96.3,
        "He": 3.25,
        "CH<SUB>4</SUB>": 0.45,
        "NH<SUB>3</SUB>": 0.0125
      }
    },
    "Uranus": {
      "Volume": 6.833e22,
      "Surface_Pressure": null,
      "Escape_Velocity": 21300,
      "Temp_Avg": -195,
      "Temp_Daily_Low": null,
      "Temp_Daily_High": null,
      "Wind_Speed_Avg": 250,
      "Num_Of_Satellite": 28,
      "Solar_Irradiance": 3.7,
      "J2_Perturbation": 3343.43e-6,
      "k_value": "Uranus",
      "Atmospheric_Comp": {
        "H<SUB>2</SUB>": 82.5,
        "He": 15.2,
        "CH<SUB>4</SUB>": 2.3
      }
    },
    "Neptune": {
      "Volume": 6.254e22,
      "Surface_Pressure": null,
      "Escape_Velocity": 23500,
      "Temp_Avg": -200,
      "Temp_Daily_Low": null,
      "Temp_Daily_High": null,
      "Wind_Speed_Avg": 260,
      "Num_Of_Satellite": 16,
      "Solar_Irradiance": 1.5,
      "J2_Perturbation": 3411e-6,
      "k_value": "Neptune",
      "Atmospheric_Comp": {
        "H<SUB>2</SUB>": 80.0,
        "He": 19.0,
        "CH<SUB>4</SUB>": 1.5
      }
    },
    "Pluto": {
      "Volume": 7.032e18,
      "Surface_Pressure": 1,
      "Escape_Velocity": 1300,
      "Temp_Avg": -225,
      "Temp_Daily_Low": -240,
      "Temp_Daily_High": -218,
      "Wind_Speed_Avg": 1,
      "Num_Of_Satellite": 5,
      "Solar_Irradiance": 0.87,
      "J2_Perturbation": null,
      "k_value": "Pluto",
      "Atmospheric_Comp": {
        "N<SUB>2</SUB>": 99.97,
        "CH<SUB>4</SUB>": 0.025,
        "CO": 0.005
      }
    },
    "Ceres": {
      "Volume": 4.34e17,
      "Surface_Pressure": 0,
      "Escape_Velocity": 517,
      "Temp_Avg": -38,
      "Temp_Daily_Low": -93,
      "Temp_Daily_High": -33,
      "Wind_Speed_Avg": 0,
      "Num_Of_Satellite": 0,
      "Solar_Irradiance": 177,
      "J2_Perturbation": null,
      "k_value": "Ceres",
      "Atmospheric_Comp": null
    },
    "Haumea": {
      "Volume": 1.0e18,
      "Surface_Pressure": 0,
      "Escape_Velocity": 929,
      "Temp_Avg": -240,
      "Temp_Daily_Low": -243,
      "Temp_Daily_High": -233,
      "Wind_Speed_Avg": 0,
      "Num_Of_Satellite": 2,
      "Solar_Irradiance": 0.74,
      "J2_Perturbation": null,
      "k_value": "Haumea",
      "Atmospheric_Comp": null
    },
    "Makemake": {
      "Volume": 1.53e18,
      "Surface_Pressure": 0,
      "Escape_Velocity": 761,
      "Temp_Avg": -240,
      "Temp_Daily_Low": -243,
      "Temp_Daily_High": -233,
      "Wind_Speed_Avg": 0,
      "Num_Of_Satellite": 1,
      "Solar_Irradiance": 0.65,
      "J2_Perturbation": null,
      "k_value": "Makemake",
      "Atmospheric_Comp": null
    },
    "Eris": {
      "Volume": 6.59e18,
      "Surface_Pressure": 0,
      "Escape_Velocity": 1380,
      "Temp_Avg": -250,
      "Temp_Daily_Low": -253,
      "Temp_Daily_High": -247,
      "Wind_Speed_Avg": 0,
      "Num_Of_Satellite": 1,
      "Solar_Irradiance": 0.3,
      "J2_Perturbation": null,
      "k_value": "Eris",
      "Atmospheric_Comp": null
    },
    "Phobos": {
      "Volume": 5.78e12, // approximate
      "Surface_Pressure": 0,
      "Escape_Velocity": 11.3,
      "Temp_Avg": -60,
      "Temp_Daily_Low": -150,
      "Temp_Daily_High": 20,
      "Wind_Speed_Avg": 0,
      "Num_Of_Satellite": 0,
      "Solar_Irradiance": 585,
      "J2_Perturbation": null,
      "k_value": "Phobos",
      "Atmospheric_Comp": null
    },
    "Deimos": {
      "Volume": 9.98e11, // approximate
      "Surface_Pressure": 0,
      "Escape_Velocity": 5.6, // approximate
      "Temp_Avg": -60,
      "Temp_Daily_Low": -150,
      "Temp_Daily_High": 20,
      "Wind_Speed_Avg": 0,
      "Num_Of_Satellite": 0,
      "Solar_Irradiance": 585,
      "J2_Perturbation": null,
      "k_value": "Deimos",
      "Atmospheric_Comp": null
    },
    "Io": {
      "Volume": 2.53e19,
      "Surface_Pressure": 1e-5,
      "Escape_Velocity": 2559,
      "Temp_Avg": -130,
      "Temp_Daily_Low": -183,
      "Temp_Daily_High": 100,
      "Wind_Speed_Avg": 0,
      "Num_Of_Satellite": 0,
      "Solar_Irradiance": 50,
      "J2_Perturbation": null,
      "k_value": "Io",
      "Atmospheric_Comp": {"SO<sub>2</sub>": 100}
    },
    "Europa": {
      "Volume": 1.59e19,
      "Surface_Pressure": 1e-7,
      "Escape_Velocity": 2026,
      "Temp_Avg": -160,
      "Temp_Daily_Low": -220,
      "Temp_Daily_High": -100,
      "Wind_Speed_Avg": 0,
      "Num_Of_Satellite": 0,
      "Solar_Irradiance": 50,
      "J2_Perturbation": null,
      "k_value": "Europa",
      "Atmospheric_Comp": {
        "O<SUB>2</SUB>": 93.9,
        "H<SUB>2</SUB>O": 5,
        "CO<sub>2</sub>": 0.5,
        "H<sub>2</sub>": 0.5,
        "Na": 0.1
      }
    },
    "Ganymede": {
    "Volume": 7.652e19, // m^3
    "Surface_Pressure": 1e-6, // Pa
    "Escape_Velocity": 2741, // m/s
    "Temp_Avg": -163, // °C
    "Temp_Daily_Low": -203, // °C
    "Temp_Daily_High": -121, // °C
    "Wind_Speed_Avg": 0, // m/s
    "Num_Of_Satellite": 0,
    "Solar_Irradiance": 50, // W/m^2
    "J2_Perturbation": null,
    "k_value": "Ganymede",
    "Atmospheric_Comp": {
      "O<SUB>2</SUB>": 100
    }
    },
    "Callisto": {
      "Volume": 5.864e19, // m^3
      "Surface_Pressure": 7.5e-7, // Pa
      "Escape_Velocity": 2441, // m/s
      "Temp_Avg": -139, // °C
      "Temp_Daily_Low": -193, // °C
      "Temp_Daily_High": -108, // °C
      "Wind_Speed_Avg": 0, // m/s
      "Num_Of_Satellite": 0,
      "Solar_Irradiance": 50, // W/m^2
      "J2_Perturbation": null,
      "k_value": "Callisto",
      "Atmospheric_Comp": {
        "O<SUB>2</SUB>": 98,
        "CO<sub>2</sub>": 2
      }
    },
    "Moon": {
      "Volume": 2.1968e19,
      "Surface_Pressure": 3e-10,
      "Escape_Velocity": 2380,
      "Temp_Avg": -20,
      "Temp_Daily_Low": -178,
      "Temp_Daily_High": 117,
      "Wind_Speed_Avg": 0,
      "Num_Of_Satellite": 0,
      "Solar_Irradiance": 1361,
      "J2_Perturbation": null,
      "k_value": "Moon",
      "Atmospheric_Comp": null
    },
    "Mimas": {
      "Volume": 3.3e16,
      "Surface_Pressure": 0,
      "Escape_Velocity": 160,
      "Temp_Avg": -209,
      "Temp_Daily_Low": -220,
      "Temp_Daily_High": -190,
      "Wind_Speed_Avg": 0,
      "Num_Of_Satellite": 0,
      "Solar_Irradiance": 15,
      "J2_Perturbation": null,
      "k_value": "Mimas",
      "Atmospheric_Comp": null
    },
    "Enceladus": {
      "Volume": 6.71e16,
      "Surface_Pressure": 0,
      "Escape_Velocity": 239,
      "Temp_Avg": -198,
      "Temp_Daily_Low": -210,
      "Temp_Daily_High": -180,
      "Wind_Speed_Avg": 0,
      "Num_Of_Satellite": 0,
      "Solar_Irradiance": 15,
      "J2_Perturbation": null,
      "k_value": "Enceladus",
      "Atmospheric_Comp": null
    },
    "Tethys": {
      "Volume": 6.27e17,
      "Surface_Pressure": 0,
      "Escape_Velocity": 394,
      "Temp_Avg": -187,
      "Temp_Daily_Low": -203,
      "Temp_Daily_High": -170,
      "Wind_Speed_Avg": 0,
      "Num_Of_Satellite": 0,
      "Solar_Irradiance": 15,
      "J2_Perturbation": null,
      "k_value": "Tethys",
      "Atmospheric_Comp": null
    },
    "Dione": {
      "Volume": 7.43e17,
      "Surface_Pressure": 0,
      "Escape_Velocity": 511,
      "Temp_Avg": -186,
      "Temp_Daily_Low": -200,
      "Temp_Daily_High": -170,
      "Wind_Speed_Avg": 0,
      "Num_Of_Satellite": 0,
      "Solar_Irradiance": 15,
      "J2_Perturbation": null,
      "k_value": "Dione",
      "Atmospheric_Comp": null
    },
    "Rhea": {
      "Volume": 1.86e18,
      "Surface_Pressure": 0,
      "Escape_Velocity": 635,
      "Temp_Avg": -200,
      "Temp_Daily_Low": -220,
      "Temp_Daily_High": -174,
      "Wind_Speed_Avg": 0,
      "Num_Of_Satellite": 0,
      "Solar_Irradiance": 15,
      "J2_Perturbation": null,
      "k_value": "Rhea",
      "Atmospheric_Comp": null
    },
    "Titan": {
      "Volume": 7.156e19,
      "Surface_Pressure": 147000,
      "Escape_Velocity": 2641,
      "Temp_Avg": -179,
      "Temp_Daily_Low": -179,
      "Temp_Daily_High": -179,
      "Wind_Speed_Avg": 0.5,
      "Num_Of_Satellite": 0,
      "Solar_Irradiance": 15,
      "J2_Perturbation": null,
      "k_value": "Titan",
      "Atmospheric_Comp": {
        "N<SUB>2</SUB>": 94.2,
        "CH<SUB>4</SUB>": 5.65
      }
    },
    "Hyperion": {
      "Volume": 1.02e16,
      "Surface_Pressure": 0,
      "Escape_Velocity": 74,
      "Temp_Avg": -180,
      "Temp_Daily_Low": -200,
      "Temp_Daily_High": -160,
      "Wind_Speed_Avg": 0,
      "Num_Of_Satellite": 0,
      "Solar_Irradiance": 15,
      "J2_Perturbation": null,
      "k_value": "Hyperion",
      "Atmospheric_Comp": null
    },
    "Iapetus": {
      "Volume": 1.66e18,
      "Surface_Pressure": 0,
      "Escape_Velocity": 573,
      "Temp_Avg": -158,
      "Temp_Daily_Low": -180,
      "Temp_Daily_High": -130,
      "Wind_Speed_Avg": 0,
      "Num_Of_Satellite": 0,
      "Solar_Irradiance": 15,
      "J2_Perturbation": null,
      "k_value": "Iapetus",
      "Atmospheric_Comp": null
    },
    "Miranda": {
        "Volume": 5.483e16,
        "Surface_Pressure": 0,
        "Escape_Velocity": 189,
        "Temp_Avg": -213,
        "Temp_Daily_Low": -223,
        "Temp_Daily_High": -189,
        "Wind_Speed_Avg": 0,
        "Num_Of_Satellite": 0,
        "Solar_Irradiance": 3.7,
        "J2_Perturbation": null,
        "k_value": "Miranda",
        "Atmospheric_Comp": null
      },
      "Ariel": {
        "Volume": 8.126e17,
        "Surface_Pressure": 0,
        "Escape_Velocity": 533,
        "Temp_Avg": -213,
        "Temp_Daily_Low": -223,
        "Temp_Daily_High": -189,
        "Wind_Speed_Avg": 0,
        "Num_Of_Satellite": 0,
        "Solar_Irradiance": 3.7,
        "J2_Perturbation": null,
        "k_value": "Ariel",
        "Atmospheric_Comp": null
      },
      "Umbriel": {
        "Volume": 8.37e17,
        "Surface_Pressure": 0,
        "Escape_Velocity": 542,
        "Temp_Avg": -213,
        "Temp_Daily_Low": -223,
        "Temp_Daily_High": -189,
        "Wind_Speed_Avg": 0,
        "Num_Of_Satellite": 0,
        "Solar_Irradiance": 3.7,
        "J2_Perturbation": null,
        "k_value": "Umbriel",
        "Atmospheric_Comp": null
      },
      "Titania": {
        "Volume": 2.05e18,
        "Surface_Pressure": 0,
        "Escape_Velocity": 765,
        "Temp_Avg": -213,
        "Temp_Daily_Low": -223,
        "Temp_Daily_High": -184,
        "Wind_Speed_Avg": 0,
        "Num_Of_Satellite": 0,
        "Solar_Irradiance": 3.7,
        "J2_Perturbation": null,
        "k_value": "Titania",
        "Atmospheric_Comp": null
      },
      "Oberon": {
        "Volume": 1.85e18,
        "Surface_Pressure": 0,
        "Escape_Velocity": 738,
        "Temp_Avg": -213,
        "Temp_Daily_Low": -223,
        "Temp_Daily_High": -193,
        "Wind_Speed_Avg": 0,
        "Num_Of_Satellite": 0,
        "Solar_Irradiance": 3.7,
        "J2_Perturbation": null,
        "k_value": "Oberon",
        "Atmospheric_Comp": null
      },
      "Triton": {
      "Volume": 1.04e19,
      "Surface_Pressure": 1.4,
      "Escape_Velocity": 4600,
      "Temp_Avg": -235,
      "Temp_Daily_Low": -240,
      "Temp_Daily_High": -230,
      "Wind_Speed_Avg": 1,
      "Num_Of_Satellite": 0,
      "Solar_Irradiance": 1.5,
      "J2_Perturbation": null,
      "k_value": "Triton",
      "Atmospheric_Comp": {"N<SUB>2</SUB>": 99.9, "CH<SUB>4</SUB>": 0.02, "CO": 0.01}
    },
    "Nereid": {
      "Volume": 2.07e16,
      "Surface_Pressure": 0,
      "Escape_Velocity": 119,
      "Temp_Avg": -235,
      "Temp_Daily_Low": -240,
      "Temp_Daily_High": -230,
      "Wind_Speed_Avg": 0,
      "Num_Of_Satellite": 0,
      "Solar_Irradiance": 1.5,
      "J2_Perturbation": null,
      "k_value": "Nereid",
      "Atmospheric_Comp": null
    },
    "Proteus": {
      "Volume": 4.44e16,
      "Surface_Pressure": 0,
      "Escape_Velocity": 174,
      "Temp_Avg": -235,
      "Temp_Daily_Low": -240,
      "Temp_Daily_High": -230,
      "Wind_Speed_Avg": 0,
      "Num_Of_Satellite": 0,
      "Solar_Irradiance": 1.5,
      "J2_Perturbation": null,
      "k_value": "Proteus",
      "Atmospheric_Comp": null
    },
    "Larissa": {
      "Volume": 5.22e15,
      "Surface_Pressure": 0,
      "Escape_Velocity": 79,
      "Temp_Avg": -235,
      "Temp_Daily_Low": -240,
      "Temp_Daily_High": -230,
      "Wind_Speed_Avg": 0,
      "Num_Of_Satellite": 0,
      "Solar_Irradiance": 1.5,
      "J2_Perturbation": null,
      "k_value": "Larissa",
      "Atmospheric_Comp": null
    },
    "Despina": {
      "Volume": 3.02e15,
      "Surface_Pressure": 0,
      "Escape_Velocity": 54,
      "Temp_Avg": -235,
      "Temp_Daily_Low": -240,
      "Temp_Daily_High": -230,
      "Wind_Speed_Avg": 0,
      "Num_Of_Satellite": 0,
      "Solar_Irradiance": 1.5,
      "J2_Perturbation": null,
      "k_value": "Despina",
      "Atmospheric_Comp": null
    },
    "Galatea": {
      "Volume": 4.39e15,
      "Surface_Pressure": 0,
      "Escape_Velocity": 51,
      "Temp_Avg": -235,
      "Temp_Daily_Low": -240,
      "Temp_Daily_High": -230,
      "Wind_Speed_Avg": 0,
      "Num_Of_Satellite": 0,
      "Solar_Irradiance": 1.5,
      "J2_Perturbation": null,
      "k_value": "Galatea",
      "Atmospheric_Comp": null
    },
    "Charon": {
      "Volume": 1.586e18, // m^3, based on radius ~606 km from New Horizons
      "Surface_Pressure": 0, // Pa, no significant atmosphere per New Horizons
      "Escape_Velocity": 580, // m/s, JPL SSD estimate
      "Temp_Avg": -220, // °C, New Horizons estimate (~53 K adjusted)
      "Temp_Daily_Low": -233, // °C, estimated range
      "Temp_Daily_High": -213, // °C, estimated range
      "Wind_Speed_Avg": 0, // m/s, no atmosphere
      "Num_Of_Satellite": 0,
      "Solar_Irradiance": 0.87, // W/m^2, same as Pluto
      "J2_Perturbation": null,
      "k_value": "Charon",
      "Atmospheric_Comp": null
    },
    "Styx": {
      "Volume": 1.77e14, // m^3, approximate from New Horizons size ~16 x 9 x 8 km
      "Surface_Pressure": 0, // Pa, no atmosphere detected
      "Escape_Velocity": 10, // m/s, approximate (very low due to small size)
      "Temp_Avg": -230, // °C, estimated, slightly colder than Pluto
      "Temp_Daily_Low": -240, // °C, estimated range
      "Temp_Daily_High": -220, // °C, estimated range
      "Wind_Speed_Avg": 0, // m/s, no atmosphere
      "Num_Of_Satellite": 0,
      "Solar_Irradiance": 0.87, // W/m^2, same as Pluto
      "J2_Perturbation": null,
      "k_value": "Styx",
      "Atmospheric_Comp": null
    },
    "Nix": {
      "Volume": 4.19e14, // m^3, approximate from New Horizons ~50 x 35 x 33 km
      "Surface_Pressure": 0, // Pa, no significant atmosphere per New Horizons
      "Escape_Velocity": 15, // m/s, approximate based on size/mass
      "Temp_Avg": -230, // °C, estimated, similar to Styx
      "Temp_Daily_Low": -240, // °C, estimated range
      "Temp_Daily_High": -220, // °C, estimated range
      "Wind_Speed_Avg": 0, // m/s, no atmosphere
      "Num_Of_Satellite": 0,
      "Solar_Irradiance": 0.87, // W/m^2, same as Pluto
      "J2_Perturbation": null,
      "k_value": "Nix",
      "Atmospheric_Comp": null
    },
    "Kerberos": {
      "Volume": 1.05e14, // m^3, approximate from New Horizons ~19 x 10 x 9 km
      "Surface_Pressure": 0, // Pa, no atmosphere detected
      "Escape_Velocity": 8, // m/s, approximate (very low due to small size)
      "Temp_Avg": -230, // °C, estimated, similar to Styx/Nix
      "Temp_Daily_Low": -240, // °C, estimated range
      "Temp_Daily_High": -220, // °C, estimated range
      "Wind_Speed_Avg": 0, // m/s, no atmosphere
      "Num_Of_Satellite": 0,
      "Solar_Irradiance": 0.87, // W/m^2, same as Pluto
      "J2_Perturbation": null,
      "k_value": "Kerberos",
      "Atmospheric_Comp": null
    },
    "Hydra": {
      "Volume": 6.28e14, // m^3, approximate from New Horizons ~55 x 40 x 34 km
      "Surface_Pressure": 0, // Pa, no significant atmosphere per New Horizons
      "Escape_Velocity": 20, // m/s, approximate based on size/mass
      "Temp_Avg": -230, // °C, estimated, similar to Nix
      "Temp_Daily_Low": -240, // °C, estimated range
      "Temp_Daily_High": -220, // °C, estimated range
      "Wind_Speed_Avg": 0, // m/s, no atmosphere
      "Num_Of_Satellite": 0,
      "Solar_Irradiance": 0.87, // W/m^2, same as Pluto
      "J2_Perturbation": null,
      "k_value": "Hydra",
      "Atmospheric_Comp": null
    },
    "Bacchus": {
      "Volume": 6.702e10,
      "Surface_Pressure": null,
      "Escape_Velocity": 0.73,
      "Temp_Avg": -50,
      "Temp_Daily_Low": -150,
      "Temp_Daily_High": 100,
      "Wind_Speed_Avg": null,
      "Num_Of_Satellite": 0,
      "Solar_Irradiance": 1175,
      "J2_Perturbation": null,
      "k_value": "Bacchus",
      "Atmospheric_Comp": null
    },
    "Castalia": {
      "Volume": 1.130e11,
      "Surface_Pressure": null,
      "Escape_Velocity": 0.53,
      "Temp_Avg": -48,
      "Temp_Daily_Low": -150,
      "Temp_Daily_High": 100,
      "Wind_Speed_Avg": null,
      "Num_Of_Satellite": 0,
      "Solar_Irradiance": 1208,
      "J2_Perturbation": null,
      "k_value": "Castalia",
      "Atmospheric_Comp": null
    },
    "Eros": {
      "Volume": 2.503e12,
      "Surface_Pressure": null,
      "Escape_Velocity": 10.3,
      "Temp_Avg": -60,
      "Temp_Daily_Low": -150,
      "Temp_Daily_High": 100,
      "Wind_Speed_Avg": null,
      "Num_Of_Satellite": 0,
      "Solar_Irradiance": 642,
      "J2_Perturbation": null,
      "k_value": "Eros",
      "Atmospheric_Comp": null
    },
    "Gaspra": {
      "Volume": 1.767e12,
      "Surface_Pressure": null,
      "Escape_Velocity": 6.5,
      "Temp_Avg": -95,
      "Temp_Daily_Low": -150,
      "Temp_Daily_High": 100,
      "Wind_Speed_Avg": null,
      "Num_Of_Satellite": 0,
      "Solar_Irradiance": 280,
      "J2_Perturbation": null,
      "k_value": "Gaspra",
      "Atmospheric_Comp": null
    },
    "Geographos": {
      "Volume": 3.191e12,
      "Surface_Pressure": null,
      "Escape_Velocity": 0.34,
      "Temp_Avg": -55,
      "Temp_Daily_Low": -150,
      "Temp_Daily_High": 100,
      "Wind_Speed_Avg": null,
      "Num_Of_Satellite": 0,
      "Solar_Irradiance": 881,
      "J2_Perturbation": null,
      "k_value": "Geographos",
      "Atmospheric_Comp": null
    },
    "Golevka": {
      "Volume": 3.351e10,
      "Surface_Pressure": null,
      "Escape_Velocity": 0.97,
      "Temp_Avg": -104,
      "Temp_Daily_Low": -150,
      "Temp_Daily_High": 100,
      "Wind_Speed_Avg": null,
      "Num_Of_Satellite": 0,
      "Solar_Irradiance": 216,
      "J2_Perturbation": null,
      "k_value": "Golevka",
      "Atmospheric_Comp": null
    },
    "Ida": {
      "Volume": 1.479e13,
      "Surface_Pressure": null,
      "Escape_Velocity": 19,
      "Temp_Avg": -119,
      "Temp_Daily_Low": -150,
      "Temp_Daily_High": 100,
      "Wind_Speed_Avg": null,
      "Num_Of_Satellite": 1,
      "Solar_Irradiance": 167,
      "J2_Perturbation": null,
      "k_value": "Ida",
      "Atmospheric_Comp": null
    },
    "Juno": {
      "Volume": 7.067e15,
      "Surface_Pressure": null,
      "Escape_Velocity": 49,
      "Temp_Avg": -110,
      "Temp_Daily_Low": -150,
      "Temp_Daily_High": 100,
      "Wind_Speed_Avg": null,
      "Num_Of_Satellite": 0,
      "Solar_Irradiance": 192,
      "J2_Perturbation": null,
      "k_value": "Juno",
      "Atmospheric_Comp": null
    },
    "Kleopatra": {
      "Volume": 2.678e15,
      "Surface_Pressure": null,
      "Escape_Velocity": 15,
      "Temp_Avg": -112,
      "Temp_Daily_Low": -150,
      "Temp_Daily_High": 100,
      "Wind_Speed_Avg": null,
      "Num_Of_Satellite": 0,
      "Solar_Irradiance": 175,
      "J2_Perturbation": null,
      "k_value": "Kleopatra",
      "Atmospheric_Comp": null
    },
    "1998 KY26": {
      "Volume": 5.089e6,
      "Surface_Pressure": null,
      "Escape_Velocity": 0.0005,
      "Temp_Avg": -54,
      "Temp_Daily_Low": -150,
      "Temp_Daily_High": 100,
      "Wind_Speed_Avg": null,
      "Num_Of_Satellite": 0,
      "Solar_Irradiance": 898,
      "J2_Perturbation": null,
      "k_value": "1998 KY26",
      "Atmospheric_Comp": null
    },
    "Mathilde": {
      "Volume": 4.602e13,
      "Surface_Pressure": null,
      "Escape_Velocity": 20,
      "Temp_Avg": -109,
      "Temp_Daily_Low": -150,
      "Temp_Daily_High": 100,
      "Wind_Speed_Avg": null,
      "Num_Of_Satellite": 0,
      "Solar_Irradiance": 195,
      "J2_Perturbation": null,
      "k_value": "Mathilde",
      "Atmospheric_Comp": null
    },
    "Pallas": {
      "Volume": 8.977e15,
      "Surface_Pressure": null,
      "Escape_Velocity": 54,
      "Temp_Avg": -112,
      "Temp_Daily_Low": -150,
      "Temp_Daily_High": 100,
      "Wind_Speed_Avg": null,
      "Num_Of_Satellite": 0,
      "Solar_Irradiance": 178,
      "J2_Perturbation": null,
      "k_value": "Pallas",
      "Atmospheric_Comp": null
    },
    "Toutatis": {
      "Volume": 2.805e12,
      "Surface_Pressure": null,
      "Escape_Velocity": 2.8,
      "Temp_Avg": -104,
      "Temp_Daily_Low": -150,
      "Temp_Daily_High": 100,
      "Wind_Speed_Avg": null,
      "Num_Of_Satellite": 0,
      "Solar_Irradiance": 213,
      "J2_Perturbation": null,
      "k_value": "Toutatis",
      "Atmospheric_Comp": null
    },
    "Vesta": {
      "Volume": 7.976e15,
      "Surface_Pressure": null,
      "Escape_Velocity": 56,
      "Temp_Avg": -96,
      "Temp_Daily_Low": -150,
      "Temp_Daily_High": 100,
      "Wind_Speed_Avg": null,
      "Num_Of_Satellite": 0,
      "Solar_Irradiance": 245,
      "J2_Perturbation": null,
      "k_value": "Vesta",
      "Atmospheric_Comp": null
    },
    "Dactyl": {
    "Volume": 1.4e9, // m³, from dimensions 1.2 x 1.4 x 1.6 km
    "Surface_Pressure": null,
    "Escape_Velocity": 0.16, // m/s, from mass 4.2e13 kg, mean radius ~0.7 km
    "Temp_Avg": -119, // °C, matches Ida at a=2.861 AU
    "Temp_Daily_Low": -150,
    "Temp_Daily_High": 100,
    "Wind_Speed_Avg": null,
    "Num_Of_Satellite": 0,
    "Solar_Irradiance": 167, // W/m², matches Ida at 2.861 AU
    "J2_Perturbation": null,
    "k_value": "Dactyl",
    "Atmospheric_Comp": null
  }
    
    // Add other bodies similarly
  };
