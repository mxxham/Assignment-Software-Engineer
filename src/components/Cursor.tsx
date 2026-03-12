import { useState, useEffect, CSSProperties } from "react";
import { MousePosition } from "../types";

interface CursorProps {
  mouse: MousePosition;
}

export default function Cursor({ mouse }: CursorProps) {
  const [clicked, setClicked] = useState(false);
  const [windowSize, setWindowSize] = useState({ w: window.innerWidth, h: window.innerHeight });

  useEffect(() => {
    const down = () => {
      setClicked(true);
      setTimeout(() => setClicked(false), 300);
    };
    const resize = () => setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("mousedown", down);
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("mousedown", down);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const dotX = (mouse.x * 0.5 + 0.5) * windowSize.w - 6;
  const dotY = (mouse.y * 0.5 + 0.5) * windowSize.h - 6;
  const ringX = (mouse.x * 0.5 + 0.5) * windowSize.w - 20;
  const ringY = (mouse.y * 0.5 + 0.5) * windowSize.h - 20;

  const dotStyle: CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    pointerEvents: "none",
    zIndex: 9999,
    transform: `translate(${dotX}px, ${dotY}px) scale(${clicked ? 2 : 1})`,
    width: 12,
    height: 12,
    borderRadius: "50%",
    background: "#fff",
    mixBlendMode: "difference",
    transition: "transform 0.05s",
  };

  const ringStyle: CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    pointerEvents: "none",
    zIndex: 9998,
    transform: `translate(${ringX}px, ${ringY}px)`,
    width: 40,
    height: 40,
    borderRadius: "50%",
    border: "1px solid rgba(255,255,255,0.4)",
    transition: "transform 0.15s ease-out",
  };

  return (
    <>
      <div style={dotStyle} />
      <div style={ringStyle} />
    </>
  );
}
