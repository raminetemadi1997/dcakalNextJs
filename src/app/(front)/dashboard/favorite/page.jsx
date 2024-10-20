"use client";
import React, { useContext, useEffect, useState } from "react";
import DashboardTabs from "@/components/dashboard/DashboardTabs";
import Card from "@/components/Card";
import styles from "@/assets/css/dashboard/Dashboard.module.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Skeleton from "@mui/material/Skeleton";
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
  const slug = usePathname();
  const router = useRouter();
  const [favorites, setFavorites] = useState([]);
  const [changeHandler , setChangeHandler] = useState();
  
  useEffect(() => {
    if (dataUser) {
      if (dataUser.data.activation == 0) {
        router.push("/dashboard/idinity");
      }else{
        axios.get(`api${slug}`).then((response) => {
          setFavorites(response.data.data.favorites.data);
        }).catch(()=>{
    
        })
      }
    }else{
      router.push("/dashboard/idinity");
    }
  }, [dataUser, router, slug , changeHandler]);
  const data =(data)=>{
    setChangeHandler(data);
  }
  return dataUser && dataUser.data.activation == 1 ? (
    <>
      <DashboardTabs title={["لیست علاقه مندی ها"]} />
      {favorites.length > 0 && (
        <div className={styles.cards_container}>
          {favorites.map((favorite) => (
            <Card
            data={favorite}
            key={favorite.id}
            // change={data}
            //   slug={`${favorite.category_slug && favorite.category_slug}/${favorite.slug}`}
            //   name={favorite.alt_name}
            //   alt={favorite.image_alt}
            //   image={favorite.image != null && favorite.image}
            //   id={favorite.favorite_id}
            //   type='favorite'
            />
          ))}
        </div>
      )}
    </>
  ) : (
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
  );
};

export default Page;
