import { auth } from "@/auth";
import Register from "@/components/modules/website/auth/Register";
import { mergeOpenGraph } from "@/lib/mergeOpenGraph";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export default async function page() {
  const session = await auth();
  if (session) {
    redirect("/");
  }

  return <Register />;
}
export const metadata: Metadata = {
  title: "Full stack Ecommerce",
  description: "Become a full stack Nextjs with this project",
  icons: {
    icon: "/assets/images/logo.svg",
  },

  openGraph: mergeOpenGraph({
    title: "Register - Next Js App",
    url: "/",
  }),
};
