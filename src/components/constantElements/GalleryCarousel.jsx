import React, { useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TelegramIcon from "@mui/icons-material/Telegram";
import useMediaQuery from "@mui/material/useMediaQuery";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import ShareIcon from "@mui/icons-material/Share";
import IconButton from "@mui/material/IconButton";
import eitaa from "../../../public/icons/eitaaIcon.png";
import CategoryIcon from "@mui/icons-material/Category";
import discountTag from "../../../public/images/card/tag.png";
import { SettingApi } from "@/context/api/Setting";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import axios from "@/lib/axios";
import { SnakebarContext } from "@/context/snakebar";
import Skeleton from "@mui/material/Skeleton";

const PlayCircleIcon = dynamic(() => import("@mui/icons-material/PlayCircle"), {
  ssr: false,
  loading: () => (
    <Skeleton variant="circular" width={35} height={35} animation="pulse" />
  ),
});

const GalleryModal = dynamic(() => import("@/components/modals/GalleryModal"), {
  ssr: false,
});

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "@/styles/styles.css";
import ImageCustom from "./ImageCustom";
import Link from "next/link";
import Image from "next/image";
const frontUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;

const GalleryCarousel = ({ data = null, galleryDiscount = 0, enName }) => {
  const [page, setPage] = useState(1);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectImage, setSelectImage] = useState(null);
  const [selectImageIndex, setSelectImageIndex] = useState(null);
  const [touchIcons, setTouchIcons] = useState(false);
  const { dataUser } = useContext(SettingApi);
  const [favorite, setFavorite] = useState(false);

  const { setOpenAlarm, setModes, setMessage, setDuration } =
    useContext(SnakebarContext);

  const socialMedia = [
    {
      icon: <WhatsAppIcon sx={{ color: "#fff" }} />,
      name: "واتساپ",
      link: `https://api.whatsapp.com/send?text=${frontUrl}${data.category.slug}/${data.slug}`,
    },
    {
      icon: <TelegramIcon sx={{ color: "#fff" }} />,
      name: "تلگرام",
      link: `https://telegram.me/share/url?url=${frontUrl}${data.category.slug}/${data.slug}&text=${data.name}`,
    },
  ];

  const miniMobile = useMediaQuery("(max-width:375px)");
  const mobile = useMediaQuery("(max-width:600px)");
  const portraitTablets = useMediaQuery(
    "(min-width:600px)  and (max-width:768px) "
  );
  const landscapeTablets = useMediaQuery(
    "(min-width:768px) and (max-width:992px)"
  );
  const laptops = useMediaQuery("(min-width:992px) and (max-width:1200px)");

  function responsive(purpose) {
    if (purpose == "width") {
      if (miniMobile) {
        return 340;
      } else if (mobile) {
        return 380;
      } else if (portraitTablets) {
        return 380;
      } else if (landscapeTablets) {
        return 248;
      } else if (laptops) {
        return 332;
      } else {
        return 380;
      }
    } else if (purpose == "height") {
      if (miniMobile) {
        return 340;
      } else if (mobile) {
        return 380;
      } else if (portraitTablets) {
        return 380;
      } else if (landscapeTablets) {
        return 248;
      } else if (laptops) {
        return 332;
      } else {
        return 380;
      }
    }
  }

  function responsiveMini(purpose) {
    if (purpose == "width") {
      if (miniMobile) {
        return 90;
      } else if (mobile) {
        return 154;
      } else if (portraitTablets) {
        return 118;
      } else if (landscapeTablets) {
        return 47;
      } else if (laptops) {
        return 66;
      } else {
        return 96;
      }
    } else if (purpose == "height") {
      if (miniMobile) {
        return 90;
      } else if (mobile) {
        return 154;
      } else if (portraitTablets) {
        return 118;
      } else if (landscapeTablets) {
        return 47;
      } else if (laptops) {
        return 66;
      } else {
        return 96;
      }
    }
  }

  useEffect(() => {
    document.body.addEventListener("click", (event) => {
      if (!event.target.closest("button")) setTouchIcons(false);
    });
    axios
      .get(`api/product-actions/favorite/${data.slug}`)
      .then((response) => {
        if (response.data.status) {
          setFavorite(true);
        } else {
          setFavorite(false);
        }
      })
      .catch((error) => {
        setFavorite(false);
      });
  }, [data.slug]);

  const selectImageHandler = (selected, i) => {
    setSelectImage(selected);
    setSelectImageIndex(i);
    setOpenModal(true);
    setPage(0);
  };
  const videoHandler = () => {};

  const favoriteHandler = () => {
    axios.get("/sanctum/csrf-cookie");
    axios
      .post(`api/product-actions/favorite/${data.slug}`)
      .then((response) => {
        if (response.data.status) {
          setFavorite(true);
          setOpenAlarm(true);
          setModes("success");
          setMessage(response.data.message);
        } else {
          setOpenAlarm(true);
          setFavorite(false);
          setModes("error");
          setMessage(response.data.message);
        }
      })
      .catch((error) => {
        setOpenAlarm(true);
        setFavorite(false);
        setModes("error");
        setMessage(response.data.message);
      });
  };

  useEffect(() => {
    dataUser &&
      axios
        .get(`api/product-actions/favorite/${data.slug}`)
        .then((response) => {
          response.data.status ? setFavorite(true) : setFavorite(false);
        })
        .catch((error) => {
          setFavorite(false);
        });
  }, []);

  return (
    data && (
      <>
        <div>
          <div className="p-2 border rounded-lg sm:h-full h-auto">
            <div className="flex flex-col gap-2">
              {/* head */}
              <div className="grid grid-cols-3 w-full relative items-center">
                {data.marketable == 0 ? (
                  !Array.isArray(data.discount) || data.discount ? (
                    <Image
                      src={discountTag}
                      alt="badge"
                      height={42}
                      width={80}
                    />
                  ) : null
                ) : null}

                <div className="flex gap-2 col-start-2 justify-center">
                  <Tooltip title="مقایسه" arrow>
                    <IconButton aria-label="comparison">
                      <Link
                        rel="nofollow"
                        href={data.id ? `/compare/dcap-${data.id}` : "#"}
                        title={`مقایسه محصول ${data.name}`}
                      >
                        <CategoryIcon />
                      </Link>
                    </IconButton>
                  </Tooltip>

                  {!mobile ? (
                    <Tooltip
                      leaveDelay={600}
                      title={
                        <Stack direction="row" spacing={1} component="ul">
                          {socialMedia.map((item, i) => {
                            return (
                              <li key={i}>
                                <Link
                                  href={item.link ? item.link : "#"}
                                  target="_blank"
                                  rel="nofollow"
                                  title={item.name}
                                >
                                  <Tooltip title={item.name} arrow>
                                    <IconButton aria-label="social media">
                                      {item.icon}
                                    </IconButton>
                                  </Tooltip>
                                </Link>
                              </li>
                            );
                          })}
                          <li>
                            <Link
                              href={`https://www.eitaa.com/share/url?url=${frontUrl}${data.category.slug}/${data.slug}`}
                              target="_blank"
                              rel="nofollow"
                              title={"ایتا"}
                            >
                              <Tooltip title={"ایتا"} arrow>
                                <IconButton aria-label="social media">
                                  <Image
                                    src={eitaa}
                                    alt="ایتا"
                                    className="text-white w-6 h-6"
                                    style={{ color: "#fff" }}
                                  />
                                </IconButton>
                              </Tooltip>
                            </Link>
                          </li>
                        </Stack>
                      }
                      arrow
                    >
                      <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <>
                      <IconButton
                        aria-label="share"
                        onTouchStart={() => setTouchIcons(true)}
                      >
                        <ShareIcon />
                      </IconButton>

                      {touchIcons && (
                        <div className="absolute  top-10 z-10 rounded-lg bg-[#616161eb]">
                          <ul className="flex items-center gap-2 ">
                            {socialMedia.map((item, i) => {
                              return (
                                <li key={i}>
                                  <Link
                                    href={item.link ? item.link : "#"}
                                    target="_blank"
                                    rel="nofollow"
                                    title={item.name}
                                  >
                                    <Tooltip title={item.name} arrow>
                                      <IconButton aria-label="social media">
                                        {item.icon}
                                      </IconButton>
                                    </Tooltip>
                                  </Link>
                                </li>
                              );
                            })}
                            <li>
                              <Link
                                href={`https://www.eitaa.com/share/url?url=${frontUrl}${data.category.slug}/${data.slug}`}
                                target="_blank"
                                rel="nofollow"
                                title={"ایتا"}
                              >
                                <Tooltip title={"ایتا"} arrow>
                                  <IconButton aria-label="social media">
                                    <Image
                                      src={eitaa}
                                      alt="ایتا"
                                      className="text-white w-6 h-6"
                                      style={{ color: "#fff" }}
                                    />
                                  </IconButton>
                                </Tooltip>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      )}
                    </>
                  )}

                  {dataUser && dataUser.data.activation == 1 && (
                    <Tooltip title="افزودن به علاقه مندی ها" arrow>
                      <IconButton
                        aria-label="favorites"
                        // onClick={() => setFavorite(!favorite)}
                        onClick={favoriteHandler}
                      >
                        {favorite === true ? (
                          <FavoriteIcon color="error" />
                        ) : (
                          <FavoriteBorderIcon />
                        )}
                      </IconButton>
                    </Tooltip>
                  )}
                </div>

                {galleryDiscount != 0 ? (
                  <div className="flex items-center justify-end col-start-3">
                    <div className="w-8 h-8 bg-red-500 rounded-full text-white text-xs flex justify-center items-center">
                      {galleryDiscount}%
                    </div>
                  </div>
                ) : data.marketable == 0 ? (
                  !Array.isArray(data.discount) &&
                  (data.discount ? (
                    <div className="flex items-center justify-end col-start-3">
                      <div className="w-8 h-8 bg-red-500 rounded-full text-white text-xs flex justify-center items-center">
                        {data.discount.type == 0
                          ? `${data.discount.percentage}%`
                          : `${Number(
                              Math.round(
                                (data.discount.percentage / data.price) * 100
                              )
                            )}%`}
                      </div>
                    </div>
                  ) : null)
                ) : null}
              </div>
              {/* head */}

              {/* main picture */}
              <Swiper
                style={{
                  "--swiper-navigation-color": "var(--theme-color)",
                  "--swiper-pagination-color": "var(--theme-color)",
                }}
                spaceBetween={10}
                navigation={!mobile ? true : false}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="galleryCarousel2"
              >
                {data.type == 2 ? (
                  <SwiperSlide>
                    <ImageCustom
                      onClick={() => selectImageHandler(data.image, 0)}
                      data={data.image}
                      alt={data.image_alt}
                      title={data.image_alt}
                      size="large"
                      className="cursor-pointer"
                    />
                  </SwiperSlide>
                ) : (
                  data.active_galleries.length > 0 &&
                  data.active_galleries.map((mainImages, i) => (
                    <SwiperSlide key={mainImages.id}>
                      <ImageCustom
                        onClick={() => selectImageHandler(mainImages, i)}
                        data={mainImages.image}
                        alt={mainImages.image_alt}
                        title={mainImages.image_alt}
                        size="large"
                        className="cursor-pointer"
                        width={responsive("width")}
                        height={responsive("height")}
                      />
                    </SwiperSlide>
                  ))
                )}
              </Swiper>
              {/* main picture */}

              {/* mini picures */}
              <div className="flex gap-2">
                {data.active_video_galleries.length > 0 && (
                  <div className="flex items-center">
                    <picture className="relative">
                      <source
                        srcSet={data.active_video_galleries[0].poster}
                        type="image/jpg"
                      />

                      <img
                        srcSet={data.active_video_galleries[0].poster}
                        src={data.active_video_galleries[0].poster}
                        alt={data.active_video_galleries[0].title}
                        title={data.active_video_galleries[0].title}
                        decoding="async"
                        width={100}
                      />
                      <div
                        onClick={() => {
                          setOpenModal(true), setPage(1);
                        }}
                        className="bg-black w-full h-full bg-opacity-50 absolute top-0 cursor-pointer flex justify-center items-center"
                      >
                        <PlayCircleIcon
                          fontSize="large"
                          sx={{ color: "var(--theme-color)" }}
                        />
                      </div>
                    </picture>
                  </div>
                )}
                <Swiper
                  onSwiper={setThumbsSwiper}
                  spaceBetween={10}
                  slidesPerView={
                    data.active_video_galleries.length > 0
                      ? mobile
                        ? 2.5
                        : 3.5
                      : mobile
                      ? 3.5
                      : 4.5
                  }
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="galleryCarousel"
                >
                  {data.type == 2 ? (
                    <SwiperSlide>
                      <ImageCustom
                        onClick={() => selectImageHandler(data.image, 0)}
                        data={data.image}
                        alt={data.image_alt}
                        title={data.image_alt}
                      />
                    </SwiperSlide>
                  ) : (
                    data.active_galleries.length > 0 &&
                    data.active_galleries.map((mainImages, i) => (
                      <SwiperSlide key={mainImages.id}>
                        <ImageCustom
                          onClick={() => selectImageHandler(mainImages, i)}
                          data={mainImages.image}
                          alt={mainImages.image_alt}
                          title={mainImages.image_alt}
                          width={responsiveMini("width")}
                          height={responsiveMini("height")}
                        />
                      </SwiperSlide>
                    ))
                  )}
                </Swiper>
              </div>
              {/* mini picures */}
            </div>
          </div>

          <div className="mt-2 text-xs text-[#C6C3B9] sm:hidden block mb-4">
            {enName}
          </div>
        </div>

        <GalleryModal
          data={data}
          openModal={openModal}
          close={() => setOpenModal(false)}
          selectImage={selectImage}
          selectImageIndex={selectImageIndex}
          selectHandler={selectImageHandler}
          pageHandler={(event, newValue) => setPage(newValue)}
          pageSelect={page}
        />
      </>
    )
  );
};

export default GalleryCarousel;
