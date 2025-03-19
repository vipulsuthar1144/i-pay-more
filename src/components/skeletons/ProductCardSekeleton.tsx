import React from "react";

const ProductCardSekeleton = () => {
  return (
    <>
      {Array.from({ length: 7 })?.map((_, index) => (
        <div key={index} className="w-full h-[150px] m-2 bg-gray-200 animate-pulse rounded-lg"></div>
      ))}
    </>
  );
};

export default ProductCardSekeleton;
