import React from "react";
import Link from "next/link";
//components
import Title from "./Title";
//css
import styles from "../../assets/css/main/Blog.module.css";
import SwiperCarousel from "../SwiperCarousel";

const Blog = () => {
  return (
    <div className={`flex flex-col items-center`}>
      <Title titleValue="آخرین اخبار و مقالات آموزشی دی سی ای کالا" />
      <div className={`w-full pt-14 bg-[#FAF7F7] dipslay-unique`}>
        <div className={`w-full h-fit ${styles.container} px-4 pb-10 max-with-unique`}>
          {/* <Carousel type="blog" /> */}
          <SwiperCarousel type='blog' />
        </div>
      </div>
    </div>
  );
};

export default Blog;
