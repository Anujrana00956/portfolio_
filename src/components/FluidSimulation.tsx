"use client";

import React, { useEffect, useRef } from 'react';

/* 
 * High-Fidelity WebGL Fluid Simulation
 * Features: Vorticity Confinement, Bloom, High-Intensity Color Splats
 */

export default function FluidSimulation() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = canvas.getContext('webgl', { alpha: true, depth: false, antialias: false });
        if (!gl) return;

        const config = {
            SIM_RESOLUTION: 128,
            DYE_RESOLUTION: 1024,
            DENSITY_DISSIPATION: 1,
            VELOCITY_DISSIPATION: 0.98,
            PRESSURE_ITERATIONS: 20,
            SPLAT_RADIUS: 0.25,
            SPLAT_FORCE: 6000,
            VORTICITY: 30,
            BLOOM: true,
            BLOOM_ITERATIONS: 8,
            BLOOM_RESOLUTION: 256,
            BLOOM_INTENSITY: 0.8,
            BLOOM_THRESHOLD: 0.6,
            BLOOM_SOFT_KNEE: 0.7
        };

        // --- Shaders ---
        const baseVertexShader = `
            precision highp float;
            attribute vec2 aPosition;
            varying vec2 vUv;
            varying vec2 vL;
            varying vec2 vR;
            varying vec2 vT;
            varying vec2 vB;
            uniform vec2 uTexelSize;
            void main () {
                vUv = aPosition * 0.5 + 0.5;
                vL = vUv - vec2(uTexelSize.x, 0.0);
                vR = vUv + vec2(uTexelSize.x, 0.0);
                vT = vUv + vec2(0.0, uTexelSize.y);
                vB = vUv - vec2(0.0, uTexelSize.y);
                gl_Position = vec4(aPosition, 0.0, 1.0);
            }
        `;

        const copyShader = `
            precision highp float;
            varying vec2 vUv;
            uniform sampler2D uTexture;
            void main () {
                gl_FragColor = texture2D(uTexture, vUv);
            }
        `;

        const displayShader = `
            precision highp float;
            varying vec2 vUv;
            uniform sampler2D uTexture;
            uniform sampler2D uBloom;
            uniform float uBloomIntensity;
            void main () {
                vec3 C = texture2D(uTexture, vUv).rgb;
                vec3 bloom = texture2D(uBloom, vUv).rgb;
                gl_FragColor = vec4(C + bloom * uBloomIntensity, 1.0);
            }
        `;

        const splatShader = `
            precision highp float;
            varying vec2 vUv;
            uniform sampler2D uTarget;
            uniform float uAspectRatio;
            uniform vec3 uColor;
            uniform vec2 uPoint;
            uniform float uRadius;
            void main () {
                vec2 p = vUv - uPoint.xy;
                p.x *= uAspectRatio;
                vec3 splat = exp(-dot(p, p) / uRadius) * uColor;
                vec3 base = texture2D(uTarget, vUv).xyz;
                gl_FragColor = vec4(base + splat, 1.0);
            }
        `;

        const advectionShader = `
            precision highp float;
            varying vec2 vUv;
            uniform sampler2D uVelocity;
            uniform sampler2D uSource;
            uniform vec2 uTexelSize;
            uniform float uDt;
            uniform float uDissipation;
            void main () {
                vec2 coord = vUv - uDt * texture2D(uVelocity, vUv).xy * uTexelSize;
                gl_FragColor = uDissipation * texture2D(uSource, coord);
            }
        `;

        const curlShader = `
            precision highp float;
            varying vec2 vL;
            varying vec2 vR;
            varying vec2 vT;
            varying vec2 vB;
            void main () {
                float L = texture2D(uVelocity, vL).y;
                float R = texture2D(uVelocity, vR).y;
                float T = texture2D(uVelocity, vT).x;
                float B = texture2D(uVelocity, vB).x;
                float curl = R - L - T + B;
                gl_FragColor = vec4(0.5 * curl, 0.0, 0.0, 1.0);
            }
        `;

        const vorticityShader = `
            precision highp float;
            varying vec2 vL;
            varying vec2 vR;
            varying vec2 vT;
            varying vec2 vB;
            varying vec2 vUv;
            uniform sampler2D uVelocity;
            uniform sampler2D uCurl;
            uniform float uCurlStrength;
            uniform float uDt;
            void main () {
                float L = texture2D(uCurl, vL).x;
                float R = texture2D(uCurl, vR).x;
                float T = texture2D(uCurl, vT).x;
                float B = texture2D(uCurl, vB).x;
                float C = texture2D(uCurl, vUv).x;
                vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
                force /= length(force) + 0.0001;
                force *= uCurlStrength * C;
                vec2 vel = texture2D(uVelocity, vUv).xy;
                gl_FragColor = vec4(vel + force * uDt, 0.0, 1.0);
            }
        `;

        const pressureShader = `
            precision highp float;
            varying vec2 vL;
            varying vec2 vR;
            varying vec2 vT;
            varying vec2 vB;
            uniform sampler2D uPressure;
            uniform sampler2D uDivergence;
            void main () {
                float L = texture2D(uPressure, vL).x;
                float R = texture2D(uPressure, vR).x;
                float T = texture2D(uPressure, vT).x;
                float B = texture2D(uPressure, vB).x;
                float div = texture2D(uDivergence, vUv).x;
                float p = (L + R + B + T - div) * 0.25;
                gl_FragColor = vec4(p, 0.0, 0.0, 1.0);
            }
        `;

        const bloomPrefilterShader = `
            precision highp float;
            varying vec2 vUv;
            uniform sampler2D uTexture;
            uniform vec3 uCurve;
            uniform float uThreshold;
            void main () {
                vec3 c = texture2D(uTexture, vUv).rgb;
                float br = max(c.r, max(c.g, c.b));
                float rq = clamp(br - uCurve.x, 0.0, uCurve.y);
                rq = uCurve.z * rq * rq;
                c *= max(rq, br - uThreshold) / max(br, 0.0001);
                gl_FragColor = vec4(c, 1.0);
            }
        `;

        const bloomBlurShader = `
            precision highp float;
            varying vec2 vUv;
            uniform sampler2D uTexture;
            uniform vec2 uTexelSize;
            void main () {
                vec4 c = texture2D(uTexture, vUv) * 4.0;
                c += texture2D(uTexture, vUv - uTexelSize);
                c += texture2D(uTexture, vUv + uTexelSize);
                c += texture2D(uTexture, vUv + vec2(uTexelSize.x, -uTexelSize.y));
                c += texture2D(uTexture, vUv + vec2(-uTexelSize.x, uTexelSize.y));
                gl_FragColor = c * 0.125;
            }
        `;

        // --- Helper Classes & Data ---
        interface FBO {
            tex: WebGLTexture;
            fbo: WebGLFramebuffer;
            width: number;
            height: number;
        }

        interface DoubleFBO {
            read: FBO;
            write: FBO;
            swap: () => void;
            delete: () => void;
        }

        function createProgram(vertexSource: string, fragmentSource: string) {
            const vs = gl!.createShader(gl!.VERTEX_SHADER)!;
            gl!.shaderSource(vs, vertexSource);
            gl!.compileShader(vs);
            const fs = gl!.createShader(gl!.FRAGMENT_SHADER)!;
            gl!.shaderSource(fs, fragmentSource);
            gl!.compileShader(fs);
            const program = gl!.createProgram()!;
            gl!.attachShader(program, vs);
            gl!.attachShader(program, fs);
            gl!.linkProgram(program);
            return program;
        }

        const programs = {
            splat: createProgram(baseVertexShader, splatShader),
            advection: createProgram(baseVertexShader, advectionShader),
            curl: createProgram(baseVertexShader, curlShader),
            vorticity: createProgram(baseVertexShader, vorticityShader),
            pressure: createProgram(baseVertexShader, pressureShader),
            display: createProgram(baseVertexShader, displayShader),
            bloomPrefilter: createProgram(baseVertexShader, bloomPrefilterShader),
            bloomBlur: createProgram(baseVertexShader, bloomBlurShader),
            divergence: createProgram(baseVertexShader, `
                precision highp float;
                varying vec2 vL; varying vec2 vR; varying vec2 vT; varying vec2 vB;
                void main () {
                    float L = texture2D(uVelocity, vL).x;
                    float R = texture2D(uVelocity, vR).x;
                    float T = texture2D(uVelocity, vT).y;
                    float B = texture2D(uVelocity, vB).y;
                    gl_FragColor = vec4(0.5 * (R - L + T - B), 0.0, 0.0, 1.0);
                }
            `),
            gradientSubtract: createProgram(baseVertexShader, `
                precision highp float;
                varying vec2 vL; varying vec2 vR; varying vec2 vT; varying vec2 vB; varying vec2 vUv;
                uniform sampler2D uPressure;
                uniform sampler2D uVelocity;
                void main () {
                    float L = texture2D(uPressure, vL).x;
                    float R = texture2D(uPressure, vR).x;
                    float T = texture2D(uPressure, vT).x;
                    float B = texture2D(uPressure, vB).x;
                    vec2 velocity = texture2D(uVelocity, vUv).xy;
                    velocity -= vec2(R - L, T - B);
                    gl_FragColor = vec4(velocity, 0.0, 1.0);
                }
            `)
        };

        const blit = (() => {
            const buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
            const indices = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indices);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
            return (target: WebGLFramebuffer | null) => {
                gl.bindFramebuffer(gl.FRAMEBUFFER, target);
                gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
            };
        })();

        function createFBO(w: number, h: number): FBO {
            const tex = gl!.createTexture()!;
            gl!.bindTexture(gl!.TEXTURE_2D, tex);
            gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, gl!.LINEAR);
            gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, gl!.LINEAR);
            gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE);
            gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE);
            gl!.texImage2D(gl!.TEXTURE_2D, 0, gl!.RGBA, w, h, 0, gl!.RGBA, gl!.UNSIGNED_BYTE, null);
            const fbo = gl!.createFramebuffer()!;
            gl!.bindFramebuffer(gl!.FRAMEBUFFER, fbo);
            gl!.framebufferTexture2D(gl!.FRAMEBUFFER, gl!.COLOR_ATTACHMENT0, gl!.TEXTURE_2D, tex, 0);
            return { tex, fbo, width: w, height: h };
        }

        function createDoubleFBO(w: number, h: number): DoubleFBO {
            let fbo1 = createFBO(w, h);
            let fbo2 = createFBO(w, h);
            return {
                get read() { return fbo1; },
                get write() { return fbo2; },
                swap() { [fbo1, fbo2] = [fbo2, fbo1]; },
                delete() {
                    gl!.deleteTexture(fbo1.tex); gl!.deleteTexture(fbo2.tex);
                    gl!.deleteFramebuffer(fbo1.fbo); gl!.deleteFramebuffer(fbo2.fbo);
                }
            };
        }

        let density: DoubleFBO, velocity: DoubleFBO, divergence: FBO, curl: FBO, pressure: DoubleFBO;
        let bloomFBOs: FBO[] = [];

        const pointer = { x: 0, y: 0, dx: 0, dy: 0, moved: false, color: [0, 0, 0] };
        const updatePointer = (e: any) => {
            const x = e.clientX / window.innerWidth;
            const y = 1.0 - e.clientY / window.innerHeight;
            pointer.dx = (x - pointer.x) * 10.0;
            pointer.dy = (y - pointer.y) * 10.0;
            pointer.x = x; pointer.y = y;
            pointer.moved = true;
        };

        window.addEventListener('mousemove', updatePointer);
        window.addEventListener('touchstart', e => updatePointer(e.targetTouches[0]));
        window.addEventListener('touchmove', e => updatePointer(e.targetTouches[0]));

        let lastTime = Date.now();
        let frameId: number;

        const render = () => {
            const dt = Math.min((Date.now() - lastTime) / 1000, 0.016);
            lastTime = Date.now();

            if (pointer.moved) {
                pointer.moved = false;
                gl.useProgram(programs.splat);
                gl.uniform1f(gl.getUniformLocation(programs.splat, 'uAspectRatio'), canvas.width / canvas.height);
                gl.uniform2f(gl.getUniformLocation(programs.splat, 'uPoint'), pointer.x, pointer.y);
                gl.uniform3f(gl.getUniformLocation(programs.splat, 'uColor'), pointer.dx, pointer.dy, 0.0);
                gl.uniform1f(gl.getUniformLocation(programs.splat, 'uRadius'), config.SPLAT_RADIUS / 100.0);
                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, velocity.read.tex);
                blit(velocity.write.fbo);
                velocity.swap();

                const color = [Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.5];
                gl.uniform3f(gl.getUniformLocation(programs.splat, 'uColor'), color[0] * 0.3, color[1] * 0.3, color[2] * 0.3);
                gl.bindTexture(gl.TEXTURE_2D, density.read.tex);
                blit(density.write.fbo);
                density.swap();
            }

            // Curl & Vorticity
            gl.useProgram(programs.curl);
            gl.uniform2f(gl.getUniformLocation(programs.curl, 'uTexelSize'), 1/velocity.read.width, 1/velocity.read.height);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, velocity.read.tex);
            blit(curl.fbo);

            gl.useProgram(programs.vorticity);
            gl.uniform2f(gl.getUniformLocation(programs.vorticity, 'uTexelSize'), 1/velocity.read.width, 1/velocity.read.height);
            gl.uniform1f(gl.getUniformLocation(programs.vorticity, 'uCurlStrength'), config.VORTICITY);
            gl.uniform1f(gl.getUniformLocation(programs.vorticity, 'uDt'), dt);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, velocity.read.tex);
            gl.activeTexture(gl.TEXTURE1);
            gl.bindTexture(gl.TEXTURE_2D, curl.tex);
            gl.uniform1i(gl.getUniformLocation(programs.vorticity, 'uCurl'), 1);
            blit(velocity.write.fbo);
            velocity.swap();

            // Advection
            gl.useProgram(programs.advection);
            gl.uniform2f(gl.getUniformLocation(programs.advection, 'uTexelSize'), 1/velocity.read.width, 1/velocity.read.height);
            gl.uniform1f(gl.getUniformLocation(programs.advection, 'uDt'), dt);
            gl.uniform1f(gl.getUniformLocation(programs.advection, 'uDissipation'), config.VELOCITY_DISSIPATION);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, velocity.read.tex);
            gl.uniform1i(gl.getUniformLocation(programs.advection, 'uVelocity'), 0);
            gl.uniform1i(gl.getUniformLocation(programs.advection, 'uSource'), 0);
            blit(velocity.write.fbo);
            velocity.swap();

            gl.uniform2f(gl.getUniformLocation(programs.advection, 'uTexelSize'), 1/density.read.width, 1/density.read.height);
            gl.uniform1f(gl.getUniformLocation(programs.advection, 'uDissipation'), config.DENSITY_DISSIPATION);
            gl.activeTexture(gl.TEXTURE1);
            gl.bindTexture(gl.TEXTURE_2D, density.read.tex);
            gl.uniform1i(gl.getUniformLocation(programs.advection, 'uSource'), 1);
            blit(density.write.fbo);
            density.swap();

            // Pressure
            gl.useProgram(programs.divergence);
            gl.uniform2f(gl.getUniformLocation(programs.divergence, 'uTexelSize'), 1/velocity.read.width, 1/velocity.read.height);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, velocity.read.tex);
            gl.uniform1i(gl.getUniformLocation(programs.divergence, 'uVelocity'), 0);
            blit(divergence.fbo);

            gl.useProgram(programs.pressure);
            gl.uniform2f(gl.getUniformLocation(programs.pressure, 'uTexelSize'), 1/velocity.read.width, 1/velocity.read.height);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, divergence.tex);
            gl.uniform1i(gl.getUniformLocation(programs.pressure, 'uDivergence'), 0);
            for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
                gl.activeTexture(gl.TEXTURE1);
                gl.bindTexture(gl.TEXTURE_2D, pressure.read.tex);
                gl.uniform1i(gl.getUniformLocation(programs.pressure, 'uPressure'), 1);
                blit(pressure.write.fbo);
                pressure.swap();
            }

            gl.useProgram(programs.gradientSubtract);
            gl.uniform2f(gl.getUniformLocation(programs.gradientSubtract, 'uTexelSize'), 1/velocity.read.width, 1/velocity.read.height);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, pressure.read.tex);
            gl.activeTexture(gl.TEXTURE1);
            gl.bindTexture(gl.TEXTURE_2D, velocity.read.tex);
            gl.uniform1i(gl.getUniformLocation(programs.gradientSubtract, 'uPressure'), 0);
            gl.uniform1i(gl.getUniformLocation(programs.gradientSubtract, 'uVelocity'), 1);
            blit(velocity.write.fbo);
            velocity.swap();

            // Bloom
            if (config.BLOOM) {
                gl.useProgram(programs.bloomPrefilter);
                const knee = config.BLOOM_THRESHOLD * config.BLOOM_SOFT_KNEE + 0.0001;
                gl.uniform3f(gl.getUniformLocation(programs.bloomPrefilter, 'uCurve'), config.BLOOM_THRESHOLD - knee, knee * 2, 0.25 / knee);
                gl.uniform1f(gl.getUniformLocation(programs.bloomPrefilter, 'uThreshold'), config.BLOOM_THRESHOLD);
                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, density.read.tex);
                blit(bloomFBOs[0].fbo);

                gl.useProgram(programs.bloomBlur);
                for (let i = 0; i < bloomFBOs.length - 1; i++) {
                    gl.uniform2f(gl.getUniformLocation(programs.bloomBlur, 'uTexelSize'), 1/bloomFBOs[i].width, 1/bloomFBOs[i].height);
                    gl.bindTexture(gl.TEXTURE_2D, bloomFBOs[i].tex);
                    blit(bloomFBOs[i+1].fbo);
                }
            }

            // Display
            gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
            gl.useProgram(programs.display);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, density.read.tex);
            gl.activeTexture(gl.TEXTURE1);
            gl.bindTexture(gl.TEXTURE_2D, bloomFBOs[bloomFBOs.length - 1].tex);
            gl.uniform1i(gl.getUniformLocation(programs.display, 'uBloom'), 1);
            gl.uniform1f(gl.getUniformLocation(programs.display, 'uBloomIntensity'), config.BLOOM_INTENSITY);
            blit(null);

            frameId = requestAnimationFrame(render);
        };

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            if (density) density.delete();
            if (velocity) velocity.delete();
            if (pressure) pressure.delete();
            
            density = createDoubleFBO(config.DYE_RESOLUTION, config.DYE_RESOLUTION);
            velocity = createDoubleFBO(config.SIM_RESOLUTION, config.SIM_RESOLUTION);
            divergence = createFBO(config.SIM_RESOLUTION, config.SIM_RESOLUTION);
            curl = createFBO(config.SIM_RESOLUTION, config.SIM_RESOLUTION);
            pressure = createDoubleFBO(config.SIM_RESOLUTION, config.SIM_RESOLUTION);

            bloomFBOs = [];
            let res = config.BLOOM_RESOLUTION;
            for (let i = 0; i < config.BLOOM_ITERATIONS; i++) {
                bloomFBOs.push(createFBO(res, res));
                res = Math.floor(res / 2);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        render();

        return () => {
            window.removeEventListener('mousemove', updatePointer);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(frameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none z-[-1]"
            style={{ filter: 'brightness(0.8) contrast(1.1) saturate(1.2)' }}
        />
    );
}
