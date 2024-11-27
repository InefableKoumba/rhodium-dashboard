"use client";
import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";

export default function AdList() {
  return (
    <div className="overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={20}
        slidesPerView={2.5}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
          <div className="h-72 rounded-md relative shadow-sm overflow-hidden">
            <Image
              fill
              className="object-cover rounded-md hover:scale-105 transform transition-all duration-700"
              src={
                "https://www.rhodiumevent.xyz/uploads/promo2_ef78b52b11.jpeg"
              }
              alt="Pub"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-72 rounded-md relative shadow-sm overflow-hidden">
            <Image
              fill
              className="object-cover rounded-md hover:scale-105 transform transition-all duration-700"
              src={
                "https://www.rhodiumevent.xyz/uploads/promo3_775040608e.jpeg"
              }
              alt="Pub"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-72 rounded-md relative shadow-sm overflow-hidden">
            <Image
              fill
              className="object-cover rounded-md hover:scale-105 transform transition-all duration-700"
              src={
                "https://www.rhodiumevent.xyz/uploads/promo1_e2f7618121.jpeg"
              }
              alt="Pub"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
