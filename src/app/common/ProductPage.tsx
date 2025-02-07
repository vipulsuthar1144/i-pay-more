"use client";

import { root_container } from "@/app/Providers";
import { ProductAPI } from "@/services/product.service";
import FallbackError from "@components/FallbackError";
import ProductCard from "@components/sections/ProductCard";
import ProductCardSekeleton from "@components/skeletons/ProductCardSekeleton";
import Breadcrumb from "@components/static/BreadCrumb";
import Button from "@components/ui/Button";
import { extractIDfromString } from "@lib/utils";
import { TService } from "@schemas/product-category.schema";
import { IProductSchema } from "@schemas/product.schema";
import { SearchIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ISelectModelPage {
  serviceType: TService;
}
const ProductPage = ({ serviceType }: ISelectModelPage) => {
  const navigate = useRouter();
  const { categoryID } = useParams();

  // States for search query and filtered data
  const [searchQuery, setSearchQuery] = useState("");
  const [title, setTitle] = useState("Select Model Your Apple Device");

  const [productData, setProductData] = useState<{
    loading: boolean;
    error: string | null;
    page: number;
    hasMoreData: boolean;
    productList: IProductSchema[];
    filterList: IProductSchema[];
  }>({
    loading: false,
    error: null,
    page: 0,
    hasMoreData: true,
    productList: [],
    filterList: [],
  });

  useEffect(() => {
    switch (serviceType.toLowerCase()) {
      case "sell":
        setTitle("Sell Your Apple Device");
        break;

      case "buy":
        setTitle("Buy Apple Devices ");
        break;

      case "sell":
        setTitle("Repair Your Apple Device");
        break;

      default:
        break;
    }
    handleGetProductsAPI();
  }, []);

  const handleGetProductsAPI = async () => {
    try {
      const cID = extractIDfromString(categoryID?.toString());
      if (cID) {
        setProductData((pre) => ({ ...pre, loading: true, error: null }));
        const response = await ProductAPI.get(+cID as number, productData.page + 1);
        setProductData((pre) => ({
          ...pre,
          loading: false,
          error: null,
          page: productData.page + 1,
          hasMoreData: (response?.total ?? 0) > pre.productList.length,
          productList: [...pre.productList, ...(response?.products ?? [])],
          filterList: [...pre.filterList, ...(response?.products ?? [])],
        }));
      }
    } catch (error: any) {
      setProductData((pre) => ({ ...pre, error: error ?? "Something Wents Wrong" }));
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
    categoryID && navigateRoute && navigate.push(`/${serviceType.toLowerCase()}/${categoryID}/${navigateRoute}`);
  };

  const renderContent = () => {
    if (productData?.error && !productData?.loading) return <FallbackError type="something_went_wrong" />;
    if (!productData?.loading && !productData?.error && productData.filterList.length == 0)
      return <FallbackError type="data_not_found" />;
    return (
      <>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {productData?.filterList
            ?.slice()
            ?.reverse()
            ?.map((item, index) => (
              <ProductCard
                key={index}
                title={item.product_name ?? "Apple Device"}
                img={item.product_images ?? ""}
                onClick={() => listenerGoToProductDetails(`${item.product_slug}-${item.product_id}`)}
              />
            ))}
          {productData?.loading && !productData?.error && (
            <>
              {Array.from({ length: 6 })?.map((_, index) => (
                <div
                  key={index}
                  className="w-full h-[150px] md:h-[180px] aspect-square  m-2 bg-gray-200 animate-pulse rounded-lg"
                ></div>
              ))}
            </>
          )}
        </div>
        {productData.hasMoreData && (
          <div className="flex items-center justify-center">
            <Button label="Load More" isLoading={productData.loading} onClick={handleGetProductsAPI} />
          </div>
        )}
      </>
    );
  };

  return (
    <section className={`${root_container} pt-10`}>
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 font-heading">{title}</h2>
      <Breadcrumb />
      <div className="w-full gap-2 flex flex-col md:flex-row justify-between ">
        <p className="text-sm md:text-lg font-medium text-gray-900 font-heading">Select Model</p>
        <div className="relative">
          <SearchIcon className="absolute top-2.5 left-2.5 text-gray-700" size={20} />
          <input
            type="text"
            placeholder="Search model"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query
            className="w-full md:w-[250px] pl-10 pr-4 py-2 border-[1px] border-[#d2d2d7] rounded-lg text-gray-700 focus:outline-none"
          />
        </div>
      </div>
      {renderContent()}
    </section>
  );
};

export default ProductPage;
