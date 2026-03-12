import { useState } from "react";
import "./index.css";
import { useMouseParallax, useScrollY } from "./hooks";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import MarqueeBar from "./components/MarqueeBar";
import ProductsSection from "./components/ProductsSection";
import StatsSection from "./components/StatsSection";
import BannerSection from "./components/BannerSection";
import Footer from "./components/Footer";

export default function App() {
  const mouse = useMouseParallax();
  const scrollY = useScrollY();
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = () => setCartCount((c) => c + 1);

  return (
    <div style={{ background: "#050508", minHeight: "100vh", cursor: "none", overflowX: "hidden" }}>
      <Cursor mouse={mouse} />
      <Navbar scrollY={scrollY} cartCount={cartCount} />
      <HeroSection mouse={mouse} scrollY={scrollY} />
      <MarqueeBar />
      <ProductsSection mouse={mouse} onAddToCart={handleAddToCart} />
      <StatsSection mouse={mouse} />
      <BannerSection mouse={mouse} />
      <Footer mouse={mouse} />
    </div>
  );
}
