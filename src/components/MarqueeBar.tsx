const MARQUEE_ITEMS = [
  "OBSIDIAN STORE",
  "FREE SHIPPING OVER $200",
  "NEW DROP EVERY FRIDAY",
  "LIMITED EDITIONS",
  "FUTURE IS NOW",
  "JOIN THE VOID",
];

export default function MarqueeBar() {
  const repeated = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div
      style={{
        background: "#FF4D4D",
        padding: "12px 0",
        overflow: "hidden",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 60,
          width: "max-content",
          animation: "marquee 20s linear infinite",
        }}
      >
        {repeated.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: 12,
              letterSpacing: "0.3em",
              color: "#fff",
              fontWeight: 700,
              whiteSpace: "nowrap",
            }}
          >
            {item} <span style={{ opacity: 0.5 }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
