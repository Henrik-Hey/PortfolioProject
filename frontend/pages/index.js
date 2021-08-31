import Head from 'next/head';
import { createGlobalStyle } from 'styled-components';

import PersistentBackdrop from '../components/PersistentBackdrop/PersistentBackdrop';
import Room from '../components/PersistentBackdrop/Room';
import IntroStatement from '../components/Intro/IntroStatement';
import AboutMe from '../components/About/AboutMe';
import Projects from '../components/Projects/Projects';
import { PaletteProvider } from '../components/providers/PaletteProvider';

export default function Home() {
  return (
    <PaletteProvider>
      <Head>
        <title>Henrik Hey</title>
        <link rel="icon" href="/favicon.ico" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.6.1/ScrollTrigger.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.6.1/MotionPathPlugin.min.js"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin={'true'}
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Courier+Prime&display=swap"
          rel="stylesheet"
        ></link>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin={'true'}
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@200;400&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <GlobalStyles />
      <PersistentBackdrop />
      {/* <Room/> */}
      <IntroStatement />
      <AboutMe />
      <Projects />
    </PaletteProvider>
  );
}

const GlobalStyles = createGlobalStyle`
  * {
    font-family: 'Courier Prime', monospace;
    -webkit-font-smoothing: antialiased;
  }

  html {
    scroll-padding-top: 20vh;
  }

  body {
    margin: 0px;
    overflow-x: hidden;
  }
`;
