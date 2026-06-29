export interface NavItem {
  label: string;
  href: string;
  ariaLabel: string;
  rotation: number;
  hoverStyles?: { bgColor: string; textColor: string };
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: "home",
    href: "#home",
    ariaLabel: "Home",
    rotation: -8,
    hoverStyles: { bgColor: "#9e2a2b", textColor: "#d4b06a" },
  },
  {
    label: "about",
    href: "#about",
    ariaLabel: "About",
    rotation: 5,
    hoverStyles: { bgColor: "#d4b06a", textColor: "#9e2a2b" },
  },
  {
    label: "projects",
    href: "#projects",
    ariaLabel: "Projects",
    rotation: 8,
    hoverStyles: { bgColor: "#2F2A35", textColor: "#e6d389" },
  },

    {
        label: "experience",
        href: "#experience",
        ariaLabel: "Experience",
        rotation: -8,
        hoverStyles: { bgColor: "#710912", textColor: "#0D0DOD" },
    },
  {
    label: "contact",
    href: "#contact",
    ariaLabel: "Contact",
    rotation: 8,
    hoverStyles: { bgColor: "#1c1c1e", textColor: "#6f0d1b" },
  },
];
