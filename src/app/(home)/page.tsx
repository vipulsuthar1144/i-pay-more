"use client";

import Image from "next/image";
import HomeHeroSection from "./sections/HomeHeroSection";
import HomeWorkingSection from "./sections/HomeWorkingSection";
import Categories from "./sections/ProductCategories";
import { useRef } from "react";
import ProductCategories from "./sections/ProductCategories";
import HomeReviewSection from "./sections/HomeReviewSection";
import FAQs from "@/app/(home)/sections/FAQs";
import { dataFaqsList } from "@data/faqsData";
import WhyUs from "./sections/HomeWhyUs";
import HomeHeroCarousel from "./sections/HomeCarousel";
import BannerCarousel from "./sections/BannerCarousel";

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
    <div className="space-y-10 md:space-y-16">
      {/* <HomeHeroCarousel /> */}
      <BannerCarousel />
      {/* <HomeHeroSection onActionButtonClick={handleActionButtonClick} /> */}
      <ProductCategories ref={categoryRef} serviceFilter={"SELL"} />
      <HomeWorkingSection />
      <HomeReviewSection />
      <WhyUs />
      <FAQs faqs={dataFaqsList.filter((_, index) => index < 5)} />
    </div>
  );
}
