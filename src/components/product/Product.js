"use client";
import React, {
  useState,
  useRef,
  useContext,
  Fragment,
  useEffect,
} from "react";
import Skeleton from "@mui/material/Skeleton";
import Link from "next/link";
import Avatar from "@mui/material/Avatar";
import dynamic from "next/dynamic";
//mui
import { Button } from "@mui/material";

import axios from "@/lib/axios";
// import ProductSidebar from "../constantElements/ProductSidebar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useMediaQuery } from "@mui/material";
import noImage from "../../../public/images/no-image.png";
//components
import Description from "@/components/category/Description";
import CardContainer from "@/components/main/CardContainer";
import ProductSpecifications from "@/components/product/ProductSpecifications";
// import ComparisonTable from "@/components/product/ComparisonTable";
import Question from "@/components/product/Question";
import Review from "@/components/product/Review";
import RatingStarts from "@/components/product/RatingStarts";
import Accordions from "@/components/Accordions";
import SwiperCarousel from "@/components/SwiperCarousel";
import Paragraph from "@/components/special-box/Paragraph";
import ContentImageBox from "@/components/ContentImageBox";

// import CardsCarousel from '../constantElements/CardsCarousel'
import TabCustom from "../constantElements/TabCustom";

//styles
import styles from "@/assets/css/category/MainCategory.module.css";
import "../../styles/styles.css";

//contexts
import Image from "next/image";
import ImageCustom from "../constantElements/ImageCustom";
import BannerCustom from "../constantElements/BannerCustom";
import GalleryCarousel from "../constantElements/GalleryCarousel";

const LocalShippingIcon = dynamic(
  () => import("@mui/icons-material/LocalShipping"),
  {
    ssr: false,
    loading: () => (
      <Skeleton variant="circular" width={24} height={24} animation="pulse" />
    ),
  }
);

const CreditScoreIcon = dynamic(
  () => import("@mui/icons-material/CreditScore"),
  {
    ssr: false,
    loading: () => (
      <Skeleton variant="circular" width={24} height={24} animation="pulse" />
    ),
  }
);
const SupportAgentIcon = dynamic(
  () => import("@mui/icons-material/SupportAgent"),
  {
    ssr: false,
    loading: () => (
      <Skeleton variant="circular" width={24} height={24} animation="pulse" />
    ),
  }
);
const CurrencyExchangeIcon = dynamic(
  () => import("@mui/icons-material/CurrencyExchange"),
  {
    ssr: false,
    loading: () => (
      <Skeleton variant="circular" width={24} height={24} animation="pulse" />
    ),
  }
);
const ChevronLeftIcon = dynamic(
  () => import("@mui/icons-material/ChevronLeft"),
  {
    ssr: false,
    loading: () => (
      <Skeleton variant="circular" width={24} height={24} animation="pulse" />
    ),
  }
);
const InventoryIcon = dynamic(() => import("@mui/icons-material/Inventory"), {
  ssr: false,
  loading: () => (
    <Skeleton variant="circular" width={24} height={24} animation="pulse" />
  ),
});


const CardsCarousel = dynamic(
  () => import("../constantElements/CardsCarousel"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[543px] sm:col-span-1">
        <Skeleton
          variant="rectangular"
          sx={{ width: "100%" }}
          height={543}
          animation="wave"
        />
      </div>
    ),
  }
);

const ProductSidebar = dynamic(
  () => import("@/components/constantElements/ProductSidebar"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[598.86px] sm:col-span-1">
        <Skeleton
          variant="rectangular"
          sx={{ width: "100%" }}
          height={598.86}
          animation="wave"
        />
      </div>
    ),
  }
);
const VideoCustom = dynamic(() => import("../constantElements/VideoCustom"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[598.86px] sm:col-span-1">
      <Skeleton
        variant="rectangular"
        sx={{ width: "100%" }}
        height={598.86}
        animation="wave"
      />
    </div>
  ),
});

const ComparisonTable = dynamic(
  () => import("@/components/product/ComparisonTable"),
  { ssr: false }
);

