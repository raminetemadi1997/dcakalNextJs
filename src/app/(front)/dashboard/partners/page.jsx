"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "@/assets/css/dashboard/Dashboard.module.css";
import UploadImage from "@/components/UploadImage";
import TextareaCustom from "@/components/constantElements/TextareaCustom";
import ButtonCustom from "@/components/constantElements/ButtonCustom";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Skeleton from "@mui/material/Skeleton";
import axios from "@/lib/axios";
import TabCustom from "@/components/constantElements/TabCustom";
import RadioCustom from "@/components/constantElements/RadioCustom";
import TextFieldCustom from "@/components/constantElements/TextFieldCustom";
import uploadDegree from "../../../../../public/images/Dashboard/DegreeIcon.png";
import { SnakebarContext } from "@/context/snakebar";
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
  const router = useRouter();
  // address
  const [textArea, setTextArea] = useState(null);
  //whatsapp
  const [whatsApp, setWhatsApp] = useState(0);
  const [whatsAppValue , setWhatsAppValue] = useState(null)
  //sms status
  const [messageValue, setMessageValue] = useState(0);
  //image 
  const [imageName , setImageName] = useState(null)
  const { setOpenAlarm, setModes, setMessage, setDuration } =
  useContext(SnakebarContext);
  //c-worker data
  const [coWorker , setCoWorker] = useState({
    shopAddress:null,
    whatsappMobile :null,
    saleSmsStatus :null,
    imagePath:null,
  })
  
  useEffect(() => {
    if (dataUser) {
      if (dataUser.data.activation == 0) {
        router.push("/dashboard/idinity");
      } else {
        axios.get("api/dashboard/co-worker").then((response) => {
          setTextArea(response.data.data.user.shop_address)
          setWhatsAppValue(response.data.data.user.whatsapp_mobile)
        })
       
      }
    }else{
      router.push("/dashboard/idinity");
    }
  }, [dataUser, router ]);

  const submitHandler =(event)=>{
    event.preventDefault()
    axios.get("/sanctum/csrf-cookie");
    axios.post("api/dashboard/co-worker" , {
      shop_address:textArea,
      whatsapp_mobile:whatsAppValue,
      sale_sms_status:messageValue,
      image:imageName,
    }).then((response) => {
    }) .catch((error)=>{
      setMessage(error.response.data.message);
      setModes('error')
      setDuration(3000)
      setOpenAlarm(true)
    });
  }

  const uploadHandler=(event)=>{
    setImageName(event.target.files[0]);
    event.target.files.length && setCoWorker(prev => ({...prev , imagePath:URL.createObjectURL(event.target.files[0])}))
  }

  return dataUser && dataUser.data.activation == 1 ? (
    <>
      {/* <DashboardTabs title={["اهراز هویت"]} /> */}
      <TabCustom value={["اهراز هویت"]} />

      <div className={styles.content}>
        <form action="" onSubmit={submitHandler}>
          <div className="grid grid-cols-1 gap-8 pb-8 border-b mb-8 mt-4">
            <TextareaCustom
              fullWidth
              required={true}
              size="small"
              label="آدرس فروشگاه را وارد کنید"
              onChange={(event) => setTextArea(event.target.value)}
              value={textArea}
            />
            <UploadImage 
            type="degree" 
            // onChange={url=>url.target.files.length && setCoWorker(prev => ({...prev , imagePath:URL.createObjectURL(url.target.files[0])}))}
            onChange={uploadHandler}
            value={coWorker.imagePath ? coWorker.imagePath : uploadDegree}
            />
          </div>
          
          <div className="grid grid-cols-1 gap-8">
            <RadioCustom
              values={["بله", "خیر"]}
              label="آیا مایل به دریافت پیشنهادات تخفیف دار از طریق واتس اپ هستید؟"
              selected={whatsApp}
              onChange={(event) => setWhatsApp(event.target.value)}
            />
            {whatsApp == 0 &&
            <TextFieldCustom
              size="small"
              label="شمار همراه"
              type="number"
              onChange={(event) => setWhatsAppValue(event.target.value)}
              value={whatsAppValue}
              // focused={postalCode ? true : false}
              className='w-fit'
            />
}

            <RadioCustom
              values={["بله", "خیر"]}
              label="آیا مایل به دریافت پیامک های فروش ویژه هستید؟"
              selected={messageValue}
              onChange={(event) => setMessageValue(event.target.value)}
            />


       
            <ButtonCustom text="ذخیره تغییرات" />
          </div>
        </form>
      </div>
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
