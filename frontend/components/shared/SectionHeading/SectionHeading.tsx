import styled from 'styled-components';

interface props {
    title: string
}

const SectionHeading = ({ title }: props) => (
    <Container>
        <Heading>
            {title}
        </Heading>
    </Container>
)

const Container = styled.div`
    width: 100%;
    border-bottom: 8px solid red;
`

const Heading = styled.h3`
    font-size: 2.5em;
    margin-block-start: 0.25em;
    margin-block-end: 0.25em;
`

export default SectionHeading;