"use client";

import Button from "@components/ui/Button";
import { IProductProblems } from "@schemas/order.schema";
import { TDevice } from "@schemas/product-category.schema";
import { subtle } from "crypto";
import React from "react";

interface IStepsContainerProps {
  children: React.ReactNode;
  title: string;
  subTitle: string;
  handleBack?: VoidFunction;
  handleContinue?: VoidFunction;
  isLoading?: boolean;
  currentStep: number;
  className?: string;
}
export interface IStepProps {
  productProblems: IProductProblems;
  setProductProblems: React.Dispatch<React.SetStateAction<IProductProblems>>;
  deviceType?: TDevice;
}

const StepsContainer = ({
  children,
  title,
  subTitle,
  handleBack,
  handleContinue,
  currentStep,
  isLoading = false,
  className,
}: IStepsContainerProps) => {
  return (
    <div
      className={`rounded-md w-full sm:w-2/3 bg-white border-[1px] border-gray-400 p-6 sm:mr-4 sm:min-h-72 flex flex-col justify-between ${className}`}
    >
      <div>
        <div className="text-center text-base md:text-xl font-semibold text-gray-900 mb-2">{title}</div>
        <div className="text-center text-gray-600 mb-5 text-xs md:text-sm">{subTitle}</div>
        {children}
      </div>
      <div className="flex justify-between items-center gap-5 mt-5">
        {currentStep > 1 && <Button label={"Back"} haveLeftArrow onClick={handleBack} />}
        <Button
          label={"Continue"}
          type={currentStep == 5 ? "submit" : "button"}
          haveRightArrow
          onClick={handleContinue}
          className={currentStep == 1 ? "min-w-full" : ""}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default StepsContainer;
