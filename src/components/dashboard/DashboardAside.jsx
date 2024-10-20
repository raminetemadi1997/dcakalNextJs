"use client";
import React, { useContext, useState } from "react";
import dynamic from "next/dynamic";
import styles from "@/assets/css/dashboard/Dashboard.module.css";
import StickyBox from "react-sticky-box";
import Link from "next/link";
import {styled, useMediaQuery } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Skeleton from '@mui/material/Skeleton';
import { AppBarContext } from "@/context/dashboard/AppBar";
import { usePathname } from "next/navigation";
import { SettingApi } from "@/context/api/Setting";
import { DashboardApi } from "@/context/api/DashboardContext";

const DashboardIcon = dynamic(() => import("@mui/icons-material/Dashboard"), {
  loading: () => (
    <Skeleton
      animation="wave"
      variant="circular"
      width={24}
      height={24}
      sx={{ mr: 1 }}
    />
  ),
  ssr: false,
  suspense: true,
});

const PersonIcon = dynamic(() => import("@mui/icons-material/Person"), {
  loading: () => (
    <Skeleton
      animation="wave"
      variant="circular"
      width={24}
      height={24}
      sx={{ mr: 1 }}
    />
  ),
  ssr: false,
  suspense: true,
});
const ShoppingCartIcon = dynamic(
  () => import("@mui/icons-material/ShoppingCart"),
  {
    loading: () => (
      <Skeleton
        animation="wave"
        variant="circular"
        width={24}
        height={24}
        sx={{ mr: 1 }}
      />
    ),
    ssr: false,
    suspense: true,
  }
);
const NotificationsIcon = dynamic(
  () => import("@mui/icons-material/Notifications"),
  {
    loading: () => (
      <Skeleton
        animation="wave"
        variant="circular"
        width={24}
        height={24}
        sx={{ mr: 1 }}
      />
    ),
    ssr: false,
    suspense: true,
  }
);
const ChatIcon = dynamic(() => import("@mui/icons-material/Chat"), {
  loading: () => (
    <Skeleton
      animation="wave"
      variant="circular"
      width={24}
      height={24}
      sx={{ mr: 1 }}
    />
  ),
  ssr: false,
  suspense: true,
});

const LocationOnIcon = dynamic(() => import("@mui/icons-material/LocationOn"), {
  loading: () => (
    <Skeleton
      animation="wave"
      variant="circular"
      width={24}
      height={24}
      sx={{ mr: 1 }}
    />
  ),
  ssr: false,
  suspense: true,
});
const DiscountIcon = dynamic(() => import("@mui/icons-material/Discount"), {
  loading: () => (
    <Skeleton
      animation="wave"
      variant="circular"
      width={24}
      height={24}
      sx={{ mr: 1 }}
    />
  ),
  ssr: false,
  suspense: true,
});
const PeopleAltIcon = dynamic(() => import("@mui/icons-material/PeopleAlt"), {
  loading: () => (
    <Skeleton
      animation="wave"
      variant="circular"
      width={24}
      height={24}
      sx={{ mr: 1 }}
    />
  ),
  ssr: false,
  suspense: true,
});
const FavoriteIcon = dynamic(() => import("@mui/icons-material/Favorite"), {
  loading: () => (
    <Skeleton
      animation="wave"
      variant="circular"
      width={24}
      height={24}
      sx={{ mr: 1 }}
    />
  ),
  ssr: false,
  suspense: true,
});

const LogoutIcon = dynamic(() => import("@mui/icons-material/Logout"), {
  loading: () => (
    <Skeleton
      animation="wave"
      variant="circular"
      width={24}
      height={24}
      sx={{ mr: 1 }}
    />
  ),
  ssr: false,
  suspense: true,
});

const PersonIconDynamic = dynamic(() => import("@mui/icons-material/Person"), {
  loading: () => (
    <Skeleton animation="wave" variant="circular" width={64} height={64} />
  ),
  ssr: false,
});

const Notification = styled("p")({
  width: 20,
  height: 20,
  fontSize: ".75rem",
  backgroundColor: "#ed4337",
  borderRadius: "50%",
  color: "#fff",
  textAlign: "center",
  lineHeight: "20px",
});

