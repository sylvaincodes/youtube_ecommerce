import { Button } from "@/components/ui/button";
import { ShoppingBasket } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function EmptyCart() {
  return (
    <div className="flex flex-col gap-12 w-60 justify-center m-auto py-20 items-center">
      <div className="flex flex-col items-center gap-8">
        <ShoppingBasket size={50} />
        <h1 className="flex font-medium text-2xl text-slate-700">
          Your cart is empty
        </h1>
      </div>

      <div className="flex flex-col gap-4">
        <Button variant="primary" size="lg" className="w-[200px]">
          <Link href="/signin" className="text-xl">
            Sign in
          </Link>
        </Button>

        <Button variant="primary" size="lg" className="w-[200px]">
          <Link className="text-xl" href="/products">
            Shop
          </Link>
        </Button>
      </div>
    </div>
  );
}
