"use client";

import Breadcrumb from "@components/static/BreadCrumb";
import Button from "@components/ui/Button";
import ItemImage from "@components/ui/ItemImage";
import { extractIDfromString, formatPrice, getDeviceType } from "@lib/utils";
import { isValidUrl } from "@lib/validation";
import React, { useEffect, useState } from "react";
import { root_container } from "../Providers";
import FallbackError from "@components/FallbackError";
import AppLoader from "@components/AppLoader";
import { IProductSchema } from "@schemas/product.schema";
import { useParams, useRouter } from "next/navigation";
import useQueryParams from "@/config/hooks/useQueryParams";
import { ProductAPI } from "@/services/product.service";
import { TService } from "@schemas/product-category.schema";

interface IProductDetailPage {
  serviceType: TService;
}
const ProductDetailPage = ({ serviceType }: IProductDetailPage) => {
  const { categoryID, productID } = useParams();
  const router = useRouter();
  const { setParams } = useQueryParams();
  const [title, setTitle] = useState("Select Varient of Your Apple Device");

  const [selectedData, setSelectedData] = useState<{
    color: string;
    colorID: number | null;
    varientID: number | null;
    varient: string;
    price: string | null;
  }>({
    color: "",
    varientID: null,
    colorID: null,
    varient: "",
    price: null,
  });
  const [productData, setProductData] = useState<{
    loading: boolean;
    error: string | null;
    productDetails: IProductSchema | null;
  }>({
    loading: false,
    error: null,
    productDetails: null,
  });
  const { productDetails } = productData;

  useEffect(() => {
    switch (serviceType.toLowerCase()) {
      case "sell":
        setTitle("Sell Your ");
        break;

      case "buy":
        setTitle("Buy ");
        break;

      case "sell":
        setTitle("Repair Your ");
        break;

      default:
        break;
    }
    handleGetProductsAPI();
  }, []);

  const handleGetProductsAPI = async () => {
    try {
      const pID = extractIDfromString(productID?.toString());
      if (pID) {
        setProductData({ loading: true, error: null, productDetails: null });
        const response = await ProductAPI.getByID(+pID as number);
        setProductData({ loading: false, error: null, productDetails: response });
      }
    } catch (error: any) {
      setProductData({ loading: false, error: error ?? "Something Wents Wrong", productDetails: null });
    } finally {
      setProductData((pre) => ({ ...pre, loading: false }));
    }
  };

  const handleSetParams = () => {
    // Example of setting query parameters
    const params = setParams({
      pid: productDetails?.product_id?.toString(),
      pslg: productDetails?.product_slug?.toString(),
      pmn: productDetails?.product_name,
      pclrid: selectedData.colorID?.toString() ?? undefined,
      pclr: selectedData.color ?? undefined,
      pvid: selectedData.varientID?.toString() ?? undefined,
      pv: selectedData.varient ?? undefined,
      ppcsr: undefined,
      pimg: productDetails?.product_images,
      st: serviceType,
      cid: categoryID?.toString(),
      dt: getDeviceType(productDetails?.product_slug?.toString() ?? ""),
    });
    router.push(`/${serviceType.toLowerCase()}/calculate${params}`);
  };

  const renderSkeleton = () => {
    return (
      <>
        {/* Image Skeleton */}
        <div className="w-full md:max-w-[25%] h-40 bg-gray-200 animate-pulse rounded-lg self-center mb-5 md:mb-0 m-auto md:m-0"></div>

        {/* Content Skeleton */}
        <div className="flex flex-2 flex-col justify-start items-start w-full space-y-4">
          {/* Title */}

          <h2 className="h-6 w-3/4 bg-gray-200 animate-pulse rounded "></h2>

          {/* Description */}
          <p className="h-4 w-1/4 bg-gray-200 animate-pulse rounded"></p>

          {/* Tags/Buttons */}
          <div className="flex flex-wrap gap-4 w-full">
            <div className="h-8 w-24 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-8 w-24 bg-gray-200 animate-pulse rounded"></div>
          </div>

          {/* Buttons/Actions */}
          <div className="flex space-x-4  w-full justify-start">
            <div className="h-14 w-14 bg-gray-200 animate-pulse rounded-full"></div>
            <div className="h-14 w-14 bg-gray-200 animate-pulse rounded-full"></div>
          </div>

          {/* Additional button */}
          <div className="h-10 w-40 bg-gray-200 animate-pulse rounded"></div>
        </div>
      </>
    );
  };

  const renderContent = () => {
    if (productData?.error && !productData?.loading) return <FallbackError type="something_went_wrong" />;
    // if (productData?.loading) {
    //   return (
    //     <div className="w-full flex justify-center items-center">
    //       <AppLoader />
    //     </div>
    //   );
    // }
    if (productData?.loading) return renderSkeleton();

    if (!productData.productDetails && !productData?.loading) return <FallbackError type="data_not_found" />;
    return (
      <>
        {/* Product Image */}
        {/* <div className=" items-center justify-center flex md:flex-col"> */}
        <div className="flex w-full max-w-[25%] flex-row sm:m-auto md:m-0 items-center justify-center">
          <ItemImage
            src={
              isValidUrl(productDetails?.product_images) && productDetails?.product_images
                ? productDetails?.product_images
                : ""
            }
            alt="Product"
            className="w-40 h-40 max-w-44  mx-auto md:mx-0 mb-4 md:mb-0"
          />
        </div>

        {/* Product Details */}
        <div className=" flex flex-2 flex-col items-start space-y-2 md:space-y-4">
          <h2 className="text-lg md:text-xl font-semibold">{productDetails?.product_name}</h2>
          <p className="text-gray-500  text-sm md:text-base">Choose a variant</p>

          {/* Storage Options */}
          <div className="flex flex-wrap gap-4 justify-start">
            {productDetails?.Variants?.map((variant) => (
              <button
                key={variant?.variant_id}
                onClick={() => {
                  variant.variant_id &&
                    setSelectedData((pre) => ({
                      ...pre,
                      varientID: variant?.variant_id ?? null,
                      varient: `${variant.memory && variant.memory} ${variant.storage && variant.storage} ${variant.processor?.processor_name && variant.processor?.processor_name}`,
                      price: variant.price?.toString() ?? null,
                    }));
                }}
                className={`px-4 py-2 border-[1px] rounded-md text-xs md:text-sm font-medium transition-all duration-200 ease-in-out ${
                  selectedData.varientID === variant?.variant_id
                    ? "border-primary text-black scale-110"
                    : "border-gray-400 text-gray-500"
                }`}
              >
                {/* {`${variant.storage} / ${variant.storage} (${variant?.processor?.processor_name})`} */}
                {variant.memory && <span>{`${variant.memory} / `}</span>}
                {variant.storage && <span>{variant.storage}</span>}
                {variant.processor?.processor_name && <span>{` (${variant.processor?.processor_name}) `}</span>}
              </button>
            ))}
          </div>

          {/* Color Options */}
          <div className="flex space-x-4 justify-center md:justify-start">
            {productDetails?.Variants?.map(
              (item, index: number) =>
                item.color && (
                  <button
                    key={index}
                    onClick={() => {
                      item?.color?.color_id &&
                        setSelectedData((pre) => ({
                          ...pre,
                          color: item?.color?.color_html_code ?? "",
                          colorID: item?.color?.color_id ?? null,
                        }));
                    }}
                    className={`w-10 h-10 rounded-full border-2 transition-all duration-200 ease-in-out ${
                      selectedData.colorID == item?.color?.color_id ? "border-primary scale-110" : "border-gray-300"
                    } `}
                    style={{ backgroundColor: item?.color?.color_html_code }}
                  ></button>
                )
            )}
          </div>

          {selectedData.price && serviceType == "BUY" && (
            <p className="text-lg font-semibold text-green-600">{formatPrice(+selectedData.price as number)}</p>
          )}
          {/* Action Button */}
          <Button
            disabled={!selectedData.colorID || !selectedData.varientID}
            haveRightArrow
            onClick={handleSetParams}
            label="Continue"
          />
        </div>
      </>
    );
  };

  return (
    <div className={` ${root_container}   pt-10 space-y-5 `}>
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 font-heading">
        {title} {productDetails?.product_name}
      </h2>
      <Breadcrumb />

      <div className="bg-white rounded-md border-[1px] border-gray-400 p-6 md:p-16 w-full flex flex-col md:flex-row md:items-center  space-y-0 sm:space-y-5 ">
        {renderContent()}
      </div>
    </div>
  );
};

export default ProductDetailPage;
