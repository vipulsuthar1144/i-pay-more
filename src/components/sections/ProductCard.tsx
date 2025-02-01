import ItemImage from "@components/ui/ItemImage";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React, { forwardRef } from "react";
import Breadcrumb from "../static/BreadCrumb";
import { imgDefaultPhone } from "@assets/images/product-category";
import { isValidUrl } from "@lib/validation";

interface IProductCardProps<T> {
  title: string;
  img?: string;
  onClick?: VoidFunction;
  addBaseUrl?: boolean;
}

const ProductCard = forwardRef<HTMLDivElement, IProductCardProps<any>>(
  ({ title, img, addBaseUrl = true, onClick }, ref) => {
    return (
      <div
        onClick={() => {
          onClick && onClick();
        }}
        className="bg-blue-50/10 cursor-pointer hover:shadow-md border-[1px] border-gray-400 rounded-md p-4 text-center flex flex-col items-center transition-all duration-300 ease-in-out"
      >
        <ItemImage addBaseUrl={addBaseUrl} src={isValidUrl(img) && img ? img : ""} alt={title || "Category Image"} />
        <h3 className="font-bold text-xs md:text-sm  mt-2">{title}</h3>
      </div>
    );
  }
);

export default ProductCard;