const DashboardAside = () => {
  const { dataUser } = useContext(SettingApi);
  const pathName = usePathname();
  const [click, setClick] = useState(null);
  const mobile = useMediaQuery("(max-width: 540px)");
  const { appBarOpen, setAppBarOpen } = useContext(AppBarContext);
  const selectedPage = [
    "/dashboard",
    "/dashboard/idinity",
    "/dashboard/order",
    "/dashboard/notification",
    "/dashboard/review",
    "/dashboard/favorite",
    "/dashboard/address",
    "/dashboard/copan",
    "/dashboard/partners",
  ];

  

  const dashboardItems = [
    {
      id: 1,
      icon: <DashboardIcon sx={{ marginRight: 1 }} />,
      title: "داشبورد",
      path: "/dashboard",
    },
    {
      id: 1,
      icon: <PersonIcon sx={{ marginRight: 1 }} />,
      title: "اطلاعات حساب کاربری",
      path: "/dashboard/idinity",
    },
    {
      id: 2,
      icon: <ShoppingCartIcon sx={{ marginRight: 1 }} />,
      title: "سفارش ها",
      path: "/dashboard/order",
    },
    {
      id: 3,
      icon: <NotificationsIcon sx={{ marginRight: 1 }} />,
      title: "پیام ها",
      path: "/dashboard/notification",
      notification: 0,
    },
    {
      id: 4,
      icon: <ChatIcon sx={{ marginRight: 1 }} />,
      title: "نقد و بررسی ها",
      path: "/dashboard/review",
    },
    {
      id: 5,
      icon: <FavoriteIcon sx={{ marginRight: 1 }} />,
      title: "علاقه مندی ها",
      path: "/dashboard/favorite",
    },
    {
      id: 7,
      icon: <LocationOnIcon sx={{ marginRight: 1 }} />,
      title: "آدرس ها",
      path: "/dashboard/address",
    },
    {
      id: 9,
      icon: <DiscountIcon sx={{ marginRight: 1 }} />,
      title: "تخفیف ها",
      path: "/dashboard/copan",
    },
    {
      id: 11,
      icon: <PeopleAltIcon sx={{ marginRight: 1 }} />,
      title: "همکاران",
      path: "/dashboard/partners",
    },
  ];

  const toggleDrawer = (newOpen) => () => {
    setAppBarOpen(newOpen);
  };

  const clickHandler = (index) => {
    setAppBarOpen(false);
  };


 
  const { dashboardData } = useContext(DashboardApi);


  const DrawerList = (
    <aside>
      <div className={`${styles.aside_mobile} bg-white`} >
        <IconButton onClick={() => setAppBarOpen(false)} size="large">
          <CloseIcon />
        </IconButton>
      </div>


      <div className="rounded-lg flex flex-col items-center p-4">
            <div
              className="p-2 rounded-full border-theme border mb-2"
              style={{ width: "82px", height: "82px" }}
            >
              <PersonIconDynamic sx={{ fontSize: "4rem" }} />
            </div>
            <p className="mb-2">{dashboardData ? dashboardData.full_name : ""}</p>
            <p className="text-xs text-stone-400">{dashboardData ? dashboardData.mobile : ""}</p>
          </div>
      
      <div>
        <ul className="grid grid-cols-1 gap-2">
          {dashboardItems.map((data, i) => (
            <li
              className="hover:text-theme duration-150 ease-in p-4 border-b"
              key={data.id}
              onClick={() => clickHandler(i)}
              style={{
                color: `${i === click ? "var(--theme-color)" : ""}`,
              }}
            >
              <Link href={data.path} style={{ display: "block" }}>
                {data.icon}
                {data.title}
              </Link>
            </li>
          ))}
          <li className={`duration-150 ease-in p-4`}>
                  <Link
                    href={"/logout"}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div className="flex items-center">
                      <LogoutIcon sx={{ marginRight: 1 }} />
                      خروج
                    </div>
                  </Link>
                </li>
        </ul>
      </div>
    </aside>
  );

  return mobile ? (
    <Drawer  open={appBarOpen} onClose={toggleDrawer(false)}>
      
      {DrawerList}
    </Drawer>
  ) : (
    <div className="sm:block hidden">
      <StickyBox offsetTop={70}>
        <div className={styles.aside}>
          <div className="rounded-lg flex flex-col items-center p-4">
            <div
              className="p-2 rounded-full border-theme border mb-2"
              style={{ width: "82px", height: "82px" }}
            >
              <PersonIconDynamic sx={{ fontSize: "4rem" }} />
            </div>
            <p className="mb-2">{dashboardData ? dashboardData.full_name : ""}</p>
            <p className="text-xs text-stone-400">{dashboardData ? dashboardData.mobile : ""}</p>
          </div>
          <div className="rounded-lg p-4">
            <ul className="grid grid-cols-1 gap-2">
              <>
                {dataUser ?
                  dashboardItems.slice(0 , dataUser.data.activation == 0 ? 1 : dashboardItems.length )
                    .map((data, i) => {
                      return (
                        <li
                          className={`duration-150 ease-in ${
                            i == selectedPage.indexOf(pathName)
                              ? "text-theme"
                              : null
                          }`}
                          key={i}
                          onClick={() => clickHandler(i)}
                          style={{
                            color: `${i === click ? "var(--theme-color)" : ""}`,
                          }}
                        >
                          <Link
                            href={data.path}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <div className="flex items-center">
                              {data.icon}
                              {data.title}
                            </div>
                            {data.notification ? (
                              <Notification>{data.notification}</Notification>
                            ) : null}
                          </Link>
                        </li>
                      );
                    })
                    :
                    <div className="grid grid-cols-1 gap-2">
                      <Skeleton animation="wave" />
                      <Skeleton animation="wave" />
                      <Skeleton animation="wave" />
                      <Skeleton animation="wave" />
                      <Skeleton animation="wave" />
                      <Skeleton animation="wave" />
                    </div>
                }
                <li className={`duration-150 ease-in`}>
                  <Link
                    href={"/logout"}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div className="flex items-center">
                      <LogoutIcon sx={{ marginRight: 1 }} />
                      خروج
                    </div>
                  </Link>
                </li>
              </>
            </ul>
          </div>
        </div>
      </StickyBox>
    </div>
  );
};

export default DashboardAside;
