"use client";
import React, { useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import axios from "@/lib/axios";
import PuffLoader from "react-spinners/PuffLoader";
import NotFound from "@/components/NotFound";
import { useRouter } from "next/navigation";
import { ResetApi } from "@/context/ResetApiContext";

const overRide = () => ({
  display: "block",
  margin: "0 auto",
});

const Page = () => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL_IMAGE;
  const { setReset } = useContext(ResetApi);
  const [boot, setBoot] = useState(null);
  let slug = "api" + usePathname();
  const router = useRouter();

  axios.get("api/logout")
    .then((response) => {
      router.push(response.data.redirect);
      setReset(response.data.redirect);
    })
    .catch((error) => {
      <NotFound />;
    });

  useEffect(() => {
   
    const getData = async () => {
      const boot = await axios.get("api/boot-setting-api");
      boot && setBoot(boot.data.data.setting.seo);
    };
    getData();
  }, [router, setReset]);

  return (
    <>
      <link
        rel="apple-touch-icon"
        href={boot && `${backendUrl}${boot.web_app.indexArray.medium}`}
      />
      <link
        rel="icon"
        href={boot && `${backendUrl}${boot.fav_ico.ico}`}
        sizes="any"
      />
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
    </>
  );
};
export default Page;
