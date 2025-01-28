"use client";

import Button from "@components/ui/Button";
import { dataProductQuestions } from "@data/productQuestions";
import React, { useState } from "react";
import ItemImage from "@components/ui/ItemImage";
import { IProductProblems } from "@schemas/order.schema";

interface IAboutStepTwoProps {
  productProblems: IProductProblems;
  setProductProblems: React.Dispatch<React.SetStateAction<IProductProblems>>;
  handleContinue: VoidFunction;
  handleBack: VoidFunction;
}
export default function AboutStepThird({
  productProblems,
  setProductProblems,
  handleContinue,
  handleBack, // Added handleBack prop for navigation
}: IAboutStepTwoProps) {
  const handleSelection = (problem: string) => {
    const updatedFunctional = productProblems.functional.some((functional) => functional.question === problem)
      ? productProblems.functional.filter((functional) => functional.question !== problem)
      : [
          ...productProblems.functional,
          { question: problem, answer: "YES" }, // Add default answer or modify as needed
        ];

    setProductProblems((prev) => ({
      ...prev,
      functional: updatedFunctional,
    }));
  };

  return (
    <div className="rounded-md w-full sm:w-2/3 bg-white border-[1px] border-gray-400 p-6 sm:mr-4 sm:min-h-72 flex flex-col justify-between">
      <div>
        <div className="text-center text-xl font-semibold text-gray-800 mb-5">Functional or Physical Problems</div>
        <div className="text-center text-gray-600 mb-4 text-sm">
          Please choose appropriate condition to get accurate quote
        </div>

        {/* Add your step-specific content here */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
          {dataProductQuestions
            .filter((item) => item.type === "FUNCTIONAL" && item.device == "IPHONES" && !item.parent_id)
            .map(({ problem, image }, key) => (
              <div
                key={key}
                onClick={() => handleSelection(problem)}
                className={`flex flex-col justify-center items-center p-4 border-[1px] rounded-md cursor-pointer transition-all duration-300 ease-in-out
      ${productProblems.functional.some((functional) => functional.question === problem) ? "border-gray-800 bg-gray-200" : "border-gray-400 bg-white"} 
      `}
              >
                <div className="w-24 h-24 flex justify-center items-center mb-3">
                  {/* <img src={image} alt={label} className="w-full h-full object-contain" /> */}
                  <ItemImage src={image as string} alt={problem} className="w-full h-full min-w-full" />
                </div>
                <div className={`text-center  text-gray-700 text-sm`}>{problem}</div>
              </div>
            ))}
        </div>
      </div>
      <div className="flex justify-between items-center gap-5 mt-5">
        <Button
          label={"Back"}
          haveLeftArrow
          onClick={handleBack}
          // className="bg-gray-200 text-gray-700 hover:bg-gray-300 "
        />
        <Button label={"Continue"} haveRightArrow onClick={handleContinue} />
      </div>
    </div>
  );
}
