"use client";
import { Order } from "@/types";
import { CheckCheck, X } from "lucide-react";
import React from "react";


export default function OrderHeader({ order }: { order: Order | undefined }) {
  return (
    <div className="w-full flex flex-col lg:flex-row lg:items-center justify-between px-6 py-6 border-b border-gray-200 bg-neutral-100">
      <div className="w-full">
        <div className="font-semibold text-base leading-7 text-black flex w-full">
          <div className="">
            Order Id:
            <span className="text-indigo-600 font-medium ms-2">
              #{order?._id}
            </span>
          </div>
        </div>
        <p className="font-semibold text-base leading-7 text-black mt-4 inline-flex gap-4">
          Payment Status :
          <span className="text-gray-400 font-medium ms-2">
            {order?.isPaid ? (
              <CheckCheck className="text-green-200 font-bold h-8 w-8" />
            ) : (
              <X className="text-red-900 font-bold h-8 w-8" />
            )}
          </span>
        </p>
        <p className="font-semibold text-base leading-7 text-black mt-4">
          Order Status:
          <span className="text-gray-400 font-medium ms-2 capitalize">
            {order?.status}
          </span>
        </p>
      </div>
    </div>
  );
}
