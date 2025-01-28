import useQueryParams from "@/config/hooks/useQueryParams";
import ItemImage from "@components/ui/ItemImage";
import React from "react";
import { imgDefaultCategory } from "@assets/images/product-category";
import { IProductProblems } from "@schemas/order.schema";

interface IDeviceDetails {
  productProblems: IProductProblems;
}

export default function DeviceDetails({ productProblems }: IDeviceDetails) {
  const { getParams } = useQueryParams();
  const QueryParams = getParams();
  return (
    <div className=" bg-white border-[1px] border-gray-400 rounded-md w-full sm:w-1/3 flex flex-col p-6 transition-all ease-in-out duration-300">
      <div className="flex flex-row items-center p-4">
        <div className="flex flex-row items-center justify-center h-24">
          <ItemImage src={imgDefaultCategory} alt={QueryParams.pmn} className="max-w-20 w-20 h-20" />
        </div>
        <div className="pl-5">
          <p className=" text-md font-semibold  text-gray-900">{QueryParams.pmn}</p>
          <p className=" text-sm text-gray-500">({QueryParams.pvid})</p>
          {/* <p className=" text-sm text-gray-500">{QueryParams.pclr}</p> */}
        </div>
      </div>
      <div className="text-lg font-medium text-gray-800 mb-3">Device Evaluation</div>
      {/* <div className="text-xs font-semibold  text-gray-600 mb-2">Device Details</div> */}
      {/* <ul className="list-disc ml-6 text-xs text-gray-600 space-y-2">
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
            {productProblems.basic.touchScreen !== "NO" ? "Working" : "Faulty"}
          </li>
        )}
      </ul> */}
      {productProblems.basic && productProblems.basic.length > 0 && (
        <div className="text-xs font-semibold  text-gray-600 mb-2 mt-2">Device Details</div>
      )}
      <ul className="list-disc ml-6 text-xs text-gray-600 space-y-2">
        {productProblems.basic &&
          productProblems.basic.length > 0 &&
          productProblems.basic.map((issue, index: number) => (
            <li key={index}>{`${issue.question} : ${issue.answer}`}</li>
          ))}
      </ul>

      {productProblems.defects && productProblems.defects.length > 0 && (
        <div className="text-xs font-semibold  text-gray-600 mb-2 mt-2">Physical Issues</div>
      )}
      <ul className="list-disc ml-6 text-xs text-gray-600 space-y-2">
        {productProblems.defects &&
          productProblems.defects.length > 0 &&
          productProblems.defects.map((issue, index: number) => <li key={index}>{issue.question}</li>)}
      </ul>

      {productProblems.functional && productProblems.functional.length > 0 && (
        <div className="text-xs font-semibold  text-gray-600 mb-2 mt-2">Functional Issues</div>
      )}
      <ul className="list-disc ml-6 text-xs text-gray-600 space-y-2">
        {productProblems.functional &&
          productProblems.functional.length > 0 &&
          productProblems.functional.map((issue, index: number) => <li key={index}>{issue.question}</li>)}
      </ul>

      {productProblems.accessories && productProblems.accessories.length > 0 && (
        <div className="text-xs font-semibold  text-gray-600 mb-2 mt-2">Do you have the following?</div>
      )}
      <ul className="list-disc ml-6 text-xs text-gray-600 space-y-2">
        {productProblems.accessories &&
          productProblems.accessories.length > 0 &&
          productProblems.accessories.map((accessories, index: number) => <li key={index}>{accessories.question}</li>)}
      </ul>
    </div>
  );
}
