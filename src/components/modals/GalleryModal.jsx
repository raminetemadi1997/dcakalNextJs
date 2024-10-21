import React, { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";

import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import ImageCustom from "../constantElements/ImageCustom";
import TabCustom from "../constantElements/TabCustom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

const GalleryModal = ({
  data = null,
  openModal,
  close,
  selectImage,
  selectImageIndex,
  selectHandler,
  pageSelect,
  pageHandler,
}) => {
  const mobile = useMediaQuery("(max-width : 540px)");
  const desktop = useMediaQuery("(min-width : 1610px)");

  const [page, setPage] = useState(0);

  const [videoSelect, setVideoSelect] = useState(null);

  const [videoIndex, setVideoIndex] = useState(0);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: mobile ? "90%" : "75%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 2,
    borderRadius: ".5rem",
    outline: "none",
  };

  return (
    <>
      {!mobile ? (
        <Modal
          open={openModal}
          onClose={close}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {/* head */}
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <div>{data.name}</div>
              <IconButton onClick={close}>
                <CloseIcon />
              </IconButton>
            </div>
            {/* head */}

            {/* body */}
            <div className="grid grid-cols-3 gap-4">
              {/* main */}
              {pageSelect == 0 ? (
                data.type == 2 ? (
                  <ImageCustom
                    data={selectImage ? selectImage : data.active_galleries[0]}
                    alt={data.image_alt}
                    title={data.image_alt}
                    size="large_2x"
                    className="col-span-2 flex justify-center items-end"
                    fullWidth={false}
                    width={desktop ? 760 : 380}
                    height={desktop ? 760 : 380}
                    style={{ height: "fit-content" }}
                  />
                ) : (
                  <ImageCustom
                    data={
                      selectImage
                        ? selectImage.image
                        : data.active_galleries[0].image
                    }
                    alt={
                      selectImage
                        ? selectImage.image_alt
                        : data.active_galleries[0].image_alt
                    }
                    title={
                      selectImage
                        ? selectImage.image_alt
                        : data.active_galleries[0].image_alt
                    }
                    size="large_2x"
                    className="col-span-2 flex justify-center items-end"
                    fullWidth={false}
                    width={desktop ? 760 : 380}
                    height={desktop ? 760 : 380}
                    style={{ height: "fit-content" }}
                  />
                )
              ) : data.active_video_galleries.length > 0 ? (
                videoSelect == null ? (
                  <video
                    title={data.active_video_galleries[0].title}
                    className="col-span-2"
                    width="750"
                    height="500"
                    controls
                    poster={data.active_video_galleries[0].poster}
                  >
                    <source
                      src={data.active_video_galleries[0].video_path}
                      type="video/mp4"
                    />
                  </video>
                ) : (
                  <video
                    title={
                      videoSelect.title ? videoSelect.title : "ویدیو محصول"
                    }
                    className="col-span-2"
                    width="750"
                    height="500"
                    controls
                    poster={videoSelect.poster}
                  >
                    <source src={videoSelect.video_path} type="video/mp4" />
                  </video>
                )
              ) : null}
              {/* main */}

              {/* sidebar */}
              <div className="flex flex-col gap-2 col-start-3">
                <TabCustom
                  selected={pageSelect}
                  onChange={pageHandler}
                  value={
                    data.active_video_galleries.length > 0
                      ? ["تصاویر", "ویدیو ها"]
                      : ["تصاویر"]
                  }
                />

                {
                  pageSelect == 0 ? (
                    // mini pictures
                    data.type == 2 ? (
                      <div className="grid grid-cols-4 gap-2">
                        <ImageCustom
                          // onClick={() => selectHandler(pictures, i)}
                          size="small"
                          // key={pictures.id}
                          data={selectImage}
                          alt={data.image_alt}
                          title={data.image_alt}
                          fullWidth={false}
                          width={100}
                          height={100}
                          className={`border-theme border-2 cursor-pointer rounded-md overflow-hidden`}
                        />
                      </div>
                    ) : (
                      data.active_galleries.length > 0 && (
                        <div className="grid grid-cols-4 gap-2">
                          {data.active_galleries.map((pictures, i) => (
                            <ImageCustom
                              onClick={() => selectHandler(pictures, i)}
                              size="small"
                              key={pictures.id}
                              data={pictures.image}
                              alt={pictures.image_alt}
                              title={pictures.image_alt}
                              fullWidth={false}
                              width={100}
                              height={100}
                              className={`${
                                selectImageIndex
                                  ? selectImageIndex == i
                                    ? ` border-theme border-2`
                                    : `border-2`
                                  : i == 0
                                  ? ` border-theme border-2`
                                  : `border-2`
                              } cursor-pointer rounded-md overflow-hidden`}
                            />
                          ))}
                        </div>
                      )
                    )
                  ) : (
                    // mini pictures

                    // mini videos
                    data.active_video_galleries.length > 0 && (
                      <div className="grid grid-cols-3 gap-2">
                        {data.active_video_galleries.map((videos, i) => (
                          <picture key={videos.id}>
                            <source srcSet={videos.poster} type="image/jpg" />

                            <img
                              srcSet={videos.poster}
                              src={videos.poster}
                              alt={videos.title}
                              title={videos.title}
                              decoding="async"
                              className={`${
                                videoIndex == i ? `opacity-100` : `opacity-50`
                              } cursor-pointer rounded-md overflow-hidden`}
                              onClick={() => {
                                setVideoSelect(videos), setVideoIndex(i);
                              }}
                            />
                          </picture>
                        ))}
                      </div>
                    )
                  )
                  // mini videos
                }
              </div>
              {/* sidebar */}
            </div>
            {/* body */}
          </Box>
        </Modal>
      ) : (
        <Modal
          open={openModal}
          onClose={close}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {/* head */}
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <div className="text-xs">{data.name}</div>
              <IconButton size="small" onClick={close}>
                <CloseIcon />
              </IconButton>
            </div>
            {/* head */}

            {/* body */}
            <div className="grid grid-cols-1 gap-4">
              {/* main */}
              {pageSelect == 0 ? (
                selectImage && (
                  <ImageCustom
                    data={selectImage ? selectImage : data.active_galleries[0]}
                    alt={data.image_alt}
                    title={data.image_alt}
                    size="medium"
                    className="flex justify-center"
                    fullWidth={false}
                    width={210}
                    height={210}
                  />
                )
              ) : data.active_video_galleries.length > 0 ? (
                videoSelect == null ? (
                  <video
                    title={data.active_video_galleries[0].title}
                    className="col-span-2"
                    width="750"
                    height="500"
                    controls
                    poster={data.active_video_galleries[0].poster}
                  >
                    <source
                      src={data.active_video_galleries[0].video_path}
                      type="video/mp4"
                    />
                  </video>
                ) : (
                  <video
                    title={videoSelect.title}
                    width="750"
                    height="500"
                    controls
                    poster={videoSelect.poster}
                  >
                    <source src={videoSelect.video_path} type="video/mp4" />
                  </video>
                )
              ) : null}
              {/* main */}

              {/* sidebar */}
              <div className="flex flex-col gap-2">
                <TabCustom
                  selected={pageSelect}
                  onChange={pageHandler}
                  value={
                    data.active_video_galleries.length > 0
                      ? ["تصاویر", "ویدیو ها"]
                      : ["تصاویر"]
                  }
                />

                {
                  pageSelect == 0 ? (
                    // mini pictures
                    data.active_galleries.length > 0 ? (
                      <Swiper
                        slidesPerView={3}
                        loop={true}
                        spaceBetween={15}
                        navigation={false}
                        modules={[Navigation]}
                        className="mySwiper"
                      >
                        {data.active_galleries.map((pictures, i) => (
                          <SwiperSlide key={pictures.id}>
                            <ImageCustom
                              onClick={() => selectHandler(pictures, i)}
                              size="small"
                              data={pictures.image}
                              alt={pictures.image_alt}
                              title={pictures.image_alt}
                              fullWidth={false}
                              width={100}
                              height={100}
                              className={`${
                                selectImageIndex == i
                                  ? `opacity-100`
                                  : `opacity-50`
                              }  rounded-md overflow-hidden`}
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    ) : (
                      <Swiper
                        slidesPerView={3}
                        loop={true}
                        spaceBetween={15}
                        navigation={false}
                        modules={[Navigation]}
                        className="mySwiper"
                      >
                        <SwiperSlide>
                          <ImageCustom
                            size="small"
                            data={
                              selectImage
                                ? selectImage
                                : data.active_galleries[0]
                            }
                            alt={data.image_alt}
                            title={data.image_alt}
                            fullWidth={false}
                            width={100}
                            height={100}
                            className={`opacity-100 rounded-md overflow-hidden`}
                          />
                        </SwiperSlide>
                      </Swiper>
                    )
                  ) : (
                    // mini pictures

                    // mini videos
                    data.active_video_galleries.length > 0 && (
                      <Swiper
                        slidesPerView={3}
                        loop={true}
                        spaceBetween={15}
                        navigation={false}
                        modules={[Navigation]}
                        className="mySwiper"
                      >
                        {data.active_video_galleries.map((videos, i) => (
                          <SwiperSlide key={videos.id}>
                            <picture>
                              <source srcSet={videos.poster} type="image/jpg" />
                              <img
                                srcSet={videos.poster}
                                src={videos.poster}
                                alt={videos.title}
                                title={videos.title}
                                decoding="async"
                                className={`${
                                  videoIndex == i ? `opacity-100` : `opacity-50`
                                } rounded-md overflow-hidden`}
                                onClick={() => {
                                  setVideoSelect(videos), setVideoIndex(i);
                                }}
                              />
                            </picture>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    )
                  )
                  // mini videos
                }
              </div>
              {/* sidebar */}
            </div>
            {/* body */}
          </Box>
        </Modal>
      )}
    </>
  );
};

export default GalleryModal;
