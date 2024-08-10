"use client";
import React, { useEffect, useState } from "react";
import Loading from "../../custom/Loading";
import Container from "../../custom/Container";
import OrderProducts from "./OrderProducts";
import OrderSummary from "./OrderSummary";
import OrderHeader from "./OrderHeader";
import ShippingBillingAddress from "./ShippingBillingAddress";
import { Order } from "@/types";
import axios from "axios";

export default function OrderWrapper({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);

  const [order, setOrder] = useState<Order>();

  useEffect(() => {
    const getOrder = async () => {
      setLoading(true);
     await axios
        .get(process.env.NEXT_PUBLIC_API_URL + "/api/order", {
          params: { id: id },
        })
        .then((response) => {
          const data = response.data;
          setOrder(data.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    getOrder();
  }, [id]);

  return (
    <section>
      {loading && <Loading isLoading={loading} />}

      <Container>
        <div>
          <h2 className="font-bold text-2xl leading-10 text-black text-center">
            Your order detail
          </h2>

          <p>
            Thanks for placing your order youcan check your order summary from
            below
          </p>

          <div className="flex gap-8 flex-wrap lg:flex-nowrap my-10">
            <div className="flex-1">
              <OrderHeader order={order} />
              <OrderProducts order={order} />
              <OrderSummary order={order} />
            </div>
            <ShippingBillingAddress order={order!} />
          </div>
        </div>
      </Container>
    </section>
  );
}
