import ItemImage from "@components/ui/ItemImage";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React, { forwardRef } from "react";
import Breadcrumb from "./BreadCrumb";
import { imgDefaultPhone } from "@assets/images/product-category";
import { isValidUrl } from "@lib/validation";

interface IProductCardProps<T> {
  title: string;
  img?: string;
  onClick?: VoidFunction;
}

const ProductCard = forwardRef<HTMLDivElement, IProductCardProps<any>>(({ title, img, onClick }, ref) => {
  return (
    <div
      onClick={() => {
        onClick && onClick();
      }}
      className="bg-blue-50/10 cursor-pointer hover:shadow-md border-[1px] border-gray-400 rounded-md p-4 text-center flex flex-col items-center transition-all duration-300 ease-in-out"
    >
      <ItemImage src={isValidUrl(img) && img ? img : ""} alt={title || "Category Image"} />
      <h3 className="font-medium text-sm mt-2">{title}</h3>
    </div>
  );
});

export default ProductCard;
