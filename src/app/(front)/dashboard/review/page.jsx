"use client";
import React, { useEffect, useState } from "react";
import ReviewCard from "@/components/dashboard/ReviewCard";
import styles from "@/assets/css/dashboard/Dashboard.module.css";
import ReviewModes from "@/components/dashboard/ReviewModes";
import axios from "@/lib/axios";
import PuffLoader from "react-spinners/PuffLoader";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Skeleton from "@mui/material/Skeleton";
import TabCustom from "@/components/constantElements/TabCustom";

const PsychologyAltIcon = dynamic(
  () => import("@mui/icons-material/PsychologyAlt"),
  {
    ssr: false,
    loading: () => (
      <Skeleton variant="circular" animation="wave" width={100} height={100} />
    ),
  }
);

const overRide = () => ({
  display: "block",
  margin: "0 auto",
});

const Button = dynamic(() => import("@mui/material/Button"), {
  ssr: false,
});

const Page = () => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL_IMAGE;
  const router = useRouter();
  const [userStatus, setUserStatus] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const fetchedUser = await axios.get("api/user");
        const fetchedData = await axios.get("api/dashboard/comment");
        setUserStatus(fetchedUser.data);
        if (fetchedUser.data.activation == 1) {
          setCards(fetchedData.data.data.products.data);
        } else {
          router.push("/dashboard/idinity");
        }
      } catch (error) {
        router.push("/login");
      }
    };
    getUser();
  }, [router]);
  const [page, setPage] = useState(0);
  return userStatus ? (
    <>
      {userStatus.activation == 1 ? (
        <>
          <TabCustom
            value={["در انتظار نقد و بررسی", "نقد و بررسی های من", "سوالات من"]}
            selected={page}
            onChange={(event, newValue) => setPage(newValue)}
          />
          {page === 0 ? (
            <>
              {cards.length > 0 && (
                <>
                  <h6 className="sm:p-4 p-2">درباره این کالا ها نظری دارید؟</h6>
                  <div className={styles.cards_container}>
                    {cards.map((reviewItems) => (
                      <ReviewCard
                        key={reviewItems.id}
                        image={`${backendUrl}${reviewItems.image.indexWeb.medium}`}
                        name={reviewItems.alt_name}
                        alt={reviewItems.alt_name}
                        slug={`/${reviewItems.category_slug}/${reviewItems.slug}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : page === 1 ? (
            <div className={styles.notification_container}>
              {/* <ReviewModes position="pending" />
              <ReviewModes position="delivered" />
              <ReviewModes position="canceled" /> */}
            </div>
          ) : page === 2 ? (
            <div className={styles.notification_container}>
              {/* <ReviewModes position="delivered" /> */}
            </div>
          ) : null}
        </>
      ) : (
        <div className="w-full my-4 flex justify-center flex-col items-center leading-10">
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
