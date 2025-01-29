"use client";
import ProblemCard from "@components/sections/ProblemCard";
import { dataProductQuestions } from "@data/productQuestions";
import { IStepProps } from "./StepsContainer";

export default function Step4({ productProblems, setProductProblems }: IStepProps) {
  const handleSelection = (problem: string) => {
    const updatedAccessories = productProblems.accessories.some((acc) => acc.question === problem)
      ? productProblems.accessories.filter((acc) => acc.question !== problem)
      : [
          ...productProblems.accessories,
          { question: problem, answer: "YES" }, // Add default answer or modify as needed
        ];

    setProductProblems((prev) => ({
      ...prev,
      accessories: updatedAccessories,
    }));
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
      {dataProductQuestions
        .filter((item) => item.type === "MORE" && item.device == "IPHONES")
        .map(({ problem, image }, index) => (
          <ProblemCard
            key={index}
            imagePath={image ?? ""}
            problem={problem}
            onClick={() => handleSelection(problem)}
            isSelected={productProblems.accessories.some((accessory) => accessory.question === problem)}
          />
        ))}
    </div>
  );
}
