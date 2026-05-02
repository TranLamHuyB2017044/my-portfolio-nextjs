'use client';

import React from 'react';
import HeroText from './HeroText';
import HeroAvatar from './HeroAvatar';
import HeroBackground from './HeroBackground';
import ScrollIndicator from './ScrollIndicator';

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full items-center overflow-hidden"
    >
      {/* Animated background */}
      <HeroBackground />

      {/* Content grid */}
      <div className="relative z-10 mx-auto w-full max-w-screen-xl px-6 md:px-12">
        <div className="flex flex-col-reverse items-center gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          {/* Left — text */}
          <div className="w-full lg:w-[55%]">
            <HeroText />
          </div>

          {/* Right — avatar */}
          <div className="flex w-full justify-center lg:w-[45%] lg:justify-end">
            <HeroAvatar />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <ScrollIndicator />
    </section>
  );
}
