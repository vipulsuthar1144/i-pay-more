"use client";
import Breadcrumb from "@components/sections/BreadCrumb";
import ItemImage from "@components/ui/ItemImage";
import { dataIPadsList } from "@data/iPadsData";
import { dataIPhoneList } from "@data/iPhonsData";
import { dataMacbookList } from "@data/mackbooksData";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useState } from "react";

const page = () => {
  const { macbookID } = useParams();

  const productDetails = dataMacbookList.find((data) => data.slug === decodeURIComponent(macbookID as string));
  // console.log(iPadDetails, ipadID, dataIPadsList);

  if (!productDetails) {
    return (
      <section className="w-full h-full flex items-center justify-center">
        <h2 className="text-xl font-bold">No Data Available</h2>
      </section>
    );
  }

  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  return (
    <div className=" container m-auto py-10 space-y-5 ">
      <h2 className="text-2xl font-semibold text-gray-900 font-heading">Sell Old {productDetails.model}</h2>
      <Breadcrumb />
      {/* <div className=""> */}
      <div className="bg-white rounded-md  shadow-md p-6 md:p-16 w-full flex flex-col md:flex-row md:items-center  space-x-10 space-y-0 sm:space-y-5 ">
        {/* Product Image */}
        {/* <div className=" items-center justify-center flex md:flex-col"> */}
        <div className="flex w-full max-w-[25%] flex-row sm:m-auto md:m-0 items-center justify-center">
          <ItemImage
            src={productDetails?.image}
            alt="Product"
            className="w-44 h-44 max-w-44  mx-auto md:mx-0 mb-4 md:mb-0"
          />
        </div>

        {/* Product Details */}
        <div className=" flex flex-2 flex-col items-start">
          <h2 className="text-xl font-semibold mb-4 ">{productDetails.model}</h2>
          <p className="text-gray-500 mb-1 text-sm">Choose a variant</p>
          <p className="text-md font-semibold text-gray-500 mb-4 ">
            Processor : <span className="text-black">{productDetails.processor}</span>
          </p>
          {/* Storage Options */}
          {/* <div className="flex flex-wrap gap-4 justify-start mb-6">
            {productDetails?.storages?.map((storage) => (
              <button
                key={storage}
                onClick={() => setSelectedStorage(storage)}
                className={`px-4 py-2 border-2 rounded-md text-sm font-medium transition-all duration-200 ease-in-out ${
                  selectedStorage === storage ? "border-black text-black scale-110" : "border-gray-300 text-gray-500"
                }`}
              >
                {storage}
              </button>
            ))}
          </div> */}

          {/* Color Options */}
          <div className="flex space-x-4 justify-center md:justify-start mb-4">
            {productDetails?.colors?.map((color, index) => (
              <button
                key={index}
                onClick={() => setSelectedColor(color)}
                className={`w-10 h-10 rounded-full border-2 transition-all duration-200 ease-in-out ${
                  selectedColor === color ? "border-black scale-110" : "border-gray-300"
                } `}
                style={{ backgroundColor: color }}
              ></button>
            ))}
          </div>

          {/* Action Button */}
          <button
            disabled={!selectedColor}
            className="bg-black disabled:cursor-not-allowed disabled:opacity-50 text-white py-2 px-6 rounded-md flex items-center justify-center shadow-md hover:bg-gray-800 transition duration-300"
          >
            Continue
            <span className="ml-2">→</span>
          </button>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default page;
