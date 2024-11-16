"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "@/lib/axios";
import useMediaQuery from "@mui/material/useMediaQuery";

const Cart = dynamic(() => import("../components/header/Cart"), {
  ssr: false,
  loading: () => (
    <div className={`w-14 h-14 animate-pulse`}>
      <div className={`w-full h-full bg-gray-100 rounded-full`}></div>
    </div>
  ),
});

//css
import styles from "../assets/css/footer/QuickAccess.module.css";
//icon
import dynamic from "next/dynamic";
import Skeleton from "@mui/material/Skeleton";

const PersonIcon = dynamic(() => import("@mui/icons-material/Person"), {
  ssr: false,
  loading: () => (
    <Skeleton
      variant="rectangular"
      width={24}
      height={24}
      sx={{ marginLeft: "0.75rem" }}
    />
  ),
});
const PhoneInTalkIcon = dynamic(
  () => import("@mui/icons-material/PhoneInTalk"),
  {
    ssr: false,
    loading: () => (
      <Skeleton
        variant="rectangular"
        width={24}
        height={24}
        sx={{ marginLeft: "0.75rem" }}
      />
    ),
  }
);

const QuickAccess = ({ phone }) => {
  const mobile = useMediaQuery("(max-width:540px)");

  const [user, setUser] = useState(false);
  useEffect(() => {
    const getUser = async () => {
      try {
        const fetchedUser = await axios.get("api/user");
        if (fetchedUser) {
          setUser(true);
        }
      } catch (error) {}
    };
    getUser();
  }, []);
  return (
    mobile && (
      <div
        className={`w-full h-fit fixed -bottom-0.5 z-40 sm:hidden flex flex-col items-center`}
      >
        <div
          className={`w-20 h-20 bg-[#ff770094] -top-[72%] rounded-full absolute flex justify-center items-center`}
        >
          <Cart type="quickAccess" />
        </div>
        <div
          className={`${styles.container} w-full h-14 relative rounded-t-2xl flex justify-between items-center px-6`}
        >
          <Link
            href={user ? `/dashboard` : `/login`}
            className={`z-10 h-6 w-6`}
          >
            <PersonIcon
              className={`text-white text-2xl cursor-pointer`}
              width={24}
              height={24}
            />
          </Link>

          <Link href={`tel:${phone}`} className={`z-10 h-6 w-6`}>
            <PhoneInTalkIcon
              width={24}
              height={24}
              className={`text-white text-2xl z-10 cursor-pointer`}
            />
          </Link>
        </div>
      </div>
    )
  );
};

export default QuickAccess;
