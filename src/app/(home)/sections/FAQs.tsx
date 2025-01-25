"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils"; // If you're using a utility for class names, otherwise omit this.
import { AnimatePresence, motion } from "framer-motion";

type FAQ = {
  question: string;
  answer: string;
};

export const FAQs = ({ faqs }: { faqs: FAQ[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl font-semibold mb-5 ">FAQs</h2>
      <div className="space-y-5">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-300 rounded-xl shadow-md overflow-hidden">
            {/* Accordion Header */}
            <button
              className="w-full flex justify-between items-center px-6 py-4 text-left font-semibold focus:outline-none hover:bg-gray-100 transition"
              onClick={() => toggleAccordion(index)}
            >
              {faq.question}
              <span className={`transform transition-transform ${openIndex === index ? "rotate-180" : "rotate-0"}`}>
                ⌄
              </span>
            </button>
            {/* Accordion Content */}
            <AnimatePresence initial={false}>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 py-4 text-gray-700 leading-relaxed bg-gray-50">{faq.answer}</div>
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
