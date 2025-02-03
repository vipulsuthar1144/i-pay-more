"use client";

import Breadcrumb from "@components/static/BreadCrumb";
import { dataFaqsList } from "@data/faqsData";
import BannerCarousel from "../common/BannerCarousel";
import FAQs from "../common/FAQs";
import HowItWorksSection from "../common/HowItWorksSection";
import ProductCategories from "../common/ProductCategories";

export default function Sell() {
  return (
    <div className={`space-y-10 pt-10 `}>
      <div className="space-y-5">
        <Breadcrumb />
        <BannerCarousel />
      </div>
      <ProductCategories serviceFilter={"SELL"} />
      <HowItWorksSection serviceType="SELL" />
      <FAQs faqs={dataFaqsList.filter((_, index) => index < 5)} />
    </div>
  );
}
