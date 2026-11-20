import React, { useState } from 'react';
import { surpriseConfig } from '../config/surpriseConfig';
import { triggerHeartConfetti } from '../utils/confetti';
import { sounds } from '../utils/soundEffects';
import { Check, Sparkles, ChevronDown } from 'lucide-react';

interface PromisesSectionProps {
  onNext: () => void;
}

export const PromisesSection: React.FC<PromisesSectionProps> = ({ onNext }) => {
  const { promises, names } = surpriseConfig;
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    new Array(promises.items.length).fill(true)
  );
  const [isSealed, setIsSealed] = useState(false);

  const toggleCheck = (idx: number) => {
    if (isSealed) return;
    const next = [...checkedItems];
    next[idx] = !next[idx];
    setCheckedItems(next);
    sounds.playChime();
  };

  const handleSeal = () => {
    if (!isSealed) {
      setIsSealed(true);
      sounds.playSuccess();
      triggerHeartConfetti();
    }
  };

  return (
    <section className="relative min-h-screen w-full px-4 py-20 bg-gradient-to-b from-[#FFF4EF] via-[#FFEBE7] to-[#FFF0D7] text-center overflow-hidden select-none">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="w-full h-full bg-[radial-gradient(#F45B91_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="max-w-md w-full mx-auto z-10 flex flex-col items-center">
        {/* Room Header (matching video frame 34!) */}
        <span className="text-xs uppercase tracking-widest text-pink-600 font-semibold mb-1">
          {promises.roomBadge}
        </span>
        <h2 className="font-great-vibes text-4xl sm:text-5xl text-[#761B3B] font-normal mb-1 drop-shadow-sm">
          {promises.title}
        </h2>
        <p className="font-dancing text-lg text-pink-800/80 mb-8">
          {promises.subtitle}
        </p>

        {/* Vintage Parchment Promises Card */}
        <div className="relative w-full bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-amber-200/80 text-left">
          {/* Card Title */}
          <div className="text-center pb-4 mb-4 border-b border-amber-200/60">
            <h3 className="font-dancing text-3xl font-bold text-[#761B3B]">
              {promises.cardHeading}
            </h3>
            <p className="text-[11px] font-mono tracking-widest uppercase text-neutral-500 mt-0.5">
              Between {names.boyfriend} and {names.girlfriend}
            </p>
          </div>

          {/* Checklist items */}
          <div className="space-y-3.5">
            {promises.items.map((item, idx) => (
              <div
                key={idx}
                onClick={() => toggleCheck(idx)}
                className="flex items-center gap-3 cursor-pointer group p-1.5 rounded-lg hover:bg-pink-50/60 transition-colors"
              >
                {/* Custom Pink Checkbox */}
                <div
                  className={`w-6 h-6 rounded-md flex items-center justify-center transition-all ${
                    checkedItems[idx]
                      ? 'bg-gradient-to-tr from-[#F45B91] to-[#D92E70] text-white shadow-sm'
                      : 'border-2 border-pink-300 bg-white'
                  }`}
                >
                  {checkedItems[idx] && <Check className="w-4 h-4 stroke-[3]" />}
                </div>

                {/* Promise text */}
                <span className="font-poppins text-xs sm:text-sm font-medium text-neutral-800 group-hover:text-pink-900 leading-snug">
                  {idx + 1}. {item}
                </span>
              </div>
            ))}
          </div>

          {/* SEALED WITH LOVE Stamp Overlay (matching video frame 35!) */}
          {isSealed && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 animate-stamp">
              <div className="border-4 border-dashed border-[#D92E70] bg-[#FFF0F4]/90 px-6 py-2.5 rounded-xl shadow-2xl transform -rotate-12 flex flex-col items-center">
                <span className="font-black text-xl sm:text-2xl tracking-widest text-[#D92E70] uppercase">
                  {promises.stampText}
                </span>
                <span className="text-[10px] tracking-wider font-mono text-pink-700">
                  OFFICIALLY RECORDED IN ETERNITY
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Seal Button (matching video frame 34/35) */}
        {!isSealed ? (
          <button
            onClick={handleSeal}
            className="mt-8 px-9 py-3.5 rounded-full bg-gradient-to-r from-[#F45B91] to-[#D92E70] text-white font-semibold text-base shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <span>Make it official</span>
            <Sparkles className="w-4 h-4" />
          </button>
        ) : (
          <div className="mt-8 flex flex-col items-center animate-fadeIn">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pink-100 text-pink-700 text-xs font-semibold mb-4">
              <span>Sealed & Saved ❤️</span>
            </div>

            <button
              onClick={onNext}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#761B3B] to-[#29132B] text-white font-bold text-base shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <span>Enter The Final Room</span>
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
