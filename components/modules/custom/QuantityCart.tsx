import { Button } from "@/components/ui/button";
import { IRootState } from "@/store";
import { CartItem } from "@/types";
import { MinusIcon, PlusIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Toast from "./Toast";
import { updateCart } from "@/store/cartSlice";

export default function QuantityCart({ item }: { item: CartItem }) {
  const { cart } = useSelector((state: IRootState) => ({ ...state }));

  const [qty, setQty] = useState(0);
  const dispatch = useDispatch();

  const updateQty = (value: string) => {
    if (value === "dec") {
      if (qty === 1) {
        toast.custom(
          <Toast message="you reached the limit" status="success" />
        );
        return;
      }
    }

    if (value === "inc") {
      if (qty === 9) {
        toast.custom(
          <Toast message="you reached the limit" status="success" />
        );
        return;
      }
    }

    // Cart operation

    if (value === "dec") {
      setQty(qty === 1 ? qty : qty - 1);
    }

    if (value === "inc") {
      setQty(qty === 9 ? qty : qty + 1);
    }

    // Udate cart
    const newCart = cart.cartItems.map((p: CartItem) => {
      if (p._uid === item._uid) {
        return {
          ...p,
          qty: value === "dec" ? qty - 1 : qty + 1,
        };
      }
      return p;
    });

    dispatch(updateCart(newCart));
  };

  useEffect(() => {
    setQty(item.qty);
  }, [item]);

  return (
    <div className="inline-flex gap-4 items-center">
      <div className="w-10 group bg-neutral-100 rounded-md p-1 grid place-content-center ">
        <Button variant="outline" size="icon" onClick={() => updateQty("dec")}>
          <MinusIcon />
        </Button>
      </div>
      <span className="text-xl font-bold text-black text-center w-8">
        {qty}
      </span>
      <div className="w-10 group bg-neutral-100 rounded-md p-1 grid place-content-center ">
        <Button variant="outline" size="icon" onClick={() => updateQty("inc")}>
          <PlusIcon />
        </Button>
      </div>
    </div>
  );
}
