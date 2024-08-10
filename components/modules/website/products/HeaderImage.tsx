import { Slide } from "@/types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export default function HeaderImage({ slug }: { slug?: string }) {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(false);

  // get api
  useEffect(() => {
    const getSlides = async () => {
      setLoading(true);
      await axios
        .get(process.env.NEXT_PUBLIC_API_URL + "/api/slides")
        .then((response) => {
          const item = response.data.data.filter(
            (item: Slide) => item.slug === "banner-category"
          );
          setSlides(item);
          console.log(item);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    getSlides();
  }, []);

  return (
    <>
      {!loading ? (
        <div>
          <div
            className="flex w-full rounded-lg bg-cover justify-center h-[350px] items-center"
            style={{
              backgroundImage: `url(${slides[0]?.image})`,
              height: "350px",
            }}
          >
            <h1
              className={cn(
                "text-xl lg:text-4xl uppercase text-black backdrop font-extrabold tracking-wider"
              )}
            >
              {slug}
            </h1>
          </div>
        </div>
      ) : (
        <Skeleton className={cn("h-[325] w-full rounded-xl")} />
      )}
    </>
  );
}
