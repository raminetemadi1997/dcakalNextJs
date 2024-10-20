"use client";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import box from "../../../../public/images/Dashboard/box.png";
import deliveryBox from "../../../../public/images/Dashboard/deliveryBox.png";
import returnBox from "../../../../public/images/Dashboard/returnBox.png";
import Image from "next/image";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "@/lib/axios";
import PuffLoader from "react-spinners/PuffLoader";
import Badge from "@mui/material/Badge";
import Skeleton from "@mui/material/Skeleton";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SettingApi } from "@/context/api/Setting";
import { DashboardApi } from "@/context/api/DashboardContext";

const PersonIcon = dynamic(() => import("@mui/icons-material/Person"), {
  loading: () => (
    <Skeleton
      animation="wave"
      variant="rectangular"
      width={24}
      height={24}
      sx={{ mr: 1 }}
    />
  ),

  ssr: false,
});

const EmailIcon = dynamic(() => import("@mui/icons-material/Email"), {
  loading: () => (
    <Skeleton
      animation="wave"
      variant="rectangular"
      width={24}
      height={24}
      sx={{ mr: 1 }}
    />
  ),

  ssr: false,
});

const VisibilityIcon = dynamic(
  () => import("@mui/icons-material/VisibilityOff"),
  {
    loading: () => (
      <Skeleton
        animation="wave"
        variant="rectangular"
        width={24}
        height={24}
        sx={{ mr: 1 }}
      />
    ),

    ssr: false,
  }
);

const VisibilityOffIcon = dynamic(
  () => import("@mui/icons-material/Visibility"),
  {
    loading: () => (
      <Skeleton
        animation="wave"
        variant="rectangular"
        width={24}
        height={24}
        sx={{ mr: 1 }}
      />
    ),
    ssr: false,
  }
);

const DashboardCarousel = dynamic(
  () => import("@/components/dashboard/DashboardCarousel"),
  {
    loading: () => (
      <Skeleton
        animation="wave"
        variant="rectangular"
        height={313}
        sx={{ mr: 1, width: "100%" }}
      />
    ),

    ssr: false,
  }
);


const PersonIconDynamic = dynamic(() => import("@mui/icons-material/Person"), {
  loading: () => (
    <Skeleton animation="wave" variant="circular" width={64} height={64} />
  ),
  ssr: false,
});

const DashboardAside = dynamic(
  () => import("@/components/dashboard/DashboardAside"),
  {
    loading: () => (
      <div style={{ width: "100%" }}>
        <Skeleton
          animation="wave"
          variant="rectangular"
          sx={{ mr: 1, width: "100%", height: "100vh" }}
        />
      </div>
    ),

    ssr: false,
  }
);

const overRide = () => ({
  display: "block",
  margin: "0 auto",
});

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

  const { dashboardData } = useContext(DashboardApi);

  const [pageStatus, setPageStatus] = useState(null);
  const router = useRouter();


  useEffect(() => {
    if (!dataUser) {
      router.push("/login");
    } else {
      if (dataUser.data.activation == 0) {
        router.push("/dashboard/idinity");
      } else {
      }
    }
  }, [router]);

  const mobile = useMediaQuery("(max-width:540px)");
  return dataUser ? (
    <>
      {dataUser.data.activation == 1 ? (
        <>
          <DashboardAside />
          <div className="sm:col-span-4 col-span-5 grid sm:gap-4 gap-2 grid-cols-1 grid-rows-[max-content_max-content_max-content_max-content]">
            {mobile && (
              <div className="rounded-lg flex flex-col items-center p-4">
                <div
                  className="p-2 rounded-full border-theme border mb-2"
                  style={{ width: "82px", height: "82px" }}
                >
                  <PersonIconDynamic sx={{ fontSize: "4rem" }} />
                </div>
                <p className="mb-2">
                  {dataUser ? `${dataUser.data.first_name} ${dataUser.data.last_name}` : ""}
                </p>
                <p className="text-xs text-stone-400">
                  {dataUser ? dataUser.data.mobile : ""}
                </p>
              </div>
            )}
            <div className="grid grid-cols-3 gap-2 border rounded-lg h-fit sm:p-11 p-4 place-items-center">
              <div className="flex sm:flex-row flex-col items-center">
                {mobile ? (
                  <>
                    <Badge
                      badgeContent={
                        dashboardData ? dashboardData.process_count : 0
                      }
                      color="primary"
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                    >
                      <Image src={box} alt="box" />
                    </Badge>
                    <p className="text-xs">جاری</p>
                  </>
                ) : (
                  <>
                    <Image src={box} alt="box" />
                    <div className="mr-4">
                      <p className="font-bold sm:text-base text-xs">
                        {dashboardData ? dashboardData.process_count : 0} سفارش
                      </p>
                      <p className="text-xs">جاری</p>
                    </div>
                  </>
                )}
              </div>
              <div className="flex sm:flex-row flex-col items-center">
                {mobile ? (
                  <>
                    <Badge
                      badgeContent={
                        dashboardData ? dashboardData.delivered_count : 0
                      }
                      color="primary"
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                    >
                      <Image src={deliveryBox} alt="deliveryBox" />
                    </Badge>
                    <p className="text-xs"> تحویل شده</p>
                  </>
                ) : (
                  <>
                    <Image src={deliveryBox} alt="deliveryBox" />
                    <div className="mr-4">
                      <p className="font-bold sm:text-base text-xs">
                        {dashboardData ? dashboardData.delivered_count : 0}{" "}
                        سفارش
                      </p>
                      <p className="text-xs"> تحویل شده</p>
                    </div>
                  </>
                )}
              </div>
              <div className="flex sm:flex-row flex-col items-center">
                {mobile ? (
                  <>
                    <Badge
                      badgeContent={
                        dashboardData ? dashboardData.returned_count : 0
                      }
                      color="primary"
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                    >
                      <Image src={returnBox} alt="مرجوع شده" />
                    </Badge>
                    <p className="text-xs">مرجوع شده</p>
                  </>
                ) : (
                  <>
                    <Image src={returnBox} alt="returnBox" />
                    <div className="mr-4">
                      <p className="font-bold sm:text-base text-xs">
                        {dashboardData ? dashboardData.returned_count : 0} سفارش
                      </p>
                      <p className="text-xs">مرجوع شده</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {dashboardData
              ? dashboardData.process_orders.length > 0 &&
                dashboardData.process_orders.map((items) => (
                  <DashboardCarousel
                    key={items.id}
                    title="کالاهای سفارش جاری"
                    data={items.order_items}
                  />
                ))
              : null}
          </div>
        </>
      ) : (
        <div className="w-full my-4 flex justify-center flex-col items-center leading-10 col-span-5">
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
        </div>
      )}
    </>
  ) : (
    <div className="w-full flex justify-center items-center h-screen col-span-5">
      <PuffLoader
        color={"rgb(255 121 0 / 49%)"}
        loading={true}
        cssOverride={overRide}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Page;
