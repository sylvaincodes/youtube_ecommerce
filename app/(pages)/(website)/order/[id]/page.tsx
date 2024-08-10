import { auth } from "@/auth";
import Container from "@/components/modules/custom/Container";
import OrderWrapper from "@/components/modules/website/order/OrderWrapper";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default async function page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const session = await auth();
  if (!session) {
    redirect("/");
  }

  return (
    <>
      <section className="mt-10">
        <Container>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <Link href="/">Home</Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator/>
              <BreadcrumbItem>
                <Link href="/account/dashboard">
                  Dashboard
                </Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator/>
              <BreadcrumbItem>
                <BreadcrumbLink href="/account/order">Orders</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator/>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">{params.id}</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Container>
      </section>
      <OrderWrapper id={params.id} />
    </>
  );
}

export const metadata: Metadata = {
  title: "Order",
  description: "Become a full stack Nextjs with this project",
  icons: {
    icon: "/assets/images/logo.svg",
  },
};
