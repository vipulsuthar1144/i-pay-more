"use client";

import Breadcrumb from "@components/static/BreadCrumb";
import { dataFaqsList } from "@data/faqsData";
import BannerCarousel from "../../common/BannerCarousel";
import FAQs from "../../common/FAQs";
import HowItWorksSection from "../../common/HowItWorksSection";
import RepairServiceCarousel from "./sections/RepairServiceCarousel";

export default function Sell() {
  return (
    <div className={`pt-10 space-y-10`}>
      <div className="space-y-5">
        <Breadcrumb />
        <BannerCarousel />
      </div>
      <RepairServiceCarousel />
      <HowItWorksSection serviceType="REPAIR" />
      <FAQs serviceType="REPAIR" />
    </div>
  );
}
