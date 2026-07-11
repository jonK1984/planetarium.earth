/*const sunEmissiveVertex = `
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec2 vUv; // Add UV coordinates for texture mapping
        void main() {
            vNormal = normalize(normalMatrix * normal);
            vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
            vUv = uv; // Pass UVs to fragment shader
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `;*/

// Modified sunEmissiveVertex
const sunEmissiveVertex = `
    #include <common>
    #include <logdepthbuf_pars_vertex>

    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;

    void main() {
        vNormal = normalize(normalMatrix * normal);
        vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
        vUv = uv;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

        #include <logdepthbuf_vertex>
    }
`;


// Modified sunEmissiveFragment
const sunEmissiveFragment = `
    #include <common>
    #include <logdepthbuf_pars_fragment>

    uniform vec3 emissiveColor;
    uniform float intensity;
    uniform sampler2D sunTexture;
    uniform float time;
    uniform bool shader_enable;
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;
    varying vec3 vViewDirection;

    // Your existing random function
    float random(vec3 st) {
        return fract(sin(dot(st, vec3(12.9898, 78.233, 23.112))) * 12943.145);
    }

    // Your existing noise function
    float noise(vec3 p) {
        vec3 i_pos = floor(p);
        vec3 f_pos = fract(p);
        float i_time = floor(time*0.2);
        float f_time = fract(time*0.2);

        float aa = random(i_pos + i_time);
        float ab = random(i_pos + i_time + vec3(1., 0., 0.));
        float ac = random(i_pos + i_time + vec3(0., 1., 0.));
        float ad = random(i_pos + i_time + vec3(1., 1., 0.));
        float ae = random(i_pos + i_time + vec3(0., 0., 1.));
        float af = random(i_pos + i_time + vec3(1., 0., 1.));
        float ag = random(i_pos + i_time + vec3(0., 1., 1.));
        float ah = random(i_pos + i_time + vec3(1., 1., 1.));

        float ba = random(i_pos + (i_time + 1.));
        float bb = random(i_pos + (i_time + 1.) + vec3(1., 0., 0.));
        float bc = random(i_pos + (i_time + 1.) + vec3(0., 1., 0.));
        float bd = random(i_pos + (i_time + 1.) + vec3(1., 1., 0.));
        float be = random(i_pos + (i_time + 1.) + vec3(0., 0., 1.));
        float bf = random(i_pos + (i_time + 1.) + vec3(1., 0., 1.));
        float bg = random(i_pos + (i_time + 1.) + vec3(0., 1., 1.));
        float bh = random(i_pos + (i_time + 1.) + vec3(1., 1., 1.));

        vec3 t = smoothstep(0., 1., f_pos);
        float t_time = smoothstep(0., 1., f_time);

        return 
        mix(
            mix(
                mix(mix(aa,ab,t.x), mix(ac,ad,t.x), t.y),
                mix(mix(ae,af,t.x), mix(ag,ah,t.x), t.y), 
            t.z),
            mix(
                mix(mix(ba,bb,t.x), mix(bc,bd,t.x), t.y),
                mix(mix(be,bf,t.x), mix(bg,bh,t.x), t.y), 
            t.z), 
        t_time);
    }

    // Your existing FBM function
    #define NUM_OCTAVES 6
    float fbm(in vec3 _pos, in float sz) {
        float value = 0.0;
        float amplitude = 0.2;
        _pos *= sz;

        vec3 angle = vec3(-0.001*time,0.0001*time,0.0004*time);
        mat3 rotx = mat3(1, 0, 0,
                        0, cos(angle.x), -sin(angle.x),
                        0, sin(angle.x), cos(angle.x));
        mat3 roty = mat3(cos(angle.y), 0, sin(angle.y),
                        0, 1, 0,
                        -sin(angle.y), 0, cos(angle.y));
        mat3 rotz = mat3(cos(angle.z), -sin(angle.z), 0,
                        sin(angle.z), cos(angle.z), 0,
                        0, 0, 1);

        for (int i = 0; i < NUM_OCTAVES; ++i) {
            value += amplitude * noise(_pos);
            _pos = rotx * roty * rotz * _pos * 2.0;
            amplitude *= 0.8;
        }
        return value;
    }

    void main() {
        #include <logdepthbuf_fragment>

        vec4 texColor = texture2D(sunTexture, vUv);
        if (shader_enable) {
            vec3 st = vPosition;
            vec3 q = vec3(0.);
            q.x = fbm(st, 5.);
            q.y = fbm(st + vec3(1.2,3.2,1.52), 5.);
            q.z = fbm(st + vec3(0.02,0.12,0.152), 5.);
            float n = fbm(st+q+vec3(1.82,1.32,1.09), 5.);
            vec3 color = vec3(0.);
            color = mix(vec3(1.,0.8,0.), vec3(1.,1.,1.), n*n);
            color = mix(color, vec3(1.,0.,0.), q*0.7);
            color = color * texColor.rgb;
            gl_FragColor = vec4(1.6*color, 1.);
        } else {
            gl_FragColor = vec4(texColor.rgb, 1.0);
        }
    }
`;
/*
const sunEmissiveFragment = `uniform vec3 emissiveColor;
uniform float intensity;
uniform sampler2D sunTexture;
uniform float time; // Add time uniform for animation
uniform bool shader_enable;
varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;
varying vec3 vViewDirection;

// 2D Random function (adapted from article)
float random(vec3 st) {
    return fract(sin(dot(st, vec3(12.9898, 78.233, 23.112))) * 12943.145);
}

// 3D Noise function (Perlin-like, simplified)
float noise(vec3 p) {
    vec3 i_pos = floor(p);
    vec3 f_pos = fract(p);

    float i_time = floor(time*0.2);
    float f_time = fract(time*0.2);

    // Four corners in 2D of a tile
    float aa = random(i_pos + i_time);
    float ab = random(i_pos + i_time + vec3(1., 0., 0.));
    float ac = random(i_pos + i_time + vec3(0., 1., 0.));
    float ad = random(i_pos + i_time + vec3(1., 1., 0.));
    float ae = random(i_pos + i_time + vec3(0., 0., 1.));
    float af = random(i_pos + i_time + vec3(1., 0., 1.));
    float ag = random(i_pos + i_time + vec3(0., 1., 1.));
    float ah = random(i_pos + i_time + vec3(1., 1., 1.));

    float ba = random(i_pos + (i_time + 1.));
    float bb = random(i_pos + (i_time + 1.) + vec3(1., 0., 0.));
    float bc = random(i_pos + (i_time + 1.) + vec3(0., 1., 0.));
    float bd = random(i_pos + (i_time + 1.) + vec3(1., 1., 0.));
    float be = random(i_pos + (i_time + 1.) + vec3(0., 0., 1.));
    float bf = random(i_pos + (i_time + 1.) + vec3(1., 0., 1.));
    float bg = random(i_pos + (i_time + 1.) + vec3(0., 1., 1.));
    float bh = random(i_pos + (i_time + 1.) + vec3(1., 1., 1.));

    // Smooth step
    vec3 t = smoothstep(0., 1., f_pos);
    float t_time = smoothstep(0., 1., f_time);

    // Mix 4 corners percentages
    return 
    mix(
        mix(
            mix(mix(aa,ab,t.x), mix(ac,ad,t.x), t.y),
            mix(mix(ae,af,t.x), mix(ag,ah,t.x), t.y), 
        t.z),
        mix(
            mix(mix(ba,bb,t.x), mix(bc,bd,t.x), t.y),
            mix(mix(be,bf,t.x), mix(bg,bh,t.x), t.y), 
        t.z), 
    t_time);
}
#define NUM_OCTAVES  6
// Fractal Brownian Motion (FBM)
float fbm(in vec3 _pos, in float sz) {
    float value = 0.0;
    float amplitude = 0.2;
    _pos *= sz;

    vec3 angle = vec3(-0.001*time,0.0001*time,0.0004*time);
    mat3 rotx = mat3(1, 0, 0,
                    0, cos(angle.x), -sin(angle.x),
                    0, sin(angle.x), cos(angle.x));
    mat3 roty = mat3(cos(angle.y), 0, sin(angle.y),
                    0, 1, 0,
                    -sin(angle.y), 0, cos(angle.y));
    mat3 rotz = mat3(cos(angle.z), -sin(angle.z), 0,
                    sin(angle.z), cos(angle.z), 0,
                    0, 0, 1);

    for (int i = 0; i < NUM_OCTAVES; ++i) {
        value += amplitude * noise(_pos);
        _pos = rotx * roty * rotz * _pos * 2.0;
        amplitude *= 0.8;
    }

    
    return value;
}

void main() {
    // Base texture color
    vec4 texColor = texture2D(sunTexture, vUv);
    //vec3 baseColor = emissiveColor * intensity * texColor.rgb;
    if( shader_enable )
    {
    
        // Fractal noise for surface turbulence
        vec3 st = vPosition;
        vec3 q = vec3(0.);
        q.x = fbm( st, 5.);
        q.y = fbm( st + vec3(1.2,3.2,1.52), 5.);
        q.z = fbm( st + vec3(0.02,0.12,0.152), 5.);

        float n = fbm(st+q+vec3(1.82,1.32,1.09), 5.);

        vec3 color = vec3(0.);
        color = mix(vec3(1.,0.8,0.), vec3(1.,1.,1.), n*n);
        color = mix(color, vec3(1.,0.,0.), q*0.7);
        color = color * texColor.rgb;
        

        gl_FragColor = vec4(1.6*color, 1.);
    }
    else
    {
        gl_FragColor = vec4(texColor.rgb, 1.0);
        //vec3 noisePos = vPosition * 0.05 + vec3(time * 0.1); // Scale and animate with time
        //float noiseValue = fbm(noisePos, 0.05);
        //vec3 noiseColor = mix(baseColor, baseColor * 1.5, noiseValue); // Brighten with noise

        // Fresnel effect
        //float fresnel = pow(1.0 - max(dot(vNormal, vViewDirection), 0.0), 2.0);
        //vec3 fresnelColor = emissiveColor * fresnel * 0.5; // Subtle rim glow

        // Glow effect (simple distance-based)
        //float glow = clamp(1.0 - length(vUv - 0.5) * 2.0, 0.0, 1.0);
        //vec3 glowColor = emissiveColor * glow * 0.3;

        // Combine effects
        //vec3 finalColor = noiseColor + fresnelColor + glowColor;
        //gl_FragColor = vec4(finalColor, 1.0);
    }
}`;*/

