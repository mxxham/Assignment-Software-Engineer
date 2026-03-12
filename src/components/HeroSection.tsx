import { useState, useEffect, CSSProperties } from "react";
import { MousePosition } from "../types";
import { floatingParticles } from "../data/products";

interface HeroSectionProps {
  mouse: MousePosition;
  scrollY: number;
}

const HERO_LETTERS = "OBSIDIAN".split("");

const ORB_CONFIG = [
  { x: 20, y: 30, size: 300, color: "#FF4D4D", depth: 0.03 },
  { x: 75, y: 60, size: 250, color: "#4DFFB4", depth: 0.05 },
  { x: 50, y: 80, size: 200, color: "#B44DFF", depth: 0.04 },
  { x: 85, y: 20, size: 180, color: "#FFD94D", depth: 0.06 },
];

export default function HeroSection({ mouse, scrollY }: HeroSectionProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        background: "radial-gradient(ellipse at 50% 50%, #0d0d1a 0%, #050508 100%)",
      }}
    >
      {/* Animated grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.15,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          transform: `translate(${mouse.x * -15}px, ${mouse.y * -15 + scrollY * 0.3}px)`,
          transition: "transform 0.1s",
        }}
      />

      {/* Glowing orbs */}
      {ORB_CONFIG.map((orb, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: orb.size,
            height: orb.size,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${orb.color}22, transparent 70%)`,
            filter: "blur(40px)",
            transform: `translate(${mouse.x * orb.depth * 1000}px, ${mouse.y * orb.depth * 1000 - scrollY * orb.depth * 2}px)`,
            transition: "transform 0.1s",
            animation: `orbFloat ${6 + i}s ease-in-out infinite alternate`,
          }}
        />
      ))}

      {/* Floating particles */}
      {floatingParticles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.6)",
            transform: `translate(${mouse.x * p.speed * 0.3}px, ${mouse.y * p.speed * 0.3}px)`,
            transition: `transform ${0.1 + p.delay * 0.02}s`,
            animation: `particleDrift ${p.speed}s linear infinite`,
            animationDelay: `${-p.delay * 4}s`,
          }}
        />
      ))}

      {/* Rotating ring */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          border: "1px solid rgba(255,255,255,0.03)",
          borderRadius: "50%",
          transform: `translate(${mouse.x * -20}px, ${mouse.y * -20}px) rotate(${scrollY * 0.05}deg)`,
          transition: "transform 0.2s",
          animation: "slowSpin 30s linear infinite",
        }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.3)",
              transform: `rotate(${i * 30}deg) translateX(296px) translateY(-50%)`,
            }}
          />
        ))}
      </div>

      {/* Hero content */}
      <div style={{ textAlign: "center", position: "relative", zIndex: 2, padding: "0 20px" }}>
        {/* Eyebrow */}
        <div
          style={{
            fontFamily: "'Courier New', monospace",
            fontSize: "clamp(10px, 1.5vw, 14px)",
            letterSpacing: "0.5em",
            color: "#FF4D4D",
            marginBottom: 30,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s ease 0.2s",
          }}
        >
          ◆ FUTURE COMMERCE ◆
        </div>

        {/* Title letters */}
        <div style={{ display: "flex", justifyContent: "center", gap: "clamp(2px, 1vw, 8px)", marginBottom: 20 }}>
          {HERO_LETTERS.map((letter, i) => (
            <span
              key={i}
              style={{
                display: "inline-block",
                fontFamily: "'Georgia', serif",
                fontSize: "clamp(48px, 12vw, 140px)",
                fontWeight: 900,
                fontStyle: "italic",
                color: "transparent",
                WebkitTextStroke: "1px rgba(255,255,255,0.8)",
                opacity: visible ? 1 : 0,
                transform: visible
                  ? `translateY(0) rotate(${mouse.x * (i % 2 === 0 ? 1 : -1) * 0.5}deg)`
                  : `translateY(${60 + i * 10}px)`,
                transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${0.4 + i * 0.07}s`,
                textShadow: "0 0 40px rgba(255,77,77,0.3)",
              }}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Tagline */}
        <p
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: "clamp(16px, 2.5vw, 22px)",
            color: "rgba(255,255,255,0.5)",
            fontStyle: "italic",
            marginBottom: 50,
            letterSpacing: "0.1em",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "all 1s ease 1s",
          }}
        >
          Where fashion meets the void.
        </p>

        {/* CTAs */}
        <div
          style={{
            display: "flex",
            gap: 20,
            justifyContent: "center",
            flexWrap: "wrap",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(40px)",
            transition: "all 1s ease 1.2s",
          }}
        >
          <button
            onClick={scrollToProducts}
            style={{
              padding: "16px 40px",
              background: "linear-gradient(135deg, #FF4D4D, #FF914D)",
              border: "none",
              borderRadius: 2,
              cursor: "none",
              fontFamily: "'Courier New', monospace",
              fontSize: 13,
              letterSpacing: "0.3em",
              color: "#fff",
              fontWeight: 700,
              boxShadow: "0 0 40px rgba(255,77,77,0.4)",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.transform = "scale(1.05) translateY(-2px)";
              el.style.boxShadow = "0 10px 60px rgba(255,77,77,0.6)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.transform = "scale(1) translateY(0)";
              el.style.boxShadow = "0 0 40px rgba(255,77,77,0.4)";
            }}
          >
            SHOP NOW
          </button>
          <button
            style={{
              padding: "16px 40px",
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 2,
              cursor: "none",
              fontFamily: "'Courier New', monospace",
              fontSize: 13,
              letterSpacing: "0.3em",
              color: "rgba(255,255,255,0.7)",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = "rgba(255,255,255,0.8)";
              el.style.color = "#fff";
              el.style.background = "rgba(255,255,255,0.05)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = "rgba(255,255,255,0.2)";
              el.style.color = "rgba(255,255,255,0.7)";
              el.style.background = "transparent";
            }}
          >
            EXPLORE
          </button>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: -120,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            opacity: visible ? 0.5 : 0,
            transition: "opacity 1s ease 2s",
          }}
        >
          <div
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: 10,
              letterSpacing: "0.3em",
              color: "#fff",
            }}
          >
            SCROLL
          </div>
          <div
            style={{
              width: 1,
              height: 40,
              background: "linear-gradient(to bottom, #fff, transparent)",
              animation: "scrollPulse 2s ease-in-out infinite",
            }}
          />
        </div>
      </div>
    </section>
  );
}
