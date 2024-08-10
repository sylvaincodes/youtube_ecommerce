import React, { useEffect, useState } from "react";
import Container from "../../custom/Container";
import CartHeader from "./CartHeader";
import { CartItem as TCartItem } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@/store";
import Checkout from "./Checkout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Toast from "../../custom/Toast";
import axios from "axios";
import { createOrder } from "@/store/orderSlice";
import CartItem from "./CartItem";
import Loading from "../../custom/Loading";

export default function CartList() {
  const { cart, order } = useSelector((state: IRootState) => ({ ...state }));

  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const subtotal = cart.cartItems.reduce(
    (accumulateur: number, currentValue: TCartItem) =>
      accumulateur + currentValue.price * currentValue.qty,
    0
  );
  const dispatch = useDispatch();
  const tax = 0;
  const shippingFee = 0;
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(subtotal + shippingFee + tax);
  }, [subtotal, shippingFee, tax]);

  const addToCartHandler = async () => {
    setLoading(true);
    if (order.orderDetails.length > 0) {
      toast.custom(
        <Toast message="An order has already been placed" status="success" />
      );

      router.push("/checkout");
      setLoading(false);
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
        setLoading(false);
        return;
      }

      if (status === "authenticated") {
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
              toast.custom(
                <Toast message="Your order has been placed!" status="success" />
              );
            }
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            router.push("/checkout");
          });
      } else {
        // signIn();
        router.push("/signin");
      }
    }
  };

  return (
    <section>
      <Container>
        {loading && <Loading isLoading={loading} />}
        <CartHeader active="cart" />
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-y-10 md:gap-x-10">
          <div className="col-span-2">
            <div className="space-y-6 max-h-[600px] overflow-auto">
              {cart.cartItems.map((item: TCartItem, idx: number) => (
                <CartItem key={idx} item={item} />
              ))}
            </div>
          </div>
          <Checkout
            className="col-span-1"
            subtotal={subtotal}
            shippingFee={shippingFee}
            tax={tax}
            total={total}
            addToCartHandler={addToCartHandler}
            loading={loading}
          />
        </div>
      </Container>
    </section>
  );
}
