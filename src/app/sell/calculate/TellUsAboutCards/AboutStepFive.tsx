"use client";
import React, { useState } from "react";
import Button from "@components/ui/Button";
import ItemImage from "@components/ui/ItemImage";
import { dataProductQuestions } from "@data/productQuestions";
import { IAddressSchema, IProductProblems } from "@schemas/order.schema";
import useQueryParams from "@/config/hooks/useQueryParams";
import { dataStateList } from "@data/statesData";
import { SaleLeadsAPI } from "@/services/order.service";
import toastUtils from "@lib/toast";
import OrderPlacedDialog from "../DialogSumitted";
import { useRouter } from "next/navigation";

interface IAboutStepFourProps {
  productProblems: IProductProblems;
  setProductProblems: React.Dispatch<React.SetStateAction<IProductProblems>>;
  handleContinue: VoidFunction;
  handleBack: VoidFunction;
}
export default function AboutStepFive({
  productProblems,
  setProductProblems,
  handleContinue,
  handleBack,
}: IAboutStepFourProps) {
  const { getParams } = useQueryParams();
  const QueryParams = getParams();
  const router = useRouter();
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [formData, setFormData] = useState<IAddressSchema>({
    name: "",
    mobile: "",
    pincode: "",
    locality: "",
    address: "",
    city: "",
    state: "",
    landmark: "",
    alternatePhone: "",
    addressType: "",
  });

  const [errors, setErrors] = useState<IAddressSchema>({
    name: "",
    mobile: "",
    pincode: "",
    locality: "",
    address: "",
    city: "",
    state: "",
    landmark: "",
    alternatePhone: "",
    addressType: "",
  });

  const validate = () => {
    let newErrors: IAddressSchema | null = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!/^[0-9]{10}$/.test(formData.mobile ?? "")) newErrors.mobile = "Invalid mobile number";
    if (!formData.pincode) newErrors.pincode = "Pincode is required";
    if (!formData.locality) newErrors.locality = "Locality is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (validate()) {
      // alert("Form submitted successfully!");
      handleCreateSaleLeadsAPI();
    }
  };

  const handleCreateSaleLeadsAPI = async () => {
    try {
      await SaleLeadsAPI.create({
        name: formData.name,
        mobile: formData.mobile,
        email: "mahendra@corporateking.in",
        city: formData.city,
        state: formData.state,
        product_id: Number(QueryParams.pid),
        variant_id: Number(QueryParams.pvid),
        lead_details: {
          address: formData,
          questions: productProblems,
        },
      });
      setOpenSuccessDialog(true);
    } catch (error: any) {
      toastUtils.error("Failed to create sale leads. Please try again later.");
      console.error(error);
    }
  };
  return (
    <div className="rounded-md w-full sm:w-2/3 bg-white border-[1px] border-gray-400 p-6 sm:mr-4 sm:min-h-72 flex flex-col justify-between">
      <OrderPlacedDialog
        isOpen={openSuccessDialog}
        onClose={() => {
          setOpenSuccessDialog(false);
          router.replace("/");
        }}
      />
      <div>
        <div className="text-center text-xl font-semibold text-gray-800 mb-5">You Are Almost Done</div>
        <div className="text-center text-gray-600 mb-4 text-sm">Fill Your Address Details</div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                className="p-2 border rounded w-full"
                onChange={handleChange}
              />
              {errors.name && <span className="text-red-500">{errors.name}</span>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Mobile</label>
              <input
                type="text"
                name="mobile"
                placeholder="Enter a 10-digit mobile number"
                className="p-2 border rounded w-full"
                onChange={handleChange}
              />
              {errors.mobile && <span className="text-red-500">{errors.mobile}</span>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Pincode</label>
              <input
                type="text"
                name="pincode"
                placeholder="Enter your area pincode"
                className="p-2 border rounded w-full"
                onChange={handleChange}
              />
              {errors.pincode && <span className="text-red-500">{errors.pincode}</span>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Locality</label>
              <input
                type="text"
                name="locality"
                placeholder="Enter your locality"
                className="p-2 border rounded w-full"
                onChange={handleChange}
              />
              {errors.locality && <span className="text-red-500">{errors.locality}</span>}
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <textarea
                name="address"
                placeholder="Enter your address (Area and Street)"
                className="p-2 border rounded w-full"
                onChange={handleChange}
              ></textarea>
              {errors.address && <span className="text-red-500">{errors.address}</span>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">City/District/Town</label>
              <input
                type="text"
                name="city"
                placeholder="Enter your city/district/town"
                className="p-2 border rounded w-full"
                onChange={handleChange}
              />
              {errors.city && <span className="text-red-500">{errors.city}</span>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">State</label>
              <select
                name="state"
                className="w-full px-3 py-2 border rounded-md bg-white cursor-pointer focus:outline-none focus:ring-1 focus:ring-black transition-all duration-300 ease-in-out"
                onChange={handleChange}
              >
                <option value="" disabled>
                  --Select your state--
                </option>
                {dataStateList.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              {errors.state && <span className="text-red-500">{errors.state}</span>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Landmark</label>
              <input
                type="text"
                name="landmark"
                placeholder="Enter a landmark (optional)"
                className="p-2 border rounded w-full"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Alternate Phone</label>
              <input
                type="text"
                name="alternatePhone"
                placeholder="Enter an alternate phone number (optional)"
                className="p-2 border rounded w-full"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mt-4">
            <span className="block text-sm font-medium text-gray-700 mb-2">Address Type</span>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer p-2 border-[1px] rounded-md hover:bg-gray-100  focus-within:ring-[1px] focus-within:ring-black">
                <input
                  type="radio"
                  name="addressType"
                  value="Home"
                  className="appearance-none peer"
                  onChange={handleChange}
                />
                <div className="w-4 h-4 border-[1px] rounded-full flex items-center justify-center peer-checked:border-black peer-checked:bg-black">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span className="text-gray-700 peer-checked:text-black">Home</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer p-2 border rounded-md hover:bg-gray-100 focus-within:ring-[1px] focus-within:ring-black">
                <input
                  type="radio"
                  name="addressType"
                  value="Work"
                  className="appearance-none peer"
                  onChange={handleChange}
                />
                <div className="w-4 h-4 border-[1px] rounded-full flex items-center justify-center peer-checked:border-black peer-checked:bg-black">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span className="text-gray-700 peer-checked:text-black">Work</span>
              </label>
            </div>
          </div>

          <div className="flex justify-between items-center gap-5 mt-5">
            <Button label={"Back"} haveLeftArrow onClick={handleBack} />
            <Button label={"Continue"} type="submit" haveRightArrow />
          </div>
        </form>
      </div>
    </div>
  );
}
