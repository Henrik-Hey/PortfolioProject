import React, { useEffect, useRef, MutableRefObject } from 'react';
import gsap from 'gsap';
import styled, { keyframes } from 'styled-components';

import {
  SectionHeading,
  Paragraph,
  Section,
  FullHeightContent,
} from '../../shared';
import IDs from '../../../variables/IDs';

const editorString = `import { Simulant } from ‘SimulantDOM’ 

const Comp extends Simulant.Component {
  
  constructor(props) {
    super(props);
    this.states = {
      message: ‘’,
    }
  }

  render() {
    const { message } = this.states;
    return (
      <div class="my-class">
        <h1>{message}</h1>
      </div>
    )
  }

  uponRegistrationFunc() {
    this.setState({
      message: ‘Hello World!’
    })
  }
}

export default Comp;`;

const lineNums = 28;

const Simulant = () => {
  const timelineRef = useRef<GSAPTimeline>(
    null,
  ) as MutableRefObject<GSAPTimeline>;

  // Section Code Editor
  const editorPreRef = useRef<HTMLPreElement>(
    null,
  ) as MutableRefObject<HTMLPreElement>;

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
      editorPreRef,
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

  const lineNumEls = [];
  for (let i = 0; i < lineNums; i++) lineNumEls.push(<div>{i + 1}</div>);

  return (
    <Container ref={containerRef} id={IDs.Projects.Simulant}>
      <ContentContainer>
        <Intro ref={introRef} className={IDs.Projects.Simulant}>
          <StyledSection>
            <SectionContent>
              <EditorWindow>
                <EditorHeading>
                  <EditorHeadingButton color={'#FC5B57'} />
                  <EditorHeadingButton color={'#E4BE3B'} />
                  <EditorHeadingButton color={'#57C038'} />
                </EditorHeading>
                <EditorBody>
                  <EditorNumColumn>{lineNumEls}</EditorNumColumn>
                  <EditorContent ref={editorPreRef}></EditorContent>
                </EditorBody>
              </EditorWindow>
            </SectionContent>
            <SectionContent>
              <SectionSegment ref={segment1Ref}>
                <SectionHeading
                  title="Simulant"
                  titleSize="4rem"
                  subHeading={'[Example of component on the side]'}
                  borderColor={'white'}
                />
              </SectionSegment>
              <SectionSegment ref={segment2Ref}>
                <SectionParagraph>
                  A lightweight single file Virtual DOM with a state based
                  component system, heavily influenced by react.js, and allows
                  for component based project architure. Also works with JSX
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
          </StyledSection>
        </Intro>
      </ContentContainer>
    </Container>
  );
};

const BuildAnimation = (
  timelineRef: React.MutableRefObject<GSAPTimeline>,
  editorPreRef: React.MutableRefObject<HTMLPreElement>,
  segment1Ref: React.MutableRefObject<HTMLDivElement>,
  segment2Ref: React.MutableRefObject<HTMLDivElement>,
  segment3Ref: React.MutableRefObject<HTMLDivElement>,
  containerRef: React.RefObject<HTMLDivElement>,
  introRef: React.RefObject<HTMLDivElement>,
) => {
  if (
    !introRef.current ||
    !editorPreRef.current ||
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

  const contentLength = editorString.length;

  ScrollTrigger.create({
    trigger: containerRef.current,
    scrub: true,
    start: 'top top',
    end: 'bottom bottom',
    animation: timeline,
    onUpdate: (self) => {
      gsap.set(editorPreRef.current, {
        innerText: editorString.substring(0, contentLength * self.progress),
      });
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
  overflow: hidden;
  color: white;
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

const EditorWindow = styled.div`
  max-width: 400px;
  width: 100%;
  height: fit-content;
  padding-bottom: 32px;
  min-width: 280px;
  flex: 1;
  overflow: hidden;
  background: #022b35;
  border-radius: 32px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  display: flex;
  flex-direction: column;
`;

const EditorHeading = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  padding-left: 16px;
`;

interface EditorHeadingButtonProps {
  color: string;
}

const EditorHeadingButton = styled.div<EditorHeadingButtonProps>`
  width: 12px;
  height: 12px;
  border-radius: 8px;
  background: ${({ color }) => color};
  margin-left: 8px;
`;

const EditorBody = styled.div`
  flex: 1;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const EditorNumColumn = styled.div`
  width: 48px;
  font-size: min(1.7vh, 16px);
  text-align: right;
  padding-right: 16px;
  color: rgba(255, 255, 255, 0.3);
`;

const blink = keyframes`
  from {
    content: '';
  }

  to {
    content: '|';
  }
`;

const EditorContent = styled.pre`
  font-size: min(1.7vh, 16px);
  margin: 0px;

  &::after {
    content: '';
    color: #e4be3b;
    animation: ${blink} 1s infinite;
  }
`;

export default Simulant;
