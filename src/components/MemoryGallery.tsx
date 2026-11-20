import React, { useState } from 'react';
import { surpriseConfig } from '../config/surpriseConfig';
import { PhotoLightbox } from './PhotoLightbox';
import { Sparkles, Heart, ChevronDown } from 'lucide-react';

interface MemoryGalleryProps {
  onNext: () => void;
}

export const MemoryGallery: React.FC<MemoryGalleryProps> = ({ onNext }) => {
  const { gallery } = surpriseConfig;
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const handleOpenPhoto = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const handleClose = () => {
    setSelectedPhotoIndex(null);
  };

  const handlePrev = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex(
      (selectedPhotoIndex - 1 + gallery.photos.length) % gallery.photos.length
    );
  };

  const handleNext = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex(
      (selectedPhotoIndex + 1) % gallery.photos.length
    );
  };

  return (
    <section className="relative min-h-screen w-full px-4 py-20 bg-gradient-to-b from-[#FFF0D7] via-[#FFF4EF] to-[#FFEBE7] overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="w-full h-full bg-[radial-gradient(#D92E70_1px,transparent_1px)] [background-size:28px_28px]" />
      </div>

      <div className="max-w-5xl mx-auto z-10 flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Cherished Moments</span>
          </div>
          <h2 className="font-great-vibes text-5xl sm:text-6xl text-[#761B3B] font-normal mb-2 drop-shadow-sm">
            {gallery.heading}
          </h2>
          <p className="font-dancing text-xl sm:text-2xl text-pink-900/80 max-w-md mx-auto">
            {gallery.subtitle}
          </p>
        </div>

        {/* Gallery Grid (Scrapbook Collage on Desktop, Vertical Polaroid Stream on Mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 w-full">
          {gallery.photos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => handleOpenPhoto(index)}
              className="group relative cursor-pointer flex flex-col items-center transition-all duration-300 hover:scale-105 hover:z-20 active:scale-98"
              style={{
                transform: `rotate(${photo.rotation}deg)`,
              }}
            >
              {/* Tape sticker on top */}
              <div 
                className="absolute -top-3 z-10 w-16 h-5 bg-amber-100/70 border border-amber-200/50 backdrop-blur-xs shadow-sm transform -rotate-3 group-hover:rotate-0 transition-transform"
              />

              {/* Polaroid Card Frame */}
              <div className="w-full max-w-[280px] sm:max-w-none bg-white rounded-md p-3 pb-6 shadow-md hover:shadow-xl border border-neutral-200/80 transition-shadow">
                {/* Photo Container preserving natural aspect ratio */}
                <div className="w-full overflow-hidden rounded bg-neutral-100 flex items-center justify-center">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    className="w-full h-64 sm:h-56 object-cover object-center group-hover:scale-103 transition-transform duration-300"
                  />
                </div>

                {/* Handwritten Caption */}
                <div className="mt-3 px-1 text-center min-h-[48px] flex items-center justify-center">
                  <p className="font-caveat text-lg sm:text-xl text-neutral-800 font-semibold leading-tight line-clamp-2">
                    {photo.caption}
                  </p>
                </div>

                {/* Small heart stamp in corner */}
                <div className="flex justify-end pr-1 text-pink-400 opacity-60 group-hover:opacity-100 transition-opacity">
                  <Heart className="w-3.5 h-3.5 fill-pink-400" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA to proceed to Mini-Games */}
        <div className="mt-16 text-center">
          <button
            onClick={onNext}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D92E70] to-[#761B3B] text-white font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3 mx-auto"
          >
            <span>Enter The Museum of Us (Mini-Games)</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      <PhotoLightbox
        photo={selectedPhotoIndex !== null ? gallery.photos[selectedPhotoIndex] : null}
        onClose={handleClose}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </section>
  );
};
