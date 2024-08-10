import { getOrdersByUserId } from "@/actions/order";
import { auth } from "@/auth";
import { Order } from "@/types";
import { ShoppingBag } from "lucide-react";
import { Metadata } from "next";
import React from "react";
import { MdLocalShipping, MdMoney } from "react-icons/md";

export default async function page() {
  const session = await auth();
  const orders = await getOrdersByUserId(session?.user?.id);
  const received = orders.filter(
    (item: Order) => item.shippingStatus === "completed"
  );
  const paid = orders
    .filter((item: Order) => item.isPaid === true)
    .reduce((total: number, valeur: Order) => total + valeur.total, 0);

  return (
    <div className="p-4">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg ">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-4">
          <div className="flex items-center justify-center h-24 rounded bg-gray-50">
            <div className="flex items-center gap-4">
              <ShoppingBag className="font-bold h-10 w-10" />
              <span className="text-2xl text-gray-400">{orders.length}+</span>
              orders
            </div>
          </div>

          <div className="flex items-center justify-center h-24 rounded bg-gray-50">
            <div className="flex items-center gap-4">
              <MdLocalShipping className="font-bold h-10 w-10" />
              <span className="text-2xl text-gray-400">{received.length}+</span>
              received
            </div>
          </div>

          <div className="flex items-center justify-center h-24 rounded bg-gray-50">
            <div className="flex items-center gap-4">
              <MdMoney className="font-bold h-10 w-10" />
              <span className="text-2xl text-gray-400">{paid.length}+</span>
              paid
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Homepage - Account",
  description: "Become a full stack Nextjs with this project",
  icons: {
    icon: "/assets/images/logo.svg",
  },
};
