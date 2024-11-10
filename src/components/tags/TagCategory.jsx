"use client";
import Link from "next/link";
import React from "react";
import ImageCustom from "@/components/constantElements/ImageCustom";
import styles from "@/assets/css/Tag.module.css";
import useMediaQuery from "@mui/material/useMediaQuery";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "../../styles/styles.css";

const TagCategory = ({ data }) => {
  const mobile = useMediaQuery("(max-width:540px)");
  return (
    <div>
      <div className={`font-medium mb-2`}>
        {data.tag.name} بر اساس دسته بندی:
      </div>
      <div
        className={`${styles.container} sm:grid block grid-cols-6 gap-4 sm:p-4 p-2 rounded-lg`}
      >
        {mobile ? (
          <Swiper slidesPerView={1.8} spaceBetween={15} className="mySwiper">
            {data.tag.categories.map((categories) => (
              <SwiperSlide key={categories.id}>
                <Link
                  href={`/${categories.slug}`}
                  title={categories.name}
                  className={`bg-white rounded-lg ${styles.tag_item} p-4 block`}
                >
                  <ImageCustom
                    data={categories.image}
                    alt={categories.image_alt}
                    title={categories.image_alt}
                    // props
                    loading={"lazy"}
                    height={112}
                    width={112}
                    fullWidth={false}
                    className="flex justify-center items-center overflow-hidden mb-2"
                  />
                  <div className={`text-center text-sm font-medium`}>
                    {categories.name}
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          data.tag.categories.map((categories) => (
            <Link
              key={categories.id}
              href={`/${categories.slug}`}
              title={categories.name}
              className={`bg-white rounded-lg ${styles.tag_item} p-4`}
            >
              <ImageCustom
                data={categories.image}
                alt={categories.image_alt}
                title={categories.image_alt}
                // props
                loading={"lazy"}
                height={112}
                width={112}
                fullWidth={false}
                className="flex justify-center items-center overflow-hidden mb-2"
              />
              <div className={`text-center text-sm font-medium`}>
                {categories.name}
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default TagCategory;
