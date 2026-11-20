import React from 'react';
import type { PhotoMemory } from '../config/surpriseConfig';
import { X, ChevronLeft, ChevronRight, Heart } from 'lucide-react';

interface PhotoLightboxProps {
  photo: PhotoMemory | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  photo,
  onClose,
  onPrev,
  onNext,
}) => {
  if (!photo) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md transition-opacity duration-300 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative max-w-lg w-full bg-white rounded-2xl p-4 sm:p-5 shadow-2xl flex flex-col items-center select-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-pink-600 text-white flex items-center justify-center shadow-lg hover:bg-pink-700 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Polaroid frame */}
        <div className="w-full bg-[#fdfdfd] border border-neutral-100 rounded-lg p-2 pb-4 shadow-inner flex flex-col items-center">
          <div className="relative w-full max-h-[65vh] flex items-center justify-center overflow-hidden rounded bg-neutral-900">
            <img
              src={photo.src}
              alt={photo.alt}
              className="max-h-[60vh] max-w-full w-auto object-contain transition-transform duration-300"
            />
          </div>

          {/* Caption */}
          <div className="w-full text-center mt-4 px-2">
            <p className="font-caveat text-2xl sm:text-3xl text-neutral-800 font-bold leading-tight">
              {photo.caption}
            </p>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between w-full mt-4 px-2">
          <button
            onClick={onPrev}
            className="flex items-center gap-1 px-4 py-2 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-800 text-xs font-semibold transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <Heart className="w-5 h-5 text-pink-500 fill-pink-500 animate-pulse" />

          <button
            onClick={onNext}
            className="flex items-center gap-1 px-4 py-2 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-800 text-xs font-semibold transition-colors"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
