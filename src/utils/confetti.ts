import confetti from 'canvas-confetti';

export const triggerHeartConfetti = () => {
  const count = 60;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 9999,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#F45B91', '#D92E70', '#FFD6E2', '#FFF0D7', '#D8AF62'],
  });
  fire(0.2, {
    spread: 60,
    colors: ['#F45B91', '#761B3B', '#FFD6E2'],
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    colors: ['#D8AF62', '#F45B91', '#FFFFFF'],
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    colors: ['#F45B91', '#D92E70'],
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    colors: ['#FFD6E2', '#D8AF62'],
  });
};

export const triggerRosePetalBurst = () => {
  confetti({
    particleCount: 50,
    angle: 60,
    spread: 55,
    origin: { x: 0 },
    colors: ['#F45B91', '#FFD6E2', '#D92E70', '#D8AF62'],
    zIndex: 9999,
  });
  confetti({
    particleCount: 50,
    angle: 120,
    spread: 55,
    origin: { x: 1 },
    colors: ['#F45B91', '#FFD6E2', '#D92E70', '#D8AF62'],
    zIndex: 9999,
  });
};
