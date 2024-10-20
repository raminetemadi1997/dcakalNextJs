'use client'
import React, { memo, useContext } from "react";
import styles from "../assets/css/head/Navbar.module.css";
import Link from "next/link";
import Skeleton from "@mui/material/Skeleton";
import Drawer from "@mui/material/Drawer";
import dynamic from "next/dynamic";
import { SettingApi } from "@/context/api/Setting";



const DiscountIcon = dynamic(() => import("@mui/icons-material/Discount"), {
  ssr: false,
  loading: () => <Skeleton variant="rounded" width={26} height={18} />,
});

const Navbar = ({ type , navBarItems=[], openMenu = false, onClose }) => {

  const { dataSetting } = useContext(SettingApi);

  

  return dataSetting ? (
    <>
      {type == `mobile` ? (
        <>
          <Drawer anchor={"bottom"} open={openMenu} onClose={onClose}>
            <div >
              {data.data.data.page_menu.top_menu.length > 0 && (
                <ul
                  className=""
                  style={{ maxWidth: "1358px" }}
                >
                  {data.data.data.page_menu.top_menu.map((navitems) => (
                    <li
                      key={navitems.id}
                      className="p-4"
                    >
                      <DiscountIcon
                        className="ml-2"
                        sx={{ fontSize: "1.125rem" }}
                      />
                      <Link
                        rel="preload"
                        title={navitems.name}
                        href={navitems.url}
                      >
                        {navitems.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Drawer>
        </>
      ) : (
        <nav className="relative">
          <div
            className={`${styles.container} w-full bg-[#F3F3F3] px-4 py-3 shadow sm:flex justify-center hidden mt-1`}
          >
            {dataSetting.data.data.page_menu.top_menu.length > 0 && (
              <ul
                className={`flex items-center gap-8`}
                style={{ maxWidth: "1358px" }}
              >
                {dataSetting.data.data.page_menu.top_menu.map((navitems) => (
                  <li
                    key={navitems.id}
                    className="sm:text-sm text-xs flex items-center hover:text-gray-300 transition-colors text-black cursor-pointer"
                  >
                    <DiscountIcon
                      className="ml-2"
                      sx={{ fontSize: "1.125rem" }}
                    />
                    
                    <Link
                      rel="preload"
                      title={navitems.name}
                      href={`/${navitems.url}`}
                    >
                      {navitems.name}
                    </Link>
                  </li>
                ))}

                <li className="sm:text-sm text-xs flex items-center hover:text-gray-300 transition-colors text-black cursor-pointer">
                  <DiscountIcon
                    className="ml-2"
                    sx={{ fontSize: "1.125rem" }}
                  />
                  <Link target="_blank" rel="preload" title={"مجله آموزشی"} href={"https://mag.dcakala.com/"}>
                    مجله آموزشی
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </nav>
      )}
    </>
  )
  
  :<div className="h-12 sm:block hidden">
    <Skeleton variant="rectangular" sx={{width:'100%'}} height={48} />
  </div>
  ;
};

export default memo(Navbar);
