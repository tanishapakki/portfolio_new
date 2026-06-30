import { useState, useEffect, useRef } from "react";
import { PROJECTS, type Project } from "@/data/projects";

function ExternalLinkIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
    );
}

function GithubIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
        </svg>
    );
}
function PlayIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
    );
}



const TAG_BG: Record<string, string> = {
    "AI/ML": "#1a2f4a",
    "Full Stack": "#1a2f2b",
    "Mobile": "#2f231a",
    "Open Source": "#261a2f",
};

function ImagePlaceholder({ tag, title }: { tag: string; title: string }) {
    const icons: Record<string, string> = {
        "AI/ML": "🤖",
        "Full Stack": "🧩",
        "Mobile": "📱",
        "Open Source": "🌐",
    };
    const bg = TAG_BG[tag] || "#1a1a2e";
    return (
        <div
            style={{
                background: bg,
                border: "1px dashed rgba(213,162,94,0.25)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
                borderRadius: "8px",
                gap: "8px",
            }}
        >
            <span style={{ fontSize: "2rem" }}>{icons[tag] || "💻"}</span>
            <span style={{ color: "rgba(213,162,94,0.5)", fontSize: "0.65rem", fontFamily: "monospace", textAlign: "center", padding: "0 1rem" }}>
        {title.slice(0, 28)}{title.length > 28 ? "…" : ""}
      </span>
            <span style={{ color: "rgba(213,162,94,0.3)", fontSize: "0.55rem", fontFamily: "monospace" }}>
        [ add screenshot ]
      </span>
        </div>
    );
}

// Demo video placeholder
function VideoPlaceholder() {
    return (
        <div
            style={{
                background: "#0d0d1a",
                border: "1px dashed rgba(213,162,94,0.3)",
                borderRadius: "12px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                aspectRatio: "16/9",
                gap: "12px",
                marginTop: "20px",
            }}
        >
            <div
                style={{
                    width: "48px",
                    height: "48px",
                    background: "#1a2f4a",
                    border: "2px solid rgba(213,162,94,0.4)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#D5A25E",
                }}
            >
                <PlayIcon />
            </div>
            <span style={{ color: "rgba(213,162,94,0.5)", fontSize: "0.75rem", fontFamily: "monospace" }}>
        Demo video coming soon
      </span>
        </div>
    );
}

const TAG_COLORS = {
    "AI/ML": "text-[#1A4D94]",
    "Full Stack": "text-[#072B6B]",
    "Mobile": "text-[#357CB6]",
    "Open Source": "text-[#AB6D48]",
};

interface ExpandedCardProps {
    project: Project;
    origin: DOMRect;
    onClose: () => void;
}

function ExpandedCard({ project, onClose }: ExpandedCardProps) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            onClick={onClose}
        >
            <div
                style={{
                    background: "#072B6B",
                    border: "1px solid rgba(213,162,94,.25)",
                    animation: "fadeScaleIn 300ms cubic-bezier(0.16,1,0.3,1) forwards",
                }}
                className="relative w-full max-w-7xl h-[85vh] rounded-3xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >

                <div className="grid grid-cols-[1.1fr_0.9fr] h-full">
                    {/* LEFT SIDE */}
                    <div className="overflow-y-auto p-10">

                    <button
                    onClick={onClose}
                    aria-label="Close project detail"
                    className="absolute top-6 right-6 rounded-full bg-white/10 px-4 py-2 text-white text-sm hover:bg-white/20 transition-colors"
                >
                    Close ×
                </button>

                <div style={{ width: "100%", height: "160px", marginBottom: "20px" }}>
                    {project.image ? (
                        <img
                            src={project.image}
                            alt={project.title}
                            style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }}
                        />
                    ) : (
                        <ImagePlaceholder tag={project.tag} title={project.title} />
                    )}
                </div>


                <span className={`text-xs uppercase tracking-widest font-semibold ${TAG_COLORS[project.tag]}`}>
          {project.tag}
        </span>

                <h2 className="mt-3 text-3xl font-bold text-white leading-tight">
                    {project.title}
                </h2>

                <p className="mt-4 text-zinc-300 leading-relaxed">{project.description}</p>

                {project.detail && (
                    <>
                        <div className="my-6 h-px bg-white/10" />
                        <p className="text-zinc-400 text-sm leading-relaxed">{project.detail}</p>
                    </>
                )}

                {/* Tech stack */}
                <div className="mt-6 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                        <span
                            key={t}
                            style={{
                                background:"#2B2435",
                                color:"#F5F1EB",
                                border:"none",
                            }}
                            className="text-xs font-mono font-semibold  border  text-zinc-300 rounded-full px-3 py-1"
                        >
              {t}
            </span>
                    ))}
                </div>

                {/* Links */}
                <div className="mt-8 flex gap-3">
                    {project.githubUrl && (
                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                background:"#1A4D94",
                                color:"#F8F4EE",
                            }}
                            className="flex items-center gap-2 rounded-full  px-5 py-2 text-white text-sm hover:bg-background:#b56f7d;
