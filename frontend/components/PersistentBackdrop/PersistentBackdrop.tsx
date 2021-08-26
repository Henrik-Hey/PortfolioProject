import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import * as THREE from 'three';
import gsap from "gsap";

import useWindowSize from '../_hooks/useWindowSize';
import * as loaders from '../_utils/Loader'
import IDs from '../../variables/IDs';

const PersistentBackdrop = () => {

    const canvasRef = useRef<HTMLCanvasElement>(null) as React.MutableRefObject<HTMLCanvasElement>;
    const followModel = useRef<THREE.Mesh>(null) as React.MutableRefObject<THREE.Mesh>;
    const waveModel = useRef<THREE.Mesh>(null) as React.MutableRefObject<THREE.Mesh>;
    const size = useWindowSize();
 
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
    }, [])

    useEffect(() => {
        InitializeThreeJS(canvasRef, followModel, waveModel);
        BuildAnimation(followModel, waveModel); 
    }, [canvasRef, size]);

    return ( 
        <FixedContainer>
            <FixedCanvas ref={canvasRef}/> 
        </FixedContainer>
    )
}

const generateWaveMesh = ( depth: number, width: number, height: number, color: number, seed: number ) => {
    const aspectRatio = width / height;
    const verticalSegments = 32;
    const horizontalSegments =  verticalSegments * aspectRatio;
    const geometry = new THREE.PlaneGeometry(width, height * 1.75, horizontalSegments, verticalSegments);

    // Material Logic
    const vertexShader = () => {
        return `
            varying vec3 vUv; 
            uniform float delta;
            uniform float seed;
        
            void main() {
                vec3 morphedPos = position;

                morphedPos.y += sin(position.x + delta) * ((position.x + 5.0) / 7.0) * seed;
                morphedPos.y += sin(position.x * 0.5) * seed;
                morphedPos.y -= sin(delta) * .5;

                if(morphedPos.y > 1.00) {
                    morphedPos.y = position.y;
                }

                vUv = morphedPos; 
                

                vec4 modelViewPosition = modelViewMatrix * vec4(morphedPos, 1.0);
                gl_Position = projectionMatrix * modelViewPosition; 
            }
        `
    }

    const fragmentShader = () => {
        return `
            uniform vec3 color; 
            varying vec3 vUv;
    
            void main() {
                gl_FragColor = vec4(color, 1.0);
            }
        `
    }

    let uniforms = {
        color: {type: 'vec3', value: new THREE.Color(color)},
        delta: {type: 'float', value: Math.sin(Date.now())},
        seed: {type: 'float', value: seed},
    }
    const material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        fragmentShader: fragmentShader(),
        vertexShader: vertexShader(),
    })
    const mesh = new THREE.Mesh( geometry, material );

    mesh.position.z = depth;
    mesh.position.y = 0 + (height/2)
    return mesh;
}

const InitializeThreeJS = (
    canvasRef: React.MutableRefObject <HTMLCanvasElement>,
    followModel: React.MutableRefObject <THREE.Mesh>,
    waveModel: React.MutableRefObject <THREE.Mesh>,
) => {
    if(!canvasRef.current) return;

    const scene = new THREE.Scene(); 
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas: canvasRef.current,
        alpha: true 
    });
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor( 0xffffff, 0);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshPhongMaterial( { color: 0xeeeeee } );
    const cube = followModel.current = new THREE.Mesh( geometry, material );

    cube.rotateY(0.5)

    scene.add( cube );

    const color = 0xaaaaaa;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(0, 10, 5);
    light.target.position.set(-5, 0, 0);
    scene.add(light);
    scene.add(light.target);

    const light2 = new THREE.HemisphereLight(0xf0f0f0, 0xf0f0f0, 0.5); 
    scene.add(light2);

    camera.position.z = 5;  

    const wave1Depth = -1.5;
    const wave1Height = visibleHeightAtZDepth( wave1Depth, camera );
    const wave1Width = visibleWidthAtZDepth( wave1Depth, camera );
    const wave1 = waveModel.current = generateWaveMesh( wave1Depth, wave1Width, wave1Height / 2, 0xffffff, 0.99 );
    scene.add( wave1 );

    const animate = () => {
        requestAnimationFrame( animate );
        renderer.render( scene, camera );

        wave1.material.uniforms.delta.value += 0.01;
        cube.rotation.y += 0.01;
    }
    animate();
}

