"use client";

import FAQs from "@/app/common/FAQs";
import { dataFaqsList } from "@data/faqsData";
import { useRef } from "react";
import BannerCarousel from "../common/BannerCarousel";
import ProductCategories from "../common/ProductCategories";
import HomeReviewSection from "./sections/HomeReviewSection";
import WhyUs from "./sections/HomeWhyUs";
import HomeWorkingSection from "./sections/HomeWorkingSection";

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
      <BannerCarousel />
      <ProductCategories ref={categoryRef} serviceFilter={"SELL"} />
      <HomeWorkingSection />
      <HomeReviewSection />
      <WhyUs />
      <FAQs serviceType="HOME" />
    </div>
  );
}
