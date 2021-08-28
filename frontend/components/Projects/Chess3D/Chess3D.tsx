import React, { useEffect, useRef, MutableRefObject } from 'react';
import gsap from 'gsap';
import styled from 'styled-components';

import {
  SectionHeading,
  Paragraph,
  Section,
  FullHeightContent,
} from '../../shared';
import IDs from '../../../variables/IDs';
import ChessBoard from './ChessBoard';

interface BoardRef {
  tiles: THREE.Mesh[];
  pieces: THREE.Mesh[];
}

const Chess3D = () => {
  const timelineRef = useRef<GSAPTimeline>(
    null,
  ) as MutableRefObject<GSAPTimeline>;

  // Chess Tile ref
  const chessTilesRef = useRef<BoardRef>(null) as MutableRefObject<BoardRef>;

  // Section Segment Refs
  const segment1Ref = useRef<HTMLDivElement>(
    null,
  ) as MutableRefObject<HTMLDivElement>;
  const segment2Ref = useRef<HTMLDivElement>(
    null,
  ) as MutableRefObject<HTMLDivElement>;
  const segment3Ref = useRef<HTMLDivElement>(
    null,
  ) as MutableRefObject<HTMLDivElement>;

  const containerRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(chessTilesRef.current);
    BuildAnimation(
      timelineRef,
      chessTilesRef,
      segment1Ref,
      segment2Ref,
      segment3Ref,
      containerRef,
      introRef,
    );
    return () => {
      timelineRef.current?.clear();
    };
  }, [timelineRef, chessTilesRef]);

  return (
    <Container ref={containerRef}>
      <ContentContainer>
        <Intro ref={introRef} className={IDs.Projects.Chess}>
          <StyledSection>
            <SectionContent>
              <SectionSegment>
                <ChessBoard ref={chessTilesRef} />
              </SectionSegment>
              <SectionSegment ref={segment1Ref}>
                <SectionHeading
                  title="3D Chess with THREE.js"
                  subHeading={"[because regular chess isn't 3D]"}
                />
              </SectionSegment>
              <SectionSegment ref={segment2Ref}>
                <Paragraph>
                  In prep for the (sadly cancelled) libigl hackathon, I wrote an
                  application for mesh multi-resolution analysis with a
                  colleague, referencing this paper. Implemented Taubin's
                  subdivision connectivity detection algorithm and auxiliary
                  functions to perform forward and inverse wavelet transforms.
                </Paragraph>
              </SectionSegment>
              <SectionSegment ref={segment3Ref}>
                <Paragraph>
                  Tech Stack
                  <ul>
                    <li>C++</li>
                    <li>LibiGL</li>
                    <li>Github</li>
                  </ul>
                </Paragraph>
              </SectionSegment>
            </SectionContent>
          </StyledSection>
        </Intro>
      </ContentContainer>
    </Container>
  );
};

const BuildAnimation = (
  timelineRef: MutableRefObject<GSAPTimeline>,
  chessTilesRef: MutableRefObject<BoardRef>,
  segment1Ref: MutableRefObject<HTMLDivElement>,
  segment2Ref: MutableRefObject<HTMLDivElement>,
  segment3Ref: MutableRefObject<HTMLDivElement>,
  containerRef: React.RefObject<HTMLDivElement>,
  introRef: React.RefObject<HTMLDivElement>,
) => {
  if (
    !introRef.current ||
    !chessTilesRef.current ||
    !segment1Ref.current ||
    !segment2Ref.current ||
    !segment3Ref.current ||
    !containerRef.current
  )
    return;

  const timeline = (timelineRef.current = gsap.timeline());
  const boardTimeline = gsap.timeline();

  const { tiles, pieces } = chessTilesRef.current;
  tiles.forEach((Tile: THREE.Mesh) => {
    boardTimeline.fromTo(
      Tile.position,
      {
        y: -15 - Math.random() / 2,
      },
      {
        y: 0.1,
        duration: 0.5 + Math.random() / 2,
        ease: 'back.inOut(1, 0.3)',
      },
      0,
    );
  });

  pieces.forEach((Piece: THREE.Mesh) => {
    boardTimeline.fromTo(
      Piece.position,
      {
        y: 15 - Math.random() / 2,
        duration: 0.5,
      },
      {
        y: -0.2,
        duration: 0.75 + Math.random() / 4,
        ease: 'none',
      },
      0,
    );
  });

  pieces.forEach((Piece: THREE.Mesh) => {
    boardTimeline.fromTo(
      Piece.scale,
      {
        x: 0,
        y: 0,
        z: 0,
        delay: 0,
      },
      {
        x: 0.2,
        y: 0.2,
        z: 0.2,
        duration: 0.5,
        delay: 0.25,
        ease: 'power4.in',
      },
      0,
    );
  });

  const segments = [
    segment1Ref.current,
    segment2Ref.current,
    segment3Ref.current,
  ];

  gsap.set(segments, { opacity: 0, x: -20 });

  let counter = 0;
  let increment = 0.175;

  segments.forEach((Segment: HTMLDivElement, index: number) => {
    timeline.to(
      Segment,
      {
        opacity: 1,
        x: 0,
        duration: 0.125,
      },
      0.25 + counter * increment,
    );
    counter += 2;
    timeline.to(
      Segment,
      { opacity: 0, x: 20, duration: 0.125 },
      0.25 + counter * increment,
    );
    counter++;
  });

  const scrollTrigger = ScrollTrigger.create({
    trigger: containerRef.current,
    scrub: true,
    start: 'top top',
    end: 'bottom bottom',
    animation: timeline,
    onEnter: () => {
      boardTimeline.play();
    },
    onLeaveBack: () => {
      boardTimeline.reverse();
    },
  });
};

const Container = styled.div`
  width: 100%;
  height: 400vh;
`;

const ContentContainer = styled(FullHeightContent)`
  position: -webkit-sticky;
  position: sticky;
  top: 0;
`;

const Intro = styled(FullHeightContent)`
  position: absolute;
`;

const StyledSection = styled(Section)`
  display: flex;
  align-items: center;
`;

const SectionContent = styled.div`
  position: relative;
  margin-right: 32px;
  flex: 2;
`;

const SectionSegment = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  overflow: visible;
  align-items: center;
`;

export default Chess3D;