// Modified sunCoronaVertex
const sunCoronaVertex = `
    #include <common>
    #include <logdepthbuf_pars_vertex>

    varying vec2 vUv;

    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

        #include <logdepthbuf_vertex>
    }
`;
/*
const sunCoronaVertex = `
varying vec2 vUv;

void main() {
    vUv = uv; // Pass UV coordinates to the fragment shader
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;*/

// Modified sunCoronaFragment
const sunCoronaFragment = `
    #include <common>
    #include <logdepthbuf_pars_fragment>

    uniform float temperature;
    uniform float radius;
    uniform float mass;
    varying vec2 vUv;

    vec3 blackbodyColor(float temp) {
        vec3 color;
        if (temp < 4000.0) {
            color = vec3(1.0, temp / 4000.0, 0.0);
        } else if (temp < 7000.0) {
            float t = (temp - 4000.0) / 2000.0;
            color = vec3(1.0, 0.7 + 0.3 * t, t);
        } else {
            float t = clamp((temp - 6000.0) / 4000.0, 0.0, 1.0);
            color = vec3(1.0 - t, 1.0 - t * 0.5, 0.5 + t * 0.5);
        }
        return clamp(color, 0.0, 1.0);
    }

    void main() {
        #include <logdepthbuf_fragment>

        vec2 center = vec2(0.5, 0.5);
        float dist = distance(vUv, center);
        float coronaScale = radius * (1.0 + mass * 0.1);
        float normalizedDist = dist / coronaScale;
        float density = exp(-normalizedDist * 4.0) * (1.0 + mass * 0.05);
        vec3 color = blackbodyColor(temperature);
        float intensity = density * (1.0 + temperature / 10000.0);
        gl_FragColor = vec4(color, 1.0) * intensity;
    }
`;
/*
const sunCoronaFragment = `uniform float temperature; // Temperature in Kelvin
uniform float radius;      // Radius in arbitrary units (e.g., solar radii)
uniform float mass;        // Mass in solar masses
varying vec2 vUv;

vec3 blackbodyColor(float temp) {
    // Simplified blackbody color mapping based on temperature
    vec3 color;
    if (temp < 4000.0) {
        // Reddish for cooler temperatures
        color = vec3(1.0, temp / 4000.0, 0.0);
    } else if (temp < 7000.0) {
        // Yellowish for intermediate temperatures
        float t = (temp - 4000.0) / 2000.0;
        color = vec3(1.0, 0.7 + 0.3 * t, t);
    } else {
        // White to bluish for hotter temperatures
        float t = clamp((temp - 6000.0) / 4000.0, 0.0, 1.0);
        color = vec3(1.0 - t, 1.0 - t * 0.5, 0.5 + t * 0.5);
    }
    return clamp(color, 0.0, 1.0);
}

void main() {
    vec2 center = vec2(0.5, 0.5); // Center of the star in UV space
    float dist = distance(vUv, center); // Distance from the center

    // Normalize distance based on radius (corona extends beyond the star)
    float coronaScale = radius * (1.0 + mass * 0.1); // Mass slightly extends the corona
    float normalizedDist = dist / coronaScale;

    // Density falloff using exponential decay
    float density = exp(-normalizedDist * 4.0) * (1.0 + mass * 0.05); // Mass increases base density

    // Calculate color based on temperature
    vec3 color = blackbodyColor(temperature);

    // Final intensity combines density and a slight temperature boost
    float intensity = density * (1.0 + temperature / 10000.0);

    // Output color with alpha based on intensity
    gl_FragColor = vec4(color, 1.0) * intensity;
}`;*/

// Modified sunGlowVertex
const sunGlowVertex = `
    #include <common>
    #include <logdepthbuf_pars_vertex>

    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vNormalModel;
    varying vec3 vNormalView;
    varying vec3 vPosition;

    void main() {
        vUv = uv;
        vNormal = normalize(mat3(modelMatrix) * normal);
        vNormalModel = normal;
        vNormalView = normalize(normalMatrix * normal);
        vPosition = normalize(vec3(modelViewMatrix * vec4(position, 1.0)).xyz);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

        #include <logdepthbuf_vertex>
    }
`;

/*
sunGlowVertex = `
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vNormalModel;
varying vec3 vNormalView;
varying vec3 vPosition;

void main() {
    vUv = uv;
    vNormal = normalize(mat3(modelMatrix) * normal);
    vNormalModel = normal;
    vNormalView = normalize(normalMatrix * normal);
    vPosition = normalize(vec3(modelViewMatrix * vec4(position, 1.0)).xyz);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;*/

// Modified sunGlowFragment
const sunGlowFragment = `
    #include <common>
    #include <logdepthbuf_pars_fragment>

    uniform vec3 u_color;
    varying vec3 vPosition;
    varying vec3 vNormalView;

    void main() {
        #include <logdepthbuf_fragment>

        float raw_intensity = max(dot(vPosition, vNormalView), 0.);
        float intensity = pow(raw_intensity, 4.);
        vec4 color = vec4(u_color, intensity);
        gl_FragColor = color;
    }
`;
/*
sunGlowFragment = `
uniform vec3 u_color;
varying vec3 vPosition;
varying vec3 vNormalView;

void main() {
    float raw_intensity = max(dot(vPosition, vNormalView), 0.);
    float intensity = pow(raw_intensity, 4.);
    vec4 color = vec4(u_color, intensity);
    gl_FragColor = color;
}`;*/

// Modified sunFresnelFragment
const sunFresnelFragment = `
    #include <common>
    #include <logdepthbuf_pars_fragment>

    uniform vec3 u_color;
    varying vec3 vPosition;
    varying vec3 vNormalView;

    void main() {
        #include <logdepthbuf_fragment>

        float fresnelTerm_inner = 0.2 - 0.7*min(dot(vPosition, vNormalView), 0.0);
        fresnelTerm_inner = pow(fresnelTerm_inner, 5.0);

        float fresnelTerm_outer = 1.0 + dot(normalize(vPosition), normalize(vNormalView));
        fresnelTerm_outer = pow(fresnelTerm_outer, 2.0);
        
        float fresnelTerm = fresnelTerm_inner + fresnelTerm_outer;
        gl_FragColor = vec4(u_color, 0.7) * fresnelTerm;
    }
`;
/*
sunFresnelFragment = `uniform vec3 u_color;
varying vec3 vPosition;
varying vec3 vNormalView;

void main() {
    float fresnelTerm_inner = 0.2 - 0.7*min(dot(vPosition, vNormalView), 0.0);
    fresnelTerm_inner = pow(fresnelTerm_inner, 5.0);

    float fresnelTerm_outer = 1.0 + dot(normalize(vPosition), normalize(vNormalView));
    fresnelTerm_outer = pow(fresnelTerm_outer, 2.0);
    
    float fresnelTerm = fresnelTerm_inner + fresnelTerm_outer;
    gl_FragColor = vec4( u_color, 0.7 ) * fresnelTerm;
}`;*/

//Orbit Trails

const log_OrbitTrailVertex = `
    #include <common>
    #include <logdepthbuf_pars_vertex>

    attribute float opacity;
    varying float vOpacity;

    void main() {
        vOpacity = opacity;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

        #include <logdepthbuf_vertex>
    }
`;
const log_OrbitTrailFrag = `
    #include <common>
    #include <logdepthbuf_pars_fragment>

    uniform vec3 color;
    varying float vOpacity;

    void main() {
        #include <logdepthbuf_fragment>

        gl_FragColor = vec4(color, vOpacity);
    }
`;
const OrbitTrailVertex = `
    attribute float opacity;
    varying float vOpacity;
    void main() {
        vOpacity = opacity;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;
const OrbitTrailFrag = `
    uniform vec3 color;
    varying float vOpacity;
    void main() {
        gl_FragColor = vec4(color, vOpacity);
    }
