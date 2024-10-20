"use client";
import React, { useEffect, useState, useContext } from "react";
import DashboardTabs from "@/components/dashboard/DashboardTabs";
import styles from "@/assets/css/dashboard/Dashboard.module.css";
import Title from "@/components/main/Title";
import DashboardTextfield from "@/components/dashboard/DashboardTextfield";
import DashboardCheckbox from "@/components/dashboard/DashboardCheckbox";
import UploadImage from "@/components/UploadImage";
import TextFieldCustom from "@/components/constantElements/TextFieldCustom";
import RadioCustom from "@/components/constantElements/RadioCustom";
import PuffLoader from "react-spinners/PuffLoader";
import { SnakebarContext } from "@/context/snakebar";

//hook
import ButtonCustom from "@/components/constantElements/ButtonCustom";
import axios from "@/lib/axios";
import { ResetApi } from "@/context/ResetApiContext";

const overRide = () => ({
  display: "block",
  margin: "0 auto",
});

const Page = () => {
  const { setOpenAlarm, setModes, setMessage, setDuration } =
    useContext(SnakebarContext);
  const { setReset } = useContext(ResetApi);
  const [userStatus, setUserStatus] = useState(null);
  const [nationalCode, setNationalCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [family, setFamily] = useState();
  const [gender, setGender] = useState();
  const [checkedPassword, setCheckedPassword] = useState(true);

  const [passwordStatus, setPasswordStatus] = useState({
    old_password: null,
    password: null,
    password_confirmation: null,
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        const fetchedUser = await axios.get("api/dashboard/user-info");
        setUserStatus(fetchedUser.data.data);
        setEmail(fetchedUser.data.data.user.email);
        setName(fetchedUser.data.data.user.first_name);
        setFamily(fetchedUser.data.data.user.last_name);
        setGender(fetchedUser.data.data.user.gender);
        setPhoneNumber(fetchedUser.data.data.user.mobile);
        setCheckedPassword(fetchedUser.data.data.user.password);
      } catch {
        setUserStatus(null);
      }
    };
    getUser();
  }, []);


  

  

  const submitForm = async (event) => {
    event.preventDefault();
    axios.get("/sanctum/csrf-cookie");
    axios
      .post("api/dashboard/user-info", {
        gender: gender,
        first_name: name,
        last_name: family,
        national_code: nationalCode,
        email: email,
        mobile: phoneNumber,
      })
      .then((response) => {
        setReset(response.data.data.user);
        setOpenAlarm(true);
        setModes("success");
        setMessage("اطلاعات شما با موفقیت ثبت شد");
      })
      .catch((error) => {
        setOpenAlarm(true);
        setModes("error");
        setMessage("مشکل در ثبت اطلاعات");
      });
  };

  const submitPassword = async (event) => {
    event.preventDefault();
    axios.get("/sanctum/csrf-cookie");
    axios
      .post("api/dashboard/change-password", {
        old_password: passwordStatus.old_password,
        password: passwordStatus.old_password,
        password_confirmation: passwordStatus.password_confirmation,
      })
      .then((response) => {
        setReset(response.data.data.user);
        setOpenAlarm(true);
        setModes("success");
        setMessage("اطلاعات شما با موفقیت ثبت شد");
      })
      .catch((error) => {
        setOpenAlarm(true);
        setModes("error");
        setMessage("مشکل در ثبت اطلاعات");
      });
  };

  return (
    <>
      {userStatus ? (
        <>
          <DashboardTabs title={["اطلاعات حساب کاربری"]} />
          <form className={styles.content} onSubmit={submitForm}>
            <div>
              <Title titleValue="اطلاعات شخصی" position="head" />
              <RadioCustom
                values={["آقا", "خانم"]}
                size="small"
                label="عنوان اجتماعی"
                onChange={(event) => setGender(event.target.value)}
                selected={gender ? gender : 0}
              />
              <div className={styles.input_container}>
                <TextFieldCustom
                  size="small"
                  label="نام"
                  required={true}
                  onChange={(event) => setName(event.target.value)}
                  value={name ? name : ""}
                />
                <TextFieldCustom
                  size="small"
                  label="نام خانوادگی"
                  required={true}
                  onChange={(event) => setFamily(event.target.value)}
                  value={family ? family : ""}
                />
                <TextFieldCustom
                  size="small"
                  label="کد ملی"
                  type="number"
                  onChange={(event) => setNationalCode(event.target.value)}
                  value={nationalCode}
                />
                <UploadImage type="profile" />
              </div>
            </div>

            <div>
              <Title titleValue="اطلاعات تماس" position="head" />
              <div className={styles.input_container}>
                <TextFieldCustom
                  size="small"
                  label="ایمیل"
                  required={true}
                  onChange={(event) => setEmail(event.target.value)}
                  value={email ? email : ""}
                />
                <TextFieldCustom
                  size="small"
                  label="شماره همراه"
                  type="number"
                  required={true}
                  onChange={(event) => setPhoneNumber(event.target.value)}
                  value={phoneNumber ? phoneNumber : ""}
                />
              </div>
              <DashboardCheckbox value="دریافت پیشنهادات از همکاران ما" />
              <ButtonCustom
                variant="contained"
                text="ذخیره"
                justifyContent="end"
              />
            </div>
          </form>
          <form className={styles.content} onSubmit={submitPassword}>
            <div>
              <Title titleValue="تغییر رمز عبور" position="head" />
              <div className={styles.input_container}>
                {checkedPassword && (
                  <TextFieldCustom
                  type='password'
                    className="col-span-2"
                    label="رمز عبور فعلی"
                    onChange={(event) =>
                      setPasswordStatus((prev) => ({
                        ...prev,
                        old_password:
                          event.target.value.length > 0
                            ? event.target.value
                            : null,
                      }))
                    }
                    value={passwordStatus.old_password}
                  />
                )}
                <TextFieldCustom
                type='password'
                  label="رمز عبور جدید "
                  onChange={(event) =>
                    setPasswordStatus((prev) => ({
                      ...prev,
                      password:
                        event.target.value.length > 0
                          ? event.target.value
                          : null,
                    }))
                  }
                  value={passwordStatus.password}
                />
                <TextFieldCustom
                type='password'
                  label="تکرار رمز عبور جدید"
                  onChange={(event) =>
                    setPasswordStatus((prev) => ({
                      ...prev,
                      password_confirmation:
                        event.target.value.length > 0
                          ? event.target.value
                          : null,
                    }))
                  }
                  value={passwordStatus.password_confirmation}
                />
              </div>
              <ButtonCustom
                variant="contained"
                text="ذخیره"
                justifyContent="end"
              />
            </div>
          </form>
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
      )}
    </>
  );
};

export default Page;
