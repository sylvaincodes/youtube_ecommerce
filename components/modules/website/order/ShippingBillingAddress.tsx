"use client";
import { Mail } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Order } from "@/types";
import { Button } from "@/components/ui/button";
import Toast from "../../custom/Toast";
import { ClipLoader } from "react-spinners";

export default function ShippingBillingAddress({
  order,
}: {
  order: Order | undefined;
}) {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handledelivered = async () => {
    if (loading) {
      return;
    }

    const data = {
      id: order?._id,
      status: order?.status,
      shippingStatus: "delivered",
    };

    setLoading(true);
    await axios
      .put(process.env.NEXT_PUBLIC_API_URL + "/api/order", data)
      .then((response) => {
        const data = response.data;
        toast.custom(<Toast message={data.message} status="success" />);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
        router.refresh();
      });
  };

  const handlecompleted = async () => {
    if (loading) {
      return;
    }
    const data = {
      id: order?._id,
      status: "completed",
      shippingStatus: order?.shippingStatus,
    };

    setLoading(true);
    await axios
      .put(process.env.NEXT_PUBLIC_API_URL + "/api/order", data)
      .then((response) => {
        const data = response.data;
        toast.custom(<Toast message={data.message} status="success" />);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
        router.refresh();
      });
  };

  return (
    <div className="w-full col-span-1 p-4 bg-neutral-100 lg:w-[320px] flex flex-col gap-10 items-flex-start pt-12">
      {loading ? (
        <ClipLoader
          className="fixed inset-0 m-auto z-20"
          size={100}
          color="#3c38ca"
        />
      ) : (
        ""
      )}

      <div className="flex items-center gap-4">
        <Image
          src={
            order?.user.image
              ? order?.user.image
              : "https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
          }
          width={60}
          height={60}
          alt="user image"
        />
        <div className="flex flex-col">
          <h1 className="text-xl font-bold">{order?.user.name}</h1>
          {/* <span className="text-slate-500">{orders.length} Previous orders</span> */}
        </div>
      </div>
      <hr />
      <div className="inline-flex gap-4">
        <Mail />
        <span className="text-slate-500">{order?.user.email}</span>
      </div>
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold mb-2">Shipping Address</h1>
        <p className="text-slate-700">{order?.shippingAddress?.address}</p>
      </div>

      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold mb-2">Billing Address</h1>
        <p className="text-slate-700">{order?.shippingAddress?.address}</p>
      </div>
      <div className="mt-auto gap-4 flex flex-col ">
        {order?.shippingStatus !== "delivered" && (
          <Button
            disabled={loading}
            onClick={() => handledelivered()}
            className="font-bold w-full bg-indigo-400 rounded-none border border-gray-300 text-slate-700 p-8 hover:text-white hover:bg-black"
          >
            MARKED AS DELIVERED
          </Button>
        )}
        {order?.status !== "completed" && (
          <Button
            disabled={loading}
            onClick={() => handlecompleted()}
            className="font-bold w-full bg-blue-400 border rounded-none border-gray-300 text-slate-700 p-8 hover:text-white hover:bg-black"
          >
            MARKED AS COMPLETED
          </Button>
        )}
      </div>
    </div>
  );
}
