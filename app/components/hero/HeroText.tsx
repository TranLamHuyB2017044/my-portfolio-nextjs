'use client';

import React from 'react';

/* ─── data ──────────────────────────────────────────────────── */
const lines = [
  // [delay, content, element-type, className]
  {
    delay: 0,
    element: 'label',
    className:
      'hero-label inline-block text-xs font-semibold uppercase tracking-[3px] text-teal-400 mb-4',
    content: '👋 Hey, I\'m',
  },
  {
    delay: 0.15,
    element: 'h1',
    className:
      'hero-name text-6xl sm:text-7xl font-extrabold leading-none tracking-tight text-white',
    content: 'Trần Lâm Huy',
  },
  {
    delay: 0.3,
    element: 'h2',
    className:
      'hero-role mt-3 text-2xl sm:text-3xl font-bold bg-gradient-to-r from-teal-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent',
    content: 'Flutter Developer',
  },
  {
    delay: 0.45,
    element: 'p',
    className:
      'hero-tagline mt-4 text-lg sm:text-xl font-medium text-slate-300',
    content: 'Building AI-powered apps',
  },
  {
    delay: 0.6,
    element: 'p',
    className:
      'hero-subline mt-1 text-sm sm:text-base font-normal text-slate-500 tracking-wide',
    content: 'OCR · RAG · Face Recognition',
  },
];

/* ─── component ─────────────────────────────────────────────── */
export default function HeroText() {
  return (
    <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
      {lines.map(({ delay, element, className, content }, i) => {
        const Tag = element as React.ElementType;
        return (
          <Tag
            key={i}
            className={`${className} hero-animate-in`}
            style={{ animationDelay: `${delay}s` }}
          >
            {content}
          </Tag>
        );
      })}

      {/* CTA Buttons */}
      <div
        className="hero-buttons hero-animate-in mt-10 flex flex-wrap gap-4 justify-center lg:justify-start"
        style={{ animationDelay: '0.8s' }}
      >
        {/* Primary — Contact */}
        <a
          id="hero-contact-btn"
          href="https://www.facebook.com/tran.lam.huy.180408/"
          target="_blank"
          rel="noopener noreferrer"
          className="
            relative inline-flex items-center gap-2 rounded-full
            bg-gradient-to-r from-teal-500 to-sky-500
            px-7 py-3 text-sm font-semibold text-white
            shadow-[0_0_20px_rgba(45,212,191,0.4)]
            transition-all duration-300
            hover:scale-[1.04] hover:shadow-[0_0_32px_rgba(45,212,191,0.65)]
            focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-[#020817]
            group
          "
        >
          Contact Me
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>

        {/* Secondary — GitHub */}
        <a
          id="hero-github-btn"
          href="https://github.com/TranLamHuyB2017044"
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-flex items-center gap-2 rounded-full
            border border-slate-600 bg-slate-800/50 backdrop-blur-sm
            px-7 py-3 text-sm font-semibold text-slate-300
            transition-all duration-300
            hover:scale-[1.04] hover:border-teal-400 hover:text-white
            hover:shadow-[0_0_20px_rgba(45,212,191,0.2)]
            focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-[#020817]
          "
        >
          <GitHubMini />
          GitHub
        </a>
      </div>
    </div>
  );
}

/* Tiny inline GitHub icon to avoid extra imports */
function GitHubMini() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}
