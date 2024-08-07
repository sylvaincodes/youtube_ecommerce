"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { CiShoppingBasket } from "react-icons/ci";
import CurrencyFormat from "./CurrencyFormat";
import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "@/store";
import { CartItem } from "@/types";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { IoCloseOutline } from "react-icons/io5";
import { updateCart } from "@/store/cartSlice";
import toast from "react-hot-toast";
import Toast from "./Toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { createOrder } from "@/store/orderSlice";
import axios from "axios";
import { signIn } from "next-auth/react";
import { ShoppingBasket } from "lucide-react";
import Link from "next/link";
import QuantityCart from "./QuantityCart";
import Loading from "./Loading";

export default function IconsGroup() {
  const dispatch = useDispatch();
  const { cart, order } = useSelector((state: IRootState) => ({ ...state }));
  const [cartOpen, setCartOpen] = useState(false);

  const handleRmoveItem = (item: CartItem) => {
    const newCart = cart.cartItems.filter(
      (p: CartItem) => p._uid !== item._uid
    );

    dispatch(updateCart(newCart));
    toast.custom(
      <Toast message="Product deleted from cart" status="success" />
    );
  };

  const subtotal = cart.cartItems.reduce(
    (accumulateur: number, currentValue: CartItem) =>
      accumulateur + currentValue.price * currentValue.qty,
    0
  );

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { status, data: session } = useSession();

  const addToCartHandler = async () => {
    if (order.orderDetails.length > 0) {
      toast.custom(
        <Toast message="An order has already been placed" status="success" />
      );

      router.push("/checkout");
      return;
    } else {
      if (cart.cartItems.length === 0) {
        toast.custom(
          <Toast
            message="Your cart is empty go to shop"
            status="success"
            link="/products"
          />
        );

        return;
      }

      if (status === "authenticated") {
        setLoading(true);

        const data = {
          cart: cart.cartItems,
          user_id: session?.user?.email,
        };

        axios
          .post(process.env.NEXT_PUBLIC_API_URL + "/api/cart", data)
          .then((response) => {
            const data = response.data;
            const order = data.addCart;

            if (data) {
              dispatch(createOrder({ order }));
            }
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            setLoading(false);
            const element: HTMLElement = document.querySelector(
              "#openCart"
            ) as HTMLElement;

            element.click();
            router.push("/checkout");
          });
      } else {
        signIn();
      }
    }
  };

  return (
    <div
      className={cn(
        "hidden",
        "lg:flex items-center justify-end ms-auto text-right"
      )}
    >
      {loading && <Loading isLoading={loading} />}
      <div className="idden w-auto ms-auto lg:flex">
        <Sheet open={cartOpen} onOpenChange={setCartOpen}>
          <SheetTrigger>
            <div className="relative" id="openCart">
              <span className="absolute rounded-full grid grid-place-content-center -top-2 -right-1 bg-red-600 text-base text-white w-6 h-6">
                {cart.cartItems.length}
              </span>
              <CiShoppingBasket className="h-10 w-10" />
            </div>
          </SheetTrigger>

          <SheetContent className="p-0 w-full md-[400px]">
            <SheetHeader className="flex justify-between px-4 py-2 bg-primary-200">
              <SheetTitle>Shopping cart</SheetTitle>
              <SheetDescription>Your cart details goes here</SheetDescription>
            </SheetHeader>
            <div className="flex flex-col h-full">
              <div className="flex flex-col gap-4  max-h-3/5 overflow-y-auto flex-1">
                {cart.cartItems.length > 0 ? (
                  cart.cartItems.map((item: CartItem, idx: number) => {
                    return (
                      <div
                        key={idx}
                        className="flex items-center gap-8 border-b border-slate-100 p-4"
                      >
                        <Image
                          src={item.images[0]}
                          alt=""
                          width="100"
                          height="100"
                        />
                        <div className="flex flex-col gap-4 w-full">
                          <div className="flex justify-between w-full">
                            <h1 className="text-black font-medium">
                              {item.name.substring(0, 40)}
                            </h1>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleRmoveItem(item)}
                            >
                              <IoCloseOutline />
                            </Button>
                          </div>
                          <div className="flex justify-between">
                            <QuantityCart item={item} />
                            <div className="text-primary-700 text-base font-bold">
                              x ${item.price}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="grid place-content-center justify-items-center gap-4 h-full">
                    <ShoppingBasket className="font-bold" size="100" />
                    <h1 className="flex font-bold text-2xl ">
                      Your cart is empty
                    </h1>

                    <Button variant="link" asChild>
                      <Link
                        href="/products"
                        className="uppercase text-2xl tracking-wider text-white "
                      >
                        shop
                      </Link>
                    </Button>
                  </div>
                )}
              </div>

              <div className="grid grid-rows-2 grid-cols-1 mb-20 px-2">
                <div className="flex items-center justify-between shadow-md">
                  <span className="capitalize">Sub total</span>
                  <span className="text-xl text-primary-800 font-bold">
                    <CurrencyFormat value={subtotal} className="text-right" />
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2  w-full py-2 bg-neutral-50 items-center justify-between">
                  <Button asChild variant="link" size="lg">
                    <Link href="/cart" className="text-white">
                      View Cart
                    </Link>
                  </Button>

                  <Button
                    variant="default"
                    size="lg"
                    onClick={() => addToCartHandler()}
                  >
                    Checkout
                  </Button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex">
        <CurrencyFormat
          value={0}
          className="text-right text-2xl  font-normal"
        />
      </div>
    </div>
  );
}
