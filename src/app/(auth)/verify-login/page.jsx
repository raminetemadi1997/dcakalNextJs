"use client";
import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  forwardRef,
} from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../../public/images/Logos/logo2.png";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { SnakebarContext } from "@/context/snakebar";
import VarifyCountDown from "@/auth/VerifyCountDown";
import axios from "@/lib/axios";
import { LoginContext } from "@/context/LoginContext";
import { Skeleton } from "@mui/material";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import TextFieldCustom from "@/components/constantElements/TextFieldCustom";
import ButtonCustom from "@/components/constantElements/ButtonCustom";
import { ResetApi } from "@/context/ResetApiContext";

const Box = dynamic(() => import("@mui/material/Box"), {
  ssr: false,
  loading: () => (
    <Skeleton
      variant="rounded"
      sx={{ width: "100%" }}
      width={350}
      height={197}
    />
  ),
});
const IconButton = dynamic(() => import("@mui/material/IconButton"), {
  ssr: false,
  loading: () => <Skeleton variant="circular" width={40} height={40} />,
});

const Page = () => {
  const formRef = useRef(null);
  const router = useRouter();
  const {  setReset } = useContext(ResetApi);
  const { token, phone } = useContext(LoginContext);
  const { setOpenAlarm, setModes, setMessage, setDuration } =
    useContext(SnakebarContext);
  useEffect(() => {
    const getUser = async () => {
      try {
        const fetchedUser = await axios.get("api/user");
        router.push("/dashboard");
      } catch (error) {}
    };
    getUser();
  }, [router]);
  const [verify, setVerify] = useState("");
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
  const inputValue = (e) => {
    const regex = /^[0-9\b]+$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setVarify(e.target.value);
    }
  };

  const submitForm = async (event) => {
    event.preventDefault();
    axios.get("/sanctum/csrf-cookie");
    axios
      .post(`api/login-confirm/${token}`, {
        otp: verify,
      })
      .then((response) => {
        router.push(`/${response.data.redirect}`);
        setReset(response.data.redirect)
        
      })
      .catch((error) => {
        setOpenAlarm(true);
        setMessage("کد ورودی نامعتبر است");
        setDuration(3000);
        setModes("error");
      });
  };

  return (
    <section className="w-full h-screen flex justify-center items-center">
      <div className={`p-4 w-96 rounded-lg flex flex-col items-center border`}>
        <div className="w-full">
          <Link href={"/login"}>
            <IconButton>
              <ChevronRightIcon />
            </IconButton>
          </Link>
        </div>
        <Link href="/">
          <Image
            src={logo}
            alt="logo"
            width={150}
            height={120}
            className="mb-5"
          />
        </Link>
        <h2 className="w-full mb-5 font-bold">کد تایید را وارد کنید</h2>
        <form onSubmit={submitForm} ref={formRef} className="w-full">
          <label htmlFor="varifyCode" className="text-xs mb-4 block">
            کد تایید به شماره <span className="font-bold">{phone}</span>
            پیامک شد
          </label>
          <TextFieldCustom
            onChange={(event) => setVerify(event.target.value)}
            size="small"
            fullWidth
            type="number"
            className="mb-4"
            required={true}
            value={verify}
          />

          <VarifyCountDown className="mb-5" initialSeconds={250} />
          <ButtonCustom text="تایید" fullWidth />
        </form>
      </div>
    </section>
  );
};

export default Page;
