"use client";
import React, { Fragment, useContext, useEffect, useState } from "react";
import DashboardTabs from "@/components/dashboard/DashboardTabs";
import styles from "@/assets/css/dashboard/Dashboard.module.css";
import Notification from "@/components/Notification";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Skeleton from "@mui/material/Skeleton";
import PuffLoader from "react-spinners/PuffLoader";
import axios from "@/lib/axios";
import { usePathname } from "next/navigation";
import { SettingApi } from "@/context/api/Setting";

const PsychologyAltIcon = dynamic(
  () => import("@mui/icons-material/PsychologyAlt"),
  {
    ssr: false,
    loading: () => (
      <Skeleton variant="circular" animation="wave" width={100} height={100} />
    ),
  }
);

const Button = dynamic(() => import("@mui/material/Button"), {
  ssr: false,
});

const Page = () => {
  const { dataUser } = useContext(SettingApi);
  const [unread, setUnread] = useState([]);
  const [read, setRead] = useState([]);
  const router = useRouter();
  const slug = usePathname();


  useEffect(() => {
    if (dataUser && dataUser.data.activation == 0) {
      router.push("/dashboard/idinity");
    }
    axios.get(`api${slug}`).then((response) => {
      setUnread(response.data.data.unread_notifications);
      setRead(response.data.data.read_notifications);
    });
  }, [dataUser, router, slug]);

  const overRide = () => ({
    display: "block",
    margin: "0 auto",
  });

  const [page, setPage] = useState();
  const selected = (data) => {
    setPage(data);
  };
  return dataUser && dataUser.data.activation == 1 ? (
    <>
      <DashboardTabs
        title={["پیام های خوانده نشده", "پیام های خوانده شده"]}
        selectValue={selected}
      />
      <div className={styles.notification_container}>
        {page == 0
          ? unread.length > 0 &&
            unread.map((unread) => (
              <Fragment key={unread.id}>
                <Notification
                  position="dashboard"
                  title={unread.message}
                  date={unread.created_date}
                />
              </Fragment>
            ))
          : page == 1
          ? read.length > 0 &&
            read.map((read) => (
              <Fragment key={read.id}>
                <Notification
                  position="dashboard"
                  title={read.message}
                  date={read.created_date}
                />
              </Fragment>
            ))
          : null}
      </div>
    </>
  ) : (
    <div className="w-full h-screen my-4 flex justify-center flex-col items-center leading-10">
      {dataUser && dataUser.data.activation == 0 ? (
        <>
          <PsychologyAltIcon
            sx={{ fontSize: 100, color: "var(--theme-color)" }}
          />
          <h5 className="text-xl font-bold">اطلاعات شما کامل نیست</h5>
          <h5>درصورتی که به بخش حساب کاربری هدایت نشدید دکمه زیر کلیک کنید</h5>
          <Button sx={{ backgroundColor: "var(--theme-color) !important" }}>
            <Link className="text-black" href={"/dashboard/idinity"}>
              {" "}
              تکمیل اطلاعات{" "}
            </Link>
          </Button>
        </>
      ) : (
        <PuffLoader
          color={"rgb(255 121 0 / 49%)"}
          loading={true}
          cssOverride={overRide}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
    </div>
  );
};

export default Page;
