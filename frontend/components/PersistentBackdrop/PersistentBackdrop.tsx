import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import * as THREE from 'three';
import gsap from 'gsap';

import useWindowSize from '../_hooks/useWindowSize';
import * as loaders from '../_utils/Loader';
import IDs from '../../variables/IDs';

const PersistentBackdrop = () => {
  const canvasRef = useRef<HTMLCanvasElement>(
    null,
  ) as React.MutableRefObject<HTMLCanvasElement>;
  const waveModel = useRef<THREE.Mesh[]>([]) as React.MutableRefObject<
    THREE.Mesh[]
  >;
  const size = useWindowSize();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(MotionPathPlugin);
  }, []);

  useEffect(() => {
    InitializeThreeJS(canvasRef, waveModel);
    BuildAnimation(waveModel);
  }, [canvasRef, size]);

  return (
    <FixedContainer>
      <FixedCanvas ref={canvasRef} />
    </FixedContainer>
  );
};

const generateNetSphere = () => {
  const geometry = new THREE.IcosahedronGeometry(5, 12);
  const perlinNoise = new THREE.TextureLoader().load(
    'textures/perlin-noise-texture.png',
  );
  perlinNoise.wrapS = THREE.RepeatWrapping;
  perlinNoise.wrapT = THREE.RepeatWrapping;
  perlinNoise.repeat.set(4, 4);
  const material = new THREE.MeshStandardMaterial({
    color: 0xf2f2f2,
    wireframe: true,
    displacementMap: perlinNoise,
  });
  const sphere = new THREE.Mesh(geometry, material);
  return sphere;
};

const generateWaveMesh = (
  depth: number,
  width: number,
  height: number,
  color: number,
  seed: number,
  sideCircleColor?: number,
) => {
  const aspectRatio = width / height;
  const verticalSegments = 32;
  const horizontalSegments = verticalSegments * aspectRatio;
  const geometry = new THREE.PlaneGeometry(
    width,
    height,
    horizontalSegments,
    verticalSegments,
  );

  // Material Logic
  const vertexShader = () => {
    return `
            varying vec3 vUv; 
            uniform float delta;
            uniform float seed;
        
            void main() {
                vec3 morphedPos = position;

                morphedPos.y -= sin(position.x + delta) * ((position.x + 5.0) / 7.0) * seed;

                if(morphedPos.y < 1.00) {
                    morphedPos.y = position.y;
                }

                vUv = morphedPos; 
                

                vec4 modelViewPosition = modelViewMatrix * vec4(morphedPos, 1.0);
                gl_Position = projectionMatrix * modelViewPosition; 
            }
        `;
  };

  const fragmentShader = () => {
    return `
            uniform vec3 color; 
            uniform vec3 circleColor;
            uniform vec2 resolution;
            varying vec3 vUv;

            float draw_circle(vec2 coord, float radius) {
              return step(length(coord), radius);
            }
    
            void main() {
              vec2 coord = gl_FragCoord.xy;
              vec2 offset = resolution / 2.0;
              
              offset.x = resolution.x * 0.95;

              float circle = draw_circle(coord - offset, resolution.x / 3.0);
              vec3 color_out = color;

              if(circle == 1.0) {
                color_out = circleColor;
              }
          
              gl_FragColor = vec4(color_out, 1.0);
            }
        `;
  };

  let uniforms = {
    color: { type: 'vec3', value: new THREE.Color(color) },
    resolution: {
      type: 'vec3',
      value: new THREE.Vector2(window.innerWidth, window.innerHeight),
    },
    circleColor: {
      type: 'vec3',
      value: new THREE.Color(sideCircleColor || color),
    },
    delta: { type: 'float', value: Math.sin(Date.now()) },
    seed: { type: 'float', value: seed },
  };
  const material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    fragmentShader: fragmentShader(),
    vertexShader: vertexShader(),
  });
  const mesh = new THREE.Mesh(geometry, material);

  mesh.position.z = depth;
  mesh.position.y = 0 - height / 2;
  mesh.userData.height = height;
  return mesh;
};

