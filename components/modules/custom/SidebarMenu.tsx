import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import Loading from "./Loading";
import { Category, Page, SubCategory, SubPage } from "@/types";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function SidebarMenu() {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [pages, setPages] = useState([]);

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
    getCategories();
    getPages();
  }, []);

  return (
    <Sheet>
      <SheetTrigger>
        <div className="lg:hidden">
          <span className="flex cursor-pointer lg:hidden">
            <CiMenuBurger className="h-8 w-8 font-thin text-base" />
          </span>
        </div>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Main Menu</SheetTitle>
          <SheetDescription>Select a option tab</SheetDescription>
        </SheetHeader>

        <div className="mt-10">
          <Tabs defaultValue="account" className="max-w-[400px]">
            <TabsList>
              <TabsTrigger value="category">Categories</TabsTrigger>
              <TabsTrigger value="menus">Pages</TabsTrigger>
            </TabsList>

            <TabsContent value="category">
              <div>
                {loading && <Loading isLoading={loading} />}

                {categories.length > 0 &&
                  categories.map((item: Category, idx: number) => {
                    return (
                      <div
                        className="group inline-flex items-center px-4 py-2 gap-4 w-full hover:text-primary-700 capitalize cursor-pointer"
                        key={idx}
                        onClick={() =>
                          router.push(`/categories/${item.link}/products`)
                        }
                      >
                        <div className="flex items-center gap-4 w-full">
                          <span>{item.name}</span>
                          {item?.submenu && item.submenu.length > 0 && (
                            <ChevronRight className="ms-auto" />
                          )}
                        </div>

                        {item?.submenu && item.submenu.length > 0 ? (
                          <div className="hidden absolute group-hover:grid grid-cols-3 gap-6 shadow-sm left-0 bg-white p-4 w-full">
                            {item.submenu.map(
                              (item2: SubCategory, idx: number) => {
                                return (
                                  <Link key={idx}
                                    href={`/categories/${item2.link}/products`}
                                  >
                                    {item2.name}
                                  </Link>
                                );
                              }
                            )}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    );
                  })}
              </div>
            </TabsContent>
            <TabsContent value="menus">
              <div>
                {loading && <Loading isLoading={loading} />}

                {pages.length > 0 &&
                  pages.map((item: Page, idx: number) => {
                    return (
                      <div
                        className="group inline-flex items-center px-4 py-2 gap-4 w-full hover:text-primary-700 capitalize cursor-pointer"
                        key={idx}
                        onClick={() => router.push(`item.link}`)}
                      >
                        <div className="flex items-center gap-4 w-full">
                          <span>{item.name}</span>
                          {item?.subPage && item.subPage.length > 0 && (
                            <ChevronRight className="ms-auto" />
                          )}
                        </div>

                        {item?.subPage && item.subPage.length > 0 ? (
                          <div className="hidden absolute group-hover:grid grid-cols-3 gap-6 shadow-sm left-0 bg-white p-4 w-full">
                            {item.subPage.map((item2: SubPage, idx: number) => {
                              return (
                                <Link key={idx} href={`${item2.link}`}>
                                  {item2.name}
                                </Link>
                              );
                            })}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    );
                  })}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
}
