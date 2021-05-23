import React, { useEffect } from 'react';
import styled from 'styled-components';

import IDs from '../../variables/IDs';

const IntroStatement = () => {
    return (
        <Container className={IDs.Intro}>
            <StyledHeading>
                What is a Henrik Hey? 
            </StyledHeading>
            <StyledSubHeading>
                (Scroll to find out)
            </StyledSubHeading> 
        </Container>
    )
} 

const Container = styled.div`
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
`

const StyledHeading = styled.h1`
    font-size: 4em;
    padding: 16px;
    z-index: 1;
`
const StyledSubHeading =  styled.h2`
    font-size: 1em;
    padding: 16px;
    font-weight: 100;
    z-index: 1;
`

export default IntroStatement;