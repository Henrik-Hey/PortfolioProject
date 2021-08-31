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
import MeshRenderer from '../MeshRenderer';

const MP_UP_ID = IDs.Projects.LibiGL + 'motion_path_up';
const MP_DOWN_ID = IDs.Projects.LibiGL + 'motion_path_down';

const LibiGL = () => {
  const timelineRef = useRef<GSAPTimeline>(
    null,
  ) as MutableRefObject<GSAPTimeline>;

  // Model Card Refs
  const level1Ref = useRef<HTMLDivElement>(
    null,
  ) as MutableRefObject<HTMLDivElement>;
  const level2Ref = useRef<HTMLDivElement>(
    null,
  ) as MutableRefObject<HTMLDivElement>;
  const level3Ref = useRef<HTMLDivElement>(
    null,
  ) as MutableRefObject<HTMLDivElement>;

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
    BuildAnimation(
      timelineRef,
      level1Ref,
      level2Ref,
      level3Ref,
      segment1Ref,
      segment2Ref,
      segment3Ref,
      containerRef,
      introRef,
    );
    return () => {
      timelineRef.current?.clear();
    };
  }, [introRef]);

  return (
    <Container ref={containerRef} id={IDs.Projects.LibiGL}>
      <ContentContainer>
        <Intro ref={introRef} className={IDs.Projects.LibiGL}>
          <StyledSection>
            <SectionContent>
              <SectionSegment ref={segment1Ref}>
                <SectionHeading
                  title="Multi-Resolution Analysis"
                  subHeading={
                    '[Examples of algorithm output shown on the side]'
                  }
                  borderColor={'white'}
                />
              </SectionSegment>
              <SectionSegment ref={segment2Ref}>
                <SectionParagraph>
                  In prep for the (sadly cancelled) libigl hackathon, I wrote an
                  application for mesh multi-resolution analysis with a
                  colleague, referencing this paper. Implemented Taubin's
                  subdivision connectivity detection algorithm and auxiliary
                  functions to perform forward and inverse wavelet transforms.
                </SectionParagraph>
              </SectionSegment>
              <SectionSegment ref={segment3Ref}>
                <SectionParagraph>
                  Tech Stack
                  <ul>
                    <li>C++</li>
                    <li>LibiGL</li>
                    <li>Github</li>
                  </ul>
                </SectionParagraph>
              </SectionSegment>
            </SectionContent>
            <CanvasCardContainer>
              <SVGPathContainer viewBox="-20 0 40 40">
                <path
                  id={MP_DOWN_ID}
                  fill="none"
                  stroke="none"
                  strokeWidth="2"
                  d="M60,80 a60,60 0 0,1 -60,-60"
                />

                <path
                  id={MP_UP_ID}
                  fill="none"
                  stroke="none"
                  strokeWidth="2"
                  d="M0,20 a60,60 0 0,1 60,-60"
                />
              </SVGPathContainer>
              <CanvasCard ref={level3Ref}>
                <MeshRenderer meshUrl="/models/spot/spotfinestcentered.obj" />
                <CCTitleContainer>
                  <CCTitleHeading>Level 3</CCTitleHeading>
                  <CCTitleDivider />
                  <CCTitleSubHeading>Highest resolution</CCTitleSubHeading>
                </CCTitleContainer>
              </CanvasCard>
              <CanvasCard ref={level2Ref}>
                <MeshRenderer meshUrl="/models/spot/spotfinecentered.obj" />
                <CCTitleContainer>
                  <CCTitleHeading>Level 2</CCTitleHeading>
                  <CCTitleDivider />
                  <CCTitleSubHeading>High resolution</CCTitleSubHeading>
                </CCTitleContainer>
              </CanvasCard>
              <CanvasCard ref={level1Ref}>
                <MeshRenderer meshUrl="/models/spot/spotleastfinecentered.obj" />
                <CCTitleContainer>
                  <CCTitleHeading>Level 1</CCTitleHeading>
                  <CCTitleDivider />
                  <CCTitleSubHeading>Lowest resolution</CCTitleSubHeading>
                </CCTitleContainer>
              </CanvasCard>
            </CanvasCardContainer>
          </StyledSection>
        </Intro>
      </ContentContainer>
    </Container>
  );
};

