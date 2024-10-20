"use client";
import React from "react";
import styles from "@/assets/css/dashboard/Dashboard.module.css";
import DiscountIcon from '@mui/icons-material/Discount';
import TimerIcon from '@mui/icons-material/Timer';

const DashboardDiscount = ({value , code , expiredDiscount}) => {
  return (
    <div className={styles.discount}>
      <div>
        <span className={styles.semi_circle_top}></span>
        <span className={styles.semi_circle_down}></span>
        <div className={styles.discount_content}>
          <p className="text-sm">
            <span className="text-stone-500">توضیحات: </span><br/>
            {value} درصد تخفیف برای خرید از دسته آیفون تصویری سیماران
          </p>
          <p>
            <DiscountIcon sx={{mr:1}} color="error" />
            <span className="text-sm">{value} درصد</span>
          </p>
          <p>
            <TimerIcon sx={{mr:1}} />
            <span className="text-sm">تا {expiredDiscount ? expiredDiscount : 0} روز دیگر </span>
          </p>
        </div>
      </div>
      <div className="p-2 flex items-center  justify-center sm:w-[20%] w-[30%]">
       <p className="sm:text-sm text-xs">
            <span className="text-stone-500">کد تخفیف:    </span><br/>
            <span className="font-bold">{code}</span> 
          </p>
      </div>
    </div>
  );
};

export default DashboardDiscount;
