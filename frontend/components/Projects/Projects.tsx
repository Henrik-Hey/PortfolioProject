import React, { useEffect, useRef } from 'react';

import {
  SectionHeading,
  Paragraph,
  Section,
  FullHeightContent,
} from '../shared';
import IDs from '../../variables/IDs';
import LibiGL from './LibiGL/LibiGL';

const Projects = () => {
  return (
    <>
      <FullHeightContent className={IDs.Projects.Intro}>
        <Section>
          <SectionHeading title="Projects!" />
          <Paragraph>Theres a lot here... so let's get started!</Paragraph>
        </Section>
      </FullHeightContent>
      <LibiGL />
    </>
  );
};

export default Projects;
