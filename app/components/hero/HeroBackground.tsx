'use client';

export default function HeroBackground() {
  return (
    <>
      {/* Base dark gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, #020817 0%, #0a0f2e 40%, #0d1240 70%, #070d1f 100%)',
        }}
      />

      {/* Animated floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Orb 1 — deep purple */}
        <div
          className="hero-orb absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background:
              'radial-gradient(circle, #6d28d9 0%, transparent 70%)',
            animation: 'orbFloat1 12s ease-in-out infinite',
          }}
        />
        {/* Orb 2 — teal-blue */}
        <div
          className="hero-orb absolute -bottom-48 -right-24 w-[600px] h-[600px] rounded-full opacity-15"
          style={{
            background:
              'radial-gradient(circle, #0284c7 0%, transparent 70%)',
            animation: 'orbFloat2 16s ease-in-out infinite',
          }}
        />
        {/* Orb 3 — indigo accent */}
        <div
          className="hero-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-10"
          style={{
            background:
              'radial-gradient(circle, #4f46e5 0%, transparent 70%)',
            animation: 'orbFloat3 20s ease-in-out infinite',
          }}
        />
      </div>

      {/* Subtle dot-grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
    </>
  );
}
