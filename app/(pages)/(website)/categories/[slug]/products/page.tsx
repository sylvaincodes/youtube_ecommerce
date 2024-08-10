import CategoriesPage from "@/components/modules/website/categories/CategoriesPage";
import { mergeOpenGraph } from "@/lib/mergeOpenGraph";
import { Metadata } from "next";
import React from "react";

export default function page({ params }: { params: { slug: string } }) {
  return <CategoriesPage slug={params.slug} />;
}

export const metadata: Metadata = {
  title: "Full stack Ecommerce",
  description: "Become a full stack Nextjs with this project",
  icons: {
    icon: "/assets/images/logo.svg",
  },

  openGraph: mergeOpenGraph({
    title: "Categories - Next Js App",
    url: "/",
  }),
};
