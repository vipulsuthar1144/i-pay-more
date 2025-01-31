"use client";

import Breadcrumb from "@components/static/BreadCrumb";
import { dataFaqsList } from "@data/faqsData";
import FAQs from "../(home)/sections/FAQs";
import ProductCategories from "../(home)/sections/ProductCategories";
import SellHeroSection from "./sections/SellHeroSection";
import SellHowItWorksSection from "./sections/SellHowItWorksSection";

export default function Sell() {
  return (
    <div className={`space-y-10 pt-10 `}>
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
