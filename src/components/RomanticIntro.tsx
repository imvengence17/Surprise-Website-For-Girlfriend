import React, { useState } from 'react';
import { surpriseConfig } from '../config/surpriseConfig';
import { triggerHeartConfetti } from '../utils/confetti';
import { Heart, Sparkles } from 'lucide-react';

interface RomanticIntroProps {
  onStart: () => void;
}

export const RomanticIntro: React.FC<RomanticIntroProps> = ({ onStart }) => {
  const { opening } = surpriseConfig;
  const [arrowState, setArrowState] = useState<'ready' | 'pulled' | 'released' | 'struck'>('ready');
  const [heartHit, setHeartHit] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const handleShoot = () => {
    if (arrowState !== 'ready') return;
    setArrowState('pulled');

    setTimeout(() => {
      setArrowState('released');
      setTimeout(() => {
        setArrowState('struck');
        setHeartHit(true);
        triggerHeartConfetti();
        setTimeout(() => {
          setRevealed(true);
        }, 600);
      }, 450);
    }, 250);
  };

  const handleOpenSurprise = () => {
    triggerHeartConfetti();
    onStart();
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 pt-20 pb-12 overflow-hidden bg-gradient-to-b from-[#FFF4EF] via-[#FFEBF1] to-[#FFF0D7]">
      {/* Ambient floating hearts and sparkles in background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(16)].map((_, i) => (
          <div
            key={i}
            className="absolute text-pink-300/40 animate-float-slow select-none"
            style={{
              top: `${(i * 19) % 95}%`,
              left: `${(i * 23 + 7) % 90}%`,
              animationDelay: `${(i * 0.4) % 4}s`,
              transform: `scale(${0.6 + (i % 5) * 0.2})`,
            }}
          >
            {i % 2 === 0 ? '❤️' : '✨'}
          </div>
        ))}
      </div>

      {/* Top subtle text */}
      <div className="text-center mb-6 z-10">
        <p className="font-poppins text-xs uppercase tracking-widest text-pink-500 font-semibold mb-2">
          A Personalized Love Experience
        </p>
        <h2 className="font-sacramento text-2xl sm:text-3xl text-pink-900/80 italic font-semibold">
          someone made this, just for you
        </h2>
      </div>

      {/* Heart Center Container */}
      <div className="relative my-8 z-10 flex flex-col items-center justify-center">
        {/* Glow halo */}
        <div 
          className={`absolute w-48 h-48 sm:w-64 sm:h-64 rounded-full transition-all duration-700 blur-2xl ${
            heartHit 
              ? 'bg-gradient-to-r from-pink-500 via-rose-400 to-amber-300 opacity-90 scale-125' 
              : 'bg-pink-300/60 opacity-60'
          }`} 
        />

        {/* 3D Heart Graphic */}
        <div 
          onClick={handleShoot}
          className={`relative cursor-pointer transition-transform duration-300 select-none ${
            heartHit ? 'scale-115' : 'hover:scale-105 active:scale-95'
          } ${heartHit ? '' : 'animate-heart-pulse'}`}
        >
          <svg 
            viewBox="0 0 100 100" 
            className="w-36 h-36 sm:w-44 sm:h-44 drop-shadow-[0_15px_25px_rgba(244,91,145,0.45)]"
          >
            <defs>
              <linearGradient id="heartGrad" x1="20%" y1="0%" x2="80%" y2="100%">
                <stop offset="0%" stopColor="#FFA6C9" />
                <stop offset="35%" stopColor="#F45B91" />
                <stop offset="85%" stopColor="#D92E70" />
                <stop offset="100%" stopColor="#761B3B" />
              </linearGradient>
              <radialGradient id="heartHighlight" cx="30%" cy="25%" r="40%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
                <stop offset="50%" stopColor="#FFA6C9" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#F45B91" stopOpacity="0" />
              </radialGradient>
            </defs>
            <path
              d="M50 88 C25 68, 5 50, 5 32 C5 15, 20 8, 35 12 C42 14, 47 20, 50 25 C53 20, 58 14, 65 12 C80 8, 95 15, 95 32 C95 50, 75 68, 50 88 Z"
              fill="url(#heartGrad)"
            />
            <path
              d="M50 88 C25 68, 5 50, 5 32 C5 15, 20 8, 35 12 C42 14, 47 20, 50 25 C53 20, 58 14, 65 12 C80 8, 95 15, 95 32 C95 50, 75 68, 50 88 Z"
              fill="url(#heartHighlight)"
            />

            {/* If struck by Cupid's arrow */}
            {heartHit && (
              <g className="animate-pulse">
                {/* Arrow embedded in heart */}
                <line x1="20" y1="75" x2="80" y2="25" stroke="#D8AF62" strokeWidth="3.5" strokeLinecap="round" />
                {/* Arrowhead */}
                <polygon points="80,25 70,24 75,34" fill="#D8AF62" />
                {/* Arrow feathers */}
                <line x1="16" y1="78" x2="22" y2="72" stroke="#FFF" strokeWidth="2.5" />
                <line x1="22" y1="84" x2="28" y2="78" stroke="#FFF" strokeWidth="2.5" />
              </g>
            )}
          </svg>

          {/* Sparkle badge */}
          <div className="absolute -top-2 -right-2 bg-white/90 p-1.5 rounded-full shadow-md text-amber-500">
            <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '4s' }} />
          </div>
        </div>

        {/* Flying Arrow Animation */}
        {arrowState === 'released' && (
          <div 
            className="absolute transition-all duration-400 ease-out z-20 pointer-events-none"
            style={{
              bottom: '15%',
              left: '30%',
              transform: 'translate(45px, -110px) rotate(-45deg)',
            }}
          >
            <div className="w-16 h-1 bg-amber-400 shadow-[0_0_8px_#D8AF62] relative">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-y-4 border-y-transparent border-l-8 border-l-amber-500" />
            </div>
          </div>
        )}
      </div>

      {/* Interactive Cupid Bow / Trigger section */}
      {!revealed && (
        <div className="flex flex-col items-center gap-3 z-10 mt-2">
          <button
            onClick={handleShoot}
            disabled={arrowState !== 'ready'}
            className="group relative px-6 py-3 rounded-full bg-white/80 hover:bg-white text-pink-700 font-medium text-sm shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 border border-pink-200"
          >
            <span className="text-lg">🏹</span>
            <span className="tracking-widest uppercase text-xs font-bold text-pink-800">
              {opening.hintText}
            </span>
            <span className="text-xs text-pink-400 font-sans group-hover:translate-x-1 transition-transform">
              (or tap heart)
            </span>
          </button>
        </div>
      )}

      {/* Reveal Message & Next Button */}
      {revealed && (
        <div className="flex flex-col items-center text-center max-w-sm mx-auto z-10 transition-all duration-700 animate-fadeIn">
          <p className="font-dancing text-2xl sm:text-3xl text-pink-900 font-bold mb-4 drop-shadow-sm px-4">
            "{opening.promptMessage}"
          </p>

          <button
            onClick={handleOpenSurprise}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#F45B91] to-[#D92E70] text-white font-semibold text-base sm:text-lg shadow-[0_8px_20px_rgba(244,91,145,0.4)] hover:shadow-[0_12px_28px_rgba(217,46,112,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3 group"
          >
            <span>{opening.buttonText}</span>
            <Heart className="w-5 h-5 fill-white group-hover:scale-125 transition-transform" />
          </button>
        </div>
      )}
    </section>
  );
};
