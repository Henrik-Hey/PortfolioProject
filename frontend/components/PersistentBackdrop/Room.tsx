import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import * as THREE from 'three';
import gsap from "gsap";

import useWindowSize from '../_hooks/useWindowSize';
import { DegToRad } from '../_utils/Maths';
import IDs from '../../variables/IDs';

const RoomSection_WH = 3;
const RoomSection_Depth = 0.125;

const Room = () => {

    const canvasRef = useRef<HTMLCanvasElement>(null) as React.MutableRefObject<HTMLCanvasElement>;
    const floorRef = useRef<THREE.Mesh>(null) as React.MutableRefObject<THREE.Mesh>;
    const wall1Ref = useRef<THREE.Mesh>(null) as React.MutableRefObject<THREE.Mesh>;
    const wall2Ref = useRef<THREE.Mesh>(null) as React.MutableRefObject<THREE.Mesh>;
    const size = useWindowSize();

    useEffect(() => {
        InitializeThreeJS(canvasRef, floorRef, wall1Ref, wall2Ref);
        BuildAnimation(floorRef, wall1Ref, wall2Ref);
    }, [canvasRef, size]);

    return (
        <AbsoluteCanvas className={IDs.Canvas.Room} ref={canvasRef}/>
    )
}

const InitializeThreeJS = (
    canvasRef: React.MutableRefObject <HTMLCanvasElement>,
    floorRef: React.MutableRefObject <THREE.Mesh>,
    wall1Ref: React.MutableRefObject <THREE.Mesh>,
    wall2Ref: React.MutableRefObject <THREE.Mesh>,
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
    
    const Floor_Color = 0xaaaaaa;
    const Wall_Color = 0xeeeeee; 

    const RoomGroup = new THREE.Group();

    // Floor
    {   
        const geometry = new THREE.BoxGeometry(
            RoomSection_WH, 
            RoomSection_Depth, 
            RoomSection_WH
        );
        const material = new THREE.MeshPhongMaterial( { color: Floor_Color } );
        const cube = floorRef.current = new THREE.Mesh( geometry, material );

        cube.position.setY(-RoomSection_WH/2)

        RoomGroup.add( cube );
    }

    // Wall 1
    {   
        const geometry = new THREE.BoxGeometry(
            RoomSection_WH, 
            RoomSection_Depth, 
            RoomSection_WH
        );
        const material = new THREE.MeshPhongMaterial( { color: Wall_Color } );
        const cube = wall1Ref.current = new THREE.Mesh( geometry, material );

        cube.rotateX(DegToRad(90))

        cube.position.setZ(-RoomSection_WH/2)

        RoomGroup.add( cube );
    }

    // Wall 2
    {   
        const geometry = new THREE.BoxGeometry(
            RoomSection_WH, 
            RoomSection_Depth, 
            RoomSection_WH
        );
        const material = new THREE.MeshPhongMaterial( { color: Wall_Color } );
        const cube = wall2Ref.current = new THREE.Mesh( geometry, material );

        cube.rotateY(DegToRad(90))
        cube.rotateX(DegToRad(90))

        cube.position.setX(RoomSection_WH/2)

        RoomGroup.add( cube );
    }

    scene.add( RoomGroup );

    RoomGroup.rotateY(DegToRad(65))
    RoomGroup.position.setX(-1);

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

    function animate() {
        requestAnimationFrame( animate );
        renderer.render( scene, camera );
    }
    animate();
}

const BuildAnimation = (
    floorRef: React.MutableRefObject <THREE.Mesh>,
    wall1Ref: React.MutableRefObject <THREE.Mesh>,
    wall2Ref: React.MutableRefObject <THREE.Mesh>,
) => {
    const timeline = gsap.timeline();

    // Wall 1
    {
        timeline.to(
            wall1Ref.current.position,
            {
                scrollTrigger: {
                    scrub: true,
                    trigger: `.${IDs.Canvas.Room}`,
                    endTrigger: `.${IDs.AboutMe}`,
                    start: 'top top',
                    end: 'bottom bottom', 
                    pin: true 
                },
                y: -RoomSection_WH/2,
                z: -RoomSection_WH,
            }
        ); 

        timeline.to(
            wall1Ref.current.rotation,
            {
                scrollTrigger: {
                    scrub: true,
                    trigger: `.${IDs.Canvas.Room}`,
                    endTrigger: `.${IDs.AboutMe}`,
                    start: 'top top',
                    end: 'bottom bottom', 
                    pin: true 
                },
                x: DegToRad(0),
                ease: 'ease-out',
            }
        );
    }

     // Wall 2
     {
        timeline.to(
            wall2Ref.current.position,
            {
                scrollTrigger: {
                    scrub: true,
                    trigger: `.${IDs.Canvas.Room}`,
                    endTrigger: `.${IDs.AboutMe}`,
                    start: 'top top',
                    end: 'bottom bottom', 
                    pin: true 
                },
                y: -RoomSection_WH/2,
                x: RoomSection_WH,
            }
        ); 

        timeline.to(
            wall2Ref.current.rotation,
            {
                scrollTrigger: {
                    scrub: true, 
                    trigger: `.${IDs.Canvas.Room}`,
                    endTrigger: `.${IDs.AboutMe}`,
                    start: 'top top',
                    end: 'bottom bottom', 
                    pin: true 
                },
                y: DegToRad(-90),
                ease: 'ease-out'
            }
        );
    }
}

const AbsoluteCanvas = styled.canvas`
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    z-index: 1;
`

export default Room;