"use client";

import { root_container } from "@/app/Providers";
import { imgSellCover } from "@assets/images/home";
import { TService } from "@schemas/product-category.schema";
import Image from "next/image";

interface IServiceHeroSectionProps {
  serviceType: TService;
}

const DataHeroSection = [
  {
    title: "Sell your Apple Device for Instant Cash",
    description:
      "Get the maximum value for your old smartphone with our hassle-free process. Enjoy a secure transaction and free doorstep pickup!",
    features: ["Maximum Value", "Safe & Hassle-free", "Free Doorstep Pickup"],
    serviceType: "SELL",
  },
  {
    title: "Repair your Apple device quickly and affordably",
    description:
      "Get your Apple device repaired with our hassle-free process. Enjoy a secure service and free doorstep pickup!",
    features: ["Expert Repairs", "Safe & Hassle-free", "Free Doorstep Pickup"],
    serviceType: "REPAIR",
  },
  {
    title: "Buy your favorite Apple Device",
    description:
      " Get the latest Apple device at the best price with our hassle-free process. Enjoy a secure transaction and fast doorstep delivery!",
    features: ["Best Price Guaranteed", "Safe & Hassle-free", "Free Doorstep Delivery"],
    serviceType: "BUY",
  },
];
export default function ServiceHeroSection({ serviceType }: IServiceHeroSectionProps) {
  const renderData = DataHeroSection.find((item) => item.serviceType == serviceType);
  return (
    <section className={`bg-gray-100 p-8 rounded-xl ${root_container} space-y-0 flex items-center gap-6`}>
      {/* Left Side Content */}
      <div className="flex-1  md:text-left space-y-6">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl  font-bold">{renderData?.title}</h1>
        <p className="text-gray-600 text-xs  md:text-sm mt-3">{renderData?.description}</p>
        <div className="tems-center space-y-2 text-green-600 text-xs  md:text-sm font-medium">
          {renderData?.features.map((feature) => <p key={feature}>&#10004; {feature}</p>)}
        </div>
      </div>

      {/* Right Side Image */}
      <div className=" hidden  md:flex items-center  w-1/3 md:w-1/2 justify-center">
        <Image
          src={imgSellCover} // Replace with correct path
          alt="Sell Mobile"
          width={500}
          height={500}
          className="object-contain mix-blend-multiply rounded-full"
        />
      </div>
    </section>
  );
}
