"use client";
import React, { useEffect, useState } from "react";
import styles from "@/assets/css/dashboard/Dashboard.module.css";
import Orders from "@/components/dashboard/Orders";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Skeleton from "@mui/material/Skeleton";
import axios from "@/lib/axios";
import { usePathname } from "next/navigation";
import TabCustom from "@/components/constantElements/TabCustom";
import PuffLoader from "react-spinners/PuffLoader";

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
  const slug = usePathname();
  const router = useRouter();
  const [processOrder, setProcessOrder] = useState([]);
  const [deliveredOrder, setDeliveredOrder] = useState([]);
  const [canceledOrder, setCanceledOrder] = useState([]);
  const [returnedOrder, setReturnedOrder] = useState([]);
  const [userStatus, setUserStatus] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const fetchedUser = await axios.get("api/user");
        const fetchedData = await axios.get(`api${slug}`);
        if (fetchedUser.data.activation == 1) {
          setUserStatus(fetchedUser.data);
          setProcessOrder(fetchedData.data.data.process_orders);
          setDeliveredOrder(fetchedData.data.data.delivered_orders);
          setCanceledOrder(fetchedData.data.data.canceled_orders);
          setReturnedOrder(fetchedData.data.data.returned_orders);
        } else {
          setUserStatus(null);
          router.push("/dashboard/idinity");
        }
      } catch (error) {
        router.push("/login");
      }
    };
    getUser();
  }, [router, slug]);

  const overRide = () => ({
    display: "block",
    margin: "0 auto",
  });

  const [page, setPage] = useState(0);

  return userStatus ? (
    <>
    {
      userStatus.activation == 1 ?
      <>
        <TabCustom
          value={["جاری", "تحویل داده شده", "مرجوع شده", "کنسل شده"]}
          onChange={(event, newValue) => setPage(newValue)}
          selected={page}
        />
        <div className={styles.order_container}>
          {page == 0
            ? processOrder.length > 0 && (
                <>
                  {processOrder.map((orders) => (
                    <Orders position="pending" data={orders} key={orders.id} />
                  ))}
                </>
              )
            : page == 1
            ? deliveredOrder.length > 0 && (
                <>
                  {deliveredOrder.map((orders) => (
                    <Orders position="delivered" data={orders} key={orders.id} />
                  ))}
                </>
              )
            : page == 2
            ? returnedOrder.length > 0 && (
                <>
                  {returnedOrder.map((orders) => (
                    <Orders position="returned" data={orders} key={orders.id} />
                  ))}
                </>
              )
            : page == 3
            ? canceledOrder.length > 0 && (
                <>
                  {canceledOrder.map((orders) => (
                    <Orders position="canceled" data={orders} key={orders.id} />
                  ))}
                </>
              )
            : null}
        </div>
      </>
      :
      <div className="w-full my-4 flex justify-center flex-col items-center leading-10">
      <PsychologyAltIcon sx={{ fontSize: 100, color: "var(--theme-color)" }} />
      <h5 className="text-xl font-bold">اطلاعات شما کامل نیست</h5>
      <h5>درصورتی که به بخش حساب کاربری هدایت نشدید دکمه زیر کلیک کنید</h5>
      <Button sx={{ backgroundColor: "var(--theme-color) !important" }}>
        <Link className="text-black" href={"/dashboard/idinity"}>
          {" "}
          تکمیل اطلاعات{" "}
        </Link>
      </Button>
      </div>
    }
      
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
