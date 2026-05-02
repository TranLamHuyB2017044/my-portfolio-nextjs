'use client';

export default function ScrollIndicator() {
  return (
    <div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      style={{ animation: 'scrollFade 3s ease-in-out infinite' }}
    >
      <p className="text-[10px] font-semibold uppercase tracking-[3px] text-slate-500">
        Scroll to explore
      </p>

      {/* Animated chevron stack */}
      <div className="flex flex-col items-center gap-[3px]">
        {[0, 0.15, 0.3].map((delay, i) => (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="8"
            viewBox="0 0 14 8"
            fill="none"
            style={{ animation: `chevronBounce 1.4s ${delay}s ease-in-out infinite` }}
          >
            <path
              d="M1 1L7 7L13 1"
              stroke="url(#chevronGrad)"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient id="chevronGrad" x1="1" y1="1" x2="13" y2="7" gradientUnits="userSpaceOnUse">
                <stop stopColor="#2dd4bf" />
                <stop offset="1" stopColor="#818cf8" />
              </linearGradient>
            </defs>
          </svg>
        ))}
      </div>
    </div>
  );
}
