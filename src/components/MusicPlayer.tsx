import React, { useState, useRef, useEffect } from 'react';
import { surpriseConfig } from '../config/surpriseConfig';
import { Volume2, VolumeX, Play, Pause, ChevronUp, ChevronDown } from 'lucide-react';

interface MusicPlayerProps {
  isVoicePlaying: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ isVoicePlaying }) => {
  const { music } = surpriseConfig;
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [expanded, setExpanded] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Autoplay after first user interaction with the document (browser policy compliance)
  useEffect(() => {
    const startAudioOnInteraction = () => {
      if (!hasInteracted && audioRef.current) {
        setHasInteracted(true);
        audioRef.current.volume = volume;
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          // User gesture might still be required
        });
      }
    };

    window.addEventListener('click', startAudioOnInteraction, { once: true });
    window.addEventListener('touchstart', startAudioOnInteraction, { once: true });

    return () => {
      window.removeEventListener('click', startAudioOnInteraction);
      window.removeEventListener('touchstart', startAudioOnInteraction);
    };
  }, [hasInteracted, volume]);

  // Duck or pause background music when voice note is playing!
  useEffect(() => {
    if (!audioRef.current) return;
    if (isVoicePlaying) {
      // Duck volume smoothly
      audioRef.current.volume = 0.05;
    } else {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [isVoicePlaying, volume, isMuted]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.volume = isMuted ? 0 : volume;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => console.log('Music play prevented:', e));
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.volume = volume;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
      if (val === 0) setIsMuted(true);
      else setIsMuted(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 select-none">
      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={music.defaultBgMusic}
        loop
        preload="auto"
      />

      {/* Music Widget Card */}
      <div className="bg-[#1B0C1D]/90 backdrop-blur-md rounded-2xl border border-pink-700/50 shadow-2xl p-2.5 text-white transition-all duration-300">
        {/* Compact View Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause music" : "Play music"}
            className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#F45B91] to-[#D92E70] flex items-center justify-center text-white shadow-md hover:scale-105 active:scale-95 transition-all"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-white" />
            ) : (
              <Play className="w-4 h-4 fill-white ml-0.5" />
            )}
          </button>

          {/* Animated music equalizer dots */}
          <div 
            onClick={() => setExpanded(!expanded)}
            className="cursor-pointer flex items-center gap-2 px-1 pr-2"
          >
            <div className="flex items-center gap-0.5 h-4">
              {[...Array(4)].map((_, i) => (
                <span
                  key={i}
                  className={`w-0.5 bg-pink-400 rounded-full transition-all duration-200 ${
                    isPlaying ? 'animate-pulse' : 'h-1.5 opacity-40'
                  }`}
                  style={{
                    height: isPlaying ? `${40 + (i % 3) * 30}%` : '6px',
                    animationDelay: `${i * 0.15}s`,
                  }}
                />
              ))}
            </div>

            <div className="flex flex-col text-left">
              <span className="text-[11px] font-bold text-pink-200 truncate max-w-[100px] sm:max-w-[130px]">
                {music.trackTitle}
              </span>
              <span className="text-[9px] text-pink-400/80 font-mono">
                {isPlaying ? 'Now Playing' : 'Background Music'}
              </span>
            </div>

            {expanded ? (
              <ChevronDown className="w-3.5 h-3.5 text-pink-400 ml-1" />
            ) : (
              <ChevronUp className="w-3.5 h-3.5 text-pink-400 ml-1" />
            )}
          </div>
        </div>

        {/* Expanded Volume Slider Drawer */}
        {expanded && (
          <div className="mt-2.5 pt-2 border-t border-pink-900/60 flex items-center gap-2 px-1 animate-fadeIn">
            <button
              onClick={toggleMute}
              className="text-pink-300 hover:text-white transition-colors"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-24 h-1 bg-pink-950 rounded-lg appearance-none cursor-pointer accent-pink-500"
            />
          </div>
        )}
      </div>
    </div>
  );
};
