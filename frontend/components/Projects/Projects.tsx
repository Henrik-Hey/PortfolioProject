import React, { useEffect, useRef } from 'react';

import {
  SectionHeading,
  Paragraph,
  Section,
  FullHeightContent,
} from '../shared';
import IDs from '../../variables/IDs';
import LibiGL from './LibiGL/LibiGL';
import Chess3D from './Chess3D/Chess3D';
import Simulant from './Simulant/Simulant';
import styled from 'styled-components';

const Projects = () => {
  return (
    <>
      <FullHeightContent className={IDs.Projects.Intro}>
        <FlexContainer>
          <FlexRow>
            <FlexColumn>
              <StyledSubHeading>MY</StyledSubHeading>
              <StyledHeading>PROJECTS</StyledHeading>
            </FlexColumn>
          </FlexRow>
          <FlexRow>
            <FlexColumn>
              <SubHeadingLink href="#">3D Chess with Three.js</SubHeadingLink>
              <SubHeadingLink href="#">
                Multi Resolution Analysis
              </SubHeadingLink>
              <SubHeadingLink href="#">Simulant.js</SubHeadingLink>
            </FlexColumn>
          </FlexRow>
        </FlexContainer>
      </FullHeightContent>
      <Chess3D />
      <LibiGL />
      <Simulant />
    </>
  );
};

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  width: calc(100vw - 32px);
  max-width: 960px;
`;

const FlexRow = styled.div`
  display: flex;
  align-items: left;
  justify-content: left;
  flex-direction: row;
  text-align: left;
  width: 100%;
`;

const FlexColumn = styled.div`
  display: flex;
  align-items: left;
  justify-content: space-evenly;
  flex-direction: column;
  text-align: left;
`;

const StyledHeading = styled.h2`
  font-size: 10rem;
  font-weight: 100;
  letter-spacing: 1.25rem;
  z-index: 1;
  margin: 0px;
`;

const StyledSubHeading = styled.h3`
  font-size: 1.25rem;
  font-weight: 100;
  z-index: 1;
  margin: 0px;
  letter-spacing: 6px;
`;

const SubHeadingLink = styled.a`
  font-size: 1.25rem;
  font-weight: 100;
  z-index: 1;
  margin: 0px;
  letter-spacing: 6px;
  margin-top: 1rem;
  color: black;
  text-decoration: none;

  &:hover,
  &:focus {
    cursor: pointer;

    &::before {
      content: '>';
    }
    &::after {
      content: '<';
    }
  }
`;

export default Projects;
