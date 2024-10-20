import React, { useState, useEffect, useContext } from "react";
import dynamic from "next/dynamic";
import Skeleton from "@mui/material/Skeleton";
import axios from "@/lib/axios";
import { SnakebarContext } from "../context/snakebar";

const AddIcon = dynamic(() => import("@mui/icons-material/Add"), {
  ssr: false,
  loading: () => <Skeleton variant="rounded" width={16} height={16} />,
});
const RemoveIcon = dynamic(() => import("@mui/icons-material/Remove"), {
  ssr: false,
  loading: () => <Skeleton variant="rounded" width={16} height={16} />,
});

const ProductCounter = ({ number, numberCount, idPosition }) => {
  const { setOpenAlarm, setMessage, setDuration, setModes } =
    useContext(SnakebarContext);

  let [count, setCount] = useState(Number(number));

  const increaseHandler = () => {
    setCount((prevcount) => prevcount + 1);
    axios.get("/sanctum/csrf-cookie").then((getcsrvf) => {});

    return axios({
      method: "post",
      url: `api/add-cart-number/${idPosition}`,
      data: {
        number: count + 1,
      },
      responseType: "json",
    }).then(
      (response) => {
        setDuration(3000);
        setOpenAlarm(true);
        setMessage("به تعداد محصولات با موفقیت اضافه شد");
        setModes("success");
      },
      (error) => {
      }
    );
  };

  const decreaseHandler = () => {
    let checkCounter = 0;
    setCount((prevcount) => prevcount - 1);
    if (count < 2) setCount(1);
    axios.get("/sanctum/csrf-cookie").then((getcsrvf) => {});

    return axios({
      method: "post",

      url: `api/add-cart-number/${idPosition}`,
      data: {
        number: count - 1 < 2 ? (count = 1) : count - 1,
      },
      responseType: "json",
    }).then(
      (response) => {
        
        checkCounter = number - 1;
        if (Number(checkCounter) >= 1 ) {
          setDuration(3000);
          setOpenAlarm(true);
          setMessage("از تعداد محصولات با موفقیت کم شد");
          setModes("error");
        }
      },
      (error) => {
      }
    );
  };

  useEffect(() => {
    numberCount(count);
    // setChange(count)
  }, [count, numberCount, number]);
  return (
    <div className="flex items-center">
      <span className={`text-sm ml-2 block`}>تعداد:</span>
      <div className="h-8 w-20 bg-white flex items-center justify-between px-1 rounded-lg border">
        <RemoveIcon
          onClick={decreaseHandler}
          sx={{
            fontSize: "16px",
            cursor: `${count < 2 ? "auto" : "pointer"}`,
            opacity: `${count < 2 ? 0.5 : 1}`,
          }}
        />
        <span>{count}</span>
        <AddIcon
          onClick={increaseHandler}
          sx={{ fontSize: "16px", cursor: "pointer" }}
        />
      </div>
    </div>
  );
};

export default ProductCounter;
