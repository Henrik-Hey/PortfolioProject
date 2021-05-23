import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import * as THREE from 'three';
import gsap from "gsap";

import useWindowSize from '../_hooks/useWindowSize';
import IDs from '../../variables/IDs';

const PersistentBackdrop = () => {

    const canvasRef = useRef<HTMLCanvasElement>(null) as React.MutableRefObject<HTMLCanvasElement>;
    const followModel = useRef<THREE.Mesh>(null) as React.MutableRefObject<THREE.Mesh>;
    const size = useWindowSize();
 
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
    }, [])

    useEffect(() => {
        InitializeThreeJS(canvasRef, followModel);
        BuildAnimation(followModel); 
    }, [canvasRef, size]);

    return ( 
        <FixedCanvas ref={canvasRef}/> 
    )
}

const InitializeThreeJS = (
    canvasRef: React.MutableRefObject <HTMLCanvasElement>,
    followModel: React.MutableRefObject <THREE.Mesh>,
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

    function animate() {
        requestAnimationFrame( animate );
        renderer.render( scene, camera );

        cube.rotation.y += 0.01;
    }
    animate();
}

const BuildAnimation = (
    followModel: React.MutableRefObject <THREE.Mesh>
) => {
    const timeline = gsap.timeline();

    timeline.to(
        followModel.current.position,
        {
            scrollTrigger: {
                scrub: true,
                trigger: `.${IDs.Canvas.Room}`,
                endTrigger: `.${IDs.AboutMe}`,
                start: 'top top',
                end: 'bottom bottom', 
                pin: true
            },
            x: -4, onUpdate: function () {
            }, onComplete: function () {
                console.log("complete");
            } 
        });
    
    timeline.to(
        followModel.current.position,
        {
            scrollTrigger: { 
                scrub: true,
                trigger: `.${IDs.AboutMe}`,
                endTrigger: `.${IDs.Projects.Intro}`,
                start: 'top top',
                end: 'bottom bottom',
            },
            x: 4, onUpdate: function () {
            }, onComplete: function () {
                console.log("complete");
            }
        });

    timeline.to( 
        followModel.current.position,
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
                console.log("complete");
            }
        });

    timeline.to( 
        followModel.current.position,
        {
            scrollTrigger: {
                scrub: true,
                trigger: `.${IDs.Projects.LibiGL}`,
                endTrigger: `.${IDs.Projects.Chess}`,
                start: 'top top',
                end: 'bottom bottom',
            },
            x: 0, z: 0, y: -2, onUpdate: function () {
            }, onComplete: function () {
                console.log("complete");
            }
        });
 
    timeline.to( 
        followModel.current.position,
        {
            scrollTrigger: {
                scrub: true,
                trigger: `.${IDs.Projects.Chess}`, 
                endTrigger: `.${IDs.Projects.LWJGL}`,
                start: 'top top',
                end: 'bottom bottom',
            },
            x: 0, z: 3, y: .1, onUpdate: function () {
            }, onComplete: function () {
                console.log("complete");
            }
        });
}

const FixedCanvas = styled.canvas`
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
`

export default PersistentBackdrop;