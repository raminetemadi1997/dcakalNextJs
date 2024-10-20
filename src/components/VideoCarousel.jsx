"use client";
import React, { useRef, useState , useContext } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Navigation } from "swiper/modules";
import styled from '@emotion/styled'

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "@/styles/styles.css";
import Image from "next/image";

import {VideoSourceContext} from '../context/videoSrcContext'

const VideoCarousel = ({videoData}) => {
    const {setGetSrc} = useContext(VideoSourceContext)
    const ImageConatiner = styled(Image)({
        borderRadius:'.5rem',
        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
        cursor:'pointer'
    })
    const srcRef = useRef();

    const srcHandler =()=>{
        setGetSrc(srcRef.current.getAttribute("src-data"));
    }

  return (
    <>
      <Swiper navigation={true} modules={[Navigation]} slidesPerView={3} spaceBetween={30} className="mySwiper">
        
        {videoData.map(video=>{
            return(
                <SwiperSlide key={video.id} >
                    <picture ref={srcRef} onClick={srcHandler} src-data={video.video_path}>
                        <ImageConatiner width={764} height={363} src={video.poster} alt={video.description}/>
                    </picture>
                </SwiperSlide>
            )
        })}
      </Swiper>
    </>
  );
};

export default VideoCarousel;
