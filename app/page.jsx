"use client";

import Features from "@/components/features";
import Price from "@/components/price";
import Hero from "@/components/hero";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const email = searchParams.get("userEmail");
    if (email) {
      console.log("Saving userEmail to localStorage:", email);
      localStorage.setItem("userEmail", email);

      router.replace("/", { scroll: false });
    }
  }, [searchParams, router]);
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
