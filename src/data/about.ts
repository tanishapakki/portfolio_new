// ─── ABOUT DATA ──────────────────────────────────────────────────────────────
// Edit everything here — nothing in AboutScreen.tsx or About.tsx needs to change.

export const ABOUT = {
    greeting: "HI,",

    bio: [
        "I started with AI because I loved solving problems.",
        "Then, somewhere between training models, debugging APIs at 2 am, building and shipping products...",
        "I don't just enjoy writing code.",
        "Today, I work at the intersection of AI, software engineering and design.",
    ],

    techStack: {
        "AI & ML": ["NLP", "Computer Vision"],
        Frontend:  ["React", "Next.js", "TypeScript", "JavaScript"],
        Backend:   ["Node.js", "REST APIs"],
    },
} as const;
