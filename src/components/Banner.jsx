import React from "react";
import Link from "next/link";
import Image from "next/image";
import bannerUp from "../../public/images/Banners/bannerUp.jpg";
import bannerDown from "../../public/images/Banners/bannerDown.jpg";
import singleBanner from "../../public/images/Banners/singleBanner.png";
import bannerRight from "../../public/images/Banners/bannerRight.jpg";
import bannerLeft from "../../public/images/Banners/bannerLeft.jpg";
import useMediaQuery from "@mui/material/useMediaQuery";
import ImageCustom from "./constantElements/ImageCustom";

const Banner = ({ type, className, src }) => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL_IMAGE;
  const mobile = useMediaQuery("(max-width:540px)");
  return (
    <div
      className={`w-full ${className} ${
        type === "singleBanner" ? "h-auto min-h-0" : `sm:h-full`
      }  mb-0 min-h-0`}
    >
      {type === "mainSliderBannerUp" ? (
        <Link href={`/`} className={`h-full w-full inline-block`}>
          <Image
            className="rounded-lg object-cover"
            src={bannerUp}
            alt="upBanner"
            style={{ width: "100%", height: "100%" }}
          />
        </Link>
      ) : null}
      {type === "mainSliderBannerDown" ? (
        <Link href={`/`} className={`h-full w-full inline-block`}>
          <Image
            className="rounded-lg object-cover"
            src={bannerDown}
            alt="downBanner"
            style={{ width: "100%", height: "100%" }}
          />
        </Link>
      ) : null}
      {type === "singleBanner" ? (
        <Link
          href={`/`}
          className={`h-full w-full inline-block max-with-unique`}
        >
          <picture>
            <Image src={src} width={1360} height={240} alt="singleBanner" />
          </picture>
        </Link>
      ) : null}
      {type === "rightBanner" ? (
        <Link href={`/`} className={`h-full w-full inline-block`}>
          <Image
            className="rounded-lg block"
            src={bannerRight}
            alt="rightBanner"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Link>
      ) : null}
      {type === "leftBanner" ? (
        <Link href={`/`} className={`h-full w-full inline-block`}>
          <Image
            className="rounded-lg block"
            src={bannerLeft}
            alt="leftBanner"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Link>
      ) : (
        src && (
          <Link href={`${src.link ? src.link : "#"}`} className={className}>
            <ImageCustom
              data={src.image}
              alt={src.image_alt}
              title={src.image_alt}
              // props
              loading={"lazy"}
              width={350}
              height={400}
            />
          </Link>
        )
      )}
      {type === `category` ? (
        <Link href={`/`} className={`h-full w-full inline-block`}>
          <Image
            className="rounded-none block"
            src={bannerLeft}
            alt="leftBanner"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Link>
      ) : type === "productBanner" ? (
        <Link href={`/`} className={`h-full w-full inline-block`}>
          <Image
            className="rounded-none block"
            src={bannerLeft}
            alt="leftBanner"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: ".75rem",
            }}
          />
        </Link>
      ) : null}
    </div>
  );
};

export default Banner;
