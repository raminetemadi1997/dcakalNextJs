"use client";
import React, { Fragment, useContext, useEffect, useState } from "react";
import DashboardTabs from "@/components/dashboard/DashboardTabs";
import styles from "@/assets/css/dashboard/Dashboard.module.css";
import DashboardDiscount from "@/components/dashboard/DashboardDiscount";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Skeleton from '@mui/material/Skeleton';
import axios from "@/lib/axios";
import { usePathname } from "next/navigation";
import { SettingApi } from "@/context/api/Setting";

const PsychologyAltIcon = dynamic(() => import("@mui/icons-material/PsychologyAlt"), {
  ssr: false,
  loading:()=><Skeleton variant="circular" animation='wave'  width={100} height={100}/>
});

const Button = dynamic(() => import("@mui/material/Button"), {
  ssr: false,
});

const Page = () => {
  const { dataUser } = useContext(SettingApi);
  const [copans , setCopans] = useState([])
  const [commonCopans , setCommonCopans] = useState([])
  const slug = usePathname();
  const router = useRouter();
  useEffect(() => {
    if (dataUser) {
      if (dataUser.data.activation == 0) {
        router.push("/dashboard/idinity");
      }else{
        axios.get(`api${slug}`).then((response) => {
          setCopans(response.data.data.copans);
          setCommonCopans(response.data.data.common_copan);
        });
      }
    }else{
      router.push("/dashboard/idinity");
    }
    
  }, [dataUser, router , slug]);
  const [page, setPage] = useState();
  const selected = (data) => {
    setPage(data);
  };
  
  return dataUser && dataUser.data.activation == 1 ? (
    <>
      <DashboardTabs
        title={["تخفیف های من ", "تخفیف ها"]}
        selectValue={selected}
      />
      <div className={styles.content}>
        <div className="grid grid-cols-1 gap-4">
          {page == 0 ? (
            copans.length > 0 &&
            copans.map(copan=>(
              <Fragment key={copan.id}>
                <DashboardDiscount value={copan.amount} code={copan.code} expiredDiscount={Math.floor((new Date(copan.end_date) - new Date()) / (1000 * 60 * 60 *24))}  />
              </Fragment>
            ))
          ) : page == 1 ? (
            commonCopans.length > 0 &&
            commonCopans.map(common=>(
              <Fragment key={common.id}>
                <DashboardDiscount value={common.amount} code={common.code} expiredDiscount={Math.floor((new Date(common.end_date) - new Date()) / (1000 * 60 * 60 *24))} />
              </Fragment>
            ))
           
          ) : null}
        </div>
      </div>
    </>
  ) : (
    <div className="w-full my-4 flex justify-center flex-col items-center leading-10">
      <PsychologyAltIcon sx={{fontSize:100 , color:'var(--theme-color)'}}/>
      <h5 className="text-xl font-bold">اطلاعات شما کامل نیست</h5>
      <h5>درصورتی که به بخش حساب کاربری هدایت نشدید دکمه زیر کلیک کنید</h5>
      <Button sx={{backgroundColor:'var(--theme-color) !important'}}>
        <Link className="text-black" href={'/dashboard/idinity'}> تکمیل اطلاعات </Link>
      </Button>
    </div>
  )
};

export default Page;
