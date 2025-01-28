"use client";

import { useAppDispatch, useAppSelector } from "@/store";
import { toggleLoginDialogState, toggleSignupDialogState } from "@/store/slices/auth.slice";
import Button from "@components/ui/Button";
import { X } from "lucide-react";
import { useState } from "react";

const DialogLogin = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState({ phone: "", password: "" });
  const { openLoginDialog } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const validatePhone = (value: string) => {
    return /^\d{10}$/.test(value) ? "" : "Enter a valid 10-digit phone number";
  };

  const validatePassword = (value: string) => {
    return value.length >= 6 ? "" : "Password must be at least 6 characters";
  };

  const onSignupClick = () => {
    handleClose();
    dispatch(toggleSignupDialogState());
  };

  const handleContinue = () => {
    setErrors({
      phone: validatePhone(phone),
      password: validatePassword(password),
    });

    if (!validatePhone(phone) && !validatePassword(password) && agree) {
      console.log("Login/Signup Successful");
    }
  };

  const handleClose = () => {
    dispatch(toggleLoginDialogState());
  };

  if (!openLoginDialog) return null;

  return (
    <div
      className={`fixed inset-0 h-screen flex items-center justify-center bg-black bg-opacity-50 z-50  ${
        openLoginDialog ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-10"
      }`}
    >
      <div
        className={`bg-white w-full max-w-md rounded-lg shadow-lg p-6 z-50 transition-all ease-in-out duration-500 transform ${
          openLoginDialog ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-10"
        }`}
      >
        {/* Header */}
        <div className="bg-black relative text-white text-lg font-semibold py-4 px-6 rounded-t-lg">
          Login
          {/* Close Button */}
          <button className="absolute top-5 right-4 text-white" onClick={handleClose}>
            <X size={24} />
          </button>
        </div>
        {/* Content */}
        <div className="p-4">
          <label className="block mb-2 text-gray-700">Phone Number</label>
          <input
            type="tel"
            name="phone"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            maxLength={10}
            pattern="[0-9]*"
            onInput={(e) => (e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, ""))}
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

          <label className="block mt-4 mb-2 text-gray-700">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

          {/* Terms & Conditions */}
          <div className="flex items-center mt-4">
            <input type="checkbox" className="w-4 h-4" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
            <label className="ml-2 text-sm text-gray-600">
              I agree to the{" "}
              <a href="#" className="text-black underline">
                Terms and Conditions
              </a>{" "}
              &amp;
              <a href="#" className="text-black underline">
                {" "}
                Privacy Policy
              </a>
            </label>
          </div>

          {/* Continue Button */}
          <Button
            onClick={handleContinue}
            label="LOGIN"
            disabled={!phone || !password || !!errors.phone || !!errors.password || !agree}
            className="w-full min-w-full max-w-full mt-4"
          />

          <div className="flex items-center justify-center mt-4">
            <label className="text-sm text-gray-600">
              Don't have an account?
              <span onClick={onSignupClick} className="text-black ml-2 underline cursor-pointer">
                Signup
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialogLogin;
