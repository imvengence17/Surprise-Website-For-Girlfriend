import React from 'react';
import { surpriseConfig } from '../config/surpriseConfig';
import { ChevronDown, Heart } from 'lucide-react';

interface LoveYouSectionProps {
  onNext: () => void;
}

export const LoveYouSection: React.FC<LoveYouSectionProps> = ({ onNext }) => {
  const { loveYouSection } = surpriseConfig;

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 py-20 romantic-grid-bg text-white overflow-hidden">
      {/* Ambient pink aura and floating hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(14)].map((_, i) => (
          <div
            key={i}
            className="absolute text-white/30 animate-float-slow select-none"
            style={{
              top: `${(i * 17) % 92}%`,
              left: `${(i * 29 + 5) % 90}%`,
              animationDelay: `${(i * 0.5) % 5}s`,
              transform: `scale(${0.7 + (i % 4) * 0.25})`,
            }}
          >
            <Heart className="w-6 h-6 fill-white/20" />
          </div>
        ))}
      </div>

      <div className="max-w-xl mx-auto text-center z-10 flex flex-col items-center">
        {/* Subdued intro note */}
        <p className="font-poppins text-xs sm:text-sm uppercase tracking-widest text-pink-200/90 font-medium mb-3">
          {loveYouSection.preTitle}
        </p>

        {/* Main large cursive title */}
        <h2 className="font-great-vibes text-6xl sm:text-8xl md:text-9xl text-white font-normal drop-shadow-[0_10px_20px_rgba(118,27,59,0.5)] my-2">
          {loveYouSection.mainTitle}
        </h2>

        {/* Romantic description */}
        <p className="font-dancing text-xl sm:text-2xl text-pink-100 font-normal mt-4 max-w-md drop-shadow">
          "{loveYouSection.subtitle}"
        </p>

        {/* Decorative divider */}
        <div className="flex items-center gap-3 my-8 opacity-75">
          <div className="w-12 h-0.5 bg-white/40" />
          <Heart className="w-4 h-4 fill-white" />
          <div className="w-12 h-0.5 bg-white/40" />
        </div>

        {/* Next section scroll indicator button */}
        <button
          onClick={onNext}
          className="mt-6 px-6 py-3 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm border border-white/30 text-sm font-medium transition-all duration-300 flex items-center gap-2 group active:scale-95"
        >
          <span>Continue to Our Tree</span>
          <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};
