import React from "react";
import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        position: "top-center",
        duration: 4000,
      }}
    />
  );
}
