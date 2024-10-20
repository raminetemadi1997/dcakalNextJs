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
import Forms from "@/components/Forms";
import Pagination from "./Pagination";
// import CardsCarousel from "@/constantElements/CardsCarousel";
import BannerCarousel from "../constantElements/BannerCarousel";
import Filters from "../menu/mobile/Filters";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Form from "../Form";
import Description from "@/components/category/Description";
//css
import styles from "@/assets/css/category/MainCategory.module.css";
//css
//components
import Title from "@/components/main/Title";
import Link from "next/link";
// import BreadcrumbCustom from "../constantElements/BreadcrumbCustom";
import { useRouter, useSearchParams } from "next/navigation";

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

const SubCategoryDynamic = dynamic(
  () => import("@/components/category/SubCategory"),
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

const ContentImageBoxDynamic = dynamic(
  () => import("@/components/ContentImageBox"),
  {
    ssr: false,
    loading: () => (
      <Skeleton
        animation="wave"
        variant="rectangular"
        sx={{ width: "100%", marginBottom: "1rem" }}
        height={417}
      />
    ),
  }
);



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

const CardsCarousel = dynamic(
  () => import("@/components/constantElements/CardsCarousel"),
  {
    ssr: false,
    loading: () => (
      <div className="col-span-2 xl:block hidden w-full h-[542.5px]">
        <Skeleton
          variant="rectangular"
          sx={{ width: "100%" }}
          height={542.5}
          animation="wave"
        />
      </div>
    ),
  }
);

//components
const Category = ({ apiData = null, pages, scrollTo , currentSlug }) => {

  const router = useRouter();
  const searchParams = useSearchParams()
  const [showMore, setShowMore] = useState(false);
  const [list, setList] = useState(false);
  const [firstVideo, setFirstVideo] = useState([]);
  const [view, setView] = useState(`module`);
  const mobile = useMediaQuery("(max-width : 540px)");
  const [filters, setFilters] = useState(false);
  const [filterData, setFilterData] = useState(null);
  const handleChange = (event, nextView) => {
    if (nextView !== null) setView(nextView);
    setList(nextView == "list" ? true : false);
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

  return (
    <>

      <Title position="head" titleValue={apiData.category.main_name} />

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
              {apiData.category.special_box.map((special) => {
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
                        <BannerCarousel data={special.items} />
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
                          type="special_box"
                          title={special.title}
                          data={special.items}
                          spaceBetween={1}
                          cover={special.cover}
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
                  <BannerCarousel data={apiData.category.image_sliders} />
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
                                <SubCategoryDynamic
                                  slug={subCategory.slug}
                                  image={subCategory && subCategory}
                                  name={subCategory.identity_name}
                                  alt={subCategory.image_alt}
                                />
                              </Fragment>
                            );
                          })}
                      </div>
                      <ButtonCustom
                        text={showMore ? "مشاهده کمتر" : "مشاهده بیشتر"}
                        justifyContent="center"
                        onClick={() => setShowMore(!showMore)}
                        className="mt-4"
                      />
                    </section>
                  ) : (
                    <section
                      className={`grid sm:grid-cols-5 grid-cols-2 gap-4 grid-flow-row-dense mb-16`}
                    >
                      {apiData &&
                        apiData.category.active_children.map((subCategory) => {
                          return (
                            <Fragment key={subCategory.id}>
                              <SubCategoryDynamic
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
                            <SubCategoryDynamic
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
                ) : (
                  <section className={`grid grid-cols-3 gap-2  mb-16`}>
                    {apiData &&
                      apiData.category.active_children.map((subCategory) => {
                        return (
                          <Fragment key={subCategory.id}>
                            <SubCategoryDynamic
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
          <section id="products">
            {/* filters */}
            <div
              className={`filters flex sm:flex-row flex-row-reverse sm:justify-start justify-between mb-5`}
            >
              {
                !mobile
                ?
                <Filter
                  type="product"
                  id={apiData.category.id}
                  // urlValue={urlValue.length > 0 && urlValue}
                  scrollTo={scrollTo}
                />
                :
                // <Filters
                  
                //   type="product"
                //   id={apiData.category.id}
                //   // urlValue={urlValue.length > 0 && urlValue}
                //   scrollTo={scrollTo}
                // />
                <></>
              }
              {apiData.category.type == 0 && (
                <ToggleButtonGroup
                  orientation="horizontal"
                  value={view}
                  exclusive
                  onChange={handleChange}

                >
                  <ToggleButtonIconDynamic
                    size="small"
                    value="module"
                    aria-label="module"
                  >
                    <ViewModuleIconDynamic />
                  </ToggleButtonIconDynamic>
                  <ToggleButtonIconDynamic
                    size="small"
                    value="list"
                    aria-label="list"
                  >
                    <ViewListIconDynamic />
                  </ToggleButtonIconDynamic>
                </ToggleButtonGroup>
              )}
              {tablet && (
                <>
                  {/* <div className="flex items-center gap-2 border rounded-lg px-2" onClick={() => setFilters(true)}>
                                        <IconButton>
                                            <TuneIcon />
                                        </IconButton>
                                        <div className="text-sm">فیلترها</div>
                                    </div> */}
                  <Filters
                    openMenu={filters}
                    onClose={() => setFilters(false)}
                    data={apiData.category.filters}
                    id={apiData.category.id}
                    // sendData={data}
                    // urlValue={urlValue}
                    scrollTo={scrollTo}
                  />
                </>
              )}
            </div>
            {/* filters */}
            <div
              className={`card-container grid ${mobile ? "gap-0" : "gap-0"} ${apiData.category.type == 1
                ? "grid-cols-1"
                : view === "module"
                  ? "xl:grid-cols-4 sm:grid-cols-3 grid-cols-2"
                  : "grid-cols-1"
                } w-full h-fit mb-16`}
            >
              {apiData.category.parent_id == null ? (
                apiData.products ? (
                  apiData.products.data.length >= 1 ? (
                    apiData.products.data.map((product) => {
                      
                      
                      return product &&(
                        <Fragment key={product.id}>
                          <Card data={product} list={list} />

                          {product.structure_status == 1 && (
                            <script
                              type="application/ld+json"
                              dangerouslySetInnerHTML={{
                                __html: JSON.stringify(
                                  product.data_structure
                                ),
                              }}
                            />
                          )}
                        </Fragment>
                      );
                    })

                  ) : (
                    <p>محصولی برای نمایش موجود نیست</p>
                  )
                ) : (
                  <p>محصولی برای نمایش موجود نیست</p>
                )
              ) : apiData.products ? (
                apiData.products.data.length >= 1 &&
                apiData.products.data.map((product) => {
                  let discountUnic = null;
                  {
                    product.discount
                      ? (discountUnic = product.discount)
                      : product.category_discount
                        ? (discountUnic = product.category_discount)
                        : null;
                  }
                  let date = new Date();
                  return product && (
                    <Fragment key={product.id}>
                      {apiData.category.type == 1 ? (
                        <Card data={product} priceList={true} />
                      ) : (
                        <Card data={product} list={list} />
                      )}
                      {product.structure_status == 1 && (
                        <script
                          type="application/ld+json"
                          dangerouslySetInnerHTML={{
                            __html: JSON.stringify(product.data_structure),
                          }}
                        />
                      )}
                    </Fragment>
                  );
                })
              ) : (
                <p>محصولی برای نمایش موجود نیست</p>
              )}
            </div>
            {
              apiData.products && apiData.products.last_page != 1 ? (
                apiData.category.scroll_mode == 0 ? (
                  <Pagination
                    pagel = {scrollTo}
                    currentPage={pages}
                    pages={apiData.products.last_page}
                    links={apiData.products.links}
                    slug={apiData.category.slug}
                  />
                ) : apiData.category.scroll_mode == 1 ? (
                  <ButtonCustom justifyContent="center" text="مشاهده بیشتر" />
                ) : apiData.category.scroll_mode == 2 ? (
                  <h5>load more</h5>
                ) : null

              ) : null
            }
          </section>
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
    </>
  );
};

export default Category;
