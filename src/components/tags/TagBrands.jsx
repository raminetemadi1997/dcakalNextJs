"use client";
import Link from "next/link";
import React, { useState } from "react";
import ImageCustom from "@/components/constantElements/ImageCustom";
import styles from "@/assets/css/Tag.module.css";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import useMediaQuery from "@mui/material/useMediaQuery";

const TagBrands = ({ data }) => {
  const [showMore, setShowMore] = useState(false);
  const mobile = useMediaQuery("(max-width:540px)");

  return (
    <div>
      <div className={`font-medium mb-2`}>{data.tag.name} بر اساس برند:</div>
      <div
        className={`${styles.container} rounded-lg flex flex-col items-center`}
      >
        <div className="grid sm:grid-cols-6 grid-cols-2 gap-4 sm:p-4 p-2 w-full">
          {data.tag.brands
            .slice(0, showMore ? data.tag.brands.length : mobile ? 4 : 6)
            .map((brand) => (
              <Link
                key={brand.id}
                href={brand.slug}
                title={brand.name}
                className={`bg-white rounded-lg ${styles.tag_item} sm:p-4 p-2`}
              >
                <ImageCustom
                  data={brand.image}
                  alt={brand.image_alt}
                  title={brand.image_alt}
                  // props
                  loading={"lazy"}
                  height={75}
                  width={75}
                  fullWidth={false}
                  className="flex justify-center items-center overflow-hidden"
                />
              </Link>
            ))}
        </div>
        {data.tag.brands.length > 6
          &&

        <IconButton onClick={() => setShowMore(!showMore)}>
          {showMore ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
        }
      </div>
    </div>
  );
};

export default TagBrands;
