"use client";
import React from "react";
import styles from "@/assets/css/dashboard/Dashboard.module.css";
import { CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import Image from "next/image";
import Rating from "@mui/material/Rating";
import Reaction from "@/components/product/Reaction";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import CancelIcon from "@mui/icons-material/Cancel";

const ReviewModes = ({position}) => {
  return (
    <div className="pt-4">
      <div className={styles.review_modes}>
        <div
          className={`flex items-center px-2 bg-white w-fit absolute ${styles.status}`}
        >
          {position == "pending" ? (
            <CircularProgress
              sx={{ color: "var(--theme-color)", mr: 1 }}
              variant="indeterminate"
              size="1.5rem"
            />
          ) : position == "delivered" ? (
            <CheckCircleIcon sx={{ color: "var(--theme-color-green)", mr: 1 }} />
          ) : position == "canceled" ? (
            <CancelIcon sx={{ mr: 1 }} color="error" />
          ) : null}

          <p className="text-sm font-bold">
            {position == "pending"
              ? "درحال بررسی"
              : position == "delivered"
              ? "منتشر شده"
              : position == "canceled"
              ? "حذف شده"
              : null}
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between border-b pb-2">
            <div>
              <dl className="flex text-sm">
                <dt>تاریخ انتشار: </dt>
                <dd className="font-bold">11401/8/10</dd>
              </dl>
            </div>
          </div>
        </div>

        <div className={styles.review_content}>
          <picture>
            <Image
              src="https://www.dcakala.com/18605-superlarge_default/taba-tvd-5-43.jpg"
              alt="review"
              width="150"
              height="150"
              style={{ width: "100%", width: "auto" }}
            />
          </picture>
          <div>
            <h5 className="pb-2 border-b">
              جک وی تو کالیپسو 400 Claypso قدرت هر لنگه 400 کیلوگرم مناسب درب
              دولنگه
            </h5>
            <div className="flex items-center justify-between">
              <Rating
                name="read-only"
                value={4}
                readOnly
                size="small"
                sx={{ color: "var(--theme-color)" }}
              />
              <p className="text-xs">1 ماه قبل</p>
            </div>
            <div className={styles.review_box}>
              <p>قیمت مناسب</p>
              <ul>
                <li>
                  نسبت به امکاناتی که داره قیمتش واقعا مناسبه.من خریدش رو به همه
                  پیشنهاد میدم.
                  <div>
                    <Reaction type="like" />
                    <Reaction type="dislike" />
                  </div>
                </li>
              </ul>

              <ul className={styles.answer}>
                <li>
                  نسبت به امکاناتی که داره قیمتش واقعا مناسبه.من خریدش رو به همه
                  پیشنهاد میدم.
                  <div>
                    <Reaction type="like" />
                    <Reaction type="dislike" />
                  </div>
                </li>
              </ul>
            </div>
            <div className={styles.review_images}>
              <h5 className="text-sm font-bold">تصاویر آپلود شده از محصول </h5>
              <ul>
                <li>
                  <picture>
                    <Image
                      src="https://www.dcakala.com/18605-superlarge_default/taba-tvd-5-43.jpg"
                      alt="customer images"
                      width={60}
                      height={60}
                      style={{ width: "100%", width: "auto" }}
                    />
                  </picture>
                </li>

                <li>
                  <picture>
                    <Image
                      src="https://www.dcakala.com/18605-superlarge_default/taba-tvd-5-43.jpg"
                      alt="customer images"
                      width={60}
                      height={60}
                      style={{ width: "100%", width: "auto" }}
                    />
                  </picture>
                </li>
              </ul>
            </div>
          </div>
          {position === 'canceled' ? (<p>کاربر گرامی این دیدگاه ب علت گزارش توهین آمیز بودن حذف شده است.</p>) : null}
        </div>
      </div>
    </div>
  );
};

export default ReviewModes;
