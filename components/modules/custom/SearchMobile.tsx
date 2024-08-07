import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useForm } from "react-hook-form";
import { FormValues } from "@/types";
import axios from "axios";
import toast from "react-hot-toast";
import Toast from "./Toast";
import Loading from "./Loading";
import { m } from "framer-motion";
import SearchProduct from "./SearchProduct";

export default function SearchMobile({
  openSearchMobile,
  setOpenSearchMobile,
}: {
  openSearchMobile: boolean;
  setOpenSearchMobile: (value: boolean) => void;
}) {
  const inputSearch = useRef<HTMLInputElement>(null);
  const { setFocus } = useForm<FormValues>({
    progressive: true,
  });

  const [loading, setLoading] = useState(false);
  const [dataProducts, setDataProducts] = useState([]);

  const handleFocusOn = () => {
    inputSearch.current?.focus();
  };

  const handleFocusOff = () => {
    inputSearch.current?.blur();
  };

  useEffect(() => {
    setFocus("search");
  }, [setFocus]);

  /** API SEARCH */
  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);

    const search = e.currentTarget.value;

    if (search.length === 0) setLoading(false);
    if (search.length > 3) {
      await axios
        .get(process.env.NEXT_PUBLIC_API_URL + "/api/products", {
          params: { search: search },
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
          setDataProducts(data.products);
        })
        .catch((error) => {
          toast.custom(<Toast message={error.message} status="error" />);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <>
      {loading && <Loading isLoading={loading} />}
      <button
        className={cn("", openSearchMobile && "hidden")}
        onClick={() => setOpenSearchMobile(!openSearchMobile)}
      >
        <CiSearch className="h-8 w-8" />
      </button>
      <m.div
        initial={{ opacity: 0, y: -15 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "hidden hover:shadown-xl rounded-md bg-white w-full",
          openSearchMobile && "flex lg:hidden justify-between items-center "
        )}
      >
        <form className="flex items-center gap-4 w-full">
          <Button
            variant="outline"
            size="icon"
            onClick={(e) => {
              e.preventDefault();
              setOpenSearchMobile(false);
              setLoading(false);
            }}
          >
            <ChevronLeft className="" />
          </Button>

          <Input
            className="focus:outline-none  focus:visible-none focus:ring-0 appearance-none ring-white bg-transparent flex-1 "
            placeholder="iphone 15 , ps5...."
            ref={inputSearch}
            onInput={handleSearch}
            onMouseEnter={handleFocusOn}
            onMouseLeave={handleFocusOff}
          />
        </form>
        <SearchProduct
          products={dataProducts}
          className="absolute grid grid-cols-2 gap-4 place-content-center justify-items-center overflow-auto w-full top-[60px] left-0 h-auto shadow-sm z-20 p-4 bg-white md:grid-cols-3"
        />
      </m.div>
    </>
  );
}
