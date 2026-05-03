"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";

import Header from "./components/Header";
import Objective from "./components/Objective";
import ResumeButton from "./components/ResumeButton";
import Experience from "./components/Experience";
import SectionButton from "./components/SectionButton";
import Project from "./components/Project";
import HeroSection from "./components/hero/HeroSection";
import ScrollToTop from "./components/ScrollToTop";



import { motion } from "framer-motion";

const sectionIds = ["about", "experience", "projects"];

export default function Home() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isScrollingByClick, setIsScrollingByClick] = useState(false);

  const aboutRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  const sectionRefs = useMemo(() => [aboutRef, experienceRef, projectsRef], [aboutRef, experienceRef, projectsRef]);

  const handleScrollTo = (index: number) => {
    setActiveIndex(index);
    setIsScrollingByClick(true);
    
    window.history.replaceState(null, '', `#${sectionIds[index]}`);

    sectionRefs[index]?.current?.scrollIntoView({ behavior: "smooth" });

    setTimeout(() => {
      setIsScrollingByClick(false);
    }, 800);
  };

  useEffect(() => {
    const ratios = new Array(sectionRefs.length).fill(0);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = sectionRefs.findIndex((ref) => ref.current === entry.target);
          if (index !== -1) {
            ratios[index] = entry.intersectionRatio;
          }
        });

        if (isScrollingByClick) return;

        const maxRatio = Math.max(...ratios);
        if (maxRatio > 0) {
          const mostVisibleIndex = ratios.indexOf(maxRatio);
          if (mostVisibleIndex !== -1 && mostVisibleIndex !== activeIndex) {
            setActiveIndex(mostVisibleIndex);
            // Update URL Hash automatically as user scrolls
            const hash = `#${sectionIds[mostVisibleIndex]}`;
            if (window.location.hash !== hash) {
              window.history.replaceState(null, '', hash);
            }
          }
        }
      },
      { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
    );

    sectionRefs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, [isScrollingByClick, activeIndex]);

  // Snap to content effect for Hero section
  useEffect(() => {
    let isAutoScrolling = false;
    let touchStartY = 0;

    // Custom smooth scroll function with easing
    const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const smoothScrollTo = (targetY: number, duration: number) => {
      const startY = window.scrollY;
      const difference = targetY - startY;
      const startTime = performance.now();

      const step = (currentTime: number) => {
        let progress = (currentTime - startTime) / duration;
        if (progress > 1) progress = 1;
        
        window.scrollTo(0, startY + difference * easeInOutCubic(progress));
        
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          setTimeout(() => {
            isAutoScrolling = false;
          }, 100);
        }
      };
      
      requestAnimationFrame(step);
    };

    const triggerSnap = (e?: Event) => {
      if (e && e.cancelable) {
        e.preventDefault();
      }
      isAutoScrolling = true;
      
      // 500ms delay before scrolling starts
      setTimeout(() => {
        const target = document.getElementById("content-wrapper");
        if (target) {
          const targetY = target.getBoundingClientRect().top + window.scrollY;
          smoothScrollTo(targetY, 1200); // 1.2s ultra smooth scroll
        } else {
          isAutoScrolling = false;
        }
      }, 500);
    };

    const handleWheel = (e: WheelEvent) => {
      if (window.scrollY < 100 && e.deltaY > 0 && !isAutoScrolling) {
        triggerSnap(e);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchEndY = e.touches[0].clientY;
      // If user swipes UP (scrolling down)
      if (window.scrollY < 100 && touchStartY - touchEndY > 30 && !isAutoScrolling) {
        triggerSnap(e);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <>
      <ScrollToTop />
      {/* ── Hero ──────────────────────────────────────────── */}
      <HeroSection />

      {/* ── Existing portfolio sections ──────────────────── */}
      <div id="content-wrapper" className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-16 lg:py-0">
        <div className="flex lg:justify-between lg:gap-4 flex-col lg:flex-row">
          <Header activeIndex={activeIndex} onNavClick={handleScrollTo} />
          
          <main id="content" className="lg:w-[52%] mt-24 flex flex-col items-start pb-24">
            {/* About Section */}
            <motion.section
              ref={sectionRefs[0]}
              id="about"
              className="scroll-mt-16 lg:scroll-mt-24"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <SectionButton number="01" text="About" />
              <Objective />
            </motion.section>

            {/* Experience Section */}
            <motion.section 
              ref={sectionRefs[1]} 
              id="experience" 
              className="pt-24 w-full"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <SectionButton number="02" text="Experience" />
              <Experience />
            </motion.section>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            >
              <ResumeButton />
            </motion.div>

            {/* Projects Section */}
            <motion.section 
              ref={sectionRefs[2]} 
              id="projects" 
              className="mt-12 w-full"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <SectionButton number="03" text="Projects" />
              <Project />
            </motion.section>
          </main>
        </div>
      </div>
    </>
  );
}
