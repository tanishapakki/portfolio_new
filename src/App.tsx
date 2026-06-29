import "./App.css";
import BubbleMenu from "@/components/ui/BubbleMenu";
import Hero from "./components/Hero";
import About from "./components/sections/About.tsx";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/sections/Contact";
import { NAV_ITEMS } from "./data/navigation";
import { useScrollColor } from "./hooks/useScrollColor";

export default function App() {
  const bgColor = useScrollColor("#9e2a2b");

  return (
    <>
      <BubbleMenu
        items={NAV_ITEMS}
        logo={undefined}
        className={undefined}
        style={undefined}
        onMenuClick={undefined}
      />

      {/* Smooth background color that transitions between sections */}
      <div
        className="page-bg"
        style={{ backgroundColor: bgColor }}
        aria-hidden="true"
      />

      <section id="home" data-color="#9e2a2b" className="min-h-screen">
        <Hero />
      </section>

      <section id="about" data-color="transparent" className="min-h-[250vh]">
        <About />
      </section>

      <section id="projects" data-color="#2F2A35" className="min-h-screen">
        <Projects />
      </section>

      <section id="experience" data-color="#0a0a0f" className="min-h-screen">
        <Experience />
      </section>

      <Contact />
    </>
  );
}
