"use client"; // ✅ Ensure this file runs on the client side

import { store } from "@/store";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import DialogLogin from "./(auth)/DialogLogin";
import DialogSignup from "./(auth)/DialogSignup";

export const root_container = "container mx-auto max-w-7xl space-y-5";
export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.classList.add("light");
  }, []);
  return (
    <Provider store={store}>
      <Toaster position="top-right" reverseOrder={false} toastOptions={{ duration: 2500 }} />
      <DialogLogin />
      <DialogSignup />
      {/* <OTPVerification /> */}
      {children}
    </Provider>
  );
}
