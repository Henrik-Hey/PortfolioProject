import React, { useEffect, useRef } from 'react';
import gsap from "gsap";

import { SectionHeading, Paragraph, Section, FullHeightContent } from '../shared';
import IDs from '../../variables/IDs'; 

const Projects = () => {

    const introRef = useRef<HTMLDivElement>(null);
    const libiglRef = useRef<HTMLDivElement>(null);
    const chessRef = useRef<HTMLDivElement>(null);
    const lwjglRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        BuildAnimation(introRef, libiglRef, chessRef, lwjglRef)
    }, [introRef, libiglRef, chessRef, lwjglRef]);

    return (
        <>
            <FullHeightContent ref={introRef} className={IDs.Projects.Intro}>
                <Section>
                    <SectionHeading title='Projects!'/>
                    <Paragraph>
                        Theres a lot here... so let's get started!
                    </Paragraph>
                </Section>
            </FullHeightContent>
            <FullHeightContent ref={libiglRef} className={IDs.Projects.LibiGL}>
                <Section>
                    <SectionHeading title='Multi-Resolution Analysis'/>
                    <Paragraph>
                        In prep for the (sadly cancelled) libigl hackathon , I wrote an application for mesh 
                        multi-resolution analysis with a colleague, referencing this paper. Implemented Taubin's 
                        subdivision connectivity detection algorithm and auxiliary functions to perform forward 
                        and inverse wavelet transforms.
                    </Paragraph>
                </Section>
            </FullHeightContent>
            <FullHeightContent ref={chessRef} className={IDs.Projects.Chess}>
                <Section>
                    <SectionHeading title='3D WebGL Chess'/>
                    <Paragraph>
                        Its Chess and it's on going
                    </Paragraph>
                </Section>
            </FullHeightContent>
            <FullHeightContent ref={lwjglRef} className={IDs.Projects.LWJGL}>
                <Section>
                    <SectionHeading title='2.5D Basic LWJGL Game engine'/>
                    <Paragraph>
                        Old but good
                    </Paragraph>
                </Section>
            </FullHeightContent>
        </>
    )
}

const BuildAnimation = (
    introRef: React.RefObject<HTMLDivElement>,
    libiglRef: React.RefObject<HTMLDivElement>,
    chessRef: React.RefObject<HTMLDivElement>,
    lwjglRef: React.RefObject<HTMLDivElement>,
) => {
    if(
        !introRef.current  ||
        !libiglRef.current ||
        !chessRef.current  ||
        !lwjglRef.current
    ) return;

    const timeline = gsap.timeline();


}

export default Projects;