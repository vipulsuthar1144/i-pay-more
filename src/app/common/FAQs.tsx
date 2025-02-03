"use client";

import { root_container } from "@/app/Providers";
import { dataFaqsList } from "@data/faqsData";
import { TService } from "@schemas/product-category.schema";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

type IFAQProps = {
  serviceType: TService;
};

export const FAQs = ({ serviceType = "HOME" }: IFAQProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={root_container}>
      <h2 className="text-xl md:text-2xl  font-bold ">FAQs</h2>
      <div className="space-y-2">
        {dataFaqsList
          .filter((item) => item.serviceType == serviceType)
          .map((faq, index) => (
            <div key={index} className="border-b-[1.5px] border-gray-300 rounded-md  overflow-hidden">
              {/* Accordion Header */}
              <button
                className="w-full flex justify-between items-center px-6 py-3 text-left text-xs md:text-sm font-semibold  leading-relaxed  focus:outline-none  transition"
                onClick={() => toggleAccordion(index)}
              >
                {faq.question}
                <span className={`transform transition-transform ${openIndex === index ? "rotate-180" : "rotate-0"}`}>
                  <ChevronDown />
                </span>
              </button>
              {/* Accordion Content */}
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-8 py-3  text-gray-700 text-xs md:text-sm leading-relaxed  "> ● {faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FAQs;
