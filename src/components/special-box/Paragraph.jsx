import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { purple } from "@mui/material/colors";
import Link from "next/link";
import ButtonCustom from "@/components/constantElements/ButtonCustom";
//css
import styles from "../../assets/css/Paragraph.module.css";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: "#007C70",
  "&:hover": {
    backgroundColor: "#007C70",
  },
}));

const Paragraph = ({
  className,
  paragraphTitle,
  paragraphDescription,
  link,
  data,
}) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div
      className={`w-full h-auto rounded-xl flex flex-col items-center py-4 relative mb-10 ${className} gap-4`}
    >
      <div className="sm:text-base text-xs">{paragraphTitle}</div>
      <div className={`p-2 rounded-xl bg-white w-full ${styles.content}`}>
        <div
          className={`p-2 w-full ${
            showMore ? "h-auto" : "h-[133px]"
          } sm:text-base text-sm relative sm:text-center text-justify ckeditor overflow-y-auto`}
          dangerouslySetInnerHTML={{
            __html: data ? data.description : paragraphDescription,
          }}
        />
        {link ? (
          <div className="flex justify-center">
            <div
              className={`text-center w-fit h-fit ${styles.container} rounded mt-2`}
            >
              <Link href={link}>
                <ColorButton variant="contained">مشاهده بیشتر</ColorButton>
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div
              className={`text-center w-fit h-fit ${styles.container} rounded mt-2`}
            >
              {data.link && (
                <ButtonCustom
                  color="#007C70"
                  text="مشاهده بیشتر"
                  title="مشاهده بیشتر"
                  fullWidth
                  link={data.link}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Paragraph;
