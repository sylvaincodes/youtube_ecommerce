"use client";
import React, { useEffect, useState } from "react";
import Container from "../../custom/Container";
import { TbCategory2 } from "react-icons/tb";
import Loading from "@/components/modules/custom/Loading";

import axios from "axios";
import { Page } from "@/types";
import Link from "next/link";

export default function Menus() {
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState([]);

  // get api
  useEffect(() => {
    const getPages = async () => {
      setLoading(true);

      await axios
        .get(process.env.NEXT_PUBLIC_API_URL + "/api/pages")
        .then((response) => {
          setPages(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    getPages();
  }, []);

  const handleCategory = () => {
    document.querySelector("#categoryList")?.classList.toggle("!hidden");
  };

  return (
    <section className="w-full hidden lg:flex py-2">
      <Container>
        {loading && <Loading isLoading={loading} />}
        <div className="flex justify-between  w-full p-2 border border-gray-200 rounded-md">
          <div className="flex items-center gap-8">
            <div
              className="flex w-[260px] cursor-pointer gap-1 px-6 justify-between items-center bg-primary-900 mx-1 py-3 text-white rounded-md"
              onClick={handleCategory}
            >
              <span className="uppercase">categories</span>
              <TbCategory2 className="h-6 w-6 text-white" />
            </div>
            <div className="flex">
              {pages &&
                pages.map((item: Page, idx: number) => {
                  return (
                    <Link
                      className="capitalize hover:text-primary-900 font-medium text-xl"
                      key={idx}
                      href={item.link}
                    >
                      {item.name}
                    </Link>
                  );
                })}
            </div>
          </div>
          <div className="flex text-primary-900 items-center me-10 text-xl font-medium capitalize">
            Free shipping over 0$
          </div>
        </div>
      </Container>
    </section>
  );
}
