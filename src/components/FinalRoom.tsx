import React from 'react';
import { surpriseConfig } from '../config/surpriseConfig';
import { triggerHeartConfetti } from '../utils/confetti';
import { RotateCcw, Sparkles } from 'lucide-react';

interface FinalRoomProps {
  onReplay: () => void;
}

export const FinalRoom: React.FC<FinalRoomProps> = ({ onReplay }) => {
  const { finalRoom } = surpriseConfig;

  const handleReplayClick = () => {
    triggerHeartConfetti();
    onReplay();
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-20 bg-gradient-to-b from-[#130717] via-[#210D23] to-[#0A030C] text-white text-center overflow-hidden select-none">
      {/* Starry Night Sky Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              top: `${(i * 17 + 5) % 96}%`,
              left: `${(i * 23 + 11) % 94}%`,
              width: `${(i % 3) + 1.5}px`,
              height: `${(i % 3) + 1.5}px`,
              opacity: 0.3 + (i % 5) * 0.15,
              animationDuration: `${2 + (i % 4)}s`,
              animationDelay: `${(i * 0.2) % 3}s`,
            }}
          />
        ))}
      </div>

      {/* Floating glowing golden hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute text-pink-400/30 animate-float-slow text-sm sm:text-base"
            style={{
              top: `${(i * 18) % 90}%`,
              left: `${(i * 29 + 15) % 88}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          >
            ✨
          </div>
        ))}
      </div>

      <div className="max-w-xl mx-auto z-10 flex flex-col items-center">
        {/* Subtle badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-pink-950/80 border border-pink-700/60 text-pink-300 text-xs font-semibold uppercase tracking-widest mb-6">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Our Infinity</span>
        </div>

        {/* Large 3D Glowing Heart */}
        <div className="relative my-6 select-none animate-heart-pulse">
          {/* Ambient Glow */}
          <div className="absolute -inset-6 bg-pink-600/30 rounded-full blur-3xl" />

          <svg viewBox="0 0 100 100" className="w-32 h-32 sm:w-40 sm:h-40 drop-shadow-[0_0_35px_rgba(244,91,145,0.7)]">
            <defs>
              <linearGradient id="finalHeartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFAEC9" />
                <stop offset="40%" stopColor="#F45B91" />
                <stop offset="85%" stopColor="#D92E70" />
                <stop offset="100%" stopColor="#761B3B" />
              </linearGradient>
            </defs>
            <path
              d="M50 88 C25 68, 5 50, 5 32 C5 15, 20 8, 35 12 C42 14, 47 20, 50 25 C53 20, 58 14, 65 12 C80 8, 95 15, 95 32 C95 50, 75 68, 50 88 Z"
              fill="url(#finalHeartGrad)"
            />
          </svg>
        </div>

        {/* Cinematic Final Message */}
        <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl text-amber-100 font-normal leading-relaxed max-w-lg mb-6 italic drop-shadow-md">
          "{finalRoom.finalQuote}"
        </h2>

        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-pink-400 to-transparent my-4" />

        <p className="font-great-vibes text-4xl sm:text-5xl md:text-6xl text-pink-300 font-normal drop-shadow-[0_4px_12px_rgba(244,91,145,0.6)]">
          {finalRoom.finalSignature}
        </p>

        {/* Replay Experience Button */}
        <button
          onClick={handleReplayClick}
          className="mt-12 px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-pink-400/40 text-pink-200 text-sm font-semibold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 hover:scale-105 active:scale-95 shadow-lg"
        >
          <RotateCcw className="w-4 h-4" />
          <span>{finalRoom.replayText}</span>
        </button>
      </div>
    </section>
  );
};
