import React, { useState } from "react";
import styles from "../assets/css/main/VideoBox.module.css";
import Video from "./Video";
import VideoCarousel from "./VideoCarousel";
import styled from "@emotion/styled";
import { useMediaQuery } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

const VideoBox = ({ position, videoData }) => {
  const mobile = useMediaQuery("(max-width:540px)");
  const [verticalVideo, setVerticalVideo] = useState(videoData[0].video_path);
  const [poster, setPoster] = useState(videoData[0].poster);
  const VideoContainer = styled("div")({
    width: "100%",
    padding: "1rem",
  });

  return (
    <>
      {position === "description" ? (
        <div className="mb-5">
          <div className={`w-full  rounded-tl-xl rounded-bl-xl rounded-br-xl`}>
            <div
              className={`w-full sm:h-[560px] h-[285px] bg-[var(--theme-color-green)] border border-[var(--theme-color-green)] rounded-xl flex items-end justify-center relative mb-4`}
            >
              <div
                className={`w-full rounded-xl sm:h-3/5 h-4/5 bg-white flex items-end justify-center pb-4`}
              >
                <span className={`text-sm font-bold `}>
                  راهنمای خرید آیفون تصویری (ارزان قیمت)
                </span>
              </div>
              <div className={`${styles.container} rounded-xl`}>
                <Video
                  position={position}
                  src="https://video.dcakala.com/video-files/video-door-phone/vdp-gerangheymat.mp4"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-5">
          <div
            className={`title bg-[#A4A4A4] sm:w-fit w-full sm:px-12 px-4 py-2  text-white rounded-tr-2xl sm:text-base text-sm rounded-tl-2xl relative`}
          >
            راهنمای خرید آیفون تصویری بر اساس قیمت
          </div>
          {position === `Horizontal` ? (
            <div
              className={`w-full sm:py-8 py-4 sm:px-4 px-2 sm:rounded-tl-xl rounded-tl-none rounded-bl-xl rounded-br-xl border`}
            >
              <div
                className={`w-full sm:h-[560px] h-[285px] bg-theme border border-[#FEA802] rounded-xl flex items-end justify-center relative mb-4`}
              >
                <div
                  className={`w-full rounded-xl sm:h-3/5 h-4/5 bg-white flex items-end justify-center pb-4`}
                >
                  <p className={`sm:text-sm text-xs font-bold`}>
                    راهنمای خرید آیفون تصویری (ارزان قیمت)
                  </p>
                </div>
                <div className={`${styles.container} rounded-xl`}>
                  <Video poster={poster} />
                </div>
              </div>
              {videoData.length > 1 ? (
                <VideoContainer>
                  <VideoCarousel videoData={videoData} />
                </VideoContainer>
              ) : null}
            </div>
          ) : position === `Vertical` ? (
            <div
              className={`w-full sm:py-8 py-4 sm:px-4 px-2 sm:rounded-tl-xl rounded-tl-none rounded-bl-xl rounded-br-xl border flex sm:flex-row flex-col-reverse`}
            >
              {!mobile ? (
                <div
                  dir="ltr"
                  className={`video-field sm:w-3/12 w-full sm:h-[560px] h-[285px] ml-4 overflow-y-auto pr-2`}
                >
                  {/* <Carousel type="video" /> */}
                  {videoData.map((video) => {
                    return (
                      <div
                        key={video.id}
                        onClick={(e) => {
                          setVerticalVideo(
                            e.target.getAttribute("verticaldata")
                          );
                          setPoster(e.target.getAttribute("dataPoster"));
                        }}
                        verticaldata={`${video.video_path}`}
                        dataposter={video.poster}
                        className={`w-full sm:h-40 h-28 bg-stone-200 cursor-pointer rounded-xl mb-2`}
                        style={{
                          backgroundImage: `url("${video.poster}")`,
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "100% 100%",
                          backgroundPosition: "center center",
                        }}
                      ></div>
                    );
                  })}
                </div>
              ) : (
                <Swiper
                  slidesPerView={2}
                  loop={true}
                  spaceBetween={15}
                  navigation={false}
                  modules={[Navigation]}
                  className="mySwiper"
                >
                  {videoData.map((video, i) => (
                    <SwiperSlide key={i}>
                      <div
                        key={video.id}
                        onClick={(e) => {
                          setVerticalVideo(
                            e.target.getAttribute("verticaldata")
                          );
                          setPoster(e.target.getAttribute("dataPoster"));
                        }}
                        verticaldata={`${video.video_path}`}
                        dataposter={video.poster}
                        className={`w-full sm:h-40 h-28 bg-stone-200 cursor-pointer rounded-xl mb-2`}
                        style={{
                          backgroundImage: `url("${video.poster}")`,
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "100% 100%",
                          backgroundPosition: "center center",
                        }}
                      ></div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}

              <div
                className={`sm:w-3/4 w-full sm:h-[560px] h-[285px] bg-theme border border-[#FEA802] rounded-xl flex items-end justify-center relative mb-4`}
              >
                <div
                  className={`w-full rounded-xl h-3/5 bg-white flex items-end justify-center pb-4`}
                >
                  <p className={`text-sm font-bold`}>
                    راهنمای خرید آیفون تصویری (ارزان قیمت)
                  </p>
                </div>
                <div className={`${styles.container} rounded-xl`}>
                  <Video
                    verticalSrc={verticalVideo}
                    position={position}
                    poster={poster}
                  />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
};

export default VideoBox;
