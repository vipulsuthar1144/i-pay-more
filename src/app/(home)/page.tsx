"use client";

import Image from "next/image";
import HomeHeroSection from "./sections/HomeHeroSection";
import HomeWorkingSection from "./sections/HomeWorkingSection";
import Categories from "./sections/ProductCategories";
import { useRef } from "react";
import ProductCategories from "./sections/ProductCategories";

export default function Home() {
  const categoryRef = useRef<HTMLDivElement>(null);

  const handleActionButtonClick = () => {
    // categoryRef.current?.scrollIntoView({ behavior: "smooth" });
    if (categoryRef.current) {
      const topOffset = categoryRef.current.offsetTop - 50; // Adjust `100` for desired space
      window.scrollTo({
        top: topOffset,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="space-y-10">
      <HomeHeroSection onActionButtonClick={handleActionButtonClick} />
      <ProductCategories ref={categoryRef} />
      <HomeWorkingSection />
    </div>
  );
}
