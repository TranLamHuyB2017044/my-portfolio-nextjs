'use client';

import Image from 'next/image';

// ← Replace this path with your local avatar file:
//   e.g. '/images/my-photo.jpg'
const AVATAR_SRC = '/images/avatar_2.png';

export default function HeroAvatar() {
  return (
    <div
      className="hero-avatar-wrapper hero-animate-in relative"
      style={{ animationDelay: '0.65s' }}
    >
      {/* Outer glow ring */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            'conic-gradient(from 180deg, #6d28d9, #0ea5e9, #2dd4bf, #6d28d9)',
          padding: '2px',
          borderRadius: '9999px',
          animation: 'rotateBorder 8s linear infinite',
          zIndex: 0,
        }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{ background: '#0a0f2e' }}
        />
      </div>

      {/* Soft glow behind avatar */}
      <div
        className="absolute -inset-6 rounded-full opacity-50 blur-2xl"
        style={{
          background:
            'radial-gradient(circle, rgba(99,102,241,0.4) 0%, rgba(14,165,233,0.2) 50%, transparent 80%)',
          zIndex: -1,
        }}
      />

      {/* Floating container */}
      <div
        className="relative z-10 rounded-full overflow-hidden"
        style={{
          width: 'clamp(220px, 28vw, 320px)',
          height: 'clamp(220px, 28vw, 320px)',
          animation: 'avatarFloat 6s ease-in-out infinite',
          border: '2px solid transparent',
          background:
            'linear-gradient(#0a0f2e, #0a0f2e) padding-box, conic-gradient(from 180deg, #6d28d9, #0ea5e9, #2dd4bf, #6d28d9) border-box',
          transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.transform =
            'scale(1.04)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.transform = '';
        }}
      >
        <Image
          src={AVATAR_SRC}
          alt="Tran Huy — Flutter Developer"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
