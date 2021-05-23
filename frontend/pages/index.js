import Head from 'next/head'
import { createGlobalStyle } from 'styled-components';

import PersistentBackdrop from '../components/PersistentBackdrop/PersistentBackdrop';
import Room from '../components/PersistentBackdrop/Room';
import IntroStatement from  '../components/Intro/IntroStatement';
import AboutMe from '../components/About/AboutMe';
import Projects from '../components/Projects/Projects';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Henrik Hey</title>
        <link rel="icon" href="/favicon.ico" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.6.1/ScrollTrigger.min.js"></script>
      </Head>
      <GlobalStyles />
      <PersistentBackdrop />
      <Room/>
      <IntroStatement />
      <AboutMe/>
      <Projects/>
    </div>
  )
}

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap');

  * {
    font-family: 'Noto Sans JP', sans-serif;
  }

  body {
    margin: 0px;
    overflow-x: hidden;
  }
`