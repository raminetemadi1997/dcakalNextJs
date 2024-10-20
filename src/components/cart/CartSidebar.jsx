"use client";
import React, { useContext } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import styles from "../../assets/css/cart/Cart.module.css";
import { styled } from "@mui/material/styles";
import StickyBox from "react-sticky-box";
import { CartContextSet } from "../../context/CartContext";
import ButtonCustom from "../constantElements/ButtonCustom";
import axios from "@/lib/axios";
import { useRouter, redirect } from "next/navigation";
import { SnakebarContext } from "@/context/snakebar";
import ProgressCustom from "../constantElements/ProgressCustom";

const PhoneEnabledIcon = dynamic(
  () => import("@mui/icons-material/PhoneEnabled"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[24px] w-[24px] bg-gray-300 rounded-sm animate-pulse dark:bg-gray-700 ml-2"></div>
    ),
  }
);
const HeadsetMicIcon = dynamic(() => import("@mui/icons-material/HeadsetMic"), {
  ssr: false,
  loading: () => (
    <span className="h-[24px] w-[24px] bg-gray-300 rounded-sm animate-pulse dark:bg-gray-700 ml-2"></span>
  ),
});

const Button = dynamic(() => import("@mui/material/Button"), {
  ssr: false,
});

const ColorButtonOrder = styled(Button)(({ theme }) => ({
  color: "#fff",
  padding: ".5rem 0",
  width: "100%",
  backgroundColor: "var(--theme-color) !important",
  "&:hover": {
    backgroundColor: "var(--theme-color)",
  },
}));

