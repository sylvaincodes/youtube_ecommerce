"use client";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { Lock } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import Toast from "../../custom/Toast";
import { useRouter } from "next/navigation";
// import { Order } from "@/types";
// import { PaymentMethod, StripeError } from "@stripe/stripe-js";
import PropTypes from 'prop-types'

export default function StripeForm({ order, setLoading, loading }) {
  const [error, setError] = useState("");

  const router = useRouter();

  const stripe = useStripe();
  const elements = useElements();
  const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
      base: {
        iconColor: "#000",
        color: "#000",
        fontSize: "30px",
        fontSmoothing: "antialiased",
        ":-webkit-autofill": { color: "#000" },
        "::placeholder": { color: "#000" },
      },

      invalid: {
        iconColor: "#0068e1",
        color: "#0068e1",
      },
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        // Include any additional collected billing details.
        name: order.user.name,
        email: order.user.email,
      },
    });

    if (!error && paymentMethod) {
      try {
        const { id } = paymentMethod;
        const data = {
          amount: order.total,
          order_id: order._id,
          payment_method_id: id,
        };

       await axios
          .post(process.env.NEXT_PUBLIC_API_URL + `/api/order/stripe`, data)
          .then((response) => {
            const data = response.data;
            if (data.success) {
              // window.location.reload(false)
            }
            toast.custom(
              <Toast
                message="Your payment has been done! Wait to be delivered!"
                status="success"
              />
            );
            // router.push(`order/${data.order_id}`);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            router.push('/account/order');
            setLoading(false);
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      setError("payment method failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 h-full">
      <CardElement options={CARD_OPTIONS} />
      <button
        disabled={loading || !stripe}
        type="submit"
        className="bg-black p-8 dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full text-base font-medium leading-4 mt-auto text-white flex 
      items-center justify-center gap-4 hover:bg-neutral-50 hover:text-black border border-slate-700"
      >
        <Lock />
        <span className="text-2xl">Pay Order</span>
      </button>
      {error && <span className="text-red-600 font-bold"> {error} </span>}
    </form>
  );
}


StripeForm.propTypes = {
    order: PropTypes.object,
    setLoading : PropTypes.func,
    loading: PropTypes.bool
}