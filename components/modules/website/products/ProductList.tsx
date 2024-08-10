import { Product } from "@/types";
import React from "react";
import ProductCard from "../../custom/ProductCard";
import { ShoppingBasket } from "lucide-react";
import Loading from "../../custom/Loading";

export default function ProductList({
  loading,
  products,
}: {
  loading: boolean;
  products: Product[];
}) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4 mt-10 relative">
        {!loading ? (
          products &&
          products.map((item: Product, idx: number) => (
            <ProductCard loading={loading} item={item} key={idx} />
          ))
        ) : (
          <Loading isLoading={loading} />
        )}
      </div>
      {loading === false && products.length === 0 && (
        <div className="flex flex-col justify-center items-center py-20 px-20  gap-10 w-full">
          <ShoppingBasket className="font-bold" size={100} />
          <h1 className="font-medium text-center  text-2xl flex">
            No Product Found
          </h1>
        </div>
      )}
    </>
  );
}
