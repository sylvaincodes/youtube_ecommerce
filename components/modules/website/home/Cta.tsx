"use client";
import { Button } from "@/components/ui/button";
import { Slide } from "@/types";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Cta() {
  const [loading, setLoading] = useState(false);
  const [slides, setSlides] = useState<Slide[]>([]);

  useEffect(() => {
    const getSlides = async () => {
      setLoading(true);
      await axios
        .get(process.env.NEXT_PUBLIC_API_URL + "/api/slides")
        .then((response) => {
          setSlides(
            response.data.data.filter((item: Slide) => item.slug === "cta-home")
          );
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
    <section
      className="flex flex-col gap-4 w-full my-10 sm:h-[200px] lg:[500px]"
      style={{
        height: "500px",
        width: "100%",
        backgroundImage: `url(${slides[0]?.image})`,
        backgroundPosition: "top",
        backgroundSize: "cover",
      }}
    >
      {loading && slides[0]?.title && slides[0].title !== "" && (
        <div className="flex justify-around items-center gap-20 h-full">
          <h1 className="text-white text-[100px] font-bold uppercase">
            {slides[0]?.title}
          </h1>

          <h2 className="text-white text-[60px] font-bold capitalize">
            {slides[0]?.subtitle}
          </h2>

          <Button variant="link" size="default">
            <Link href={slides[0]?.link}>{slides[0]?.btn}</Link>
          </Button>
        </div>
      )}
    </section>
  );
}
