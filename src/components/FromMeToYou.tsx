import React from 'react';
import { surpriseConfig } from '../config/surpriseConfig';
import { ChevronDown, Heart } from 'lucide-react';

interface FromMeToYouProps {
  onNext: () => void;
}

export const FromMeToYou: React.FC<FromMeToYouProps> = ({ onNext }) => {
  const { fromMeToYou } = surpriseConfig;

  return (
    <section className="relative min-h-[85vh] sm:min-h-screen w-full flex flex-col items-center justify-center px-4 py-16 bg-[#FFF2E0] text-center overflow-hidden">
      {/* Decorative Dried Rose in Top Left Corner (matching video frame 10!) */}
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 z-10 select-none">
        <div className="relative transform -rotate-45">
          {/* Scotch tape effect holding the rose */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-4 bg-amber-100/60 backdrop-blur-sm border border-amber-200/40 rotate-12 shadow-sm" />
          <svg viewBox="0 0 60 90" className="w-12 h-18 sm:w-16 sm:h-24 drop-shadow-md">
            {/* Stem */}
            <path d="M30 35 Q28 60 32 85" stroke="#4A5239" strokeWidth="2.5" fill="none" />
            <path d="M30 50 Q20 48 18 42" stroke="#4A5239" strokeWidth="1.5" fill="none" />
            <path d="M30 65 Q40 62 42 56" stroke="#4A5239" strokeWidth="1.5" fill="none" />
            {/* Dried Leaves */}
            <ellipse cx="18" cy="42" rx="4" ry="2.5" fill="#6B7853" transform="rotate(-30 18 42)" />
            <ellipse cx="42" cy="56" rx="4" ry="2.5" fill="#6B7853" transform="rotate(30 42 56)" />
            {/* Dried burgundy rose bud */}
            <ellipse cx="30" cy="22" rx="14" ry="12" fill="#761B3B" />
            <ellipse cx="30" cy="20" rx="10" ry="9" fill="#93254C" />
            <circle cx="30" cy="18" r="6" fill="#4B0F24" />
          </svg>
        </div>
      </div>

      <div className="max-w-md w-full mx-auto z-10 flex flex-col items-center">
        {/* Heading */}
        <h2 className="font-great-vibes text-5xl sm:text-7xl text-[#761B3B] font-normal mb-1 drop-shadow-sm">
          {fromMeToYou.heading}
        </h2>
        <p className="font-dancing text-xl sm:text-2xl text-pink-900/80 mb-6">
          {fromMeToYou.subtitle}
        </p>

        {/* Couple Hugging Illustration (as in video frame 10) */}
        <div className="relative my-4 p-4 select-none">
          {/* Gentle glow halo */}
          <div className="absolute inset-0 bg-pink-300/30 rounded-full blur-2xl" />

          <svg viewBox="0 0 240 220" className="w-56 h-52 sm:w-64 sm:h-60 mx-auto drop-shadow-md">
            <defs>
              <linearGradient id="skin" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFE0BD" />
                <stop offset="100%" stopColor="#F5C396" />
              </linearGradient>
            </defs>

            {/* Grass & floral ground */}
            <path d="M20 200 Q120 190 220 200" stroke="#C8D4B8" strokeWidth="2" fill="none" />
            <circle cx="50" cy="195" r="2" fill="#E89071" />
            <circle cx="70" cy="198" r="2.5" fill="#F45B91" />
            <circle cx="170" cy="198" r="2.5" fill="#F45B91" />
            <circle cx="190" cy="195" r="2" fill="#D8AF62" />

            {/* BOY (Left) */}
            {/* Boy Body/Jacket (Beige hoodie) */}
            <path d="M70 200 C60 145, 95 125, 115 125 C125 125, 135 135, 140 150 L130 200 Z" fill="#D9C2A7" />
            {/* Boy Arm embracing her */}
            <path d="M100 135 C115 140, 145 145, 155 160 C155 170, 140 175, 125 170" stroke="#D9C2A7" strokeWidth="14" strokeLinecap="round" fill="none" />
            {/* Boy Head */}
            <circle cx="112" cy="100" r="20" fill="url(#skin)" />
            {/* Boy Dark Hair */}
            <path d="M92 98 C92 78, 128 75, 130 92 C130 96, 120 102, 110 98 C100 95, 96 102, 92 98 Z" fill="#2E2320" />

            {/* GIRL (Right) */}
            {/* Girl Body (Pink sweater) */}
            <path d="M125 200 C125 150, 145 130, 165 130 C180 130, 195 150, 185 200 Z" fill="#F4A6BF" />
            {/* Girl Arm wrapping around him */}
            <path d="M150 145 C135 150, 115 150, 105 165" stroke="#F4A6BF" strokeWidth="12" strokeLinecap="round" fill="none" />
            {/* Girl Head leaning close / forehead touch */}
            <circle cx="138" cy="102" r="18" fill="url(#skin)" />
            {/* Girl Long wavy dark hair */}
            <path d="M125 95 C125 78, 158 80, 158 98 C160 115, 172 135, 170 170 C165 155, 150 140, 145 125 C140 110, 130 110, 125 95 Z" fill="#29181B" />

            {/* Floating little hearts above them */}
            <g className="animate-bounce" style={{ animationDuration: '2s' }}>
              <path d="M125 65 C125 60, 120 56, 116 58 C112 60, 115 66, 125 72 C135 66, 138 60, 134 58 C130 56, 125 60, 125 65 Z" fill="#F45B91" />
            </g>
          </svg>
        </div>

        {/* Handwritten message */}
        <p className="font-caveat text-2xl text-pink-900/90 max-w-xs mx-auto leading-tight mt-2">
          "{fromMeToYou.message}"
        </p>

        {/* Dots below */}
        <div className="flex justify-center items-center gap-2 my-6">
          <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
          <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
          <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
        </div>

        {/* Scroll button */}
        <button
          onClick={onNext}
          className="px-7 py-3 rounded-full bg-[#761B3B] hover:bg-[#5E142E] text-white text-sm font-medium shadow-md hover:shadow-lg transition-all flex items-center gap-2 active:scale-95"
        >
          <span>Open Our Scrapbook Gallery</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
