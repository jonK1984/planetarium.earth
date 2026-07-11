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
            if (hasNightMap > 0.5) {
                lights = texture2D(nightMap, vUv).rgb;
            } else {
                float land = hasSpecularMap > 0.5 ? (1.0 - texture2D(specularMap, vUv).r) : 0.3;
                float n = fract(sin(dot(vUv, vec2(12.9898, 78.233))) * 43758.5453);
                lights = vec3(1.0, 0.85, 0.55) * land * step(0.97, n) * 1.5;
            }
            color += lights * nightFactor * 1.4;
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

// Earth aurora band
const auroraVertex = `
    #include <common>
    #include <logdepthbuf_pars_vertex>

    varying vec3 vNormalW;
    varying vec3 vPositionW;
    varying vec2 vUv;

    void main() {
        vUv = uv;
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vPositionW = worldPos.xyz;
        vNormalW = normalize(mat3(modelMatrix) * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        #include <logdepthbuf_vertex>
    }
`;

const auroraFragment = `
    #include <common>
    #include <logdepthbuf_pars_fragment>

    uniform float time;
    uniform vec3 sunDirection;
    uniform float intensity;

    varying vec3 vNormalW;
    varying vec3 vPositionW;
    varying vec2 vUv;

    void main() {
        #include <logdepthbuf_fragment>

        vec3 N = normalize(vNormalW);
        float lat = abs(N.y);
        float band = smoothstep(0.72, 0.82, lat) * (1.0 - smoothstep(0.93, 0.995, lat));
        float n1 = sin(vUv.x * 40.0 + time * 1.5 + N.y * 8.0);
        float n2 = sin(vUv.x * 70.0 - time * 2.2 + N.x * 12.0);
        float curtains = 0.55 + 0.45 * n1 * n2;
        float night = 1.0 - clamp(dot(N, normalize(sunDirection)) * 0.5 + 0.5, 0.0, 1.0);
        night = smoothstep(0.35, 0.9, night);

        float a = band * curtains * night * intensity;
        vec3 col = mix(vec3(0.1, 1.0, 0.45), vec3(0.7, 0.2, 1.0), smoothstep(0.8, 0.92, lat));
        gl_FragColor = vec4(col, a * 0.65);
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

const ss_shaders = {
    sunEmissiveVertex: sunEmissiveVertex,
    sunEmissiveFragment: sunEmissiveFragment,
    sunCoronaVertex: sunCoronaVertex,
    sunCoronaFragment: sunCoronaFragment,
    sunGlowVertex: sunGlowVertex,
    sunGlowFragment: sunGlowFragment,
    sunFresnelFragment: sunFresnelFragment,
    advancedPlanetVertex: advancedPlanetVertex,
    softPlanetFragment: softPlanetFragment,
    earthSurfaceFragment: earthSurfaceFragment,
    ringVertex: ringVertex,
    ringFragment: ringFragment,
    auroraVertex: auroraVertex,
    auroraFragment: auroraFragment,
    bloomCompositeVertex: bloomCompositeVertex,
    bloomBrightFragment: bloomBrightFragment,
    bloomBlurFragment: bloomBlurFragment,
    bloomCombineFragment: bloomCombineFragment
};