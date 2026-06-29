import { useState, useEffect } from "react";

/**
 * Observes elements with a `data-color` attribute and returns
 * the color of whichever section is most visible in the viewport.
 *
 * Using threshold: 0.15 prevents jittery changes at the very edge
 * of sections (vs the original threshold: 0 which fired too eagerly).
 */
export function useScrollColor(defaultColor = "#F5EFE6"): string {
  const [bgColor, setBgColor] = useState(defaultColor);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const color = (entry.target as HTMLElement).dataset.color;
            if (color) setBgColor(color);
          }
        });
      },
      { threshold: 0.15 }
    );

    const targets = document.querySelectorAll<HTMLElement>("[data-color]");
    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return bgColor;
}
