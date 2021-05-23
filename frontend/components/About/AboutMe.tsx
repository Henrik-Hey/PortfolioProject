import React, { useEffect } from 'react';
import { SectionHeading, Paragraph, Section, FullHeightContent } from '../shared';
import IDs from '../../variables/IDs';

const AboutMe = () => {
    return (
        <FullHeightContent className={IDs.AboutMe}>
            <Section>
                <SectionHeading title='About Me'/>
                <Paragraph>
                    Hello there! My name is Henrik Hey, and I'm a Web Developer! I'm very passionate about building
                    high performance, easy to use, fun to use, and tidy Web Applications. I have a passion for all 
                    things 3D on the computer. Feel free to take the grand tour of the site and contact me, you can also find my CV here.
                </Paragraph>
            </Section>
        </FullHeightContent>
    )
}

export default AboutMe;