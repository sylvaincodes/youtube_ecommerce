import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

export default function Checkout({
  subtotal,
  shippingFee,
  total,
  tax,
  className,
  addToCartHandler,
  loading,
  order = false,
}: {
  subtotal: number;
  shippingFee: number;
  tax: number;
  total: number;
  className: string;
  addToCartHandler: () => void;
  loading: boolean;
  order?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 border border-gray-200 p-4 w-ful",
        className
      )}
    >
      {order && (
        <div className="flex flex-row-justify-between w-full gap-4 mb-4">
          <Input type="text" name="coupon" className="flex-1 " />
          <Button variant="primary">Apply</Button>
        </div>
      )}
      <div className="flex flex-col gap-4 w-full">
        <ul className="flex flex-col gap-8 w-full">
          <li className="flex justify-between">
            <span className="text-xl capitalize">subtotal:</span>
            <strong className="text-end  text-2xl">{subtotal}</strong>
          </li>
          <li className="flex justify-between">
            <span className="text-xl capitalize">shipping:</span>
            <strong className="text-end  text-2xl">{shippingFee}</strong>
          </li>
          <li className="flex justify-between">
            <span className="text-xl capitalize">tax:</span>
            <strong className="text-end  text-2xl">{tax}</strong>
          </li>

          <li className="flex justify-between">
            <span className="text-xl capitalize font-bold">total:</span>
            <strong className="text-end  text-2xl">{total}</strong>
          </li>
        </ul>

        <hr />
        <div className="flex w-full">
          <Button
            onClick={addToCartHandler}
            disabled={loading}
            variant="primary"
            size="lg"
            className="w-full text-2xl"
          >
            Place order
          </Button>
        </div>
      </div>
      {!order && (
        <Link
          href="/products"
          className="flex text-center justify-center font-bold mt-8 text-xl"
        >
          Continue shopping
        </Link>
      )}
    </div>
  );
}
