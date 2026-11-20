# Romantic Surprise Website for Gelhii ❤️ (from Gelhuu)

A cinematic, interactive, and personalized romantic surprise website built with React, Vite, TypeScript, and Tailwind CSS.

## 🌟 Features

1. **Fixed Header / Branding**: Inspired by the reference video with bold outlined title and cursive subtitle.
2. **Opening Experience (The Heart)**: Glowing 3D pulsing heart with interactive Cupid bow & arrow ("PULL & LET GO").
3. **Love You Section**: Full-screen vibrant romantic pink section with subtle grid pattern and elegant cursive typography.
4. **Our Love Tree**: Animated growing tree with fluttering heart-canopy and romantic card.
5. **The Gift Box Surprise**: Illustrated pink gift box that bounces and pops open with hearts, confetti, and a secret message.
6. **Rose Transition**: Full-screen repeating pattern of pink, peach, and white roses with floating petals.
7. **From Me To You**: Couple illustration touching foreheads with dried rose in the corner.
8. **Our Memories (Scrapbook Gallery)**: Polaroid scrapbook collage of all 8 photographs with handwritten captions and interactive Lightbox zoom.
9. **The Museum of Us (Mini-Games)**:
   - **Game A (The Museum Door)**: Knock 3 times to swing open the 3D door with golden light.
   - **Game B (Room 1 - Photo Reveal)**: Scratch/rub canvas uncovering the first couple photo.
   - **Game C (Room 2 - Restoration Desk)**: 3x3 interactive jigsaw puzzle with moves, timer, and peek hint.
   - **Game D (Room 3 - Catch My Love)**: Photo fall game catching couple photos 3 and 4 as they float down.
10. **My Love Letter**: Vintage parchment letter card with custom paragraphs and melting heart emoji.
11. **Custom Voice Note Player**:
    - Real audio playback with play/pause and scrubbable progress bar.
    - Animated equalizer waveform.
    - In-browser microphone voice recorder to record or upload custom voice notes!
12. **Room 5 (The Promises)**: Interactive checklist with "Make it official" button that stamps a red wax "SEALED WITH LOVE" seal with confetti.
13. **One Last Room**: Starry midnight room with final cinematic love quote, pulsing heart, and replay button.
14. **Floating Romantic Music Player**: Starts on first user interaction, with volume slider and track title. Background music automatically ducks when voice note plays.

---

## 📱 How to Run & View on Mobile Phone

Since your girlfriend will view this on her mobile phone, you can run the dev server on your local Wi-Fi network:

1. Open a terminal in `c:\VScode\PROJECTS\romantic-surprise`.
2. Run:
   ```bash
   npm run dev -- --host
   ```
3. Vite will display a local network URL, for example:
   ```
   ➜  Network: http://192.168.1.XX:5173/
   ```
4. Connect your girlfriend's phone to the same Wi-Fi network, open that URL on Chrome or Safari on her phone, and watch her experience the surprise!

Alternatively, you can deploy this project in 60 seconds for free to **Vercel** or **Netlify** (e.g. `vercel` or `netlify deploy --prod --dir=dist`) so she can open a live link anywhere!

---

## ⚙️ How to Personalize

All texts, names, messages, photo captions, promises, and audio paths are centrally configured in:
`src/config/surpriseConfig.ts`
