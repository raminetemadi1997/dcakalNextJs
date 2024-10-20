'use client'
import React, { useState, useEffect } from "react";

const CountDownTimer = ({ type, setDate }) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let dayHours = parseInt((new Date(setDate) - new Date()) / 3600000);
    var toDate = new Date();
    var tomorrow = new Date();
    tomorrow.setHours(24, 0, 0, 0);
    var diffMS = parseInt(tomorrow.getTime() / 1000 - toDate.getTime() / 1000);
    var diffHr = Math.floor(diffMS / 3600);

    if (diffHr < dayHours) {
      const interval = setInterval(() => {
        var toDate = new Date();
        var tomorrow = new Date();
        tomorrow.setHours(24, 0, 0, 0);
        var diffMS = tomorrow.getTime() / 1000 - toDate.getTime() / 1000;
        var diffHr = Math.floor(diffMS / 3600);
        diffMS = diffMS - diffHr * 3600;
        var diffMi = Math.floor(diffMS / 60);
        diffMS = diffMS - diffMi * 60;
        var diffS = Math.floor(diffMS);
        setHours(diffHr);
        setMinutes(parseInt(diffMi));
        setSeconds(diffS);
      }, 1000);
    } else {
      const target = new Date(setDate);

      const interval = setInterval(() => {
        const now = new Date();
        const difference = target.getTime() - now.getTime();

        const d = Math.floor(difference / (1000 * 60 * 60 * 24));

        const h = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );

        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

        const s = Math.floor((difference % (1000 * 60)) / 1000);

        if (d >= 0 && h >= 0 && m >= 0 && s >= 0) {
          setDays(d);
          setHours(h);
          setMinutes(m);
          setSeconds(s);
        }
      }, 1000);
    }
  }, [setDate]);

  return (
    <div
      className={`flex text-xs gird gap-1 ${
        type == "discount"
          ? `static text-red-500 bg-white lg:px-8 rounded-lg sm:py-2 py-1 sm:mt-0 mt-1`
          : type === "product"
          ? "static mr-0 mb-0 text-red-500"
          : ` mr-[.6rem] mb-[.6rem] -rotate-45 text-red-500`
      } w-fit z-10 items-center font-bold`}
    >
      <div className={`${type == "discount" ? `text-base tracking-[.5em]` : null} `}>
        {seconds < 10 ? `0${seconds}` : `${seconds}`}
      </div>
      
      <span className="font-bold">:</span>
      <div className={`${type == "discount" ? `text-base tracking-[.5em]` : null} `}>
        {minutes < 10 ? `0${minutes}` : `${minutes}`}
      </div>
      
        <span className="font-bold">:</span>
      <div className={`${type == "discount" ? `text-base tracking-[.5em]` : null} `}>
        {hours < 10 ? `0${hours}` : `${hours}`}
      </div>
      
      <span className={`font-bold ${days <= 0 ? `hidden` : `block`}`}>:</span>
      <div
        className={`${type == "discount" ? `text-base` : null} ${
          days <= 0 ? `hidden` : `block`
        }`}
      >
        {days < 10 ? `0${days}` : `${days}`}
      </div>
    </div>
  );
};

export default CountDownTimer;
