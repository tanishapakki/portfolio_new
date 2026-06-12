import { useEffect, useState } from "react";
import './Hero.css'
import TextPressure from './TextPressure.tsx';
import { AnimatedSpan, Terminal, TypingAnimation } from "./ui/teminal.tsx";
import { motion, AnimatePresence } from "framer-motion";
import { NoiseTexture } from "./ui/NoiseTexture.tsx";

export default function Hero() { 
const [showIntroVideo, setShowIntroVideo] = useState(false);
const [showLoopVideo, setShowLoopVideo] = useState(false);
 useEffect(() => {
  const timer = setTimeout(() => {
    setShowIntroVideo(true);
  }, 4000);

  return () => clearTimeout(timer);
}, []);

  return (
    <div>
      <NoiseTexture noiseOpacity={1} />
    <section className="hero">
      <div className="hero-left">
        <div className="hero-greeting">
          <p className="font-space-grotesk text-[1rem] text-[#bba47b] opacity-80">
            Hi, I'm
          </p>
        </div>
        <div className="hero-name">
        <TextPressure
          text="TANISHA"
          fontFamily="Anton"
          textColor="#98824c"
          flex={true}
          weight={true}
          width={false}
          italic={false}
          minFontSize={30}
        />
        <TextPressure
          text="PAKKI"
          fontFamily="Anton"
          textColor="#98824c"
          flex={true}
          weight={true}
          width={false}
          italic={false}
          minFontSize={30}
        />
        </div>
        <p className="font-anton text-[3rem] text-[#bba47b] opacity-60">
          AI-ML & <br /> FULL-STACK DEVELOPER
        </p>
        <p className="font-space-grotesk text-[1rem] text-[#bba47b] opacity-80">
          Building intelligent systems, mobile apps, web applications and developer tools.
        </p>
      </div>

      <div className="hero-right">

        {/* Terminal — centered absolutely, fades out */}
        <AnimatePresence>
          {!showIntroVideo && (
            <motion.div
  className="terminal-center"
  initial={{ opacity: 0, y: 10 }}
  animate={{
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  }}
  exit={{
    opacity: 0,
    y: -20,
    filter: "blur(8px)",
    scale: 0.97,
    transition: {
      duration: 0.9,
      ease: [0.4, 0, 0.2, 1],
    },
  }}
> 
              <Terminal className="!bg-white !border-gray-200 !text-gray-800 shadow-lg w-100">
                <TypingAnimation className="!text-gray-800">
                  {"> initialize_portfolio.exe"}
                </TypingAnimation>
                <AnimatedSpan className="!text-blue-500">
                  Loading modules...
                </AnimatedSpan>
                <TypingAnimation className="!text-gray-800">
                  {"> render_personality"}
                </TypingAnimation>
                <AnimatedSpan>{"> rendering..."}</AnimatedSpan>
                <AnimatedSpan className="!text-blue-500">
                  [████████████████████] 100%
                </AnimatedSpan>
              </Terminal>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Image — anchored to bottom, rises in */}
        <AnimatePresence>
  {showIntroVideo && !showLoopVideo && (
    <motion.video
      className="hero-video"
      autoPlay
      muted
      playsInline
      onEnded={() => setShowLoopVideo(true)}
      initial={{
        opacity: 0,
        y: 40,
        scale: 0.97,
        filter: "blur(6px)",
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <source
        src="../src/assets/hero-paper-video.webm"
        type="video/webm"
      />
    </motion.video>
  )}
</AnimatePresence>

<AnimatePresence>
  {showLoopVideo && (
    <motion.video
      className="hero-video"
      autoPlay
      muted
      loop
      playsInline
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <source
        src="../src/assets/hero-paper-gif.webm"
        type="video/webm"
      />
    </motion.video>
  )}
</AnimatePresence>

      </div>
    </section>
    </div>
  );
}