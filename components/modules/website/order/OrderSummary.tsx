"use client";
import React, { useState } from "react";
import StripePayment from "./StripePayment";
import Image from "next/image";
import { Order } from "@/types";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { ClipLoader } from "react-spinners";

export default function OrderSummary({ order }: { order: Order | undefined }) {
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex gap-10 mt-10 flex-wrap lg:flex-nowrap">
      {loading ? (
        <ClipLoader
          className="fixed inset-0 m-auto z-20"
          size={100}
          color="#3c38ca"
        />
      ) : (
        ""
      )}

      <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-neutral-100 dark:bg-gray-800 gap-8">
        <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
          Summary
        </h3>
        <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
          <div className="flex justify-between w-full">
            <p className="text-base dark:text-white leading-4 text-gray-800">
              Subtotal
            </p>
            <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
              ${order?.totalBeforeDiscount ? order.totalBeforeDiscount : 0}
            </p>
          </div>
          <div className="flex justify-between items-center w-full">
            <p className="text-base dark:text-white leading-4 text-gray-800">
              Discount{" "}
              <span className="bg-gray-200 p-1 text-xs font-medium dark:bg-white dark:text-gray-800 leading-3 text-gray-800">
                (
                {order?.couponApplied?.discount
                  ? order.couponApplied.discount
                  : 0}
                %)
              </span>
            </p>
            <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
              -$
              {order?.couponApplied?.discount &&
                (order?.couponApplied?.discount * order.totalBeforeDiscount) /
                  100}{" "}
            </p>
          </div>
          <div className="flex justify-between items-center w-full">
            <p className="text-base dark:text-white leading-4 text-gray-800">
              Shipping
            </p>
            <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
              ${order?.shippingPrice ? order.shippingPrice : 0}
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center w-full">
          <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">
            Total
          </p>
          <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">
            ${order?.total}
          </p>
        </div>
      </div>

      <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-neutral-100 dark:bg-gray-800 gap-8">
        <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
          Payment
        </h3>
        {order?.isPaid ? (
          <div className="flex w-full justify-center items-center">
            <Image
              src="https://cdn-icons-png.flaticon.com/128/5567/5567291.png"
              alt="paid"
              width="100"
              height="100"
            />
          </div>
        ) : order?.paymentMethod === "credit_card" ? (
          <StripePayment
            order={order}
            setLoading={setLoading}
            loading={loading}
          />
        ) : (
          order?.paymentMethod === "cash_on_delivery" && (
            <div className="flex justify-center flex-col gap-8 items-center">
              <Image
                src="https://cdn-icons-png.flaticon.com/128/5359/5359689.png"
                alt="paid"
                width="100"
                height="100"
              />
            </div>
          )
        )}

        {order?.paymentMethod === "paypal" && (
          <PayPalScriptProvider
            options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID! }}
          >
            <PayPalButtons style={{ layout: "horizontal" }} />
          </PayPalScriptProvider>
        )}
      </div>
    </div>
  );
}
