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
    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingByClick) return;

        const visibleSection = entries.reduce((max, entry) => {
          return entry.intersectionRatio > max.intersectionRatio ? entry : max;
        }, entries[0]);

        if (visibleSection && visibleSection.target) {
          const index = sectionRefs.findIndex(
            (ref) => ref.current === visibleSection.target
          );
          if (index !== -1) {
            setActiveIndex(index);
          }
        }
      },
      {
        threshold: 0.5,
      }
    );

    sectionRefs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, [isScrollingByClick]);


  return (
    <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-16 lg:py-0">
      <div className="flex lg:justify-between lg:gap-4 flex-col lg:flex-row">
        <Header activeIndex={activeIndex} onNavClick={handleScrollTo} />
        <main id="content" className="lg:w-[52%] mt-24 flex flex-col items-start">
          <section
            ref={sectionRefs[0]}
            id="about"
            className="mb-16 scroll-mt-16 lg:scroll-mt-24"
          >
            <SectionButton text="About" />
            <Objective />
          </section>

          <section ref={sectionRefs[1]} id="experience" className="mt-12">
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
