import usePagination from "@/hooks/usePagination";
import axios from "axios";
import React, { useEffect, useState } from "react";
import TopBar from "./TopBar";
import ProductList from "./ProductList";
import { Pagination } from "@mui/material";

export default function ShopProducts({
  loading,
  setLoading,
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  slug,
}: {
  loading: boolean;
  slug?: string;
  setLoading: (value: boolean) => void;
  setMaxPrice: (value: number) => void;
  setMinPrice: (value: number) => void;
  minPrice: number;
  maxPrice: number;
}) {
  const [products, setProducts] = useState([]);
  const [perpage, setPerPages] = useState(10);
  const [filter, setFilter] = useState("latest");

  const [page, setPage] = useState(1);

  const count = Math.ceil(products.length / perpage);
  const _DATA = usePagination(products, perpage);

  const handleChange = (e: React.ChangeEvent<unknown>, p: number) => {
    setPage(p);
    _DATA.jump(p);
  };

  useEffect(() => {
    const getProducts = () => {
      setLoading(true);
      axios
        .get(process.env.NEXT_PUBLIC_API_URL + "/api/products", {
          params: {
            filter: filter,
            category: slug,
            minPrice: minPrice,
            maxPrice: maxPrice,
          },
        })
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
  }, [page, filter, slug, minPrice, maxPrice, setLoading]);

  return (
    <div>
      <TopBar
        minPrice={minPrice}
        maxPrice={maxPrice}
        setMinPrice={setMinPrice}
        setMaxPrice={setMaxPrice}
        loading={loading}
        slug={slug}
        perpage={perpage}
        filter={filter}
        setPerPages={setPerPages}
        setFilter={setFilter}
      />
      <ProductList loading={loading} products={_DATA.currentData()} />

      <div className="flex mt-10 justify-between">
        <Pagination
          count={count}
          page={page}
          color="primary"
          variant="outlined"
          shape="rounded"
          onChange={handleChange}
        />

        <div className="flex ms-auto">
          Showing {_DATA.maxPage === page ? products.length : perpage * page} of{" "}
          {products.length} results
        </div>
      </div>
    </div>
  );
}
