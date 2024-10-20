"use client";
import React, { useRef, useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Button from "@mui/material/Button";
import camera from "../../../public/images/card/Cctv/camera.jpg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/grid";

import "@/styles/styles.css";

// import required modules
import { Pagination } from "swiper/modules";
import Image from "next/image";
import ImageCustom from "../constantElements/ImageCustom";
import Link from "next/link";

const DashboardCarousel = ({ title, data = [] }) => {
  
  return (
    <div className="border rounded-lg p-4 grid grid-cols-1 gap-4">
      <div className="flex items-center justify-between">
        <p className='pb-2 w-fit flex justify-start text-sm font-bold relative before:w-1/2 before:h-[2px] before:bg-theme before:content-[" "] before:absolute before:-bottom-1 before:group-hover:w-full before:transition-all before:duration-200 before:ease-in-out'>
          {title}
        </p>
        <Link href='dashboard/order'>
          <Button
            size="small"
            sx={{
              display: "flex",
              alignItems: "center",
              color: "var(--theme-color)",
            }}
          >
            مشاهده همه
            <ChevronLeftIcon sx={{ color: "var(--theme-color)" }} />
          </Button>
        
        
        </Link>
      </div>
      <Swiper
        slidesPerView={2}
        spaceBetween={30}
        className="mySwiper"
        style={{ padding: "0 4px" }}
        breakpoints={{
          640: {
            slidesPerView: 5,
          },
          769: {
            slidesPerView: 5,
          },
        }}
      >
        {data.length > 0 && (
          data.map(item=>(
          <SwiperSlide key={item.id}>
            <Link href={`/${item.slug}`} title={item.alt_name} className="grid grid-cols-1 gap-2">
              <ImageCustom 
                data={item.image} 
                alt={item.image_alt} 
                title={item.image_alt} 
                width="210"
                height="210"
              />
              <p className="text-xs text-right">
                {item.alt_name}
              </p>
              <div className="flex justify-end items-center">
                <p className="text-sm">{Number(item.price).toLocaleString()}</p>
                <span className="text-xs mr-1">تومان</span>
              </div>
            </Link>
          </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  );
};

export default DashboardCarousel;
