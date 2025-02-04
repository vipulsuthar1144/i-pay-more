import ItemImage from "@components/ui/ItemImage";
import { isValidUrl } from "@lib/validation";
import React from "react";

interface IProblemCardProps {
  problem: string;
  isSelected: boolean;
  imagePath: string;
  onClick: VoidFunction;
  addBasePath?: boolean;
}
const ProblemCard = ({ problem, isSelected, imagePath, addBasePath = false, onClick }: IProblemCardProps) => {
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
    </div>
  );
};

export default ProblemCard;