`;
// Modified trailMaterial vertexShader

const trailMaterial = new THREE.ShaderMaterial({
    uniforms: {
        color: { value: new THREE.Color(0xffffff) } // White color
    },
vertexShader: log_OrbitTrailVertex,
fragmentShader: log_OrbitTrailFrag,
transparent: true
});

/*
const trailMaterial = new THREE.ShaderMaterial({
    uniforms: {
        color: { value: new THREE.Color(0xffffff) } // White color
    },
    vertexShader: `
        attribute float opacity;
        varying float vOpacity;
        void main() {
            vOpacity = opacity;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform vec3 color;
        varying float vOpacity;
        void main() {
            gl_FragColor = vec4(color, vOpacity);
        }
    `,
    transparent: true
  });*/
  
  const moonTrailMaterial = new THREE.ShaderMaterial({
    uniforms: {
        color: { value: new THREE.Color(0xFFD700) } // Golden-yellow
    },
    vertexShader: log_OrbitTrailVertex,
    fragmentShader: log_OrbitTrailFrag,
    transparent: true
  });

  /*
const moonTrailMaterial = new THREE.ShaderMaterial({
    uniforms: {
        color: { value: new THREE.Color(0xFFD700) } // Golden-yellow
    },
    vertexShader: `
        attribute float opacity;
        varying float vOpacity;
        void main() {
            vOpacity = opacity;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform vec3 color;
        varying float vOpacity;
        void main() {
            gl_FragColor = vec4(color, vOpacity);
        }
    `,
    transparent: true
  });*/
  
const asteroidTrailMaterial = new THREE.ShaderMaterial({
      uniforms: {
          color: { value: new THREE.Color(0xC00000) } // Red
      },
      vertexShader: log_OrbitTrailVertex,
      fragmentShader: log_OrbitTrailFrag,
      transparent: true
  });

// ---------------------------------------------------------------------------
// Shared planet vertex (log-depth + world normal / position / view)
// ---------------------------------------------------------------------------
const advancedPlanetVertex = `
    #include <common>
    #include <logdepthbuf_pars_vertex>

    varying vec2 vUv;
    varying vec3 vNormalW;
    varying vec3 vPositionW;
    varying vec3 vViewDir;

    void main() {
        vUv = uv;
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vPositionW = worldPos.xyz;
        vNormalW = normalize(mat3(modelMatrix) * normal);
        vViewDir = normalize(cameraPosition - worldPos.xyz);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        #include <logdepthbuf_vertex>
    }
`;

// Soft-lit planet surface (map + optional normal/specular + wrap lighting)
const softPlanetFragment = `
    #include <common>
    #include <logdepthbuf_pars_fragment>

    uniform sampler2D map;
    uniform sampler2D normalMap;
    uniform sampler2D specularMap;
    uniform vec3 sunDirection;
    uniform vec3 ambientColor;
    uniform float softTerminator;
    uniform float hasNormalMap;
    uniform float hasSpecularMap;
    uniform float shininess;
    uniform vec3 emissiveColor;
    uniform float emissiveIntensity;

    varying vec2 vUv;
    varying vec3 vNormalW;
    varying vec3 vPositionW;
    varying vec3 vViewDir;

    void main() {
        #include <logdepthbuf_fragment>

        vec3 albedo = texture2D(map, vUv).rgb;
        vec3 N = normalize(vNormalW);
        if (hasNormalMap > 0.5) {
            vec3 nTex = texture2D(normalMap, vUv).xyz * 2.0 - 1.0;
            vec3 up = abs(N.y) < 0.999 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
            vec3 T = normalize(cross(up, N));
            vec3 B = cross(N, T);
            N = normalize(T * nTex.x + B * nTex.y + N * nTex.z);
        }

        vec3 L = normalize(sunDirection);
        float NdotL = dot(N, L);
        float wrap = softTerminator;
        float diffuse = clamp((NdotL + wrap) / (1.0 + wrap), 0.0, 1.0);
        diffuse = smoothstep(0.0, 1.0, diffuse);

        vec3 color = albedo * (ambientColor + diffuse);

        if (hasSpecularMap > 0.5) {
            float specMask = texture2D(specularMap, vUv).r;
            vec3 H = normalize(L + normalize(vViewDir));
            float spec = pow(max(dot(N, H), 0.0), shininess) * specMask * max(NdotL, 0.0);
            color += vec3(spec);
        }

        color += emissiveColor * emissiveIntensity;
        gl_FragColor = vec4(color, 1.0);
    }
`;

// Earth day/night composite
const earthSurfaceFragment = `
    #include <common>
    #include <logdepthbuf_pars_fragment>

    uniform sampler2D dayMap;
    uniform sampler2D nightMap;
    uniform sampler2D normalMap;
    uniform sampler2D specularMap;
    uniform vec3 sunDirection;
    uniform vec3 ambientColor;
    uniform float softTerminator;
    uniform float nightLightsEnabled;
    uniform float hasNightMap;
    uniform float hasNormalMap;
    uniform float hasSpecularMap;
    uniform float shininess;

    varying vec2 vUv;
    varying vec3 vNormalW;
    varying vec3 vPositionW;
    varying vec3 vViewDir;

    void main() {
        #include <logdepthbuf_fragment>

        vec3 day = texture2D(dayMap, vUv).rgb;
        vec3 N = normalize(vNormalW);
        if (hasNormalMap > 0.5) {
            vec3 nTex = texture2D(normalMap, vUv).xyz * 2.0 - 1.0;
            vec3 up = abs(N.y) < 0.999 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
            vec3 T = normalize(cross(up, N));
            vec3 B = cross(N, T);
            N = normalize(T * nTex.x + B * nTex.y + N * nTex.z);
        }

        vec3 L = normalize(sunDirection);
        float NdotL = dot(N, L);
        float wrap = softTerminator;
        float dayFactor = clamp((NdotL + wrap) / (1.0 + wrap), 0.0, 1.0);
        dayFactor = smoothstep(0.0, 1.0, dayFactor);
        float nightFactor = 1.0 - dayFactor;

        vec3 color = day * (ambientColor + dayFactor);

        if (hasSpecularMap > 0.5) {
            float specMask = texture2D(specularMap, vUv).r;
            vec3 H = normalize(L + normalize(vViewDir));
            float spec = pow(max(dot(N, H), 0.0), shininess) * specMask * dayFactor;
            color += vec3(0.85, 0.9, 1.0) * spec;
        }

        if (nightLightsEnabled > 0.5) {
            vec3 lights;
            vec3 halo = vec3(0.0);
            if (hasNightMap > 0.5) {
                lights = texture2D(nightMap, vUv).rgb;
                // Black Marble: emphasize bright city cores over faint land fill
                float peak = max(lights.r, max(lights.g, lights.b));
                float coreBoost = mix(0.2, 1.85, smoothstep(0.06, 0.42, peak));
                lights *= coreBoost;
                // Hot white-gold punch on brightest metros
                lights += lights * lights * vec3(1.15, 0.95, 0.65) * smoothstep(0.25, 0.7, peak);

                // Soft UV multi-tap halo around cities (looks like light scatter)
                // Offsets in equirect UV; ~0.2–0.6° at full-map scale
                float r1 = 0.0018;
                float r2 = 0.0038;
                vec3 acc = lights * 0.35;
                acc += texture2D(nightMap, vUv + vec2( r1,  0.0)).rgb;
                acc += texture2D(nightMap, vUv + vec2(-r1,  0.0)).rgb;
                acc += texture2D(nightMap, vUv + vec2( 0.0,  r1)).rgb;
                acc += texture2D(nightMap, vUv + vec2( 0.0, -r1)).rgb;
                acc += texture2D(nightMap, vUv + vec2( r1,  r1) * 0.707).rgb;
                acc += texture2D(nightMap, vUv + vec2(-r1,  r1) * 0.707).rgb;
                acc += texture2D(nightMap, vUv + vec2( r1, -r1) * 0.707).rgb;
                acc += texture2D(nightMap, vUv + vec2(-r1, -r1) * 0.707).rgb;
                acc += texture2D(nightMap, vUv + vec2( r2,  0.0)).rgb * 0.55;
                acc += texture2D(nightMap, vUv + vec2(-r2,  0.0)).rgb * 0.55;
                acc += texture2D(nightMap, vUv + vec2( 0.0,  r2)).rgb * 0.55;
                acc += texture2D(nightMap, vUv + vec2( 0.0, -r2)).rgb * 0.55;
                halo = acc / 8.75;
                float glowPeak = max(halo.r, max(halo.g, halo.b));
                // Suppress dim land fill; keep only real city clusters
                halo *= smoothstep(0.05, 0.22, glowPeak);
                // Warm amber scatter (sodium/LED city light feel)
                halo *= vec3(1.05, 0.72, 0.38) * 1.65;
            } else {
                float land = hasSpecularMap > 0.5 ? (1.0 - texture2D(specularMap, vUv).r) : 0.3;
                float n = fract(sin(dot(vUv, vec2(12.9898, 78.233))) * 43758.5453);
                lights = vec3(1.0, 0.85, 0.55) * land * step(0.97, n) * 1.5;
                // Tiny synthetic halo for procedural speckles
                float n2 = fract(sin(dot(vUv + 0.002, vec2(12.9898, 78.233))) * 43758.5453);
                halo = vec3(1.0, 0.7, 0.35) * land * step(0.96, n2) * 0.45;
            }
            // Mild limb boost: cities glow a bit more near the edge of the disk
            float ndv = max(dot(N, normalize(vViewDir)), 0.0);
            float limb = 1.0 + 0.4 * pow(1.0 - ndv, 2.0);
            // nightFactor: full on dark side, fades through terminator into day
            color += (lights + halo) * nightFactor * limb;
        }

        gl_FragColor = vec4(color, 1.0);
    }
`;

// Ring lighting + planet umbra
const ringVertex = `
    #include <common>
    #include <logdepthbuf_pars_vertex>

    varying vec2 vUv;
    varying vec3 vPositionW;
    varying vec3 vNormalW;

    void main() {
        vUv = uv;
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vPositionW = worldPos.xyz;
        vNormalW = normalize(mat3(modelMatrix) * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        #include <logdepthbuf_vertex>
    }
`;

const ringFragment = `
    #include <common>
    #include <logdepthbuf_pars_fragment>

    uniform sampler2D ringMap;
    uniform vec3 sunDirection;
    uniform vec3 planetPosition;
    uniform float planetRadius;
    uniform float ambient;
    uniform float enableShadows;

    varying vec2 vUv;
    varying vec3 vPositionW;
    varying vec3 vNormalW;

    void main() {
        #include <logdepthbuf_fragment>

        vec4 tex = texture2D(ringMap, vUv);
        float alpha = tex.a;
        if (alpha < 0.02) discard;

        vec3 N = normalize(vNormalW);
        vec3 L = normalize(sunDirection);
        float ndl = abs(dot(N, L));
        float lighting = ambient + (1.0 - ambient) * ndl;
        lighting += 0.15 * max(0.0, -dot(N, L));

        if (enableShadows > 0.5) {
            vec3 toSun = L;
            vec3 rel = vPositionW - planetPosition;
            float t = -dot(rel, toSun);
            if (t > 0.0) {
                vec3 closest = rel + toSun * t;
                float d = length(closest);
                if (d < planetRadius) {
                    float penumbra = smoothstep(planetRadius * 0.85, planetRadius, d);
                    lighting *= mix(0.12, 1.0, penumbra);
                }
            }
        }

        gl_FragColor = vec4(tex.rgb * lighting, alpha * 0.95);
    }
`;

// ---------------------------------------------------------------------------
// Earth aurora — sparse curvy ribbons
// Vertex: low-frequency radial bulge only (smooth, anti-pixelated).
// Fragment: crisp high-frequency ribbon mask (per-pixel sharpness + randomness).
// Colors: O green body, soft O red tips.
// ---------------------------------------------------------------------------
const earthAuroraVertex = `
    #include <common>
    #include <logdepthbuf_pars_vertex>

    uniform float time;
    uniform float maxHeight;

    varying vec3 vNormalW;
    varying vec3 vLocalN;
    varying vec3 vViewDir;
    varying float vBaseH; // smooth low-freq height 0..1

    float hash13(vec3 p) {
        p = fract(p * 0.1031);
        p += dot(p, p.yzx + 33.33);
        return fract((p.x + p.y) * p.z);
    }

    float valueNoise(vec3 p) {
        vec3 i = floor(p);
        vec3 f = fract(p);
        vec3 u = f * f * (3.0 - 2.0 * f);
        float n000 = hash13(i);
        float n100 = hash13(i + vec3(1.0, 0.0, 0.0));
        float n010 = hash13(i + vec3(0.0, 1.0, 0.0));
        float n110 = hash13(i + vec3(1.0, 1.0, 0.0));
        float n001 = hash13(i + vec3(0.0, 0.0, 1.0));
        float n101 = hash13(i + vec3(1.0, 0.0, 1.0));
        float n011 = hash13(i + vec3(0.0, 1.0, 1.0));
        float n111 = hash13(i + vec3(1.0, 1.0, 1.0));
        return mix(
            mix(mix(n000, n100, u.x), mix(n010, n110, u.x), u.y),
            mix(mix(n001, n101, u.x), mix(n011, n111, u.x), u.y),
            u.z
        );
    }

    float fbm(vec3 p) {
        float v = 0.0;
        float a = 0.5;
        for (int i = 0; i < 3; i++) {
            v += a * valueNoise(p);
            p = p * 2.02 + vec3(1.7, 9.2, 3.1);
            a *= 0.5;
        }
        return v;
    }

    void main() {
        vec3 n = normalize(position);
        vLocalN = n;

        float lat = abs(n.y);
        float band = smoothstep(0.76, 0.88, lat) * (1.0 - smoothstep(0.93, 0.998, lat));
        float lon = atan(n.z, n.x);
        float t = time * 0.1;

        // Low-frequency only — smooth mesh displacement (no floor/hash cells)
        float w = fbm(vec3(lon * 1.1, lat * 3.5, t * 0.4));
        float bulge = smoothstep(0.25, 0.7, w) * (0.45 + 0.55 * band);
        vBaseH = band * bulge;

        float r = length(position);
        vec3 displaced = position + n * (r * maxHeight * vBaseH);

        vec4 worldPos = modelMatrix * vec4(displaced, 1.0);
        vNormalW = normalize(mat3(modelMatrix) * n);
        vViewDir = normalize(cameraPosition - worldPos.xyz);

        gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
        #include <logdepthbuf_vertex>
    }
`;

const earthAuroraFragment = `
    #include <common>
    #include <logdepthbuf_pars_fragment>

    uniform float time;
    uniform float intensity;
    uniform vec3 sunDirection;

    varying vec3 vNormalW;
    varying vec3 vLocalN;
    varying vec3 vViewDir;
    varying float vBaseH;

    float hash13(vec3 p) {
        p = fract(p * 0.1031);
        p += dot(p, p.yzx + 33.33);
        return fract((p.x + p.y) * p.z);
    }

    float valueNoise(vec3 p) {
        vec3 i = floor(p);
        vec3 f = fract(p);
        // quintic smooth for less grid look than hermite
        vec3 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
        float n000 = hash13(i);
        float n100 = hash13(i + vec3(1.0, 0.0, 0.0));
        float n010 = hash13(i + vec3(0.0, 1.0, 0.0));
        float n110 = hash13(i + vec3(1.0, 1.0, 0.0));
        float n001 = hash13(i + vec3(0.0, 0.0, 1.0));
        float n101 = hash13(i + vec3(1.0, 0.0, 1.0));
        float n011 = hash13(i + vec3(0.0, 1.0, 1.0));
        float n111 = hash13(i + vec3(1.0, 1.0, 1.0));
        return mix(
            mix(mix(n000, n100, u.x), mix(n010, n110, u.x), u.y),
            mix(mix(n001, n101, u.x), mix(n011, n111, u.x), u.y),
            u.z
        );
    }

    float fbm(vec3 p) {
        float v = 0.0;
        float a = 0.5;
        for (int i = 0; i < 5; i++) {
            v += a * valueNoise(p);
            p = p * 2.11 + vec3(1.7, 9.2, 3.1);
            a *= 0.5;
        }
        return v;
    }

    // Crisp ridge from domain-warped noise (not periodic sin stripes)
    float ribbonRidge(vec2 uv, float sharpness) {
        float n = fbm(vec3(uv, 0.0));
        // Distance-to-ridge style: thin bright lines where noise crosses 0.5
        float d = abs(n - 0.5) * 2.0;
        return pow(1.0 - smoothstep(0.0, sharpness, d), 2.2);
    }

    void main() {
        #include <logdepthbuf_fragment>

        vec3 n = normalize(vLocalN);
        float lat = abs(n.y);
        float lon = atan(n.z, n.x);
        float t = time * 0.12;

        // Soft polar oval
        float band = smoothstep(0.75, 0.87, lat) * (1.0 - smoothstep(0.93, 0.999, lat));
        float halo = smoothstep(0.68, 0.83, lat) * (1.0 - smoothstep(0.90, 1.0, lat));
        band = pow(clamp(band * 0.85 + halo * 0.28, 0.0, 1.0), 1.2);
        if (band < 0.01) discard;

        // Heavy domain warp → irregular, non-repeating curves
        vec3 wp = vec3(lon * 1.4, lat * 5.5, t * 0.5);
        float w1 = fbm(wp);
        float w2 = fbm(wp * 1.7 + vec3(2.3, 1.1, 0.7));
        float w3 = fbm(wp * 2.9 + vec3(w1, w2, 1.9));

        float lonW = lon + (w1 - 0.5) * 1.4 + (w2 - 0.5) * 0.7;
        float latW = lat + (w2 - 0.5) * 0.08 + (w3 - 0.5) * 0.04;

        // Several sparse ridge families with different scales / phases
        vec2 uvA = vec2(lonW * 2.8 + latW * 9.0 + t * 0.6, latW * 14.0 + w3);
        vec2 uvB = vec2(lonW * 4.6 - latW * 6.0 - t * 0.4 + 1.7, latW * 11.0 + w1 * 2.0);
        vec2 uvC = vec2(lonW * 1.9 + latW * 16.0 + t * 0.25 + 3.1, lonW * 3.0 + w2);

        float rA = ribbonRidge(uvA, 0.14);
        float rB = ribbonRidge(uvB, 0.11);
        float rC = ribbonRidge(uvC * 1.15 + vec2(w1, w2), 0.10);

        // Continuous sparsity mask (no floor cells) — random holes along oval
        float sparse = fbm(vec3(lonW * 1.6, latW * 3.0, t * 0.15 + 4.0));
        sparse = smoothstep(0.48, 0.62, sparse); // keep ~half of the oval empty
        float sparse2 = fbm(vec3(lonW * 3.5 + 2.0, latW * 7.0, t * 0.2));
        sparse2 = smoothstep(0.40, 0.58, sparse2);
        float presence = sparse * sparse2;

        float ribbons = max(rA, max(rB * 0.9, rC * 0.8));
        // Slight secondary filament noise for organic texture
        float filament = pow(fbm(vec3(lonW * 8.0, latW * 20.0, t * 0.8)), 2.5);
        ribbons = max(ribbons, filament * 0.35 * presence);
        ribbons *= presence;

        float body = band * ribbons;
        if (body < 0.02) discard;

        // Height cue for color: base bulge + ridge intensity
        float h = clamp(vBaseH * 0.45 + ribbons * 0.7, 0.0, 1.0);

        // Night side
        vec3 Nw = normalize(vNormalW);
        float day = clamp(dot(Nw, normalize(sunDirection)) * 0.5 + 0.5, 0.0, 1.0);
        float night = 1.0 - smoothstep(0.22, 0.88, day);

        vec3 greenLow  = vec3(0.10, 0.52, 0.28);
        vec3 greenMain = vec3(0.20, 0.95, 0.40);
        vec3 redTip    = vec3(0.72, 0.14, 0.05);
        vec3 col = mix(greenLow, greenMain, smoothstep(0.08, 0.5, h));
        col = mix(col, redTip, smoothstep(0.55, 0.95, h) * 0.6);

        // Crisp alpha: sharp ridge falloff, still transparent overall
        float a = band * smoothstep(0.03, 0.2, ribbons);
        a *= night * intensity;
        float ndv = max(dot(Nw, normalize(vViewDir)), 0.0);
        float limb = pow(1.0 - ndv, 1.35);
        a *= 0.5 + 0.5 * limb;
        a = clamp(a * 0.5, 0.0, 1.0);

        if (a < 0.006) discard;
        gl_FragColor = vec4(col, a);
    }
`;

// ---------------------------------------------------------------------------
// Jupiter volumetric polar aurora (WebGL 2.0) — ray-marched shell
// North magnetic polar ice-storm swirl (sparkling blue)
//
// NOTE: Three.js r132 only injects modelMatrix into the *vertex* prefix.
// The fragment shader must declare it explicitly or the program fails to compile.
// ---------------------------------------------------------------------------
const auroraVertex = `
    #include <common>
    #include <logdepthbuf_pars_vertex>

    varying vec3 vPositionW;
    varying vec3 vLocalPos;
    varying vec3 vPlanetCenterW;

    void main() {
        vLocalPos = position;
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vPositionW = worldPos.xyz;
        vPlanetCenterW = (modelMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        #include <logdepthbuf_vertex>
    }
`;

const auroraFragment = `
    #include <common>
    #include <logdepthbuf_pars_fragment>

    // Required: not in Three r132 fragment prefix (only vertex). Without this the shader fails to compile.
    uniform mat4 modelMatrix;

    uniform float time;
    uniform vec3 sunDirection;
    uniform float intensity;
    uniform float variant;          // 0.0 = Earth, 1.0 = Jupiter
    uniform float planetRadius;     // world-space surface radius (fallback)
    uniform float atmosphereScale;  // outer shell = surface * atmosphereScale

    varying vec3 vPositionW;
    varying vec3 vLocalPos;
    varying vec3 vPlanetCenterW;

    // ---- compact value noise / FBM (object-space) ----
    float hash13(vec3 p) {
        p = fract(p * 0.1031);
        p += dot(p, p.yzx + 33.33);
        return fract((p.x + p.y) * p.z);
    }

    float hash12(vec2 p) {
        vec3 p3 = fract(vec3(p.xyx) * 0.1031);
        p3 += dot(p3, p3.yzx + 33.33);
        return fract((p3.x + p3.y) * p3.z);
    }

    float valueNoise(vec3 p) {
        vec3 i = floor(p);
        vec3 f = fract(p);
        vec3 u = f * f * (3.0 - 2.0 * f);
        float n000 = hash13(i + vec3(0.0, 0.0, 0.0));
        float n100 = hash13(i + vec3(1.0, 0.0, 0.0));
        float n010 = hash13(i + vec3(0.0, 1.0, 0.0));
        float n110 = hash13(i + vec3(1.0, 1.0, 0.0));
        float n001 = hash13(i + vec3(0.0, 0.0, 1.0));
        float n101 = hash13(i + vec3(1.0, 0.0, 1.0));
        float n011 = hash13(i + vec3(0.0, 1.0, 1.0));
        float n111 = hash13(i + vec3(1.0, 1.0, 1.0));
        float nx00 = mix(n000, n100, u.x);
        float nx10 = mix(n010, n110, u.x);
        float nx01 = mix(n001, n101, u.x);
        float nx11 = mix(n011, n111, u.x);
        return mix(mix(nx00, nx10, u.y), mix(nx01, nx11, u.y), u.z);
    }

    float fbm(vec3 p) {
        float v = 0.0;
        float a = 0.5;
        for (int i = 0; i < 4; i++) {
            v += a * valueNoise(p);
            p = p * 2.07 + vec3(1.7, 9.2, 3.1);
            a *= 0.5;
        }
        return v;
    }

    // Affine inverse: uniform scale * rotation + translation (planet meshes)
    vec3 worldToLocal(vec3 worldPos, vec3 center) {
        vec3 col0 = modelMatrix[0].xyz;
        vec3 col1 = modelMatrix[1].xyz;
        vec3 col2 = modelMatrix[2].xyz;
        float sx = max(length(col0), 1e-8);
        float sy = max(length(col1), 1e-8);
        float sz = max(length(col2), 1e-8);
        mat3 R = mat3(col0 / sx, col1 / sy, col2 / sz);
        vec3 d = worldPos - center;
        vec3 rl = transpose(R) * d;
        return vec3(rl.x / sx, rl.y / sy, rl.z / sz);
    }

    bool raySphere(vec3 ro, vec3 rd, float radius, out float t0, out float t1) {
        float b = dot(ro, rd);
        float c = dot(ro, ro) - radius * radius;
        float h = b * b - c;
        if (h < 0.0) return false;
        h = sqrt(h);
        t0 = -b - h;
        t1 = -b + h;
        return true;
    }

    // Jupiter: north magnetic-polar sparkling blue swirl (ice storm)
    // Real main oval / polar emissions sit poleward of ~70–75° magnetic latitude,
    // offset ~10° from the spin pole (dipole tilt). Not a hemisphere-scale cap.
    void jupiterDensity(vec3 localP, float hNorm, out float dens, out float heightTone) {
        vec3 n = normalize(localP);

        // Approximate north magnetic pole: ~10° tilt from geographic +Y
        // toward a fixed System III–inspired longitude in mesh-local XZ.
        const float magTilt = 0.175; // ~10°
        const float magLon  = 2.9;   // ~166° — slight offset from texture spin pole
        vec3 magPole = normalize(vec3(
            sin(magTilt) * cos(magLon),
            cos(magTilt),
            sin(magTilt) * sin(magLon)
        ));

        // 1 at magnetic north; ~0.940 ≈ 70° magnetic colatitude from equator
        float mDot = clamp(dot(n, magPole), -1.0, 1.0);

        // Polar cap with very long soft shoulders — no hard rim
        // Core near ~72–80°; wide halo fades from ~65° so edges dissolve
        float polarCore = smoothstep(0.90, 0.975, mDot);
        float polarHalo = smoothstep(0.82, 0.94, mDot) * (1.0 - smoothstep(0.97, 1.0, mDot));
        float polar = clamp(polarCore * 0.55 + polarHalo * 0.45, 0.0, 1.0);
        polar = pow(polar, 1.65); // gentle falloff, never a sharp disc

        // Angular distance from magnetic pole (0 at pole, grows toward equator)
        float angFromPole = acos(mDot); // radians
        // Confine swirl to ≲18–20° from mag pole (main oval + polar fill)
        float rNorm = clamp(angFromPole / 0.35, 0.0, 1.5); // 0.35 rad ≈ 20°

        // Orthonormal basis around magPole for swirl coordinates
        vec3 ref = abs(magPole.y) < 0.9 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
        vec3 e1 = normalize(cross(magPole, ref));
        vec3 e2 = cross(magPole, e1);
        float px = dot(n, e1);
        float pz = dot(n, e2);
        float theta = atan(pz, px);
        float t = time * 0.35;

        // Multi-arm spiral vortex in magnetic polar coords
        float spiral = theta * 3.5 + rNorm * 12.0 - t * 1.1;
        float spiral2 = theta * 6.0 - rNorm * 8.0 + t * 0.7;
        vec3 swirlP = vec3(
            cos(spiral) * rNorm * 4.5,
            sin(spiral) * rNorm * 4.5,
            mDot * 3.0 + t * 0.25
        );
        float swirl = fbm(swirlP);
        float arms = 0.5 + 0.5 * sin(spiral + swirl * 3.0);
        float arms2 = 0.5 + 0.5 * sin(spiral2 + swirl * 2.0);
        // Softer filament contrast so strands don't read as hard edges
        float filaments = smoothstep(0.12, 0.9, swirl) *
            mix(0.55, 1.0, max(arms, arms2 * 0.85));

        // Very gradual outer dissolve with magnetic radius
        float radialFade = 1.0 - smoothstep(0.15, 1.25, rNorm);
        radialFade = pow(max(radialFade, 0.0), 2.1);

        // Soft main-oval ring (wide Gaussian — no crisp ring line)
        float ovalRing = exp(-pow((mDot - 0.955) * 28.0, 2.0));
        ovalRing *= smoothstep(0.88, 0.96, mDot) * 0.55;

        float sparkCell = hash13(floor(n * 110.0 + vec3(0.0, 0.0, floor(time * 14.0))));
        // Gentle sparkle (brightness only — color stays blue in main())
        float sparkle = smoothstep(0.78, 0.98, sparkCell) *
            (0.35 + 0.35 * sin(time * 30.0 + sparkCell * 40.0));

        float heightMask = (1.0 - smoothstep(0.15, 1.0, hNorm)) *
            smoothstep(0.0, 0.12, hNorm);

        // Low density overall — translucent haze, not opaque ice
        float fill = polar * radialFade * mix(0.35, 0.75, filaments) * (0.55 + 0.45 * sparkle);
        fill += polar * radialFade * ovalRing * 0.45;
        dens = fill * heightMask * 0.35;
        dens = max(dens, polar * radialFade * heightMask * 0.04);
        // Soften residual micro-edges
        dens *= smoothstep(0.0, 0.04, dens) + dens * 0.5;
        dens *= 0.55;
        // Slight white-glow headroom on sparkles / high altitude (still mostly blue)
        heightTone = clamp(hNorm * 0.65 + sparkle * 0.35 + ovalRing * 0.15, 0.0, 0.85);
    }

    void main() {
        #include <logdepthbuf_fragment>

        vec3 planetCenter = vPlanetCenterW;
        // Derive shell radii from the mesh itself (robust to parent scale)
        float rOuter = length(vPositionW - planetCenter);
        // Prefer derived outer radius; fall back to uniform path if degenerate
        if (rOuter < 1e-8) {
            rOuter = max(planetRadius * atmosphereScale, 1e-6);
        }
        float rSurface = rOuter / max(atmosphereScale, 1.001);
        float rInner = rSurface * 1.01;

        vec3 roW = cameraPosition;
        vec3 rdW = normalize(vPositionW - cameraPosition);
        vec3 ro = roW - planetCenter;

        float tOuter0, tOuter1;
        if (!raySphere(ro, rdW, rOuter, tOuter0, tOuter1)) {
            discard;
        }

        float tInner0, tInner1;
        bool hitInner = raySphere(ro, rdW, rInner, tInner0, tInner1);

        float tStart = max(tOuter0, 0.0);
        float tEnd = tOuter1;
        if (hitInner && tInner0 > tStart) {
            tEnd = min(tEnd, tInner0);
        }
        if (tEnd <= tStart + 1e-6) {
            discard;
        }

        const int MAX_STEPS = 28;
        float chord = tEnd - tStart;
        float stepLen = chord / float(MAX_STEPS);
        float shellThick = max(rOuter - rInner, 1e-6);

        vec3 accumCol = vec3(0.0);
        float accumA = 0.0;
        vec3 sunDir = normalize(sunDirection);

        for (int i = 0; i < MAX_STEPS; i++) {
            float t = tStart + (float(i) + 0.5) * stepLen;
            vec3 posW = roW + rdW * t;
            vec3 localP = worldToLocal(posW, planetCenter);
            // Fallback if inverse is degenerate: use shell local direction
            if (dot(localP, localP) < 1e-12) {
                localP = vLocalPos;
            }

            float rad = length(posW - planetCenter);
            float hNorm = clamp((rad - rInner) / shellThick, 0.0, 1.0);

            float dens = 0.0;
            float tone = 0.0;
            vec3 sampleCol;

            jupiterDensity(localP, hNorm, dens, tone);
            // Deep indigo → electric blue → soft cyan, with a light white sparkle tip
            vec3 deep = vec3(0.02, 0.08, 0.42);
            vec3 mid  = vec3(0.08, 0.35, 0.95);
            vec3 cyan = vec3(0.15, 0.55, 1.0);
            vec3 white = vec3(0.75, 0.90, 1.0);
            sampleCol = mix(deep, mid, smoothstep(0.0, 0.4, tone));
            sampleCol = mix(sampleCol, cyan, smoothstep(0.35, 0.7, tone));
            sampleCol = mix(sampleCol, white, smoothstep(0.55, 0.9, tone) * 0.45);

            vec3 Nw = normalize(posW - planetCenter);
            float day = clamp(dot(Nw, sunDir) * 0.5 + 0.5, 0.0, 1.0);
            dens *= mix(0.55, 1.0, 1.0 - smoothstep(0.4, 0.95, day) * 0.45);

            // Scale-invariant optical depth
            dens *= intensity * 7.5 * (stepLen / shellThick);

            float a = 1.0 - exp(-dens * 1.8);
            a *= (1.0 - accumA);
            accumCol += sampleCol * a;
            accumA += a;

            if (accumA > 0.95) break;
        }

        accumA = smoothstep(0.0, 0.06, accumA) * accumA;
        if (accumA < 0.001) discard;

        vec3 outCol = accumCol / max(accumA, 1e-4);
        gl_FragColor = vec4(outCol, clamp(accumA, 0.0, 1.0));
    }
`;

// ---------------------------------------------------------------------------
// Jupiter southern-storm lightning (separate from polar aurora)
// GRS + other southern-hemisphere storm cells; varied arc patterns.
// Flash cadence / storm site driven by wall-clock JS.
// ---------------------------------------------------------------------------
const grsLightningVertex = `
    #include <common>
    #include <logdepthbuf_pars_vertex>

    varying vec2 vUv;
    varying vec3 vLocalPos;

    void main() {
        vUv = uv;
        vLocalPos = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        #include <logdepthbuf_vertex>
    }
`;

const grsLightningFragment = `
    #include <common>
    #include <logdepthbuf_pars_fragment>

    uniform float lightningFlash;   // 0..1 wall-clock event envelope
    uniform float lightningSeed;    // per-event shape seed
    // Active storm cell center (Three.js SphereGeometry UV: v=0 north, v=1 south)
    uniform vec2 stormUV;
    // Ellipse scale in UV (E–W, N–S) so d≈1 at cell rim
    uniform vec2 stormScale;
    uniform float intensity;

    varying vec2 vUv;
    varying vec3 vLocalPos;

    float hash12(vec2 p) {
        vec3 p3 = fract(vec3(p.xyx) * 0.1031);
        p3 += dot(p3, p3.yzx + 33.33);
        return fract((p3.x + p3.y) * p3.z);
    }

    // Distance to a jagged radial ray (spoke) at baseAng
    float spokeBolt(vec2 p, float rad, float ang, float baseAng, float seed, float bi) {
        float jag = 0.25 + 0.45 * hash12(vec2(seed, bi + 1.1));
        float pathAng = baseAng
            + jag * sin(rad * (6.0 + 10.0 * hash12(vec2(seed, bi + 2.2))) + seed * 1.3 + bi)
            + (0.08 + 0.2 * hash12(vec2(seed, bi + 3.3))) * sin(rad * 28.0 - seed * 0.7);
        float dAng = abs(atan(sin(ang - pathAng), cos(ang - pathAng)));
        float thin = 400.0 + 600.0 * hash12(vec2(seed, bi + 4.4));
        float core = exp(-dAng * dAng * thin);
        float glow = exp(-dAng * dAng * (thin * 0.12)) * 0.28;
        // Branch
        float brOff = (hash12(vec2(seed * 0.7, bi + 5.0)) - 0.5) * (0.5 + 0.6 * hash12(vec2(seed, bi + 6.0)));
        float brAng = pathAng + brOff;
        float dBr = abs(atan(sin(ang - brAng), cos(ang - brAng)));
        float branch = exp(-dBr * dBr * (thin * 0.75))
            * smoothstep(0.25, 0.5, rad) * (1.0 - smoothstep(0.7, 1.15, rad))
            * (0.25 + 0.45 * hash12(vec2(seed, bi + 7.0)));
        return core + glow + branch;
    }

    // Arc along roughly constant radius (circumferential)
    float ringBolt(vec2 p, float rad, float ang, float seed, float bi) {
        float r0 = 0.35 + 0.55 * hash12(vec2(seed, bi + 10.0));
        float rWobble = 0.06 * sin(ang * (3.0 + 4.0 * hash12(vec2(seed, bi + 11.0))) + seed);
        float dR = abs(rad - (r0 + rWobble));
        float span0 = hash12(vec2(seed, bi + 12.0)) * 6.2831853;
        float spanLen = 0.6 + 1.8 * hash12(vec2(seed, bi + 13.0));
        float aRel = atan(sin(ang - span0), cos(ang - span0));
        float along = smoothstep(spanLen, spanLen * 0.4, abs(aRel));
        float core = exp(-dR * dR * 180.0) * along;
        float glow = exp(-dR * dR * 40.0) * along * 0.3;
        return core + glow;
    }

    // Zigzag polyline-ish: alternating angle as radius grows
    float zigzagBolt(vec2 p, float rad, float ang, float seed, float bi) {
        float baseAng = hash12(vec2(seed, bi + 20.0)) * 6.2831853;
        float zigAmp = 0.4 + 0.7 * hash12(vec2(seed, bi + 21.0));
        float zigFreq = 4.0 + 8.0 * hash12(vec2(seed, bi + 22.0));
        float pathAng = baseAng + zigAmp * asin(sin(rad * zigFreq + seed));
        float dAng = abs(atan(sin(ang - pathAng), cos(ang - pathAng)));
        float core = exp(-dAng * dAng * 650.0) * smoothstep(0.12, 0.3, rad);
        float glow = exp(-dAng * dAng * 80.0) * 0.25;
        return core + glow;
    }

    // Fork: two main spokes from a common origin offset
    float forkBolt(vec2 p, float rad, float ang, float seed, float bi) {
        float root = hash12(vec2(seed, bi + 30.0)) * 6.2831853;
        float spread = 0.25 + 0.55 * hash12(vec2(seed, bi + 31.0));
        float a1 = root - spread * 0.5;
        float a2 = root + spread * 0.5;
        float s1 = spokeBolt(p, rad, ang, a1, seed + 11.0, bi);
        float s2 = spokeBolt(p, rad, ang, a2, seed + 27.0, bi + 1.0);
        return max(s1, s2 * 0.9);
    }

    void main() {
        #include <logdepthbuf_fragment>

        if (lightningFlash < 0.001) discard;

        // UV offset from active storm cell (wrap longitude)
        float du = vUv.x - stormUV.x;
        du = du - floor(du + 0.5);
        float dv = vUv.y - stormUV.y;

        vec2 scale = max(stormScale, vec2(0.02, 0.015));
        vec2 p = vec2(du / scale.x, dv / scale.y);
        float d = length(p);

        // Active region around the storm cell (rim + neighborhood)
        float region = smoothstep(1.55, 0.45, d) * smoothstep(0.05, 0.28, d);
        if (region < 0.001) discard;

        float seed = lightningSeed;
        float ang = atan(p.y, p.x);
        float rad = d;

        // Pattern family 0..3 from seed (varies each flash)
        float styleRoll = hash12(vec2(seed, 0.17));
        float bolt = 0.0;

        // 1–4 strokes depending on seed
        float nStrokeF = 1.0 + floor(hash12(vec2(seed, 0.31)) * 4.0);
        for (int b = 0; b < 4; b++) {
            if (float(b) >= nStrokeF) break;
            float bi = float(b);
            float stroke = 0.0;

            if (styleRoll < 0.28) {
                // Radial spokes
                float baseAng = (hash12(vec2(seed, bi * 19.1)) * 6.2831853) + bi * 1.3;
                stroke = spokeBolt(p, rad, ang, baseAng, seed, bi);
            } else if (styleRoll < 0.52) {
                // Circumferential arcs
                stroke = ringBolt(p, rad, ang, seed, bi);
            } else if (styleRoll < 0.76) {
                // Zigzag bolts
                stroke = zigzagBolt(p, rad, ang, seed, bi);
            } else {
                // Forked pairs
                stroke = forkBolt(p, rad, ang, seed, bi);
            }

            // Mix-in: occasionally add a second style on the same flash for variety
            if (hash12(vec2(seed, bi + 40.0)) > 0.65) {
                float baseAng2 = hash12(vec2(seed * 1.7, bi)) * 6.2831853;
                stroke = max(stroke, spokeBolt(p, rad, ang, baseAng2, seed + 50.0, bi) * 0.55);
            }

            bolt += stroke * (0.7 + 0.3 * hash12(vec2(seed, bi + 9.0)));
        }

        bolt *= region * lightningFlash * intensity;
        bolt = min(bolt, 1.15) * 0.5;
        if (bolt < 0.002) discard;

        // Warm-white / pale yellow (cloud-top lightning)
        float warm = hash12(vec2(seed, 99.0));
        vec3 col = mix(vec3(0.85, 0.9, 1.0), vec3(1.0, 0.92, 0.7), 0.25 + 0.35 * warm);
        gl_FragColor = vec4(col, clamp(bolt, 0.0, 1.0));
    }
`;

// Minimal fullscreen bloom shaders
const bloomCompositeVertex = `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = vec4(position.xy, 0.0, 1.0);
    }
`;

const bloomBrightFragment = `
    uniform sampler2D tDiffuse;
    uniform float threshold;
    varying vec2 vUv;
    void main() {
        vec4 c = texture2D(tDiffuse, vUv);
        float brightness = dot(c.rgb, vec3(0.2126, 0.7152, 0.0722));
        float contrib = max(brightness - threshold, 0.0);
        gl_FragColor = vec4(c.rgb * contrib * 1.5, 1.0);
    }
`;

const bloomBlurFragment = `
    uniform sampler2D tDiffuse;
    uniform vec2 direction;
    uniform vec2 resolution;
    varying vec2 vUv;
    void main() {
        vec2 texel = direction / resolution;
        vec3 result = texture2D(tDiffuse, vUv).rgb * 0.227027;
        result += texture2D(tDiffuse, vUv + texel * 1.384615).rgb * 0.316216;
        result += texture2D(tDiffuse, vUv - texel * 1.384615).rgb * 0.316216;
        result += texture2D(tDiffuse, vUv + texel * 3.230769).rgb * 0.070270;
        result += texture2D(tDiffuse, vUv - texel * 3.230769).rgb * 0.070270;
        gl_FragColor = vec4(result, 1.0);
    }
`;

const bloomCombineFragment = `
    uniform sampler2D tDiffuse;
    uniform sampler2D tBloom;
    uniform float strength;
    varying vec2 vUv;
    void main() {
        vec4 base = texture2D(tDiffuse, vUv);
        vec4 bloom = texture2D(tBloom, vUv);
        gl_FragColor = vec4(base.rgb + bloom.rgb * strength, 1.0);
    }
`;

// ---------------------------------------------------------------------------
// Solar flares / plasma ejecta (WebGL 2.0) — ray-marched volumetric shell
//
// Random CME-style jets, magnetic prominence loops, and corona streamers
// with domain-warped FBM plasma. Active regions re-seed on staggered epochs
// so ejecta appear to erupt from different points on the photosphere.
//
// NOTE: Three.js r132 only injects modelMatrix into the *vertex* prefix.
// The fragment shader must declare it explicitly or the program fails to compile.
// ---------------------------------------------------------------------------
const sunFlareVertex = `
    #include <common>
    #include <logdepthbuf_pars_vertex>

    varying vec3 vPositionW;
    varying vec3 vLocalPos;
    varying vec3 vSunCenterW;

    void main() {
        vLocalPos = position;
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vPositionW = worldPos.xyz;
        vSunCenterW = (modelMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        #include <logdepthbuf_vertex>
    }
`;

const sunFlareFragment = `
    #include <common>
    #include <logdepthbuf_pars_fragment>

    // Required: not in Three r132 fragment prefix (only vertex).
    uniform mat4 modelMatrix;

    uniform float time;
    uniform float intensity;
    uniform float sunRadius;         // world-space surface radius
    uniform float atmosphereScale;   // outer shell = surface * atmosphereScale

    varying vec3 vPositionW;
    varying vec3 vLocalPos;
    varying vec3 vSunCenterW;

    // ---- hash / noise -------------------------------------------------------
    float hash11(float p) {
        p = fract(p * 0.1031);
        p *= p + 33.33;
        p *= p + p;
        return fract(p);
    }

    float hash13(vec3 p) {
        p = fract(p * 0.1031);
        p += dot(p, p.yzx + 33.33);
        return fract((p.x + p.y) * p.z);
    }

    vec3 hash33(vec3 p) {
        p = vec3(
            dot(p, vec3(127.1, 311.7, 74.7)),
            dot(p, vec3(269.5, 183.3, 246.1)),
            dot(p, vec3(113.5, 271.9, 124.6))
        );
        return fract(sin(p) * 43758.5453123);
    }

    // Quasi-uniform direction on the sphere from a seed
    vec3 sphereDir(float seed) {
        vec3 h = hash33(vec3(seed, seed * 1.37, seed * 2.71));
        float z = h.x * 2.0 - 1.0;
        float a = h.y * 6.28318530718;
        float r = sqrt(max(1.0 - z * z, 0.0));
        return normalize(vec3(r * cos(a), z, r * sin(a)));
    }

    float valueNoise(vec3 p) {
        vec3 i = floor(p);
        vec3 f = fract(p);
        vec3 u = f * f * (3.0 - 2.0 * f);
        float n000 = hash13(i + vec3(0.0, 0.0, 0.0));
        float n100 = hash13(i + vec3(1.0, 0.0, 0.0));
        float n010 = hash13(i + vec3(0.0, 1.0, 0.0));
        float n110 = hash13(i + vec3(1.0, 1.0, 0.0));
        float n001 = hash13(i + vec3(0.0, 0.0, 1.0));
        float n101 = hash13(i + vec3(1.0, 0.0, 1.0));
        float n011 = hash13(i + vec3(0.0, 1.0, 1.0));
        float n111 = hash13(i + vec3(1.0, 1.0, 1.0));
        float nx00 = mix(n000, n100, u.x);
        float nx10 = mix(n010, n110, u.x);
        float nx01 = mix(n001, n101, u.x);
        float nx11 = mix(n011, n111, u.x);
        return mix(mix(nx00, nx10, u.y), mix(nx01, nx11, u.y), u.z);
    }

    float fbm(vec3 p) {
        float v = 0.0;
        float a = 0.5;
        for (int i = 0; i < 4; i++) {
            v += a * valueNoise(p);
            p = p * 2.11 + vec3(1.7, 9.2, 3.1);
            a *= 0.5;
        }
        return v;
    }

    // Domain-warped plasma (two-pass warp) — organic filaments
    float plasmaFBM(vec3 p) {
        vec3 q = vec3(
            fbm(p),
            fbm(p + vec3(5.2, 1.3, 2.8)),
            fbm(p + vec3(1.7, 9.2, 3.4))
        );
        vec3 r = vec3(
            fbm(p + 4.0 * q + vec3(1.7, 9.2, 3.4) + time * 0.05),
            fbm(p + 4.0 * q + vec3(8.3, 2.8, 1.1) - time * 0.04),
            fbm(p + 4.0 * q + vec3(2.1, 4.5, 7.9) + time * 0.03)
        );
        return fbm(p + 4.0 * r);
    }

    // Affine inverse for uniform-scale * rotation + translation (sun mesh)
    vec3 worldToLocal(vec3 worldPos, vec3 center) {
        vec3 col0 = modelMatrix[0].xyz;
        vec3 col1 = modelMatrix[1].xyz;
        vec3 col2 = modelMatrix[2].xyz;
        float sx = max(length(col0), 1e-8);
        float sy = max(length(col1), 1e-8);
        float sz = max(length(col2), 1e-8);
        mat3 R = mat3(col0 / sx, col1 / sy, col2 / sz);
        vec3 d = worldPos - center;
        vec3 rl = transpose(R) * d;
        return vec3(rl.x / sx, rl.y / sy, rl.z / sz);
    }

    bool raySphere(vec3 ro, vec3 rd, float radius, out float t0, out float t1) {
        float b = dot(ro, rd);
        float c = dot(ro, ro) - radius * radius;
        float h = b * b - c;
        if (h < 0.0) return false;
        h = sqrt(h);
        t0 = -b - h;
        t1 = -b + h;
        return true;
    }

    // Soft envelope for flare life-cycle (rise / peak / decay)
    float flareEnvelope(float age) {
        float rise  = smoothstep(0.0, 0.12, age);
        float peak  = 1.0 - smoothstep(0.35, 0.75, age);
        float decay = 1.0 - smoothstep(0.75, 1.0, age);
        return rise * max(peak, 0.0) * max(decay + 0.35 * (1.0 - age), 0.0);
    }

    // Distance to a circular prominence arc (magnetic loop) above the surface.
    // foot = unit direction of arc base; halfAngle = angular half-span of feet.
    float prominenceLoop(vec3 n, float hNorm, vec3 foot, float halfAngle, float loopH) {
        // Build orthonormal frame with foot as "pole" of the loop plane
        vec3 ref = abs(foot.y) < 0.9 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
        vec3 e1 = normalize(cross(foot, ref));
        vec3 e2 = cross(foot, e1);

        // Arc lives in plane of e1 × foot (tilted by a small random roll via e2 mix)
        float px = dot(n, e1);
        float py = dot(n, foot);
        float pz = dot(n, e2);

        // Ideal loop: semicircle in (px, py) rising to loopH at midspan
        float ang = atan(px, py); // 0 at foot apex direction
        float span = halfAngle;
        float along = abs(ang) / max(span, 1e-3);
        if (along > 1.15) return 1e3;

        // Target height along the arc (parabola-like rise)
        float targetH = loopH * (1.0 - along * along);
        float hErr = abs(hNorm - targetH);
        // Lateral thickness of the loop tube
        float lat = abs(pz);
        float tube = length(vec2(hErr * 1.8, lat * 2.4));
        // Fade near footpoints so loops meet the surface softly
        float footFade = smoothstep(1.15, 0.55, along);
        return tube / max(footFade, 0.15);
    }

    // Soft corona streamer density — subtle, close to the surface
    float coronaStreamers(vec3 n, float hNorm, float t) {
        float lat = n.y;
        vec3 p = n * 5.5 + vec3(0.0, 0.0, t * 0.08);
        float fil = fbm(p * 1.6);
        float radialPref = smoothstep(0.05, 0.4, hNorm) * (1.0 - smoothstep(0.5, 0.9, hNorm));
        float polar = smoothstep(0.4, 0.92, abs(lat));
        float eq = 1.0 - smoothstep(0.0, 0.5, abs(lat));
        float mask = mix(eq * 0.4, polar, 0.4);
        float strands = smoothstep(0.5, 0.82, fil);
        return strands * mask * radialPref * 0.07;
    }

    // Chromospheric base — thin hot sheath sealed to the photosphere (hNorm≈0)
    float chromosphere(float hNorm) {
        // Soft peak at the surface so limb has no dark gap under ejecta roots
        return exp(-hNorm * 18.0) * 0.18 * (1.0 - smoothstep(0.12, 0.28, hNorm));
    }

    // Evaluate concurrent flare slots (tight footprint, taller ejecta + heat haze)
    void evaluateFlares(vec3 n, float hNorm, float t, out float dens, out float heat) {
        dens = 0.0;
        heat = 0.0;

        float stream = coronaStreamers(n, hNorm, t);
        dens += stream;
        heat += stream * 0.25;

        float chromo = chromosphere(hNorm);
        dens += chromo;
        heat += chromo * 0.4;

        const int SLOTS = 8;
        for (int s = 0; s < SLOTS; s++) {
            float si = float(s);
            float period = 6.0 + hash11(si * 17.13) * 5.5;
            float phase  = hash11(si * 91.7) * period;
            float timeline = (t + phase) / period;
            float epoch = floor(timeline);
            float age = fract(timeline);

            float env = flareEnvelope(age);
            if (env < 0.012) continue;

            float seed = epoch * 19.17 + si * 7.31 + 3.1;
            vec3 foot = sphereDir(seed);
            float align = dot(n, foot);

            // Tight core footprint (surface radius stays small)
            float halfAng = mix(0.12, 0.22, hash11(seed + 1.1));
            // Haze is wider than the jet core so we early-out only when far from both
            float nearRegion = smoothstep(0.72, 0.96, align);
            if (nearRegion < 0.002) continue;

            float cone = smoothstep(0.88, 0.985, align);
            // Soft angular mask for heat haze (broader than plasma core)
            float hazeCone = smoothstep(0.78, 0.94, align);

            // How far this eruption reaches (fraction of shell height)
            float jetLen = mix(0.35, 0.95, smoothstep(0.05, 0.55, age));
            float alongJet = hNorm / max(jetLen, 0.05);
            float inJetLen = 1.0 - smoothstep(0.82, 1.08, alongJet);
            // Haze extends a little past the jet tip and spreads lower
            float inHazeLen = 1.0 - smoothstep(0.9, 1.2, alongJet);
            inHazeLen *= smoothstep(0.0, 0.08, hNorm);

            // Shared turbulence field for jet + haze
            vec3 jetP = n * 8.0 + foot * 3.0 + vec3(0.0, 0.0, t * 0.4 + seed);
            jetP -= foot * (age * 1.4 + hNorm * 2.0);
            float turb = 0.0;
            float needTurb = step(0.01, max(cone, hazeCone) * env);
            if (needTurb > 0.5) {
                turb = plasmaFBM(jetP);
            }

            // --- Hot plasma jet core (tight, bright) ---
            if (cone > 0.01) {
                float coreAlign = pow(max(align, 0.0), mix(48.0, 22.0, age));
                float filaments = smoothstep(0.4, 0.88, turb);
                float spine = exp(-pow((1.0 - coreAlign) * 14.0, 2.0));
                float sheath = exp(-pow((1.0 - coreAlign) * 5.5, 2.0)) * filaments;

                float jet = (spine * 1.15 + sheath * 0.75) * inJetLen * cone * env;
                jet *= mix(1.1, 0.55, age);
                dens += jet * 0.75;
                // Hot fireball cores — small but intense
                heat += jet * mix(1.15, 0.45, alongJet);

                float sprayGate = step(0.58, hash11(seed + 4.2));
                float spray = pow(max(align, 0.0), 14.0) *
                    smoothstep(0.05, 0.35, hNorm) *
                    (1.0 - smoothstep(0.45, 0.85, hNorm)) *
                    smoothstep(0.45, 0.8, turb) * env * sprayGate * 0.35;
                dens += spray;
                heat += spray * 0.55;
            }

            // --- Heat haze: soft shimmering envelope around the ejecta ---
            if (hazeCone > 0.01 && env > 0.02) {
                // Angular falloff wider than the jet; shimmer from low-freq noise
                float angSoft = pow(max(align, 0.0), mix(10.0, 5.5, age));
                float shimmer = 0.55 + 0.45 * fbm(n * 4.5 + vec3(t * 0.55, seed * 0.1, hNorm * 2.0));
                // Domain-warp wobble so the haze "breathes"
                float warp = 0.65 + 0.35 * sin(turb * 6.2831 + t * 1.8 + seed);
                float haze = angSoft * inHazeLen * hazeCone * env * shimmer * warp;
                // Stronger near the jet mid-height, thinner at tip
                haze *= mix(1.0, 0.45, smoothstep(0.2, 0.95, alongJet));
                // Low density volume — reads as glow, not solid plasma
                dens += haze * 0.28;
                heat += haze * 0.22;
            }

            // --- Small prominence loops ---
            float loopH = mix(0.2, 0.5, hash11(seed + 2.3));
            float loopEnv = env * smoothstep(0.08, 0.25, age) * (1.0 - smoothstep(0.7, 0.95, age));
            if (loopEnv > 0.01 && align > 0.75) {
                float dLoop = prominenceLoop(n, hNorm, foot, halfAng, loopH);
                float loop = exp(-dLoop * dLoop * 32.0) * loopEnv;
                float loopTurb = smoothstep(0.35, 0.85, fbm(n * 12.0 + vec3(t * 0.2, seed, 0.0)));
                loop *= 0.45 + 0.45 * loopTurb;
                dens += loop * 0.6;
                heat += loop * 0.55;

                // Soft haze halo around the loop
                float loopHaze = exp(-dLoop * dLoop * 8.0) * loopEnv * 0.18;
                dens += loopHaze;
                heat += loopHaze * 0.2;
            }

            // Footpoint brightening — peaks at photosphere (hNorm≈0) to seal limb
            float footGlow = pow(max(align, 0.0), 80.0) * exp(-hNorm * 22.0) * env * 0.75;
            dens += footGlow;
            heat += footGlow * 0.9;
        }

        dens = max(dens, 0.0);
        heat = clamp(heat, 0.0, 2.2);
    }

    // Blackbody-ish flare color: deep red → orange → gold → white-hot core
    vec3 flareColor(float heat, float hNorm) {
        vec3 deep  = vec3(0.55, 0.05, 0.01);
        vec3 red   = vec3(1.00, 0.18, 0.02);
        vec3 orange= vec3(1.00, 0.45, 0.05);
        vec3 gold  = vec3(1.00, 0.78, 0.25);
        vec3 white = vec3(1.00, 0.96, 0.88);
        vec3 blueW = vec3(0.85, 0.92, 1.00); // hottest core tip

        float h = clamp(heat, 0.0, 1.8);
        vec3 c = deep;
        c = mix(c, red,    smoothstep(0.0, 0.22, h));
        c = mix(c, orange, smoothstep(0.18, 0.48, h));
        c = mix(c, gold,   smoothstep(0.4, 0.75, h));
        c = mix(c, white,  smoothstep(0.65, 1.2, h));
        c = mix(c, blueW,  smoothstep(1.0, 1.7, h) * 0.6);
        // Outer plume / haze cools toward amber
        c = mix(c, orange, smoothstep(0.4, 0.95, hNorm) * 0.3 * (1.0 - smoothstep(0.8, 1.4, h)));
        return c;
    }

    void main() {
        #include <logdepthbuf_fragment>

        vec3 sunCenter = vSunCenterW;
        float rOuter = length(vPositionW - sunCenter);
        if (rOuter < 1e-8) {
            rOuter = max(sunRadius * atmosphereScale, 1e-6);
        }
        float rSurface = rOuter / max(atmosphereScale, 1.001);
        // Tiny overlap under the photosphere so limb has no dark hairline gap
        // (tessellation / log-depth); samples still stop at the opaque disk.
        float rInner = rSurface * 0.998;

        vec3 roW = cameraPosition;
        vec3 rdW = normalize(vPositionW - cameraPosition);
        vec3 ro = roW - sunCenter;

        float tOuter0, tOuter1;
        if (!raySphere(ro, rdW, rOuter, tOuter0, tOuter1)) {
            discard;
        }

        float tInner0, tInner1;
        bool hitInner = raySphere(ro, rdW, rInner, tInner0, tInner1);

        float tStart = max(tOuter0, 0.0);
        float tEnd = tOuter1;
        // March only the shell exterior (stop when ray hits photosphere sphere)
        if (hitInner && tInner0 > tStart) {
            tEnd = min(tEnd, tInner0);
        }
        if (tEnd <= tStart + 1e-6) {
            discard;
        }

        const int MAX_STEPS = 36;
        float chord = tEnd - tStart;
        float stepLen = chord / float(MAX_STEPS);
        // Height 0 = true photosphere (not an elevated inner wall)
        float shellThick = max(rOuter - rSurface, 1e-6);

        vec3 accumCol = vec3(0.0);
        float accumA = 0.0;

        for (int i = 0; i < MAX_STEPS; i++) {
            float t = tStart + (float(i) + 0.5) * stepLen;
            vec3 posW = roW + rdW * t;
            vec3 localP = worldToLocal(posW, sunCenter);
            if (dot(localP, localP) < 1e-12) {
                localP = vLocalPos;
            }

            float rad = length(posW - sunCenter);
            float hNorm = clamp((rad - rSurface) / shellThick, 0.0, 1.0);
            vec3 n = normalize(localP);

            float dens = 0.0;
            float heat = 0.0;
            evaluateFlares(n, hNorm, time, dens, heat);

            dens *= intensity * 3.8 * (stepLen / shellThick);

            vec3 sampleCol = flareColor(heat, hNorm);
            // Hot cores bloom; haze stays softer
            sampleCol *= 1.0 + heat * 0.55;

            float a = 1.0 - exp(-dens * 1.35);
            a *= (1.0 - accumA);
            accumCol += sampleCol * a;
            accumA += a;

            if (accumA > 0.94) break;
        }

        accumA = smoothstep(0.0, 0.04, accumA) * accumA;
        if (accumA < 0.001) discard;

        vec3 outCol = accumCol / max(accumA, 1e-4);
        gl_FragColor = vec4(outCol * clamp(accumA, 0.0, 1.0), clamp(accumA * 0.95, 0.0, 1.0));
    }
`;

const ss_shaders = {
    sunEmissiveVertex: sunEmissiveVertex,
    sunEmissiveFragment: sunEmissiveFragment,
    sunCoronaVertex: sunCoronaVertex,
    sunCoronaFragment: sunCoronaFragment,
    sunGlowVertex: sunGlowVertex,
    sunGlowFragment: sunGlowFragment,
    sunFresnelFragment: sunFresnelFragment,
    sunFlareVertex: sunFlareVertex,
    sunFlareFragment: sunFlareFragment,
    advancedPlanetVertex: advancedPlanetVertex,
    softPlanetFragment: softPlanetFragment,
    earthSurfaceFragment: earthSurfaceFragment,
    ringVertex: ringVertex,
    ringFragment: ringFragment,
    earthAuroraVertex: earthAuroraVertex,
    earthAuroraFragment: earthAuroraFragment,
    auroraVertex: auroraVertex,
    auroraFragment: auroraFragment,
    grsLightningVertex: grsLightningVertex,
    grsLightningFragment: grsLightningFragment,
    bloomCompositeVertex: bloomCompositeVertex,
    bloomBrightFragment: bloomBrightFragment,
    bloomBlurFragment: bloomBlurFragment,
    bloomCombineFragment: bloomCombineFragment
};