import { useState } from "react";
import { MousePosition } from "../types";
import { products, CATEGORIES, Category } from "../data/products";
import { useInView } from "../hooks";
import ProductCard from "./ProductCard";

interface ProductsSectionProps {
  mouse: MousePosition;
  onAddToCart: () => void;
}

export default function ProductsSection({ mouse, onAddToCart }: ProductsSectionProps) {
  const [ref, inView] = useInView(0.05);
  const [filter, setFilter] = useState<Category>("ALL");

  const filtered = filter === "ALL" ? products : products.filter((p) => p.category === filter);

  return (
    <section
      id="products"
      style={{
        padding: "120px 40px",
        background: "#050508",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background parallax word */}
      <div
        style={{
          position: "absolute",
          right: -100,
          top: "10%",
          fontFamily: "'Georgia', serif",
          fontSize: "20vw",
          fontWeight: 900,
          color: "rgba(255,255,255,0.015)",
          fontStyle: "italic",
          transform: `translateY(${mouse.y * 30}px)`,
          transition: "transform 0.2s",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        SHOP
      </div>

      <div ref={ref} style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Section heading */}
        <div style={{ marginBottom: 70 }}>
          <div
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: 11,
              letterSpacing: "0.5em",
              color: "#FF4D4D",
              marginBottom: 16,
              opacity: inView ? 1 : 0,
              transform: inView ? "translateX(0)" : "translateX(-30px)",
              transition: "all 0.8s ease",
            }}
          >
            ◆ THE COLLECTION
          </div>
          <h2
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: "clamp(36px, 6vw, 72px)",
              color: "#fff",
              fontWeight: 900,
              fontStyle: "italic",
              margin: 0,
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(40px)",
              transition: "all 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          >
            Featured Drops
          </h2>
        </div>

        {/* Category filters */}
        <div
          style={{
            display: "flex",
            gap: 10,
            marginBottom: 60,
            flexWrap: "wrap",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s ease 0.3s",
          }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                padding: "8px 18px",
                background: filter === cat ? "#FF4D4D" : "transparent",
                border: `1px solid ${filter === cat ? "#FF4D4D" : "rgba(255,255,255,0.15)"}`,
                borderRadius: 2,
                cursor: "none",
                fontFamily: "'Courier New', monospace",
                fontSize: 10,
                letterSpacing: "0.3em",
                color: filter === cat ? "#000" : "rgba(255,255,255,0.5)",
                transition: "all 0.2s",
                fontWeight: 700,
              }}
              onMouseEnter={(e) => {
                if (filter !== cat) {
                  const el = e.currentTarget;
                  el.style.borderColor = "rgba(255,255,255,0.4)";
                  el.style.color = "#fff";
                }
              }}
              onMouseLeave={(e) => {
                if (filter !== cat) {
                  const el = e.currentTarget;
                  el.style.borderColor = "rgba(255,255,255,0.15)";
                  el.style.color = "rgba(255,255,255,0.5)";
                }
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 24,
          }}
        >
          {filtered.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              mouse={mouse}
              index={i}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
