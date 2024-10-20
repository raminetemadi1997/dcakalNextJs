"use client";
import React, { Fragment, useState } from "react";
import dynamic from "next/dynamic";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, Grid } from "swiper/modules";
import Link from "next/link";
import { useMediaQuery } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import noImage from "../../public/images/no-image.png";
import bannerCategory1 from "../../public/images/Banners/new/category/category-282-240.jpg";
import bannerCategory2 from "../../public/images/Banners/new/category/category-282-240-2.jpg";
import styles from "@/assets/css/category/MainCategory.module.css";
import { blogItemsCarousel } from "@/constants/constants";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/grid";

import "@/styles/styles.css";
import Image from "next/image";
import Card from "./Card";

import BlogItem from "./BlogItem";
import { usePathname } from "next/navigation";
import ImageCustom from "./constantElements/ImageCustom";

const SwiperCarousel = ({
  type,
  position,
  className,
  productSliderItems,
  brandData,
  choose,
  productNormalSliders,
  imageSlider,
  productDiscountSlider,
  productGroupSliders,
  sliderProductGroupSliders,
  data,
  col,
}) => {
  const mobile = useMediaQuery("(max-width:540px)");
  const [tabs, setTabs] = useState();
  const passName = usePathname();
  let discountUnic = null;
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL_IMAGE;

  const CardDynamic = dynamic(() => import("./Card"), {
    ssr: false,
    loading: () =>
      type == "discount" ? (
        <Skeleton
          variant="rounded"
          width={mobile ? 248 : 250}
          height={mobile ? 359 : 470}
          animation="wave"
        />
      ) : (
        <Skeleton
          variant="rounded"
          width={mobile ? 248 : 268}
          height={mobile ? 359 : 475}
          animation="wave"
        />
      ),
  });

  const style = {
    "--swiper-navigation-color": "var(--theme-color)",
    "--swiper-pagination-color": "var(--theme-color)",
    "--swiper-pagination-top": type === "blog" ? 300 : null,
  };

  let date = new Date();

  return (
    <Swiper
      dir="rtl"
      spaceBetween={
        type == "brand" ||
        type === "newProducts" ||
        type == "blog" ||
        type == "cardContainer"
          ? 15
          : 5
      }
      slidesPerView={
        type == "discount" ||
        type == "cardContainer" ||
        type == "newProducts" ||
        type == "blog"
          ? 1.5
          : type == "brand" || type === "bestSellers"
          ? 2.5
          : type == "product"
          ? 1.7
          : 1
      }
      navigation={
        mobile ||
        type == "blog" ||
        (type == "banner" && position == "aside") ||
        type == "asideCarousel"
          ? false
          : true
      }
      style={style}
      grid={{
        rows:
          type == "brand" || type === "newProducts"
            ? 2
            : type == "asideCarousel"
            ? 4
            : null,
        fill: type == "brand" || type === "newProducts" ? "row" : null,
      }}
      loop={false}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      pagination={{
        clickable: true,
      }}
      breakpoints={{
        640: {
          ...(type != "asideCarousel" && {
            slidesPerView:
              type == "discount" ||
              type == "cardContainer" ||
              type == "newProducts" ||
              type == "product" ||
              type == "blog"
                ? 2.2
                : type == "brand"
                ? 8
                : type === "bestSellers"
                ? 4.5
                : 1,
          }),
        },
        // when window width is >= 768px
        768: {
          ...(type != "asideCarousel" && {
            slidesPerView:
              type == "discount" || type == "blog" || type == "product"
                ? 2
                : type == "brand"
                ? 9
                : type == "newProducts"
                ? 3
                : type == "cardContainer" ||
                  type === "bestSellers" ||
                  type == "productSlider"
                ? col
                  ? col
                  : 2.5
                : 1,
          }),
        },

        990: {
          slidesPerView: 4,
        },

        1024: {
          ...(type != "asideCarousel" && {
            slidesPerView: type == "discount" ? 2.5 : 3.5,
          }),
        },

        1200: {
          ...(type != "asideCarousel" && {
            slidesPerView: type == "discount" ? 4 : 5,
          }),
        },
      }}
      modules={
        type == "discount" ||
        type == "cardContainer" ||
        type == "productSlider" ||
        type == "product"
          ? [Navigation]
          : type == "brand" || type === "newProducts"
          ? [Navigation, Grid]
          : type === "bestSellers"
          ? [Navigation]
          : type == "blog"
          ? [Pagination, Autoplay]
          : type == "asideCarousel"
          ? [Pagination, Grid]
          : position === "aside"
          ? [Autoplay, Pagination]
          : [Autoplay, Navigation, Pagination]
      }
      className={`mySwiper ${type == "brand" ? "max-with-unique" : null}`}
    >
      {type == "banner" ? (
        <>
          {position === "aside" ? (
            <>
              <SwiperSlide>
                <Link href="\">
                  <picture>
                    <Image src={bannerCategory1} alt="اسلایدر اصلی" />
                  </picture>
                </Link>
              </SwiperSlide>

              <SwiperSlide>
                <Link href="\">
                  <picture>
                    <Image src={bannerCategory2} alt="اسلایدر اصلی" />
                  </picture>
                </Link>
              </SwiperSlide>
            </>
          ) : (
            imageSlider &&
            imageSlider.map((slider) => {
              return (
                <Fragment key={slider.id}>
                  <SwiperSlide key={slider.id}>
                    <Link
                      href={
                        slider.link
                          ? /^[0-9]*$/.test(slider.link.split("://")[1])
                            ? `tel:${slider.link.split("://")[1]}`
                            : slider.link
                          : "#"
                      }
                    >
                      <ImageCustom
                        data={slider.image}
                        alt={slider.image_alt}
                        title={slider.image_alt}
                        mobileData={slider.mobile_image}
                        mobileTitle={slider.mobile_image_alt}
                        mobileAlt={slider.mobile_image_alt}
                        loading={"lazy"}
                        width={1900}
                        height={1200}
                        style={{ width: "100%" }}
                      />
                    </Link>
                  </SwiperSlide>
                </Fragment>
              );
            })
          )}
        </>
      ) : type == "discount" ? (
        productDiscountSlider &&
        productDiscountSlider.map((product) => {
          return (
            <SwiperSlide key={product.id}>
              <CardDynamic
                data={product}
                shipperVisible={false}
                colorVisible={false}
                timerVisible = {false}
              />
            </SwiperSlide>
          );
        })
      ) : type == "brand" ? (
        brandData.map((brand) => {
          return (
            <Fragment key={brand.id}>
              <SwiperSlide
                key={brand.id}
                style={{
                  display: "flex",
                  alainItems: "center",
                  height: "auto !important",
                }}
              >
                <Link
                  href={brand.link ? brand.link : brand.slug}
                  className={`bg-white h-10 w-full border rounded-lg flex items-center justify-center relative right-0 top-0 overflow-hidden ${styles.brand_logo}`}
                  title={brand.title ? brand.title : brand.name}
                >
                  {brand.title ? brand.title : brand.alt_name}
                  <Image
                    src={
                      brand.image != null
                        ? `${backendUrl}${
                            brand.image.indexWeb
                              ? brand.image.indexWeb.medium
                              : brand.image.webp
                          }`
                        : noImage
                    }
                    alt={brand.image_alt}
                    className="absolute bg-white"
                    width={75}
                    height={75}
                  />
                </Link>
              </SwiperSlide>
            </Fragment>
          );
        })
      ) : type === "cardContainer" ? (
        productNormalSliders &&
        productNormalSliders.map((product) => {
          return (
            <Fragment key={product.id}>
              <SwiperSlide key={product.id}>
                <Card data={product} />
              </SwiperSlide>
            </Fragment>
          );
        })
      ) : type === "newProducts" ? (
        sliderProductGroupSliders != undefined &&
        sliderProductGroupSliders[choose].map((product) => {
          return (
            <SwiperSlide
              key={product.id}
              style={{
                display: "flex",
                alainItems: "center",
                height: "auto !important",
              }}
            >
              <Card type="newProducts" data={product} />
            </SwiperSlide>
          );
        })
      ) : type === "bestSellers" ? (
        productGroupSliders &&
        productGroupSliders.map((product) => {
          return (
            <SwiperSlide key={product.id}>
              <Link
                href={product.slug ? product.slug : "#"}
                title={product.image_alt}
              >
                <ImageCustom
                  data={product.image}
                  alt={product.image_alt}
                  title={product.image_alt}
                  loading={"lazy"}
                  width={250}
                  height={250}
                  style={{ backgroundColor: "#fff", borderRadius: ".5rem" }}
                />
              </Link>
            </SwiperSlide>
          );
        })
      ) : type == "blog" ? (
        blogItemsCarousel.map((data) => {
          return (
            <Fragment key={data.id}>
              <SwiperSlide key={data.id}>
                <BlogItem src={data.image} />
              </SwiperSlide>
            </Fragment>
          );
        })
      ) : type == "asideCarousel" ? (
        data &&
        data.map((popularSidebar) => (
          <Fragment key={popularSidebar.id}>
            <SwiperSlide
              key={popularSidebar.id}
              style={{
                display: "flex",
                alainItems: "center",
                height: "auto !important",
              }}
            >
              <Link
                title={popularSidebar.name}
                href={`/${popularSidebar.slug}`}
                className="h-full flex w-full items-center border-b cursor-pointer group pb-2"
              >
                <ImageCustom
                  data={popularSidebar.image}
                  alt={popularSidebar.image_alt}
                  title={popularSidebar.image_alt}
                  loading={"lazy"}
                  width={75}
                  height={75}
                  size="small"
                />
                <p
                  className={`text-sm group-hover:text-theme duration-100 transition-colors ease-in`}
                >
                  {popularSidebar.alt_name}
                </p>
              </Link>
            </SwiperSlide>
          </Fragment>
        ))
      ) : type == "productSlider" ? (
        productSliderItems.map((productSliderItems) => {
          return (
            <Fragment key={productSliderItems.id}>
              <SwiperSlide key={productSliderItems.id}>
                <Card data={product} type="productSlider" />
              </SwiperSlide>
            </Fragment>
          );
        })
      ) : type == "product" ? (
        imageSlider &&
        imageSlider.map((slider) => {
          return (
            <SwiperSlide key={slider.id}>
              <Card data={slider} type="product" />
            </SwiperSlide>
          );
        })
      ) : null}
    </Swiper>
  );
};

export default SwiperCarousel;
