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
        <h2 className="text-3xl font-semibold font-heading">Our Services</h2>
        {/* {subtitle && <p className="text-lg font-medium text-gray-900 font-heading">{subtitle}</p>} */}
        <div className=" grid grid-cols-2 gap-4 lg:grid-cols-6">
          {filterList?.map((item, index) => (
            <ProductCard
              key={index}
              title={item.model}
              img={item.image}
              onClick={() => listenerGoToProductList(item.link)}
            />
          ))}
        </div>
      </section>
    );
  }
);

export default ProductCategories;
