import React, { useState, useRef, useContext, use } from "react";
import styles from "@/assets/css/head/Submenu.module.css";
import Link from "next/link";
import { subMenuItems } from "../../constants/constants";
import Image from "next/image";
import menuImage from "../../../public/images/submenu/menuimg.png";
import { useMediaQuery } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import StoreIcon from "@mui/icons-material/Store";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import styled from "@emotion/styled";
import ImageCustom from "../constantElements/ImageCustom";
//context
const Submenu = ({
  className,
  position,
  type,
  hoverHandler,
  mainMenu,
  menuCover = null,
}) => {
  
  const mobile = useMediaQuery("(max-width:540px)");
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL_IMAGE;
  const [open, setOpen] = useState(null);
  const [getAttr, setAttr] = useState(null);
  const [subMenu, setSubMenu] = useState();
  const items = useRef({});
  const parentItems = useRef();
  const clickItemsHandler = (elem, index) => {
    if (!mobile) {
      if (index !== open) {
        setAttr(items.current[index].getAttribute("data-select"));
        setOpen(index);
        setSubMenu(elem);
      } else {
        setOpen(null);
        setAttr(null);
        setSubMenu(null);
      }
    }
  };

  const Ul = styled("ul")({
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: ".5rem",
    "& li": {
      color: "#000",
      fontSize:"13px",
    },
    "& li > a:hover ": {
      color: "var(--theme-color)",
    },
  });

  return (
    <div
      style={{ height: "calc(100vh - 100px)" }}
      className={`${
        styles.container
      } ${className} submenu cursor-auto bg-white h-[500px] text-white ${
        position == "navbar"
          ? `absolute w-[1300px] ${styles.navbar}`
          : mobile
          ? `fixed z-50 h-screen w-screen overflow-y-hidden sm:hidden block duration-150 ease-in translate-x-0 transition-transform right-0 top-0 `
          : `absolute top-full w-[1300px] h-auto`
      } ${hoverHandler ? styles.show : null}`}
    >
      <div
        className={`head ${
          mobile
            ? `bg-white px-2 py-3 h-fit border-b border-stone-800 justify-between`
            : `bg-[#FF9E0F] px-2 py-2 h-9`
        }  flex items-center`}
      >
        {mobile ? (
          <>
            <p className={`text-sm text-black`}>محصولات فروشگاه</p>
            <div className={`w-7 flex justify-end items-center h-8`}>
              <CloseIcon className={`ml-1 text-sm text-black`} />
            </div>
          </>
        ) : (
          <>
            <span className={` ${open !== null ? `hidden` : `flex`}`}>
              <StoreIcon className={`ml-1`} sx={{ fontSize: "22px" }} />
            </span>
            <p className={`text-sm ${open !== null ? `hidden` : `flex`}`}>
              محصولات فروشگاه
            </p>
          </>
        )}

        <div
          className={`back items-center cursor-pointer ${
            open !== null ? `flex` : `hidden`
          } hover:text-black ease-in duration-100`}
          onClick={() => {
            setOpen(null);
            setAttr(null);
            setSubMenu(null);
          }}
        >
          <ArrowRightAltIcon className="ml-1" />
          بازگشت
        </div>
      </div>
      <div
        className={`body w-full ${styles.body} ${
          mobile ? `p-0` : `p-2`
        } bg-white grid ${open ? "grid-cols-4" : "grid-cols-2 "} gap-4`}
      >
        <ul
          style={{ height: "calc(100vh - 153px)" }}
          ref={parentItems}
          className={` relavtive flex ${
            open
              ? `flex-col overflow-y-scroll h-[500px] open`
              : mobile
              ? `w-full flex-col overflow-y-auto`
              : `flex-row flex-wrap`
          } ${styles.items}`}
        >
          {
            mainMenu.map((menu) => {
              return (
                <li
                  key={menu.id}
                  className={`flex items-center justify-between px-3 cursor-pointer border-[#FF9E0F] text-sm group py-1 ${
                    open === menu.id ? `bg-[#F3F1F1] here` : null
                  } ${
                    open
                      ? `w-full odd:border-none leading-10`
                      : `w-1/2 ${mobile ? `odd:border-l-0` : `odd:border-l-2`}`
                  } ${
                    mobile
                      ? `h-12 w-full border-b border-stone-300 leading-10 `
                      : ``
                  }`}
                >
                  <div className="flex items-center">
                    <ImageCustom
                          data={menu.icon}
                          alt={menu.name}
                          title={menu.name}
                          // props
                          loading={"lazy"}
                          // width={120}
                          // height={120}
                          fullWidth={false}
                          width={20}
                          height={20}
                          size = 'original'
                        />

                    
                    <Link
                      href={menu.url}
                      className={`${
                        open === menu.id ? `text-[#FF9E0F]` : `text-black`
                      } group-hover:text-[#FF9E0F] transition-colors ease-out mr-2`}
                    >
                      {menu.name}
                    </Link>
                  </div>
                  {menu.items.length > 0 && (
                    <ChevronLeftIcon
                      onClick={() => {
                        clickItemsHandler(menu, menu.id);
                      }}
                      ref={(element) => (items.current[menu.id] = element)}
                      className={`text-[#FF9E0F] ${
                        open === menu.id ? `-rotate-90` : null
                      } transition-transform ease-in duration-100 `}
                    />
                  )}
                </li>
              );
            })}
        </ul>
        {mobile ? null : (
          <div
            style={{ height: "calc(100vh - 153px)" }}
            className={`content-box ${
              open ? `col-span-3` : `col-span-1`
            }  flex items-center overflow-y-scroll justify-center relative ${
              styles.items
            } `}
          >
            {!open && (
              <>
                {menuCover && (
                  <ImageCustom
                  data={menuCover.cover_menu}
                  alt={menuCover.cover_menu_alt}
                  title={menuCover.cover_menu_alt}
                  // props
                  loading={"lazy"}
                  fullWidth={false}
                  width={600}
                  height={400}
                  size = 'original'
                />
                 
                )}
              </>
            )}
            {subMenu && (
              <div
                className={`w-full h-full flex gap-4`}
              >
                {subMenu.items.map((subMenuItems) =>
                  subMenuItems.type == 0 ? (
                    <section key={subMenuItems.id}>
                      <div className="title text-black text-center text-sm mb-2 pb-2 border-b border-theme">
                        {subMenuItems.title}
                      </div>
                      {subMenuItems.items.length > 0 && (
                        <Ul>
                          {subMenuItems.items.map((innerItems) => (
                            <li key={innerItems.id}>
                              <Link
                                href={innerItems.url}
                                title={innerItems.name}
                              >
                                {innerItems.identity_name}
                              </Link>
                            </li>
                          ))}
                        </Ul>
                      )}
                    </section>
                  ) : subMenuItems.type == 1 ? (
                    <section key={subMenuItems.id}>
                      <div className="title text-black text-center text-sm mb-2 pb-2 border-b border-theme">
                        {subMenuItems.title}
                      </div>
                      {subMenuItems.items.length > 0 && (
                        <Ul>
                          {subMenuItems.items.map((innerItems) => (
                            <li key={innerItems.id}>
                              <Link
                                href={innerItems.url}
                                title={innerItems.name}
                                className="flex gap-2 border-theme border rounded-md p-1 overflow-hidden"
                              >
                                {innerItems.image && (
                                  
                                  <ImageCustom
                                  data={innerItems.image}
                                  alt={subMenuItems.image_alt}
                                  title={subMenuItems.image_alt}
                                  // props
                                  loading={"lazy"}
                                  width={75}
                                  height={75}
                                  size="small"
                                />
                                )}
                                {innerItems.identity_name}
                              </Link>
                            </li>
                          ))}
                        </Ul>
                      )}
                      <Link
                        href={subMenuItems.link}
                        ttile={subMenuItems.link}
                        className="text-theme my-2 block w-fit"
                      >
                        مشاهده تمامی پکیجها
                      </Link>
                    </section>
                  ) : subMenuItems.type == 2 ? (
                    <section
                      key={subMenuItems.id}
                      className="flex items-center justify-center"
                    >
                      {subMenuItems.items.length > 0 &&
                        subMenuItems.items.map((innerItems) => (
                            <ImageCustom
                              data={innerItems.image}
                              alt={subMenuItems.title}
                              title={subMenuItems.title}
                              // props
                              loading={"lazy"}
                              width={350}
                              height={250}
                              key={innerItems.id}
                            />
                        ))}
                    </section>
                  ) : null
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Submenu;
