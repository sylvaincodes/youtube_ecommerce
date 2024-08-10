"use client";
import React, { useState } from "react";
import Container from "../../custom/Container";
import ProductImage from "./ProductImage";
import ProductContent from "./ProductContent";
import { Product } from "@/types";

export default function ProductWrapper({ product }: { product: Product }) {
  const [active, setActive] = useState<number>(0);
  const [images, setImages] = useState<string[]>(
    product?.subProducts[active].options[0].images
  );

  return (
    <section className="my-20">
      <Container>
        <div className="flex flex-wrap  justify-between gap-10 lg:flex-nowrap">
          <ProductImage
            className="text-center max-w-2xl"
            product={product}
            images={images}
            active={active}
          />
          <ProductContent
            className="flex-1 w-full"
            product={product}
            active={active}
            setImages={setImages}
            setActive={setActive}
          />
        </div>
      </Container>
    </section>
  );
}
