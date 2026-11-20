export interface PhotoMemory {
  id: string;
  src: string;
  alt: string;
  caption: string;
  rotation: number;
  memoryType: 'portrait' | 'eyes' | 'couple' | 'adventure' | 'chat';
  aspect: 'portrait' | 'landscape' | 'square';
}

export interface SurpriseConfig {
  names: {
    boyfriend: string;
    girlfriend: string;
    petName: string;
  };
  header: {
    badge: string;
    title: string;
    subtitle: string;
  };
  opening: {
    promptMessage: string;
    buttonText: string;
    hintText: string;
  };
  loveYouSection: {
    preTitle: string;
    mainTitle: string;
    subtitle: string;
  };
  loveTree: {
    badgeText: string;
    title: string;
    subtitle: string;
  };
  giftBox: {
    heading: string;
    subtitle: string;
    tapHint: string;
    message: string;
    continueText: string;
  };
  fromMeToYou: {
    heading: string;
    subtitle: string;
    message: string;
  };
  gallery: {
    heading: string;
    subtitle: string;
    photos: PhotoMemory[];
  };
  miniGames: {
    museumIntro: {
      badge: string;
      topNote: string;
      heading: string;
      rule: string;
      welcomeTitle: string;
      welcomeSubtitle: string;
    };
    scratchGame: {
      roomBadge: string;
      title: string;
      instruction: string;
      photoSrc: string;
      exhibitTitle: string;
      exhibitSubtitle: string;
      successMessage: string;
    };
    puzzleGame: {
      roomBadge: string;
      title: string;
      instruction: string;
      photoSrc: string;
      successMessage: string;
    };
    photoFallGame: {
      roomBadge: string;
      title: string;
      instruction: string;
      photo1Src: string;
      photo2Src: string;
      successMessage1: string;
      successMessage2: string;
    };
    completionMessage: string;
  };
  loveLetter: {
    heading: string;
    salutation: string;
    paragraphs: string[];
    signoff: string;
    letterImage: string;
  };
  voiceNote: {
    heading: string;
    audioSrc: string;
    defaultDuration: number;
  };
  promises: {
    roomBadge: string;
    title: string;
    subtitle: string;
    cardHeading: string;
    items: string[];
    stampText: string;
  };
  finalRoom: {
    buttonText: string;
    finalQuote: string;
    finalSignature: string;
    replayText: string;
  };
  music: {
    defaultBgMusic: string;
    trackTitle: string;
  };
}

