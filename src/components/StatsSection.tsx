import { MousePosition } from "../types";
import { useInView } from "../hooks";

interface StatsSectionProps {
  mouse: MousePosition;
}

const STATS = [
  { value: "50K+", label: "Active Customers", color: "#FF4D4D" },
  { value: "200+", label: "Unique Products", color: "#4DFFB4" },
  { value: "99%", label: "Satisfaction Rate", color: "#FFD94D" },
  { value: "48h", label: "Avg Delivery", color: "#B44DFF" },
];

export default function StatsSection({ mouse }: StatsSectionProps) {
  const [ref, inView] = useInView();

  return (
    <section
      style={{
        padding: "100px 40px",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(180deg, #050508 0%, #0d0d1a 100%)",
      }}
    >
      {/* Background radial */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(255,77,77,0.05) 0%, transparent 60%)",
          transform: `translate(${mouse.x * 30}px, ${mouse.y * 30}px)`,
          transition: "transform 0.3s",
        }}
      />

      <div
        ref={ref}
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 40,
          position: "relative",
          zIndex: 1,
        }}
      >
        {STATS.map((s, i) => (
          <div
            key={i}
            style={{
              textAlign: "center",
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(40px)",
              transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.15}s,
                           transform 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.15}s`,
            }}
          >
            <div
              style={{
                fontFamily: "'Georgia', serif",
                fontSize: "clamp(48px, 6vw, 72px)",
                fontWeight: 900,
                fontStyle: "italic",
                color: s.color,
                lineHeight: 1,
                textShadow: `0 0 60px ${s.color}44`,
              }}
            >
              {s.value}
            </div>
            <div
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: 11,
                letterSpacing: "0.3em",
                color: "rgba(255,255,255,0.4)",
                marginTop: 10,
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
