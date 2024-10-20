"use client";
import React, { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import ButtonCustom from "./ButtonCustom";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function AboutUs(params) {
  const mobile = useMediaQuery("(max-width : 540px)");
  const [show, setShow] = useState(false);
  return (
    <section
      className=" rounded-lg"
      style={{
        maxWidth: "1358px",
        margin: "1rem auto",
        backgroundColor: "#f7f7f7",
        padding: "1rem 1.5rem",
      }}
    >
      <h1 className="my-4 sm:text-2xl text-lg">فروشگاه دی سی ای کالا</h1>
      {!mobile ? (
        <p className="text-justify text-[#747272]">
          دی سی ای کالا اولین و بزرگترین فروشگاه اینترنتی و حضوری سیستم های
          حفاظتی و نظارتی در ایران است که در سال 1392 کار خود را آغاز کرد. در
          این فروشگاه محصولاتی از گروه دوربین مدار بسته، آیفون تصویری، جک درب
          پارکینگ، انواع قفل برقی و آرام بند، کرکره برقی، راهبند و درب شیشه ای و
          انواع سیستم های حضور و غیاب و کنترل تردد قرار داده شده تا کاربر با
          توجه به ویژگی ها و بررسی های تخصصی قرار داده در سایت آنها را انتخاب و
          خریداری نماید.
        </p>
      ) : (
        <div className="text-justify text-[#747272]">
          <p>
            دی سی ای کالا اولین و بزرگترین فروشگاه اینترنتی و حضوری سیستم های
            حفاظتی و 
            {show && (
              <span>
                نظارتی در ایران است که در سال 1392 کار خود را آغاز کرد. در
                این فروشگاه محصولاتی از گروه دوربین مدار بسته، آیفون تصویری،
                جک درب پارکینگ، انواع قفل برقی و آرام بند، کرکره برقی، راهبند و
                درب شیشه ای و انواع سیستم های حضور و غیاب و کنترل تردد قرار داده
                شده تا کاربر با توجه به ویژگی ها و بررسی های تخصصی قرار داده در
                سایت آنها را انتخاب و خریداری نماید.
              </span>
            )}
          </p>
          <div className="mt-2 flex justify-center">
            <IconButton aria-label="show" onClick={() => setShow(!show)}>
              {show ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </div>
        </div>
      )}
    </section>
  );
}
