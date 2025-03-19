"use client";

import { IStepProps } from "@/app/common/StepsContainer";
import { RepairAPI } from "@/services/repair.service";
import FallbackError from "@components/FallbackError";
import ItemImage from "@components/ui/ItemImage";
import { calculateDiscountedPrice, formatPrice } from "@lib/utils";
import { isValidUrl } from "@lib/validation";
import { IRepairServiceSchema } from "@schemas/repair-services.schema";
import { useEffect, useState } from "react";

export default function Step1({ productProblems, setProductProblems }: IStepProps) {
  const [repairServiceData, setRepairServiceData] = useState<{
    loading: boolean;
    error: string | null;
    serviceList: IRepairServiceSchema[];
  }>({
    loading: false,
    error: null,
    serviceList: [],
  });
  const handleSelection = (problem: string, price: string) => {
    const updatedRepairServices = productProblems.repair_services.some((service) => service.question === problem)
      ? productProblems.repair_services.filter((service) => service.question !== problem)
      : [...productProblems.repair_services, { question: problem, answer: price }];

    setProductProblems((prev) => ({
      ...prev,
      repair_services: updatedRepairServices,
    }));
  };

  useEffect(() => {
    handleGetRepairServiceAPI();
  }, []);

  const handleGetRepairServiceAPI = async () => {
    try {
      setRepairServiceData({ loading: true, error: null, serviceList: [] });
      const response = await RepairAPI.getServices();
      setRepairServiceData({ loading: false, error: null, serviceList: response?.services ?? [] });
    } catch (error: any) {
      setRepairServiceData({ loading: false, error: error || "Something wents wrong", serviceList: [] });
    }
  };

  if (repairServiceData?.error && !repairServiceData?.loading) return <FallbackError type="something_went_wrong" />;
  if (!repairServiceData?.error && !repairServiceData?.loading && repairServiceData.serviceList.length == 0)
    return <FallbackError type="data_not_found" />;

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
        {repairServiceData?.loading && !repairServiceData?.error && (
          <>
            {Array.from({ length: 6 })?.map((_, index) => (
              <div key={index} className="w-full aspect-square  m-2 bg-gray-200 animate-pulse rounded-lg"></div>
            ))}
          </>
        )}
        {/* {repairServiceData.serviceList?.map(({ service_price, service_name, image_path }, index) => (
          <ProblemCard
            key={index}
            imagePath={image_path ?? ""}
            problem={service_name ?? ""}
            addBasePath
            subtitle={service_price?.toString()}
            onClick={() => handleSelection(service_name ?? "", service_price ?? "0")}
            isSelected={productProblems.repair_services.some((service) => service.question === service_name)}
          />
        ))} */}
        {repairServiceData.serviceList?.map(
          ({ service_price, service_name, image_path, discount_percentage }, index) => {
            const discounted_price = calculateDiscountedPrice(Number(service_price ?? 0), discount_percentage ?? 0);
            const isSelected = productProblems.repair_services.some((service) => service.question === service_name);
            return (
              <div
                onClick={() =>
                  handleSelection(
                    service_name ?? "",
                    discount_percentage ? discounted_price.toString() : (service_price ?? "0")
                  )
                }
                key={index}
                className={`flex flex-col justify-center items-center p-4 border-[1px] rounded-md cursor-pointer transition-all duration-300 ease-in-out
      ${isSelected ? "border-primary bg-primary/10" : "border-gray-400 bg-white"} 
      `}
              >
                <div className="w-full h-full flex justify-center items-center mb-3">
                  <ItemImage
                    src={isValidUrl(image_path) && image_path ? image_path : ""}
                    alt={service_name ?? ""}
                    className="w-full h-full max-w-[70px] aspect-square  mix-blend-multiply"
                    addBaseUrl
                  />
                </div>
                <div className={`text-center font-semibold  text-gray-700 text-xs`}>{service_name}</div>

                {discount_percentage ? (
                  <>
                    <p className="line-through text-gray-500 mt-1 text-xs text-wrap">
                      {formatPrice(Number(service_price ?? 0))}
                    </p>
                    <p className={`text-center font-semibold text-green-600 text-xs text-wrap`}>
                      {formatPrice(discounted_price)}
                    </p>
                  </>
                ) : (
                  <p className={`text-center font-semibold  mt-1 text-green-600 text-xs text-wrap`}>
                    {formatPrice(Number(service_price ?? 0))}
                  </p>
                )}
              </div>
            );
          }
        )}
      </div>
    </>
  );
}
