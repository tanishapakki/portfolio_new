import {useState } from "react";
import './Hero.css'
import TextPressure from './ui/TextPressure.tsx';
import { Terminal }from "./ui/terminal.tsx";
import { motion, AnimatePresence } from "framer-motion";
import tanishaImg from "../assets/tanisha.png";


export default function Hero() {
    const [phase, setPhase] = useState<
        "terminal" |
        "loading" |
        "glitch" |
        "revealing" |
        "resolved"
    >("terminal");


    return (
        <>
            <section  className={`hero ${
                phase === "glitch" ? "hero-glitching" : ""
            }`}>

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

                <AnimatePresence>
                    {(phase === "revealing" || phase === "resolved") && (
                        <>
                            <motion.div
                                className="hero-name"
                                initial={{
                                    opacity: 0,
                                    y: 40,
                                    scale: 1.1,
                                    filter: "blur(20px)"
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                    filter: "blur(0px)"
                                }}
                                transition={{
                                    duration: 1.2
                                }}
                            >
                                <TextPressure
                                    text="TANISHA"
                                    fontFamily="Anton"
                                    textColor="#e09f3e"
                                    flex
                                    weight
                                    width={false}
                                    italic={false}
                                    minFontSize={300}
                                />
                            </motion.div>
                            <div className="hero-roles">

                                <motion.div
                                    // className="left-caption"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: .8 }}
                                >
                                    AI/ML ENGINEER
                                </motion.div>
                                <span className="divider"></span>

                                <motion.div
                                    // className="right-caption"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: .8 }}
                                >
                                    FULL STACK DEVELOPER
                                </motion.div>
                            </div>
                        </>
                    )}
                </AnimatePresence>

                <div className="hero-center">
                    <AnimatePresence>
                        {
                            phase !== "resolved" && (
                                <motion.div
                                    className="terminal-center"
                                    animate={{
                                        opacity: phase === "revealing" ? 0 : 1,

                                        scale:
                                            phase === "revealing"
                                                ? 2.2
                                                : 1,

                                        filter:
                                            phase === "revealing"
                                                ? "blur(25px)"
                                                : "blur(0px)"
                                    }}

                                    transition={{
                                        duration: 1,
                                        ease: "easeIn"
                                    }}
                                >
                                    <Terminal

                                        username = "Tanisha's-Laptop"
                                        commands={[
                                            "boot tanisha.exe",
                                            "load profile",
                                            "launch portfolio"
                                        ]}

                                        outputs={{
                                            0: [
                                                "Initializing Tanisha Pakki...",
                                                "Status: Online"
                                            ],
                                            1: [
                                                "Role: Software Developer",
                                                "Focus: AI + Full Stack Development"
                                            ],
                                            3: [
                                                "Portfolio ready."
                                            ]

                                        }} onComplete={() => {
                                        setPhase("glitch");

                                        setTimeout(() => {
                                            setPhase("revealing");
                                        }, 300);

                                        setTimeout(() => {
                                            setPhase("resolved");
                                        }, 2000);
                                    }}/>
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
                {/* {phase === "resolved" && (
  <motion.p
    className="hero-tagline"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    Designing intelligent systems, building scalable products,
    and turning ambitious ideas into real experiences.
  </motion.p>
)} */}
            </section>
        </>
    );
}