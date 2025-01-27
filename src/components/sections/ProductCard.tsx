import ItemImage from "@components/ui/ItemImage";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React, { forwardRef } from "react";
import Breadcrumb from "./BreadCrumb";
import { imgDefaultPhone } from "@assets/images/product-category";

interface IProductCardProps<T> {
  title: string;
  img?: string | StaticImageData;
  onClick?: VoidFunction;
}

const ProductCard = forwardRef<HTMLDivElement, IProductCardProps<any>>(
  ({ title, img = imgDefaultPhone, onClick }, ref) => {
    return (
      <div
        onClick={() => {
          onClick && onClick();
        }}
        className="bg-blue-50/10 cursor-pointer hover:scale-105 border-[1px] border-[#d2d2d7] rounded-lg p-4 text-center flex flex-col items-center transition-transform duration-300 ease-in-out"
      >
        {img && <ItemImage src={img as string} alt={title || "Category Image"} />}
        <h3 className="font-medium text-sm mt-2">{title}</h3>
      </div>
    );
  }
);

export default ProductCard;
