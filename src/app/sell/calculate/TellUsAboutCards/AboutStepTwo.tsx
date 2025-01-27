import Button from "@components/ui/Button";
import ItemImage from "@components/ui/ItemImage";
import { dataProductQuestions } from "@data/productQuestions";
import { keygen } from "framer-motion/client";
import React, { useState } from "react";
import { IProductProblems } from "../page";

interface IAboutStepTwoProps {
  productProblems: IProductProblems;
  setProductProblems: React.Dispatch<React.SetStateAction<IProductProblems>>;
  handleContinue: VoidFunction;
  handleBack: VoidFunction;
}
export default function AboutStepTwo({
  productProblems,
  setProductProblems,
  handleContinue,
  handleBack, // Added handleBack prop for navigation
}: IAboutStepTwoProps) {
  const handleSelection = (key: string) => {
    const updatedIssues = productProblems.defects.includes(key)
      ? productProblems.defects.filter((issue) => issue !== key)
      : [...productProblems.defects, key];

    setProductProblems((pre) => ({
      ...pre,
      defects: updatedIssues,
    }));
  };

  return (
    <div className="rounded-md w-full sm:w-2/3 bg-white border-[1px] border-gray-400 p-6 sm:mr-4 sm:min-h-72 flex flex-col">
      <div className="text-center text-xl font-semibold text-gray-800 mb-5">
        Select screen/body defects that are applicable!
      </div>
      <div className="text-center text-gray-600 mb-4 text-sm">Please provide correct details</div>

      {/* Add your step-specific content here */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-5">
        {dataProductQuestions
          .filter((item) => item.type === "DEFECTS" && item.device == "IPHONES" && !item.parent_id)
          .map(({ problem, image }, key) => (
            <div
              key={key}
              onClick={() => handleSelection(problem)}
              className={`flex flex-col justify-center items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 ease-in-out
      ${productProblems.defects.includes(problem) ? "border-gray-700 bg-gray-100" : "border-gray-300 bg-white"} 
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

      <div className="flex justify-between items-center gap-5 mt-5">
        <button
          type="button"
          onClick={handleBack} // Navigate to the previous step
          className="py-2 px-6 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
        >
          Back
        </button>
        <Button label={"Continue"} onClick={handleContinue} />
      </div>
    </div>
  );
}
