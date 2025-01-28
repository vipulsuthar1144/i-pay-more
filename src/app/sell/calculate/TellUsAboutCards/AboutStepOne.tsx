"use client";

import Button from "@components/ui/Button";
import { dataProductQuestions } from "@data/productQuestions";
import { IProductProblems } from "@schemas/order.schema";
import { CheckCircleIcon, XCircleIcon } from "lucide-react";
import React from "react";

interface IAboutStepOneProps {
  productProblems: IProductProblems;
  setProductProblems: React.Dispatch<React.SetStateAction<IProductProblems>>;
  handleContinue: VoidFunction;
}

export default function AboutStepOne({ productProblems, setProductProblems, handleContinue }: IAboutStepOneProps) {
  const handleAnswerSelection = (question: string, answer: string) => {
    const updatedBasic = productProblems.basic.some((item) => item.question === question)
      ? productProblems.basic.map((item) => (item.question === question ? { ...item, answer } : item))
      : [...productProblems.basic, { question, answer }];

    setProductProblems((prev) => ({
      ...prev,
      basic: updatedBasic,
    }));
  };

  return (
    <div className="rounded-md w-full sm:w-2/3 bg-white border-[1px] border-gray-400 p-6 sm:mr-4 sm:min-h-72 flex flex-col justify-between">
      <div>
        <div className="text-center text-xl font-semibold text-gray-800 mb-5">Tell Us More About Your Device</div>
        <div className="text-center text-gray-600 mb-4 text-sm">
          The better condition your device is in, the more we will pay you.
        </div>

        {dataProductQuestions
          .filter((item) => item.type === "BASIC" && item.device === "IPHONES")
          .map(({ problem, desc, options }, index) => {
            const selectedAnswer = productProblems.basic.find((item) => item.question === problem)?.answer;

            return (
              <section key={index} className="flex flex-col mb-5 w-full">
                <div className="text-md font-medium text-gray-700">{problem}</div>
                <div className="text-xs text-gray-500 mb-3">{desc}</div>
                <div className="flex flex-wrap justify-start gap-4">
                  {(options || ["YES", "NO"]).map((value) => (
                    <div
                      key={value}
                      onClick={() => handleAnswerSelection(problem, value)}
                      className={`flex items-center justify-center cursor-pointer px-5 py-2 rounded-lg border-[1px] w-full sm:w-40 mb-3
                      transition-colors duration-300 ease-in-out
                      
                      ${
                        selectedAnswer === value
                          ? value === "NO"
                            ? "border-red-500 bg-red-100 text-black"
                            : "border-green-500 bg-green-100 text-black"
                          : "border-gray-300 bg-gray-50 text-gray-500"
                      }
                      `}
                    >
                      <div
                        className={`w-5 h-5 rounded-full flex justify-center items-center
                        ${selectedAnswer === value ? (value === "NO" ? "bg-red-600" : "bg-green-600") : "bg-gray-200"}
                        `}
                      >
                        {selectedAnswer === value ? (
                          value === "NO" ? (
                            <XCircleIcon className="text-white" />
                          ) : (
                            <CheckCircleIcon className="text-white" />
                          )
                        ) : (
                          <XCircleIcon className="text-gray-400" />
                        )}
                      </div>
                      <div className="ml-3 text-sm">{value}</div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
      </div>
      <Button onClick={handleContinue} haveRightArrow label="Continue" />
    </div>
  );
}
