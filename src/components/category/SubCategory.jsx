import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useMediaQuery } from "@mui/material";
import subCategoryPackagePng from "../../../public/images/subcategory-package.png";
import ImageCustom from "@/components/constantElements/ImageCustom";
import Filters from "../menu/mobile/Filters";

const SubCategory = ({ border = true, slug, name, image, alt, type }) => {
  const mobile = useMediaQuery("(max-width : 540px)");


  

  return (
    <div
      className={`w-full sm:h-[184px] h-auto flex flex-col items-center justify-end relative gap-4`}
    >
      <Link
        href={slug && `/${slug}`}
        className={`sm:w-28 sm:h-28 h-20 w-20 rounded-full ${
          mobile ? "relative" : "absolute"
        } flex  items-center justify-center top-0`}
      >
        {type != "package" ? (
          image && (
            <ImageCustom
              data={image.image}
              alt={image.image_alt}
              title={image.image_alt}
              // loading={"lazy"}
              width={112}
              height={112}
              
            />
          )
        ) : (
          <Image src={subCategoryPackagePng} alt={"تصاویر زیردسته پکیج ها"} />
        )}
      </Link>
      <Link
        href={slug && `/${slug}`}
        className={`sm:p-4 p-0 ${
          border ? "border" : "border-none"
        } rounded-2xl w-full h-3/5 hover:border-[#FFDF37] hover:shadow-sm hover:shadow-[#FFDF37] flex justify-center items-end transition-colors duration-150 ease-in group`}
      >
        <p className={`mb-1 text-center sm:text-base text-sm sm:p-0 p-4`}>{name}</p>
      </Link>
    </div>
  );
};

export default SubCategory;
