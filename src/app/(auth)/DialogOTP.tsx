"use client";

import React, { useState, useRef, useEffect } from "react";
import useLocalStorage from "@/config/hooks/useLocalStorage.hooks";
import { AuthAPI } from "@/services/auth.service";
import Button from "@components/ui/Button";
import { LocalStorageKeys } from "@lib/constants";
import toastUtils from "@lib/toast";
import { IUserSchema } from "@schemas/base.shema";
import { X } from "lucide-react";

interface IDialogOTPProps {
  requestKey: "LOGIN" | "SIGNUP";
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  authCredential: IUserSchema;
  handleClose: VoidFunction;
}

const DialogOTP = ({ requestKey, isOpen, setIsOpen, authCredential, handleClose }: IDialogOTPProps) => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [_, setAccessToken] = useLocalStorage(LocalStorageKeys.ACCESS_TOKEN, "");
  const [__, setUserData] = useLocalStorage<IUserSchema | null>(LocalStorageKeys.USER_DATA, null);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (isOpen) {
      setTimer(30);
      setCanResend(false);
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Allow only numbers
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }
    if (requestKey == "LOGIN") {
      handleLoginAPICall(enteredOtp);
    }
    if (requestKey == "SIGNUP") {
      handleSignUpAPICall(enteredOtp);
    }
  };

  const handleSignUpAPICall = async (otp: string) => {
    try {
      setIsLoading(true);
      const response = await AuthAPI.verifyOTP({ phone_number: authCredential.phone_number ?? "", otp });
      if (response?.token) {
        setAccessToken(response.token);
        setUserData(response.user ?? null);
        toastUtils.success("Login Successfully");
        handleClose();
      }
    } catch (error) {
      console.error(`${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginAPICall = async (otp: string) => {
    try {
      setIsLoading(true);
      const response = await AuthAPI.verifyOTP({ phone_number: authCredential.phone_number ?? "", otp });
      if (response?.token) {
        setAccessToken(response.token);
        setUserData(response.user ?? null);
        toastUtils.success("Login Successfully");
        handleClose();
      }
    } catch (error) {
      console.error(`${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTPAPICall = async () => {
    try {
      await AuthAPI.sendOTP({ phone_number: authCredential.phone_number ?? "" });
      toastUtils.success("OTP sent successfully");
      setTimer(30);
      setCanResend(false);
    } catch (error) {
      console.error("Error resending OTP: ", error);
      toastUtils.error("Failed to resend OTP");
    }
  };

  const handleOTPDialogClose = () => {
    setOtp(["", "", "", "", "", ""]);
    setError("");
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-xl shadow-2xl z-60 w-96 text-center">
        <div className="bg-primary relative text-white text-lg font-semibold py-4 px-6 rounded-t-lg">
          Verify OTP
          <button className="absolute top-5 right-4 text-white" onClick={handleOTPDialogClose}>
            <X size={24} />
          </button>
        </div>
        <p className="text-gray-600 text-xs my-4">We sent a 6-digit OTP to your {authCredential.phone_number}.</p>

        <div className="flex justify-center gap-2 mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleBackspace(index, e)}
              className="w-12 h-12 border border-gray-300 text-center text-lg font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          ))}
        </div>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <p className="text-gray-600 text-xs mb-2">Resend OTP in {timer} sec</p>

        <Button
          onClick={handleSubmit}
          isLoading={isLoading}
          label="Verify OTP"
          disabled={otp.join("").length !== 6}
          className="w-full min-w-full max-w-full"
        />

        <button
          onClick={handleResendOTPAPICall}
          disabled={!canResend}
          className={`mt-2 text-primary text-sm font-medium ${canResend ? "hover:underline" : "cursor-not-allowed text-gray-400"}`}
        >
          Resend OTP
        </button>
      </div>
    </div>
  );
};

export default DialogOTP;
