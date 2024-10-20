"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../../public/images/Logos/logo2.jpg";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { SnakebarContext } from "@/context/snakebar";
import TextFieldCustom from "@/components/constantElements/TextFieldCustom";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import { LoginContext } from "@/context/LoginContext";



import { Skeleton } from "@mui/material";
import dynamic from "next/dynamic";
import ButtonCustom from "../../../components/constantElements/ButtonCustom";

const Box = dynamic(() => import("@mui/material/Box"), {
  ssr: false,
  loading: () => (
    <Skeleton
      variant="rounded"
      sx={{ width: "100%" }}
      width={350}
      height={172.59}
    />
  ),
});

const Page = () => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [focused, setFocused] = useState("");
  const {setToken , setPhone} = useContext(LoginContext)
  const inputRef = useRef();
  const [user , setUser] = useState(null)
  useEffect(()=>{
    const getUser = async () => {
      try {
        const fetchedUser = await axios.get("api/user");
        router.push('/dashboard')
      } catch (error) {
        
      }
    };
    getUser();
  },[router])
  const { setOpenAlarm, setModes, setMessage, setDuration } = useContext(SnakebarContext);
  const ColorButtonOrder = styled(Button)(({ theme }) => ({
    color: "#fff",
    padding: ".5rem 0",
    width: "100%",
    "@media (max-width: 540px)": {
      width: "100%",
    },
    backgroundColor: "var(--theme-color) !important",
    "&:hover": {
      backgroundColor: "var(--theme-color)",
    },
  }));
  const validateHandler = (e) => {
    if (phoneNumber.split("")[0] != "0" || phoneNumber.split("")[1] != "9") {
      setOpenAlarm(true);
      setModes("error");
      setMessage("فرمت شماره تماس نامعتبر است");
    }
  };
  const inputValue = (e) => {
    const regex = /^[0-9\b]+$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setPhoneNumber(e.target.value);
    }
  };
  const focusHandler = (e) => {
    setFocused(phoneNumber);
  };
  const submitForm = async (event) => {
    event.preventDefault();
    axios.get("/sanctum/csrf-cookie");
    axios.post('api/login' , {
      login_value:phoneNumber,
    }).then((response)=>{
      setPhone(phoneNumber);
      setToken(response.data.data.token);
      router.push('/verify-login')
    })
  };
  return (
    <section className="w-full h-screen flex justify-center items-center">
      <div className={`p-4 w-96 rounded-lg flex flex-col items-center border`}>
        <Link href="/">
          <Image
            src={logo}
            alt="logo"
            width={150}
            height={120}
            className="mb-5"
          />
        </Link>
        <h2 className="w-full mb-5 font-bold">ورود | ثبت نام</h2>
        <form
          onSubmit={submitForm}
          className="w-full"
        >
          <p className={`text-xs mb-2`}>سلام!</p>
          <label htmlFor="phoneNumber" className="text-xs mb-4 block">
            لطفا شماره تماس خود را وارد نمایید
          </label>
          
          <TextFieldCustom
            onChange={(event) => setPhoneNumber(event.target.value)}
            size="small"
            fullWidth
            type="number"
            className="mb-4"
            required={true}
            value={phoneNumber}
          />
          <ButtonCustom text="ورود" fullWidth />
        </form>
        <p className={`text-[10px] text-center my-4`}>
          ورود شما به معنای پذیرش
          <Link href={"/login"} className={`text-[#008eb2]`}>
            {" "}
            شرایط دی سی ای کالا{" "}
          </Link>
          و
          <Link href={"/login"} className={`text-[#008eb2]`}>
            {" "}
            قوانین حریم ‌خصوصی{" "}
          </Link>
          است
        </p>
      </div>
    </section>
  );
};

export default Page;