export const surpriseConfig: SurpriseConfig = {
  names: {
    boyfriend: "Gelhuu",
    girlfriend: "Gelhii",
    petName: "My Gelhii",
  },
  header: {
    badge: "Best Surprise for Gelhii",
    title: "Impress Her With This",
    subtitle: "Best Surprise for Gelhii",
  },
  opening: {
    promptMessage: "Someone made something special just for you...",
    buttonText: "Open My Surprise ❤️",
    hintText: "PULL & LET GO",
  },
  loveYouSection: {
    preTitle: "this one is for you...",
    mainTitle: "I Love You",
    subtitle: "To the best thing that ever happened to me.",
  },
  loveTree: {
    badgeText: "made for you, by hand",
    title: "I love you",
    subtitle: "and every ordinary day with you",
  },
  giftBox: {
    heading: "For You, My Gelhii",
    subtitle: "There's something waiting for you...",
    tapHint: "(tap to open)",
    message: "You are my favourite gift in this entire world.",
    continueText: "Walk down memory lane →",
  },
  fromMeToYou: {
    heading: "From me to you.",
    subtitle: "This is how much I love you.",
    message: "Every little heartbeat reminds me why I fell for you.",
  },
  gallery: {
    heading: "Our Memories",
    subtitle: "Every photograph is a love story waiting to be told.",
    photos: [
      {
        id: "p1",
        src: "/photos/1000168151.jpg",
        alt: "The smile that lights up my world",
        caption: "The most beautiful smile in my world ✨",
        rotation: -3,
        memoryType: "portrait",
        aspect: "landscape",
      },
      {
        id: "p2",
        src: "/photos/1000168150.jpg",
        alt: "Your mesmerizing eyes",
        caption: '"Oh my luv, I sought eternity in my eyes" 🎀',
        rotation: 2,
        memoryType: "eyes",
        aspect: "portrait",
      },
      {
        id: "p3",
        src: "/photos/1000168147.png",
        alt: "Golden hour rooftop with you",
        caption: "Golden hour with my favorite human 🌇",
        rotation: -2,
        memoryType: "couple",
        aspect: "portrait",
      },
      {
        id: "p4",
        src: "/photos/1000168148.png",
        alt: "Adventures holding your hand",
        caption: "Adventures are better when holding your hand ⛰️",
        rotation: 3,
        memoryType: "couple",
        aspect: "portrait",
      },
      {
        id: "p5",
        src: "/photos/1000168149.png",
        alt: "Beach sunset forehead kiss",
        caption: "Where I feel most at home 🌊❤️",
        rotation: -2,
        memoryType: "couple",
        aspect: "portrait",
      },
      {
        id: "p6",
        src: "/photos/1000168153.png",
        alt: "Paris flowers romance",
        caption: "Running through the world with flowers for you 💐",
        rotation: 2,
        memoryType: "adventure",
        aspect: "portrait",
      },
      {
        id: "p7",
        src: "/photos/1000168154.jpg",
        alt: "Carefree walks together",
        caption: "Every ordinary step feels extraordinary with you 🍃",
        rotation: -1,
        memoryType: "adventure",
        aspect: "landscape",
      },
      {
        id: "p8",
        src: "/photos/1000168152.jpg",
        alt: "Midnight WhatsApp chats",
        caption: "The midnight talks that stole my heart 💬❤️",
        rotation: 2,
        memoryType: "chat",
        aspect: "portrait",
      },
    ],
  },
  miniGames: {
    museumIntro: {
      badge: "❤️ Someone wanted you to know",
      topNote: "CLOSED TO EVERYONE. EXCEPT YOU.",
      heading: "Gelhuu built you a museum.",
      rule: "Knock three times. That's the rule.",
      welcomeTitle: "Come in, Gelhii.",
      welcomeSubtitle: "4 rooms, and every one of them is about you.",
    },
    scratchGame: {
      roomBadge: "ROOM 1 · THE GALLERY",
      title: "Our photos",
      instruction: "Each one is covered. Rub your finger across to see it.",
      photoSrc: "/photos/1000168147.png",
      exhibitTitle: "Sunset Embrace",
      exhibitSubtitle: "EXHIBIT 1 · FROM THE GELHUU COLLECTION",
      successMessage: "You uncovered our first special memory! Look at us ❤️",
    },
    puzzleGame: {
      roomBadge: "ROOM 2 · THE RESTORATION DESK",
      title: "This photo fell apart.",
      instruction: "Nine pieces. Tap two to swap them, or drag one where you want it.",
      photoSrc: "/photos/1000168148.png",
      successMessage: "Fixed it! You pieced our memory back together perfectly ❤️",
    },
    photoFallGame: {
      roomBadge: "ROOM 3 · CATCH MY LOVE",
      title: "Catch our memories",
      instruction: "A memory is floating down! Tap or swipe to catch it before it drifts away.",
      photo1Src: "/photos/1000168149.png",
      photo2Src: "/photos/1000168153.png",
      successMessage1: "Caught you! Forever locked in my arms. ❤️",
      successMessage2: "Gotcha! Running into forever with you. ❤️",
    },
    completionMessage: "You just unlocked another little piece of my heart ❤️",
  },
  loveLetter: {
    heading: "Gelhuu wrote you this...",
    salutation: "Hey Gelhii ❤️",
    paragraphs: [
      "Just wanted to pause my day to remind you how much you mean to me. I know we live far away from each other, and I miss you so much every single moment.",
      "I admire how hard you're studying in your college plus two science program, and I'm so proud of you. I'm also busy with my BTech second year, but you're always in my thoughts.",
      "I can't wait until we can talk for hours until midnight again, catching up and dreaming together.",
      "Even though miles are between us, I want you to know that I will always choose you, every single day, above everything else. I promise to work on our communication and not let silly fights get in the way.",
      "You are my everything, and I love you more than words can say. Can't wait to see your beautiful smile again.",
    ],
    signoff: "Name - gelhuuu....tamara ❤️",
    letterImage: "/photos/love-letter.jpg",
  },
  voiceNote: {
    heading: "Hear What My Heart Says",
    audioSrc: "/audio/voice-note.mp3",
    defaultDuration: 31,
  },
  promises: {
    roomBadge: "ROOM 5 · THE PROMISES",
    title: "Tick the ones you'll hold on to.",
    subtitle: "Our sacred promises to each other",
    cardHeading: "Our Promises",
    items: [
      "Never go to bed angry",
      "Say the hard thing, gently",
      "Always share the last bite",
      "Choose you again, every ordinary morning",
      "Pick you first. Every time.",
    ],
    stampText: "SEALED WITH LOVE",
  },
  finalRoom: {
    buttonText: "One Last Room →",
    finalQuote: "If I had to choose again, in every lifetime, in every universe, I would still choose you.",
    finalSignature: "I Love You, My Forever Person. ❤️",
    replayText: "Replay Our Love Story ↺",
  },
  music: {
    defaultBgMusic: "/audio/bg-music.mp3",
    trackTitle: "Romantic Melody (Instrumental)",
  },
};
