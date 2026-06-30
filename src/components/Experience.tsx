import { useState, useEffect, useRef, useMemo } from "react";
import {type Milestone, MILESTONES} from "@/data/experience";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";

// ─── DATA ────────────────────────────────────────────────────────────────────


type CarPosition = {
    x: number;
    y: number;
    angle: number;
};

type Particle = {
    id: number;
    x: number;
    y: number;
    angle: number;
};


// ─── SVG PATH ────────────────────────────────────────────────────────────────
// A winding single-line track path through a tall viewBox (0 0 400 2400)
// const TRACK_PATH =
//     "M 200 60 C 320 80, 360 160, 300 240 C 240 320, 100 340, 80 440 C 60 540, 200 580, 280 660 C 360 740, 380 840, 300 920 C 220 1000, 80 1000, 60 1100 C 40 1200, 160 1260, 240 1340 C 320 1420, 360 1520, 280 1600 C 200 1680, 80 1680, 60 1780 C 40 1880, 140 1940, 200 2020 C 260 2100, 320 2180, 200 2340";
const TRACK_PATH =
    "M 200 60 C 320 120, 340 220, 250 320 C 160 420, 100 500, 180 620 C 260 740, 320 820, 200 950";
// ─── UTILITIES ───────────────────────────────────────────────────────────────
function getPointAtT(svgEl: SVGPathElement | null,
                     t: number): CarPosition {
    if (!svgEl) return { x: 200, y: 60, angle: 0 };
    const len = svgEl.getTotalLength();
    const p1 = svgEl.getPointAtLength(t * len);
    const p2 = svgEl.getPointAtLength(Math.min((t + 0.002) * len, len));
    const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI);
    return { x: p1.x, y: p1.y, angle };
}

interface F1CarProps {
    angle: number;
    scrolling: boolean;
}

