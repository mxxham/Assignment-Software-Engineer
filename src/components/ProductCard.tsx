import { useState, CSSProperties } from "react";
import { Product, MousePosition } from "../types";
import { useInView, useCardTilt } from "../hooks";

interface ProductCardProps {
  product: Product;
  mouse: MousePosition;
  index: number;
  onAddToCart: () => void;
}

export default function ProductCard({ product, index, onAddToCart }: ProductCardProps) {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const { cardRef, tilt, handleMouseMove, resetTilt } = useCardTilt();

  const handleAdd = () => {
    setAdded(true);
    onAddToCart();
    setTimeout(() => setAdded(false), 1500);
  };

  const cardTransform = hovered
    ? `perspective(800px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateZ(10px)`
    : "perspective(800px) rotateX(0) rotateY(0) translateZ(0)";

  const cardTransition = hovered
    ? "transform 0.1s, border-color 0.3s, box-shadow 0.3s"
    : "transform 0.5s cubic-bezier(0.16,1,0.3,1), border-color 0.3s, box-shadow 0.3s";

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0) scale(1)" : "translateY(60px) scale(0.95)",
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${index * 0.1}s,
                     transform 0.8s cubic-bezier(0.16,1,0.3,1) ${index * 0.1}s`,
      }}
    >
      <div
        ref={cardRef}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); resetTilt(); }}
        onMouseMove={handleMouseMove}
        style={{
          background: product.bg,
          border: `1px solid ${hovered ? product.color + "44" : "rgba(255,255,255,0.06)"}`,
          borderRadius: 4,
          overflow: "hidden",
          cursor: "none",
          transform: cardTransform,
          transition: cardTransition,
          boxShadow: hovered
            ? `0 30px 80px ${product.color}22, 0 0 0 1px ${product.color}22`
            : "0 4px 20px rgba(0,0,0,0.5)",
          position: "relative",
        }}
      >
        {/* Shimmer overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            pointerEvents: "none",
            background: `linear-gradient(135deg, transparent 0%, ${product.color}08 50%, transparent 100%)`,
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.3s",
          }}
        />

        {/* Tag badge */}
        <div
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            zIndex: 3,
            background: product.color,
            borderRadius: 2,
            padding: "4px 10px",
            fontFamily: "'Courier New', monospace",
            fontSize: 9,
            letterSpacing: "0.3em",
            color: "#000",
            fontWeight: 700,
          }}
        >
          {product.tag}
        </div>

        {/* Emoji hero */}
        <div
          style={{
            height: 220,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 90,
            position: "relative",
            overflow: "hidden",
            background: `radial-gradient(circle at 50% 60%, ${product.color}15, transparent 70%)`,
            transform: hovered ? "translateY(-8px) scale(1.05)" : "translateY(0) scale(1)",
            transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <span
            style={{
              filter: `drop-shadow(0 0 30px ${product.color}88)`,
              animation: hovered ? "emojiFloat 2s ease-in-out infinite" : "none",
              display: "block",
            }}
          >
            {product.emoji}
          </span>
        </div>

        {/* Product info */}
        <div style={{ padding: "20px 24px 24px", position: "relative", zIndex: 2 }}>
          <div
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: 10,
              letterSpacing: "0.4em",
              color: product.color,
              marginBottom: 6,
              opacity: 0.7,
            }}
          >
            {product.category}
          </div>

          <div
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: 22,
              color: "#fff",
              fontWeight: 700,
              fontStyle: "italic",
              marginBottom: 8,
            }}
          >
            {product.name}
          </div>

          <div
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: 13,
              color: "rgba(255,255,255,0.4)",
              fontStyle: "italic",
              marginBottom: 20,
              lineHeight: 1.6,
            }}
          >
            {product.desc}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: 24,
                color: "#fff",
                fontWeight: 700,
              }}
            >
              <span style={{ fontSize: 14, color: product.color }}>$</span>
              {product.price}
            </div>

            <button
              onClick={handleAdd}
              style={{
                padding: "10px 20px",
                background: added ? product.color : "transparent",
                border: `1px solid ${product.color}`,
                borderRadius: 2,
                cursor: "none",
                fontFamily: "'Courier New', monospace",
                fontSize: 10,
                letterSpacing: "0.3em",
                color: added ? "#000" : product.color,
                transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                transform: added ? "scale(0.95)" : "scale(1)",
                fontWeight: 700,
              }}
            >
              {added ? "✓ ADDED" : "ADD +"}
            </button>
          </div>
        </div>

        {/* Bottom accent */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            height: 2,
            background: product.color,
            width: hovered ? "100%" : "0%",
            transition: "width 0.4s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
      </div>
    </div>
  );
}
