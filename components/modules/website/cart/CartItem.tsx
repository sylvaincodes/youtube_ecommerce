"use client";
import { IRootState } from "@/store";
import { updateCart } from "@/store/cartSlice";
import { CartItem as TCartItem } from "@/types";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../../custom/Toast";
import Link from "next/link";
import Image from "next/image";
import QuantityCart from "../../custom/QuantityCart";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function CartItem({ item }: { item: TCartItem }) {
  const { cart } = useSelector((state: IRootState) => ({ ...state }));

  const dispacth = useDispatch();
  const handleRemoveItem = () => {
    const newCart = cart.cartItems.filter(
      (p: TCartItem) => p._uid !== item._uid
    );

    dispacth(updateCart(newCart));

    toast.custom(
      <Toast message="product deleted from cart" status="success" />
    );
  };

  return (
    <div className="space-y-6 border border-slate-300 rounded-md p-4">
      <div className="flex flex-col md:flex-row gap-12 items-center">
        <Link className="shrink-0" href={`/products/${item.slug}`}>
          <Image
            src={item.images[0]}
            alt="imac image"
            width={100}
            height={100}
            className="h-auto w-auto"
          />
        </Link>

        <div className="w-full min-w-0 flex-1 space-y-4 md:max-w-md">
          <Link href={`/product/${item.slug}`}>
            {item.name.substring(0, 150)}
          </Link>
        </div>

        {/* <label htmlFor="counter-input">Choose quantity</label> */}

        <div className="flex items-center gap-10 md:flex-nowrap flex-wrap  justify-center">
          <QuantityCart item={item} />
          <div className="w-full flex justify-center items-center">
            <p className="text-base font-bold text-gray-900">
              ${(item.price * item.qty).toFixed(2)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => handleRemoveItem()}>
            <X />
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
}
