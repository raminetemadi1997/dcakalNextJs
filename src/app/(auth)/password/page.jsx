"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../../public/images/Logos/logo2.png";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { SnakebarContext } from "@/context/snakebar";
import { Skeleton } from "@mui/material";
import dynamic from "next/dynamic";
import { SettingApi } from "@/context/api/Setting";

const Box = dynamic(() => import("@mui/material/Box"), {
  ssr: false,
  loading: () => (
    <Skeleton
      variant="rounded"
      sx={{ width: "100%" }}
      width={350}
      height={157}
    />
  ),
});

const IconButton = dynamic(() => import("@mui/material/IconButton"), {
  ssr: false,
  loading: () => <Skeleton variant="circular" width={40} height={40} />,
});

const Page = () => {
  const { dataUser } = useContext(SettingApi);
  const router = useRouter();
  
  useEffect(()=>{
    if (dataUser) {
      router.push('/dashboard')
    }
  },[dataUser , router])
  const { setOpenAlarm, setModes, setMessage, setDuration } =
    useContext(SnakebarContext);
  const [showPassword, setShowPassword] = useState(false);
  const [registerData, setRegisterData] = useState({
    password: "",
    lengthCharPassword: "",
  });
  const [varify, setVarify] = useState("");
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

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const passwordRef = useRef();

  const passwordHandler = (e) => {
    setRegisterData((prev) => ({
      ...prev,
      password: e.target.value,
    }));
  };

  const lengthHandler = () => {
    setRegisterData((prev) => ({
      ...prev,
      lengthCharPassword: registerData.password,
    }));
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
        <Link href='/'>
          <Image
            src={logo}
            alt="logo"
            width={150}
            height={120}
            className="mb-5"
          />
        </Link>
        <h2 className="w-full mb-5 font-bold">رمز عبور را وارد کنید</h2>
        <Box
          component="form"
          sx={{
            width: "100%",
          }}
          noValidate
          autoComplete="off"
        >
          <label
            htmlFor="password"
            className="text-xs mb-4 block"
            style={{
              color: `${
                registerData.lengthCharPassword.length >= 1 &&
                registerData.lengthCharPassword.length < 8
                  ? "red"
                  : registerData.lengthCharPassword.length >= 8
                  ? "green"
                  : "rgba(0, 0, 0, 0.87)"
              }`,
            }}
          >
            رمز عبور باید شامل 8 حرف باشد
          </label>
          <FormControl
            fullWidth
            required
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "var(--theme-color)",
                },
                "& fieldset": {
                  borderColor: `${
                    registerData.lengthCharPassword.length >= 1 &&
                    registerData.lengthCharPassword.length < 8
                      ? "red"
                      : registerData.lengthCharPassword.length >= 8
                      ? "green"
                      : null
                  }`,
                },
              },
              "& label.Mui-focused": {
                color: "var(--theme-color)",
              },
              "& input[type=number]": {
                "-moz-appearance": "textfield",
              },
              "& input[type=number]::-webkit-outer-spin-button": {
                "-webkit-appearance": "none",
                margin: 0,
              },
              "& input[type=number]::-webkit-inner-spin-button": {
                "-webkit-appearance": "none",
                margin: 0,
              },
              mb: ".25rem",
            }}
            variant="outlined"
          >
            <InputLabel
              sx={{
                color: `${
                  registerData.lengthCharPassword.length >= 1 &&
                  registerData.lengthCharPassword.length < 8
                    ? "red"
                    : registerData.lengthCharPassword.length >= 8
                    ? "green"
                    : null
                }`,
              }}
              htmlFor="outlined-adornment-password"
            >
              رمز عبور
            </InputLabel>
            <OutlinedInput
              onKeyUp={passwordHandler}
              onBlur={lengthHandler}
              inputRef={passwordRef}
              id="password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    size="small"
                  >
                    {showPassword ? (
                      <VisibilityOff
                        sx={{
                          fontSize: 20,
                          color: `${
                            registerData.lengthCharPassword.length >= 1 &&
                            registerData.lengthCharPassword.length < 8
                              ? "red"
                              : registerData.lengthCharPassword.length >= 8
                              ? "green"
                              : null
                          }`,
                        }}
                      />
                    ) : (
                      <Visibility
                        sx={{
                          fontSize: 20,
                          color: `${
                            registerData.lengthCharPassword.length >= 1 &&
                            registerData.lengthCharPassword.length < 8
                              ? "red"
                              : registerData.lengthCharPassword.length >= 8
                              ? "green"
                              : null
                          }`,
                        }}
                      />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              label="رمز عبور"
            />
          </FormControl>
          <div className="flex justify-between">
            <Link href={"/verify-login"}>
              <Button
                sx={{
                  mb: ".75rem",
                  color: "var(--theme-color)",
                  fontSize: "12px",
                }}
              >
                ورود با رمز یکبار مصرف
              </Button>
            </Link>
            <Link href={"/forget-password"}>
              <Button
                sx={{
                  mb: ".75rem",
                  color: "var(--theme-color)",
                  fontSize: "12px",
                }}
              >
                فراموشی رمز عبور
              </Button>
            </Link>
          </div>
          <ColorButtonOrder
            variant="login"
            type="submit"
            // onClick={validateHandler}
            // disabled={phoneNumber.length === 11 ? false : true}
          >
            <p className={`text-sm`}>تایید</p>
          </ColorButtonOrder>
        </Box>
      </div>
    </section>
  );
};

export default Page;
