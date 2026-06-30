export type ProjectTag = "AI/ML" | "Full Stack" | "Mobile" | "Open Source";

export interface Project {
  id: string;
  title: string;
  tag: ProjectTag;
  description: string;
  /** 2–4 sentence detail shown in the expanded card */
  detail: string;
  tech: string[];
  githubUrl?: string;
  liveUrl?: string;
  /** Relative path or URL to a project screenshot/thumbnail */
  image?: string;
  video?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "legal-aid-chatbot",
    title: "AI Powered Legal Aid Chatbot for Women Safety",
    tag: "AI/ML",
    description:
      "An NLP-powered chatbot providing accessible legal guidance on women's safety laws, IPC sections, and emergency contacts — built to bridge the gap between legal knowledge and those who need it most.",
    detail:
      "Trained a domain-specific intent classifier on Indian legal statutes. Integrated a RAG pipeline to retrieve relevant IPC/POCSO sections dynamically. Built a React + FastAPI frontend with multilingual support and WhatsApp webhook integration for rural reach.",
    tech: ["Python", "FastAPI", "MongoDB", "React Native", "NLP"],
    githubUrl: "https://github.com/tanishapakki/app-in-law2",
  },

    {
        id: "quotation-tracker",
        title: "Quotation Tracker",
        tag: "Full Stack",
        description:
            "End-to-end HR management system with attendance regularization, leave workflows, payroll, and role-based access control — deployed and actively used by 50+ employees.",
        detail:
            "Architected a Flutter mobile app consuming REST APIs built with Node.js + PostgreSQL. Implemented audit logs, admin dashboards for payroll reporting, and a multi-level approval workflow engine. Delivered with QC testing using Postman automated collections.",
        tech: ["Flutter", "Node.js", "PostgreSQL", "Postman", "REST APIs"],
    },
  {
    id: "sign-language-detection",
    title: "Sign Language Detection System",
    tag: "AI/ML",
    description:
      "Real-time Indian Sign Language (ISL) recognition using MediaPipe hand-landmark detection and a custom CNN classifier — achieving 94% accuracy across 26 gestures.",
    detail:
      "Built a dataset of 5,200 frames using OpenCV. Trained a lightweight MobileNetV2 transfer-learning model. Deployed as a browser-accessible web app using TensorFlow.js, enabling zero-install usage for accessibility advocates.",
    tech: ["Python", "TensorFlow", "MediaPipe", "OpenCV", "TensorFlow.js"],
    githubUrl: "https://github.com/tanishapakki",
  },
];
