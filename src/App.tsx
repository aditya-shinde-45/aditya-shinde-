import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar, { NAV_ITEMS } from './components/Navbar';
import useScrollSpy from './hooks/useScrollSpy';
import Footer from './components/Footer';

import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Achievements from './sections/Achievements';
import Contact from './sections/Contact';

import './index.css';

const SECTION_IDS = NAV_ITEMS.map((item) => item.href.replace('#', ''));

function App() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  const activeSection = useScrollSpy(SECTION_IDS);

  return (
    <div className="min-h-screen bg-white">
      <Navbar items={NAV_ITEMS} activeSection={activeSection} />
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Achievements />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
