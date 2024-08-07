"use client";
import React from "react";
import AuthProvider from "./AuthProvider";
import ToastProvider from "./ToastProvider";
import FramerMotionProvider from "./FramerMotionProvider";
import { Provider } from "react-redux";
import store from "@/store/index";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <Provider store={store}>
        <FramerMotionProvider>
          <ToastProvider />
          {children}
        </FramerMotionProvider>
      </Provider>
    </AuthProvider>
  );
}
