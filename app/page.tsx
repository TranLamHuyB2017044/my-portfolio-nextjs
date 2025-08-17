"use client";

import React, { useRef, useState, useEffect } from "react";

import Header from "./components/Header";
import Objective from "./components/Objective";
import ResumeButton from "./components/ResumeButton";
import Experience from "./components/Experience";
import SectionButton from "./components/SectionButton";
import Project from "./components/Project";



export default function Home() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isScrollingByClick, setIsScrollingByClick] = useState(false);

  const sectionRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  const handleScrollTo = (index: number) => {
    setActiveIndex(index);
    setIsScrollingByClick(true);

    sectionRefs[index]?.current?.scrollIntoView({ behavior: "smooth" });

    setTimeout(() => {
      setIsScrollingByClick(false);
    }, 800);
  };

  useEffect(() => {
    const ratios = new Array(sectionRefs.length).fill(0);

    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingByClick) return;

        entries.forEach((entry) => {
          const index = sectionRefs.findIndex((ref) => ref.current === entry.target);
          if (index !== -1) {
            ratios[index] = entry.intersectionRatio;
          }
        });

        const maxRatio = Math.max(...ratios);
        const mostVisibleIndex = ratios.indexOf(maxRatio);

        if (mostVisibleIndex !== -1) {
          setActiveIndex(mostVisibleIndex);
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sectionRefs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, [isScrollingByClick, sectionRefs]);



  return (
    <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-16 lg:py-0">
      <div className="flex lg:justify-between lg:gap-4 flex-col lg:flex-row">
        <Header activeIndex={activeIndex} onNavClick={handleScrollTo} />
        <main id="content" className="lg:w-[52%] mt-24 flex flex-col items-start">
          <section
            ref={sectionRefs[0]}
            id="about"
            className=" scroll-mt-16 lg:scroll-mt-24"
          >
            <SectionButton text="About" />
            <Objective />
          </section>

          <section ref={sectionRefs[1]} id="experience" className="pt-24">
            <SectionButton text="Experience" />
            <Experience />
          </section>

          <ResumeButton />

          <section ref={sectionRefs[2]} id="projects" className="mt-12">
            <SectionButton text="Projects" />
            <Project />
          </section>
        </main>
      </div>
    </div>
  );
}
