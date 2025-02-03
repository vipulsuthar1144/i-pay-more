"use client";

import ProblemCard from "@components/sections/ProblemCard";
import { dataProductQuestions } from "@data/productQuestions";
import { IStepProps } from "../../../common/StepsContainer";

export default function Step3({ productProblems, setProductProblems }: IStepProps) {
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
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
      {dataProductQuestions
        .filter((item) => item.type === "FUNCTIONAL" && item.device == "IPHONES" && !item.parent_id)
        .map(({ problem, image }, index) => (
          <ProblemCard
            key={index}
            imagePath={image ?? ""}
            problem={problem}
            onClick={() => handleSelection(problem)}
            isSelected={productProblems.functional.some((functional) => functional.question === problem)}
          />
        ))}
    </div>
  );
}
