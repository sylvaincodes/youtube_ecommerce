"use client";
import React from "react";
import HeaderImage from "./HeaderImage";
import ShopProducts from "./ShopProducts";

export default function SidebarLeft({
  minPrice,
  maxPrice,
  loading,
  setLoading,
  setMinPrice,
  setMaxPrice,
  slug,
}: {
  minPrice: number;
  maxPrice: number;
  loading: boolean;
  setLoading: (value: boolean) => void;
  setMinPrice: (value: number) => void;
  setMaxPrice: (value: number) => void;
  slug?: string;
}) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <HeaderImage slug={slug} />
      <ShopProducts
        loading={loading}
        setLoading={setLoading}
        slug={slug}
        minPrice={minPrice}
        maxPrice={maxPrice}
        setMinPrice={setMinPrice}
        setMaxPrice={setMaxPrice}
      />
    </div>
  );
}
