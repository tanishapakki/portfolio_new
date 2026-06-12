import { useEffect, useState } from "react";
import './Hero.css'
import TextPressure from './TextPressure.tsx';
import { AnimatedSpan, Terminal, TypingAnimation } from "./ui/teminal.tsx";


export default function Hero() { 


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
</div>
      </div>

      
    </section>
  );
}