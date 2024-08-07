"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loading from "../../custom/Loading";
import { Category, SubCategory } from "@/types";
import {  ChevronRight } from "lucide-react";
import Link from "next/link";

export default function CategoryList({ className }: { className: string }) {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  // get api
  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      await axios
        .get(process.env.NEXT_PUBLIC_API_URL + "/api/categories")
        .then((response) => {
          setCategories(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    getCategories();
  }, []);

  return (
    <div id="categoryList" className={`flex flex-col gap-4 p-4 ${className}`}>
      {loading && <Loading isLoading={loading} />}

      {!loading &&
        categories &&
        categories.map((item: Category, idx: number) => {
          return (
            <div
              key={idx}
              onClick={() => router.push(`/categories/${item.link}/products`)}
              className="group relative hover:cursor-pointer group inline-flex items-center w-full hover:text-primary-800 capitalize"
            >
              <div className="flex items-center gap-4 w-full">
                {/* <span className="absolute left-0 inset-y-4 w-2 y-2 bg-primary-900 rounded-r-full  ">

                </span> */}
                <span>{item.name}</span>
                {item.submenu && item.submenu.length > 0 && (
                  <ChevronRight className="ms-auto" />
                )}
              </div>

              <div>
                {item.submenu && item.submenu.length > 0 && (
                  <div className="hidden absolute group-hover:grid grid-cols-3 gap-4 shadow-md left-0 bg-white text-black p-4 w-[600px] z-40 mt-100">
                    {item.submenu?.map((item2: SubCategory, idx2: number) => (
                      <Link
                        href={`/categories/${item2.link}/products`}
                        key={idx2}
                        className="hover-text-primary-700 min-w-40 "
                      >
                        {item2.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
}