const BuildAnimation = (
    followModel: React.MutableRefObject <THREE.Mesh>,
    waveModel: React.MutableRefObject <THREE.Mesh>,
) => {
    const timeline = gsap.timeline();

    gsap.set(
        followModel.current.position, 
        { 
            x: 0,
            y: 0,
            z: 0,
        }
    )

    timeline.fromTo(
        followModel.current.position,
        { 
            x: 0,
            y: 0,
            z: 0,
        },
        {
            scrollTrigger: {
                scrub: true,
                trigger: `.${IDs.Canvas.Room}`,
                endTrigger: `.${IDs.AboutMe}`,
                start: 'top top',
                end: 'bottom bottom', 
                pin: true
            },
            x: -4, 
            y: 0,
            z: 0,
            onUpdate: function () {
            }, 
            onComplete: function () {
                console.log("complete 1");
            } 
        });

    timeline.fromTo(
        // @ts-ignore
        waveModel.current.material.uniforms.seed,
        { 
            value: 0.99
        },
        {
            scrollTrigger: {
                scrub: true,
                trigger: `.${IDs.Canvas.Room}`,
                endTrigger: `.${IDs.AboutMe}`,
                start: 'top top',
                end: 'bottom bottom', 
                pin: true
            },
            value: 0, 
            onUpdate: function () {
            }, 
            onComplete: function () {
                console.log("complete 1");
            } 
        });

    const initialPosition = waveModel.current.position.y
    timeline.fromTo(
        // @ts-ignore
        waveModel.current.position,
        { 
            y: initialPosition,
        },
        {
            scrollTrigger: {
                scrub: true,
                trigger: `.${IDs.Canvas.Room}`,
                endTrigger: `.${IDs.AboutMe}`,
                start: 'top top',
                end: 'bottom bottom', 
                pin: true
            },
            y: initialPosition * 4, 
            onUpdate: function () {
            }, 
            onComplete: function () {
                console.log("complete 1");
            } 
        });
    
    timeline.fromTo(
        followModel.current.position,
        {
            x: -4,
            y: 0,
            z: 0,
        },
        {
            scrollTrigger: { 
                scrub: true,
                trigger: `.${IDs.AboutMe}`,
                endTrigger: `.${IDs.Projects.Intro}`,
                start: 'top top',
                end: 'bottom bottom',
            },
            x: 4, 
            y: 0,
            z: 0,
            onUpdate: function () {
            }, 
            onComplete: function () {
                console.log("complete 2");
            }
        });

    timeline.fromTo( 
        followModel.current.position,
        {
            x: 4,
            y: 0,
            z: 0,
        },
        {
            scrollTrigger: {
                scrub: true,
                trigger: `.${IDs.Projects.Intro}`,
                endTrigger: `.${IDs.Projects.LibiGL}`,
                start: 'top top',
                end: 'bottom bottom',
            },
            x: 0, z: 0, y: 2, onUpdate: function () {
            }, onComplete: function () {
                console.log("complete 3");
            }
        });
}

const visibleHeightAtZDepth = ( depth: number, camera: THREE.PerspectiveCamera ) => {
    // compensate for cameras not positioned at z=0
    const cameraOffset = camera.position.z;
    if ( depth < cameraOffset ) depth -= cameraOffset;
    else depth += cameraOffset;
  
    // vertical fov in radians
    const vFOV = camera.fov * Math.PI / 180; 
  
    // Math.abs to ensure the result is always positive
    return 2 * Math.tan( vFOV / 2 ) * Math.abs( depth );
};
  
const visibleWidthAtZDepth = ( depth: number, camera: THREE.PerspectiveCamera ) => {
    const height = visibleHeightAtZDepth( depth, camera );
    return height * camera.aspect;
};

const FixedContainer = styled.div`
    position: fixed;
    top: 0px; 
    left: 0px;
    width: 100vw;
    height: 100vh;
`

const FixedCanvas = styled.canvas`
    position: absolute;
    top: 0px; 
    left: 0px;
    width: 100vw;
    height: 100vh;
`

export default PersistentBackdrop;