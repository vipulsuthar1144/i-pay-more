import useQueryParams from "@/config/hooks/useQueryParams";
import ItemImage from "@components/ui/ItemImage";
import React from "react";
import { IProductProblems } from "./page";

interface IDeviceDetails {
  productProblems: IProductProblems;
}

export default function DeviceDetails({ productProblems }: IDeviceDetails) {
  const { getParams } = useQueryParams();
  const QueryParams = getParams();
  return (
    <div className=" bg-white shadow-md rounded-md w-full sm:w-1/3 flex flex-col p-6 transition-all ease-in-out duration-300">
      <div className="flex flex-row items-center p-4">
        <div className="flex flex-row items-center justify-center h-24">
          <img
            alt={`${QueryParams.pslg}`}
            className="img-resp h-20 object-cover"
            loading="lazy"
            // fetchpriority="low"
            src={`${QueryParams.pimg}`}
          />
        </div>
        <p className=" pl-5 text-md font-semibold  text-gray-900">{QueryParams.pmn}</p>
      </div>
      <div className="text-lg font-medium text-gray-800 mb-3">Device Evaluation</div>
      <div className="text-xs text-gray-500 mb-2">Device Details</div>
      <ul className="list-disc ml-6 text-xs text-gray-600 space-y-2">
        {productProblems.basic.callFunctionality && (
          <li>
            <span className="font-semibold">Able to Make and Receive Calls:</span>{" "}
            {productProblems.basic.callFunctionality}
          </li>
        )}
        {productProblems.basic.screenOriginal && (
          <li>
            <span className="font-semibold">Screen Original:</span> {productProblems.basic.screenOriginal}
          </li>
        )}
        {productProblems.basic.warranty && (
          <li>
            <span className="font-semibold">Warranty Available:</span> {productProblems.basic.warranty}
          </li>
        )}
        {productProblems.basic.gstBill && (
          <li>
            <span className="font-semibold">GST Bill:</span> {productProblems.basic.gstBill}
          </li>
        )}
        {productProblems.basic.esimSupport && productProblems.basic.esimSupport !== "" && (
          <li>
            <span className="font-semibold">eSIM Support:</span> {productProblems.basic.esimSupport}
          </li>
        )}
        {productProblems.basic.touchScreen && productProblems.basic.touchScreen !== "" && (
          <li>
            <span className="font-semibold">Touch Screen:</span>{" "}
            {productProblems.basic.touchScreen === "Yes" ? "Working" : "Faulty"}
          </li>
        )}
      </ul>

      {productProblems.defects && productProblems.defects.length > 0 && (
        <div className="text-xs text-gray-500 mb-2 mt-2">Physical Issues</div>
      )}
      <ul className="list-disc ml-6 text-xs text-gray-600 space-y-2">
        {productProblems.defects &&
          productProblems.defects.length > 0 &&
          productProblems.defects.map((issue: any, index: number) => <li key={index}>{issue}</li>)}
      </ul>

      {productProblems.functional && productProblems.functional.length > 0 && (
        <div className="text-xs text-gray-500 mb-2 mt-2">Functional Issues</div>
      )}
      <ul className="list-disc ml-6 text-xs text-gray-600 space-y-2">
        {productProblems.functional &&
          productProblems.functional.length > 0 &&
          productProblems.functional.map((issue: any, index: number) => <li key={index}>{issue}</li>)}
      </ul>

      {/* {productProblems.basic.accessories && productProblems.basic.accessories.length > 0 && (
        <div className="text-xs text-gray-500 mb-2 mt-2">Do you have the following?</div>
      )}
      <ul className="list-disc ml-6 text-xs text-gray-600 space-y-2">
        {productProblems.basic.accessories &&
          productProblems.basic.accessories.length > 0 &&
          productProblems.basic.accessories.map((accessories: any, index: number) => <li key={index}>{accessories}</li>)}
      </ul> */}
    </div>
  );
}
