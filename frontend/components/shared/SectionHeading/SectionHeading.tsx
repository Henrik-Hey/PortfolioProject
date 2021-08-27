import styled from 'styled-components';

interface props {
  title: string;
}

const SectionHeading = ({ title }: props) => (
  <>
    <Heading>{title}</Heading>
    <Divider />
  </>
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
`;

export default SectionHeading;
