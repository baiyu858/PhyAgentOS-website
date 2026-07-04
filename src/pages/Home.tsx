import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Hero from '../sections/home/Hero';
import ProblemSolution from '../sections/home/ProblemSolution';
import CoreConcepts from '../sections/home/CoreConcepts';
import Architecture from '../sections/home/Architecture';
import Scenarios from '../sections/home/Scenarios';
import LiveDemo from '../sections/home/LiveDemo';
import Hardware from '../sections/home/Hardware';
import Benchmark from '../sections/home/Benchmark';
import Roadmap from '../sections/home/Roadmap';
import TeamPreview from '../sections/home/TeamPreview';
import Stats from '../sections/home/Stats';
import Testimonials from '../sections/home/Testimonials';
import DocsCTA from '../sections/home/DocsCTA';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    // Configure ScrollTrigger defaults
    ScrollTrigger.defaults({
      toggleActions: 'play none none reverse',
    });

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    // Handle reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.globalTimeline.timeScale(0);
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="home-page">
      <Hero />
      <LiveDemo />
      <CoreConcepts />
      <ProblemSolution />
      <Architecture />
      <Scenarios />
      <Hardware />
      <Benchmark />
      <Roadmap />
      <TeamPreview />
      <Stats />
      <Testimonials />
      <DocsCTA />
    </div>
  );
}
