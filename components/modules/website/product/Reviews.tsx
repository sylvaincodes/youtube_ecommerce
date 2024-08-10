"use client";
import React, { useState } from "react";
import { Product, Review } from "@/types";
import AddReview from "../reviews/AddReview";
import ReviewList from "../reviews/ReviewList";

export default function Reviews({ product }: { product: Product }) {
  const [reviews, setReviews] = useState<Review[]>(product.reviews);

  return (
    <section>
      <div className="flex flex-col gap-4">
        <AddReview
          product={product}
          reviews={reviews}
          setReviews={setReviews}
        />
        <ReviewList reviews={reviews} />
      </div>
    </section>
  );
}
