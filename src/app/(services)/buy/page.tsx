"use client";

import Breadcrumb from "@components/static/BreadCrumb";
import { dataFaqsList } from "@data/faqsData";
import BannerCarousel from "../../common/BannerCarousel";
import FAQs from "../../common/FAQs";
import HowItWorksSection from "../../common/HowItWorksSection";
import ProductCategories from "../../common/ProductCategories";

export default function BuyPage() {
  return (
    <div className={`pt-10 space-y-10`}>
      <div className="space-y-5">
        <Breadcrumb />
        <BannerCarousel />
      </div>
      <ProductCategories serviceFilter={"BUY"} />
      <HowItWorksSection serviceType="BUY" />
      <FAQs serviceType="BUY" />
    </div>
  );
}
