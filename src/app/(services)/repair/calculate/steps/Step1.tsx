"use client";

import { IStepProps } from "@/app/common/StepsContainer";
import ProblemCard from "@components/sections/ProblemCard";
import { dataProductQuestions } from "@data/productQuestions";

export default function Step1({ productProblems, setProductProblems }: IStepProps) {
  const handleSelection = (problem: string) => {
    const updatedRepairServices = productProblems.repair_services.some((service) => service.question === problem)
      ? productProblems.repair_services.filter((service) => service.question !== problem)
      : [...productProblems.repair_services, { question: problem, answer: "YES" }];

    setProductProblems((prev) => ({
      ...prev,
      repair_services: updatedRepairServices,
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
              isSelected={productProblems.repair_services.some((service) => service.question === problem)}
            />
          ))}
      </div>
    </>
  );
}
