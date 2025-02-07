"use client";

import { root_container } from "@/app/Providers";
import { CategoryAPI } from "@/services/category.service";
import FallbackError from "@components/FallbackError";
import ProductCard from "@components/sections/ProductCard";
import ProductCardSekeleton from "@components/skeletons/ProductCardSekeleton";
import { ICategorySchema, TService } from "@schemas/product-category.schema";
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
    const listenerGoToProductList = (navigateRoute?: string) => {
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

    if (categoryData?.error && !categoryData?.loading) return <FallbackError type="something_went_wrong" />;
    // if (categoryData?.loading) return <AppLoader />;

    return (
      <section ref={ref} className={root_container}>
        <div>
          <h2 className="text-xl md:text-2xl px-5 md:px-0  font-bold mb-1">Select Your Category</h2>
          {serviceFilter == "SELL" && (
            <p className="text-xs  font-bold text-primary font-heading">Sell Your Apple Device with Us</p>
          )}
          {serviceFilter == "BUY" && (
            <p className="text-xs  font-bold text-primary font-heading">Buy Apple Device with Us</p>
          )}
          {serviceFilter == "REPAIR" && (
            <p className="text-xs  font-bold text-primary font-heading">Repair Your Apple Device with Us</p>
          )}
        </div>

        {/* {categoryData?.loading && <AppLoader />} */}
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 md:grid-cols-6 lg:grid-cols-9">
          {categoryData.loading && !categoryData.error ? (
            <>
              {Array.from({ length: 9 })?.map((_, index) => (
                <div
                  key={index}
                  className="w-full h-auto sm:h-[120] md:h-[130] lg:h-[130px] m-2 bg-gray-200 animate-pulse rounded-lg"
                ></div>
              ))}
            </>
          ) : (
            categoryData?.categoryList?.map((item) => (
              <ProductCard
                key={item?.category_id}
                title={item?.category_name ?? ""}
                img={item?.image_path ?? ""}
                cardClasses="bg-primary/5 shadow-none border-none h-auto sm:h-[120] md:h-[130] lg:h-[140px]  hover:shadow-none"
                onClick={() => listenerGoToProductList(`${item.category_slug}-${item.category_id}`)}
              />
            ))
          )}
        </div>
      </section>
    );
  }
);

export default ProductCategories;
