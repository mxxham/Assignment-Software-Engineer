import { MousePosition } from "../types";

interface FooterProps {
  mouse: MousePosition;
}

export default function Footer({ mouse }: FooterProps) {
  return (
    <footer
      style={{
        padding: "60px 40px 40px",
        background: "#030305",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ghost background text */}
      <div
        style={{
          position: "absolute",
          bottom: -60,
          left: "50%",
          transform: `translateX(calc(-50% + ${mouse.x * 20}px))`,
          fontFamily: "'Georgia', serif",
          fontSize: "20vw",
          color: "rgba(255,255,255,0.02)",
          fontWeight: 900,
          fontStyle: "italic",
          pointerEvents: "none",
          userSelect: "none",
          whiteSpace: "nowrap",
          transition: "transform 0.3s",
        }}
      >
        OBSIDIAN
      </div>

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          <div
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: 28,
              color: "#fff",
              fontWeight: 900,
              fontStyle: "italic",
            }}
          >
            Obsidian.
          </div>
          <div
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: 10,
              letterSpacing: "0.3em",
              color: "rgba(255,255,255,0.3)",
            }}
          >
            © 2026 OBSIDIAN STORE. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </footer>
  );
}
