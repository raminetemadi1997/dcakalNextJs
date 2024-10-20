"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import axios from "@/lib/axios";
import PuffLoader from "react-spinners/PuffLoader";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import NotFound from "@/components/NotFound";
import ButtonCustom from "@/components/constantElements/ButtonCustom";

const overRide = () => ({
  display: "block",
  margin: "0 auto",
});

const Page = () => {
  let slug = "api" + usePathname();
  slug = slug.replace("/payment-check", "");

  const [data, setData] = useState();
  const [error, setError] = useState();
  useEffect(() => {
    const getData = async () => {
      await axios.get("/sanctum/csrf-cookie");
      axios
        .post(`${slug}`)
        .then((response) => {
          setData(response);
        })
        .catch((error) => {
          setError(error);
        });
    };
    getData();
  }, [slug]);

  return error || data ? (
    <>
      {data && data.data.type == "success" ? (
        <div className="flex w-full h-screen justify-center items-center bg-[#228B221C]">
          <div
            className="bg-white rounded-lg p-4 flex w-1/3 flex-col items-center justify-center gap-8"
            style={{ boxShadow: "4px 4px 4px 0px #00000026" }}
          >
            <div className="flex gap-4">
              <CheckCircleIcon color="success" fontSize="large" />
              <div className="text-lg">پرداخت با موفقیت انجام شد</div>
            </div>
            <div className="w-full flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <div>شماره سفارش :</div>
                <div>#{data.data.data.order_id}</div>
              </div>
              <div className="flex justify-between items-center">
                <div>کد تراکنش :</div>
                <div>#{data.data.data.transaction}</div>
              </div>
              <div className="flex justify-between items-center">
                <div>تاریخ تراکنش :</div>
                <div>#{data.data.data.order_date}</div>
              </div>
            </div>
            <div className="grid gap-8 w-full grid-cols-2 px-4">
              <ButtonCustom
                text="صفحه اصلی"
                color="#555555"
                link="/"
                justifyContent="center"
                fullWidth
              />
              <ButtonCustom
                text="ناحیه کاربری"
                color="#555555"
                link="/dashboard/idinity"
                justifyContent="center"
                fullWidth
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex w-full h-screen justify-center items-center bg-[#D800320A]">
          <div
            className="bg-white rounded-lg p-4 flex w-1/3 flex-col items-center justify-center gap-8"
            style={{ boxShadow: "4px 4px 4px 0px #00000026" }}
          >
            <CancelIcon color="error" fontSize="large" />
            <div className="text-lg font-bold">عدم اتصال به درگاه پرداخت</div>
            <div className="grid gap-8 w-full grid-cols-2 px-4">
              <ButtonCustom
                text="صفحه پرداخت"
                color="#555555"
                link="/payment"
                justifyContent="center"
                fullWidth
              />
              <ButtonCustom
                text="صفحه اصلی"
                color="#555555"
                link="/"
                justifyContent="center"
                fullWidth
              />
            </div>
          </div>
        </div>
      )}
    </>
  ) : (
    <div className="w-full flex justify-center items-center h-screen">
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
