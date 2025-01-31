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
import Breadcrumb from "@components/static/BreadCrumb";
import BuyHeroSection from "./sections/BuyHeroSection";
import SellHowItWorks from "../sell/sections/SellHowItWorksSection";
import { AppleCardsCarouselDemo } from "./sections/TopSellingProducts";

export default function Sell() {
  return (
    <div className={`pt-10 space-y-10`}>
      <div className="space-y-5">
        <Breadcrumb />
        <BuyHeroSection />
      </div>
      <ProductCategories serviceFilter={"BUY"} />
      {/* <AppleCardsCarouselDemo /> */}
      <SellHowItWorks />
      <FAQs faqs={dataFaqsList.filter((_, index) => index < 5)} />
    </div>
  );
}
