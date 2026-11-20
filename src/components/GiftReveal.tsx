import React, { useState } from 'react';
import { surpriseConfig } from '../config/surpriseConfig';
import { triggerHeartConfetti } from '../utils/confetti';
import { Sparkles, Heart, ChevronDown } from 'lucide-react';

interface GiftRevealProps {
  onNext: () => void;
}

export const GiftReveal: React.FC<GiftRevealProps> = ({ onNext }) => {
  const { giftBox } = surpriseConfig;
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenGift = () => {
    if (!isOpen) {
      setIsOpen(true);
      triggerHeartConfetti();
    }
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-16 bg-[#FFF0D7] text-center overflow-hidden">
      {/* Background soft ambient dots */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="w-full h-full bg-[radial-gradient(#F45B91_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="max-w-md w-full mx-auto z-10 flex flex-col items-center">
        {/* Headings */}
        <h2 className="font-great-vibes text-5xl sm:text-6xl text-[#761B3B] font-normal mb-2 drop-shadow-sm">
          {giftBox.heading}
        </h2>
        <p className="font-dancing text-xl sm:text-2xl text-pink-900/80 mb-8">
          {giftBox.subtitle}
        </p>

        {/* The Cute Gift Box Container */}
        <div 
          onClick={handleOpenGift}
          className="relative cursor-pointer my-6 select-none group"
        >
          {/* Animated Glow on hover */}
          <div className="absolute -inset-4 bg-pink-300/40 rounded-full blur-xl group-hover:bg-pink-400/60 transition-colors" />

          {/* SVG Gift Box */}
          <div className={`relative transition-transform duration-300 ${!isOpen ? 'animate-gift-bounce' : ''}`}>
            <svg viewBox="0 0 200 200" className="w-52 h-52 sm:w-60 sm:h-60 drop-shadow-xl">
              <defs>
                <linearGradient id="boxGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FFAEC9" />
                  <stop offset="50%" stopColor="#F45B91" />
                  <stop offset="100%" stopColor="#D92E70" />
                </linearGradient>
                <linearGradient id="lidGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FFC2D6" />
                  <stop offset="100%" stopColor="#F45B91" />
                </linearGradient>
                <linearGradient id="ribbonGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FFF2D6" />
                  <stop offset="50%" stopColor="#D8AF62" />
                  <stop offset="100%" stopColor="#B38636" />
                </linearGradient>
              </defs>

              {/* Box Base */}
              <rect x="40" y="90" width="120" height="90" rx="8" fill="url(#boxGrad)" />
              {/* Box Shadow & Crease */}
              <rect x="40" y="90" width="120" height="10" fill="rgba(0,0,0,0.08)" />

              {/* Vertical Ribbon on Box */}
              <rect x="90" y="90" width="20" height="90" fill="url(#ribbonGrad)" />

              {/* Gift Box Lid (Opens on click) */}
              <g 
                className="transition-all duration-700 ease-out origin-top-left"
                style={{
                  transform: isOpen ? 'translate(-20px, -45px) rotate(-22deg)' : 'translate(0, 0) rotate(0)',
                }}
              >
                {/* Lid Rim */}
                <rect x="32" y="72" width="136" height="24" rx="6" fill="url(#lidGrad)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.15))" />
                {/* Lid Ribbon */}
                <rect x="90" y="72" width="20" height="24" fill="url(#ribbonGrad)" />

                {/* Satin Bow on Top */}
                {/* Left loop */}
                <path d="M96 72 C70 45, 60 55, 96 70" fill="url(#ribbonGrad)" stroke="#B38636" strokeWidth="1" />
                {/* Right loop */}
                <path d="M104 72 C130 45, 140 55, 104 70" fill="url(#ribbonGrad)" stroke="#B38636" strokeWidth="1" />
                {/* Center knot */}
                <circle cx="100" cy="70" r="7" fill="url(#ribbonGrad)" stroke="#B38636" strokeWidth="1" />
                {/* Floating ribbons */}
                <path d="M95 72 Q80 82 72 95" stroke="url(#ribbonGrad)" strokeWidth="4" fill="none" strokeLinecap="round" />
                <path d="M105 72 Q120 82 128 95" stroke="url(#ribbonGrad)" strokeWidth="4" fill="none" strokeLinecap="round" />
              </g>

              {/* Confetti & Hearts shooting out if open */}
              {isOpen && (
                <g className="animate-pulse">
                  <circle cx="65" cy="55" r="4" fill="#D8AF62" />
                  <circle cx="135" cy="50" r="5" fill="#F45B91" />
                  <polygon points="100,25 104,35 115,35 106,42 109,52 100,45 91,52 94,42 85,35 96,35" fill="#FFE600" />
                </g>
              )}
            </svg>

            {!isOpen && (
              <p className="font-sacramento text-2xl text-pink-700 font-semibold mt-2 animate-pulse">
                {giftBox.tapHint}
              </p>
            )}
          </div>
        </div>

        {/* Revealed Hidden Romantic Message */}
        {isOpen && (
          <div className="w-full mt-4 transition-all duration-700 animate-fadeIn">
            <div className="bg-white/95 rounded-2xl p-6 shadow-xl border-2 border-amber-300 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-white p-1 rounded-full shadow">
                <Sparkles className="w-4 h-4" />
              </div>

              <p className="font-dancing text-2xl sm:text-3xl text-pink-900 font-bold leading-relaxed">
                "{giftBox.message}"
              </p>

              <div className="flex justify-center mt-3 text-pink-500">
                <Heart className="w-6 h-6 fill-pink-500 animate-heart-pulse" />
              </div>
            </div>

            <button
              onClick={onNext}
              className="mt-8 px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-600 to-rose-600 text-white font-semibold text-base shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 mx-auto"
            >
              <span>{giftBox.continueText}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
