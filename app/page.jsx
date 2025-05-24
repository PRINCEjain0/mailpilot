"use client";

import Features from "@/components/features";
import Price from "@/components/price";
import Hero from "@/components/hero";

export default function Home() {
  return (
    <div className="bg-[#0d0d0d] text-white">
      {/* HERO SECTION */}
      <Hero />
      {/* FEATURES SECTION */}
      <Features />
      {/* PRICE SECTION */}
      <Price />
    </div>
  );
}
