"use client";
import React, { useState, useContext } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styled from "@emotion/styled";
import { useMediaQuery } from "@mui/material";
import { SnakebarContext } from "@/context/snakebar";
import TimerCustom from "@/components/constantElements/TimerCustom";
import PhoneIcon from "@mui/icons-material/Phone";
import CancelIcon from "@mui/icons-material/Cancel";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import InventoryIcon from "@mui/icons-material/Inventory";
//mui
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { SettingApi } from "@/context/api/Setting";

const DeleteIcon = dynamic(() => import("@mui/icons-material/Delete"), {
  ssr: false,
});

//component

import noImage from "../../public/images/no-image.png";

//css
import styles from "../assets/css/main/Card.module.css";
import axios from "@/lib/axios";

import { MainModalContext } from "@/context/modal/mainModal";
import ButtonCustom from "./constantElements/ButtonCustom";
import ImageCustom from "./constantElements/ImageCustom";
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL_IMAGE;
let date = new Date();
const Card = ({
  imageSlider,
  titleSlider,
  image,
  name,
  slug,
  price,
  alt,
  body,
  id,
  pageValue,
  change,

  type,
  data = null,
  altName = false,
  priceList = false,
  list = false,
  position = null,
  reset,
  shipperVisible = true,
  colorVisible = true,
  timerVisible = true,
  width = null,
  height = null,
  ...props
}) => {
  const { dataUser } = useContext(SettingApi);
  let [count, setCount] = useState(data ? Number(data.number) : 1);
  let [cartPrice, setCartPrice] = useState(data && Number(data.price / count));
  let [cartDiscountPrice, setCartDiscountPrice] = useState(
    data && Number(data.discount / count)
  );

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

  function responsivePriceList(purpose) {
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

  const [play, setPlay] = useState(null);

  const {
    setOpen,
    setDescription,
    setTitle,
    accept,
    setIdPostion,
    idPosition,
  } = useContext(MainModalContext);
  const { setOpenAlarm, setModes, setMessage, setDuration } =
    useContext(SnakebarContext);
  const mouseEnterHandler = (e) => {
    setPlay("enter");
  };

  let counter = 0;

  const [showVideo, setShowVideo] = useState(false);

  const countData = (data) => {
    setCount(data);
  };

  const mouseLeaveHandler = (e) => {
    setPlay(null);
  };

  const pathName = usePathname();

  const Picture = styled("div")({
    minHeight: 210,
  });

  const deleteHandler = (id) => {
    setIdPostion(id);
    setOpen(true);
    setDescription("آیا مایل به حذف این آیتم هستید؟");
    setTitle("حذف محصول");
  };

  const transferHandler = (id) => {
    if (dataUser) {
      if (position == "next-buy") {
        axios.get(`api/transfer-to-cart/${id}`).then((response) => {
          reset(response.config.url);
          setOpenAlarm(true);
          setMessage("محصول به سبد خرید افزوده شد");
          setDuration(3000);
          setModes("success");
        });
      } else {
        axios.get(`api/transfer-to-next-buy/${id}`).then((response) => {
          reset(response.config.url);
          setOpenAlarm(true);
          setMessage("محصول به خرید بعدی افزوده شد");
          setDuration(3000);
          setModes("success");
        });
      }
    }
  };

  const deleteFavorite = () => {
    axios.get(`api/dashboard/delete-favorite/${id}`).then(() => {
      change(id);
      setOpenAlarm(true);
      setMessage("محصول مورد نظر از لیست علاقه مندی ها شما حذف شد");
      setDuration(3000);
      setModes("error");
    });
  };

  const increaseHandler = (id) => {
    setCount((prevcount) => prevcount + 1);
    axios.get("/sanctum/csrf-cookie").then((getcsrvf) => {});

    return axios({
      method: "post",
      url: `api/add-cart-number/${id}`,
      data: {
        number: count + 1,
      },
      responseType: "json",
    }).then(
      (response) => {
        reset(response.config.data);
        setDuration(3000);
        setOpenAlarm(true);
        setMessage("به تعداد محصولات با موفقیت اضافه شد");
        setModes("success");
      },
      (error) => {}
    );
  };

  const decreaseHandler = (id) => {
    let checkCounter = 0;
    setCount((prevcount) => prevcount - 1);
    if (count < 2) setCount(1);
    axios.get("/sanctum/csrf-cookie").then((getcsrvf) => {});

    return axios({
      method: "post",

      url: `api/add-cart-number/${id}`,
      data: {
        number: count - 1 < 2 ? (count = 1) : count - 1,
      },
      responseType: "json",
    }).then(
      (response) => {
        checkCounter = count - 1;
        if (Number(checkCounter) >= 1) {
          setDuration(3000);
          setOpenAlarm(true);
          setMessage("از تعداد محصولات با موفقیت کم شد");
          setModes("error");
        }
        reset(response.config.data);
      },
      (error) => {}
    );
  };

  return (
    <>
      {type === `slider` ? (
        <></>
      ) : type === `newProducts` ? (
        <Link
          href={slug != undefined ? `/${slug}` : "#"}
          className={`w-auto h-auto bg-white rounded-lg p-4 flex ${styles.shadowCards} group`}
        >
          <picture>
            <source
              srcSet={
                image &&
                (image.indexWeb
                  ? `${backendUrl}${image.indexWeb.medium} , ${backendUrl}${image.indexWeb.medium_2x} 2x`
                  : `${backendUrl}${image.webp}`)
              }
              type="image/webp"
            />

            <source
              srcSet={
                image &&
                (image.indexWeb
                  ? `${backendUrl}${image.indexArray.medium} , ${backendUrl}${image.indexArray.medium_2x} 2x`
                  : `${backendUrl}${image.original}`)
              }
              type="image/jpg"
            />

            <img
              src={
                image &&
                (image.indexWeb
                  ? `${backendUrl}${image.indexWeb.medium}`
                  : `${backendUrl}${image.webp}`)
              }
              alt={alt != null ? alt : "متن جایگزین عکس"}
              title={alt != null ? alt : "متن جایگزین عکس"}
              srcSet={
                image &&
                (image.indexWeb
                  ? `${backendUrl}${image.indexWeb.medium} , ${backendUrl}${image.indexWeb.medium_2x} 2x`
                  : `${backendUrl}${image.webp}`)
              }
              width={210}
              height={210}
              loading="lazy"
            />
          </picture>

          <div className={` h-auto flex flex-col justify-between pr-2`}>
            <p
              className={`sm:text-sm text-xs group-hover:text-theme ease-in duration-100 transition-colors text-right`}
            >
              {name}
            </p>
            <p className="text-left text-lg">
              <span className={`text-sm font-semibold`}>
                {Number(price).toLocaleString()}
              </span>
              <span className="mr-1 text-gray-400 text-xs">تومان</span>
            </p>
          </div>
        </Link>
      ) : type === "productSlider" ||
        type === "productSliderV2" ||
        type === "product" ? (
        <div className={`w-full h-fit flex justify-center relative`}>
          <Link href={slug ? `/${slug}` : "#"}>
            <picture
              className={`${
                type === "product"
                  ? "w-[142px] h-[142px]"
                  : "w-[172px] h-[172px]"
              } bg-white flex rounded-full justify-center items-center border overflow-hidden`}
            >
              <source
                srcSet={
                  imageSlider &&
                  `${backendUrl}${imageSlider.indexWeb.medium} ,${backendUrl}${imageSlider.indexWeb.medium_2x} 2x`
                }
                type="image/webp"
              />

              <source
                srcSet={
                  imageSlider &&
                  `${backendUrl}${imageSlider.indexArray.medium} ,${backendUrl}${imageSlider.indexArray.medium_2x} 2x`
                }
                type="image/jpg"
              />
              <img
                loading="lazy"
                src={
                  imageSlider && `${backendUrl}${imageSlider.indexWeb.medium}`
                }
                alt={alt}
                title={alt}
                srcSet={
                  imageSlider &&
                  `${backendUrl}${imageSlider.indexWeb.medium} ,${backendUrl}${imageSlider.indexWeb.medium_2x} 2x`
                }
                width={210}
                height={210}
              />
            </picture>
            <p className="text-sm p-2 group-hover:text-theme duration-150 transition-colors ease-in">
              {titleSlider}
            </p>
          </Link>
        </div>
      ) : type === "summaryDescription" ? (
        <div
          className={`w-full h-full border border-[var(--theme-color-green)] block rounded-xl p-2 bg-[#F3F3F3]`}
        >
          <div className={`w-full h-full flex flex-col items-center`}>
            <Image
              className={`w-full rounded-xl mb-4 h-56`}
              src={`${backendUrl}${image}`}
              alt={alt}
              width={420}
              height={420}
            />
            <div>
              <h2 className={`text-center mb-2 font-bold`}>{name}</h2>
              <div
                className="h-36 overflow-auto px-2 text-justify text-sm"
                dangerouslySetInnerHTML={{ __html: body }}
              />
            </div>
          </div>
        </div>
      ) : (
        data &&
        (priceList ? (
          !mobile ? (
            <div className="p-2">
              <Link
                target="_blank"
                href={`/${data.slug}`}
                title={data.name}
                className={`border grid items-center grid-cols-3 justify-between rounded-lg overflow-hidden p-4 bg-white hover:shadow-md`}
              >
                {/* card head */}

                {/* card image */}
                {data.image ? (
                  <div className="relative overflow-hidden border-l ">
                    <ImageCustom
                      data={data.image}
                      alt={data.image_alt}
                      title={data.image_alt}
                      // props
                      loading={"lazy"}
                      height={responsivePriceList("height")}
                      width={responsivePriceList("width")}
                      fullWidth={false}
                      className="w-[150px] mx-auto block h-[150px]"
                    />
                  </div>
                ) : (
                  <Image src={noImage} alt="عکس پیشفرض" />
                )}
                {/* card image */}

                {/* card name */}
                <div className="text-sm h-full border-l flex justify-center items-center">
                  {altName
                    ? data.alt_name
                    : data.name.split("").length >= 45
                    ? `${data.name.slice(0, 45)}...`
                    : data.name}
                </div>
                {/* card name */}

                {/* card footer */}
                {data.type != 1 ? (
                  <>
                    {data.marketable == 0 ? (
                      <>
                        {data.discount &&
                        !Array.isArray(data.discount) &&
                        date < new Date(data.discount.end_date) ? (
                          <div>
                            <div className="flex items-center justify-end gap-4">
                              {data.discount.type == 0 ? (
                                <div className="text-sm bg-[#DE1616] px-1 text-white rounded-md">{`${data.discount.percentage} %`}</div>
                              ) : (
                                <div className="text-sm bg-[#DE1616] px-1 text-white rounded-md">{`${Number(
                                  Math.round(
                                    (data.discount.percentage / data.price) *
                                      100
                                  )
                                )} %`}</div>
                              )}
                              <div className="flex justify-end">
                                <span className="text-[#DE1616] text-lg">
                                  {data.discount.type == 0 ? (
                                    <span className="font-bold tracking-widest">{`${Number(
                                      data.discount.final_price
                                    ).toLocaleString()}`}</span>
                                  ) : (
                                    <span className="font-bold tracking-widest">{`${Number(
                                      data.discount.final_price
                                    ).toLocaleString()}`}</span>
                                  )}
                                  <span className="text-xs mr-1">تومان</span>
                                </span>
                              </div>
                            </div>
                            <div className="flex justify-end text-sm text-[#C4C3C3] line-through">
                              <span>
                                <span className="font-bold tracking-widest">{`${Number(
                                  data.price
                                ).toLocaleString()}`}</span>
                                <span className="text-xs mr-1">تومان</span>
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="flex justify-end h-12 items-center">
                            <span>
                              <span className="font-bold tracking-widest">{`${Number(
                                data.price
                              ).toLocaleString()}`}</span>
                              <span className="text-xs mr-1">تومان</span>
                            </span>
                          </div>
                        )}
                      </>
                    ) : data.marketable == 1 ? (
                      <div className="flex justify-end gap-4 items-center h-12">
                        <div className="text-[#009688] font-bold">
                          تماس بگیرید
                        </div>
                        <PhoneIcon
                          fontSize="medium"
                          sx={{ color: "#009688" }}
                        />
                      </div>
                    ) : data.marketable == 2 ? (
                      <div className="flex justify-end gap-4 items-center h-12">
                        <div className="text-[#555555] font-bold">ناموجود</div>
                        <NotificationsIcon
                          fontSize="medium"
                          sx={{ color: "#555555" }}
                        />
                      </div>
                    ) : data.marketable == 3 ? (
                      <div className="flex justify-end gap-4 items-center h-12">
                        <div className="text-[#555555] font-bold">
                          توقف تولید
                        </div>
                        <CancelIcon
                          fontSize="medium"
                          sx={{ color: "#555555" }}
                        />
                      </div>
                    ) : null}
                  </>
                ) : data.price ? (
                  <>
                    {data.discount &&
                    !Array.isArray(data.discount) &&
                    date < new Date(data.discount.end_date) ? (
                      <div>
                        <div className="flex items-center justify-between">
                          {data.discount.type == 0 ? (
                            <div className="sm:text-sm text-xs bg-[#DE1616] px-1 text-white rounded-md">{`${data.discount.percentage} %`}</div>
                          ) : (
                            <div className="sm:text-sm text-xs bg-[#DE1616] px-1 text-white rounded-md">{`${Number(
                              Math.round(
                                (data.discount.percentage / data.price) * 100
                              )
                            )} %`}</div>
                          )}
                          <div className="flex justify-end">
                            <span className="text-[#DE1616] sm:text-base text-sm">
                              {data.discount.type == 0 ? (
                                <span className="font-semibold tracking-widest">{`${Number(
                                  data.discount.final_price
                                ).toLocaleString()}`}</span>
                              ) : (
                                <span className="font-bold tracking-widest">{`${Number(
                                  data.discount.final_price
                                ).toLocaleString()}`}</span>
                              )}
                              <span className="text-xs mr-1">تومان</span>
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-end text-sm text-[#C4C3C3] line-through">
                          <span>
                            <span className="font-bold tracking-widest">{`${Number(
                              data.price
                            ).toLocaleString()}`}</span>
                            <span className="text-xs mr-1">تومان</span>
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-end h-12 items-center">
                        <span>
                          <span className="font-bold tracking-widest">{`${Number(
                            data.price
                          ).toLocaleString()}`}</span>
                          <span className="text-xs mr-1">تومان</span>
                        </span>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex justify-between items-center h-12">
                    <div className="text-[#DE1616] lg:text-base text-sm font-bold">
                      مشاهده همه پکیج ها
                    </div>
                    <InventoryIcon fontSize="medium" sx={{ color: "#DE1616" }} />
                  </div>
                )}
                {/* card footer */}
              </Link>
            </div>
          ) : (
            <div className="p-2">
              <Link
                target="_blank"
                href={`/${data.slug}`}
                title={data.name}
                className={`border border-[#505050] grid items-center gap-0 grid-cols-4 justify-between rounded-lg rounded-l-3xl overflow-hidden p-0 bg-white hover:shadow-md`}
              >
                {/* card head */}

                {/* card image */}
                {data.image ? (
                  <div className="relative overflow-hidden border-l">
                    <ImageCustom
                      data={data.image}
                      alt={data.image_alt}
                      title={data.image_alt}
                      // props
                      loading={"lazy"}
                      height={210}
                      width={210}
                    />
                  </div>
                ) : (
                  <Image src={noImage} alt="عکس پیشفرض" />
                )}
                {/* card image */}

                {/* card name */}
                <div className="text-sm h-full border-l flex justify-center text-right items-center col-span-2 py-2 px-4">
                  {altName
                    ? data.alt_name
                    : data.name.split("").length >= 45
                    ? `${data.name.slice(0, 45)}...`
                    : data.name}
                </div>
                {/* card name */}

                {/* card footer */}
                {data.type != 1 ? (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(80,80,80,1) 0%, rgba(102,102,102,1) 100%)",
                    }}
                  >
                    {data.marketable == 0 ? (
                      <>
                        {data.discount &&
                        !Array.isArray(data.discount) &&
                        date < new Date(data.discount.end_date) ? (
                          <div>
                            <div className="flex flex-col items-center justify-end gap-4 mb-2">
                              {data.discount.type == 0 ? (
                                <div className="sm:text-sm text-xs bg-[#DE1616] px-1 text-white rounded-md">{`${data.discount.percentage} %`}</div>
                              ) : (
                                <div className="sm:text-sm text-xs bg-[#DE1616] px-1 text-white rounded-md">{`${Number(
                                  Math.round(
                                    (data.discount.percentage / data.price) *
                                      100
                                  )
                                )} %`}</div>
                              )}
                              <div className="flex justify-end">
                                <span className="text-[#DE1616] sm:text-lg text-xs flex flex-col">
                                  {data.discount.type == 0 ? (
                                    <span className="font-bold tracking-widest">{`${Number(
                                      data.discount.final_price
                                    ).toLocaleString()}`}</span>
                                  ) : (
                                    <span className="font-bold tracking-widest">{`${Number(
                                      data.discount.final_price
                                    ).toLocaleString()}`}</span>
                                  )}
                                  <span className="text-xs mr-1">تومان</span>
                                </span>
                              </div>
                            </div>
                            <div className="flex justify-end text-xs text-[#C4C3C3] line-through">
                              <span className=" flex flex-col">
                                <span className="font-bold tracking-widest">{`${Number(
                                  data.price
                                ).toLocaleString()}`}</span>
                                <span className="text-xs mr-1">تومان</span>
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="flex justify-end h-12 items-center">
                            <span className="flex flex-col justify-center items-center gap-2">
                              <span className=" text-white">{`${Number(
                                data.price
                              ).toLocaleString()}`}</span>
                              <span className="text-xs text-white">تومان</span>
                            </span>
                          </div>
                        )}
                      </>
                    ) : data.marketable == 1 ? (
                      <div className="flex flex-col justify-center  items-center h-12">
                        <div className="text-white text-xs">تماس بگیرید</div>
                      </div>
                    ) : data.marketable == 2 ? (
                      <div className="flex justify-end gap-4 items-center h-12">
                        <div className="text-[#555555] font-bold">ناموجود</div>
                        <NotificationsIcon
                          fontSize="medium"
                          sx={{ color: "#555555" }}
                        />
                      </div>
                    ) : data.marketable == 3 ? (
                      <div className="flex justify-end gap-4 items-center h-12">
                        <div className="text-[#555555] font-bold">
                          توقف تولید
                        </div>
                        <CancelIcon
                          fontSize="medium"
                          sx={{ color: "#555555" }}
                        />
                      </div>
                    ) : null}
                  </div>
                ) : data.price ? (
                  <>
                    {data.discount &&
                    !Array.isArray(data.discount) &&
                    date < new Date(data.discount.end_date) ? (
                      <div>
                        <div className="flex items-center justify-between">
                          {data.discount.type == 0 ? (
                            <div className="sm:text-sm text-xs bg-[#DE1616] px-1 text-white rounded-md">{`${data.discount.percentage} %`}</div>
                          ) : (
                            <div className="sm:text-sm text-xs bg-[#DE1616] px-1 text-white rounded-md">{`${Number(
                              Math.round(
                                (data.discount.percentage / data.price) * 100
                              )
                            )} %`}</div>
                          )}
                          <div className="flex justify-end">
                            <span className="text-[#DE1616] sm:text-base text-sm">
                              {data.discount.type == 0 ? (
                                <span className="font-semibold tracking-widest">{`${Number(
                                  data.discount.final_price
                                ).toLocaleString()}`}</span>
                              ) : (
                                <span className="font-bold tracking-widest">{`${Number(
                                  data.discount.final_price
                                ).toLocaleString()}`}</span>
                              )}
                              <span className="text-xs mr-1">تومان</span>
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-end text-sm text-[#C4C3C3] line-through">
                          <span>
                            <span className="font-bold tracking-widest">{`${Number(
                              data.price
                            ).toLocaleString()}`}</span>
                            <span className="text-xs mr-1">تومان</span>
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-end h-12 items-center">
                        <span>
                          <span className="font-bold tracking-widest">{`${Number(
                            data.price
                          ).toLocaleString()}`}</span>
                          <span className="text-xs mr-1">تومان</span>
                        </span>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex justify-between items-center h-12">
                    <div className="text-[#DE1616] lg:text-base text-sm font-bold">
                      مشاهده همه پکیج ها
                    </div>
                    <InventoryIcon fontSize="medium" sx={{ color: "#DE1616" }} />
                  </div>
                )}
                {/* card footer */}
              </Link>
            </div>
          )
        ) : list ? (
          <>
            {type == "cart" ? (
              <>
                <div>
                  <div
                    className={`block ${
                      mobile ? "rounded-none border-b" : "rounded-lg border"
                    } overflow-hidden sm:p-4 p-2 bg-white hover:shadow-md`}
                  >
                    {mobile ? (
                      <>
                        <section className="grid grid-cols-2 gap-4">
                          {/* card image */}
                          {data.product.image ? (
                            <div className="mb-4 relative overflow-hidden">
                              <ImageCustom
                                data={data.product.image}
                                alt={data.product.image_alt}
                                title={data.product.image_alt}
                                // props
                                loading={"lazy"}
                                height={210}
                                width={210}
                              />
                            </div>
                          ) : (
                            <Image src={noImage} alt="عکس پیشفرض" />
                          )}
                          {/* card image */}
                          <section className="flex flex-col gap-4 items-center justify-between">
                            {/* card name */}
                            <div className=" text-start ">
                              <div className="sm:text-sm text-xs min-h-[40px] leading-5 my-4">
                                {altName
                                  ? data.product.alt_name
                                  : data.product.name}
                              </div>

                              {/* counter */}
                              <div className="flex gap-1 items-center">
                                <IconButton
                                  size="small"
                                  disabled={count <= 1 ? true : false}
                                  onClick={() => decreaseHandler(data.id)}
                                >
                                  <RemoveIcon fontSize="small" />
                                </IconButton>
                                <div className="w-10 border bg-white text-center">
                                  {count}
                                </div>
                                <IconButton
                                  size="small"
                                  onClick={() => increaseHandler(data.id)}
                                >
                                  <AddIcon fontSize="small" />
                                </IconButton>
                              </div>
                              {/* counter */}

                              {/* shipper */}
                              {data.product.shipper && (
                                <div className="flex justify-start">
                                  <div className="flex items-center w-fit bg-[#009688] px-2 py-1 rounded-lg">
                                    <RocketLaunchIcon
                                      fontSize="small"
                                      sx={{ mr: 0.5, color: "#fff" }}
                                    />
                                    <div className="text-sm text-white">
                                      ارسال سریع
                                    </div>
                                  </div>
                                </div>
                              )}
                              {/* shipper */}
                            </div>
                            {/* card name */}

                            {/* card footer */}

                            {position == "next-buy" ? (
                              <div className="col-span-2 flex justify-end h-12 items-center">
                                <span>
                                  <span className="font-bold tracking-widest">{`${Number(
                                    cartPrice * count
                                  ).toLocaleString()}`}</span>
                                  <span className="text-xs mr-1">تومان</span>
                                </span>
                              </div>
                            ) : data.discount != data.price &&
                              data.discount != 0 ? (
                              <div className="col-span-2">
                                <div className="flex items-center justify-end gap-4">
                                  <div className="flex justify-end">
                                    <span className="text-[#DE1616] text-lg">
                                      <span className="font-bold tracking-widest">{`
                                    ${Number(
                                      cartDiscountPrice * count
                                    ).toLocaleString()}`}</span>
                                      <span className="text-xs mr-1">
                                        تومان
                                      </span>
                                    </span>
                                  </div>
                                </div>
                                <div className="flex justify-end text-sm text-[#C4C3C3] line-through">
                                  <span>
                                    <span className="font-bold tracking-widest">{`${Number(
                                      cartPrice * count
                                    ).toLocaleString()}`}</span>
                                    <span className="text-xs mr-1">تومان</span>
                                  </span>
                                </div>
                              </div>
                            ) : (
                              <div className="col-span-2 flex justify-end h-12 items-center">
                                <span>
                                  <span className="font-bold tracking-widest">{`${Number(
                                    cartPrice * count
                                  ).toLocaleString()}`}</span>
                                  <span className="text-xs mr-1">تومان</span>
                                </span>
                              </div>
                            )}
                            {/* card footer */}
                          </section>
                        </section>

                        {/* metas & color */}
                        {data.product.color || data.product.meta.length > 0 ? (
                          <div className="bg-[#f6f6f6] rounded-lg p-2 flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                              <div className="text-sm">
                                رنگ : {data.product.color.name}
                              </div>
                              <div
                                className="w-7 h-7 rounded-full border"
                                style={{
                                  backgroundColor:
                                    data.product.color.color_code,
                                }}
                              ></div>
                            </div>
                            {data.product.meta.length > 0 ? (
                              <ul className="flex flex-col gap-2">
                                {data.product.meta.map((metas) => (
                                  <li key={metas.id} className="text-sm">
                                    {metas.name} : {metas.value}
                                  </li>
                                ))}
                              </ul>
                            ) : null}
                          </div>
                        ) : null}
                        {/* metas & color */}

                        <div className="flex items-center justify-between">
                          <IconButton onClick={() => deleteHandler(data.id)}>
                            <DeleteIcon color="error" />
                          </IconButton>
                          {dataUser && (
                            <ButtonCustom
                              onClick={() => transferHandler(data.id)}
                              text={`${
                                position == "next-buy"
                                  ? "افزودن به سبد خرید"
                                  : "افزودن به خرید بعدی"
                              }`}
                              variant="text"
                            />
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        <section className="grid grid-cols-7 gap-4 items-center">
                          {/* card image */}
                          {data.product.image ? (
                            <div
                              className="mb-4 relative overflow-hidden"
                              onMouseEnter={() => setShowVideo(true)}
                              onMouseLeave={() => setShowVideo(false)}
                            >
                              <ImageCustom
                                data={data.product.image}
                                alt={data.product.image_alt}
                                title={data.product.image_alt}
                                // props
                                loading={"lazy"}
                                height={210}
                                width={210}
                              />
                            </div>
                          ) : (
                            <Image src={noImage} alt="عکس پیشفرض" />
                          )}
                          {/* card image */}

                          {/* card name */}
                          <div className="col-span-3 text-start col-start-3 flex flex-col gap-4">
                            <Link
                              href={data.product.slug}
                              title={
                                altName
                                  ? data.product.alt_name
                                  : data.product.name
                              }
                              className="sm:text-sm text-xs min-h-[40px] leading-5"
                            >
                              {altName
                                ? data.product.alt_name
                                : data.product.name}
                            </Link>

                            {/* counter */}
                            <div className="flex gap-1 items-center">
                              <IconButton
                                size="small"
                                disabled={count <= 1 ? true : false}
                                onClick={() => decreaseHandler(data.id)}
                              >
                                <RemoveIcon fontSize="small" />
                              </IconButton>
                              <div className="w-10 border bg-white text-center">
                                {count}
                              </div>
                              <IconButton
                                size="small"
                                onClick={() => increaseHandler(data.id)}
                              >
                                <AddIcon fontSize="small" />
                              </IconButton>
                            </div>
                            {/* counter */}

                            {/* metas & color */}
                            {data.product.color ||
                            data.product.meta.length > 0 ? (
                              <div className="bg-[#f6f6f6] rounded-lg p-2 flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                  <div className="text-sm">
                                    رنگ : {data.product.color.name}
                                  </div>
                                  <div
                                    className="w-7 h-7 rounded-full border"
                                    style={{
                                      backgroundColor:
                                        data.product.color.color_code,
                                    }}
                                  ></div>
                                </div>
                                {data.product.meta.length > 0 ? (
                                  <ul className="flex flex-col gap-2">
                                    {data.product.meta.map((metas) => (
                                      <li key={metas.id} className="text-sm">
                                        {metas.name} : {metas.value}
                                      </li>
                                    ))}
                                  </ul>
                                ) : null}
                              </div>
                            ) : null}
                            {/* metas & color */}
                          </div>
                          {/* card name */}

                          {/* card footer */}

                          {position == "next-buy" ? (
                            <div className="col-span-2 flex justify-end h-12 items-center">
                              <span>
                                <span className="font-bold tracking-widest">{`${Number(
                                  cartPrice * count
                                ).toLocaleString()}`}</span>
                                <span className="text-xs mr-1">تومان</span>
                              </span>
                            </div>
                          ) : data.discount != data.price &&
                            data.discount != 0 ? (
                            <div className="col-span-2">
                              <div className="flex items-center justify-end gap-4">
                                <div className="flex justify-end">
                                  <span className="text-[#DE1616] text-lg">
                                    <span className="font-bold tracking-widest">{`
                                    ${Number(
                                      cartDiscountPrice * count
                                    ).toLocaleString()}`}</span>
                                    <span className="text-xs mr-1">تومان</span>
                                  </span>
                                </div>
                              </div>
                              <div className="flex justify-end text-sm text-[#C4C3C3] line-through">
                                <span>
                                  <span className="font-bold tracking-widest">{`${Number(
                                    cartPrice * count
                                  ).toLocaleString()}`}</span>
                                  <span className="text-xs mr-1">تومان</span>
                                </span>
                              </div>
                            </div>
                          ) : (
                            <div className="col-span-2 flex justify-end h-12 items-center">
                              <span>
                                <span className="font-bold tracking-widest">{`${Number(
                                  cartPrice * count
                                ).toLocaleString()}`}</span>
                                <span className="text-xs mr-1">تومان</span>
                              </span>
                            </div>
                          )}
                          {/* card footer */}
                        </section>
                        <div className="flex items-center justify-between">
                          <IconButton onClick={() => deleteHandler(data.id)}>
                            <DeleteIcon color="error" />
                          </IconButton>
                          {dataUser && (
                            <ButtonCustom
                              onClick={() => transferHandler(data.id)}
                              text={`${
                                position == "next-buy"
                                  ? "افزودن به سبد خرید"
                                  : "افزودن به خرید بعدی"
                              }`}
                              variant="text"
                            />
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div>
                <Link
                  target="_blank"
                  href={`/${data.slug}`}
                  title={data.name}
                  className={` block ${
                    mobile ? "rounded-none border-b" : "rounded-lg border"
                  } overflow-hidden sm:p-4 p-2 bg-white hover:shadow-md`}
                >
                  {/* card head */}
                  <div className="h-10 flex justify-between items-center">
                    <div>
                      {data.new_product == 1 && (
                        <div className="text-[#DE1616]">جدید</div>
                      )}
                    </div>
                    {data.marketable == 0 ? (
                      data.discount &&
                      !Array.isArray(data.discount) &&
                      date < new Date(data.discount.end_date) ? (
                        <>
                          {data.discount.infinite_status == 1 ? (
                            <div className="flex items-center justify-end">
                              <div className="tracking-widest text-[#DE1616] sm:text-sm text-xs font-medium">
                                پیشنهاد ویژه
                              </div>

                              <LocalOfferIcon
                                sx={{ color: "#DE1616", ml: 0.5 }}
                                fontSize="medium"
                              />
                            </div>
                          ) : (
                            <TimerCustom
                              startDate={data.discount.start_date}
                              endDate={data.discount.end_date}
                            />
                          )}
                        </>
                      ) : null
                    ) : null}
                  </div>
                  {/* card head */}
                  {mobile ? (
                    <section className="grid grid-cols-2 gap-4">
                      {/* card image */}
                      {data.image ? (
                        <div
                          className="mb-4 relative overflow-hidden"
                          onMouseEnter={() => setShowVideo(true)}
                          onMouseLeave={() => setShowVideo(false)}
                        >
                          {showVideo && (
                            <>
                              {data.video ? (
                                <div className="w-full h-full absolute top-0 bg-black">
                                  <video
                                    width="1900"
                                    height="500"
                                    controls={false}
                                    className="w-full h-full"
                                    autoPlay
                                    muted
                                  >
                                    <source src={data.video} type="video/mp4" />
                                  </video>
                                </div>
                              ) : null}
                            </>
                          )}
                          <ImageCustom
                            data={data.image}
                            alt={data.image_alt}
                            title={data.image_alt}
                            // props
                            loading={"lazy"}
                            width={152}
                            height={152}
                          />
                        </div>
                      ) : (
                        <Image src={noImage} alt="عکس پیشفرض" />
                      )}
                      {/* card image */}
                      <section className="flex flex-col gap-4 sm:items-center items-end justify-between">
                        {/* card name */}
                        <div className=" text-start ">
                          <div
                            className={`sm:text-sm text-xs min-h-[40px] leading-5 my-4 ${styles.truncate}`}
                          >
                            {altName ? data.alt_name : data.name}
                          </div>

                          {/* shipper */}
                          {data.shipper && (
                            <div className="flex justify-start">
                              <div className="flex items-center w-fit bg-[#009688] px-2 py-1 rounded-lg">
                                <RocketLaunchIcon
                                  fontSize="small"
                                  sx={{ mr: 0.5, color: "#fff" }}
                                />
                                <div className="text-sm text-white">
                                  ارسال سریع
                                </div>
                              </div>
                            </div>
                          )}
                          {/* shipper */}
                        </div>
                        {/* card name */}

                        {/* card footer */}
                        {data.type != 1 ? (
                          <>
                            {data.marketable == 0 ? (
                              <>
                                {data.discount &&
                                !Array.isArray(data.discount) &&
                                date < new Date(data.discount.end_date) ? (
                                  <div className="col-span-2">
                                    <div className="flex items-center justify-end sm:gap-4 gap-2">
                                      {data.discount.type == 0 ? (
                                        <div className="sm:text-sm text-xs bg-[#DE1616] px-1 text-white rounded-md">{`${data.discount.percentage} %`}</div>
                                      ) : (
                                        <div className="sm:text-sm text-xs bg-[#DE1616] px-1 text-white rounded-md">{`${Number(
                                          Math.round(
                                            (data.discount.percentage /
                                              data.price) *
                                              100
                                          )
                                        )} %`}</div>
                                      )}
                                      <div className="flex justify-end">
                                        <span className="text-[#DE1616] sm:text-base text-sm">
                                          {data.discount.type == 0 ? (
                                            <span className="font-semibold tracking-widest">{`${Number(
                                              data.discount.final_price
                                            ).toLocaleString()}`}</span>
                                          ) : (
                                            <span className="font-bold tracking-widest">{`${Number(
                                              data.discount.final_price
                                            ).toLocaleString()}`}</span>
                                          )}
                                          <span className="text-xs mr-1">
                                            تومان
                                          </span>
                                        </span>
                                      </div>
                                    </div>
                                    <div className="flex justify-end sm:text-sm text-xs text-[#C4C3C3] line-through">
                                      <span>
                                        <span className="font-bold tracking-widest">{`${Number(
                                          data.price
                                        ).toLocaleString()}`}</span>
                                        <span className="text-xs mr-1">
                                          تومان
                                        </span>
                                      </span>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="col-span-2 flex justify-end h-12 items-center">
                                    <span>
                                      <span className="font-bold tracking-widest">{`${Number(
                                        data.price
                                      ).toLocaleString()}`}</span>
                                      <span className="text-xs mr-1">
                                        تومان
                                      </span>
                                    </span>
                                  </div>
                                )}
                              </>
                            ) : data.marketable == 1 ? (
                              <div className=" col-span-2 flex justify-end items-center h-12 gap-4">
                                <div className="text-[#009688] font-bold">
                                  تماس بگیرید
                                </div>
                                <PhoneIcon
                                  fontSize="medium"
                                  sx={{ color: "#009688" }}
                                />
                              </div>
                            ) : data.marketable == 2 ? (
                              <div className="col-span-2 flex justify-end items-center h-12 gap-4">
                                <div className="text-[#555555] font-bold">
                                  ناموجود
                                </div>
                                <NotificationsIcon
                                  fontSize="medium"
                                  sx={{ color: "#555555" }}
                                />
                              </div>
                            ) : data.marketable == 3 ? (
                              <div className="col-span-2 flex justify-end items-center h-12 gap-4">
                                <div className="text-[#555555] font-bold">
                                  توقف تولید
                                </div>
                                <CancelIcon
                                  fontSize="medium"
                                  sx={{ color: "#555555" }}
                                />
                              </div>
                            ) : null}
                          </>
                        ) : data.price ? (
                          <>
                            {data.discount &&
                            !Array.isArray(data.discount) &&
                            date < new Date(data.discount.end_date) ? (
                              <div>
                                <div className="flex items-center justify-between">
                                  {data.discount.type == 0 ? (
                                    <div className="sm:text-sm text-xs bg-[#DE1616] px-1 text-white rounded-md">{`${data.discount.percentage} %`}</div>
                                  ) : (
                                    <div className="sm:text-sm text-xs bg-[#DE1616] px-1 text-white rounded-md">{`${Number(
                                      Math.round(
                                        (data.discount.percentage / data.price) * 100
                                      )
                                    )} %`}</div>
                                  )}
                                  <div className="flex justify-end">
                                    <span className="text-[#DE1616] sm:text-base text-sm">
                                      {data.discount.type == 0 ? (
                                        <span className="font-semibold tracking-widest">{`${Number(
                                          data.discount.final_price
                                        ).toLocaleString()}`}</span>
                                      ) : (
                                        <span className="font-bold tracking-widest">{`${Number(
                                          data.discount.final_price
                                        ).toLocaleString()}`}</span>
                                      )}
                                      <span className="text-xs mr-1">تومان</span>
                                    </span>
                                  </div>
                                </div>
                                <div className="flex justify-end text-sm text-[#C4C3C3] line-through">
                                  <span>
                                    <span className="font-bold tracking-widest">{`${Number(
                                      data.price
                                    ).toLocaleString()}`}</span>
                                    <span className="text-xs mr-1">تومان</span>
                                  </span>
                                </div>
                              </div>
                            ) : (
                              <div className="flex justify-end h-12 items-center">
                                <span>
                                  <span className="font-bold tracking-widest">{`${Number(
                                    data.price
                                  ).toLocaleString()}`}</span>
                                  <span className="text-xs mr-1">تومان</span>
                                </span>
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="flex justify-between items-center h-12">
                            <div className="text-[#DE1616] lg:text-base text-sm font-bold">
                              مشاهده همه پکیج ها
                            </div>
                            <InventoryIcon fontSize="medium" sx={{ color: "#DE1616" }} />
                          </div>
                        )}
                        {/* card footer */}
                      </section>
                    </section>
                  ) : (
                    <section className="grid grid-cols-7 gap-4 items-center">
                      {/* card image */}
                      {data.image ? (
                        <div
                          className="mb-4 relative overflow-hidden"
                          onMouseEnter={() => setShowVideo(true)}
                          onMouseLeave={() => setShowVideo(false)}
                        >
                          {showVideo && (
                            <>
                              {data.video ? (
                                <div className="w-full h-full absolute top-0 bg-black">
                                  <video
                                    width="1900"
                                    height="500"
                                    controls={false}
                                    className="w-full h-full"
                                    autoPlay
                                    muted
                                  >
                                    <source src={data.video} type="video/mp4" />
                                  </video>
                                </div>
                              ) : null}
                            </>
                          )}

                          <ImageCustom
                            data={data.image}
                            alt={data.image_alt}
                            title={data.image_alt}
                            // props
                            loading={"lazy"}
                            width={350}
                            height={400}
                          />
                        </div>
                      ) : (
                        <Image src={noImage} alt="عکس پیشفرض" />
                      )}
                      {/* card image */}

                      {/* card name */}
                      <div className="col-span-3 text-start col-start-3">
                        <div className="sm:text-sm text-xs min-h-[40px] leading-5">
                          {altName
                            ? data.alt_name
                            : data.name.split("").length >= 45
                            ? `${data.name.slice(0, 45)}...`
                            : data.name}
                        </div>

                        {/* shipper */}
                        {data.shipper && (
                          <div className="flex justify-start">
                            <div className="flex items-center w-fit bg-[#009688] px-2 py-1 rounded-lg">
                              <RocketLaunchIcon
                                fontSize="small"
                                sx={{ mr: 0.5, color: "#fff" }}
                              />
                              <div className="text-sm text-white">
                                ارسال سریع
                              </div>
                            </div>
                          </div>
                        )}
                        {/* shipper */}
                      </div>
                      {/* card name */}

                      {/* card footer */}
                      {data.type != 1 ? (
                        <>
                          {data.marketable == 0 ? (
                            <>
                              {data.discount &&
                              !Array.isArray(data.discount) &&
                              date < new Date(data.discount.end_date) ? (
                                <div className="col-span-2">
                                  <div className="flex items-center justify-end gap-4">
                                    {data.discount.type == 0 ? (
                                      <div className="text-sm bg-[#DE1616] px-1 text-white rounded-md">{`${data.discount.percentage} %`}</div>
                                    ) : (
                                      <div className="text-sm bg-[#DE1616] px-1 text-white rounded-md">{`${Number(
                                        Math.round(
                                          (data.discount.percentage /
                                            data.price) *
                                            100
                                        )
                                      )} %`}</div>
                                    )}
                                    <div className="flex justify-end">
                                      <span className="text-[#DE1616] text-lg">
                                        {data.discount.type == 0 ? (
                                          <span className="font-bold tracking-widest">{`${Number(
                                            data.discount.final_price
                                          ).toLocaleString()}`}</span>
                                        ) : (
                                          <span className="font-bold tracking-widest">{`${Number(
                                            data.discount.final_price
                                          ).toLocaleString()}`}</span>
                                        )}
                                        <span className="text-xs mr-1">
                                          تومان
                                        </span>
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex justify-end text-sm text-[#C4C3C3] line-through">
                                    <span>
                                      <span className="font-bold tracking-widest">{`${Number(
                                        data.price
                                      ).toLocaleString()}`}</span>
                                      <span className="text-xs mr-1">
                                        تومان
                                      </span>
                                    </span>
                                  </div>
                                </div>
                              ) : (
                                <div className="col-span-2 flex justify-end h-12 items-center">
                                  <span>
                                    <span className="font-bold tracking-widest">{`${Number(
                                      data.price
                                    ).toLocaleString()}`}</span>
                                    <span className="text-xs mr-1">تومان</span>
                                  </span>
                                </div>
                              )}
                            </>
                          ) : data.marketable == 1 ? (
                            <div className=" col-span-2 flex justify-end items-center h-12 gap-4">
                              <div className="text-[#009688] font-bold">
                                تماس بگیرید
                              </div>
                              <PhoneIcon
                                fontSize="medium"
                                sx={{ color: "#009688" }}
                              />
                            </div>
                          ) : data.marketable == 2 ? (
                            <div className="col-span-2 flex justify-end items-center h-12 gap-4">
                              <div className="text-[#555555] font-bold">
                                ناموجود
                              </div>
                              <NotificationsIcon
                                fontSize="medium"
                                sx={{ color: "#555555" }}
                              />
                            </div>
                          ) : data.marketable == 3 ? (
                            <div className="col-span-2 flex justify-end items-center h-12 gap-4">
                              <div className="text-[#555555] font-bold">
                                توقف تولید
                              </div>
                              <CancelIcon
                                fontSize="medium"
                                sx={{ color: "#555555" }}
                              />
                            </div>
                          ) : null}
                        </>
                      ) : data.price ? (
                        <>
                          {data.discount &&
                          !Array.isArray(data.discount) &&
                          date < new Date(data.discount.end_date) ? (
                            <div>
                              <div className="flex items-center justify-between">
                                {data.discount.type == 0 ? (
                                  <div className="sm:text-sm text-xs bg-[#DE1616] px-1 text-white rounded-md">{`${data.discount.percentage} %`}</div>
                                ) : (
                                  <div className="sm:text-sm text-xs bg-[#DE1616] px-1 text-white rounded-md">{`${Number(
                                    Math.round(
                                      (data.discount.percentage / data.price) * 100
                                    )
                                  )} %`}</div>
                                )}
                                <div className="flex justify-end">
                                  <span className="text-[#DE1616] sm:text-base text-sm">
                                    {data.discount.type == 0 ? (
                                      <span className="font-semibold tracking-widest">{`${Number(
                                        data.discount.final_price
                                      ).toLocaleString()}`}</span>
                                    ) : (
                                      <span className="font-bold tracking-widest">{`${Number(
                                        data.discount.final_price
                                      ).toLocaleString()}`}</span>
                                    )}
                                    <span className="text-xs mr-1">تومان</span>
                                  </span>
                                </div>
                              </div>
                              <div className="flex justify-end text-sm text-[#C4C3C3] line-through">
                                <span>
                                  <span className="font-bold tracking-widest">{`${Number(
                                    data.price
                                  ).toLocaleString()}`}</span>
                                  <span className="text-xs mr-1">تومان</span>
                                </span>
                              </div>
                            </div>
                          ) : (
                            <div className="col-span-2 flex justify-end h-12 items-center">
                              <span>
                                <span className="font-bold tracking-widest">{`${Number(
                                  data.price
                                ).toLocaleString()}`}</span>
                                <span className="text-xs mr-1">تومان</span>
                              </span>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="flex justify-between items-center h-12">
                          <div className="text-[#DE1616] lg:text-base text-sm font-bold">
                            مشاهده همه پکیج ها
                          </div>
                          <InventoryIcon fontSize="medium" sx={{ color: "#DE1616" }} />
                        </div>
                      )}
                      {/* card footer */}
                    </section>
                  )}
                </Link>
              </div>
            )}
          </>
        ) : (
          <div className={`${mobile ? "p-0" : "p-2"}`}>
            <Link
              {...props}
              target="_blank"
              href={`/${data.slug}`}
              title={data.name}
              className={` block ${
                mobile
                  ? "rounded-none border-b odd:border-l even:border-r"
                  : "rounded-lg border"
              }  overflow-hidden sm:p-4 p-2 bg-white hover:shadow-md`}
            >
              {/* card head */}
              {timerVisible && (
                <div className="h-10 flex justify-between items-center">
                  <div>
                    {data.new_product == 1 && (
                      <div className="text-[#DE1616]">جدید</div>
                    )}
                  </div>
                  {data.marketable == 0 ? (
                    data.discount &&
                    !Array.isArray(data.discount) &&
                    date < new Date(data.discount.end_date) ? (
                      <>
                        {data.discount.infinite_status == 1 ? (
                          <div className="flex items-center justify-end">
                            <div className="tracking-widest text-[#DE1616] sm:text-sm text-xs font-medium">
                              پیشنهاد ویژه
                            </div>

                            <LocalOfferIcon
                              sx={{ color: "#DE1616", ml: 0.5 }}
                              fontSize="medium"
                            />
                          </div>
                        ) : (
                          <TimerCustom
                            startDate={data.discount.start_date}
                            endDate={data.discount.end_date}
                          />
                        )}
                      </>
                    ) : null
                  ) : null}
                </div>
              )}
              {/* card head */}

              {/* card image */}
              {data.image ? (
                <div
                  className="mb-4 relative overflow-hidden"
                  onMouseEnter={() => setShowVideo(true)}
                  onMouseLeave={() => setShowVideo(false)}
                >
                  {showVideo && (
                    <>
                      {data.video ? (
                        <div className="w-full h-full absolute top-0 bg-black">
                          <video
                            width="1900"
                            height="500"
                            controls={false}
                            className="w-full h-full"
                            autoPlay
                            muted
                          >
                            <source src={data.video} type="video/mp4" />
                          </video>
                        </div>
                      ) : null}
                    </>
                  )}
                  <ImageCustom
                    data={data.image}
                    alt={data.image_alt}
                    title={data.image_alt}
                    // props
                    loading={"lazy"}
                    height={height ? height : responsive("height")}
                    width={width ? width : responsive("width")}
                  />
                </div>
              ) : (
                <Image src={noImage} alt="عکس پیشفرض" className="mb-4" />
              )}
              {colorVisible && (
                <div className="h-4 flex gap-2 mb-2">
                  {data.colors
                    ? data.colors.length > 1 &&
                      data.colors.map((color) => (
                        <div
                          key={color.id}
                          className="w-4 h-4 border rounded-sm"
                          style={{ backgroundColor: color.color_code }}
                        ></div>
                      ))
                    : null}
                </div>
              )}

              {/* card image */}

              {/* shipper */}
              {shipperVisible && (
                <div className="h-12">
                  {data.shipper && (
                    <div className="flex items-center w-fit bg-[#009688] px-2 py-1 rounded-lg">
                      <RocketLaunchIcon
                        fontSize="small"
                        sx={{ mr: 0.5, color: "#fff" }}
                      />
                      <div className="text-sm text-white">ارسال سریع</div>
                    </div>
                  )}
                </div>
              )}
              {/* shipper */}

              {/* card name */}
              <div
                className={`sm:text-sm text-xs mb-4 min-h-[40px] leading-5 ${styles.truncate}`}
              >
                {altName ? data.alt_name : data.name}
              </div>
              {/* card name */}

              {/* card footer */}
              {data.type != 1 ? (
                <>
                  {data.marketable == 0 && data.price != 0 ? (
                    <>
                      {data.discount &&
                      !Array.isArray(data.discount) &&
                      date < new Date(data.discount.end_date) ? (
                        <div className="h-12">
                          <div className="flex items-center justify-between">
                            {data.discount.type == 0 ? (
                              <div className="sm:text-sm text-xs bg-[#DE1616] px-1 text-white rounded-md">{`${data.discount.percentage} %`}</div>
                            ) : (
                              <div className="sm:text-sm text-xs bg-[#DE1616] px-1 text-white rounded-md">{`${Number(
                                Math.round(
                                  (data.discount.percentage / data.price) * 100
                                )
                              )} %`}</div>
                            )}
                            <div className="flex justify-end">
                              <span className="text-[#DE1616] sm:text-base text-sm">
                                {data.discount.type == 0 ? (
                                  <span className="font-semibold tracking-widest">{`${Number(
                                    data.discount.final_price
                                  ).toLocaleString()}`}</span>
                                ) : (
                                  <span className="font-bold tracking-widest">{`${Number(
                                    data.discount.final_price
                                  ).toLocaleString()}`}</span>
                                )}
                                <span className="text-xs mr-1">تومان</span>
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-end sm:text-sm text-xs text-[#C4C3C3] line-through">
                            <span>
                              <span className="font-bold tracking-widest">{`${Number(
                                data.price
                              ).toLocaleString()}`}</span>
                              <span className="text-xs mr-1">تومان</span>
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-end h-12 items-center">
                          <span>
                            <span className="font-bold tracking-widest">{`${Number(
                              data.price
                            ).toLocaleString()}`}</span>
                            <span className="text-xs mr-1">تومان</span>
                          </span>
                        </div>
                      )}
                    </>
                  ) : data.marketable == 1 || data.price == 0 ? (
                    <div className="flex justify-between items-center h-12">
                      <div className="text-[#009688] font-bold">
                        تماس بگیرید
                      </div>
                      <PhoneIcon fontSize="medium" sx={{ color: "#009688" }} />
                    </div>
                  ) : data.marketable == 2 ? (
                    <div className="flex justify-between items-center h-12">
                      <div className="text-[#555555] font-bold">ناموجود</div>
                      <NotificationsIcon
                        fontSize="medium"
                        sx={{ color: "#555555" }}
                      />
                    </div>
                  ) : data.marketable == 3 ? (
                    <div className="flex justify-between items-center h-12">
                      <div className="text-[#555555] font-bold">توقف تولید</div>
                      <CancelIcon fontSize="medium" sx={{ color: "#555555" }} />
                    </div>
                  ) : null}
                </>
              ) : data.price ? (
                <>
                  {data.discount &&
                  !Array.isArray(data.discount) &&
                  date < new Date(data.discount.end_date) ? (
                    <div>
                      <div className="flex items-center justify-between">
                        {data.discount.type == 0 ? (
                          <div className="sm:text-sm text-xs bg-[#DE1616] px-1 text-white rounded-md">{`${data.discount.percentage} %`}</div>
                        ) : (
                          <div className="sm:text-sm text-xs bg-[#DE1616] px-1 text-white rounded-md">{`${Number(
                            Math.round(
                              (data.discount.percentage / data.price) * 100
                            )
                          )} %`}</div>
                        )}
                        <div className="flex justify-end">
                          <span className="text-[#DE1616] sm:text-base text-sm">
                            {data.discount.type == 0 ? (
                              <span className="font-semibold tracking-widest">{`${Number(
                                data.discount.final_price
                              ).toLocaleString()}`}</span>
                            ) : (
                              <span className="font-bold tracking-widest">{`${Number(
                                data.discount.final_price
                              ).toLocaleString()}`}</span>
                            )}
                            <span className="text-xs mr-1">تومان</span>
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-end text-sm text-[#C4C3C3] line-through">
                        <span>
                          <span className="font-bold tracking-widest">{`${Number(
                            data.price
                          ).toLocaleString()}`}</span>
                          <span className="text-xs mr-1">تومان</span>
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-end h-12 items-center">
                      <span>
                        <span className="font-bold tracking-widest">{`${Number(
                          data.price
                        ).toLocaleString()}`}</span>
                        <span className="text-xs mr-1">تومان</span>
                      </span>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex justify-between items-center h-12">
                  <div className="text-[#DE1616] lg:text-base text-sm font-bold">
                    مشاهده همه پکیج ها
                  </div>
                  <InventoryIcon fontSize="medium" sx={{ color: "#DE1616" }} />
                </div>
              )}
              {/* card footer */}
            </Link>
          </div>
        ))
      )}
    </>
  );
};

export default Card;
