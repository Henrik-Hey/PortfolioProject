import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styled from 'styled-components';

import {
  SectionHeading,
  Paragraph,
  Section,
  FullHeightContent,
} from '../../shared';
import { ModelLoaderOBJ } from '../../_utils/Loader';
import IDs from '../../../variables/IDs';
import MeshRenderer from './MeshRenderer';

const LibiGL = () => {
  const timelineRef = useRef<GSAPTimeline>(
    null,
  ) as React.MutableRefObject<GSAPTimeline>;
  const containerRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    BuildAnimation(timelineRef, containerRef, introRef);
    ModelLoaderOBJ('/models/spot/spotfinecentered.obj').then((model) => {
      console.log(model);
    });
    return () => {
      timelineRef.current?.clear();
    };
  }, [introRef]);

  return (
    <Container ref={containerRef}>
      <ContentContainer>
        {/* <Intro ref={introRef} className={IDs.Projects.Intro}>
          <Section>
            <SectionHeading title="LibiGL" />
            <Paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Paragraph>
          </Section>
        </Intro> */}
        <CanvasCardContainer>
          <CanvasCard>
            <MeshRenderer meshUrl="/models/spot/spotfinestcentered.obj" />
            <CCTitleContainer>
              <CCTitleHeading>Spot Finest</CCTitleHeading>
            </CCTitleContainer>
          </CanvasCard>
          <CanvasCard>
            <MeshRenderer meshUrl="/models/spot/spotfinecentered.obj" />
            <CCTitleContainer>
              <CCTitleHeading>Spot Fine</CCTitleHeading>
            </CCTitleContainer>
          </CanvasCard>
          <CanvasCard>
            <MeshRenderer meshUrl="/models/spot/spotleastfinecentered.obj" />
            <CCTitleContainer>
              <CCTitleHeading>Spot Coarse</CCTitleHeading>
            </CCTitleContainer>
          </CanvasCard>
        </CanvasCardContainer>
      </ContentContainer>
    </Container>
  );
};

const BuildAnimation = (
  timelineRef: React.MutableRefObject<GSAPTimeline>,
  containerRef: React.RefObject<HTMLDivElement>,
  introRef: React.RefObject<HTMLDivElement>,
) => {
  if (!introRef.current || !containerRef.current) return;

  const timeline = (timelineRef.current = gsap.timeline());

  const scrollTrigger = ScrollTrigger.create({
    trigger: containerRef.current,
    scrub: true,
    start: 'top top',
    end: 'bottom top',
    animation: timeline,
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

const CanvasCardContainer = styled(FullHeightContent)`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const CanvasCard = styled.div`
  position: relative;
  max-width: 300px;
  height: calc(100vh - 200px);
  flex: 1;
  background-image: linear-gradient(#101010, #383838);
  border-radius: 75px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  overflow: hidden;
`;

const CCTitleContainer = styled.div`
  position: absolute;
  height: 50%;
  width: 100%;
  display: flex;
  align-items: center;
  bottom: 0px;
  padding: 16px;
`;

const CCTitleHeading = styled.h3`
  font-family: 'Roboto Mono', monospace;
  font-size: 2.25rem;
  font-weight: 200;
  color: ${({ theme }) => theme.interactive.normal};
`;

export default LibiGL;
