import React, { useEffect, useRef, forwardRef, MutableRefObject } from 'react';
import * as THREE from 'three';
import styled from 'styled-components';

import { ModelLoaderOBJ } from '../../_utils/Loader';

export interface BoardState {
  map: string[][];
}

export const FENLoader = (FEN: string): BoardState => {
  const map: string[][] = [];

  const FENSplit = FEN.split(' ');
  const positions = FENSplit[0];
  const rows = positions.split('/');

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    map.push([]);
    for (let j = 0; j < row.length; j++) {
      if (!!Number(row[j])) {
        for (let k = 0; k < Number(row[j]); k++) map[i].push('');

        continue;
      }
      map[i].push(row[j]);
    }
  }

  return { map };
};

interface BoardRef {
  tiles: THREE.Mesh[];
  pieces: THREE.Mesh[];
}

// Chess stuffs
const tileSize: number = 1;
const darkTone: number = 0x808080;
const lightTone: number = 0xfafafa;
const TileUUIDs: Set<String> = new Set();

interface ChessBoardProps {
  ref: MutableRefObject<THREE.Mesh[]>;
}

const ChessBoard = forwardRef<BoardRef>((props, ref) => {
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

    camera.position.z = 11;
    camera.position.y = 4;
    camera.position.x = -3;
    camera.rotateY(THREE.MathUtils.degToRad(-30));
    camera.rotateX(THREE.MathUtils.degToRad(-10));

    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(10, 10, 10);
    scene.add(light);

    scene.add(new THREE.AmbientLight(0x404040));

    Promise.all([
      ModelLoaderOBJ('/models/chess/tower.obj'),
      ModelLoaderOBJ('/models/chess/knight.obj'),
      ModelLoaderOBJ('/models/chess/bishop.obj'),
      ModelLoaderOBJ('/models/chess/queen.obj'),
      ModelLoaderOBJ('/models/chess/king.obj'),
      ModelLoaderOBJ('/models/chess/pawn.obj'),
    ]).then((Meshes: THREE.Mesh[]) => {
      let piece;
      let isBlack;
      const BoardState = FENLoader(
        'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      );
      const pieces: THREE.Mesh[] = [];

      const GeneratePiece = (
        meshIndex: number,
        i: number,
        j: number,
        cp: string,
      ) => {
        isBlack = cp === cp.toUpperCase(); // our board is coded so that uppercase represents black pieces
        piece = Meshes[meshIndex].clone();
        if (meshIndex === 1)
          piece.rotateY(THREE.MathUtils.degToRad(90 * (isBlack ? 1 : -1)));
        piece.position.set(i, -0.2, j);
        // @ts-ignore
        piece.material = new THREE.MeshNormalMaterial();
        piece.name = cp;
        piece.castShadow = true; //default is false
        piece.receiveShadow = false; //default

        pieces.push(piece);
        scene.add(piece);
      };
      // Generate all possible pieces
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          const cp = BoardState.map[i][j];
          switch (cp) {
            case 'r':
            case 'R':
              GeneratePiece(0, i, j, cp);
              break;
            case 'n':
            case 'N':
              GeneratePiece(1, i, j, cp);
              break;
            case 'b':
            case 'B':
              GeneratePiece(2, i, j, cp);
              break;
            case 'q':
            case 'Q':
              GeneratePiece(3, i, j, cp);
              break;
            case 'k':
            case 'K':
              GeneratePiece(4, i, j, cp);
              break;
            case 'p':
            case 'P':
              GeneratePiece(5, i, j, cp);
              break;
            default:
              break;
          }
        }
      }
      // Create the board
      const tiles = [];
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          const tileGeom = new THREE.BoxGeometry(tileSize, tileSize, 0.125);
          const material = new THREE.MeshPhongMaterial({
            color: (j + i) % 2 ? lightTone : darkTone,
            side: THREE.DoubleSide,
            shininess: 5,
            specular: 0x999999,
          });
          const tileMesh = new THREE.Mesh(tileGeom, material);

          tileMesh.name = 'Tile';
          tileMesh.rotateX(THREE.MathUtils.degToRad(-90));
          tileMesh.position.set(i * tileSize, -0.2 / 2, j * tileSize);

          tiles.push(tileMesh);
          scene.add(tileMesh);
          TileUUIDs.add(tileMesh.uuid);
        }
      }

      // @ts-ignore
      ref.current = { tiles, pieces };

      function animate() {
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
});

const CanvasContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;

const Canvas = styled.canvas`
  position: absolute;
  height: 100%;
  width: 100%;
`;

export default ChessBoard;
