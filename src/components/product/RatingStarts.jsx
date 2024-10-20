import React, { useEffect, useState } from "react";
// import Rating from "@mui/material/Rating";
import dynamic from "next/dynamic";
import { Skeleton } from "@mui/material";

const RatingStarts = ({type , ratings , allComments }) => {

  const [passRates , setPassRates] = useState()
  const Rating = dynamic(()=>  import("@mui/material/Rating")   ,{
    ssr:false,
    loading: () => (<Skeleton variant="rounded" width={type == "review" ? 120 : 90} height={type == "review" ? 24 : 18} />
    ),
  })

  return (
    <>
    {type === "review" ? (
        <p className='text-sm mb-4'>مجموع {ratings} امتیاز از {allComments} نظر</p>
    ): null}
        <div className="flex items-center">
        <Rating
            name="half-rating-read"
            defaultValue={ratings}
            precision={0.5}
            readOnly
            size= {`${type === "review" ? "medium" : "small"}`}
            sx={{ color: "var(--theme-color)" }}

        />
        {type === "review" ? null: (
            <span className="text-xs mr-2">5/{ratings ?  ratings : 0}</span>
        )}
        </div>
    </>
  );
};

export default RatingStarts;
