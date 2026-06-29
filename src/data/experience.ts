export interface Milestone {
  lap: string;
  title: string;
  company: string;
  date: string;
  description: string;
  tech: string[];
  /** t ∈ [0, 1] — position along the F1 track SVG path */
  t: number;
}

export const MILESTONES: Milestone[] = [
  {
    lap: "01",
    title: "Software Intern",
    company: "Bootee App",
    date: "Jun 2025 – Aug 2025",
    description:
      "Built and deployed an admin management platform for a fashion e-commerce business using React, Next.js, and Supabase. Created dashboards for inventory, product catalog, and order tracking, helping streamline day-to-day operations.",
    tech: ["React", "Next.js", "Node.js", "Supabase"],
    t: 0.15,
  },
  {
    lap: "02",
    title: "Software Intern + QC Testing",
    company: "Print Electronics & Equipments Pvt. Ltd.",
    date: "Jan 2026 – Apr 2026",
    description:
      "Developed a complete HRMS platform with modules for attendance, leave management, payroll, employee records, and role-based access control. Implemented attendance regularization workflows, audit logs, and admin dashboards.",
    tech: ["Flutter", "Node.js", "PostgreSQL", "Postman"],
    t: 0.9,
  },
];
