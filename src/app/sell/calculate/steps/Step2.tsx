"use client";

import ProblemCard from "@components/sections/ProblemCard";
import { dataProductQuestions } from "@data/productQuestions";
import { IStepProps } from "../../../common/StepsContainer";

export default function Step2({ productProblems, setProductProblems }: IStepProps) {
  const handleSelection = (problem: string) => {
    const updatedDefects = productProblems.defects.some((defect) => defect.question === problem)
      ? productProblems.defects.filter((defect) => defect.question !== problem)
      : [
          ...productProblems.defects,
          { question: problem, answer: "YES" }, // Add default answer or modify as needed
        ];

    setProductProblems((prev) => ({
      ...prev,
      defects: updatedDefects,
    }));
  };

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
        {dataProductQuestions
          .filter((item) => item.type === "DEFECTS" && item.device === "IPHONES" && !item.parent_id)
          .map(({ problem, image }, index) => (
            <ProblemCard
              key={index}
              imagePath={image ?? ""}
              problem={problem}
              onClick={() => handleSelection(problem)}
              isSelected={productProblems.defects.some((defect) => defect.question === problem)}
            />
          ))}
      </div>
    </>
  );
}
