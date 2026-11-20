import React, { useState, useEffect } from 'react';
import { surpriseConfig } from '../config/surpriseConfig';
import { ChevronDown } from 'lucide-react';

interface LoveTreeProps {
  onNext: () => void;
}

export const LoveTree: React.FC<LoveTreeProps> = ({ onNext }) => {
  const { loveTree } = surpriseConfig;
  const [bloom, setBloom] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBloom(true);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Heart leaves for tree canopy in heart shape
  const heartLeaves = [
    { cx: 200, cy: 110, r: 12, color: '#F45B91', delay: 0.1 },
    { cx: 175, cy: 125, r: 14, color: '#FFD6E2', delay: 0.2 },
    { cx: 225, cy: 125, r: 14, color: '#D92E70', delay: 0.25 },
    { cx: 155, cy: 145, r: 16, color: '#F45B91', delay: 0.3 },
    { cx: 245, cy: 145, r: 16, color: '#D8AF62', delay: 0.35 },
    { cx: 135, cy: 170, r: 18, color: '#FFD6E2', delay: 0.4 },
    { cx: 265, cy: 170, r: 18, color: '#F45B91', delay: 0.45 },
    { cx: 145, cy: 200, r: 18, color: '#D92E70', delay: 0.5 },
    { cx: 255, cy: 200, r: 18, color: '#FFD6E2', delay: 0.55 },
    { cx: 170, cy: 230, r: 20, color: '#F45B91', delay: 0.6 },
    { cx: 230, cy: 230, r: 20, color: '#D8AF62', delay: 0.65 },
    { cx: 190, cy: 255, r: 20, color: '#D92E70', delay: 0.7 },
    { cx: 210, cy: 255, r: 20, color: '#F45B91', delay: 0.75 },
    { cx: 200, cy: 275, r: 16, color: '#FFD6E2', delay: 0.8 },
    // inner fill hearts
    { cx: 185, cy: 160, r: 16, color: '#FFF0D7', delay: 0.3 },
    { cx: 215, cy: 160, r: 16, color: '#FFD6E2', delay: 0.35 },
    { cx: 200, cy: 185, r: 22, color: '#F45B91', delay: 0.4 },
    { cx: 180, cy: 195, r: 18, color: '#D8AF62', delay: 0.45 },
    { cx: 220, cy: 195, r: 18, color: '#D92E70', delay: 0.5 },
    { cx: 200, cy: 225, r: 20, color: '#FFD6E2', delay: 0.55 },
  ];

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-between px-4 py-16 bg-gradient-to-b from-[#FFF4EF] via-[#FFF0D7] to-[#FFEBE7] overflow-hidden">
      {/* Falling romantic hearts / petals in background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            className="absolute text-pink-400/50 animate-float-slow select-none"
            style={{
              top: `${(i * 14) % 95}%`,
              left: `${(i * 21 + 3) % 92}%`,
              animationDelay: `${(i * 0.3) % 4}s`,
              transform: `scale(${0.5 + (i % 3) * 0.25})`,
            }}
          >
            🌸
          </div>
        ))}
      </div>

      {/* Top Section Header */}
      <div className="text-center z-10 pt-4">
        <span className="inline-block px-4 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-semibold uppercase tracking-wider mb-2">
          Growing Together
        </span>
        <h2 className="font-dancing text-3xl sm:text-4xl text-pink-900 font-bold">
          Our Love Tree
        </h2>
      </div>

      {/* Center Tree Illustration (SVG) */}
      <div className="relative w-full max-w-md my-auto flex items-center justify-center">
        <svg 
          viewBox="0 0 400 440" 
          className="w-72 h-80 sm:w-88 sm:h-96 drop-shadow-md select-none"
        >
          {/* Tree Trunk & Branches */}
          <g stroke="#5C3828" strokeLinecap="round" strokeLinejoin="round">
            {/* Main Trunk */}
            <path
              d="M196 420 L196 280 C196 240, 185 220, 175 190"
              strokeWidth="10"
              fill="none"
              className="transition-all duration-1000 ease-out"
            />
            <path
              d="M204 420 L204 280 C204 240, 215 220, 225 190"
              strokeWidth="9"
              fill="none"
              className="transition-all duration-1000 ease-out"
            />
            {/* Trunk Roots base */}
            <path d="M192 420 Q170 425 150 430" strokeWidth="6" fill="none" />
            <path d="M208 420 Q230 425 250 430" strokeWidth="6" fill="none" />

            {/* Inner Branches */}
            <path d="M185 240 Q160 210 145 180" strokeWidth="6" fill="none" />
            <path d="M215 240 Q240 210 255 180" strokeWidth="6" fill="none" />
            <path d="M190 270 Q140 240 125 210" strokeWidth="5" fill="none" />
            <path d="M210 270 Q260 240 275 210" strokeWidth="5" fill="none" />
            <path d="M175 190 Q160 150 170 120" strokeWidth="4" fill="none" />
            <path d="M225 190 Q240 150 230 120" strokeWidth="4" fill="none" />
            <path d="M200 230 L200 135" strokeWidth="4.5" fill="none" />
          </g>

          {/* Blossoming Heart Canopy */}
          {heartLeaves.map((leaf, index) => (
            <g
              key={index}
              className="transition-all duration-700 ease-out"
              style={{
                opacity: bloom ? 1 : 0,
                transform: bloom ? 'scale(1)' : 'scale(0)',
                transformOrigin: `${leaf.cx}px ${leaf.cy}px`,
                transitionDelay: `${leaf.delay}s`,
              }}
            >
              {/* Fluttering miniature heart */}
              <path
                d={`M${leaf.cx} ${leaf.cy + leaf.r} 
                   C${leaf.cx - leaf.r} ${leaf.cy + leaf.r * 0.4}, ${leaf.cx - leaf.r * 1.2} ${leaf.cy - leaf.r * 0.4}, ${leaf.cx} ${leaf.cy - leaf.r * 0.3}
                   C${leaf.cx + leaf.r * 1.2} ${leaf.cy - leaf.r * 0.4}, ${leaf.cx + leaf.r} ${leaf.cy + leaf.r * 0.4}, ${leaf.cx} ${leaf.cy + leaf.r} Z`}
                fill={leaf.color}
                opacity={0.92}
                className="hover:scale-125 transition-transform cursor-pointer"
              />
            </g>
          ))}
        </svg>

        {/* Small floating hearts radiating from canopy */}
        <div className="absolute top-1/4 left-1/4 animate-bounce text-xs" style={{ animationDuration: '3s' }}>
          💕
        </div>
        <div className="absolute top-1/3 right-1/4 animate-bounce text-xs" style={{ animationDuration: '2.5s' }}>
          💖
        </div>
      </div>

      {/* Bottom Message Card (matching video frame 05!) */}
      <div className="w-full max-w-sm z-10 flex flex-col items-center">
        <div className="w-full bg-white/90 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-pink-200 text-left transition-all hover:shadow-xl">
          <p className="font-poppins text-xs font-semibold text-pink-500 uppercase tracking-wider mb-1">
            {loveTree.badgeText}
          </p>
          <h3 className="font-great-vibes text-4xl text-pink-800 font-normal">
            {loveTree.title}
          </h3>
          <p className="font-dancing text-lg text-pink-900/80 mt-1">
            {loveTree.subtitle}
          </p>
        </div>

        <button
          onClick={onNext}
          className="mt-6 px-6 py-2.5 rounded-full bg-pink-600 hover:bg-pink-700 text-white font-medium text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 active:scale-95"
        >
          <span>Open My Gift</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