transform:translateY(-2px) transition-colors"
                        >
                            <GithubIcon /> GitHub
                        </a>
                    )}
                    {project.liveUrl && (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-white text-sm hover:bg-white/20 transition-colors"
                        >
                            <ExternalLinkIcon /> Live Demo
                        </a>
                    )}
                </div>
            </div>

                    {/* RIGHT SIDE */}
                    <div
                        className="border-l border-white/10 p-8 flex items-center justify-center"
                        style={{
                            background: "#0A1E52",
                        }}
                    >
                        {project.video ? (
                            <video
                                controls
                                autoPlay
                                muted
                                loop
                                className="w-full rounded-2xl shadow-2xl"
                            >
                                <source src={project.video} type="video/mp4" />
                            </video>
                        ) : (
                            <VideoPlaceholder />
                        )}
                    </div>
        </div>
                </div>
        </div>
    );
}

export default function Projects() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [origin, setOrigin] = useState<DOMRect | null>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    const openCard = (index: number) => {
        const el = cardRefs.current[index];
        if (el) setOrigin(el.getBoundingClientRect());
        setActiveIndex(index);
    };

    const closeCard = () => {
        setActiveIndex(null);
        setOrigin(null);
    };

    useEffect(() => {
        document.body.style.overflow = activeIndex !== null ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [activeIndex]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeCard(); };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    return (
        <section className="relative min-h-screen bg-transparent py-24 px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <h2 className="font-anton text-[clamp(4rem,8vw,7rem)] font-black text-[#D5A25E] leading-[0.9] mb-2 tracking-[-2px]">
                    PROJECTS
                </h2>
                <p className="text-[rgba(245,241,235,.72)] text-sm uppercase tracking-widest mb-16">
                    Click any card to explore
                </p>

                <div className="flex flex-col gap-12">
                    {PROJECTS.map((project, index) => {
                        const isDimmed = activeIndex !== null && activeIndex !== index;

                        return (
                            <div
                                key={project.id}
                                className={`transition-all duration-500 ${index % 2 === 0 ? "ml-auto" : "mr-auto"}`}
                                style={{
                                    width: "min(500px, 100%)",
                                    opacity: isDimmed ? 0.2 : 1,
                                    transform: isDimmed ? "scale(0.96)" : "scale(1)",
                                    filter: isDimmed ? "blur(3px)" : "none",
                                }}
                            >
                                <div
                                    ref={(el) => { cardRefs.current[index] = el; }}
                                    onClick={() => openCard(index)}
                                    role="button"
                                    tabIndex={0}
                                    aria-label={`View ${project.title} details`}
                                    onKeyDown={(e) => e.key === "Enter" && openCard(index)}
                                    style={{
                                        background:"#D5A25E",
                                        color:"#071742",
                                        border: "2px solid #2B2435",
                                        height: 280,
                                    }}
                                    className="group relative w-full rounded-3xl border border-white/10  overflow-hidden cursor-pointer transition-all duration-300 hover:border-white/25  hover:-translate-y-2 hover:shadow-[0_18px_40px_rgba(26,77,148,.08)] transition-all duration-300  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                                >
                                    <div
                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        style={{
                                            background: "rgba(43,36,53,.06)",
                                        }}
                                    />
                                    <div className="relative h-full p-8 flex flex-col justify-between">
                                        <div>
                      <span className={`text-xs uppercase tracking-widest font-semibold ${TAG_COLORS[project.tag]}`}>
                        {project.tag}
                      </span>
                                            <h3 className="mt-3 text-2xl font-black text-[#071742] leading-tight">
                                                {project.title}
                                            </h3>
                                            <p className="mt-2 text-sm text-[#072B6B] line-clamp-2 leading-relaxed">
                                                {project.description}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex flex-wrap gap-1.5">
                                                {project.tech.slice(0, 3).map((t) => (
                                                    <span
                                                        key={t}
                                                        style={{
                                                            background: "#071742",
                                                            color: "#D5A25E",
                                                            border: "1px solid rgba(213,162,94,.25)"
                                                        }}
                                                        className="text-[10px] font-mono font-semibold  border rounded-full px-2.5 py-0.5"
                                                    >
                            {t}
                          </span>
                                                ))}
                                                {project.tech.length > 3 && (
                                                    <span className="text-[10px] font-mono text-zinc-500">
                            +{project.tech.length - 3}
                          </span>
                                                )}
                                            </div>
                                            <span className="text-[#4D3043] text-xs font-semibold group-hover:text-[#2B2435] transition-colors">
                        View →
                      </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Backdrop */}
            <div
                onClick={closeCard}
                className="fixed inset-0 z-40 transition-all duration-500"
                style={{
                    opacity: activeIndex !== null ? 1 : 0,
                    pointerEvents: activeIndex !== null ? "auto" : "none",
                    background:"rgba(35,28,41,.78)",
                    backdropFilter:"blur(18px)"
                }}
                aria-hidden="true"
            />

            {activeIndex !== null && origin && (
                <ExpandedCard
                    project={PROJECTS[activeIndex]}
                    origin={origin}
                    onClose={closeCard}
                />
            )}

            <style>{`
        @keyframes fadeScaleIn {
          from { opacity: 0; transform: scale(0.95) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
        </section>
    );
}