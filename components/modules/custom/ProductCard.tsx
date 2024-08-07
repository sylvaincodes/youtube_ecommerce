import { Skeleton } from "@/components/ui/skeleton";
import {
  getBestPriceWithDiscountFromProduct,
  getBestPriceWithoutDiscountFromProduct,
  getDiscountRate,
} from "@/lib/utils";
import { Product } from "@/types";
import Link from "next/link";
import React from "react";
import { Rating } from "@mui/material";
import CurrencyFormat from "./CurrencyFormat";

export default function ProductCard({
  item,
  loading,
}: {
  item: Product;
  loading: boolean;
}) {
  const active = 0;
  const product = item?.subProducts[active];
  const options = product?.options[active];
  const images = options?.images;

  const bestPiceWithDiscount = getBestPriceWithDiscountFromProduct(item);
  const bestPiceWithoutDiscount = getBestPriceWithoutDiscountFromProduct(item);

  const discountRate = getDiscountRate(
    bestPiceWithoutDiscount,
    bestPiceWithDiscount
  );

  return (
    <div className="flex flex-col items-center gap-4 border border-gray-200 rounded-md pb-8 group hover:shadow-xl">
      <Link
        href={` /products/${item.slug}`}
        className="flex relative p-1 justify-center items-center"
      >
        {loading ? (
          <Skeleton className="h-[30vh]" />
        ) : (
          <div
            style={{
              height: "20vh",
              width: "160px",
              position: "relative",
              backgroundImage: `url(${images[0]})`,
              backgroundPosition: "center center",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        )}

        {options.discount === 0 ? (
          ""
        ) : (
          <div className="absolute top-20 left-0">
            <span className="text-white text-base bg-yellow-600 px-2 py-1 rounded-r-md font-bold">
              - {options.discount}%
            </span>
          </div>
        )}
      </Link>

      <div className="flex-flex-col gap-2 px-4 items-start">
        <div className="inline-flex text-slate-300 items-center duration-300 ease-l">
          <Rating
            className="mb-2"
            name="rating"
            value={parseFloat("4")}
            precision={0.5}
            readOnly
          />
          <span className="ms-4 font-bold">({item.reviews.length})</span>
        </div>

        <Link href={`/products/${item.slug}`} className="flex relative ">
          <h1 className="h-14 text-xs text-clip text-justify text-pretty capitalize my-4 lg:text-sm">
            {item.name.substring(0, 60)}...
          </h1>
        </Link>
      </div>

      <div className="flex relative justify-between mb-2 px-4">
        <span className="absolute left-0 inset-y-2 w-2 h-2 bg-primary-900 rounded-r-full">
          {discountRate > 0 ? (
            <div className="flex flex-wrap gap-4">
              <CurrencyFormat
                value={bestPiceWithDiscount}
                className="font-bold text-primary-900"
              />

              <CurrencyFormat
                value={bestPiceWithoutDiscount}
                className="line-through w-16 test-sm hidden lg:flex"
              />
            </div>
          ) : (
            <div className="flex flex-wrap gap-4">
              <CurrencyFormat
                value={bestPiceWithDiscount}
                className="font-bold text-primary-900"
              />
              <CurrencyFormat
                value={bestPiceWithoutDiscount}
                className="line-through w-10 opacity-0 test-sm hidden lg:flex"
              />
            </div>
          )}
        </span>
      </div>
    </div>
  );
}
