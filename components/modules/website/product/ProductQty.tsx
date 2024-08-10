import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import React, { useState } from "react";
import Toast from "../../custom/Toast";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { CartItem, Product } from "@/types";
import { IRootState } from "@/store";
import { addToCart, updateCart } from "@/store/cartSlice";
import { MdAddShoppingCart } from "react-icons/md";

export default function ProductQty({
  setLoading,
  active,
  optionActive,
  product,
}: {
  setLoading(value: boolean): void;
  active: number;
  optionActive: number;
  product: Product;
}) {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const { cart } = useSelector((state: IRootState) => ({ ...state }));

  const updateQty = (value: string) => {
    if (value === "dec") {
      if (qty === 1) {
        toast.custom(<Toast message="you reached the limit" status="error" />);
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
  };

  const addTocartHandler = async () => {
    setLoading(true);

    await axios
      .get(process.env.NEXT_PUBLIC_API_URL + "/api/cart", {
        params: {
          id: product._id,
          style: active,
          option: optionActive,
        },
      })
      .then((response) => {
        const data = response.data;
        if (qty > response.data.stock) {
          toast.custom(
            <Toast
              message="the stock is limited reduce quantity"
              status="error"
            />
          );
          setLoading(false);
          return;
        }

        // add to cart
        const _uid: string = `${data._id}_${data.styleBefore}_${data.optionBefore}`;

        const exist: CartItem | undefined = cart.cartItems.find(
          (p: CartItem) => p._uid === _uid
        );

        if (exist) {
          //the product option exist in cart so updated it
          const newCart = cart.cartItems.map((p: CartItem) => {
            // update for a single option
            if (p === exist) {
              return { ...p, qty: qty }; // get everything and change the qty
            }
            setLoading(false);
            return p;
          });

          dispatch(updateCart(newCart));
          toast.custom(<Toast message="Product updated" status="success" />);
        } else {
          //option not in the cart so added as new
          dispatch(
            addToCart({
              ...data,
              qty,
              option: data.option,
              _uid,
            })
          );
          toast.custom(
            <Toast message="Product added to cart" status="success" />
          );
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-wrap lg:flex-nowrap gap-12 my-10 w-full">
      <div className="flex items-center justify-center gap-4 w-full">
        <Button
          className="grow"
          variant="primary"
          size="icon"
          onClick={() => updateQty("dec")}
        >
          <Minus className="text-white" />
        </Button>
        <span className="w-10 text-center text-2xl">{qty}</span>
        <Button
          className="grow"
          variant="primary"
          size="icon"
          onClick={() => updateQty("inc")}
        >
          <Plus className="text-white" />
        </Button>
      </div>

      <div className="w-full">
        <Button
          className="w-full inline-flex gap-4"
          id="addToCart"
          variant="default"
          size="xl"
          onClick={() => addTocartHandler()}
        >
          <MdAddShoppingCart className="text-white" size={32} />
          <span className="capitalize font-bold tracking-widest text-xl">
            add to cart
          </span>
        </Button>
      </div>
    </div>
  );
}
