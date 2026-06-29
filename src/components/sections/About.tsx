import "../About.css";


import camera from "../../assets/camera.webp";
import palette from "../../assets/pallete.png";
import yarn from "../../assets/wool.png";
import typewriter from "../../assets/typewriter.png";
import tv from "../../assets/tv.webp";
import soda from "../../assets/soda.png";
import pizza from "../../assets/pizza.webp";
import shoes from "../../assets/shoes.png";
import lipgloss from "../../assets/lipgloss.png";

import books from "../../assets/books.png";
import gramophone from "../../assets/gramophone.png";
import lipliner from "../../assets/lipliner.png";
import clapper from "../../assets/clap.png";
import flowers from "../../assets/flowers.png";
import magazines from "../../assets/magazine.png";
import cap from "../../assets/cap.png";
import cat from "../../assets/cat.png";
import coffee from "../../assets/coffee.png";

import dog from "../../assets/dog.png";
import popcorn from "../../assets/popcorn.png";
import music from "../../assets/music.png";
import coffeeBeans from "../../assets/coffeebeans.webp";
import mascara from "../../assets/mascara.png";
import bookshelf from "../../assets/bookshelf.png";
import {MacbookScroll} from "@/components/ui/macbook-scroll.tsx";
import AboutScreen from "@/components/AboutScreen.tsx";
import {useEffect, useRef, useState} from "react";


export default function About(){
    const [active, setActive] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setActive(entry.isIntersecting);
            },
            {
                threshold: 0.2,
            }
        );

        if (ref.current) observer.observe(ref.current);

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={ref}
            className={`about-page ${active ? "active" : "exit"}`}
        >
            <svg>
                <filter id='roughpaper'>
                    <feTurbulence type="fractalNoise" baseFrequency='0.04' result='noise' numOctaves="5" />

                    <feDiffuseLighting in='noise' lighting-color='#fff' surfaceScale='2'>
                        <feDistantLight azimuth='45' elevation='60' />
                    </feDiffuseLighting>
                </filter>
            </svg>

            {/* LEFT SIDE */}
            <img src={camera} className="sticker camera" alt="" />
            <img src={palette} className="sticker palette" alt="" />

            <img src={yarn} className="sticker yarn" alt="" />
            <img src={typewriter} className="sticker typewriter" alt="" />

            <img src={tv} className="sticker tv" alt="" />
            <img src={soda} className="sticker soda" alt="" />
            <img src={pizza} className="sticker pizza" alt="" />
            <img src={shoes} className="sticker shoes" alt="" />
            <img src={lipgloss} className="sticker lipgloss" alt="" />

            {/* RIGHT SIDE */}
            <img src={books} className="sticker books" alt="" />
            <img src={gramophone} className="sticker gramophone" alt="" />

            <img src={lipliner} className="sticker lipliner" alt="" />
            <img src={clapper} className="sticker clapper" alt="" />

            <img src={flowers} className="sticker flowers" alt="" />
            <img src={magazines} className="sticker magazines" alt="" />

            <img src={cap} className="sticker cap" alt="" />
            <img src={cat} className="sticker cat" alt="" />
            <img src={coffee} className="sticker coffee" alt="" />

            {/* NEW ITEMS */}


            <img src={music} className="sticker music" alt="" />

            <img src={dog} className="sticker dog" alt="" />
            <img src={popcorn} className="sticker popcorn" alt="" />

            <img src={mascara} className="sticker mascara" alt="" />

            <img src={coffeeBeans} className="sticker coffee-beans" alt="" />
            <img src={bookshelf} className="sticker bookshelf" alt="" />

            {/* CENTER */}
            <div className="about-content">
                {/*<img src={laptop} className="laptop" alt="" />*/}
                <MacbookScroll
                    showGradient={false}
                >
                    <AboutScreen  screenReady={true} />

                </MacbookScroll>
            </div>


        </section>
    );
}