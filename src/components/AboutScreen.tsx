import monitor from "../assets/abt-comp.jpg";
import "./About.css";
import {EncryptedText} from "@/components/ui/encrypted-text.tsx";
import {useRef} from "react";
interface AboutScreenProps {
    screenReady?: boolean;
}
export default function AboutScreen({
                                        screenReady=false,
                                    }: AboutScreenProps) {
    const ref = useRef<HTMLDivElement>(null);
    return (
        <div ref={ref} className="about-screen p-5">

            <div className="about-container">
                <div className="about-body">
                    <div className="about-heading">HI,</div>
                    <div className="about-text"><p>
                        I started with AI because I loved solving problems.<br/>
                            Then, somewhere between training models, debugging
                            APIs at 2 am, building and shipping products...
                        <br/>
                            I don't just enjoy writing code.<br/>
                        <br/>
                            Today, I work at the intersection of AI,
                            software engineering and design.
                        </p></div>
                </div>

                <div className="monitor-wrapper">
                    <img src={monitor} className="monitor" />

                    <div className="monitor-screen">
                                <div className="text-xl">&ensp; &emsp; TECHSTACK.exe</div>

                                <br />

                                <div>[AI & ML]</div>
                                <div>└─ {screenReady && (<EncryptedText revealDelayMs={50} text="NLP, Computer Vision" />)}</div>

                                <br />

                                <div>[Frontend]</div>
                                <div>├─ {screenReady && (<EncryptedText revealDelayMs={100} text="React" />)}</div>
                                <div>├─ {screenReady && (<EncryptedText revealDelayMs={150} text="Next.js" />)}</div>
                                <div>├─ {screenReady && (<EncryptedText revealDelayMs={150} text="TypeScript" />)}</div>
                                <div>└─ {screenReady && (<EncryptedText revealDelayMs={200} text="JavaScript" />)}</div>

                                <br />

                                <div>[Backend]</div>
                                <div>├─ {screenReady && (<EncryptedText text="Node.js" />)}</div>
                                <div>└─ {screenReady && (<EncryptedText text="REST APIs" />)}</div>

                                <br />

                                <div>A:\&gt; _</div>
                        </div>
                    </div>
                </div>

            </div>


    );
}