const CartSidebar = ({
  description,
  approvment,
  gatewaySelect,
  counterCards,
  pageValue,
  type,
  disabled,
  addressId,
  shipperId,
  paymentSidebar,
  data = null,
  shipperPrice,
  reset,
  ss,
  dd,
}) => {
  const { setOpenAlarm, setModes, setMessage, setDuration } =
    useContext(SnakebarContext);
  const { totalDiscount, finalPrice, discountPrice, cartItems, sidebarBoot } =
    useContext(CartContextSet);
  const router = useRouter();

  const orderHandler = () => {
    if (type == "cart") {
      axios
        .get("api/process-cart")
        .then((response) => {
          router.push("/address");
        })
        .catch((error) => {
          if (error.response.data.message) {
            setOpenAlarm(true);
            setModes(error.response.data.type);
            setMessage(error.response.data.message);
            setDuration(3000);
          } else {
            router.push(`/${error.response.data.redirect}`);
          }
        });
    } else if (type == "address") {
      axios.get("/sanctum/csrf-cookie");

      axios
        .post(`api/address-and-delivery`, {
          address: addressId,
          shipper: shipperId,
        })
        .then((response) => {
          if (response.status) {
            router.push("/payment");
          }
        })
        .catch((error) => {
          if (error.status == 422) {
            // snake bar message
          } else if (error.status == 302) {
            // route push to data redirect
          } else {
            // snake bar ارتباط برقرار نشد error 500 dade
          }
        });
    } else {
      axios
        .post("api/payment-submit", {
          gateway: gatewaySelect,
          approvment: approvment,
          description: description,
        })
        .then((response) => {
          
          router.push(response.data.redirect);
        })
        .catch(() => {});
    }
  };


  return data ? (
    <aside className={styles.sidebar}>
      <StickyBox offsetTop={0}>
        <div>
          {type == "payment" ? (
            <>
              {paymentSidebar.orderAmount && (
                <div>
                  <p className="text-sm">{`مبلغ کل (${
                    data.data.length > 0 ? data.data.length : 0
                  } کالا)`}</p>
                  <p className="text-sm font-bold">
                    {Number(paymentSidebar.orderAmount).toLocaleString()}
                    <span className="mr-1 font-normal">تومان</span>
                  </p>
                </div>
              )}
            </>
          ) : (
            <>
              <div>
                <p className="text-sm">{`مبلغ کل (${
                  data.data ? data.data.length : 0
                } کالا)`}</p>
                <p className="text-sm font-bold">
                  {data.final_price.toLocaleString()}
                  <span className="mr-1 font-normal">تومان</span>
                </p>
              </div>
            </>
          )}
          <div>
            <p className="text-sm">هزینه ارسال</p>
            {paymentSidebar && paymentSidebar.deliveryAmount ? (
              paymentSidebar.deliveryAmount == 0 ? (
                <p className="text-sm">رایگان</p>
              ) : (
                <p className="text-sm">
                  {Number(paymentSidebar.deliveryAmount).toLocaleString()} تومان
                </p>
              )
            ) : (
              <p className="text-sm">وابسته به آدرس</p>
            )}
          </div>
          <div className="border-t pt-2 text-red-500">
            <p className="text-sm">تخفیف</p>
            <div className="text-sm">
              {pageValue == 1 ? (
                "ندارد"
              ) : (
                <>
                  {(data.discount_price
                    ? data.discount_price
                    : 0
                  ).toLocaleString()}
                  <span className="mr-1 font-normal">تومان</span>
                </>
              )}
            </div>
          </div>
          <div className="pt-2">
            <p className="text-sm">مبلغ قابل پرداخت</p>
            <p className="text-sm font-bold">
              {type == "payment"
                ? (paymentSidebar.payPrice
                    ? paymentSidebar.payPrice
                    : 0
                  ).toLocaleString()
                : shipperPrice
                ? (data.total_discount
                    ? data.total_discount + Number(shipperPrice)
                    : 0
                  ).toLocaleString()
                : (data.total_discount
                    ? data.total_discount
                    : 0
                  ).toLocaleString()}
              <span className="mr-1 font-normal">تومان</span>
            </p>
          </div>
          {pageValue == 0 ? (
            type == "address" ? (
              <ButtonCustom
                text={
                  shipperId && addressId
                    ? "ادامه ثبت سفارش"
                    : addressId
                    ? "نحوه ارسال را انتخاب کنید"
                    : "آدرس خود را انتخاب کنید"
                }
                type="text"
                fullWidth
                disabled={disabled}
                color={
                  shipperId && addressId
                    ? "var(--theme-color)"
                    : addressId
                    ? "#A4A4A4"
                    : "#A4A4A4"
                }
                onClick={orderHandler}
                typeButton="cart"
                titleTag={
                  shipperId && addressId
                    ? "ادامه ثبت سفارش"
                    : addressId
                    ? "نحوه ارسال را انتخاب کنید"
                    : "آدرس خود را انتخاب کنید"
                }
              />
            ) : (
              <ButtonCustom
                text="ادامه ثبت سفارش"
                type="text"
                fullWidth
                disabled={disabled}
                onClick={orderHandler}
                titleTag="ادامه ثبت سفارش"
                typeButton="cart"
              />
            )
          ) : type == "payment" ? (
            <ButtonCustom
              text="درگاه پرداخت"
              type="text"
              fullWidth
              disabled={disabled}
              onClick={orderHandler}
              titleTag="درگاه پرداخت"
              typeButton="cart"
            />
          ) : (
            <p className="text-sm text-justify">
              ابتدا کاهایی که در لیست خرید بعدی قرار داده اید را به سبد خرید
              انتقال دهید تا بتوانید مراحل بعدی سفارش را تکمیل کنید.
            </p>
          )}
        </div>
        <div>
          <p className="mb-4 flex">
            <HeadsetMicIcon sx={{ color: "var(--theme-color-green)" }} />
            مشاوره و راهنمایی
          </p>
          {sidebarBoot.tips && (
            <p
              className="text-xs mb-4"
              style={{ color: "var(--theme-color-green)" }}
              dangerouslySetInnerHTML={{ __html: sidebarBoot.tips }}
            />
          )}
          <Link
            href="tel:+982172195"
            style={{ color: "var(--theme-color-green)", display: "flex" }}
          >
            <PhoneEnabledIcon sx={{ color: "var(--theme-color-green)" }} />
            مشاوره و راهنمایی
          </Link>
        </div>

        {sidebarBoot.dataAlert && (
          <p dangerouslySetInnerHTML={{ __html: sidebarBoot.dataAlert }} />
        )}
        {pageValue == 0 && sidebarBoot.freeShipperPrice && (
          <>
            <ProgressCustom
              color="red"
              progressValue={
                (Number(data.total_discount) /
                  Number(sidebarBoot.freeShipperPrice)) *
                100
              }
            />
            {Number(sidebarBoot.freeShipperPrice) >=
            Number(data.total_discount) ? (
              <p>
                {`${(
                  Number(sidebarBoot.freeShipperPrice) -
                  Number(data.total_discount)
                ).toLocaleString()} تومان تا ارسال رایگان`}
              </p>
            ) : (
              <p>ارسال رایگان</p>
            )}
          </>
        )}
      </StickyBox>
    </aside>
  ) : (
    <div className="h-96 w-full bg-gray-300 animate-pulse dark:bg-gray-700 ml-2 rounded-lg col-span-2"></div>
  );
};

export default CartSidebar;
