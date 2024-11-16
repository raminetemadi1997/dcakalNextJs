"use client";
import React, { Fragment, useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { IconButton, useMediaQuery } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { VideoSourceContext } from "@/context/videoSrcContext";
import ProgressCustom from "../constantElements/ProgressCustom";
// import VideoCustom from '../constantElements/VideoCustom'
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ButtonCustom from "../constantElements/ButtonCustom";
import BrandsCarousel from "../constantElements/BrandsCarousel";
import TuneIcon from "@mui/icons-material/Tune";
import Form from "@/components/Form";
import Pagination from "./Pagination";
import CardsCarousel from "@/components/constantElements/CardsCarousel";
import BannerCarousel from "../constantElements/BannerCarousel";
import Filters from "../menu/mobile/Filters";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Description from "@/components/category/Description";
import { FormProvider } from '@/context/FormContext';
import ContentImageBoxDynamic from "@/components/ContentImageBox"
import SubCategory from "@/components/category/SubCategory"

//css
import styles from "@/assets/css/category/MainCategory.module.css";
//css

//components
import Title from "@/components/main/Title";
import Link from "next/link";
// import BreadcrumbCustom from "../constantElements/BreadcrumbCustom";
import { useRouter, useSearchParams } from "next/navigation";
import CardContainer from "../constantElements/CardContainer";


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


const Filter = dynamic(() => import("@/components/constantElements/Filter"), {
  ssr: false,
  loading: () => (
    <div className="w-[150px] h-[45px] sm:col-span-1">
      <Skeleton
        variant="rectangular"
        sx={{ width: "100%" }}
        height={45}
        animation="wave"
      />
    </div>
  ),
});

const Card = dynamic(() => import("@/components/Card"), {
  ssr: false,
  loading: () => (
    <div className="w-auto h-[447.19px] p-2 mb-2">
      <Skeleton
        variant="rounded"
        sx={{ width: "auto" }}
        height={447.19}
        animation="wave"
      />
    </div>
  ),
});

const DescriptionDynamic = dynamic(
  () => import("@/components/category/Description"),
  { ssr: false }
);



const ParagraphDynamic = dynamic(
  () => import("@/components/special-box/Paragraph"),
  { ssr: false }
);

const ProgressDynamic = dynamic(
  () => import("@/components/special-box/Progress"),
  { ssr: false }
);

const VideoBoxDynamic = dynamic(() => import("@/components/VideoBox"), {
  ssr: false,
});

// const ContentImageBoxDynamic = dynamic(
//   () => import("@/components/ContentImageBox"),
//   {
//     ssr: false,
//     loading: () => (
//       <Skeleton
//         animation="wave"
//         variant="rectangular"
//         sx={{ width: "100%", marginBottom: "1rem" }}
//         height={417}
//       />
//     ),
//   }
// );



const Accordions = dynamic(() => import("@/components/Accordions"), {
  ssr: false,
});

const ViewListIconDynamic = dynamic(
  () => import("@mui/icons-material/ViewList"),
  { ssr: false }
);

const ViewModuleIconDynamic = dynamic(
  () => import("@mui/icons-material/ViewModule"),
  { ssr: false }
);

const ToggleButtonIconDynamic = dynamic(
  () => import("@mui/material/ToggleButton"),
  { ssr: false }
);

const ToggleButtonGroup = dynamic(
  () => import("@mui/material/ToggleButtonGroup"),
  {
    ssr: false,
    loading: () => (
      <div className={`w-28 h-12 animate-pulse`}>
        <div className={`w-full h-full bg-gray-100 rounded-lg`}></div>
      </div>
    ),
  }
);

const SideBar = dynamic(() => import("@/components/category/SideBar"), {
  ssr: false,
  loading: () => (
    <div className="col-span-2 xl:block hidden w-full h-screen">
      <Skeleton
        variant="rectangular"
        sx={{ width: "100%" }}
        height={628}
        animation="wave"
      />
    </div>
  ),
});

// const CardsCarousel = dynamic(
//   () => import("@/components/constantElements/CardsCarousel"),
//   {
//     ssr: false,
//     loading: () => (
//       <div className="col-span-2 xl:block hidden w-full h-[542.5px]">
//         <Skeleton
//           variant="rectangular"
//           sx={{ width: "100%" }}
//           height={542.5}
//           animation="wave"
//         />
//       </div>
//     ),
//   }
// );

//components

const Category = ({ apiData = null, pages, scrollTo, currentSlug }) => {





  const miniMobile = useMediaQuery("(max-width:375px)");
  const mobile = useMediaQuery("(max-width:600px)");
  const portraitTablets = useMediaQuery(
    "(min-width:600px)  and (max-width:768px) "
  );
  const landscapeTablets = useMediaQuery(
    "(min-width:768px) and (max-width:992px)"
  );
  const laptops = useMediaQuery("(min-width:992px) and (max-width:1200px)");

  const router = useRouter();
  const searchParams = useSearchParams()
  const [showMore, setShowMore] = useState(false);
  const [list, setList] = useState(false);
  const [firstVideo, setFirstVideo] = useState([]);
  const [view, setView] = useState(`module`);
  const [filters, setFilters] = useState(false);
  const [filterData, setFilterData] = useState(null);
  const [client, setClient] = useState(false)
  const handleChange = (event, nextView) => {
    if (nextView !== null) {
      setList(nextView == "list" ? true : false);
    }
    if (nextView !== null) setView(nextView);

  };


  const data = (data) => {
    if (apiData.products.total == data.data.products.total) {
      setFilterData(null);
    } else {
      setFilterData(data);
    }
  };

  useEffect(() => {
    setList(mobile ? true : false);
    mobile ? setView("list") : setView("module");
  }, [mobile]);
  const { setGetSrc } = useContext(VideoSourceContext);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL_IMAGE;
  const tablet = useMediaQuery("(max-width:1280px)");


  function responsive(purpose) {
    if (purpose == "width") {
      if (miniMobile) {
        return 162;
      } else if (mobile) {
        return 275;
      } else if (portraitTablets) {
        return 259;
      } else if (landscapeTablets) {
        return 196;
      } else if (laptops) {
        return 270;
      } else {
        return 207;
      }
    } else if (purpose == "height") {
      if (miniMobile) {
        return 162;
      } else if (mobile) {
        return 275;
      } else if (portraitTablets) {
        return 259;
      } else if (landscapeTablets) {
        return 196;
      } else if (laptops) {
        return 270;
      } else {
        return 207;
      }
    }
  }


  useEffect(() => {
    setClient(true)
  }, [])

  return (
    <>

      {/* <Title position="head" titleValue={apiData.category.main_name} /> */}

      <section
        className={`grid grid-flow-row grid-cols-9 sm:px-4 px-2 py-4 gap-4 w-full  max-with-unique`}
      >
        {/* Aside Of Category */}
        <SideBar
          sendData={data}
          id={apiData.category.id}
          className="col-span-2 xl:block hidden"
          sideBanner={apiData.category.side_banners}
          filters={apiData.category.filters}
          popularData={apiData.category.popular_sliders}
          scrollTo={scrollTo}
          currentSlug={currentSlug}
        />

        {/* Aside Of Category */}

        {/* Body of Category */}
        <section className="xl:col-span-7 col-span-9">
          {/* Special Box */}
          {apiData.category.special_box_status == 1 ? (
            <>
              {apiData.category.special_box.map((special, index) => {
                switch (special.content_type) {

                  case "paragraph":
                    return (
                      <Fragment key={special.id}>
                        <section
                          className={`paragraph grid grid-cols-2 grid-flow-row-dense gap-4 mb-8`}
                        >
                          {special.items.map((paragraph) => {
                            return (
                              <Fragment key={paragraph.id}>
                                <ParagraphDynamic
                                  className="last:odd:col-span-2 sm:col-span-1 col-span-2"
                                  paragraphTitle={paragraph.title}
                                  paragraphDescription={paragraph.description}
                                  data={paragraph}
                                  link={paragraph.link}
                                />
                              </Fragment>
                            );
                          })}
                        </section>
                      </Fragment>
                    );

                  case "faq":
                    return (
                      <Fragment key={special.id}>
                        <Accordions type="FAQ" faqData={special.items} />
                      </Fragment>
                    );

                  case "video":
                    return (
                      <Fragment key={special.id}>
                        {special.items.length == 1 ? (
                          <>
                            <VideoCustom
                              data={special.items}
                              title={special.title}
                            />
                          </>
                        ) : (
                          <VideoBoxDynamic
                            position="Vertical"
                            videoData={special.items}
                          />
                        )}
                      </Fragment>
                    );

                  case "post":
                    return (
                      <Fragment key={special.id}>
                        <CardsCarousel
                          type="post"
                          title={[special.title]}
                          data={special.items}
                          navigation={false}
                          backgroundColor=""
                        />
                      </Fragment>
                    );

                  case "first_content":
                    return (
                      <Fragment key={special.id}>
                        <ContentImageBoxDynamic
                          type={"firstArticle"}
                          title={special.title}
                          firstContentData={special.items}
                        />
                      </Fragment>
                    );

                  case "second_content":
                    return (
                      <Fragment key={special.id}>
                        <ContentImageBoxDynamic
                          type={"secondArticle"}
                          data={special.items}
                          title={special.title}
                        />
                      </Fragment>
                    );

                  case "third_content":
                    return (
                      <Fragment key={special.id}>
                        <ContentImageBoxDynamic
                          data={special.items}
                          title={special.title}
                          type="contentImageV3"
                        />
                      </Fragment>
                    );

                  case "accordion":
                    return (
                      <Fragment key={special.id}>
                        <Accordions type="photoContent" data={special.items} />
                      </Fragment>
                    );

                  case "progress":
                    return (
                      <Fragment key={special.id}>
                        <ProgressCustom
                          type={special.type}
                          data={special.items}
                        />
                      </Fragment>
                    );

                  case "image_slider":
                    return (
                      <Fragment key={special.id}>
                        {client ?
                        <BannerCarousel data={special.items} autoplayDelay={3500} />
                        :
                        <div className={styles.bannerSkeleton}>
                                  <Skeleton
                                    variant="rectangular"
                                    animation="wave"
                                    sx={{
                                      width: "100%",
                                      height: "100%",
                                      borderRadius: "8px",
                                    }}
                                  />
                                </div>
                      }
                      </Fragment>
                    );

                  case "brand":
                    return (
                      <Fragment key={special.id}>
                        <BrandsCarousel
                          type="grid"
                          data={special.items}
                          slidesPerView={7}
                          title={special.title}
                          spaceBetween={15}
                        />
                      </Fragment>
                    );

                  case "custom_brand":
                    return (
                      <Fragment key={special.id}>
                        <BrandsCarousel
                          type="grid"
                          data={special.items}
                          slidesPerView={7}
                          title={special.title}
                          spaceBetween={15}
                          size="original"
                        />
                      </Fragment>
                    );

                  case "product":
                    return (
                      <Fragment key={special.id}>
                        <CardsCarousel
                          position={index}
                          type="special_box"
                          title={special.title}
                          data={special.items}
                          spaceBetween={1}
                          cover={special.cover}
                          width={
                            miniMobile ?
                              163
                              :
                              mobile ?
                                189
                                :
                                portraitTablets ?
                                  231
                                  :
                                  landscapeTablets ?
                                    196
                                    :
                                    laptops ?
                                      224
                                      :
                                      198
                          }
                          height={
                            miniMobile ?
                              163
                              :
                              mobile ?
                                189
                                :
                                portraitTablets ?
                                  231
                                  :
                                  landscapeTablets ?
                                    196
                                    :
                                    laptops ?
                                      224
                                      :
                                      198
                          }
                        />
                      </Fragment>
                    );
                  default:
                    break;
                }
              })}
              {/* end-special-box */}
            </>
          ) : (
            <>
              {apiData.category.product_slider_status == 1 &&
                apiData.category.product_sliders.length >= 1 && (
                  <CardsCarousel
                    // type='post'
                    title={[`منتخب محصولات ${apiData.category.identity_name}`]}
                    data={apiData.category.product_sliders}
                    navigation={false}
                    slidesPerView={4}
                    spaceBetween={10}
                  />
                )}

              {apiData.category.slider_status == 1 &&
                apiData.category.image_sliders.length >= 1 && (
                  <BannerCarousel data={apiData.category.image_sliders} autoplayDelay={3500} />
                )}
              {apiData.category.active_children.length > 0 ? (
                !mobile ? (
                  apiData.category.type == 1 ? (
                    <section className="mb-16">
                      <div
                        className={`grid sm:grid-cols-5 grid-cols-2 gap-4 grid-flow-row-dense`}
                      >
                        {apiData.category.active_children
                          .slice(
                            0,
                            showMore
                              ? apiData.category.active_children.length
                              : 10
                          )
                          .map((subCategory) => {
                            return (
                              <Fragment key={subCategory.id}>
                                {client ?
                                <SubCategory
                                  slug={subCategory.slug}
                                  image={subCategory && subCategory}
                                  name={subCategory.identity_name}
                                  alt={subCategory.image_alt}
                                />
                              :
                              <div className={styles.categorySkeleton}>
                              <Skeleton
                                variant="rectangular"
                                animation="wave"
                                sx={{
                                  width: "100%",
                                  height: "100%",
                                  borderRadius: "8px",
                                }}
                              />
                            </div>


                              }
                              </Fragment>
                            );
                          })}
                      </div>
                      {apiData.category.active_children.length > 10
                        &&
                        <ButtonCustom
                          text={showMore ? "مشاهده کمتر" : "مشاهده بیشتر"}
                          justifyContent="center"
                          onClick={() => setShowMore(!showMore)}
                          className="mt-4"
                        />
                      }
                    </section>
                  ) : (
                    <section
                      className={`grid sm:grid-cols-5 grid-cols-2 gap-4 grid-flow-row-dense mb-16`}
                    >
                      {apiData &&
                        apiData.category.active_children.map((subCategory) => {
                          return (
                            <Fragment key={subCategory.id}>
                              {client ?
                                <SubCategory
                                  slug={subCategory.slug}
                                  image={subCategory && subCategory}
                                  name={subCategory.identity_name}
                                  alt={subCategory.image_alt}
                                />

                                :

                                <div className={styles.categorySkeleton}>
                                  <Skeleton
                                    variant="rectangular"
                                    animation="wave"
                                    sx={{
                                      width: "100%",
                                      height: "100%",
                                      borderRadius: "8px",
                                    }}
                                  />
                                </div>


                              }
                             
                            </Fragment>
                          );
                        })}
                    </section>
                  )
                ) : apiData.category.type == 1 ? (
                  <section
                    className={`bg-[#6B6B6B] mb-16 flex justify-center items-center flex-col`}
                  >
                    <div className="p-4 flex items-center justify-center gap-2">
                      <ReceiptLongIcon
                        fontSize="medium"
                        sx={{ color: "#fff" }}
                      />
                      <div className="text-white">
                        لیست قیمت آیفون های تصویری
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 p-2">
                      {apiData.category.active_children
                        .slice(
                          0,
                          showMore ? apiData.category.active_children.length : 6
                        )
                        .map((subCategory) => (
                          <Link
                            className="bg-white flex justify-center items-center p-2 rounded-lg"
                            href={`/${subCategory.slug}`}
                            key={subCategory.id}
                            title={subCategory.image_alt}
                          >
                            <div>{subCategory.identity_name}</div>
                          </Link>
                        ))}
                    </div>

                    <IconButton
                      sx={{ position: "relative", top: "25px" }}
                      onClick={() => setShowMore(!showMore)}
                    >
                      <div
                        className="w-14 h-14 bg-white rounded-full flex items-center justify-center"
                        style={{ boxShadow: "0px 2px 0.3px 0px #00000040" }}
                      >
                        {showMore ? (
                          <ExpandLessIcon fontSize="large" />
                        ) : (
                          <ExpandMoreIcon fontSize="large" />
                        )}
                      </div>
                    </IconButton>
                  </section>
                ) : apiData.category.active_children.length == 4 ? (
                  <section
                    className={`grid sm:grid-cols-5 grid-cols-2 gap-4 mb-16`}
                  >
                    {apiData &&
                      apiData.category.active_children.map((subCategory) => {
                        return (
                          <Fragment key={subCategory.id}>
                            {client ?
                            
                            <SubCategory
                              border={false}
                              slug={subCategory.slug}
                              image={subCategory && subCategory}
                              name={subCategory.identity_name}
                              alt={subCategory.image_alt}
                            /> 
                            : 
                            <div className={styles.categorySkeleton}>
                            <Skeleton
                              variant="rectangular"
                              animation="wave"
                              sx={{
                                width: "100%",
                                height: "100%",
                                borderRadius: "8px",
                              }}
                            />
                          </div>

                          
                          }
                          </Fragment>
                        );
                      })}
                  </section>
                ) : (
                  <section className={`grid grid-cols-3 gap-2  mb-16`}>
                    {apiData &&
                      apiData.category.active_children.map((subCategory) => {
                        return (
                          <Fragment key={subCategory.id}>
                            <SubCategory
                              border={false}
                              slug={subCategory.slug}
                              image={subCategory && subCategory}
                              name={subCategory.identity_name}
                              alt={subCategory.image_alt}
                            />
                          </Fragment>
                        );
                      })}
                  </section>
                )
              ) : null}

              {apiData.category.summary && (
                <DescriptionDynamic
                  type="summary"
                  summary={apiData.category.summary}
                />
              )}
            </>
          )}
          {/* Special Box */}

          {/* Cards */}


          <CardContainer
            apiData={apiData}
            pages={pages}
            scrollTo={scrollTo}
            currentSlug={currentSlug}
          />
          {/* Cards */}

          {/* Descriptions */}
          {apiData.category.content_box_status == 0 ? (
            apiData.category.body ? (
              <Fragment key={apiData.category.id}>
                <Description
                  type="default"
                  body={apiData.category.body}
                  className="my-12 last:mb-0"
                />
              </Fragment>
            ) : null
          ) : (
            apiData.category.descriptions.length > 0 && (
              <Description
                type="customized"
                descriptions={apiData.category.descriptions}
                className="my-12 last:mb-0"
              />
            )
          )}
          {/* Descriptions */}
        </section>
        {/* Body of Category */}
      </section>
      {apiData.category.id == 20
        &&
        <FormProvider>
          <Form id={apiData.category.id} />
        </FormProvider>
      }
    </>
  );
};

export default Category;