const Product = ({ apiData, type, user = null }) => {

  const [favorites, setFavorites] = useState(false);
  useEffect(() => {
    if (user) {
      const getFavorite = async () => {
        try {
          const fetchedData = await axios.get(
            `api/product-actions/favorite/${apiData.slug}`
          );
          setFavorites(fetchedData.data.status);
        } catch (error) { }
      };
      getFavorite();
    }
  }, [user, apiData.slug]);
  const [isClient, setIsClient] = useState(false);
  const [finalRate, setFinalRate] = useState();
  const [allComments, setAllComments] = useState();
  const [related, setRelated] = useState([]);
  const [galleryDiscount, setGalleryDiscount] = useState(0);
  const scrolltoHash = function (element_id) {
    const element = document.getElementById(element_id);
    element?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  const rateCallBackHandler = (data) => {
    setFinalRate(data);
  };

  const commentCallBackHandler = (data) => {
    setAllComments(data);
  };
  const relatedHandler = (data) => {
    setRelated(data);
  };

  const titleRef = useRef();
  const summaryRef = useRef();
  const [showMore, setShowMore] = useState(false);
  const [dataTitle, setDataTitle] = useState("");
  const style = {
    "--swiper-navigation-color": "var(--theme-color)",
    "--swiper-pagination-color": "var(--theme-color)",
  };

  const discountHandler = (data) => {
    setGalleryDiscount(data);
  };

  const mobile = useMediaQuery("(max-width : 540px)");
  const breakpoints = {
    340: {
      slidesPerView: 2.3,
    },

    540: {
      slidesPerView: 2.5,
    },

    768: {
      slidesPerView: 3.5,
    },

    990: {
      slidesPerView: 4.5,
    },

    1024: {
      slidesPerView: 5,
    },
  };

  return (
    apiData && (
      <>
        <section className="flex flex-col items-center w-full">


          <section className={`max-with-unique w-full sm:px-4 sm:py-4 px-2`}>
            <div className="w-full h-full border-t py-8">
              {/* above the fold */}
              <div className="mb-12">
                <div
                  className={`grid sm:grid-cols-4 grid-cols-1 grid-flow-row-dense gap-4`}
                >
                  <div className={`sm:col-span-3 col-span-1`}>
                    <h1
                      className={`sm:text-lg sm:mb-4 mb-5 text-sm font-bold text-[#656565]`}
                      ref={titleRef}
                    >
                      {apiData.name}
                    </h1>
                    <div
                      className={`grid sm:grid-cols-2 grid-cols-1 gap-4 grid-flow-row-dense`}
                      style={{
                        "@media(maxWidth:540px)": {
                          height: "auto",
                        },
                        height: "calc(100% - 44px)",
                      }}
                    >
                      <GalleryCarousel
                        data={apiData}
                        galleryDiscount={galleryDiscount}
                        enName={apiData.en_name}
                      />

                      <div
                        className={`w-full h-auto flex flex-col justify-between`}
                      >
                        <div className="grid grid-cols-1 gap-2">
                          <div
                            className={`${styles.items} h-[180px]  px-1 overflow-y-auto ckeditor-customize product sm:border-l-0 border-l sm:border-r-0 border-r sm:pl-4`}
                            dangerouslySetInnerHTML={{
                              __html: apiData.introduction,
                            }}
                          />

                          {apiData.active_attributes.length > 0 && (
                            <>
                              <div className="relative flex justify-center items-center h-auto mt-12">
                                <div className="h-[1px] bg-[#e0e0e2] w-full absolute"></div>
                                <div
                                  className="relative z-10 text-xs bg-white cursor-pointer flex gap-2 items-center p-2 border border-[#e0e0e2]"
                                  onClick={() => scrolltoHash("property")}
                                >
                                  <div>مشاهده همه ویژگی ها</div>
                                  <ChevronLeftIcon />
                                </div>
                              </div>
                            </>
                          )}
                        </div>

                        <div>
                          {related.length > 0 && (
                            <>
                              <div className="my-4">
                                <div className="mb-2 flex gap-2 items-center">
                                  <InventoryIcon
                                    sx={{ color: "#7d7979" }}
                                    fontSize="medium"
                                  />
                                  <p
                                    className="text-sm"
                                    style={{ color: "#7d7979" }}
                                  >
                                    پکیج های مشابه
                                  </p>
                                </div>
                                <Swiper
                                  autoplay={{
                                    delay: 2500,
                                    disableOnInteraction: false,
                                    pauseOnMouseEnter: true,
                                  }}
                                  slidesPerView={1}
                                  loop={true}
                                  spaceBetween={15}
                                  navigation={false}
                                  modules={[Autoplay, Navigation]}
                                  className="mySwiper"
                                >
                                  {related.map((semi) => (
                                    <SwiperSlide key={semi.id}>
                                      <div className="p-2">
                                        <Link
                                          style={{
                                            boxShadow:
                                              "1px 1px 5px 0px #00000033",
                                          }}
                                          href={`${semi.url}`}
                                          title={semi.name}
                                          className="grid grid-cols-4 w-full items-center gap-4  rounded-lg overflow-hidden"
                                        >
                                          {!Array.isArray(semi.image) ? (
                                            <ImageCustom
                                              data={semi.image}
                                              alt={semi.image_alt}
                                              title={semi.image_alt}
                                              // props
                                              loading={"lazy"}
                                              width={116}
                                              height={116}
                                              className="col-span-1"
                                            />
                                          ) : (
                                            <Image
                                              src={noImage}
                                              alt="عکس پیشفرض"
                                              width={80}
                                              height={80}
                                            />
                                          )}
                                          <p
                                            className="sm:text-sm text-xs col-span-3"
                                            style={{ color: "#7d7979" }}
                                          >
                                            {semi.name}
                                          </p>
                                        </Link>
                                      </div>
                                    </SwiperSlide>
                                  ))}
                                </Swiper>
                              </div>
                            </>
                          )}

                          {apiData &&
                            apiData.active_semi_products.length > 0 ? (
                            <>
                              <div className="my-4">
                                <div className="mb-2 flex gap-2 items-center">
                                  <InventoryIcon
                                    sx={{ color: "#7d7979" }}
                                    fontSize="medium"
                                  />
                                  <p
                                    className="text-sm"
                                    style={{ color: "#7d7979" }}
                                  >
                                    پکیج های این محصول
                                  </p>
                                </div>
                                <Swiper
                                  autoplay={{
                                    delay: 2500,
                                    disableOnInteraction: false,
                                    pauseOnMouseEnter: true,
                                  }}
                                  slidesPerView={1}
                                  loop={
                                    apiData.active_semi_products.length > 1
                                      ? true
                                      : false
                                  }
                                  spaceBetween={15}
                                  navigation={false}
                                  modules={[Autoplay, Navigation]}
                                  className="mySwiper"
                                >
                                  {apiData.active_semi_products.map((semi) => (
                                    <SwiperSlide key={semi.id}>
                                      <div className="p-2">
                                        <Link
                                          style={{
                                            boxShadow:
                                              "1px 1px 5px 0px #00000033",
                                          }}
                                          href={`/${semi.slug}`}
                                          title={semi.name}
                                          className="grid grid-cols-4 w-full items-center gap-4 rounded-lg overflow-hidden"
                                        >
                                          <ImageCustom
                                            data={semi.image}
                                            alt={semi.image_alt}
                                            title={semi.image_alt}
                                            className="col-span-1"
                                            //props
                                            loading="lazy"
                                            width={116}
                                            height={116}
                                          />
                                          <p
                                            className="sm:text-sm text-xs col-span-3"
                                            style={{ color: "#7d7979" }}
                                          >
                                            {semi.name}
                                          </p>
                                        </Link>
                                      </div>
                                    </SwiperSlide>
                                  ))}
                                </Swiper>
                              </div>
                            </>
                          ) : null}

                          {apiData &&
                            apiData.semi_packages.length > 0 ? (
                            <>
                              <div className="my-4">
                                <div className="mb-2 flex gap-2 items-center">
                                  <InventoryIcon
                                    sx={{ color: "#7d7979" }}
                                    fontSize="medium"
                                  />
                                  <p
                                    className="text-sm"
                                    style={{ color: "#7d7979" }}
                                  >
                                    پکیج های مشابه
                                  </p>
                                </div>
                                <Swiper
                                  autoplay={{
                                    delay: 2500,
                                    disableOnInteraction: false,
                                    pauseOnMouseEnter: true,
                                  }}
                                  slidesPerView={1}
                                  loop={
                                    apiData.semi_packages.length > 1
                                      ? true
                                      : false
                                  }
                                  spaceBetween={15}
                                  navigation={false}
                                  modules={[Autoplay, Navigation]}
                                  className="mySwiper"
                                >
                                  {apiData.semi_packages.map((semi) => (
                                    <SwiperSlide key={semi.id}>
                                      <div className="p-2">
                                        <Link
                                          style={{
                                            boxShadow:
                                              "1px 1px 5px 0px #00000033",
                                          }}
                                          href={semi.url}
                                          title={semi.name}
                                          className="grid grid-cols-4 w-full items-center gap-4 rounded-lg overflow-hidden"
                                        >
                                          <ImageCustom
                                            data={semi.image}
                                            alt={semi.image_alt}
                                            title={semi.image_alt}
                                            className="col-span-1"
                                            //props
                                            loading="lazy"
                                            width={116}
                                            height={116}
                                          />
                                          <p
                                            className="sm:text-sm text-xs col-span-3"
                                            style={{ color: "#7d7979" }}
                                          >
                                            {semi.name}
                                          </p>
                                        </Link>
                                      </div>
                                    </SwiperSlide>
                                  ))}
                                </Swiper>
                              </div>
                            </>
                          ) : null}

                          <div>
                            <div
                              className={`border-t border-stone-500 flex sm:flex-row flex-col-reverse justify-between sm:items-center pt-2`}
                            >
                              {apiData.comment_status == 1 ? (
                                <>
                                  {!mobile ? (
                                    <>
                                      <Button
                                        onClick={() => scrolltoHash("review")}
                                        sx={{
                                          fontSize: "14px",
                                          color: "var(--theme-color)",
                                          "@media (max-width: 540px)": {
                                            color: "#fff",
                                            mt: 2,
                                            color: "var(--theme-color)",
                                          },
                                          "@media (min-width: 540px) and (max-width: 990px)":
                                          {
                                            color: "#fff",
                                            color: "var(--theme-color)",
                                            fontSize: "10px",
                                          },
                                        }}
                                      >
                                        مشاهده نظرات
                                      </Button>

                                      <p
                                        className={`xl:text-xs text-[10px] sm:mt-0 mt-2`}
                                      >
                                        {allComments} نظر برای این کالا ثبت شده
                                        است
                                      </p>
                                      <RatingStarts
                                        ratings={finalRate && finalRate}
                                      />
                                    </>
                                  ) : (
                                    <section className="flex items-center justify-between mb-4">
                                      <div className="flex flex-col gap-2">
                                        <RatingStarts
                                          ratings={finalRate && finalRate}
                                        />
                                        <p className={`text-xs sm:mt-0 mt-2`}>
                                          {allComments} نظر برای این کالا ثبت
                                          شده است
                                        </p>
                                      </div>
                                      <Button
                                        onClick={() => scrolltoHash("review")}
                                        sx={{
                                          fontSize: "14px",
                                          color: "var(--theme-color)",
                                          "@media (max-width: 540px)": {
                                            color: "#fff",
                                            color: "var(--theme-color)",
                                          },
                                        }}
                                      >
                                        مشاهده نظرات
                                      </Button>
                                    </section>
                                  )}
                                </>
                              ) : (
                                <p className="text-sm text-red-600">
                                  امکان درج نظر برای این محصول وجود ندارد
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={`sm:col-span-1`}>
                    <ProductSidebar
                      data={apiData}
                      relatedPackagesItems={relatedHandler}
                      discountHandler={discountHandler}
                    />
                  </div>
                </div>
                <div className="mt-4 text-xs text-[#C6C3B9] sm:block hidden">
                  {apiData.en_name}
                </div>
              </div>

              {/* above the fold */}

              {/* services */}
              <div className="mb-12 grid sm:grid-cols-4 grid-cols-4 grid-flow-row-dense sm:gap-4 gap-2 border-y py-4">
                <div className="flex lg:flex-row flex-col lg:justify-center lg:items-start items-center text-[#838383]">
                  <LocalShippingIcon />
                  <p className="lg:mr-2 lg:mt-0 mt-2 lg:text-base text-xs lg:text-right text-center">
                    ارسال سریع به سراسر ایران
                  </p>
                </div>
                <div className="flex lg:flex-row flex-col lg:justify-center lg:items-start items-center text-[#838383]">
                  <CurrencyExchangeIcon />
                  <p className="lg:mr-2 lg:mt-0 mt-2  lg:text-base text-xs lg:text-right text-center">
                    تضمین بازگشت وجه
                  </p>
                </div>
                <div className="flex lg:flex-row flex-col lg:justify-center lg:items-start items-center text-[#838383]">
                  <CreditScoreIcon />
                  <p className="lg:mr-2 lg:mt-0 mt-2  lg:text-base text-xs lg:text-right text-center">
                    تنوع در روش های پرداخت
                  </p>
                </div>
                <div className="flex lg:flex-row flex-col lg:justify-center lg:items-start items-center text-[#838383]">
                  <SupportAgentIcon />
                  <p className="lg:mr-2 lg:mt-0 mt-2  lg:text-base text-xs lg:text-right text-center">
                    پشتیبانی حین و بعد از فروش
                  </p>
                </div>
              </div>
              {/* services */}

              {isClient ? (
                apiData.active_supplements.length >= 1 && (
                  <>
                    <div className="w-full grid sm:grid-cols-4 grid-cols-1 gap-y-8 gap-4 mt-5 mb-12">
                      {apiData.active_supplements.length >= 1 && (
                        <>
                          <TabCustom
                            bold={true}
                            value={["محصولات مکمل"]}
                            className="sm:col-span-3 col-span-1"
                          />
                          <div
                            className={`sm:col-span-3 col-span-1 border-b py-1 w-full`}
                          >
                            {/* <div className="my-12 mr-12 text-lg ">محصولات مکمل</div> */}
                            <div className={`flex justify-center w-full`}>
                              <Swiper
                                breakpoints={breakpoints}
                                style={style}
                                slidesPerView={4}
                                loop={false}
                                spaceBetween={15}
                                navigation={mobile ? false : true}
                                modules={[Navigation]}
                                className="mySwiper"
                              >
                                {apiData.active_supplements.map(
                                  (supplement) => (
                                    <SwiperSlide
                                      key={supplement.id}
                                      className="border-l last:border-l-0"
                                    >
                                      <div className="p-2">
                                        <Link
                                          href={`/${supplement.slug}`}
                                          title={supplement.name}
                                          className="flex flex-col w-full items-center gap-4 rounded-lg group"
                                        >
                                          <ImageCustom
                                            data={supplement.image}
                                            alt={supplement.image_alt}
                                            title={supplement.image_alt}
                                            // props
                                            loading={"lazy"}
                                            width={116}
                                            height={116}
                                          />
                                          <p className="sm:text-sm text-xs text-center text-[#7d7979] group-hover:text-theme">
                                            {supplement.name}
                                          </p>
                                        </Link>
                                      </div>
                                    </SwiperSlide>
                                  )
                                )}
                              </Swiper>
                            </div>
                          </div>
                        </>
                      )}

                      {apiData.product_banner ? (
                        <BannerCustom
                          className={`sm:col-span-1`}
                          data={apiData.product_banner}
                          width={320}
                          height={196}
                        />
                      ) : null}
                    </div>
                  </>
                )
              ) : (
                <div className="w-full mt-5 mb-12 h-[332px]">
                  <Skeleton
                    variant="rectangular"
                    sx={{ width: "100%" }}
                    height={332}
                    animation="wave"
                  />
                </div>
              )}

              {apiData && (
                <>
                  {apiData.video_path && (
                    <VideoCustom
                      source={apiData.video_path}
                      poster={apiData.video_poster}
                      title={apiData.video_name}
                    />
                  )}
                </>
              )}
              {apiData.summary && (
                <div className="grid grid-cols-1 gap-8">
                  <TabCustom bold={true} value={["معرفی اجمالی"]} />
                  <Description type="default" body={apiData.summary} />
                </div>
              )}

              {apiData.active_attributes.length > 0 && (
                <ProductSpecifications
                  attributes={apiData.active_attributes}
                  attributeImage={apiData.image}
                  alt={apiData.image_alt}
                />
              )}

              {apiData.faq_status == 1 && <Question slug={apiData.slug} />}

              {apiData.active_product_summeries.length > 0 && (
                <section className="my-12 grid sm:grid-cols-3 grid-cols-1 gap-4">
                  {apiData.active_product_summeries.map((productSummeries) => (
                    <div
                      key={productSummeries.id}
                      className="bg-[#F3F3F3] rounded-lg p-4"
                    >
                      <ImageCustom
                        data={productSummeries.image}
                        alt={productSummeries.image_alt}
                        title={productSummeries.image_alt}
                        // props
                        loading={"lazy"}
                        width={399}
                        height={399}
                        style={{ borderRadius: ".5rem" }}
                      />

                      <p className="text-center my-8">
                        {productSummeries.title}
                      </p>
                      <div
                        className="text-justify text-sm"
                        dangerouslySetInnerHTML={{
                          __html: productSummeries.body,
                        }}
                      />
                    </div>
                  ))}
                </section>
              )}

              {apiData.box_status == 0 ? (
                <section className="gap-8 grid grid-cols-1">
                  {!Array.isArray(apiData.author) ? (
                    <div className="flex items-center h-full border-b gap-4">
                      <div className="border-b border-theme pb-4 h-full">
                        <ImageCustom
                          data={apiData.author.image_path}
                          alt={apiData.author.full_name}
                          title={apiData.author.full_name}
                          // props
                          loading={"lazy"}
                          fullWidth={false}
                          width={56}
                          height={56}
                          size="original"
                          style={{ borderRadius: "50%" }}
                        />
                      </div>
                      <div className=" h-full flex flex-col gap-2 pb-4">
                        <div className="font-bold text-theme text-lg">
                          بررسی تخصصی
                        </div>

                        <Link
                          href={
                            apiData.author
                              ? `/authors/${apiData.author.link}`
                              : "#"
                          }
                          className="text-[#A1A3ABCF]"
                        >
                          {apiData.author.full_name}
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className=" h-full flex flex-col gap-2 pb-4">
                      <div className="font-bold text-theme text-lg">
                        بررسی تخصصی
                      </div>
                    </div>
                  )}
                  <Description type="default" body={apiData.body} />
                </section>
              ) : (
                apiData.special_box.length > 0 &&
                apiData.special_box.map((special) =>
                  special.content_type == "paragraph" ? (
                    <section
                      key={special.id}
                      className={`paragraph grid grid-cols-2 grid-flow-row-dense gap-4 mb-8`}
                    >
                      {special.items.map((paragraph) => (
                        <Fragment key={paragraph.id}>
                          <Paragraph
                            className="last:odd:col-span-2 sm:col-span-1 col-span-2"
                            paragraphTitle={paragraph.title}
                            paragraphDescription={paragraph.description}
                            link={paragraph.link ? paragraph.link : "#"}
                          />
                        </Fragment>
                      ))}
                    </section>
                  ) : special.content_type == "faq" ? (
                    <Fragment key={special.id}>
                      <Accordions type="FAQ" faqData={special.items} />
                    </Fragment>
                  ) : special.content_type == "post" ? (
                    <Fragment key={special.id}>
                      <CardContainer
                        productNormalSliders={special.items}
                        type="specialNews"
                        className="mt-24 mb-8"
                      />
                    </Fragment>
                  ) : special.content_type == "first_content" ? (
                    <Fragment key={special.id}>
                      <ContentImageBox
                        type={"firstArticle"}
                        title={special.title}
                        firstContentData={special.items}
                      />
                    </Fragment>
                  ) : special.content_type == "second_content" ? (
                    <Fragment key={special.id}>
                      <ContentImageBox type={"secondArticle"} />
                    </Fragment>
                  ) : special.content_type == "third_content" ? (
                    <Fragment key={special.id}>
                      <ContentImageBox type="contentImageV3" />
                    </Fragment>
                  ) : special.content_type == "accordion" ? (
                    <Fragment key={special.id}>
                      <Accordions type="photoContent" />
                    </Fragment>
                  ) : special.content_type == "image_slider" ? (
                    <section
                      key={special.id}
                      className={`mb-16 w-full rounded-xl ${styles.container} flex justify-center`}
                    >
                      <div className="w-[98%] h-full bg-slate-400 rounded-[25px] mt-3">
                        <SwiperCarousel
                          type="banner"
                          className="rounded-xl"
                          imageSlider={special.items}
                        />
                      </div>
                    </section>
                  ) : null
                )
              )}
              {apiData.con || apiData.pro ? (
                <section className="grid sm:grid-cols-2 grid-cols-1 gap-4 place-items-center my-12">
                  <div
                    className="bg-[#F9F9F9] rounded-lg sm:w-1/2 w-full"
                    style={{ boxShadow: " 1px 1px 3.6px 0px #00000040" }}
                  >
                    <p className="text-center">
                      <span className="bg-[#228B22] px-4 rounded-b-lg text-white text-lg">
                        نقاط قوت
                      </span>
                    </p>
                    <ul className="py-4 px-8 grid grid-cols-1 gap-2">
                      {apiData.pro.split(",").map((tags, i) => (
                        <li
                          key={i}
                          className="before:content-['-'] before:text-[#228B22] before:ml-2 before:text-lg before:font-bold"
                        >
                          {tags}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div
                    className="bg-[#F9F9F9] rounded-lg sm:w-1/2 w-full"
                    style={{ boxShadow: " 1px 1px 3.6px 0px #00000040" }}
                  >
                    <p className="text-center">
                      <span className="bg-[#D80032] px-4 rounded-b-lg text-white text-lg">
                        نقاط ضعف
                      </span>
                    </p>
                    <ul className="py-4 px-8 grid grid-cols-1 gap-2">
                      {apiData.con.split(",").map((tags, i) => (
                        <li
                          key={i}
                          className="before:content-['-'] before:text-[#D80032] before:ml-2 before:text-lg before:font-bold"
                        >
                          {tags}
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              ) : null}
              {/* بخش دانلود فایل */}

              {apiData.active_similars.length >= 1 && (
                <ComparisonTable
                  similars={apiData.active_similars}
                  attributeSimilars={apiData.similar_slider_attributes}
                />
              )}
              {apiData.comment_status == 1 && (
                <Review
                  slug={apiData.slug}
                  ratingData={rateCallBackHandler}
                  allCommentsCallBack={commentCallBackHandler}
                />
              )}
              {apiData.related_sliders.length >= 1 && (
                <>
                  <CardsCarousel
                    data={apiData.related_sliders}
                    title={["محصولات مرتبط"]}
                    slidesPerView={5}
                    spaceBetween={0}
                  />
                </>
              )}
            </div>
          </section>
        </section>
        {apiData && (
          <>
            {apiData.structure_status == 1 && (
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify(apiData.data_structure),
                }}
              />
            )}
          </>
        )}
      </>
    )
  );
};

export default Product;
