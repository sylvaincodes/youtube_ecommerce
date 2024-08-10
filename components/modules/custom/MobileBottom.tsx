"use client";
import { IRootState } from "@/store";
import { FolderKanban, Home, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

export default function MobileBottom() {
  const { cart } = useSelector((state: IRootState) => ({ ...state }));
  return (
    <div className="bg-white z-[1000] w-full flex border-t border-t-gray-300 h-20 px-10 fixed shadow-md bottom-0 left-0 lg:hidden">
      <div className="flex items-cente justify-center gap-8 w-full">
        <Link
          href="/products"
          className="group flex flex-col gap-1 items-center justify-center"
        >
          <FolderKanban className="h-5 w-5 group-hover:text-primary-900 group-hover:font-bold" />
          <span>Categories</span>
        </Link>
        <Link
          href="/"
          className="group flex flex-col gap-1 items-center justify-center"
        >
          <Home className="h-5 w-5 group-hover:text-primary-900 group-hover:font-bold" />
          <span>Home</span>
        </Link>
        <Link
          href="/cart"
          className="group relative flex flex-col gap-1 items-center justify-center"
        >
          <ShoppingCart className="h-5 w-5 group-hover:text-primary-900 group-hover:font-bold" />
          <span className="absolute grid grid-place-content-center top-2 -right-1 bg-red-600 text-white rounded-full text-sm w-4 h-4 text-center">
            {cart.cartItems.length}
          </span>
          <span>Cart</span>
        </Link>
        <Link
          href="/signin"
          className="group flex flex-col gap-1 items-center justify-center"
        >
          <User className="h-5 w-5 group-hover:text-primary-900 group-hover:font-bold" />
          <span>Account</span>
        </Link>
      </div>
    </div>
  );
}
