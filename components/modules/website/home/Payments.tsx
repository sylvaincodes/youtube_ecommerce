"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { cn } from "@/lib/utils";
import "./style.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";
import Container from "../../custom/Container";
import {
  Headset,
  CreditCard,
  LockKeyhole,
  Truck,
  Calendar,
} from "lucide-react";

export default function Payments() {
  return (
    <section className="mt-4">
      <Container>
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
          className={cn("mySwiper shadow-xl h-full w-full")}
        >
          <SwiperSlide className="relative py-10">
            <div
              className="flex items-center justify-center gap-8 
            lg:after:w-[2px] lg:after:h-10 after:translate-x-14 after:bg-neutral-200"
            >
              <Headset className="h6 w-6 text-primary-900" />
              <div className="flex flex-col justify-center">
                <h1 className="uppercase font-bold">24/7</h1>
                <h2 className="font-normal text-sm">Support every time</h2>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="relative py-10">
            <div className="flex items-center justify-center gap-4 lg:after:w-[2px] lg:after:h-10 after:translate-x-14 after:bg-neutral-200">
              <CreditCard className="h6 w-6 text-primary-900" />
              <div className="flex flex-col">
                <h1 className="uppercase font-bold">accept payment</h1>
                <h2 className="font-normal text-sm">visa, paypal, master</h2>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="relative py-10">
            <div className="flex items-center justify-center gap-4 lg:after:w-[2px] lg:after:h-10 after:translate-x-14 after:bg-neutral-200">
              <LockKeyhole className="h6 w-6 text-primary-900" />
              <div className="flex flex-col">
                <h1 className="uppercase font-bold">secured payment</h1>
                <h2 className="font-normal text-sm">100% secured</h2>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="relative py-10">
            <div className="flex items-center justify-center gap-4 lg:after:w-[2px] lg:after:h-10 after:translate-x-14 after:bg-neutral-200">
              <Truck className="h6 w-6 text-primary-900" />
              <div className="flex flex-col">
                <h1 className="uppercase font-bold">free shipping</h1>
                <h2 className="font-normal text-sm">over over 300$</h2>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="relative py-10">
            <div className="flex items-center justify-center gap-4 lg:after:w-[2px] lg:after:h-10 after:translate-x-14 after:bg-neutral-200">
              <Calendar className="h6 w-6 text-primary-900" />
              <div className="flex flex-col">
                <h1 className="uppercase font-bold">30 days return</h1>
                <h2 className="font-normal text-sm">30 days guarentee</h2>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </Container>
    </section>
  );
}
