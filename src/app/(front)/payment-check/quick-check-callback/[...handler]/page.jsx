"use client";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import PuffLoader from "react-spinners/PuffLoader";
import { useRouter } from "next/navigation";


const overRide = () => ({
  display: "block",
  margin: "0 auto",
});

const Page = () => {
  let slug = usePathname();
  slug = slug.replace("quick-check-callback", "quick-payment-callback");
  const router = useRouter();
  useEffect(() => {
    router.push(slug);
  }, [slug , router]);
  return (
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
