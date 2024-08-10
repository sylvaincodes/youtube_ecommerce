import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React, { useEffect, useState } from "react";
import { Category, SubCategory } from "@/types/index";
import axios from "axios";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export default function CategoriesAccordion({
  className,
}: {
  className: string;
}) {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>();

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
    <Accordion type="single" collapsible className={className}>
      {!loading ? (
        categories &&
        categories?.map((item: Category, idx: number) => (
          <AccordionItem key={idx} value={`item-${idx}`}>
            <AccordionTrigger
              className={cn(
                "capitalize",
                item.submenu && item.submenu.length === 0 && "[&>svg]:hidden"
              )}
            >
              <Link href={`/categories/${item.link}/products`}>
                {item.link}
              </Link>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-4">
                {item?.submenu?.map((item2: SubCategory, idx2: number) => (
                  <Link
                    href={`/categories/${item2.link}/products`}
                    key={idx2}
                    className="min-w-40 hover:text-primary-900 capitalize"
                  >
                    {item2.name}
                  </Link>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))
      ) : (
        <div className="flex flex-col gap-4 py-4">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
            (item: number) => (
              <Skeleton key={item} className="h-4 w-full" />
            )
          )}
        </div>
      )}
    </Accordion>
  );
}
