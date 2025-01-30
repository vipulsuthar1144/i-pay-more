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
import { root_container } from "../Providers";
import SellHeroSection from "./sections/SellHeroSection";
import Breadcrumb from "@components/sections/BreadCrumb";
import SellHowItWorksSection from "./sections/SellHowItWorksSection";

export default function Sell() {
  return (
    <div className={`space-y-14 py-10 `}>
      <div className="space-y-5">
        <Breadcrumb />
        <SellHeroSection />
      </div>
      <ProductCategories serviceFilter={"SELL"} />
      <SellHowItWorksSection />
      <FAQs faqs={dataFaqsList.filter((_, index) => index < 5)} />
    </div>
  );
}
