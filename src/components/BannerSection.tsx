import { MousePosition } from "../types";
import { useInView } from "../hooks";

interface BannerSectionProps {
  mouse: MousePosition;
}

export default function BannerSection({ mouse }: BannerSectionProps) {
  const [ref, inView] = useInView();

  return (
    <section
      style={{
        padding: "120px 40px",
        position: "relative",
        overflow: "hidden",
        background: "#0d0d1a",
      }}
    >
      {/* Parallax ghost word */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: "25vw",
            fontWeight: 900,
            color: "rgba(255,77,77,0.04)",
            fontStyle: "italic",
            transform: `translate(${mouse.x * -40}px, ${mouse.y * -20}px)`,
            transition: "transform 0.2s",
            userSelect: "none",
            whiteSpace: "nowrap",
          }}
        >
          VOID
        </div>
      </div>

      <div
        ref={ref}
        style={{
          maxWidth: 800,
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            fontFamily: "'Courier New', monospace",
            fontSize: 11,
            letterSpacing: "0.5em",
            color: "#4DFFB4",
            marginBottom: 24,
            opacity: inView ? 1 : 0,
            transition: "all 0.8s ease",
          }}
        >
          ◆ MEMBERS ONLY
        </div>

        <h2
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: "clamp(32px, 6vw, 64px)",
            color: "#fff",
            fontWeight: 900,
            fontStyle: "italic",
            marginBottom: 20,
            lineHeight: 1.1,
            opacity: inView ? 1 : 0,
            transform: inView ? "scale(1)" : "scale(0.9)",
            transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.1s",
          }}
        >
          Enter the Void.
          <br />
          <span style={{ color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.5)" }}>
            Get Early Access.
          </span>
        </h2>

        <p
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: 17,
            color: "rgba(255,255,255,0.4)",
            fontStyle: "italic",
            marginBottom: 40,
            lineHeight: 1.7,
            opacity: inView ? 1 : 0,
            transition: "all 0.8s ease 0.3s",
          }}
        >
          Join 50,000+ members who get first access to drops, exclusive discounts, and the future
          of fashion.
        </p>

        <div
          style={{
            display: "flex",
            gap: 0,
            maxWidth: 480,
            margin: "0 auto",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s ease 0.4s",
          }}
        >
          <input
            type="email"
            placeholder="your@email.com"
            style={{
              flex: 1,
              padding: "16px 20px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRight: "none",
              borderRadius: "2px 0 0 2px",
              fontFamily: "'Courier New', monospace",
              fontSize: 13,
              color: "#fff",
              outline: "none",
              letterSpacing: "0.05em",
            }}
          />
          <button
            style={{
              padding: "16px 28px",
              background: "linear-gradient(135deg, #4DFFB4, #4DB8FF)",
              border: "none",
              borderRadius: "0 2px 2px 0",
              cursor: "none",
              fontFamily: "'Courier New', monospace",
              fontSize: 11,
              letterSpacing: "0.3em",
              color: "#000",
              fontWeight: 700,
              transition: "opacity 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            JOIN
          </button>
        </div>
      </div>
    </section>
  );
}
