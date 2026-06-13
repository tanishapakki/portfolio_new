import { useEffect, useState } from "react";
import './Hero.css'
import TextPressure from './TextPressure.tsx';
import { AnimatedSpan, Terminal, TypingAnimation } from "./ui/teminal.tsx";
import { motion, AnimatePresence } from "framer-motion";
import { NoiseTexture } from "./ui/NoiseTexture.tsx";
import tanishaImg from "../assets/tanisha.png";
import BubbleMenu from './ui/BubbleMenu';

const items = [
  {
    label: 'home',
    href: '#',
    ariaLabel: 'Home',
    rotation: -8,
    hoverStyles: { bgColor: '#3b82f6', textColor: '#ffffff' }
  },
  {
    label: 'about',
    href: '#',
    ariaLabel: 'About',
    rotation: 8,
    hoverStyles: { bgColor: '#10b981', textColor: '#ffffff' }
  },
  {
    label: 'projects',
    href: '#',
    ariaLabel: 'Projects',
    rotation: 8,
    hoverStyles: { bgColor: '#f59e0b', textColor: '#ffffff' }
  },
  {
    label: 'blog',
    href: '#',
    ariaLabel: 'Blog',
    rotation: 8,
    hoverStyles: { bgColor: '#ef4444', textColor: '#ffffff' }
  },
  {
    label: 'contact',
    href: '#',
    ariaLabel: 'Contact',
    rotation: -8,
    hoverStyles: { bgColor: '#8b5cf6', textColor: '#ffffff' }
  }
];
export default function Hero() { 
    const [phase, setPhase] = useState<
    "terminal" |
    "loading" |
    "glitch" |
    "revealing" |
    "resolved"
  >("terminal");

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("loading"), 3500),
      setTimeout(() => setPhase("glitch"), 4200),
      setTimeout(() => setPhase("revealing"), 4700),
      setTimeout(() => setPhase("resolved"), 6500),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div>
      
       <BubbleMenu
        logo={null}
        items={items}
        onMenuClick={() => {}}
        className=""
        style={{}}
        menuAriaLabel="Toggle navigation"
        menuBg="#ffffff"
        menuContentColor="#111111"
        useFixedPosition={false}
        animationEase="bounce.out"
        animationDuration={0.85}
        staggerDelay={0.12}
      />

      <motion.div
  className={phase === "glitch" ? "hero-glitching" : ""}
></motion.div>
    <section className="hero">

      <AnimatePresence>
  {phase === "glitch" && (
    <motion.div
      className="screen-glitch"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />
  )}
</AnimatePresence>

       {phase === "glitch" ||
 phase === "revealing" ? (
  <div className="scanlines" />
) : null}
      <div className="hero-left">
        <div className="hero-greeting">
          <p className="font-anton text-[1.5rem] text-[#bba47b] opacity-80 mb-2">
            Hi, I'm an 
          </p>
        </div>
        <div className="hero-name">
        <TextPressure
          text="AI-ML ENGINEER"
          fontFamily="Anton"
          textColor="#98824c"
          flex={true}
          weight={true}
          width={false}
          italic={false}
          minFontSize={30}
        />
        <TextPressure
          text="FULL-STACK DEVELOPER"
          fontFamily="Anton"
          textColor="#98824c"
          flex={true}
          weight={true}
          width={false}
          italic={false}
          minFontSize={30}
        />
        </div>
        <p className="font-space-grotesk text-[1rem] text-[#bba47b] opacity-80">
          I build intelligent systems, mobile apps, web applications and developer tools.
        </p>
      </div>

      <div className="hero-right">
        

        <AnimatePresence>
  {phase !== "revealing" &&
phase !== "resolved" && (
    <motion.div
      className="terminal-center"
      exit={{
        opacity: 0,
        scale: .97,
        filter: "blur(12px)"
      }}
    >
      <Terminal>
        <TypingAnimation>
          {"> initialize_portfolio.exe"}
        </TypingAnimation>

        <AnimatedSpan>
          Loading modules...
        </AnimatedSpan>

        <TypingAnimation>
          {"> render_personality"}
        </TypingAnimation>

        {phase === "loading" && (
          <AnimatedSpan>
            {"> loading image..."}
          </AnimatedSpan>
        )}
      </Terminal>
    </motion.div>
  )}
</AnimatePresence>


         <AnimatePresence>
  {(phase === "revealing" || phase === "resolved") && (
    <motion.div
      className="crt-reveal"
      initial={{
        clipPath: "inset(100% 0 0 0)",
        filter: "blur(20px) brightness(.3) contrast(2)"
      }}
      animate={{
        clipPath: "inset(0% 0 0 0)",
        filter: "blur(0px) brightness(1) contrast(1)"
      }}
      transition={{
        duration: 1.5
      }}
    >
      <img
      src={tanishaImg}         
      alt="Tanisha"
        className="hero-image"
      />
    </motion.div>
  )}
</AnimatePresence>



      </div>
    </section>
    </div>
  );
}