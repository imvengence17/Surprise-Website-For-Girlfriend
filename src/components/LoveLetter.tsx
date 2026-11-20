import React, { useState } from 'react';
import { surpriseConfig } from '../config/surpriseConfig';
import { VoiceNotePlayer } from './VoiceNotePlayer';
import { Heart, ChevronDown, Mail, ZoomIn, X } from 'lucide-react';

interface LoveLetterProps {
  onNext: () => void;
  onAudioPlayChange?: (isPlaying: boolean) => void;
}

export const LoveLetter: React.FC<LoveLetterProps> = ({ onNext, onAudioPlayChange }) => {
  const { loveLetter, names } = surpriseConfig;
  const [envelopeOpen, setEnvelopeOpen] = useState(true);
  const [isZoomed, setIsZoomed] = useState(false);

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
          /* Real Love Letter Image Card */
          <div className="w-full flex flex-col items-center transition-all duration-700 animate-fadeIn">
            {/* The Letter Image Container */}
            <div 
              onClick={() => setIsZoomed(true)}
              className="relative cursor-pointer group w-full max-w-md bg-white p-3 sm:p-4 rounded-3xl shadow-2xl border-2 border-pink-200/80 hover:shadow-[0_20px_45px_rgba(244,91,145,0.3)] transition-all duration-300 active:scale-99"
            >
              {/* Corner Tape Effect */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-amber-100/70 border border-amber-200/60 rounded backdrop-blur-xs shadow-sm transform -rotate-2" />

              {/* The Actual Letter Photograph */}
              <div className="relative overflow-hidden rounded-2xl bg-pink-50 flex items-center justify-center">
                <img
                  src={loveLetter.letterImage}
                  alt="Love letter for Gelhii"
                  className="w-full h-auto object-contain rounded-2xl shadow-inner group-hover:scale-[1.01] transition-transform duration-300"
                />

                {/* Subtle Tap to Zoom Badge */}
                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 shadow opacity-80 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-3.5 h-3.5 text-pink-300" />
                  <span>Tap to expand</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Fullscreen Zoom Modal for Letter */}
        {isZoomed && (
          <div 
            onClick={() => setIsZoomed(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md animate-fadeIn select-none"
          >
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-pink-600 text-white flex items-center justify-center shadow-lg hover:bg-pink-700 z-50"
            >
              <X className="w-6 h-6" />
            </button>

            <div 
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl max-h-[92vh] overflow-y-auto rounded-2xl p-2 bg-transparent"
            >
              <img
                src={loveLetter.letterImage}
                alt="Love letter full view"
                className="w-full h-auto max-h-[90vh] object-contain rounded-xl shadow-2xl"
              />
            </div>
          </div>
        )}

        {/* Custom Voice Note Player (Integrated directly beneath letter) */}
        <VoiceNotePlayer onAudioPlayChange={onAudioPlayChange} />

        {/* Animated melting face emoji & heart */}
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
