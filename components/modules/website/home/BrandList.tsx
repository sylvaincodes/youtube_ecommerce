"use client";
import React, { useEffect, useState } from "react";
import Container from "../../custom/Container";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { cn } from "@/lib/utils";
import "./style.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";
import { Brand } from "@/types";
import Link from "next/link";
import Loading from "../../custom/Loading";

export default function BrandList() {
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const getProducts = () => {
      setLoading(true);
      axios
        .get(process.env.NEXT_PUBLIC_API_URL + "/api/brands")
        .then((response) => {
          setBrands(response.data.data);
        })
        .catch((error) => {
          console.log(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    getProducts();
  }, []);

  return (
    <section className="py-10 relative">
      <Container>

        { loading && <Loading isLoading={loading} />}
        <Swiper
          breakpoints={{
            360: {
              slidesPerView: 1,
              spaceBetween: 40,
            },
            575: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 40,
            },
          }}
          autoplay={{
            delay: 25000,
            disableOnInteraction: false,
          }}
          spaceBetween={50}
          slidesPerView={1}
          navigation={false}
          pagination={true}
          modules={[Autoplay, Navigation, Pagination]}
          className={cn("mySwiper w-full flex justify-between gap-10 border border-gray-200 py-10")}
        >
          {brands &&
            brands.slice(0, 10).map((item: Brand, idx: number) => (
              <SwiperSlide key={idx} className="relative py-6">
                <Link href="#">
                  <img className="bg-cover w-auto h-auto" src={item.image} width="120" height="120" alt="brand" />
                </Link>
              </SwiperSlide>
            ))}
        </Swiper>
      </Container>
    </section>
  );
}
