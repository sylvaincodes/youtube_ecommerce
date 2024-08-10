import { getOrdersByUserId } from "@/actions/order";
import { auth } from "@/auth";
import Orders from "@/components/modules/website/account/Orders";
import { Metadata } from "next";
import React from "react";

export default async function page() {
  const session = await auth();
  const orders = await getOrdersByUserId(session?.user?.id);
  return (
    <div className="p-4 h-screen">
      <div className="p-4 border-2 border-gray border-dashed rounded-lg">
        <div className="flex justify-center mb-4 rounded bg-gray-50">
          <Orders data={orders} />
        </div>
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Profil - Account",
  description: "Become a full stack Nextjs with this project",
  icons: {
    icon: "/assets/images/logo.svg",
  },
};
