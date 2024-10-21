import React, { useRef, Fragment } from "react";
import styled from "@emotion/styled";
import styles from "../../assets/css/category/MainCategory.module.css";
import { usePathname } from "next/navigation";
//context
import CardsCarousel from "../constantElements/CardsCarousel";
import BannerCarousel from "../constantElements/BannerCarousel";

const Description = ({ type, summary, body, descriptions , className }) => {
  const descriptionScroll = useRef();
  const CkSection = styled("section")({
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    padding: "1rem 1rem 1rem 1.5rem",
    "& tr": {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      placeItems: "center",
      gap: "1rem",
    },
    "& tr img , & p img": {
      width: "100% !important",
      height: "auto !important",
    },
    "& tr td , & p  ": {
      textAlign: "justify",
      lineHeight: "1.75rem",
      display:'flex',
      flexDirection:'column',
      gap:'1rem'
    },
    "@media (max-width: 540px)": {
      "& tr td , & p  ": {
        gap:'1rem'
      },
    },
  });

  const passName = usePathname();
  return (
    <>
      {passName === "/product" ? (
        <div className="flex justify-between items-center mb-8 border-b">
          <p className="font-bold mb-2">بررسی محصول</p>
        </div>
      ) : null}
      {type === "default" ? (
        <>
          <CkSection
            ref={descriptionScroll}
            dangerouslySetInnerHTML={{ __html: body }}
            className={`ckeditor-list category-list w-full h-auto rounded-2xl ${className} ${styles.category_list}`}
          />
        </>
      ) : type == "summary" ? (
        <>
          <CkSection
            ref={descriptionScroll}
            dangerouslySetInnerHTML={{ __html: summary }}
            className={`category-list w-full h-auto rounded-2xl mb-16 mt-4 ${styles.category_list}`}
          />
        </>
      ) : type === "customized" ? (
        <section
          className={`ckeditor-list-customize w-full h-auto rounded-2xl ${className} ${styles.category_list}`}
        >
          <div className="sm:px-8 px-5 sm:py-4 py-2 w-full">
            {descriptions.map((item, id) => (
              <Fragment key={id}>
                <div>
                  <div
                    key={item.id}
                    ref={descriptionScroll}
                    dangerouslySetInnerHTML={{ __html: item.description }}
                    className="ckeditor-customize"
                  />
                </div>
                {item.type == "2" ? (
                  item.image.length >= 1 && (
                    <BannerCarousel data={item.image} />
                  )
                ) : item.type == "3" ? (
                  item.product.length >= 1 && (
                    <CardsCarousel
                      type="special_box"
                      title={null}
                      data={item.product}
                      cover={item.cover}
                    />
                  )
                ) : item.type == "4" ? (
                  <>
                    {item.image.length >= 1 && (
                      <BannerCarousel data={item.image} />
                    )}
                    {item.product.length >= 1 && (
                      <CardsCarousel
                        type="special_box"
                        title={null}
                        data={item.product}
                        cover={item.cover}
                      />
                    )}
                  </>
                ) : item.type == "5" ? (
                  <>
                    {item.product.length >= 1 && (
                      <CardsCarousel
                        type="special_box"
                        title={null}
                        data={item.product}
                        cover={{
                          desktopCover: null,
                          desktopCoverAlt: null,
                          mobileCover: null,
                          mobileCoverAlt: null,
                        }}
                      />
                    )}
                    {item.image.length >= 1 && (
                      <BannerCarousel data={item.image} />
                    )}
                  </>
                ) : null}
              </Fragment>
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
};

export default Description;
