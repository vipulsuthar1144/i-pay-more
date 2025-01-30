"use client";

import useLocalStorage from "@/config/hooks/useLocalStorage.hooks";
import { AuthAPI } from "@/services/auth.service";
import { useAppDispatch, useAppSelector } from "@/store";
import { toggleLoginDialogState, toggleSignupDialogState } from "@/store/slices/auth.slice";
import Button from "@components/ui/Button";
import InputField from "@components/ui/InputField";
import { LocalStorageKeys } from "@lib/constants";
import { isValidEmail, isValidPassword, isValidPhone } from "@lib/validation";
import { IUserSchema } from "@schemas/base.shema";
import { X } from "lucide-react";
import { useState } from "react";

const DialogLogin = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState({ phone: "", password: "" });
  const [_, setAccessToken] = useLocalStorage(LocalStorageKeys.ACCESS_TOKEN, "");
  const [__, setUserData] = useLocalStorage<IUserSchema | null>(LocalStorageKeys.USER_DATA, null);
  const [isLoading, setIsLoading] = useState(false);
  const { openLoginDialog } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const onSignupClick = () => {
    handleClose();
    dispatch(toggleSignupDialogState());
  };

  const handleContinue = () => {
    setErrors({
      // phone: isValidPhone(phone) ? "" : "Enter a valid 10-digit phone number",
      phone: isValidEmail(phone) ? "" : "Enter a valid email address",
      password: isValidPassword(password),
    });

    if (isValidEmail(phone) && isValidPassword(password) && agree) {
      // if (!isValidPhone(phone) && !isValidPassword(password) && agree) {
      // console.log("Login/Signup Successful");
    }
    handleLoginAPI();
  };

  const handleLoginAPI = async () => {
    try {
      setIsLoading(true);
      const response = await AuthAPI.login({ email: phone, password });
      if (response?.token) {
        setAccessToken(response.token);
        setUserData(response.user ?? null);
        handleClose();
      }
    } catch (error: any) {
      console.error(`${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setPhone("");
    setPassword("");
    setErrors({
      phone: "",
      password: "",
    });
    dispatch(toggleLoginDialogState());
  };

  if (!openLoginDialog) return null;

  return (
    <div
      className={`fixed inset-0 h-screen flex items-center justify-center bg-black bg-opacity-50 z-50 
      `}
    >
      <div
        className={`bg-white w-full max-w-md m-5 rounded-lg shadow-lg p-6 z-50 transition-all ease-in-out duration-500 transform ${
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
        <div className="pt-4 space-y-5">
          {/* <InputField
            label="Phone Number"
            name="phone"
            placeholder="Enter a 10-digit phone number"
            value={phone}
            error={errors.phone}
            onChange={(e) => setPhone(e.target.value)}
            maxLength={10}
            pattern="[0-9]*"
            onInput={(e) => (e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, ""))}
          /> */}
          <InputField
            label="Email"
            name="phone"
            placeholder="Enter your email"
            value={phone}
            error={errors.phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setErrors({
                phone: "",
                password: "",
              });
            }}
          />
          <InputField
            label="Password"
            name="password"
            placeholder="Enter your password"
            value={password}
            error={errors.password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors({
                phone: "",
                password: "",
              });
            }}
          />
          {/* Terms & Conditions */}
          <div className="flex items-center">
            <input
              type="checkbox"
              className="w-4 h-4 accent-black caret-black"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
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
            isLoading={isLoading}
            label="LOGIN"
            disabled={!phone || !password || !!errors.phone || !!errors.password || !agree}
            className="w-full min-w-full max-w-full"
          />

          <div className="flex items-center justify-center">
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
