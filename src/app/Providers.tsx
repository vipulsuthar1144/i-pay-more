"use client"; // ✅ Ensure this file runs on the client side

import { Provider } from "react-redux";
import { store } from "@/store";
import { Toaster } from "react-hot-toast";
import DialogLogin from "./(auth)/DialogLogin";
import DialogSignup from "./(auth)/DialogSignup";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <Toaster position="top-right" reverseOrder={false} toastOptions={{ duration: 2500 }} />
      <DialogLogin />
      <DialogSignup />
      {children}
    </Provider>
  );
}
