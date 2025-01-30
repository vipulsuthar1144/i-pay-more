import React from "react";
import Image from "next/image";
import { root_container } from "@/app/Providers";
import { iconGetMoney, iconPriceTags, iconScooter } from "@assets/images/sell";

const steps = [
  {
    id: 1,
    title: "Check Price",
    description:
      "Select your device & tell us about its current condition, and our advanced AI tech will tailor make the perfect price for you.",
    icon: iconPriceTags,
  },
  {
    id: 2,
    title: "Schedule Pickup",
    description: "Book a free pickup from your home or work at a time slot that best suits your convenience.",
    icon: iconScooter,
  },
  {
    id: 3,
    title: "Get Paid",
    description:
      "Did we mention you get paid as soon as our executive picks up your device? It's instant payment all the way!",
    icon: iconGetMoney,
  },
];

const HowItWorks = () => {
  return (
    <div className="w-full py-12 bg-primary/5">
      <div className={root_container}>
        <h2 className="text-xl md:text-2xl lg:text-3xl  font-bold mb-10">How IPM Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.id} className="p-8 space-y-5">
              <div className="flex justify-center">
                <Image src={step.icon} alt={step.title} width={80} height={80} />
              </div>
              <div className="flex items-center justify-start gap-5 mb-2">
                <span className="text-white text-lg  md:text-xl bg-primary w-8 h-8 flex items-center justify-center rounded-full font-bold">
                  {step.id}
                </span>
                <h3 className="text-lg  md:text-xl  font-semibold">{step.title}</h3>
              </div>
              <p className="text-gray-600 text-xs md:text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
