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
    rotation: 8,
    hoverStyles: { bgColor: "#9e2a2b", textColor: "#d4b06a" },
  },
  {
    label: "projects",
    href: "#projects",
    ariaLabel: "Projects",
    rotation: 8,
    hoverStyles: { bgColor: "#9e2a2b", textColor: "#d4b06a" },
  },
  {
    label: "contact",
    href: "#contact",
    ariaLabel: "Contact",
    rotation: -8,
    hoverStyles: { bgColor: "#9e2a2b", textColor: "#d4b06a" },
  },
];
