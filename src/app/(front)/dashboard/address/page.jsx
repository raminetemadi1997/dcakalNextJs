"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "@/assets/css/dashboard/Dashboard.module.css";
import dynamic from "next/dynamic";
import AddAddress from "@/components/modals/AddAddress";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Skeleton from "@mui/material/Skeleton";
import axios from "@/lib/axios";
import ButtonCustom from "@/components/constantElements/ButtonCustom";
import TabCustom from "@/components/constantElements/TabCustom";
import { SettingApi } from "@/context/api/Setting";
import { SnakebarContext } from "@/context/snakebar";
import { ResetApi } from "@/context/ResetApiContext";

const Button = dynamic(() => import("@mui/material/Button"), {
  ssr: false,
});

const PsychologyAltIcon = dynamic(
  () => import("@mui/icons-material/PsychologyAlt"),
  {
    ssr: false,
    loading: () => (
      <Skeleton variant="circular" animation="wave" width={100} height={100} />
    ),
  }
);

const Page = () => {
  const { dataUser } = useContext(SettingApi);
  const router = useRouter();
  const [addresses, setAdresses] = useState([]);
  const [provinces, setProvinces] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [onChange, setOnchange] = useState();
  const [editData, setEditData] = useState("");
  const { reset, setReset } = useContext(ResetApi);

  //snakebar context
  const { setOpenAlarm, setModes, setMessage, setDuration } =
    useContext(SnakebarContext);

  useEffect(() => {
    if (dataUser) {
      if (dataUser.data.activation == 0) {
        router.push("/dashboard/idinity");
      } else {
        axios.get("api/dashboard/address").then((response) => {
          setAdresses(response.data.data.addresses);
          setProvinces(response.data.data.provinces);
        });
      }
    } else {
      router.push("/dashboard/idinity");
    }
      
  }, [dataUser, router, onChange , reset]);

  const changeData = (data) => {
    setOnchange(data);
    setOpenModal(false);
  };
  const closeModal = () => {
    setOpenModal(false);
    setEditData(null);
  };
  const editHandler = (address) => {
    setOpenModal(true);
    setEditData(address);
  };
  const deleteHandler = (address) => {
    
    axios.get("/sanctum/csrf-cookie");
    axios.post(`api/dashboard/remove-address/${address.id}`).then((response) => {
      setReset(response.data.data);
      setMessage("آدرس شما با موفقیت حذف شد");
      setModes("error");
      setDuration(3000);
      setOpenAlarm(true)
    });
  };
  return dataUser && dataUser.data.activation == 1 ? (
    <>
      {/* <DashboardTabs title={["آدرس ها"]} /> */}
      <TabCustom value={["آدرس ها"]} />
      <div className={styles.content}>
        <ul className="mb-2 grid grid-cols-1 gap-4">
          {addresses.length > 0 &&
            addresses.map((address) => {
              return (
                <li key={address.id}>
                  <div className="flex items-center">
                    <section className="border rounded-lg w-full p-4 text-sm leading-6 flex justify-between items-start">
                      <span>
                        تحویل گیرنده: {address.recipient_name} <br />
                        تلفن همراه: {address.mobile} <br />
                        {address.phone && (
                          <>
                            تلفن ثابت: {address.phone} <br />
                          </>
                        )}
                        آدرس: {address.full_address} <br />
                        کد پستی: {address.postal_code} <br />
                      </span>
                      <div className="flex flex-col justify-between gap-2">
                        <ButtonCustom
                          text="ویرایش"
                          variant="text"
                          onClick={() => editHandler(address)}
                        />
                        <ButtonCustom
                          text="حذف"
                          variant="text"
                          onClick={() => deleteHandler(address)}
                          color="red"
                        />
                      </div>
                    </section>
                  </div>
                </li>
              );
            })}
        </ul>
        <ButtonCustom
          text="افزودن آدرس جدید"
          onClick={() => setOpenModal(true)}
        />
      </div>
      {openModal && (
        <AddAddress
          provinces={provinces && provinces}
          openModal={openModal}
          onClose={closeModal}
          onClick={closeModal}
          editData={editData}
          onChangeHanler={changeData}
          type="dashboard"
          userData={dataUser}
        />
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
