"use client";
import React, { useState, useRef, useEffect, useContext } from "react";

import styles from "@/assets/css/head/Header.module.css";

import { memo } from "react";

import dynamic from "next/dynamic";

import Skeleton from "@mui/material/Skeleton";

import useMediaQuery from "@mui/material/useMediaQuery";

import IconButton from "@mui/material/IconButton";

import Search from "@/components/menu/mobile/Search";

import Logo from "@/components/header/Logo";

import SearchBar from "@/components/header/SearchBar";

import MobileMenu from "@/components/menu/mobile/MobileMenu";

import { SettingApi } from "@/context/api/Setting";

import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";

const SearchBox = dynamic(() => import("../components/header/SearchBox"), {
  ssr: false,
});

const Cart = dynamic(() => import("../components/header/Cart"), {
  ssr: false,
  loading: () => (
    <div className="w-[40px] h-[32px]">
      <Skeleton variant="rectangular" width={40} height={32} />
    </div>
  ),
});

const User = dynamic(() => import("@/components/header/User"), {
  ssr: false,
  loading: () => (
    <div className="w-[91.88px] h-[38.06px]">
      <Skeleton variant="rectangular" width={91.88} height={38.06} />
    </div>
  ),
});

const Menu = dynamic(() => import("@/components/menu/Menu"), {
  ssr: false,
  loading: () => (
    <div className="w-[128.69px] h-[22px] sm:block hidden">
      <Skeleton variant="rectangular" width={128.69} height={22} />
    </div>
  ),
});

const SearchIcon = dynamic(() => import("@mui/icons-material/Search"), {
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

//context
import { ScrollContext } from "@/context/scrollContext";

//path
const MenuIcon = dynamic(() => import("@mui/icons-material/Menu"), {
  ssr: false,
 
});

const Header = ({ menuData }) => {
  const { dataSetting } = useContext(SettingApi);
  const [openMenu, setOpenMenu] = useState(false);
  const [serachBox, setSerachBox] = useState(false);
  const mobile = useMediaQuery("(max-width:540px)");
  const tablet = useMediaQuery("(max-width:1280px)");

  //context
  const { clientWindowHeight } = useContext(ScrollContext);
  const [openModal, setOpenModal] = useState(false);

  const [height, setHeight] = useState(0);
  const ref = useRef();

  useEffect(() => {
    const heightElem = ref.current?.clientHeight;
    setHeight(heightElem);
  }, [height, setHeight]);

  const dataSrc = (data) => {
    setOpen(data);
  };

  const [open, setOpen] = useState(false);
  const [page, setPage] = useState();
  const selected = (data) => {
    setPage(data);
  };

  return (
    <>
      <header
        ref={ref}
        className=" flex items-center justify-center top-0 z-30 sm:rounded-b-none rounded-b-3xl relative bg-theme"
        style={{
          position: "sticky",
          // backgroundColor: `rgba(255 , 121 , 0 , ${ clientWindowHeight > height && !mobile ? ".8" : "1" })`,
        }}
      >
        <div
          style={{ maxWidth: "1358px" }}
          className="w-full grid sm:grid-cols-9 grid-cols-3 sm:p-4 p-2 gap-4 items-center"
        >
          <MenuIcon
            className={`${styles.mobile_menu_icon} mobile_menu`}
            onClick={() => setOpenMenu(true)}
          />
          <Menu
            position="header"
            className="xl:col-span-1 col-span-2"
            mainMenu={menuData.data.main_menu}
            menuCover={dataSetting && dataSetting.data.data.cover_menu}
          />
          {dataSetting && dataSetting.data.data.setting.logo ? (
            <Logo
              className="col-span-1"
              logo={dataSetting && dataSetting.data.data.setting.logo}
            />
          ) : (
            <div className="h-[38.06px] w-full col-start-2">
              <Skeleton
                variant="rectangular"
                sx={{ width: "100%" }}
                height={38.06}
                animation="wave"
              />
            </div>
          )}
          <div className="sm:hidden col-span-1 flex justify-end">
            <IconButton onClick={() => setSerachBox(true)}>
              <SearchIcon className="text-white cursor-pointer" />
            </IconButton>
          </div>
          <SearchBar
            className="xl:col-span-5 col-span-3 xl:col-start-3 col-start-4"
            shownSearchBoxHandler={dataSrc}
          />
          <div className="xl:col-span-2 col-span-3 sm:flex hidden justify-end gap-4 items-center h-full">
            {dataSetting && dataSetting.data.data.phones.top_mobile_phones ? (
              <a
                href={`tel:${
                  dataSetting && dataSetting.data.data.phones.top_mobile_phones
                }`}
                className="text-white flex col-span-2 text-lg"
              >
                <div className="lg:text-lg text-sm">
                  {dataSetting &&
                    dataSetting.data.data.phones.top_mobile_phones}
                </div>
                <PhoneInTalkIcon className="mr-1" />
              </a>
            ) : (
              <div className="w-[93.41px] h-[28px]">
                <Skeleton variant="rectangular" width={93.41} height={28} />
              </div>
            )}
            <User className="col-span-2 col-start-3" />
            <Cart />
          </div>
        </div>

      </header>
      {tablet && (
        <>
          <MobileMenu
            openMenu={openMenu}
            onClose={() => setOpenMenu(false)}
            mainMenu={dataSetting ? dataSetting.data.data.main_menu : []}
          />

          <Search openMenu={serachBox} onClose={() => setSerachBox(false)} />
        </>
      )}
    </>
  );
};

export default memo(Header);
