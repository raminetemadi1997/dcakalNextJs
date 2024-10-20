"use client";
import React, { useContext } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../public/images/Cart/DCA_KALA_LOGO.png";
import styles from "../../assets/css/cart/Cart.module.css";
import { useMediaQuery } from "@mui/material";
import { CartContextSet } from "@/context/CartContext";
import ImageCustom from "@/components/constantElements/ImageCustom";

const LocalPhoneIcon = dynamic(() => import("@mui/icons-material/LocalPhone"), {
  ssr: false,
});
const CartHeader = () => {
  const matches = useMediaQuery("(max-width:540px)");
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL_IMAGE;
  const { bootCartData } = useContext(CartContextSet);

  return (
    bootCartData && (
      <header className={styles.header}>
        {bootCartData.data.boot.logo && (
          <Link href={"/"}>
            <ImageCustom
              data={bootCartData.data.boot.logo}
              alt={bootCartData.data.boot.logoAlt}
              title={bootCartData.data.boot.logoAlt}
              loading={"lazy"}
              fullWidth={false}
              size="original"
              width={150}
              height={93}
            />
          </Link>
        )}
        <div className={styles.phone}>
          <p className="sm:text-base text-xs">
            {bootCartData.data.boot.tell_title && (
              <>
                <LocalPhoneIcon sx={{ color: "var(--theme-color-green)" }} />
                &nbsp; {bootCartData.data.boot.tell_title} &nbsp;
                <a
                  style={{ color: "var(--theme-color-green)" }}
                  href={`tel:${bootCartData.data.boot.tell}`}
                >
                  {bootCartData.data.boot.tell}
                </a>
              </>
            )}
          </p>
        </div>
      </header>
    )
  );
};

export default CartHeader;
