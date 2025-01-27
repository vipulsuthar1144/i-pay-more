"use client";

import Image from "next/image";
import { useRef } from "react";
import Categories from "../(home)/sections/ProductCategories";
import HomeWorkingSection from "../(home)/sections/HomeWorkingSection";
import HomeHeroSection from "../(home)/sections/HomeHeroSection";
import { imgSellHeroSection } from "@assets/images/sell";
import ProductCategories from "../(home)/sections/ProductCategories";
import FAQs from "../(home)/sections/FAQs";
import { dataFaqsList } from "@data/faqsData";

export default function Sell() {
  return (
    <div className="space-y-10">
      {/* <section className="relative h-[500px] container m-auto flex items-center rounded-xl overflow-hidden p-5">
        <div className="absolute inset-0">
          <Image src={imgSellHeroSection} alt="Sell Products" className="w-full h-full object-fill" />{" "}
        </div>
      </section> */}
      <ProductCategories serviceFilter={"SELL"} />
      <FAQs faqs={dataFaqsList.filter((_, index) => index < 5)} />
    </div>
  );
}
