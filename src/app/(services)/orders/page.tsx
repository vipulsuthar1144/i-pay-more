"use client";

import { root_container } from "@/app/Providers";
import { SaleLeadsAPI } from "@/services/order.service";
import FallbackError from "@components/FallbackError";
import Breadcrumb from "@components/static/BreadCrumb";
import ItemImage from "@components/ui/ItemImage";
import { OrderStatus } from "@lib/constants";
import { formatDate, formatPrice } from "@lib/utils";
import { isValidUrl } from "@lib/validation";
import { ISaleLeadSchema } from "@schemas/order.schema";
import React, { useEffect, useState } from "react";
import FilterButton from "./sections/FilterButton";
import { TService } from "@schemas/product-category.schema";

const Page = () => {
  const [orderData, setOrderData] = useState<{
    loading: boolean;
    error: string | null;
    orderList: ISaleLeadSchema[];
  }>({
    loading: false,
    error: null,
    orderList: [],
  });

  const [selectedType, setSelectedType] = useState<TService>("SELL");

  useEffect(() => {
    handleGetOrdersAPICall();
  }, [selectedType]);

  const handleGetOrdersAPICall = async () => {
    try {
      setOrderData({ loading: true, error: null, orderList: [] });
      const response = await SaleLeadsAPI.get({ type: selectedType });
      setOrderData({ loading: false, error: null, orderList: response ?? [] });
    } catch (error: any) {
      setOrderData({ loading: false, error: error || "Something went wrong", orderList: [] });
    }
  };

  const renderOrderStatus = (status: number) => {
    switch (status) {
      case OrderStatus.PICKUP:
        return "Pickuped";
      case OrderStatus.CANCELLED:
        return "Cancelled";
      case OrderStatus.DELIVERED:
        return "Delivered";
      case OrderStatus.RECEIVED:
        return "Received";
      case OrderStatus.REQUESTED:
        return "Requested";
      default:
        return "Pending";
    }
  };

  const renderContent = () => {
    if (orderData.error && !orderData.loading) return <FallbackError type="something_went_wrong" />;
    if (!orderData.error && !orderData.loading && orderData.orderList.length === 0)
      return <FallbackError type="data_not_found" />;

    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {orderData.loading && !orderData.error
          ? Array.from({ length: 9 }).map((_, index) => (
              <div
                key={index}
                className="w-full h-auto sm:h-[120] md:h-[130] lg:h-[130px] m-2 bg-gray-200 animate-pulse rounded-lg"
              ></div>
            ))
          : orderData.orderList.map((item) => (
              <div key={item.id} className="bg-white shadow-custom rounded-lg p-4 w-full">
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-semibold text-sm">Order Status: {renderOrderStatus(item.lead_status ?? 0)}</p>
                    <p className="text-xs text-gray-500">{formatDate(item.leadcreatedat ?? "")}</p>
                  </div>
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
                      className="w-full h-full max-h-[70px] aspect-square mix-blend-multiply"
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
                    {formatPrice(Number(item?.variant?.price ?? 0))}
                  </p>
                </div>
              </div>
            ))}
      </div>
    );
  };

  return (
    <section className={root_container}>
      <div className="space-y-2">
        <h2 className="text-xl md:text-2xl  font-bold mb-1">Your Orders</h2>
        <Breadcrumb />
        {/* Radio Buttons */}
        <FilterButton selectedType={selectedType} setSelectedType={setSelectedType} />
      </div>

      {renderContent()}
    </section>
  );
};

export default Page;