const BuildAnimation = (
  timelineRef: React.MutableRefObject<GSAPTimeline>,
  level1Ref: React.MutableRefObject<HTMLDivElement>,
  level2Ref: React.MutableRefObject<HTMLDivElement>,
  level3Ref: React.MutableRefObject<HTMLDivElement>,
  segment1Ref: React.MutableRefObject<HTMLDivElement>,
  segment2Ref: React.MutableRefObject<HTMLDivElement>,
  segment3Ref: React.MutableRefObject<HTMLDivElement>,
  containerRef: React.RefObject<HTMLDivElement>,
  introRef: React.RefObject<HTMLDivElement>,
) => {
  if (
    !introRef.current ||
    !level1Ref.current ||
    !level2Ref.current ||
    !level3Ref.current ||
    !segment1Ref.current ||
    !segment2Ref.current ||
    !segment3Ref.current ||
    !containerRef.current
  )
    return;

  const timeline = (timelineRef.current = gsap.timeline());

  const segments = [
    segment1Ref.current,
    segment2Ref.current,
    segment3Ref.current,
  ];
  const levelCards = [level1Ref.current, level2Ref.current, level3Ref.current];

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
      counter * increment,
    );
    counter += 2;
    timeline.to(
      Segment,
      { opacity: 0, x: 20, duration: 0.125 },
      counter * increment,
    );
    counter++;
  });

  gsap.set(levelCards, { y: '100vh' });

  const MOTION_PATH_PRESET_DOWN = {
    path: `#${MP_DOWN_ID}`,
    align: `#${MP_DOWN_ID}`,
    alignOrigin: [0.5, 0.5],
  };

  const MOTION_PATH_PRESET_UP = {
    path: `#${MP_UP_ID}`,
    align: `#${MP_UP_ID}`,
    alignOrigin: [0.5, 0.5],
  };

  counter = 0;
  increment = 0.175;

  levelCards.forEach((Card: HTMLDivElement, index: number) => {
    timeline.to(
      Card,
      {
        motionPath: MOTION_PATH_PRESET_DOWN,
        duration: increment,
        ease: 'power1.inOut',
      },
      counter * increment,
    );
    counter += 2;
    timeline.to(
      Card,
      {
        motionPath: MOTION_PATH_PRESET_UP,
        duration: increment,
        ease: 'power1.inOut',
      },
      counter * increment,
    );
    counter++;
  });

  const scrollTrigger = ScrollTrigger.create({
    trigger: containerRef.current,
    scrub: true,
    start: 'top top',
    end: 'bottom bottom',
    animation: timeline,
  });
};

const Container = styled.div`
  width: 100%;
  height: 300vh;
`;

const ContentContainer = styled(FullHeightContent)`
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  color: white;
  overflow: hidden;
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
  align-items: center;
  opacity: 0;
`;

const SectionParagraph = styled(Paragraph)``;

const CanvasCardContainer = styled(FullHeightContent)`
  position: relative;
  flex: 1;
  overflow: visible;
`;

const SVGPathContainer = styled.svg`
  position: absolute;
  left: 0px;
  width: calc(100vw - 960px);
  height: 100vh;
  opacity: 1;
  min-width: 280px;

  @media (max-width: 960px) {
    width: 200%;
  }
`;

const CanvasCard = styled.div`
  position: absolute;
  max-width: 300px;
  height: calc(60vh);
  min-width: 280px;
  flex: 1;
  overflow: hidden;
`;

const CCTitleContainer = styled.div`
  position: absolute;
  height: fit-content;
  width: calc(100% - 32px);
  bottom: 75px;
  padding: 0px 16px;
`;

const CCTitleHeading = styled.h3`
  font-family: 'Roboto Mono', monospace;
  font-size: 2rem;
  font-weight: 200;
  color: ${({ theme }) => theme.interactive.normal};
  margin: 0px;
`;

const CCTitleDivider = styled.div`
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, #6f76fd, #46c7d8, #c737cc);
`;

const CCTitleSubHeading = styled.h4`
  font-family: 'Roboto Mono', monospace;
  font-size: 1.25rem;
  font-weight: 200;
  color: ${({ theme }) => theme.interactive.normal};
  margin: 0px;
`;

export default LibiGL;
