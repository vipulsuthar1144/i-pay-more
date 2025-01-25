"use client";

import Breadcrumb from "@components/sections/BreadCrumb";
import ProductCard from "@components/sections/ProductCard";
import { dataIPadsList } from "@data/iPadsData";
import { useRouter } from "next/navigation";

const page = () => {
  const navigate = useRouter();
  const listenerGoToProductDetails = (navigateRoute: string) => {
    navigate.push(`/sell/ipads/${navigateRoute}`);
  };
  return (
    <>
      <section className="container m-auto pt-10 space-y-5">
        <h2 className="text-2xl font-semibold text-gray-900 font-heading">Sell your Old Ipad</h2>
        <Breadcrumb />
        <p className="text-lg font-medium text-gray-900 font-heading">Select Model</p>
        <div className=" grid grid-cols-2 gap-4 lg:grid-cols-6">
          {dataIPadsList?.map((item, index) => (
            <ProductCard
              key={index}
              title={item.model}
              img={item.image}
              onClick={() => listenerGoToProductDetails(item.slug)}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default page;
