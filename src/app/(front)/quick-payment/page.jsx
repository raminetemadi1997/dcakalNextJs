"use client";
import React, { useContext, useState } from "react";
import BottonCustom from "@/components/constantElements/ButtonCustom";
import Logo from "../../../../public/images/Logos/logo2.png";
import Image from "next/image";
import dynamic from "next/dynamic";
import Skeleton from "@mui/material/Skeleton";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";
import { SnakebarContext } from "@/context/snakebar";

const TextFieldCustom = dynamic(
  () => import("@/components/constantElements/TextFieldCustom"),
  {
    ssr: false,
    loading: () => (
      <div className="h-10 bg-gray-200 rounded-lg dark:bg-gray-700 w-full animate-pulse"></div>
    ),
  }
);

const Page = () => {
  const router = useRouter();
  const [price, setPrice] = useState(null);
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const { setOpenAlarm, setModes, setMessage, setDuration } =
    useContext(SnakebarContext);

  function submitHandler(event) {
    event.preventDefault();
    axios.get("/sanctum/csrf-cookie");
    axios
      .post("api/quick-payment/submit-payment", {
        amount: price,
        name: name,
        mobile: phone,
      })
      .then((response) => {
        if (response.data.status) {
          router.push(response.data.redirect);
        } else {
          setOpenAlarm(true);
          setModes("error");
          setMessage(response.data.message);
        }
      }).catch(()=>{

      })
      ;
  }

  return (
    <section className="flex w-full flex-col justify-center items-center h-screen gap-8">
      <Image src={Logo} alt="logo" />
      <form
        onSubmit={submitHandler}
        className="border rounded-lg w-1/5 p-4 flex items-center justify-center gap-8 flex-col"
        style={{ boxShadow: "4px 4px 4px 0px #00000026" }}
      >
        <div> لطفا مبلغ دلخواه را وارد نمائید </div>
        <TextFieldCustom
          label="مبلغ دلخواه"
          fullWidth
          type="number"
          onChange={(event) => setPrice(event.target.value)}
          value={price}
        />
        <TextFieldCustom
          label="نام و نام خانوادگی"
          fullWidth
          onChange={(event) => setName(event.target.value)}
          value={name}
        />
        <TextFieldCustom
          label="شماره موبایل"
          fullWidth
          type="number"
          onChange={(event) => setPhone(event.target.value)}
          value={phone}
        />
        <BottonCustom text="پرداخت" color="#555555" />
      </form>
    </section>
  );
};

export default Page;
