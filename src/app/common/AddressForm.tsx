"use client";
import useLocalStorage from "@/config/hooks/useLocalStorage.hooks";
import Button from "@components/ui/Button";
import InputField from "@components/ui/InputField";
import { dataStateList } from "@data/statesData";
import { LocalStorageKeys } from "@lib/constants";
import { IUserSchema } from "@schemas/base.shema";
import { IAddressSchema } from "@schemas/order.schema";
import React, { useEffect, useState } from "react";

export default function AddressForm({ onSubmit }: { onSubmit: (address: IAddressSchema) => void }) {
  const [USER_DATA, _] = useLocalStorage<IUserSchema | null>(LocalStorageKeys.USER_DATA, null);
  const [formData, setFormData] = useState<IAddressSchema>({
    name: "",
    phone_no: "",
    pincode: "",
    locality: "",
    address: "",
    city: "",
    state: "",
    landmark: "",
    alternate_phone_no: "",
  });
  const [errors, setErrors] = useState<IAddressSchema>({});

  // Set default data (if any)
  useEffect(() => {
    setDefaultData();
  }, []);

  const setDefaultData = () => {
    // const defaultData: IAddressSchema = {
    //   name: USER_DATA?.address?.name,
    //   phone_no: USER_DATA?.address?.phone_no,
    //   pincode: USER_DATA?.address?.pincode,
    //   locality: "Default Locality",
    //   address: "Default Address",
    //   city: "Default City",
    //   state: "Default State",
    // };
    setFormData({ ...formData, ...USER_DATA?.address });
  };

  const validate = () => {
    let newErrors: IAddressSchema = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!/^[0-9]{10}$/.test(`${formData.phone_no}`)) newErrors.phone_no = "Invalid mobile number";
    if (!formData.pincode) newErrors.pincode = "Pincode is required";
    if (!formData.locality) newErrors.locality = "Locality is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Name"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            error={errors.name}
            onChange={handleChange}
          />
          <InputField
            label="Mobile"
            name="phone_no"
            placeholder="Enter a 10-digit mobile number"
            value={formData.phone_no}
            error={errors.phone_no}
            onChange={handleChange}
            maxLength={10}
            pattern="[0-9]*"
            onInput={(e) => (e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, ""))}
          />
          <InputField
            label="Pincode"
            name="pincode"
            placeholder="Enter your area pincode"
            value={formData.pincode}
            error={errors.pincode}
            onChange={handleChange}
          />
          <InputField
            label="Locality"
            name="locality"
            placeholder="Enter your locality"
            value={formData.locality}
            error={errors.locality}
            onChange={handleChange}
          />
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <textarea
              name="address"
              value={formData.address}
              placeholder="Enter your address (Area and Street)"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black"
              onChange={handleChange}
            ></textarea>
            {errors.address && <span className="text-red-500 text-sm mt-1">{errors.address}</span>}
          </div>
          <InputField
            label="City"
            name="city"
            placeholder="Enter your City"
            value={formData.city}
            error={errors.city}
            onChange={handleChange}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
            <select
              name="state"
              value={formData.state}
              className="w-full px-3 py-2.5 border rounded-md bg-white"
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
            {errors.state && <span className="text-red-500 text-sm mt-1">{errors.state}</span>}
          </div>
          <InputField
            label="Landmark"
            name="landmark"
            placeholder="Enter a landmark (optional)"
            value={formData.landmark}
            error={errors.landmark}
            onChange={handleChange}
          />
          {/* <div className="mt-4">
            <span className="block text-sm font-medium text-gray-700 mb-2">Address Type</span>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer p-2 border-[1px] rounded-md hover:bg-gray-100  focus-within:ring-[1px] focus-within:ring-black">
                <input
                  type="radio"
                  name="addressType"
                  value="Home"
                  checked={formData.addressType === "Home"}
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
                  checked={formData.addressType === "Work"}
                  className="appearance-none peer"
                  onChange={handleChange}
                />
                <div className="w-4 h-4 border-[1px] rounded-full flex items-center justify-center peer-checked:border-black peer-checked:bg-black">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span className="text-gray-700 peer-checked:text-black">Work</span>
              </label>
            </div>
          </div> */}
        </div>
        <Button id="address-submit-btn" label={"Submit"} type={"submit"} className={"min-w-full hidden mt-5"} />
      </form>
    </>
  );
}
