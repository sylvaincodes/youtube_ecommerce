"use client";
import React from "react";
import Heading from "../../custom/Heading";
import CategoriesAccordion from "../../custom/CategoriesAccordion";
import FiltersPrice from "../../custom/FiltersPrice";
import LatestProducts from "./LatestProducts";

export default function SidebarLeft({
  minPrice,
  maxPrice,
  loading,
  setMinPrice,
  setMaxPrice,
}: {
  minPrice: number;
  maxPrice: number;
  loading: boolean;
  setMinPrice: (value: number) => void;
  setMaxPrice: (value: number) => void;
}) {
  return (
    <div className="max-w-[280px] w-full flex-col gap-8 h-full hidden xl:flex">
      {/* categories  */}
      <div className="flex flex-col w-full relative">
        <Heading name="browser categories" />
        <div className="flex my-4">
          <CategoriesAccordion className="w-full" />
        </div>
      </div>

      {/* filters */}
      <div className="flex flex-col w-full relative">
        <Heading name="filters" />
        <div className="flex my-4">
          <FiltersPrice
            loading={loading}
            minPrice={minPrice}
            maxPrice={maxPrice}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
          />
        </div>
      </div>

      {/* Latest products */}

      <div className="flex flex-col w-full relative">
        <Heading name="latest products" />
        <div className="flex-flex-col my-4">
          <LatestProducts/>
        </div>
      </div>
     </div>
  );
}
