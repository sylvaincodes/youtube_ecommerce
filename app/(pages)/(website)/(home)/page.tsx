import Banner from "@/components/modules/website/home/Banner";
import BestSellersProducts from "@/components/modules/website/home/BestSellersProducts";
import BrandList from "@/components/modules/website/home/BrandList";
import Cta from "@/components/modules/website/home/Cta";
import FeaturesProducts from "@/components/modules/website/home/FeaturesProducts";
import Newletter from "@/components/modules/website/home/Newletter";
import Payments from "@/components/modules/website/home/Payments";
import TopCategories from "@/components/modules/website/home/TopCategories";
import * as React from "react";
import { Metadata } from "next";
import { mergeOpenGraph } from "../../../../lib/mergeOpenGraph";

export default function Home() {
  return (
    <>
      <Banner />
      <Payments />
      <TopCategories />
      <FeaturesProducts />
      <Cta />
      <BestSellersProducts />
      <BrandList />
      <Newletter />
    </>
  );
}

export const metadata: Metadata = {
  title: "Full stack Ecommerce",
  description: "Become a full stack Nextjs with this project",
  icons: {
    icon: "/assets/images/logo.svg",
  },

  openGraph: mergeOpenGraph({
    title: "Home - Next Js App",
    url: "/",
  }),
};
