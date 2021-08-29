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

const Projects = () => {
  return (
    <>
      <FullHeightContent className={IDs.Projects.Intro}>
        <Section>
          <SectionHeading title="Projects!" />
          <Paragraph>Theres a lot here... so let's get started!</Paragraph>
        </Section>
      </FullHeightContent>
      <Chess3D />
      <LibiGL />
    </>
  );
};

export default Projects;
