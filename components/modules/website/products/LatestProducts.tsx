import React, { Fragment, useEffect, useState } from "react";
import { Product } from "@/types";
import Link from "next/link";
import Image from "next/image";
import CurrencyFormat from "../../custom/CurrencyFormat";
import { Rating } from "@mui/material";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";

export default function LatestProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProducts = () => {
      setLoading(true);
      axios
        .get(process.env.NEXT_PUBLIC_API_URL + "/api/products")
        .then((response) => {
          setProducts(response.data.data);
        })
        .catch((error) => {
          console.log(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    getProducts();
  }, []);

  return (
    <div className="flex flex-col gap-10 mt-4">
      {!loading ? (
        products &&
        products.slice(0, 5).map((item: Product, idx: number) => (
          <Fragment key={idx}>
            <div className="flex gap-8 items-center">
              <Link href={`/products/${item.slug}`}>
                <Image
                  width="100"
                  height="100"
                  alt="product"
                  src={item.subProducts[0].options[0].images[0]}
                />
              </Link>

              <div className="flex gap-10 flex-col">
                <Link href={`/products/${item.slug}`}>
                  <h1 className="text-sm capitalize">
                    {item.name.substring(0, 35)}
                  </h1>
                </Link>

                <div className="flex justify-between gap-2 mt-4">
                  <CurrencyFormat
                    value={item.subProducts[0].options[0].price}
                  />
                </div>

                <div className="inline-flex items-center">
                  <Rating
                    className="mb-2"
                    name="read-only"
                    value={parseFloat("2")}
                    precision={0.5}
                    readOnly
                  />
                  <span className="ms-4">{item.reviews.length}</span>
                </div>
              </div>
            </div>
          </Fragment>
        ))
      ) : (
        <div className="flex flex-col gap-4">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
            (item: number) => (
              <Skeleton key={item} className="h-4 w-full" />
            )
          )}
        </div>
      )}
    </div>
  );
}
