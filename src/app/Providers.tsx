"use client"; // ✅ Ensure this file runs on the client side

import { Provider } from "react-redux";
import { store } from "@/store";
import { Toaster } from "react-hot-toast";
import DialogLogin from "./(auth)/DialogLogin";
import DialogSignup from "./(auth)/DialogSignup";
import { useEffect } from "react";

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
      {children}
    </Provider>
  );
}
