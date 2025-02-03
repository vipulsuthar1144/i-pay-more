"use client";

import { root_container } from "@/app/Providers";
import { dataHowItWorks } from "@data/howItWorksData";
import { TService } from "@schemas/product-category.schema";
import Image from "next/image";
import _ from "lodash";

interface IHowItWorksSectionProps {
  serviceType: TService;
}
const HowItWorksSection = ({ serviceType = "SELL" }: IHowItWorksSectionProps) => {
  return (
    <div className="w-full py-12 bg-primary/5 rounded-lg">
      <div className={root_container}>
        <h2 className="text-xl md:text-2xl font-bold  mb-5 px-5 md:px-0">
          How {_.capitalize(serviceType)} Service Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {dataHowItWorks
            .filter((item) => item.serviceType == serviceType)
            .map((step, index) => (
              <div key={index} className="px-4 py-2 md:p-8 flex md:flex-col justify-center items-center gap-5">
                <div className="flex justify-center min-w-[60px] md:w-full">
                  <Image
                    src={step.icon}
                    alt={step.title}
                    width={80}
                    height={80}
                    className="text-red-600 w-[60px] md:w-[80px]"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-start gap-5 mb-2">
                    <span className="text-white text-lg  md:text-xl bg-primary w-8 h-8 flex items-center justify-center rounded-full font-bold">
                      {step.step}
                    </span>
                    <h3 className="text-lg  md:text-xl  font-semibold">{step.title}</h3>
                  </div>
                  <p className="text-gray-600 text-xs md:text-sm">{step.description}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;
