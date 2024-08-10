import { cn } from "@/lib/utils";
import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import CurrencyFormat from "./CurrencyFormat";

export default function SearchProduct({
  products,
  className,
}: {
  products: Product[];
  className?: string;
}) {
  return (
    <div className={cn("", "md:grid-cols-3", className)}>
      {products.length > 0
        ? products.map((item: Product, idx: number) => {
            return (
              <div key={idx} className="flex flex-col gap-4 hover:shadow-xl">
                <Link
                  href={`/products/${item.slug}`}
                  className="h-40  flex items-center gap-4 w-full justify-center"
                >
                  <Image
                    src={item.subProducts[0].options[0].images[0]}
                    width="150"
                    height="150"
                    alt="search product image"
                  />
                </Link>

                <Link
                  href={`/products/${item.slug}`}
                  className="flex flex-col gap-4 justify-center items-center"
                >
                  <h1 className="font-medium text-center capitalize">
                    {" "}
                    {item.name.substring(0, 40)}
                  </h1>
                  <div className="text-primary-800 text-xl font-medium text-center">
                    <CurrencyFormat
                      className="text-center font-bold"
                      value={item.subProducts[0].options[0].price}
                    />
                  </div>
                </Link>
              </div>
            );
          })
        : ""}
    </div>
  );
}
