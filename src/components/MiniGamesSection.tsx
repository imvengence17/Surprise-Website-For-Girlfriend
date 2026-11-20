import React, { useState, useEffect, useRef } from 'react';
import { surpriseConfig } from '../config/surpriseConfig';
import { triggerHeartConfetti } from '../utils/confetti';
import { sounds } from '../utils/soundEffects';
import { Heart, RotateCcw, ArrowRight, Eye, CheckCircle2 } from 'lucide-react';

interface MiniGamesSectionProps {
  onAllCompleted: () => void;
}

type GameStage = 'DOOR' | 'SCRATCH' | 'PUZZLE' | 'FALL_1' | 'FALL_2' | 'COMPLETED';

export const MiniGamesSection: React.FC<MiniGamesSectionProps> = ({ onAllCompleted }) => {
  const { miniGames } = surpriseConfig;
  const [stage, setStage] = useState<GameStage>('DOOR');

  // --- GAME A: DOOR STATE ---
  const [knocks, setKnocks] = useState(0);
  const [doorOpen, setDoorOpen] = useState(false);

  // --- GAME B: SCRATCH STATE ---
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [scratchPercent, setScratchPercent] = useState(0);
  const [scratchSolved, setScratchSolved] = useState(false);
  const isScratchingRef = useRef(false);

  // --- GAME C: PUZZLE STATE ---
  // 3x3 grid (indices 0..8)
  const [puzzlePieces, setPuzzlePieces] = useState<number[]>([4, 0, 7, 1, 8, 2, 5, 3, 6]);
  const [selectedPiece, setSelectedPiece] = useState<number | null>(null);
  const [puzzleMoves, setPuzzleMoves] = useState(0);
  const [puzzleSeconds, setPuzzleSeconds] = useState(0);
  const [puzzleSolved, setPuzzleSolved] = useState(false);
  const [isPeeking, setIsPeeking] = useState(false);

  // --- GAME D: PHOTO FALL STATE ---
  const [fall1Caught, setFall1Caught] = useState(false);
  const [fall2Caught, setFall2Caught] = useState(false);
  const [fallCardPos, setFallCardPos] = useState({ x: 50, y: 0 });

  // -------------------------------------------------------------
  // GAME A: DOOR KNOCK HANDLER
  // -------------------------------------------------------------
  const handleDoorKnock = () => {
    if (doorOpen) return;
    const nextKnocks = knocks + 1;
    setKnocks(nextKnocks);
    sounds.playKnock();

    if (nextKnocks >= 3) {
      setTimeout(() => {
        setDoorOpen(true);
        sounds.playSuccess();
        triggerHeartConfetti();
      }, 300);
    }
  };

  const handleEnterMuseum = () => {
    setStage('SCRATCH');
  };

  // -------------------------------------------------------------
  // GAME B: SCRATCH CANVAS INITIALIZATION & LOGIC
  // -------------------------------------------------------------
  useEffect(() => {
    if (stage !== 'SCRATCH' || scratchSolved) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Fill with romantic champagne-gold frosted cover
    ctx.fillStyle = '#E8D5B5';
    ctx.fillRect(0, 0, width, height);

    // Decorative texture & pattern
    ctx.fillStyle = '#D8AF62';
    for (let i = 0; i < 400; i++) {
      ctx.fillRect(
        Math.random() * width,
        Math.random() * height,
        Math.random() * 3,
        Math.random() * 3
      );
    }

    // Text on scratch surface
    ctx.font = 'bold 16px Poppins, sans-serif';
    ctx.fillStyle = '#761B3B';
    ctx.textAlign = 'center';
    ctx.fillText('✨ Rub with finger to reveal ✨', width / 2, height / 2 - 10);
    ctx.font = '13px Poppins, sans-serif';
    ctx.fillStyle = '#5A1B2E';
    ctx.fillText('(Scratch here)', width / 2, height / 2 + 18);
  }, [stage, scratchSolved]);

  const scratchAt = (clientX: number, clientY: number) => {
    if (scratchSolved) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 26, 0, Math.PI * 2, false);
    ctx.fill();

    // Sample pixels periodically to calculate revealed percentage
    if (Math.random() < 0.2) {
      try {
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let transparent = 0;
        const total = imgData.data.length / 4;
        for (let i = 3; i < imgData.data.length; i += 16) {
          if (imgData.data[i] === 0) transparent += 4;
        }
        const pct = Math.min(100, Math.round((transparent / total) * 100));
        setScratchPercent(pct);

        if (pct >= 45 && !scratchSolved) {
          setScratchSolved(true);
          sounds.playSuccess();
          triggerHeartConfetti();
        }
      } catch {}
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      scratchAt(touch.clientX, touch.clientY);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isScratchingRef.current) {
      scratchAt(e.clientX, e.clientY);
    }
  };

  // -------------------------------------------------------------
  // GAME C: PUZZLE LOGIC
  // -------------------------------------------------------------
  useEffect(() => {
    if (stage !== 'PUZZLE' || puzzleSolved) return;
    const timer = setInterval(() => {
      setPuzzleSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [stage, puzzleSolved]);

  const handlePieceClick = (index: number) => {
    if (puzzleSolved) return;
    sounds.playChime();

    if (selectedPiece === null) {
      setSelectedPiece(index);
    } else {
      if (selectedPiece !== index) {
        // Swap pieces
        const next = [...puzzlePieces];
        const temp = next[selectedPiece];
        next[selectedPiece] = next[index];
        next[index] = temp;
        setPuzzlePieces(next);
        setPuzzleMoves((m) => m + 1);

        // Check if solved: [0, 1, 2, 3, 4, 5, 6, 7, 8]
        const isCorrect = next.every((val, idx) => val === idx);
        if (isCorrect) {
          setPuzzleSolved(true);
          sounds.playSuccess();
          triggerHeartConfetti();
        }
      }
      setSelectedPiece(null);
    }
  };

  const handleRestartPuzzle = () => {
    setPuzzlePieces([4, 0, 7, 1, 8, 2, 5, 3, 6]);
    setSelectedPiece(null);
    setPuzzleMoves(0);
    setPuzzleSeconds(0);
    setPuzzleSolved(false);
  };

  // -------------------------------------------------------------
  // GAME D: FALLING ANIMATION LOOP
  // -------------------------------------------------------------
  useEffect(() => {
    if (stage !== 'FALL_1' && stage !== 'FALL_2') return;

    let animId: number;
    let t = 0;
    const animate = () => {
      t += 0.03;
      const x = 50 + Math.sin(t) * 20; // sway gently between 30% and 70%
      const y = (t * 7) % 65; // gentle descent
      setFallCardPos({ x, y });
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [stage]);

  const handleCatchFall1 = () => {
    if (fall1Caught) return;
    setFall1Caught(true);
    sounds.playSuccess();
    triggerHeartConfetti();
  };

  const handleCatchFall2 = () => {
    if (fall2Caught) return;
    setFall2Caught(true);
    sounds.playSuccess();
    triggerHeartConfetti();
    setTimeout(() => {
      setStage('COMPLETED');
    }, 1200);
  };

  // -------------------------------------------------------------
  // PROGRESS INDICATOR HELPER
  // -------------------------------------------------------------
  const getProgress = () => {
    switch (stage) {
      case 'DOOR':
        return { label: '0/4', step: 0 };
      case 'SCRATCH':
        return { label: '1/4', step: 1 };
      case 'PUZZLE':
        return { label: '2/4', step: 2 };
      case 'FALL_1':
        return { label: '3/4', step: 3 };
      case 'FALL_2':
        return { label: '4/4', step: 4 };
      case 'COMPLETED':
        return { label: '4/4 Completed', step: 4 };
    }
  };

  const progress = getProgress();

  return (
    <section className="relative min-h-screen w-full px-4 py-16 bg-[#29132B] text-white overflow-hidden select-none">
      {/* Background starlight / dark plum glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(#F45B91_1px,transparent_1px)] opacity-20 [background-size:24px_24px]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="max-w-xl mx-auto z-10 flex flex-col items-center min-h-[80vh] justify-between">
        {/* ========================================================= */}
        {/* TOP STATUS BAR: ROOM & PROGRESS INDICATOR */}
        {/* ========================================================= */}
        <div className="w-full flex items-center justify-between py-2 border-b border-pink-900/40 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping" />
            <span className="text-xs uppercase tracking-widest text-pink-300 font-semibold">
              The Museum of Us
            </span>
          </div>

          {/* Progress dots (matching video frame 18/22) */}
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4].map((dot) => (
              <span
                key={dot}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  progress.step >= dot
                    ? 'bg-pink-500 shadow-[0_0_8px_#F45B91]'
                    : 'bg-pink-950 border border-pink-800'
                }`}
              />
            ))}
            <span className="text-xs text-pink-300 font-mono ml-2">
              {progress.label}
            </span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* STAGE A: THE MUSEUM DOOR (Knock 3 Times) */}
        {/* ========================================================= */}
        {stage === 'DOOR' && (
          <div className="flex flex-col items-center text-center my-auto w-full animate-fadeIn">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-950/80 border border-pink-700/50 text-pink-300 text-xs font-medium mb-3">
              <span>{miniGames.museumIntro.badge}</span>
            </div>

            <p className="text-xs tracking-widest font-mono text-amber-300/90 uppercase font-semibold mb-1">
              {miniGames.museumIntro.topNote}
            </p>
            <h2 className="font-great-vibes text-4xl sm:text-5xl text-pink-100 font-normal mb-1 drop-shadow">
              {miniGames.museumIntro.heading}
            </h2>
            <p className="font-dancing text-lg text-pink-300 mb-8">
              {miniGames.museumIntro.rule}
            </p>

            {/* 3D Arched Door */}
            <div 
              onClick={handleDoorKnock}
              className="relative cursor-pointer select-none group transition-transform duration-300 active:scale-98"
            >
              {/* Outer Golden Glow */}
              <div className="absolute -inset-4 bg-amber-400/20 rounded-full blur-2xl group-hover:bg-amber-400/35 transition-colors" />

              {/* Door Frame container */}
              <div className="relative w-56 h-80 sm:w-64 sm:h-92 bg-[#1B0C1D] rounded-t-full border-4 border-[#761B3B] shadow-[0_15px_35px_rgba(0,0,0,0.6)] p-2 flex items-center justify-center overflow-hidden">
                {/* Inside Light flood if door open */}
                {doorOpen && (
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-200 via-amber-300 to-amber-100 flex flex-col items-center justify-center text-[#29132B] p-4 text-center animate-fadeIn">
                    <p className="font-dancing text-3xl font-bold text-[#761B3B]">
                      {miniGames.museumIntro.welcomeTitle}
                    </p>
                    <p className="text-xs font-medium text-pink-900 mt-2">
                      {miniGames.museumIntro.welcomeSubtitle}
                    </p>
                    <div className="mt-4 flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-600 animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-600 animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-600 animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}

                {/* Arched Door Panel */}
                <div 
                  className={`w-full h-full bg-[#3B1530] rounded-t-full border border-pink-700/40 p-4 flex flex-col items-center justify-between transition-transform duration-700 ease-out origin-left ${
                    doorOpen ? 'transform -rotate-y-80 opacity-0 pointer-events-none' : ''
                  }`}
                >
                  {/* Placard on door */}
                  <div className="mt-8 px-4 py-1.5 rounded bg-white text-[#29132B] text-xs font-bold tracking-wider uppercase shadow-md rotate-2">
                    EXHIBIT #1
                  </div>

                  {/* Brass Ring Knocker */}
                  <div className="my-auto flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full border-4 border-amber-300 shadow-[0_0_10px_#D8AF62] flex items-center justify-center animate-pulse">
                      <div className="w-4 h-4 rounded-full bg-amber-400" />
                    </div>
                    <p className="font-sacramento text-xl text-amber-200 mt-3 font-semibold">
                      Knock {knocks > 0 ? `(${knocks}/3)` : '(Tap to Knock)'}
                    </p>
                  </div>

                  <p className="text-[10px] text-pink-400/80 uppercase tracking-widest mb-2 font-mono">
                    Touch to enter
                  </p>
                </div>
              </div>
            </div>

            {doorOpen && (
              <button
                onClick={handleEnterMuseum}
                className="mt-8 px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 text-white font-semibold text-base shadow-[0_8px_20px_rgba(244,91,145,0.5)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <span>Walk into Room 1 →</span>
              </button>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* STAGE B: ROOM 1 · THE GALLERY (Scratch Photo Reveal) */}
        {/* ========================================================= */}
        {stage === 'SCRATCH' && (
          <div className="flex flex-col items-center text-center my-auto w-full animate-fadeIn">
            <span className="text-xs uppercase tracking-widest text-pink-400 font-semibold mb-1">
              {miniGames.scratchGame.roomBadge}
            </span>
            <h2 className="font-great-vibes text-4xl sm:text-5xl text-pink-100 font-normal mb-1">
              {miniGames.scratchGame.title}
            </h2>
            <p className="font-dancing text-lg text-pink-300 mb-6">
              {miniGames.scratchGame.instruction}
            </p>

            {/* Museum Gold Frame with Scratch Canvas */}
            <div className="relative w-72 h-88 sm:w-80 sm:h-96 p-3 bg-gradient-to-br from-[#E2B755] via-[#FFE5A3] to-[#A47926] rounded-xl shadow-[0_12px_30px_rgba(0,0,0,0.6)]">
              <div className="relative w-full h-full bg-neutral-900 rounded-lg overflow-hidden flex items-center justify-center">
                {/* Underneath: Couple Photo 1 (Rooftop sunset) */}
                <img
                  src={miniGames.scratchGame.photoSrc}
                  alt="Couple Memory 1"
                  className="w-full h-full object-cover object-center"
                />

                {/* Over top: Scratch Canvas */}
                {!scratchSolved && (
                  <canvas
                    ref={canvasRef}
                    width={320}
                    height={380}
                    className="scratch-canvas absolute inset-0 w-full h-full cursor-crosshair z-10"
                    onMouseDown={() => (isScratchingRef.current = true)}
                    onMouseUp={() => (isScratchingRef.current = false)}
                    onMouseLeave={() => (isScratchingRef.current = false)}
                    onMouseMove={handleMouseMove}
                    onTouchMove={handleTouchMove}
                  />
                )}
              </div>
            </div>

            {/* Exhibit info plaque */}
            <div className="mt-4 text-center">
              <span className="inline-block px-3 py-0.5 rounded-full bg-pink-950/80 border border-pink-800 text-[11px] font-mono text-pink-300 mb-2">
                Revealed: {scratchPercent}%
              </span>
              <p className="font-poppins text-xs font-semibold text-amber-300 uppercase tracking-widest">
                {miniGames.scratchGame.exhibitSubtitle}
              </p>
              <p className="font-caveat text-xl text-pink-200 mt-1">
                {miniGames.scratchGame.exhibitTitle}
              </p>
            </div>

            {/* Success state */}
            {scratchSolved && (
              <div className="mt-6 flex flex-col items-center animate-fadeIn">
                <p className="font-dancing text-xl text-amber-200 font-bold mb-3">
                  ✨ {miniGames.scratchGame.successMessage}
                </p>
                <button
                  onClick={() => setStage('PUZZLE')}
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 text-white font-semibold text-sm shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <span>Proceed to Room 2 (Puzzle)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* STAGE C: ROOM 2 · THE RESTORATION DESK (Photo Jigsaw) */}
        {/* ========================================================= */}
        {stage === 'PUZZLE' && (
          <div className="flex flex-col items-center text-center my-auto w-full animate-fadeIn">
            <span className="text-xs uppercase tracking-widest text-pink-400 font-semibold mb-1">
              {miniGames.puzzleGame.roomBadge}
            </span>
            <h2 className="font-great-vibes text-4xl sm:text-5xl text-pink-100 font-normal mb-1">
              {miniGames.puzzleGame.title}
            </h2>
            <p className="font-dancing text-base sm:text-lg text-pink-300 mb-4 max-w-sm">
              {miniGames.puzzleGame.instruction}
            </p>

            {/* Stats: Moves & Timer */}
            <div className="flex items-center gap-4 mb-3 text-xs font-mono text-pink-200">
              <span className="px-3 py-1 bg-pink-950/80 rounded-full border border-pink-800">
                Moves: {puzzleMoves}
              </span>
              <span className="px-3 py-1 bg-pink-950/80 rounded-full border border-pink-800">
                ⏱ {Math.floor(puzzleSeconds / 60)}:{(puzzleSeconds % 60).toString().padStart(2, '0')}
              </span>
              <button
                onMouseDown={() => setIsPeeking(true)}
                onMouseUp={() => setIsPeeking(false)}
                onTouchStart={() => setIsPeeking(true)}
                onTouchEnd={() => setIsPeeking(false)}
                className="px-3 py-1 bg-amber-950/80 hover:bg-amber-900 rounded-full border border-amber-700/80 text-amber-300 flex items-center gap-1 active:scale-95"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Hold to peek</span>
              </button>
            </div>

            {/* 3x3 Puzzle Grid (using Photo 2) */}
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 p-2 bg-neutral-900/90 rounded-2xl border-2 border-pink-800 shadow-xl overflow-hidden">
              {/* Peek Overlay */}
              {isPeeking && (
                <div className="absolute inset-0 z-30 pointer-events-none rounded-2xl overflow-hidden">
                  <img
                    src={miniGames.puzzleGame.photoSrc}
                    alt="Peek Hint"
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/70 px-3 py-0.5 rounded text-[10px] text-white">
                    Previewing Target
                  </div>
                </div>
              )}

              {/* Puzzle Solved View (Full clean image) */}
              {puzzleSolved ? (
                <div className="w-full h-full rounded-xl overflow-hidden animate-fadeIn">
                  <img
                    src={miniGames.puzzleGame.photoSrc}
                    alt="Solved couple photo"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                /* Grid of 9 pieces */
                <div className="grid grid-cols-3 grid-rows-3 w-full h-full gap-1">
                  {puzzlePieces.map((pieceVal, gridIndex) => {
                    const row = Math.floor(pieceVal / 3);
                    const col = pieceVal % 3;
                    const isSelected = selectedPiece === gridIndex;

                    return (
                      <div
                        key={gridIndex}
                        onClick={() => handlePieceClick(gridIndex)}
                        className={`relative cursor-pointer rounded-lg overflow-hidden transition-all duration-200 active:scale-95 ${
                          isSelected
                            ? 'ring-4 ring-pink-400 scale-105 z-20 shadow-lg'
                            : 'hover:brightness-110'
                        }`}
                        style={{
                          backgroundImage: `url(${miniGames.puzzleGame.photoSrc})`,
                          backgroundSize: '300% 300%',
                          backgroundPosition: `${col * 50}% ${row * 50}%`,
                        }}
                      >
                        {/* Piece number subtle indicator */}
                        <span className="absolute bottom-1 right-1 text-[9px] font-mono bg-black/50 text-white/70 px-1 rounded">
                          {pieceVal + 1}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Controls / Success Banner */}
            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={handleRestartPuzzle}
                className="px-4 py-2 rounded-full bg-pink-950/80 hover:bg-pink-900 border border-pink-800 text-xs text-pink-300 flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Shuffle Pieces</span>
              </button>

              {puzzleSolved && (
                <button
                  onClick={() => setStage('FALL_1')}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 text-white font-semibold text-xs shadow-lg hover:scale-105 transition-all flex items-center gap-1.5 animate-fadeIn"
                >
                  <span>Next Room (Photo Fall)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {puzzleSolved && (
              <p className="font-dancing text-xl text-amber-300 font-bold mt-4 animate-fadeIn">
                "{miniGames.puzzleGame.successMessage}"
              </p>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* STAGE D1: ROOM 3 · CATCH MY LOVE (Photo 3 Fall) */}
        {/* ========================================================= */}
        {stage === 'FALL_1' && (
          <div className="flex flex-col items-center text-center my-auto w-full animate-fadeIn">
            <span className="text-xs uppercase tracking-widest text-pink-400 font-semibold mb-1">
              {miniGames.photoFallGame.roomBadge} • Part 1
            </span>
            <h2 className="font-great-vibes text-4xl sm:text-5xl text-pink-100 font-normal mb-1">
              {miniGames.photoFallGame.title}
            </h2>
            <p className="font-dancing text-lg text-pink-300 mb-6">
              {miniGames.photoFallGame.instruction}
            </p>

            {/* Falling Catch Area */}
            <div className="relative w-full max-w-sm h-80 bg-pink-950/30 rounded-3xl border border-pink-900/60 p-4 overflow-hidden flex items-center justify-center">
              {/* Floating ambient hearts */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute text-pink-400/30 animate-pulse"
                    style={{
                      top: `${(i * 20 + 10) % 80}%`,
                      left: `${(i * 25 + 5) % 85}%`,
                    }}
                  >
                    ❤️
                  </div>
                ))}
              </div>

              {/* The Falling Polaroid Card */}
              {!fall1Caught ? (
                <div
                  onClick={handleCatchFall1}
                  className="absolute cursor-pointer p-2 pb-5 bg-white rounded-lg shadow-2xl transition-all duration-100 hover:scale-110 active:scale-95 select-none"
                  style={{
                    top: `${fallCardPos.y}%`,
                    left: `${fallCardPos.x}%`,
                    transform: 'translate(-50%, 0) rotate(-6deg)',
                  }}
                >
                  <img
                    src={miniGames.photoFallGame.photo1Src}
                    alt="Falling Memory"
                    className="w-32 h-40 object-cover rounded"
                  />
                  <p className="font-caveat text-sm text-neutral-800 text-center font-bold mt-1">
                    Tap to Catch! 🖐️
                  </p>
                </div>
              ) : (
                /* Snapped / Caught Full Polaroid View */
                <div className="p-3 pb-6 bg-white rounded-xl shadow-2xl animate-stamp flex flex-col items-center">
                  <img
                    src={miniGames.photoFallGame.photo1Src}
                    alt="Caught Memory"
                    className="w-44 h-56 object-cover rounded"
                  />
                  <p className="font-caveat text-xl text-neutral-800 font-bold mt-2">
                    Locked in My Heart ✨
                  </p>
                </div>
              )}
            </div>

            {fall1Caught && (
              <div className="mt-6 flex flex-col items-center animate-fadeIn">
                <p className="font-dancing text-2xl text-amber-300 font-bold mb-3">
                  "{miniGames.photoFallGame.successMessage1}"
                </p>
                <button
                  onClick={() => setStage('FALL_2')}
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 text-white font-semibold text-sm shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <span>Catch Next Falling Memory →</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* STAGE D2: ROOM 3 · CATCH MY LOVE (Photo 4 Fall) */}
        {/* ========================================================= */}
        {stage === 'FALL_2' && (
          <div className="flex flex-col items-center text-center my-auto w-full animate-fadeIn">
            <span className="text-xs uppercase tracking-widest text-pink-400 font-semibold mb-1">
              {miniGames.photoFallGame.roomBadge} • Part 2
            </span>
            <h2 className="font-great-vibes text-4xl sm:text-5xl text-pink-100 font-normal mb-1">
              One Last Falling Star
            </h2>
            <p className="font-dancing text-lg text-pink-300 mb-6">
              Catch our final couple memory!
            </p>

            {/* Falling Area for Photo 4 */}
            <div className="relative w-full max-w-sm h-80 bg-pink-950/30 rounded-3xl border border-pink-900/60 p-4 overflow-hidden flex items-center justify-center">
              {!fall2Caught ? (
                <div
                  onClick={handleCatchFall2}
                  className="absolute cursor-pointer p-2 pb-5 bg-white rounded-lg shadow-2xl transition-all duration-100 hover:scale-110 active:scale-95 select-none"
                  style={{
                    top: `${fallCardPos.y}%`,
                    left: `${100 - fallCardPos.x}%`,
                    transform: 'translate(-50%, 0) rotate(8deg)',
                  }}
                >
                  <img
                    src={miniGames.photoFallGame.photo2Src}
                    alt="Falling Paris Memory"
                    className="w-32 h-40 object-cover rounded"
                  />
                  <p className="font-caveat text-sm text-neutral-800 text-center font-bold mt-1">
                    Catch Me! 💖
                  </p>
                </div>
              ) : (
                <div className="p-3 pb-6 bg-white rounded-xl shadow-2xl animate-stamp flex flex-col items-center">
                  <img
                    src={miniGames.photoFallGame.photo2Src}
                    alt="Caught Memory 2"
                    className="w-44 h-56 object-cover rounded"
                  />
                  <p className="font-caveat text-xl text-neutral-800 font-bold mt-2">
                    Running into Forever 💐
                  </p>
                </div>
              )}
            </div>

            {fall2Caught && (
              <div className="mt-6 flex flex-col items-center animate-fadeIn">
                <p className="font-dancing text-2xl text-amber-300 font-bold mb-3">
                  "{miniGames.photoFallGame.successMessage2}"
                </p>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* STAGE COMPLETED: ALL GAMES UNLOCKED */}
        {/* ========================================================= */}
        {stage === 'COMPLETED' && (
          <div className="flex flex-col items-center text-center my-auto w-full max-w-md animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-amber-400 flex items-center justify-center shadow-[0_0_25px_#F45B91] mb-4">
              <CheckCircle2 className="w-9 h-9 text-white" />
            </div>

            <h2 className="font-great-vibes text-5xl sm:text-6xl text-pink-100 font-normal mb-2">
              All Rooms Explored
            </h2>
            <p className="font-dancing text-2xl sm:text-3xl text-pink-300 font-bold mb-6">
              "{miniGames.completionMessage}"
            </p>

            {/* Next Section CTA */}
            <button
              onClick={onAllCompleted}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-600 to-amber-500 text-white font-bold text-base sm:text-lg shadow-[0_10px_25px_rgba(244,91,145,0.6)] hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
            >
              <span>Open My Love Letter</span>
              <Heart className="w-5 h-5 fill-white animate-pulse" />
            </button>
          </div>
        )}

        {/* ========================================================= */}
        {/* BOTTOM GLOBAL GAME NAV */}
        {/* ========================================================= */}
        <div className="w-full flex items-center justify-between pt-4 mt-6 border-t border-pink-900/40 text-xs text-pink-400">
          <button
            onClick={() => {
              setStage('DOOR');
              setKnocks(0);
              setDoorOpen(false);
              setScratchPercent(0);
              setScratchSolved(false);
              setPuzzleSolved(false);
              setFall1Caught(false);
              setFall2Caught(false);
            }}
            className="flex items-center gap-1 hover:text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restart Games</span>
          </button>

          <span className="font-mono text-[11px] text-pink-300/60">
            Swipe / Touch Friendly
          </span>
        </div>
      </div>
    </section>
  );
};
