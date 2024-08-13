import Cart from "@/components/modules/website/cart";
import { Metadata } from "next";
import React from "react";

export default async function page() {
  return <Cart />;
}

export const metadata: Metadata = {
  title: "Cart",
  description: "Become a full stack Nextjs with this project",
  icons: {
    icon: "/assets/images/logo.svg",
  },
};
