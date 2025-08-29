"use client";

export default function WaveSeparator() {
  return (
    <div className="relative w-full overflow-hidden">
      <svg
        className="relative block w-full h-16 md:h-20 lg:h-24 animate-fadein"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,60 C300,100 600,20 900,60 C1050,80 1200,40 1200,60 L1200,120 L0,120 Z"
          fill="url(#waveGradient)"
          className="transition-all duration-500 hover:drop-shadow-lg"
        />
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#fef7ed" />
            <stop offset="100%" stopColor="#f9fafb" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
