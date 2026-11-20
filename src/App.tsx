import React, { useState, useRef } from 'react';
import { FixedHeader } from './components/FixedHeader';
import { RomanticIntro } from './components/RomanticIntro';
import { LoveYouSection } from './components/LoveYouSection';
import { LoveTree } from './components/LoveTree';
import { GiftReveal } from './components/GiftReveal';
import { RoseTransition } from './components/RoseTransition';
import { FromMeToYou } from './components/FromMeToYou';
import { MemoryGallery } from './components/MemoryGallery';
import { MiniGamesSection } from './components/MiniGamesSection';
import { LoveLetter } from './components/LoveLetter';
import { PromisesSection } from './components/PromisesSection';
import { FinalRoom } from './components/FinalRoom';
import { MusicPlayer } from './components/MusicPlayer';

export const App: React.FC = () => {
  const [isVoicePlaying, setIsVoicePlaying] = useState(false);

  // Section Refs for smooth animated scrolling
  const introRef = useRef<HTMLDivElement | null>(null);
  const loveYouRef = useRef<HTMLDivElement | null>(null);
  const treeRef = useRef<HTMLDivElement | null>(null);
  const giftRef = useRef<HTMLDivElement | null>(null);
  const roseRef = useRef<HTMLDivElement | null>(null);
  const fromMeRef = useRef<HTMLDivElement | null>(null);
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const gamesRef = useRef<HTMLDivElement | null>(null);
  const letterRef = useRef<HTMLDivElement | null>(null);
  const promisesRef = useRef<HTMLDivElement | null>(null);
  const finalRoomRef = useRef<HTMLDivElement | null>(null);

  const scrollToRef = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen w-full bg-[#FFF4EF] text-[#29132B] flex flex-col relative overflow-x-hidden">
      {/* 1. FIXED HEADER / BRANDING (Inspired by Reference Video) */}
      <FixedHeader />

      {/* 2. OPENING EXPERIENCE – THE HEART */}
      <div ref={introRef} id="intro">
        <RomanticIntro onStart={() => scrollToRef(loveYouRef)} />
      </div>

      {/* 3. LOVE YOU SECTION (Vibrant Pink with grid & cursive font) */}
      <div ref={loveYouRef} id="love-you">
        <LoveYouSection onNext={() => scrollToRef(treeRef)} />
      </div>

      {/* 4. OUR LOVE TREE (Animated growing tree with fluttering heart canopy) */}
      <div ref={treeRef} id="love-tree">
        <LoveTree onNext={() => scrollToRef(giftRef)} />
      </div>

      {/* 5. THE GIFT BOX SURPRISE (Bouncing gift box, opens with hearts & message) */}
      <div ref={giftRef} id="gift-box">
        <GiftReveal onNext={() => scrollToRef(roseRef)} />
      </div>

      {/* 6. ROSE TRANSITION (Repeating rose garden pattern with falling petals) */}
      <div ref={roseRef} id="roses">
        <RoseTransition onNext={() => scrollToRef(fromMeRef)} />
      </div>

      {/* 7. FROM ME TO YOU (Couple illustration, dried rose, handwritten warmth) */}
      <div ref={fromMeRef} id="from-me">
        <FromMeToYou onNext={() => scrollToRef(galleryRef)} />
      </div>

      {/* 8. OUR MEMORIES – PHOTO GALLERY (Scrapbook Polaroids of all 8 photos) */}
      <div ref={galleryRef} id="gallery">
        <MemoryGallery onNext={() => scrollToRef(gamesRef)} />
      </div>

      {/* 9. MINI-GAMES SECTION – THE MUSEUM OF US (Crucial Sequential Games) */}
      <div ref={gamesRef} id="mini-games">
        <MiniGamesSection onAllCompleted={() => scrollToRef(letterRef)} />
      </div>

      {/* 10. MY LOVE LETTER & CUSTOM VOICE NOTE (Vintage parchment + Audio player) */}
      <div ref={letterRef} id="love-letter">
        <LoveLetter
          onNext={() => scrollToRef(promisesRef)}
          onAudioPlayChange={setIsVoicePlaying}
        />
      </div>

      {/* 11. ROOM 5 – THE PROMISES (Interactive checkboxes & SEALED WITH LOVE stamp) */}
      <div ref={promisesRef} id="promises">
        <PromisesSection onNext={() => scrollToRef(finalRoomRef)} />
      </div>

      {/* 12. ONE LAST ROOM – THE FINAL CINEMATIC ROOM (Starry room, final quote, replay) */}
      <div ref={finalRoomRef} id="final-room">
        <FinalRoom onReplay={handleReplay} />
      </div>

      {/* 13. FLOATING ROMANTIC MUSIC PLAYER */}
      <MusicPlayer isVoicePlaying={isVoicePlaying} />
    </div>
  );
};

export default App;