const InitializeThreeJS = (
  canvasRef: React.MutableRefObject<HTMLCanvasElement>,
  waveModel: React.MutableRefObject<THREE.Mesh[]>,
) => {
  if (!canvasRef.current) return;

  const {
    width,
    height, // @ts-ignore
  } = canvasRef.current.parentNode.getBoundingClientRect();
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: canvasRef.current,
    alpha: true,
  });
  renderer.setSize(width, height);
  renderer.setClearColor(0xffffff, 0);

  const light2 = new THREE.AmbientLight(0xffffff);
  scene.add(light2);

  camera.position.z = 5;

  const waveModels = [];
  const wave1Depth = -1.5;
  const wave1Height = visibleHeightAtZDepth(wave1Depth, camera);
  const wave1Width = visibleWidthAtZDepth(wave1Depth, camera);
  const wave1 = generateWaveMesh(
    wave1Depth,
    wave1Width,
    wave1Height,
    0xf2f2f2,
    0.99,
  );
  waveModels.push(wave1);
  scene.add(wave1);

  const wave2 = generateWaveMesh(
    wave1Depth,
    wave1Width,
    wave1Height,
    0xc3d9de,
    0.99,
  );
  waveModels.push(wave2);
  scene.add(wave2);

  const wave3 = generateWaveMesh(
    wave1Depth,
    wave1Width,
    wave1Height,
    0x040e32,
    0.99,
    0x031659,
  );
  waveModels.push(wave3);
  scene.add(wave3);

  const wave4 = generateWaveMesh(
    wave1Depth,
    wave1Width,
    wave1Height,
    0x09596c,
    0.99,
  );
  waveModels.push(wave4);
  scene.add(wave4);

  waveModel.current = waveModels;

  const netSphere = generateNetSphere();
  netSphere.position.x = -15;
  netSphere.position.y = -8;
  netSphere.position.z = -20;
  netSphere.material.emissiveIntensity = 0;
  netSphere.scale.set(2, 2, 2);
  scene.add(netSphere);

  const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    wave1.material.uniforms.delta.value += 0.05;
    wave2.material.uniforms.delta.value += 0.05;
    wave3.material.uniforms.delta.value += 0.05;
    wave4.material.uniforms.delta.value += 0.05;

    netSphere.rotation.y += 0.001;
    netSphere.rotation.z += 0.001;
    netSphere.material.displacementScale =
      1.5 + Math.sin(netSphere.rotation.y * 10);
    netSphere.material.displacementBias =
      1.5 + Math.sin(netSphere.rotation.y * 10);
  };
  animate();
};

const buildWaveAnimation = (model: THREE.Mesh, start: string) => {
  const timeline = gsap.timeline();

  timeline.fromTo(
    // @ts-ignore
    model.material.uniforms.seed,
    { value: 0 },
    { value: 1, duration: 0.5, ease: 'power3.out' },
    0,
  );

  timeline.fromTo(
    model.position,
    { y: -model.userData.height },
    { y: 0, duration: 1 },
    0,
  );

  timeline.fromTo(
    // @ts-ignore
    model.material.uniforms.seed,
    { value: 1 },
    { value: 0, duration: 0.5, ease: 'power3.out' },
    0.5,
  );

  ScrollTrigger.create({
    trigger: start,
    // endTrigger: end,
    start: 'top top',
    animation: timeline,
    toggleActions: 'play none none reverse',
  });

  return timeline;
};

const BuildAnimation = (waveModel: React.MutableRefObject<THREE.Mesh[]>) => {
  buildWaveAnimation(
    // @ts-ignore
    waveModel.current[0],
    `.${IDs.AboutMe}`,
  );

  buildWaveAnimation(
    // @ts-ignore
    waveModel.current[1],
    `.${IDs.Projects.Chess}`,
  );

  buildWaveAnimation(
    // @ts-ignore
    waveModel.current[2],
    `.${IDs.Projects.LibiGL}`,
  );

  buildWaveAnimation(
    // @ts-ignore
    waveModel.current[3],
    `.${IDs.Projects.Simulant}`,
  );
};

const visibleHeightAtZDepth = (
  depth: number,
  camera: THREE.PerspectiveCamera,
) => {
  // compensate for cameras not positioned at z=0
  const cameraOffset = camera.position.z;
  if (depth < cameraOffset) depth -= cameraOffset;
  else depth += cameraOffset;

  // vertical fov in radians
  const vFOV = (camera.fov * Math.PI) / 180;

  // Math.abs to ensure the result is always positive
  return 2 * Math.tan(vFOV / 2) * Math.abs(depth);
};

const visibleWidthAtZDepth = (
  depth: number,
  camera: THREE.PerspectiveCamera,
) => {
  const height = visibleHeightAtZDepth(depth, camera);
  return height * camera.aspect;
};

const FixedContainer = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
`;

const FixedCanvas = styled.canvas`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
`;

export default PersistentBackdrop;
