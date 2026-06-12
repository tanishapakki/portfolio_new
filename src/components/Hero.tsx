import { useEffect, useState } from "react";
import './Hero.css'
import TextPressure from './TextPressure.tsx';
import { AnimatedSpan, Terminal, TypingAnimation } from "./ui/teminal.tsx";
import { motion } from "framer-motion";


export default function Hero() { 
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowImage(true);
    }, 4000); // adjust later

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="hero">
      <div className="hero-left">
                <TextPressure
          text="TANISHA"
          fontFamily="Anton"
          textColor="#d5b893"
          flex={true}
          weight={true}
          width={true}
          italic={false}
          minFontSize={40}
        />
               <TextPressure
          text="PAKKI"
          fontFamily="Anton"
          textColor="#d5b893"
          flex={true}
          weight={true}
          width={true}
          italic={false}
          minFontSize={40}
        />
        <p>AI ML Engineer & Full Stack Developer</p>
      </div>

      <div className="hero-right">
        <div className="terminal-wrapper">
           <motion.div
      animate={{
        opacity: showImage ? 0 : 1,
        scale: showImage ? 0.95 : 1,
      }}
      transition={{ duration: 0.8 }}
    >
  <Terminal className="!bg-white !border-gray-200 !text-gray-800 shadow-lg">
    <TypingAnimation className="!text-gray-800">
      {"> initialize_portfolio.exe"}
    </TypingAnimation>
    <AnimatedSpan className="!text-blue-500">
      Loading modules...
    </AnimatedSpan>
    <TypingAnimation className="!text-gray-800">
      {"> render_personality"}
    </TypingAnimation>
      <AnimatedSpan> {"> rendering..."}</AnimatedSpan>
    <AnimatedSpan className="!text-blue-500">
      [████████████████████] 100%
    </AnimatedSpan>
  </Terminal>
  </motion.div>

    <motion.img
      src="../src/assets/tanisha.png"
      alt="Tanisha"
      className="hero-image"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: showImage ? 1 : 0,
        scale: showImage ? 1 : 0.8,
      }}
      transition={{ duration: 1 }}
    />

</div>
      </div>

      
    </section>
  );
}