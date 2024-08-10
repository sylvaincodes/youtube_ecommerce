import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeForm from "./StripeForm";
import { Order } from "@/types";

const promise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_CLIENT_KEY as string);
export default function StripePayment({
  order,
  setLoading,
  loading,
}: {
  order: Order;
  loading: boolean;
  setLoading: (value: boolean) => void;
}) {
  return (
    <Elements stripe={promise}>
      <StripeForm order={order} loading={loading} setLoading={setLoading} />
    </Elements>
  );
}
