"use client";

import { CategoryAPI } from "@/services/category.service";
import {
  iconIAccessories,
  iconIAirpods,
  iconIMacs,
  iconIPads,
  iconIPhones,
  iconIWatch,
  imgDefaultCategory,
} from "@assets/images/product-category";
import AppLoader from "@components/AppLoader";
import FallbackError from "@components/FallbackError";
import ProductCard from "@components/sections/ProductCard";
import ItemImage from "@components/ui/ItemImage";
import { ProductCategoryList } from "@data/productCategoryData";
import { ICategorySchema, TService } from "@schemas/product-category.schema";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { forwardRef, useEffect, useState } from "react";

const ProductCategories = forwardRef<HTMLDivElement, { serviceFilter?: TService | null }>(
  ({ serviceFilter = "SELL" }, ref) => {
    const navigate = useRouter();
    const [categoryData, setCategoryData] = useState<{
      loading: boolean;
      error: string | null;
      categoryList: ICategorySchema[];
    }>({
      loading: false,
      error: null,
      categoryList: [],
    });
    const listenerGoToProductList = (navigateRoute?: number) => {
      navigateRoute && navigate.push(`${serviceFilter?.toLowerCase()}/${navigateRoute}`);
    };

    useEffect(() => {
      handleGetCategoriesAPI();
    }, []);

    const handleGetCategoriesAPI = async () => {
      try {
        setCategoryData({ loading: true, error: null, categoryList: [] });
        const response = await CategoryAPI.get();
        setCategoryData({ loading: false, error: null, categoryList: response?.categories ?? [] });
      } catch (error: any) {
        setCategoryData({ loading: false, error: error || "Something wents wrong", categoryList: [] });
      }
    };

    if (categoryData?.error && categoryData?.loading) return <FallbackError type="something_went_wrong" />;
    if (categoryData?.loading) return <AppLoader />;
    return (
      <section ref={ref} className="container m-auto space-y-5">
        <h2 className="text-3xl font-semibold font-heading">Select Your Category</h2>
        {/* {subtitle && <p className="text-lg font-medium text-gray-900 font-heading">{subtitle}</p>} */}
        {/* {categoryData?.loading && <AppLoader />} */}
        <div className="grid grid-cols-3 gap-4 lg:grid-cols-8">
          {categoryData?.categoryList?.map((item, index) => (
            <ProductCard
              key={item?.category_id}
              title={item?.category_name ?? ""}
              img={item?.image_path ?? imgDefaultCategory}
              onClick={() => listenerGoToProductList(item.category_id)}
            />
          ))}
        </div>
      </section>
    );
  }
);

export default ProductCategories;
