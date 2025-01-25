"use client";

import Breadcrumb from "@components/sections/BreadCrumb";
import ProductCard from "@components/sections/ProductCard";
import ItemImage from "@components/ui/ItemImage";
import { dataIPadsList } from "@data/iPadsData";
import { dataIPhoneList } from "@data/iPhonsData";
import { dataMacbookList } from "@data/mackbooksData";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const navigate = useRouter();
  const listenerGoToProductDetails = (navigateRoute: string) => {
    navigate.push(`/sell/macbooks/${navigateRoute}`);
  };
  return (
    <section className="container m-auto pt-10 space-y-5">
      <h2 className="text-2xl font-semibold text-gray-900 font-heading">Sell your Old Macbook</h2>
      <Breadcrumb />
      <p className="text-lg font-medium text-gray-900 font-heading">Select Model</p>
      <div className=" grid grid-cols-2 gap-4 lg:grid-cols-6">
        {dataMacbookList?.map((item, index) => (
          <ProductCard
            key={index}
            title={item.model}
            img={item.image}
            onClick={() => listenerGoToProductDetails(item.slug)}
          />
        ))}
      </div>
    </section>
  );
};

export default page;
