"use client";

import { AuthAPI } from "@/services/auth.service";
import { useAppDispatch, useAppSelector } from "@/store";
import { toggleLoginDialogState, toggleSignupDialogState } from "@/store/slices/auth.slice";
import Button from "@components/ui/Button";
import InputField from "@components/ui/InputField";
import { Select } from "@components/ui/Select";
import { dataStateList } from "@data/statesData";
import { X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import DialogOTP from "./DialogOTP";

const DialogSignup = () => {
  const { openSignupDialog } = useAppSelector((state) => state.auth);
  const [openOTPdialog, setOpenOTPdialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    city: "",
    state: "",
    agree: false,
  });

  const [errors, setErrors] = useState({
    fullName: "",
    phone: "",
    city: "",
    state: "",
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
    };

    setErrors(newErrors);

    if (Object.values(newErrors).every((err) => !err) && form.agree) {
      handleSignupAPI();
    }
  };

  const handleSignupAPI = async () => {
    try {
      setIsLoading(true);
      const response = await AuthAPI.signup({
        phone_number: form.phone,
        full_name: form.fullName,
        email: "random@gmail.com",
        state: form.state,
        city: form.city,
      });
      if (response) {
        setOpenOTPdialog(true);
      }
    } catch (error: any) {
      console.error(`${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setOpenOTPdialog(false);
    setForm({
      fullName: "",
      phone: "",
      city: "",
      state: "",
      agree: false,
    });
    setErrors({
      fullName: "",
      phone: "",
      city: "",
      state: "",
    });
    dispatch(toggleSignupDialogState());
  };

  const onLoginClick = () => {
    handleClose();
    dispatch(toggleLoginDialogState());
  };

  if (!openSignupDialog) return null;

  return (
    <>
      <DialogOTP
        isOpen={openOTPdialog}
        setIsOpen={(value: boolean) => setOpenOTPdialog(value)}
        authCredential={{ phone_number: form.phone, full_name: form.fullName, state: form.state, city: form.city }}
        handleClose={handleClose}
        requestKey="SIGNUP"
      />
      {!openOTPdialog && (
        <div className="fixed inset-0 flex items-center justify-center h-screen bg-black bg-opacity-50 z-50">
          <div className="bg-white w-full max-w-md md:max-w-lg rounded-lg shadow-lg p-6 m-5 relative z-50">
            {/* Header */}
            <div className="bg-primary flex justify-between items-center text-white text-xl font-medium py-4 px-6 rounded-t-lg">
              <h6>Signup</h6>
              <button onClick={handleClose}>
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-2">
              {/* Full Name */}
              <InputField
                label="Full Name"
                name="fullName"
                placeholder="Enter your name"
                value={form.fullName}
                error={errors.fullName}
                onChange={handleChange}
              />
              {/* Phone Number */}
              <InputField
                label="Phone Number"
                name="phone"
                placeholder="Enter a 10-digit phone number"
                value={form.phone}
                error={errors.phone}
                onChange={handleChange}
                maxLength={10}
                pattern="[0-9]*"
                onInput={(e) => (e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, ""))}
              />

              {/* City */}
              <InputField
                label="City"
                name="city"
                placeholder="Enter your city name"
                value={form.city}
                error={errors.city}
                onChange={handleChange}
              />

              {/* State Dropdown */}
              <label className="block  mb-2 text-gray-700">State</label>
              <select
                name="state"
                className="w-full px-3 py-2 border rounded-md bg-white cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-300 ease-in-out"
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
              {/* <InputField
            label="Password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            error={errors.password}
            onChange={handleChange}
          /> */}
              {/* Terms & Conditions */}
              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  className="w-4 h-4 cursor-pointer  accent-primary"
                  checked={form.agree}
                  onChange={(e) => setForm({ ...form, agree: e.target.checked })}
                />
                <label className="ml-2 text-sm text-gray-600">
                  I agree to the{" "}
                  <Link href="/terms-conditions" className="text-primary underline">
                    Terms and Conditions
                  </Link>{" "}
                  &{" "}
                  <Link href="/privacy-policy" className="text-primary underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {/* Signup Button */}
              <Button
                onClick={handleSubmit}
                isLoading={isLoading}
                label="SIGN UP"
                disabled={
                  !form.fullName ||
                  !form.phone ||
                  !form.city ||
                  !form.state ||
                  !!errors.fullName ||
                  !!errors.phone ||
                  !!errors.city ||
                  !!errors.state ||
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
      )}
    </>
  );
};

export default DialogSignup;
