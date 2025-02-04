"use client";

import { IStepProps } from "@/app/common/StepsContainer";
import ProblemCard from "@components/sections/ProblemCard";
import { dataProductQuestions } from "@data/productQuestions";

export default function Step1({ productProblems, setProductProblems }: IStepProps) {
  const handleSelection = (problem: string, price: string) => {
    const updatedRepairServices = productProblems.repair_services.some((service) => service.question === problem)
      ? productProblems.repair_services.filter((service) => service.question !== problem)
      : [...productProblems.repair_services, { question: problem, answer: price }];

    setProductProblems((prev) => ({
      ...prev,
      repair_services: updatedRepairServices,
    }));
  };

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
        {dataProductQuestions
          .filter((item) => item.type === "REPAIR_SERVICES" && item.device === "IPHONES" && !item.parent_id)
          .map(({ problem, image, price }, index) => (
            <ProblemCard
              key={index}
              imagePath={image ?? ""}
              problem={problem}
              subtitle={price?.toString()}
              onClick={() => handleSelection(problem, price?.toString() ?? "0")}
              isSelected={productProblems.repair_services.some((service) => service.question === problem)}
            />
          ))}
      </div>
    </>
  );
}
