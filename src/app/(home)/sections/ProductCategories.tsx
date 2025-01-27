"use client";

import {
  iconIAccessories,
  iconIAirpods,
  iconIMacs,
  iconIPads,
  iconIPhones,
  iconIWatch,
} from "@assets/images/product-category";
import ProductCard from "@components/sections/ProductCard";
import ItemImage from "@components/ui/ItemImage";
import { ProductCategoryList } from "@data/productCategoryData";
import { TService } from "@schemas/product-category.schema";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { forwardRef } from "react";

const ProductCategories = forwardRef<HTMLDivElement, { serviceFilter?: TService | null }>(
  ({ serviceFilter = null }, ref) => {
    const navigate = useRouter();
    const listenerGoToProductList = (navigateRoute: string) => {
      navigate.push(`${navigateRoute}`);
    };
    const filterList = serviceFilter
      ? ProductCategoryList?.filter((item) => item.service == serviceFilter)
      : ProductCategoryList;
    return (
      <section ref={ref} className="container m-auto space-y-5">
        <h2 className="text-3xl font-semibold font-heading">Select Your Category</h2>
        {/* {subtitle && <p className="text-lg font-medium text-gray-900 font-heading">{subtitle}</p>} */}
        <div className="grid grid-cols-3 gap-4 lg:grid-cols-10">
          {filterList?.map((item, index) => (
            <div
              onClick={() => {
                listenerGoToProductList(item.link);
              }}
              key={index}
              className="flex flex-col items-center space-y-4 card group"
            >
              {/* Image */}
              <Image
                width={100}
                height={100}
                loading="lazy"
                draggable={false}
                src={item.image}
                alt={item.model || "Placeholder"}
                className="bg-blue-50/10 object-contain min-w-full w-full h-full aspect-square p-5 rounded-full cursor-pointer border-[1px] border-[#d2d2d7] text-center flex flex-col items-center transition-transform duration-300 ease-in-out"
              />

              {/* Text */}
              <p className="text-sm font-medium text-gray-700 group-hover:underline cursor-pointer">{item.model}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
);

export default ProductCategories;
