"use client";

import Features from "@/components/features";
import Price from "@/components/price";
import Hero from "@/components/hero";

export default function Home() {
  return (
    <div>
      {/* HERO SECTION */}
      <Hero />
      {/* FEATURES SECTION */}
      <Features />
      {/* PRICE SECTION */}
      <Price />
    </div>
  );
}
