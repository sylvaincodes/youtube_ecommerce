import { auth } from "@/auth";
import Container from "@/components/modules/custom/Container";
import Addresses from "@/components/modules/website/cart/Addresses";
import CartHeader from "@/components/modules/website/cart/CartHeader";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export default async function page() {

  const session = await auth();
  if (!session) {
    redirect("/");
  }

  return (
    <section>
      <Container>
        <div className="flex flex-col gap-4">
          <CartHeader active="checkout" />
          <Addresses />
        </div>
      </Container>
    </section>
  );
}

export const metadata: Metadata = {
  title: "Cart",
  description: "Become a full stack Nextjs with this project",
  icons: {
    icon: "/assets/images/logo.svg",
  },
};
