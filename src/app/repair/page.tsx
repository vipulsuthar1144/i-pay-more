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
import { dataRepairServiceList } from "@data/repairServices";
import ProductCard from "@components/sections/ProductCard";
import { useRouter } from "next/navigation";
import Breadcrumb from "@components/static/BreadCrumb";
import SellHowItWorks from "../sell/sections/SellHowItWorksSection";
import RepairHeroSection from "./sections/RepairHeroSection";

export default function Sell() {
  const router = useRouter();
  return (
    <div className={`pt-10 space-y-10`}>
      {/* <section className="relative h-[500px] container m-auto flex items-center rounded-xl overflow-hidden p-5">
        <div className="absolute inset-0">
          <Image src={imgSellHeroSection} alt="Sell Products" className="w-full h-full object-fill" />{" "}
        </div>
      </section> */}
      {/* <ProductCategories serviceFilter={"REPAIR"} /> */}
      <div className="space-y-5">
        <Breadcrumb />
        <RepairHeroSection />
      </div>
      <section className={root_container}>
        <h2 className="text-xl md:text-2xl  font-bold font-heading">Our Repair Services</h2>
        <p className="text-xs md:text-sm font-bold text-primary font-heading">Repair Your Apple Device with Us</p>
        <div className="grid grid-cols-3 gap-4 md:grid-cols-7">
          {dataRepairServiceList?.map((item) => (
            <ProductCard
              key={item?.id}
              title={item?.n ?? ""}
              img={item?.iu ?? ""}
              onClick={() => router.push("/repair/iphones-1")}
            />
          ))}
        </div>
      </section>
      <SellHowItWorks />
      <FAQs faqs={dataFaqsList.filter((_, index) => index < 5)} />
    </div>
  );
}
