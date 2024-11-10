"use client";
import React from "react";
import Skeleton from "@mui/material/Skeleton";
import dynamic from "next/dynamic";
import useMediaQuery from "@mui/material/useMediaQuery";

const Card = dynamic(() => import("@/components/Card"), {
  ssr: false,
  loading: () => (
    <div className="w-auto h-[447.19px] p-2 mb-2">
      <Skeleton
        variant="rounded"
        sx={{ width: "auto" }}
        height={447.19}
        animation="wave"
      />
    </div>
  ),
});

const TagProducts = ({ data }) => {
  const mobile = useMediaQuery("(max-width:540px)");

  return <Card data={data} list={mobile ? true : false} />;
};

export default TagProducts;
