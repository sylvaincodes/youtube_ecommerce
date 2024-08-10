"use client";
import Container from "@/components/modules/custom/Container";
import MainProduct from "@/components/modules/website/products/MainProduct";
import SidebarLeft from "@/components/modules/website/products/SidebarLeft";
import React, { useState } from "react";

export default function CategoriesPage({ slug }: { slug: string }) {
  const [loading, setLoading] = useState(false);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(10000);

  return (
    <section className="my-6 h-full w-full">
      <Container>
        <div className="flex h-full gap-14 w-full">
          <SidebarLeft
            minPrice={minPrice}
            maxPrice={maxPrice}
            loading={loading}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
          />
          <MainProduct
            slug={slug}
            minPrice={minPrice}
            maxPrice={maxPrice}
            loading={loading}
            setLoading={setLoading}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
          />
        </div>
      </Container>
    </section>
  );
}
