"use client";

import { useAppDispatch, useAppSelector } from "@/store";
import { toggleLoginDialogState, toggleSignupDialogState } from "@/store/slices/auth.slice";
import Button from "@components/ui/Button";
import { Select } from "@components/ui/Select";
import { dataStateList } from "@data/statesData";
import { X } from "lucide-react";
import { useState } from "react";

const DialogSignup = () => {
  const { openSignupDialog } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    city: "",
    state: "",
    password: "",
    agree: false,
  });

  const [errors, setErrors] = useState({
    fullName: "",
    phone: "",
    city: "",
    state: "",
    password: "",
  });

  // Validation Functions
  const validateFullName = (value: string) => (value.length >= 3 ? "" : "Full name must be at least 3 characters");

  const validatePhone = (value: string) => (/^\d{10}$/.test(value) ? "" : "Enter a valid 10-digit phone number");

  const validateCity = (value: string) => (value ? "" : "City is required");

  const validateState = (value: string) => (value ? "" : "State is required");

  const validatePassword = (value: string) => (value.length >= 6 ? "" : "Password must be at least 6 characters");

  // Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle Submit
  const handleSubmit = () => {
    const newErrors = {
      fullName: validateFullName(form.fullName),
      phone: validatePhone(form.phone),
      city: validateCity(form.city),
      state: validateState(form.state),
      password: validatePassword(form.password),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).every((err) => !err) && form.agree) {
      console.log("Signup Successful", form);
      handleClose();
    }
  };

  const handleClose = () => {
    dispatch(toggleSignupDialogState());
  };

  const onLoginClick = () => {
    handleClose();
    dispatch(toggleLoginDialogState());
  };

  if (!openSignupDialog) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center h-screen bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-sm md:max-w-lg rounded-lg shadow-lg p-6 m-5 relative z-50">
        {/* Header */}
        <div className="bg-primary flex justify-between items-center text-white text-xl font-medium py-4 px-6 rounded-t-lg">
          <h6>Signup</h6>
          <button onClick={handleClose}>
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Full Name */}
          <label className="block mb-2 text-gray-700">Full Name</label>
          <input
            type="text"
            name="fullName"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            placeholder="Enter your full name"
            value={form.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}

          {/* Phone Number */}
          <label className="block mt-4 mb-2 text-gray-700">Phone Number</label>
          <input
            type="tel"
            name="phone"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            placeholder="Enter your phone number"
            value={form.phone}
            onChange={handleChange}
            maxLength={10}
            pattern="[0-9]*"
            onInput={(e) => (e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, ""))}
          />

          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

          {/* City */}
          <label className="block mt-4 mb-2 text-gray-700">City</label>
          <input
            type="text"
            name="city"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            placeholder="Enter your city"
            value={form.city}
            onChange={handleChange}
          />
          {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}

          {/* State Dropdown */}
          <label className="block mt-4 mb-2 text-gray-700">State</label>
          <select
            name="state"
            className="w-full px-3 py-2 border rounded-md bg-white cursor-pointer focus:outline-none focus:ring-1 focus:ring-black transition-all duration-300 ease-in-out"
            value={form.state}
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
          {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}

          {/* Password */}
          <label className="block mt-4 mb-2 text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

          {/* Terms & Conditions */}
          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              className="w-4 h-4"
              checked={form.agree}
              onChange={(e) => setForm({ ...form, agree: e.target.checked })}
            />
            <label className="ml-2 text-sm text-gray-600">
              I agree to the{" "}
              <a href="#" className="text-primary underline">
                Terms and Conditions
              </a>{" "}
              &{" "}
              <a href="#" className="text-primary underline">
                Privacy Policy
              </a>
            </label>
          </div>

          {/* Signup Button */}
          <Button
            onClick={handleSubmit}
            label="SIGN UP"
            disabled={
              !form.fullName ||
              !form.phone ||
              !form.city ||
              !form.state ||
              !form.password ||
              !!errors.fullName ||
              !!errors.phone ||
              !!errors.city ||
              !!errors.state ||
              !!errors.password ||
              !form.agree
            }
            className="w-full min-w-full max-w-full mt-4"
          />
          <div className="flex items-center justify-center mt-4">
            <label className="text-sm text-gray-600">
              Already have an account?
              <span onClick={onLoginClick} className="text-primary ml-2 underline cursor-pointer">
                Login
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialogSignup;
