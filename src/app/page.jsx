'use server'
import { getHomeData } from "@/data/loaders";
import Layout from "@/components/Layout";
import MainSlider from "../components/main/MainSlider";
import dynamic from "next/dynamic";
import styles from "../assets/css/main/Main.module.css";
import SpecialCategory from "../components/main/SpecialCategory";
import Title from "@/components/main/Title";
import Discount from "@/components/main/Discount";
import BrandsCarousel from "@/components/constantElements/BrandsCarousel";
import CardsCarousel from "@/components/constantElements/CardsCarousel";
import BannerCustom from "@/components/constantElements/BannerCustom";
import Skeleton from "@mui/material/Skeleton";
import SelectedCategories from "@/components/SelectedCategories";
import AboutUs from "@/components/constantElements/AboutUs";

import { cookies } from 'next/headers'



const CardContainerDynamic = dynamic(
  () => import("../components/main/CardContainer"),
  { ssr: false }
);

const BannerCarousel = dynamic(
  () => import("@/components/constantElements/BannerCarousel"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full mb-12 mt-2 sm:h-[330px] h-[187px]">
        <Skeleton
          variant="rectangular"
          sx={{ width: "100%" }}
          className="sm:h-[330px] h-[187px]"
          animation="wave"
        />
      </div>
    ),
  }
);




let date = new Date();
export default async function Home() {
  const home = await getHomeData();

  return (
    <Layout>
      <main className={`${styles.container}`}>
        {home.data.controlls.map((homeData, i) => {
          switch (homeData.content_type) {
            case "partBanner":
              return (
                <MainSlider
                  key={i}
                  imageSlider={homeData.part_banner_item}
                  partItems={homeData.part_banner}
                />
              );
            case "fullWidthBanner":
              return (
                homeData && (
                  <BannerCarousel
                    key={i}
                    data={homeData.full_width_banner}
                    navigation={true}
                    className="mb-12 mt-2"
                    borderRadius="0"
                  />
                )
              );
            case "simpleBanner":

              return (
                homeData.banners && (
                  <section
                    key={i}
                    className="grid grid-cols-2 sm:gap-4 gap-2 grid-rows-[repeat(2, minmax(0, max-content))] mb-16 max-with-unique mx-auto sm:px-4 px-2"
                  >
                    {homeData.banners.map((banner, index) => (
                      <BannerCustom
                        key={banner.id}
                        data={banner}
                        className="last:odd:col-span-2"
                        status={
                          homeData.banners.length == 1
                            ? "odd"
                            : homeData.banners.length % 2 == 0
                            ? "even"
                            : index == homeData.banners.length - 1
                            ? "odd"
                            : "even"
                        }
                      />
                    ))}
                  </section>
                )
              );
            case "simpleCategory":
              return (
                <SelectedCategories
                  key={i}
                  type="topPage"
                  simpleCategory={homeData.simple_category}
                />
              );
            case "fantasticCategory":
              return (
                homeData.fantastic_category && (
                  <SelectedCategories
                    key={i}
                    type={"middlePage"}
                    simpleCategory={homeData.fantastic_category}
                  />
                )
              );
            case "amazingSellBox":
              
              return date < new Date(homeData.discount_sliders[0].end_date) ? (
                <Discount
                  key={i}
                  productDiscountSlider={homeData.discount_sliders}
                />
              ) : null;
            case "simpleProduct":
              return (
                homeData.product_normal_sliders && (
                  <section className={`h-auto mb-16`} key={i}>
                    <Title titleValue={homeData.name} />
                    <CardContainerDynamic
                      type="observations"
                      productNormalSliders={homeData.product_normal_sliders}
                    />
                  </section>
                )
              );
            case "specialProduct":
              return (
                homeData.special_product_content && (
                  <section key={i} className="mb-16">
                    <CardContainerDynamic
                      type="bestSellers"
                      title={homeData.name}
                      backgroundColor={homeData.background_color}
                      productGroupSliders={homeData.special_product_content}
                    />
                  </section>
                )
              );

            case "groupProduct":
              return (
                <CardsCarousel
                  key={i}
                  data={homeData.group_product}
                  slidesPerView={5}
                  className="mb-4"
                  type="group_slider"
                />
              );

            case "brandProductContent":
              return (
                homeData.brand_Product_content && (
                  <section
                    key={i}
                    className="h-fit flex flex-col items-center mb-4"
                  >
                    <Title titleValue={homeData.name} />
                    <CardContainerDynamic
                      backgroundColor={homeData.background_color}
                      productNormalSliders={
                        homeData.brand_Product_content.products
                      }
                      slug={homeData.link}
                      titleValue={homeData.name}
                    />
                    <BrandsCarousel
                      slidesPerView={5}
                      data={homeData.brand_Product_content.brands}
                    />
                  </section>
                )
              );

            case "accordContent":
              return (
                homeData.accord_content && (
                  <SpecialCategory
                    key={i}
                    title={homeData.name}
                    contentBox={homeData.accord_content}
                  />
                )
              );
            default:
              break;
          }
        })}

        {/* <QuickAccessDynamic /> */}
        {/* <MainSlider /> */}

        {/* new products */}
        {/* {home.data.new_products.length > 0 ? (
          <CardsCarousel
            data={home.data.new_products}
            slidesPerView={5}
            spaceBetween={5}
            className="mb-4"
            title={["محصولات جدید"]}
            backgroundColor="#fff"
            link="مشاهده بیشتر"
            slug="/new-products"
          />
        ) : null} */}
        {/* new products */}

        {/* <BlogDynamic /> */}

        <AboutUs />

      </main>
    </Layout>
  );
}







 