import React, { useState } from 'react';
import { surpriseConfig } from '../config/surpriseConfig';
import { VoiceNotePlayer } from './VoiceNotePlayer';
import { Heart, ChevronDown, Mail } from 'lucide-react';

interface LoveLetterProps {
  onNext: () => void;
  onAudioPlayChange?: (isPlaying: boolean) => void;
}

export const LoveLetter: React.FC<LoveLetterProps> = ({ onNext, onAudioPlayChange }) => {
  const { loveLetter, names } = surpriseConfig;
  const [envelopeOpen, setEnvelopeOpen] = useState(true);

  return (
    <section className="relative min-h-screen w-full px-4 py-20 bg-gradient-to-b from-[#FFEBE7] via-[#FFF0F4] to-[#FFF4EF] text-center overflow-hidden">
      {/* Background paper texture & floating petals */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="w-full h-full bg-[radial-gradient(#F45B91_1px,transparent_1px)] [background-size:26px_26px]" />
      </div>

      <div className="max-w-xl mx-auto z-10 flex flex-col items-center">
        {/* Room 4 badge / title */}
        <span className="text-xs uppercase tracking-widest text-pink-600 font-semibold mb-1">
          ROOM 4 · THE READING ROOM
        </span>
        <h2 className="font-great-vibes text-4xl sm:text-5xl text-[#761B3B] font-normal mb-2 drop-shadow-sm">
          {names.boyfriend} wrote you this.
        </h2>
        <p className="font-dancing text-lg text-pink-800/80 mb-6">
          Straight from the depths of my heart
        </p>

        {/* Envelope toggle if folded */}
        {!envelopeOpen ? (
          <div 
            onClick={() => setEnvelopeOpen(true)}
            className="cursor-pointer my-8 p-8 bg-amber-50 rounded-2xl shadow-xl border-2 border-amber-200 hover:scale-105 transition-all max-w-sm w-full"
          >
            <Mail className="w-16 h-16 text-pink-500 mx-auto animate-bounce" />
            <p className="font-dancing text-2xl font-bold text-pink-900 mt-3">
              Tap to Open Letter 💌
            </p>
          </div>
        ) : (
          /* Opened Letter Card (matching video frame 24!) */
          <div className="w-full bg-white paper-texture rounded-3xl p-6 sm:p-10 shadow-2xl border border-pink-100 text-left relative transition-all duration-700 animate-fadeIn">
            {/* Wax seal watermark in corner */}
            <div className="absolute top-4 right-4 opacity-15 pointer-events-none">
              <Heart className="w-16 h-16 fill-pink-600" />
            </div>

            {/* Salutation */}
            <p className="font-dancing text-3xl sm:text-4xl text-[#761B3B] font-bold mb-5">
              {loveLetter.salutation}
            </p>

            {/* Letter Body Paragraphs */}
            <div className="space-y-4 text-neutral-800 font-poppins text-sm sm:text-base leading-relaxed">
              {loveLetter.paragraphs.map((p, idx) => (
                <p key={idx} className="font-normal">
                  {p}
                </p>
              ))}
            </div>

            {/* Signoff */}
            <div className="mt-8 text-right">
              <p className="font-dancing text-2xl sm:text-3xl text-[#761B3B] font-bold">
                {loveLetter.signoff}
              </p>
            </div>
          </div>
        )}

        {/* Custom Voice Note Player (Integrated directly beneath letter) */}
        <VoiceNotePlayer onAudioPlayChange={onAudioPlayChange} />

        {/* Animated melting face emoji & heart (matching video frame 24!) */}
        <div className="my-4 flex flex-col items-center select-none animate-pulse">
          <span className="text-4xl drop-shadow">🥰</span>
          <div className="flex gap-1 text-pink-500 mt-1">
            <Heart className="w-4 h-4 fill-pink-500" />
            <Heart className="w-5 h-5 fill-pink-500 animate-bounce" />
            <Heart className="w-4 h-4 fill-pink-500" />
          </div>
        </div>

        {/* Button to proceed to Room 5 Promises */}
        <button
          onClick={onNext}
          className="mt-4 px-9 py-3.5 rounded-full bg-gradient-to-r from-[#F45B91] to-[#D92E70] text-white font-semibold text-base shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
        >
          <span>One last room →</span>
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};
