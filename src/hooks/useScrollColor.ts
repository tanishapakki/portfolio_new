import { useState, useEffect } from "react";


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
