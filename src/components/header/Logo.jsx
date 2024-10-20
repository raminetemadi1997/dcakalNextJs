import React from "react";
import Link from "next/link";
import Skeleton from "@mui/material/Skeleton";
import ImageCustom from "../constantElements/ImageCustom";

const Logo = ({ className , logo}) => {

  
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL_IMAGE;
  return (
    <>
      <Link
        title={logo && logo.logo_alt}
        rel="preload"
        href={"/"}
        className={`flex justify-center sm:scale-1 transition-transform ease-in duration-150 ${className}`}
      >
        {logo ?
        <ImageCustom
          data={logo.logo}
          alt={logo.logo_alt}
          title={logo.logo_alt}
          width={90} 
          height={36}
          fullWidth = {false}
          size="original"
        />
        :<div className="h-full w-96 bg-gray-300 rounded-full opacity-75 animate-pulse dark:bg-gray-700 ml-2"></div>
}
      </Link>
    </>
  );
};

export default Logo;
