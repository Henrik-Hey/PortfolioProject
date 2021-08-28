import styled from 'styled-components';

interface props {
  title: string;
  subHeading?: string;
}

const SectionHeading = ({ title, subHeading }: props) => (
  <div>
    <Heading>{title}</Heading>
    <Divider />
    {subHeading && <SubHeading>{subHeading}</SubHeading>}
  </div>
);

const Divider = styled.div`
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #6f76fd, #46c7d8, #c737cc);
`;

const Heading = styled.h3`
  font-size: 2.5em;
  margin-block-start: 0.25em;
  margin-block-end: 0.25em;
  font-family: 'Roboto Mono', monospace;
`;

const SubHeading = styled.h4`
  font-size: 1em;
  font-weight: 400;
  margin-block-start: 0.25em;
  margin-block-end: 0.25em;
  font-family: 'Roboto Mono', monospace;
`;

export default SectionHeading;
