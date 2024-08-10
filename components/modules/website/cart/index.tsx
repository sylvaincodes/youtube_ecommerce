"use client";
import { IRootState } from "@/store";
import React from "react";
import { useSelector } from "react-redux";
import Container from "../../custom/Container";
import CartList from "./CartList";
import EmptyCart from "./EmptyCart";

export default function Cart() {
  const { cart } = useSelector((state: IRootState) => ({ ...state }));

  return (
    <section className="h-screen">
      <Container>
        {cart.cartItems.length === 0 ? <EmptyCart /> : <CartList />}
      </Container>
    </section>
  );
}
