import { CSSProperties } from "react";

interface NavbarProps {
  scrollY: number;
  cartCount: number;
}

const NAV_LINKS = ["SHOP", "DROPS", "ABOUT"] as const;

export default function Navbar({ scrollY, cartCount }: NavbarProps) {
  const opacity = Math.min(scrollY / 100, 0.95);

  const navStyle: CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    padding: "20px 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: `rgba(5,5,8,${opacity})`,
    backdropFilter: scrollY > 20 ? "blur(20px)" : "none",
    borderBottom: scrollY > 20 ? "1px solid rgba(255,255,255,0.05)" : "1px solid transparent",
    transition: "all 0.3s",
  };

  return (
    <nav style={navStyle}>
      <div
        style={{
          fontFamily: "'Georgia', serif",
          fontSize: 22,
          color: "#fff",
          fontWeight: 900,
          fontStyle: "italic",
          letterSpacing: "-0.02em",
        }}
      >
        Obsidian.
      </div>

      <div style={{ display: "flex", gap: 32 }}>
        {NAV_LINKS.map((item) => (
          <a
            key={item}
            href="#"
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: 11,
              letterSpacing: "0.3em",
              color: "rgba(255,255,255,0.5)",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = "#fff")}
            onMouseLeave={(e) =>
              ((e.target as HTMLAnchorElement).style.color = "rgba(255,255,255,0.5)")
            }
          >
            {item}
          </a>
        ))}
      </div>

      <div
        style={{
          fontFamily: "'Courier New', monospace",
          fontSize: 11,
          letterSpacing: "0.3em",
          color: "#fff",
          background: cartCount > 0 ? "#FF4D4D" : "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.1)",
          padding: "8px 16px",
          borderRadius: 2,
          transition: "all 0.3s",
          cursor: "none",
        }}
      >
        BAG ({cartCount})
      </div>
    </nav>
  );
}
