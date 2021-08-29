import React, { useEffect } from 'react';
import styled from 'styled-components';

import IDs from '../../variables/IDs';

const IntroStatement = () => {
  return (
    <Container className={IDs.Intro}>
      <FlexContainer>
        <FlexRow>
          <StyledHeading>HENRIK</StyledHeading>
        </FlexRow>
        <FlexRow>
          <StyledHeading>HEY</StyledHeading>
          <FlexColumn>
            <StyledSubHeading>Web Developer</StyledSubHeading>
            <StyledSubHeading>3D Graphics Programmer</StyledSubHeading>
          </FlexColumn>
        </FlexRow>
      </FlexContainer>
    </Container>
  );
};

const Container = styled.header`
  position: relative;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
`;

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

const StyledHeading = styled.h1`
  font-size: 10rem;
  font-weight: 100;
  letter-spacing: 6vw;
  z-index: 1;
  margin: 0px;
`;

const StyledSubHeading = styled.h2`
  font-size: 2em;
  font-weight: 100;
  z-index: 1;
  margin: 0px;
  letter-spacing: 6px;
`;

export default IntroStatement;
