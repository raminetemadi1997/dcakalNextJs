"use client";
import React, { useState, useEffect, useContext } from "react";
import dynamic from "next/dynamic";
import styles from "../../assets/css/cart/Cart.module.css";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CartContextSet } from "@/context/CartContext";

const ShoppingCartIcon = dynamic(
  () => import("@mui/icons-material/ShoppingCart"),
  {
    ssr: false,
    loading: () => (
      <div className="sm:h-[32px] sm:w-[32px] h-[18px] w-[18px] bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700"></div>
    ),
  }
);

const CheckCircleIcon = dynamic(
  () => import("@mui/icons-material/CheckCircle"),
  {
    ssr: false,
    loading: () => (
      <div className="sm:h-[48px] sm:w-[48px] w-[28px] h-[28px] bg-gray-300 rounded-full animate-pulse dark:bg-gray-700"></div>
    ),
  }
);

const LocationOnIcon = dynamic(() => import("@mui/icons-material/LocationOn"), {
  ssr: false,
  loading: () => (
    <div className="sm:h-[32px] sm:w-[32px] h-[18px] w-[18px] bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700"></div>
  ),
});
const WalletIcon = dynamic(() => import("@mui/icons-material/Wallet"), {
  ssr: false,
  loading: () => (
    <div className="sm:h-[32px] sm:w-[32px] h-[18px] w-[18px] bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700"></div>
  ),
});

const PurchaseSteps = () => {
  const passName = usePathname();
  const router = useRouter();
  const [steps, setSteps] = useState(passName);
  const { shipperIdContext } = useContext(CartContextSet);


  function stepHandler(params) {
    setSteps(shipperIdContext ? "/payment" : passName);
  }

  return (
    <section className={styles.purchase_steps}>
      <div className={styles.line}>
        <div
          style={{
            width: `${
              steps === "/cart" ? "0" : steps === "/address" ? "50%" : "100%"
            }`,
          }}
        ></div>
      </div>
      <div className={styles.steps}>
        <Link href={`/cart`} onClick={() => setSteps("/cart")}>
          <ShoppingCartIcon
            sx={{
              fontSize: "2rem",
              "@media (max-width: 540px)": {
                fontSize: "2rem",
              },
              backgroundColor: "#fff",
              color: "var(--theme-color)",
            }}
          />
          <CheckCircleIcon
            sx={{
              fontSize: "3rem",
              "@media (max-width: 540px)": {
                fontSize: "2rem",
              },
              backgroundColor: "#fff",
              color: "var(--theme-color)",
            }}
          />
          <p style={{ color: "var(--theme-color)", fontWeight: "bold" }}>
            سبد خرید
          </p>
        </Link>
        <Link href={`/address`} onClick={() => setSteps("/address")}>
          <LocationOnIcon
            sx={{
              fontSize: "2rem",
              "@media (max-width: 540px)": {
                fontSize: "2rem",
              },
              backgroundColor: "#fff",
              color: `${
                steps === "/address" || steps === "/payment"
                  ? "var(--theme-color)"
                  : "#d9d9d9"
              }`,
            }}
          />
          <CheckCircleIcon
            sx={{
              fontSize: "3rem",
              "@media (max-width: 540px)": {
                fontSize: "2rem",
              },
              backgroundColor: "#fff",
              color: `${
                steps === "/address" || steps === "/payment"
                  ? "var(--theme-color)"
                  : "#d9d9d9"
              }`,
            }}
          />
          <p
            style={{
              color: `${
                steps === "/address" || steps === "/payment"
                  ? "var(--theme-color)"
                  : "#d9d9d9"
              }`,

              fontWeight: `${
                steps === "/address" || steps === "/payment" ? "bold" : "normal"
              }`,
            }}
          >
            آدرس و نحوه ارسال
          </p>
        </Link>
        <Link href={shipperIdContext ? `/payment` : "#"} onClick={stepHandler}>
          <WalletIcon
            sx={{
              fontSize: "2rem",
              "@media (max-width: 540px)": {
                fontSize: "2rem",
              },
              backgroundColor: "#fff",
              color: `${
                steps === "/payment" ? "var(--theme-color)" : "#d9d9d9"
              }`,
            }}
          />
          <CheckCircleIcon
            sx={{
              fontSize: "3rem",
              "@media (max-width: 540px)": {
                fontSize: "2rem",
              },
              backgroundColor: "#fff",
              color: `${
                steps === "/payment" ? "var(--theme-color)" : "#d9d9d9"
              }`,
            }}
          />
          <p
            style={{
              color: `${
                steps === "/payment" ? "var(--theme-color)" : "#d9d9d9"
              }`,
              fontWeight: `${steps === "/payment" ? "bold" : "normal"}`,
            }}
          >
            روش پرداخت
          </p>
        </Link>
      </div>
    </section>
  );
};

export default PurchaseSteps;
