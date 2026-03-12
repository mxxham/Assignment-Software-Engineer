import { Product, Particle } from "../types";

export const products: Product[] = [
  {
    id: 1,
    name: "Obsidian Runner",
    price: 289,
    tag: "NEW DROP",
    category: "Footwear",
    emoji: "👟",
    color: "#FF4D4D",
    bg: "#1a0a0a",
    desc: "Engineered for velocity. Built for legend.",
  },
  {
    id: 2,
    name: "Void Jacket",
    price: 459,
    tag: "LIMITED",
    category: "Outerwear",
    emoji: "🧥",
    color: "#4DFFB4",
    bg: "#0a1a12",
    desc: "Wear the absence of everything.",
  },
  {
    id: 3,
    name: "Flux Watch",
    price: 899,
    tag: "RARE",
    category: "Accessories",
    emoji: "⌚",
    color: "#FFD94D",
    bg: "#1a1600",
    desc: "Time bends around you.",
  },
  {
    id: 4,
    name: "Neural Bag",
    price: 349,
    tag: "TRENDING",
    category: "Bags",
    emoji: "🎒",
    color: "#B44DFF",
    bg: "#130a1a",
    desc: "Carry your universe.",
  },
  {
    id: 5,
    name: "Plasma Tee",
    price: 129,
    tag: "HOT",
    category: "Tops",
    emoji: "👕",
    color: "#4DB8FF",
    bg: "#0a1218",
    desc: "Comfort at the speed of thought.",
  },
  {
    id: 6,
    name: "Eclipse Shades",
    price: 219,
    tag: "ICONIC",
    category: "Eyewear",
    emoji: "🕶️",
    color: "#FF914D",
    bg: "#1a0e0a",
    desc: "See the world in contrast.",
  },
];

export const floatingParticles: Particle[] = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  speed: Math.random() * 20 + 10,
  delay: Math.random() * 5,
}));

export const CATEGORIES = ["ALL", "Footwear", "Outerwear", "Accessories", "Bags", "Tops", "Eyewear"] as const;
export type Category = (typeof CATEGORIES)[number];
