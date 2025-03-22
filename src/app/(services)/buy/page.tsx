"use client";

import { banner5 } from "@assets/images/banners";
import Breadcrumb from "@components/static/BreadCrumb";
import BannerCarousel from "../../common/BannerCarousel";
import FAQs from "../../common/FAQs";
import HowItWorksSection from "../../common/HowItWorksSection";
import ProductCategories from "../../common/ProductCategories";

export default function BuyPage() {
  return (
    <div className={`pt-10 space-y-10`}>
      <div className="space-y-5">
        <Breadcrumb />
        <BannerCarousel images={[banner5, banner5, banner5]} />
      </div>
      <ProductCategories serviceFilter={"BUY"} />
      <HowItWorksSection serviceType="BUY" />
      <FAQs serviceType="BUY" />
    </div>
  );
}
