import React, { useEffect } from 'react';
import styled from 'styled-components';

import {
  SectionHeading,
  Paragraph,
  Section,
  FullHeightContent,
} from '../shared';
import IDs from '../../variables/IDs';

const AboutMe = () => {
  return (
    <FullHeightContent className={IDs.AboutMe}>
      <Section>
        <StyledParagraph>
          Hello there! My name is Henrik Hey, and I'm a Web Developer!
          <br />
          <br />
          I'm very passionate about building high performance, easy to use, fun
          to use, and tidy Web Applications. I have a passion for all things 3D
          on the computer. Feel free to take the grand tour of the site and
          contact me, you can also find my CV here.
          <br />
          <br />
          projects, experience, and contact
        </StyledParagraph>
      </Section>
    </FullHeightContent>
  );
};

const StyledParagraph = styled(Paragraph)`
  font-size: 1.25rem;
  font-weight: 100;
  z-index: 1;
  margin: 0px;
  letter-spacing: 6px;
  width: 65%;
`;

export default AboutMe;
