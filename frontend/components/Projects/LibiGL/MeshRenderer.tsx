import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import styled from 'styled-components';

import { ModelLoaderOBJ } from '../../_utils/Loader';

interface MeshRendererProps {
  meshUrl: string;
}

const MeshRenderer = ({ meshUrl }: MeshRendererProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const { width, height } = containerRef.current.getBoundingClientRect();

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setClearColor(0xffffff00, 0);

    camera.position.z = 2;

    ModelLoaderOBJ(meshUrl).then((model) => {
      const mesh = model;
      mesh.material = new THREE.MeshNormalMaterial({ wireframe: true });
      mesh.rotation.y = Math.random() * 180;
      scene.add(mesh);

      function animate() {
        mesh.rotation.y += 0.005;

        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      }
      animate();
    });
  }, [canvasRef]);

  return (
    <CanvasContainer ref={containerRef}>
      <Canvas ref={canvasRef} />
    </CanvasContainer>
  );
};

const CanvasContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Canvas = styled.canvas`
  position: absolute;
  height: 100%;
  width: 100%;
`;

export default MeshRenderer;
