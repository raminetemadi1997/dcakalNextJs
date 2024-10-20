import React from "react";
import SwiperCarousel from "../SwiperCarousel";
import Title from "@/components/main/Title";
import ButtonCustom from "@/components/constantElements/ButtonCustom";

const CardContainer = ({
  type,
  choose,
  className,
  productSliderItems,
  postData,
  title,
  productNormalSliders,
  productGroupSliders,
  backgroundColor,
  sliderProductGroupSliders,
  slug,
  titleValue,
  col
}) => {

  return (
    <section style={{maxWidth:'1358px' , margin:'auto'}} className="relative w-full sm:px-4 px-2">
      
      {type === "productSliderV2" || type === "productSlider" ? (
        <>
          <div
            className={`w-10 h-10 rounded-full absolute ${
              type === "productSliderV2"
                ? `-top-[7%] bg-[var(--theme-color-green)]`
                : `-top-[12%] bg-[#D0D0D0]`
            } sm:right-[15%] right-[5%]`}
          ></div>
          <div
            className={`w-10 h-10 rounded-full absolute ${
              type === "productSliderV2"
                ? `-top-[7%] bg-[var(--theme-color-green)]`
                : `-top-[12%] bg-[#D0D0D0]`
            } sm:left-[15%] left-[5%]`}
          ></div>
        </>
      ) : null}

{type == "newProducts" ||
        type == `observations` ||
        type == `bestSellers` ||
        type === `specialNews` ||
        type === "productSlider" ||
        type === "productSliderV2" ||
        type === "description" ||
        type === "summaryDescription" ? null : (
          <ButtonCustom text='مشاهده همه' variant='text' justifyContent='end' link={slug} titleTag= {titleValue}/>
        )}

      <div
      style={{backgroundColor:backgroundColor &&`#${backgroundColor}`}}
        className={`w-full ${className} ${
          type == "observations"
            ? "bg-none h-auto"
            : type === "newProducts"
            ? `bg-[#007C70] h-auto mt-24`
            : type === `bestSellers`
            ? `justify-start pt-8 pb-8 `
            : type === "specialNews"
            ? "bg-[#009688] h-[377px] rounded-xl"
            : type === "productSlider"
            ? `bg-[var(--theme-color-green)] h-[223px] sm:rounded-t-2xl rounded-t-lg`
            : type === "productSliderV2"
            ? `justify-end h-[366px] bg-white sm:rounded-2xl rounded-lg border-2 border-[var(--theme-color-green)]`
            : type === "description"
            ? `bg-gradient-to-b from-[#0096888C] to-white h-auto rounded-2xl pb-4`
            : type === "summaryDescription"
            ? "bg-[#FFC794] sm:h-[460px] h-96"
            : `sm:h-auto h-auto pt-0 pb-4 justify-end bg-gradient-to-r bg-[#${backgroundColor}]`
        } relative w-full flex flex-col sm:px-4 px-2 items-center z-20`}
      >

        
        
        {type === "productSlider" ||
        type === "productSliderV2" ||
        type === "description" ? (
          <div
            className={`sm:w-2/3 w-4/5 bg-white rounded-b-[60px] ${
              type === `productSliderV2`
                ? `border border-[var(--theme-color-green)]`
                : `border`
            } absolute ${
              type === "description"
                ? "top-0 h-11 border-none"
                : "-top-7 h-20 border"
            } -top-7 flex justify-center`}
          >
            <p
              className={` w-[98%] h-[94%] rounded-b-[55px] border-b-2 border-r-2 border-l-2 border-[var(--theme-color-green)] flex justify-center items-center ${
                type === "description" ? "border-none" : " border-dashed"
              } font-bold`}
            >
              {title}
            </p>
          </div>
        ) : null}

        <div
          className={`${
            type == `bestSellers`
              ? `static`
              : type === "specialNews"
              ? `relative`
              : type === "productSlider"
              ? `top-1/3 relative`
              : type === "productSliderV2" ||
                type === "description" ||
                type === "observations"
              ? `static `
              : `relative ${
                  type === "summaryDescription" ? "-bottom-20" : ""
                } `
          } ${
            type === "description" ? "w-full mt-16" : "w-full mt-0"
          } max-with-unique`}
        >
          {type == `bestSellers` ? (
           
            <Title titleValue={title} color={backgroundColor && `#${backgroundColor}`}/>
          ) : null}
          {type === "newProducts" ? (
            <SwiperCarousel
              type="newProducts"
              choose={choose}
              sliderProductGroupSliders={sliderProductGroupSliders}
            />
          ) : type === "bestSellers" ? (
            <SwiperCarousel
              type="bestSellers"
              choose={choose}
              productGroupSliders={productGroupSliders}
            />
          ) : type === "productSlider" ? (
            <SwiperCarousel
              type="productSlider"
              productSliderItems={productSliderItems}
            />
          ) : (
            <SwiperCarousel
              type="cardContainer"
              productNormalSliders={productNormalSliders}
              col={col}
            />
          )}
        </div>
        
      </div>
    </section>
  );
};

export default CardContainer;
