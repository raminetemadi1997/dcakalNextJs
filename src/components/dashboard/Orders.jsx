"use client";
import React, { useState } from "react";
import styles from "@/assets/css/dashboard/Dashboard.module.css";
import { CircularProgress } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import CancelIcon from "@mui/icons-material/Cancel";
import { useMediaQuery } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ButtonCustom from "@/components/constantElements/ButtonCustom";
import OrderDetails from "../modals/OrderDetails";
import "swiper/css";
import "@/styles/styles.css";
import "swiper/css/navigation";
import Link from "next/link";
import ImageCustom from "../constantElements/ImageCustom";

const Orders = ({
  position,
  data = null,
  spaceBetween = 30,
  slidesPerView = 3,
  navigation = false,
}) => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL_IMAGE;
  const mobile = useMediaQuery("(max-width:540px)");
  const [modal, setModal] = useState(false);
  const breakpoints = {
    340: {
      slidesPerView: 2.5,
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
      slidesPerView: 7.5,
    },
  };

  return (
    <>
      <div
        key={data.id}
        className="border rounded-lg p-2 grid col-span-1 gap-4"
      >
        <div className="flex justify-between">
          <div className="flex items-center">
            {position == "pending" ? (
              <CircularProgress
                sx={{ color: "var(--theme-color)", mr: 1 }}
                variant="indeterminate"
                size="1.5rem"
              />
            ) : position == "delivered" ? (
              <CheckCircleIcon
                sx={{ color: "var(--theme-color-green)", mr: 1 }}
              />
            ) : position == "returned" ? (
              <AutorenewIcon sx={{ mr: 1 }} />
            ) : position == "canceled" ? (
              <CancelIcon sx={{ mr: 1 }} color="error" />
            ) : null}

            <p className="text-sm font-bold">
              {position == "pending"
                ? `${data.order_status_value.name}`
                : position == "delivered"
                ? "تحویل داده شده"
                : position == "returned"
                ? "مرجوع شده"
                : position == "canceled"
                ? "کنسل شده"
                : null}
            </p>
          </div>

          <ButtonCustom
            variant="text"
            text="جزییات"
            onClick={() => setModal(true)}
            fullWidth
          />
        </div>

        <div className={styles.details}>
          <dl>
            <dt>شماره سفارش :</dt>
            <dd>{data.order_code}</dd>
          </dl>
          <dl>
            <dt>تاریخ ثبت :</dt>
            <dd>{data.order_date}</dd>
          </dl>
          <dl>
            <dt>مبلغ :</dt>
            <dd>{Number(data.order_final_amount).toLocaleString()} تومان</dd>
          </dl>
        </div>

        <div className={styles.order_images}>
          {data && data.items.length > 0 && (
            <>
              <Swiper
                breakpoints={breakpoints}
                slidesPerView={slidesPerView}
                spaceBetween={spaceBetween}
                navigation={mobile ? false : navigation}
                modules={navigation && [Navigation]}
                className="mySwiper"
              >
                {data.items.map((orderImage) => (
                  <SwiperSlide key={orderImage.id}>
                    <Link
                      href={`/${orderImage.slug}`}
                      title={orderImage.alt_name}
                    >
                      <ImageCustom
                        data={orderImage.image}
                        alt={orderImage.image_alt}
                        title={orderImage.image_alt}
                        loading={"lazy"}
                        width={350}
                        height={350}
                      />
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </>
          )}
        </div>
      </div>

      {modal && (
        <OrderDetails
          openModal={modal}
          onClick={() => setModal(false)}
          onClose={() => setModal(false)}
          data={data}
        />
      )}
    </>
  );
};

export default Orders;
