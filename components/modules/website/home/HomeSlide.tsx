"use client";
import Link from "next/link";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Slide } from "@/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { cn } from "@/lib/utils";
import "./style.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";
import { m } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function HomeSlide({ className }: { className?: string }) {
  const animation = {
    hide: { x: 82, opacity: 0 },
    show: { x: 0, opacity: 1 },
  };
  const [loading, setLoading] = useState(false);
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const getSlides = async () => {
      setLoading(true);
      await axios
        .get(process.env.NEXT_PUBLIC_API_URL + "/api/slides")
        .then((response) => {
          setSlides(
            response.data.data.filter(
              (item: Slide) => item.slug === "banner-home"
            )
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
    <Swiper
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      spaceBetween={50}
      slidesPerView={1}
      navigation={false}
      pagination={true}
      modules={[Autoplay, Navigation, Pagination]}
      className={cn("mySwiper shadow-xl h-full w-full", className)}
    >
      {!loading
        ? slides &&
          slides.map((item: Slide, idx: number) => (
            <SwiperSlide
              key={idx}
              className="relative  [&>button:block]"
              style={{
                backgroundImage: `url(${item.image})`,
                height: "600px",
                width: "100%",
                backgroundSize: "cover",
                backgroundPosition: "top",
              }}
            >
              {item.title ? (
                item.title !== "" && (
                  <div className="absolute drop-shadow-2xl text-white grid grid-cols-1 place-content-start justify-items-start gap-8  capitalize m-auto  left-10 top-60 w-fit lg:left-10 lg:top-30">
                    <m.h1
                      initial={animation.hide}
                      whileInView={animation.show}
                      transition={{ delay: 0.3 }}
                      className="text-xl font-bold tracking-widest lg:text-2xl"
                    >
                      {item.title}
                    </m.h1>
                    <m.h2 className=" text-sm text-left max-w-60 lg:text-xl lg:max-w-screen-md tracking-widest leading-8 lowwercase">
                      {item.subtitle}
                    </m.h2>
                    <m.a
                      className="rounded-sm p-3 bg-white text-black hover:bg-black hover:text-white hover:shadow-lg  shadow-white"
                      href={`/${item.link}`}
                    >
                      {item.btn}
                    </m.a>
                  </div>
                )
              ) : (
                <div className="flex items-center justify-center h-full w-full ">
                  <Button
                    className="p-8 text-2xl hover:bg-primary-800 hover:shadow-2xl"
                    variant="link"
                    size="lg"
                  >
                    <Link
                      className="uppercase text-white"
                      href={`${item.link}`}
                    >
                      shop
                    </Link>
                  </Button>
                </div>
              )}
            </SwiperSlide>
          ))
        : ""}
    </Swiper>
  );
}
