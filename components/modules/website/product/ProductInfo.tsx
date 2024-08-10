import { getRating } from "@/lib/utils";
import { Product } from "@/types";
import { Rating } from "@mui/material";
import React from "react";

export default function ProductInfo({ product }: { product: Product }) {
  const rating = getRating(product);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold tracking-wide lg:text-xl">
        {product.name.substring(0, 150)}
      </h1>

      {/* Ratings  */}
      <div className="inline-flex items-ceneter gap-4">
        <Rating
          name="half-rating-read"
          className=""
          readOnly
          value={rating}
          precision={0.5}
        />

        <span className="pt-0">({product.reviews.length}) reviews</span>
      </div>

      <div>
        <p className="text-pretty text-sm/6">{product.description}</p>
      </div>
    </div>
  );
}
