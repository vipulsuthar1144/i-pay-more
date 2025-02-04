import ItemImage from "@components/ui/ItemImage";
import { formatPrice } from "@lib/utils";
import { isValidUrl } from "@lib/validation";
import React from "react";

interface IProblemCardProps {
  problem: string;
  isSelected: boolean;
  subtitle?: string;
  imagePath: string;
  onClick: VoidFunction;
  addBasePath?: boolean;
}
const ProblemCard = ({
  problem,
  isSelected,
  subtitle = "",
  imagePath,
  addBasePath = false,
  onClick,
}: IProblemCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col justify-center items-center p-4 border-[1px] rounded-md cursor-pointer transition-all duration-300 ease-in-out
      ${isSelected ? "border-primary bg-primary/10" : "border-gray-400 bg-white"} 
      `}
    >
      <div className="w-full h-full flex justify-center items-center mb-3">
        <ItemImage
          src={isValidUrl(imagePath) && imagePath ? imagePath : ""}
          alt={problem}
          className="w-full h-full min-w-full mix-blend-multiply"
          addBaseUrl={addBasePath}
        />
      </div>
      <div className={`text-center font-semibold  text-gray-700 text-xs`}>{problem}</div>
      {subtitle && (
        <p className={`text-center font-semibold  mt-1 text-green-600 text-xs`}>{formatPrice(Number(subtitle ?? 0))}</p>
      )}
    </div>
  );
};

export default ProblemCard;
