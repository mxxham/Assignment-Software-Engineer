export interface Product {
  id: number;
  name: string;
  price: number;
  tag: string;
  category: string;
  emoji: string;
  color: string;
  bg: string;
  desc: string;
}

export interface MousePosition {
  x: number;
  y: number;
}

export interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  delay: number;
}
