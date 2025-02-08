"use client";

import Breadcrumb from "@components/static/BreadCrumb";
import { dataFaqsList } from "@data/faqsData";
import BannerCarousel from "../../common/BannerCarousel";
import FAQs from "../../common/FAQs";
import HowItWorksSection from "../../common/HowItWorksSection";
import ProductCategories from "../../common/ProductCategories";
import { banner1, banner2, banner3 } from "@assets/images/banners";

export default function Sell() {
  return (
    <div className={`space-y-10 pt-10 `}>
      <div className="space-y-5">
        <Breadcrumb />
        <BannerCarousel images={[banner3, banner3, banner3]} />
      </div>
      <ProductCategories serviceFilter={"SELL"} />
      <HowItWorksSection serviceType="SELL" />
      <FAQs serviceType="SELL" />
    </div>
  );
}
