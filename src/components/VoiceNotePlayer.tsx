import React, { useState, useRef, useEffect } from 'react';
import { surpriseConfig } from '../config/surpriseConfig';
import { Play, Pause, Mic, Square, Upload, Volume2, Check } from 'lucide-react';

interface VoiceNotePlayerProps {
  onAudioPlayChange?: (isPlaying: boolean) => void;
}

export const VoiceNotePlayer: React.FC<VoiceNotePlayerProps> = ({ onAudioPlayChange }) => {
  const { voiceNote, names } = surpriseConfig;
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(voiceNote.defaultDuration || 14);
  const [audioSrc, setAudioSrc] = useState(voiceNote.audioSrc);
  
  // Browser Voice Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [showRecorder, setShowRecorder] = useState(false);
  const [recordingSuccess, setRecordingSuccess] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordTimerRef = useRef<number | null>(null);

  // Sync isPlaying with parent (to pause/duck background music)
  useEffect(() => {
    onAudioPlayChange?.(isPlaying);
  }, [isPlaying, onAudioPlayChange]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        console.warn('Playback error:', e);
      });
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current && !isNaN(audioRef.current.duration)) {
      setDuration(Math.round(audioRef.current.duration));
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setCurrentTime(val);
    if (audioRef.current) {
      audioRef.current.currentTime = val;
    }
  };

  // Upload custom file handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setAudioSrc(url);
      setIsPlaying(false);
      setCurrentTime(0);
      setRecordingSuccess(true);
      setTimeout(() => setRecordingSuccess(false), 3000);
    }
  };

  // In-Browser Voice Recording handler
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/mp3' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioSrc(audioUrl);
        setIsPlaying(false);
        setCurrentTime(0);
        setRecordingSuccess(true);
        setTimeout(() => setRecordingSuccess(false), 3000);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingSeconds(0);

      recordTimerRef.current = window.setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      alert('Could not access microphone. Please check permissions or upload an audio file directly.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (recordTimerRef.current) {
        clearInterval(recordTimerRef.current);
      }
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="w-full max-w-md mx-auto my-6 select-none animate-fadeIn">
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      {/* Main Rounded Audio Card (matching reference video frame 24!) */}
      <div className="bg-white rounded-3xl p-5 shadow-xl border border-pink-200/90 flex flex-col gap-3">
        {/* Top Info Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-pink-500" />
            <h4 className="font-poppins text-xs font-bold text-pink-900 tracking-wide uppercase">
              Hear {names.boyfriend} say it
            </h4>
          </div>

          <button
            onClick={() => setShowRecorder(!showRecorder)}
            className="text-[11px] font-medium text-pink-600 hover:text-pink-800 flex items-center gap-1 bg-pink-50 hover:bg-pink-100 px-2.5 py-1 rounded-full transition-colors"
          >
            <Mic className="w-3 h-3" />
            <span>{showRecorder ? 'Hide Voice Tools' : 'Record / Upload'}</span>
          </button>
        </div>

        {/* Audio Player Controls Row */}
        <div className="flex items-center gap-3.5 mt-1">
          {/* Circular Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#F45B91] to-[#D92E70] text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all shrink-0"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-white" />
            ) : (
              <Play className="w-5 h-5 fill-white ml-0.5" />
            )}
          </button>

          {/* Equalizer & Progress Bar */}
          <div className="flex-1 flex flex-col gap-1.5">
            {/* Animated Equalizer Waveform */}
            <div className="flex items-center gap-1 h-5 px-1">
              {[...Array(24)].map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-full bg-pink-400 transition-all duration-150 ${
                    isPlaying ? 'animate-pulse' : 'opacity-40'
                  }`}
                  style={{
                    height: isPlaying 
                      ? `${25 + Math.sin(i * 0.8 + currentTime * 4) * 65}%`
                      : '35%',
                    animationDelay: `${(i * 0.05) % 0.6}s`,
                  }}
                />
              ))}
            </div>

            {/* Scrubbable Range Slider */}
            <input
              type="range"
              min="0"
              max={duration || 14}
              step="0.1"
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1.5 bg-pink-100 rounded-lg appearance-none cursor-pointer accent-pink-600"
            />
          </div>

          {/* Duration Display */}
          <span className="text-xs font-mono font-medium text-neutral-500 shrink-0">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>

        {/* Optional Recorder / Custom Audio Uploader Drawer */}
        {showRecorder && (
          <div className="mt-3 pt-3 border-t border-pink-100 flex flex-col gap-2.5 animate-fadeIn">
            <p className="text-[11px] text-pink-700 font-medium">
              Want to personalize the voice note? Record in browser or upload an audio clip:
            </p>

            <div className="flex items-center gap-2">
              {!isRecording ? (
                <button
                  onClick={startRecording}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-pink-500 text-white text-xs font-semibold hover:bg-pink-600 transition-colors"
                >
                  <Mic className="w-3.5 h-3.5" />
                  <span>Start Mic Recording</span>
                </button>
              ) : (
                <button
                  onClick={stopRecording}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-red-600 text-white text-xs font-semibold hover:bg-red-700 animate-pulse transition-colors"
                >
                  <Square className="w-3.5 h-3.5" />
                  <span>Stop Recording ({recordingSeconds}s)</span>
                </button>
              )}

              {/* Upload file button */}
              <label className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-pink-100 text-pink-800 text-xs font-semibold hover:bg-pink-200 cursor-pointer transition-colors">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Audio File</span>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {recordingSuccess && (
              <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-medium justify-center">
                <Check className="w-3.5 h-3.5" />
                <span>Voice note updated! Press play above to hear it.</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
