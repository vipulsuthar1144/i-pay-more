"use client";
import { root_container } from "@/app/Providers";
import useQueryParams from "@/config/hooks/useQueryParams";
import { ProductAPI } from "@/services/product.service";
import { imgDefaultCategory } from "@assets/images/product-category";
import AppLoader from "@components/AppLoader";
import FallbackError from "@components/FallbackError";
import Breadcrumb from "@components/static/BreadCrumb";
import Button from "@components/ui/Button";
import ItemImage from "@components/ui/ItemImage";
import { dataIPadsList } from "@data/iPadsData";
import { dataIPhoneList } from "@data/iPhonsData";
import { dataMacbookList } from "@data/mackbooksData";
import { PRODUCT_TYPES } from "@lib/constants";
import { extractIDfromString, formatPrice } from "@lib/utils";
import { isValidUrl } from "@lib/validation";
import { IProductSchema } from "@schemas/product.schema";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const { categoryID, productID } = useParams();
  const router = useRouter();
  const { setParams } = useQueryParams();

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
    handleGetProductsAPI();
  }, []);

  const handleGetProductsAPI = async () => {
    try {
      const pID = extractIDfromString(productID?.toString());
      if (pID) {
        setProductData({ loading: true, error: null, productDetails: null });
        const response = await ProductAPI.getByID(+pID as number);
        console.log(response);
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
      st: "BUY",
      cid: categoryID?.toString(),
    });
    router.push(`/buy/calculate${params}`);
  };

  if (productData?.error && !productData?.loading) return <FallbackError type="something_went_wrong" />;
  if (productData?.loading) return <AppLoader />;
  if (!productData.productDetails) return <FallbackError type="data_not_found" />;

  return (
    <div className={` ${root_container}   py-10 space-y-5 `}>
      <h2 className="text-2xl font-semibold text-gray-900 font-heading">
        Buy Refurbished {productDetails?.product_name}
      </h2>
      <Breadcrumb />
      {/* <div className=""> */}
      <div className="bg-white rounded-md border-[1px] border-gray-400 p-6 md:p-16 w-full flex flex-col md:flex-row md:items-center  space-x-10 space-y-0 sm:space-y-5 ">
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
        <div className=" flex flex-2 flex-col items-start">
          <h2 className="text-xl font-semibold mb-4 ">{productDetails?.product_name}</h2>
          <p className="text-gray-500 mb-2 text-base">Choose a variant</p>

          {/* Storage Options */}
          <div className="flex flex-wrap gap-4 justify-start mb-4">
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
                className={`px-4 py-2 border-[1px] rounded-md text-sm font-medium transition-all duration-200 ease-in-out ${
                  selectedData.varientID === variant?.variant_id
                    ? "border-black text-black scale-110"
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
          <div className="flex space-x-4 justify-center md:justify-start mb-4">
            {productDetails?.colors?.map((color, index: number) => (
              <button
                key={index}
                onClick={() => {
                  console.log(color);

                  color.color_id &&
                    setSelectedData((pre) => ({
                      ...pre,
                      color: color?.color_html_code ?? "",
                      colorID: color?.color_id ?? null,
                    }));
                }}
                className={`w-10 h-10 rounded-full border-2 transition-all duration-200 ease-in-out ${
                  selectedData.colorID == color.color_id ? "border-black scale-110" : "border-gray-300"
                } `}
                style={{ backgroundColor: color.color_html_code }}
              ></button>
            ))}
          </div>

          {selectedData.price && (
            <p className="text-lg font-semibold text-green-600 mb-4">{formatPrice(+selectedData.price as number)}</p>
          )}
          {/* Action Button */}
          <Button
            disabled={!selectedData.colorID || !selectedData.varientID}
            haveRightArrow
            onClick={handleSetParams}
            label="Continue"
          />
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default page;