function F1Car({
                   angle,
                   scrolling,
               }: F1CarProps) {
    return (
        <g transform={`rotate(${angle - 90})`}>
            {/* Body */}
            <rect x="-9" y="-24" width="18" height="48" rx="5" fill="#E10600" />
            {/* Nose cone */}
            <polygon points="0,-36 -5,-24 5,-24" fill="#B00500" />
            {/* Cockpit */}
            <rect x="-5" y="-10" width="10" height="14" rx="3" fill="#1a1a2e" />
            {/* Rear wing */}
            <rect x="-14" y="18" width="28" height="4" rx="2" fill="#B00500" />
            {/* Front wing */}
            <rect x="-12" y="-30" width="24" height="3" rx="1" fill="#B00500" />
            {/* Wheels – animated rotation */}
            {[
                [-11, -16],
                [11, -16],
                [-11, 14],
                [11, 14],
            ].map(([wx, wy], i) => (
                <g key={i} transform={`translate(${wx},${wy})`}>
                    <circle r="6" fill="#111" />
                    <circle r="4" fill="#222" />
                    <motion.line
                        x1="0" y1="-4" x2="0" y2="4"
                        stroke="#555" strokeWidth="1.5"
                        animate={scrolling ? { rotate: 360 } : {}}
                        transition={{ duration: 0.3, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.line
                        x1="-4" y1="0" x2="4" y2="0"
                        stroke="#555" strokeWidth="1.5"
                        animate={scrolling ? { rotate: 360 } : {}}
                        transition={{ duration: 0.3, repeat: Infinity, ease: "linear" }}
                    />
                </g>
            ))}
            {/* Halo */}
            <ellipse cx="0" cy="-8" rx="6" ry="2" fill="none" stroke="#FFD700" strokeWidth="1.5" />
            {/* Speed glow */}
            {scrolling && (
                <motion.ellipse
                    cx="0" cy="0" rx="14" ry="28"
                    fill="none" stroke="#E10600"
                    strokeWidth="2"
                    initial={{ opacity: 0.6, scale: 1 }}
                    animate={{ opacity: 0, scale: 1.6 }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                />
            )}
        </g>
    );
}
interface SpeedParticleProps {
    x: number;
    y: number;
    angle: number;
}

function SpeedParticle({
                           x,
                           y,
                           angle,
                       }: SpeedParticleProps) {
    const rad = ((angle + 90) * Math.PI) / 180;
    const dx = -Math.cos(rad) * 30;
    const dy = -Math.sin(rad) * 30;
    return (
        <motion.circle
            cx={x} cy={y} r={2}
            fill="#E10600"
            initial={{ opacity: 0.8, cx: x, cy: y }}
            animate={{ opacity: 0, cx: x + dx + (Math.random() - 0.5) * 20, cy: y + dy }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        />
    );
}
interface CheckpointCardProps {
    milestone: Milestone;
    active: boolean;
    side: "left" | "right";
}

function CheckpointCard({
                            milestone,
                            active,
                            side,
                        }: CheckpointCardProps) {
    const isLeft = side === "left";
    return (
        <AnimatePresence>
            {active && (
                <motion.div
                    initial={{ opacity: 0, x: isLeft ? -60 : 60, y: 20 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    exit={{ opacity: 0, x: isLeft ? -40 : 40 }}
                    transition={{ type: "spring", stiffness: 120, damping: 18 }}
                    className={`absolute ${isLeft ? "right-[110%]" : "left-[110%]"} w-64 md:w-72 top-1/2 -translate-y-1/2`}
                >
                    <motion.div
                        className="relative rounded-xl   bg-black/80  p-4 "
                        transition={{ duration: 1.2, times: [0, 0.3, 1] }}
                    >
                        {/* Lap badge */}
                        <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-semibold text-red-400 bg-zinc-800 rounded-md px-2 py-1">
                LAP {milestone.lap}
              </span>
                            <span className="text-[10px] text-gray-500 font-mono">{milestone.date}</span>
                        </div>
                        <h3 className="text-white font-bold text-sm leading-tight">{milestone.title}</h3>
                        <p className="text-red-400 text-xs font-medium mt-0.5 mb-2">{milestone.company}</p>
                        <p className="text-gray-400 text-xs leading-relaxed mb-3">{milestone.description}</p>
                        {/* Tech badges */}
                        <div className="flex flex-wrap gap-1">
                            {milestone.tech.map((t:string) => (
                                <span
                                    key={t}
                                    className="text-[9px] font-mono font-semibold bg-gray-800 border border-gray-700 text-gray-300 rounded px-1.5 py-0.5"
                                >
                  {t}
                </span>
                            ))}
                        </div>
                        {/* Connector line */}
                        <div
                            className={`absolute top-1/2 -translate-y-1/2 h-px w-8 bg-red-600/60 ${isLeft ? "-right-8" : "-left-8"}`}
                        />

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
interface HUDProps {
    lap: string;
    progress: number;
    speed: number;
}


// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function Experience() {
    const containerRef = useRef<HTMLDivElement | null>(null);

    const pathRef = useRef<SVGPathElement | null>(null);
    const [carPos, setCarPos] =
        useState<CarPosition>({
            x: 200,
            y: 60,
            angle: 0,
        });

    const [particles, setParticles] =
        useState<Particle[]>([]);

    const [activeCheckpoints, setActiveCheckpoints] =
        useState<Set<number>>(new Set());
    const [scrolling, setScrolling] = useState(false);
    const scrollTimer = useRef<ReturnType<typeof setTimeout>>();
    const particleTimer = useRef<ReturnType<typeof setTimeout>>();
    const lastT = useRef<number>(0);

    const { scrollYProgress } = useScroll({ target: containerRef });
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

    // Current lap
    const currentLap = useMemo(() => {
        const active = [...activeCheckpoints];
        if (active.length === 0) return "01";
        const sorted = active.sort((a:number, b:number) => a - b);
        return MILESTONES[sorted[sorted.length - 1]]?.lap ?? "01";
    }, [activeCheckpoints]);
    const [checkpointPositions, setCheckpointPositions] = useState<CarPosition[]>([]);
    const [hudProgress, setHudProgress] = useState(0);
    const [speed, setSpeed] = useState(0);
    const prevProgressRef = useRef(0);

    useEffect(() => {
        const unsubscribe = smoothProgress.onChange((val:number) => {
            const t = Math.max(0, Math.min(1, val));
            const delta = Math.abs(t - prevProgressRef.current);
            prevProgressRef.current = t;

            // Move car
            if (pathRef.current) {
                const pos = getPointAtT(pathRef.current, t);
                setCarPos(pos);
            }
            setHudProgress(t * 100);

            // Speed based on delta
            const spd = Math.min(delta * 8000, 100);
            setSpeed(spd);

            // Detect checkpoint crossings
            MILESTONES.forEach((m, i) => {
                const passed = t >= m.t - 0.03;
                setActiveCheckpoints((prev) => {
                    const next = new Set(prev);
                    if (passed) next.add(i);
                    else next.delete(i);
                    return next;
                });
            });

            // Scroll state
            setScrolling(true);
            clearTimeout(scrollTimer.current);
            scrollTimer.current = setTimeout(() => setScrolling(false), 200);

            // Spawn particles
            if (delta > 0.001) {
                clearTimeout(particleTimer.current);
                particleTimer.current = setTimeout(() => {
                    if (pathRef.current) {
                        const pos = getPointAtT(pathRef.current, t);
                        setParticles((prev) => [
                            ...prev.slice(-12),
                            { id: Date.now() + Math.random(), ...pos },
                        ]);
                    }
                }, 30);
            }

            lastT.current = t;
        });
        return () => {
            unsubscribe();
            clearTimeout(scrollTimer.current);
            clearTimeout(particleTimer.current);
        };
    }, [smoothProgress]);

    useEffect(() => {
        if (!pathRef.current) return;

        const positions = MILESTONES.map((m) =>
            getPointAtT(pathRef.current, m.t)
        );

        setCheckpointPositions(positions);
    }, []);

    // SVG viewport & scaling
    const VIEWBOX_W = 400;
    // const VIEWBOX_H = 2400;
    const VIEWBOX_H =1000;

    return (
        <>

        <div
            ref={containerRef}
            className="relative w-full mt-20 hidden lg:block"
            style={{ height: "250vh", background: "transparent" }}
        >
            <div className="sticky top-0 h-screen overflow-hidden">

                <div className="sticky top-0 w-full h-screen overflow-hidden">
                    {/* Ambient glow */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-900/10 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-red-800/5 rounded-full blur-2xl" />
                    </div>

                    {/* Title */}
                    <div className="absolute top-6 left-6 z-10">

                        <h2 className="font-anton text-white text-6xl md:text-[clamp(4rem,8vw,7rem)] leading-none mt-1 z-0">
                            EXPERIENCE
                        </h2>

                        <p className="text-zinc-400 text-sm mt-2 uppercase tracking-widest">
                            Scroll to race forward
                        </p>
                    </div>

                    {/* SVG Track */}
                    <motion.svg
                        viewBox={`${carPos.x - 150} ${carPos.y - 250} 300 500`}
                        className="absolute inset-0 w-full h-full"
                    >
                        <defs>
                            <filter id="glow">
                                <feGaussianBlur stdDeviation="3" result="blur" />
                                <feMerge>
                                    <feMergeNode in="blur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                            <linearGradient id="trackGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#E10600" stopOpacity="0.6" />
                                <stop offset="50%" stopColor="#FF4444" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="#E10600" stopOpacity="0.8" />
                            </linearGradient>
                        </defs>


                        {/* Track surface */}
                        <path
                            d={TRACK_PATH}
                            fill="none"
                            stroke="#1a1a1a"
                            strokeWidth="18"
                            strokeLinecap="round"
                        />
                        {/* Track inner line */}
                        <path
                            d={TRACK_PATH}
                            fill="none"
                            stroke="url(#trackGrad)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeDasharray="8 4"
                            opacity="0.5"
                        />
                        {/* Hidden path for getPointAtLength */}
                        <path
                            ref={pathRef}
                            d={TRACK_PATH}
                            fill="none"
                            stroke="none"
                        />

                        {/* Checkpoint markers */}
                        {checkpointPositions.map((pos, i) => {
                            const m = MILESTONES[i];
                            const isActive = activeCheckpoints.has(i);

                            const side = i % 2 === 0 ? "right" : "left";

                            return (
                                <g key={i} transform={`translate(${pos.x}, ${pos.y})`}>
                                    <motion.circle
                                        r={isActive ? 10 : 7}
                                        fill={isActive ? "#E10600" : "#333"}
                                        stroke={isActive ? "#FFD700" : "#555"}
                                        strokeWidth="2"
                                        filter={isActive ? "url(#glow)" : undefined}
                                        animate={isActive ? { r: [8, 11, 8] } : {}}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    />

                                    <text
                                        y="4"
                                        textAnchor="middle"
                                        fill={isActive ? "#FFD700" : "#888"}
                                        fontSize="7"
                                        fontFamily="monospace"
                                        fontWeight="bold"
                                    >
                                        {m.lap}
                                    </text>

                                    <foreignObject
                                        x={side === "right" ? 20 : -320}
                                        y={-80}
                                        width="290"
                                        height="200"
                                        style={{ overflow: "visible" }}
                                    >
                                        <CheckpointCard
                                            milestone={m}
                                            active={isActive}
                                            side={side === "right" ? "left" : "right"}
                                        />
                                    </foreignObject>
                                </g>
                            );
                        })}

                        {/* Speed particles */}
                        {particles.map((p) => (
                            <SpeedParticle key={p.id} x={p.x} y={p.y} angle={p.angle} />
                        ))}

                        {/* Car */}
                        <g transform={`translate(${carPos.x}, ${carPos.y})`} filter="url(#glow)">
                            <F1Car angle={carPos.angle} scrolling={scrolling} />
                        </g>
                    </motion.svg>

                    {/* Scroll indicator */}
                    <motion.div
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                        animate={{ opacity: hudProgress > 5 ? 0 : 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.div
                            className="w-5 h-8 border-2 border-gray-600 rounded-full flex items-start justify-center pt-1"
                            animate={{}}
                        >
                            <motion.div
                                className="w-1 h-2 bg-red-500 rounded-full"
                                animate={{ y: [0, 12, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            />
                        </motion.div>
                        <span className="text-gray-600 text-[10px] font-mono tracking-widest">SCROLL</span>
                    </motion.div>
                </div>

            </div>
        </div>
    <div className="lg:hidden px-5 py-10">
        <h2 className="font-anton text-5xl text-white mb-3">
            EXPERIENCE
        </h2>

        <p className="text-zinc-400 text-sm uppercase tracking-widest mb-10">
            Career Journey
        </p>

        <div className="relative border-l-2 border-red-600 ml-4">
            {MILESTONES.map((m) => (
                <div
                    key={m.lap}
                    className="relative mb-10 pl-8"
                >
                    {/* checkpoint */}
                    <div className="absolute -left-[11px] top-2 w-5 h-5 rounded-full bg-red-600 border-4 border-[#0b0b15]" />

                    <div className="rounded-2xl bg-black/70 border border-zinc-800 p-5">
                    <span className="text-[10px] font-semibold text-red-400">
                        LAP {m.lap}
                    </span>

                        <p className="text-xs text-zinc-500 mt-1">
                            {m.date}
                        </p>

                        <h3 className="mt-3 text-lg font-bold text-white">
                            {m.title}
                        </h3>

                        <p className="text-red-400 text-sm">
                            {m.company}
                        </p>

                        <p className="mt-3 text-zinc-400 text-sm leading-7">
                            {m.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-4">
                            {m.tech.map((tech) => (
                                <span
                                    key={tech}
                                    className="px-2 py-1 rounded bg-zinc-800 text-[10px] text-zinc-300"
                                >
                                {tech}
                            </span>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
        </>
    );
}