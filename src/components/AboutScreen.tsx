import monitor from "../assets/abt-comp.jpg";
import "./About.css";
import { EncryptedText } from "@/components/ui/encrypted-text.tsx";
import { useRef } from "react";
import { ABOUT } from "@/data/about";

interface AboutScreenProps {
    screenReady?: boolean;
}

export default function AboutScreen({ screenReady = false }: AboutScreenProps) {
    const ref = useRef<HTMLDivElement>(null);

    return (
        <div ref={ref} className="about-screen p-5">
            <div className="about-container">
                {/* ── Left: Bio ── */}
                <div className="about-body">
                    <div className="about-heading">{ABOUT.greeting}</div>
                    <div className="about-text">
                        <p>
                            {ABOUT.bio.map((line, i) => (
                                <span key={i}>
                  {line}
                                    {i < ABOUT.bio.length - 1 && <br />}
                </span>
                            ))}
                        </p>
                    </div>
                </div>

                {/* ── Right: Tech-stack terminal ── */}
                <div className="monitor-wrapper">
                    <img src={monitor} className="monitor" alt="retro monitor" />

                    <div className="monitor-screen">
                        <div className="text-xl">&ensp;&emsp;TECHSTACK.exe</div>
                        <br />

                        {(
                            Object.entries(ABOUT.techStack) as [
                                string,
                                readonly string[]
                            ][]
                        ).map(([category, items], catIdx) => (
                            <div key={category}>
                                <div>[{category}]</div>
                                {items.map((item, i) => {
                                    const isLast = i === items.length - 1;
                                    const delayMs = (catIdx * items.length + i + 1) * 50;
                                    return (
                                        <div key={item}>
                                            {isLast ? "└─ " : "├─ "}
                                            {screenReady && (
                                                <EncryptedText
                                                    revealDelayMs={delayMs}
                                                    text={item}
                                                />
                                            )}
                                        </div>
                                    );
                                })}
                                <br />
                            </div>
                        ))}

                        <div>A:\&gt; _</div>
                    </div>
                </div>
            </div>
        </div>
    );
}