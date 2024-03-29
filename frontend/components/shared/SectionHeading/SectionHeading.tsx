import React from 'react';
import styled from 'styled-components';

interface props {
  title: string | React.ReactNode | React.ReactChildren;
  titleSize?: string;
  subHeading?: string;
  borderColor?: string;
}

const SectionHeading = ({
  title,
  titleSize,
  subHeading,
  borderColor,
}: props) => (
  <Container $borderColor={borderColor}>
    <Heading $titleSize={titleSize}>{title}</Heading>
    {subHeading && <SubHeading>{subHeading}</SubHeading>}
  </Container>
);

interface ContainerProps {
  $borderColor?: string;
}

const Container = styled.div<ContainerProps>`
  width: 100%;
  border-left: 5px solid ${({ $borderColor }) => $borderColor || 'black'};
  padding-left: 2vw;
`;

interface HeadingProps {
  $titleSize?: string;
}

const Heading = styled.h3<HeadingProps>`
  margin-block-start: 0.25em;
  margin-block-end: 0.25em;
  margin-left: 1rem;
  font-size: ${({ $titleSize }) => $titleSize || '5rem'};
  font-weight: 100;
  letter-spacing: 1vw;
  margin-left: 2vw;
  z-index: 1;
  margin: 0px;
`;

const SubHeading = styled.h4`
  font-size: 1rem;
  font-weight: 100;
  margin-left: 2vw;
  z-index: 1;
  margin: 0px;
  letter-spacing: 6px;
  margin-block-start: 0.25em;
  margin-block-end: 0.25em;
`;

export default SectionHeading;
