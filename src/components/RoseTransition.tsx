import React from 'react';
import { ChevronDown } from 'lucide-react';

interface RoseTransitionProps {
  onNext: () => void;
}

export const RoseTransition: React.FC<RoseTransitionProps> = ({ onNext }) => {
  // Repeating rose cluster layout positions
  const roses = [
    { x: '10%', y: '8%', type: 'pink', rot: -15, scale: 0.9 },
    { x: '35%', y: '5%', type: 'peach', rot: 10, scale: 1.1 },
    { x: '65%', y: '12%', type: 'white', rot: -8, scale: 1 },
    { x: '88%', y: '6%', type: 'pink', rot: 25, scale: 0.95 },
    { x: '22%', y: '22%', type: 'white', rot: 15, scale: 0.85 },
    { x: '50%', y: '26%', type: 'pink', rot: -20, scale: 1.2 },
    { x: '78%', y: '25%', type: 'peach', rot: 5, scale: 1 },
    { x: '8%', y: '40%', type: 'peach', rot: -10, scale: 1.05 },
    { x: '38%', y: '42%', type: 'pink', rot: 18, scale: 0.9 },
    { x: '68%', y: '45%', type: 'white', rot: -12, scale: 1.1 },
    { x: '92%', y: '38%', type: 'pink', rot: 8, scale: 0.85 },
    { x: '18%', y: '58%', type: 'pink', rot: -5, scale: 1.15 },
    { x: '45%', y: '62%', type: 'peach', rot: 22, scale: 0.95 },
    { x: '82%', y: '60%', type: 'white', rot: -15, scale: 1.05 },
    { x: '10%', y: '75%', type: 'white', rot: 12, scale: 0.9 },
    { x: '35%', y: '82%', type: 'pink', rot: -18, scale: 1.1 },
    { x: '62%', y: '78%', type: 'peach', rot: 10, scale: 1 },
    { x: '88%', y: '80%', type: 'pink', rot: -8, scale: 1.05 },
    { x: '25%', y: '92%', type: 'peach', rot: 15, scale: 0.95 },
    { x: '75%', y: '94%', type: 'white', rot: -10, scale: 0.9 },
  ];

  const getRoseColor = (type: string) => {
    switch (type) {
      case 'pink':
        return {
          c1: '#F45B91',
          c2: '#FFB8D2',
          c3: '#D92E70',
        };
      case 'peach':
        return {
          c1: '#E89071',
          c2: '#FFD1BE',
          c3: '#C86E50',
        };
      case 'white':
      default:
        return {
          c1: '#F2E8DC',
          c2: '#FFFFFF',
          c3: '#DFD2C2',
        };
    }
  };

  return (
    <section className="relative min-h-[70vh] sm:min-h-screen w-full flex flex-col items-center justify-center px-4 py-16 bg-[#FFF2E2] overflow-hidden select-none">
      {/* Repeating Roses in organic pattern (matching video frames 07 & 08!) */}
      <div className="absolute inset-0 pointer-events-none">
        {roses.map((r, i) => {
          const colors = getRoseColor(r.type);
          return (
            <div
              key={i}
              className="absolute transition-transform duration-500 hover:scale-125"
              style={{
                top: r.y,
                left: r.x,
                transform: `rotate(${r.rot}deg) scale(${r.scale})`,
              }}
            >
              <svg viewBox="0 0 80 80" className="w-14 h-14 sm:w-18 sm:h-18 drop-shadow-sm">
                {/* Leaves */}
                <path d="M40 70 C30 75 15 65 25 55 C35 58 40 70 40 70 Z" fill="#88A07A" opacity="0.8" />
                <path d="M40 70 C50 75 65 65 55 55 C45 58 40 70 40 70 Z" fill="#759368" opacity="0.8" />
                
                {/* Petals layer 1 */}
                <circle cx="40" cy="40" r="28" fill={colors.c2} />
                <path d="M40 12 C58 12 68 28 68 40 C68 58 50 68 40 68 C22 68 12 50 12 40 C12 25 25 12 40 12 Z" fill={colors.c1} opacity="0.9" />
                
                {/* Petals swirl layer 2 */}
                <path d="M22 35 C20 48 32 58 45 58 C58 58 62 45 60 35 C58 24 45 22 36 26 C28 30 24 38 28 48 C32 54 44 54 48 48 C52 42 48 34 42 34 C36 34 35 40 39 42" 
                      fill="none" 
                      stroke={colors.c3} 
                      strokeWidth="3.5" 
                      strokeLinecap="round" />
                
                {/* Highlight */}
                <circle cx="36" cy="36" r="4" fill="#FFFFFF" opacity="0.6" />
              </svg>
            </div>
          );
        })}
      </div>

      {/* Floating Petals Drift */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute text-pink-400/60 animate-float-slow text-lg sm:text-xl"
            style={{
              top: `${(i * 16) % 95}%`,
              left: `${(i * 27 + 10) % 92}%`,
              animationDelay: `${i * 0.4}s`,
            }}
          >
            🌸
          </div>
        ))}
      </div>

      {/* Center Romantic Text Card */}
      <div className="relative z-10 bg-white/85 backdrop-blur-md px-8 py-6 rounded-3xl shadow-xl border border-pink-200 text-center max-w-sm mx-auto">
        <p className="font-dancing text-2xl sm:text-3xl text-pink-900 font-bold">
          "Like a million roses in full bloom..."
        </p>
        <p className="font-poppins text-xs uppercase tracking-widest text-pink-600 font-semibold mt-2">
          Every petal whispers your name
        </p>

        <button
          onClick={onNext}
          className="mt-5 px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 text-white text-sm font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2 mx-auto"
        >
          <span>Continue →</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
