"use client";

import Breadcrumb from "@components/sections/BreadCrumb";
import ProductCard from "@components/sections/ProductCard";
import { dataIPhoneList } from "@data/iPhonsData";
import { PRODUCT_TYPES } from "@lib/constants";
import { SearchIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useLayoutEffect, useState } from "react";
import _ from "lodash";
import { dataMacbookList } from "@data/mackbooksData";
import { dataIPadsList } from "@data/iPadsData";
import { IProductSchema } from "@schemas/product.schema";
import { ProductAPI } from "@/services/product.service";
import AppLoader from "@components/AppLoader";
import FallbackError from "@components/FallbackError";
import { imgDefaultCategory } from "@assets/images/product-category";
import { extractIDfromString } from "@lib/utils";

const page = () => {
  const navigate = useRouter();
  const { categoryID } = useParams();

  // States for search query and filtered data
  const [searchQuery, setSearchQuery] = useState("");
  const [title, setTitle] = useState("Sell Your Device");

  const [productData, setProductData] = useState<{
    loading: boolean;
    error: string | null;
    productList: IProductSchema[];
    filterList: IProductSchema[];
  }>({
    loading: false,
    error: null,
    productList: [],
    filterList: [],
  });

  useEffect(() => {
    handleGetProductsAPI();
  }, []);

  const handleGetProductsAPI = async () => {
    try {
      const cID = extractIDfromString(categoryID?.toString());
      if (cID) {
        setProductData({ loading: true, error: null, productList: [], filterList: [] });
        const response = await ProductAPI.get(+cID as number);
        setProductData({ loading: false, error: null, productList: response ?? [], filterList: response ?? [] });
      }
    } catch (error: any) {
      setProductData({ loading: false, error: error ?? "Something Wents Wrong", productList: [], filterList: [] });
    } finally {
      setProductData((pre) => ({ ...pre, loading: false }));
    }
  };

  // Debounce logic
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      try {
        // Filter models by search query
        if (searchQuery !== "") {
          const filteredList = productData.productList?.filter((item) =>
            item?.product_name?.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setProductData((pre) => ({ ...pre, filterList: filteredList ?? [] }));
        } else {
          setProductData((pre) => ({ ...pre, filterList: pre.productList ?? [] }));
        }
      } catch (err) {
        setProductData((pre) => ({ ...pre, error: "Something Wents Wrong" }));
      }
    }, 500); // 300ms debounce delay

    return () => clearTimeout(delayDebounce); // Cleanup timeout
  }, [searchQuery]);

  const listenerGoToProductDetails = (navigateRoute?: string) => {
    categoryID && navigateRoute && navigate.push(`/sell/${categoryID}/${navigateRoute}`);
  };

  if (productData?.error && !productData?.loading) return <FallbackError type="something_went_wrong" />;
  if (productData?.loading) return <AppLoader />;
  return (
    <section className="container m-auto pt-10 space-y-5">
      <h2 className="text-2xl font-semibold text-gray-900 font-heading">{title}</h2>
      <Breadcrumb />
      <div className="w-full flex justify-between items-center">
        <p className="text-lg font-medium text-gray-900 font-heading">Select Model</p>
        <div className="relative">
          <SearchIcon className="absolute top-2.5 left-2.5 text-gray-700" size={20} />
          <input
            type="text"
            placeholder="Search model"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query
            className="w-[250px] pl-10 pr-4 py-2 border-[1px] border-[#d2d2d7] rounded-lg text-gray-700 focus:outline-none"
          />
        </div>
      </div>
      {productData?.filterList?.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-7">
          {productData?.filterList?.map((item, index) => (
            <ProductCard
              key={index}
              title={item.product_name ?? "Apple Device"}
              img={item.product_images ?? ""}
              onClick={() => listenerGoToProductDetails(`${item.product_slug}-${item.product_id}`)}
            />
          ))}
        </div>
      ) : (
        // <p className="col-span-full text-center text-gray-700">No models found matching your search.</p>
        <FallbackError type="data_not_found" />
      )}
    </section>
  );
};

export default page;
