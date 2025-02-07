"use client";

import { root_container } from "@/app/Providers";
import { SaleLeadsAPI } from "@/services/order.service";
import FallbackError from "@components/FallbackError";
import ProductCard from "@components/sections/ProductCard";
import Breadcrumb from "@components/static/BreadCrumb";
import ItemImage from "@components/ui/ItemImage";
import { OrderStatus } from "@lib/constants";
import { formatDate, formatPrice } from "@lib/utils";
import { isValidUrl } from "@lib/validation";
import { ISaleLeadSchema } from "@schemas/order.schema";
import React, { useEffect, useState } from "react";

const page = () => {
  const [orderData, setOrderData] = useState<{
    loading: boolean;
    error: string | null;
    orderList: ISaleLeadSchema[];
  }>({
    loading: false,
    error: null,
    orderList: [],
  });

  useEffect(() => {
    handleGetOrdersAPICall();
  }, []);

  const handleGetOrdersAPICall = async () => {
    try {
      setOrderData({ loading: true, error: null, orderList: [] });
      const response = await SaleLeadsAPI.get();
      setOrderData({ loading: false, error: null, orderList: response ?? [] });
    } catch (error: any) {
      setOrderData({ loading: false, error: error || "Something wents wrong", orderList: [] });
    }
  };

  const renderOrderStatus = (status: number) => {
    switch (status) {
      case OrderStatus.PICKUP:
        return "PICKUP";
      case OrderStatus.CANCELLED:
        return "CANCELLED";
      case OrderStatus.DELIVERED:
        return "DELIVERED";
      case OrderStatus.RECEIVED:
        return "RECEIVED";
      case OrderStatus.REQUESTED:
        return "REQUESTED";
      default:
        return "Unknown";
    }
  };

  const renderContent = () => {
    if (orderData?.error && !orderData?.loading) return <FallbackError type="something_went_wrong" />;
    if (!orderData.error && !orderData.loading && orderData.orderList.length === 0)
      return <FallbackError type="data_not_found" />;
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
        {orderData.loading && !orderData.error ? (
          <>
            {Array.from({ length: 9 })?.map((_, index) => (
              <div
                key={index}
                className="w-full h-auto sm:h-[120] md:h-[130] lg:h-[130px] m-2 bg-gray-200 animate-pulse rounded-lg"
              ></div>
            ))}
          </>
        ) : (
          orderData?.orderList?.map((item) => (
            // <ProductCard
            //   key={item?.id}
            //   title={item?.product?.product_name ?? ""}
            //   img={item?.product?.product_images ?? ""}
            //   addBaseUrl
            //   cardClasses="bg-primary/5 shadow-none border-none h-auto sm:h-[120] md:h-[130] lg:h-[140px]  hover:shadow-none"
            //   //   onClick={() => listenerGoToProductList(`${item.category_slug}-${item.category_id}`)}
            // />
            <div key={item?.id} className="bg-white shadow-custom rounded-lg p-4 w-full">
              <div className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center gap-2">
                  {/* <div className="w-6 h-6 bg-red-500 flex items-center justify-center rounded-full">
                    <span className="text-white text-sm font-bold">&#10006;</span>
                  </div> */}
                  <div>
                    <p className="font-semibold text-sm">{renderOrderStatus(item.lead_status ?? 0)}</p>
                    <p className="text-xs text-gray-500">{formatDate(item.leadcreatedat ?? "")}</p>
                  </div>
                </div>
                {/* <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">SELL</span> */}
              </div>

              <div className="flex items-end gap-4 py-4">
                <div className="w-[50px] h-[50px] flex justify-center items-center">
                  <ItemImage
                    src={
                      isValidUrl(item.product?.product_images) && item.product?.product_images
                        ? item.product?.product_images
                        : ""
                    }
                    alt={item.product?.product_name ?? ""}
                    className="w-full h-full max-h-[70px] aspect-square  mix-blend-multiply"
                    addBaseUrl
                  />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Order ID: {item.id}</p>
                  <p className="font-semibold text-sm">{item.product?.product_name}</p>
                  <p className="text-xs text-gray-500">
                    {item?.variant?.storage} / {item?.color?.color_name}
                  </p>
                </div>
                <p className="font-semibold text-sm text-green-500">
                  {formatPrice(Number(item?.variant?.price ?? 0) ?? 0)}
                </p>
              </div>

              {/* <div className="border-t pt-2 mt-1">
                <p className="font-semibold text-sm">Order Status</p>
                <div className="flex items-center justify-between mt-4">
                  <div className="text-center flex flex-col justify-center items-center">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white">
                      ✔
                    </div>
                    <p className="font-semibold text-xs mt-1">Pickup Requested</p>
                    <p className="text-xs text-gray-500">Thu, 6th Feb</p>
                  </div>
                  <div className="flex-1 border-t border-red-400 mx-2"></div>
                  <div className="text-center flex flex-col justify-center items-center">
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white">
                      &#10006;
                    </div>
                    <p className="font-semibold text-xs mt-1">Pickup Cancelled</p>
                    <p className="text-xs text-gray-500">Fri, 7th Feb</p>
                  </div>
                </div>
              </div> */}
            </div>
          ))
        )}
      </div>
    );
  };
  return (
    <section className={root_container}>
      <div className="space-y-2">
        <h2 className="text-xl md:text-2xl px-5 md:px-0  font-bold mb-1">Your Orders</h2>
        <Breadcrumb />
      </div>

      {renderContent()}
    </section>
  );
};

export default page;
