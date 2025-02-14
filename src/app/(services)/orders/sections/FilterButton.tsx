"use client";

import { TService } from "@schemas/product-category.schema";
import _ from "lodash";

export default function FilterButton({
  selectedType,
  setSelectedType,
}: {
  selectedType: TService;
  setSelectedType: (type: TService) => void;
}) {
  const options: TService[] = ["BUY", "SELL", "REPAIR"];

  return (
    <div className="flex gap-3 rounded-full p-1">
      {options.map((type) => (
        <button
          key={type}
          className={`px-4 py-2 text-xs font-medium rounded-full transition-all
            ${selectedType === type ? "bg-primary text-white" : "bg-gray-200 text-black"}`}
          onClick={() => setSelectedType(type)}
        >
          {_.capitalize(type)}
        </button>
      ))}
    </div>
  );
}
