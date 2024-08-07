"use client";
import React, { useEffect, useState } from "react";
import Heading from "../../custom/Heading";
import Container from "../../custom/Container";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { cn } from "@/lib/utils";
import "./style.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";
import { Product } from "@/types";
import ProductCard from "../../custom/ProductCard";

export default function FeaturesProducts() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = () => {
      setLoading(true);
      axios
        .get(process.env.NEXT_PUBLIC_API_URL + "/api/products")
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
  }, []);

  return (
    <section className="py-10 relative">
      <Container>
        <Heading name="featured products" />
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
          className={cn("mySwiper h-full w-full")}
        >
          {products &&
            products.slice(0, 10).map((item: Product, idx: number) => (
              <SwiperSlide key={idx} className="relative py-10">
                <ProductCard loading={loading} item={item} />
              </SwiperSlide>
            ))}
        </Swiper>
      </Container>
    </section>
  );
}
