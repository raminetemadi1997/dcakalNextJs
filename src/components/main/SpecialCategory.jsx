"use client"
import React, { Fragment } from "react";
import Link from "next/link";
import useMediaQuery from "@mui/material/useMediaQuery";
//css
import styles from "../../assets/css/main/SpecialCategory.module.css";
//components
import Title from "@/components/main/Title";
import ImageCustom from "../constantElements/ImageCustom";

const SpecialCategory = ({ contentBox, title }) => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL_IMAGE;


  const miniMobile = useMediaQuery("(max-width:375px)")
  const mobile = useMediaQuery("(max-width:600px)");
  const portraitTablets = useMediaQuery("(min-width:600px)  and (max-width:768px) ");
  const landscapeTablets = useMediaQuery("(min-width:768px) and (max-width:992px)");
  const laptops = useMediaQuery("(min-width:992px) and (max-width:1200px)");


  function response(porpose) {

      if (porpose == "width") {
          if (miniMobile) {
              return 151
          } else if (mobile) {
              return 264
          } else if (portraitTablets) {
              return 265
          } else if (landscapeTablets) {
              return 300
          } else if (laptops) {
              return 300
          } else {
              return 300
          }
      }

      else if (porpose == "height") {
          if (miniMobile) {
              return 61
          } else if (mobile) {
              return 158
          } else if (portraitTablets) {
              return 159
          } else if (landscapeTablets) {
              return 180
          } else if (laptops) {
              return 180
          } else {
              return 180
          }
      }

  }

  function responseTopPictures(porpose) {

      if (porpose == "width") {
          if (miniMobile) {
              return 151
          } else if (mobile) {
              return 264
          } else if (portraitTablets) {
              return 265
          } else if (landscapeTablets) {
              return 300
          } else if (laptops) {
              return 336
          } else {
              return 336
          }
      }

      else if (porpose == "height") {
          if (miniMobile) {
              return 61
          } else if (mobile) {
              return 158
          } else if (portraitTablets) {
              return 159
          } else if (landscapeTablets) {
              return 180
          } else if (laptops) {
              return 272
          } else {
              return 272
          }
      }

  }



  return (
    <div className={`w-full h-fit mb-4 flex flex-col items-center `}>
      <Title titleValue={title} />
      <div
        className={`flex flex-col w-full items-center relative sm:h-[885px] h-[485px]`}
        style={{
          backgroundImage: `url(${backendUrl}${contentBox.background_image.webp})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      >
        <div className={`w-full h-fit sm:flex hidden justify-between`}>
          <ImageCustom
            data={contentBox.right_image}
            alt={contentBox.right_image_alt}
            title={contentBox.right_image_alt}
            loading={"lazy"}
            width={responseTopPictures("width")}
            height={responseTopPictures("height")}
            size="original"
          />
          <ImageCustom
            data={contentBox.left_image}
            alt={contentBox.left_image_alt}
            title={contentBox.left_image_alt}
            loading={"lazy"}
            width={responseTopPictures("width")}
            height={responseTopPictures("height")}
            size="original"
            
          />
        </div>
        <div
          style={{ backgroundColor: `#${contentBox.background_color}` }}
          className={`layer w-full h-60 flex justify-center items-center lg:mt-0 mt-28`}
        >
          <div
            className={`grid grid-cols-2 grid-rows-2 sm:gap-4 gap-2 ${styles.card_origin} sm:p-0 p-2`}
          >
            {contentBox &&
              contentBox.items.map((content) => {
                return (
                  <Fragment key={content.id}>
                    <Link
                      href={content.link ? content.link : "#"}
                      className={`bg-white rounded-lg p-3 ${styles.cards} group sm:hover:scale-110 ease-in duration-100`}
                    >
                      <ImageCustom
                        data={content.image}
                        alt={content.image_alt}
                        title={content.image_alt}
                        loading={"lazy"}
                        width={response("width")}
                        height={response("height")}
                        size="original"
                      />
                      <p
                        className={`text-center mt-3 sm:text-sm text-xs sm:group-hover:text-theme ease-in duration-100`}
                      >
                        {content.title}
                      </p>
                    </Link>
                  </Fragment>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialCategory;
