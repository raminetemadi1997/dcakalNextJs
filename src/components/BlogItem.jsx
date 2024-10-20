import React from "react";
import Image from "next/image";
import Link from "next/link";
import { styled } from "@mui/material/styles";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
//css
import styles from "../assets/css/main/BlogItem.module.css";
//images
import blogItem from "../../public/images/Banners/bannerUp.jpg";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import camera from "../../public/images/card/Cctv/camera.jpg";
import gate from "../../public/images/card/Gate/gate.jpg";
import alarm from "../../public/images/card/Alarm/alarm.jpg";
import smart from "../../public/images/card/Smart/smart.jpg";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid #007C70`,
  borderRadius: "15px",
  width: "99%",
  marginTop: "14px",
  marginBottom: ".5rem",
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&.MuiAccordion-root.Mui-expanded:last-of-type": {
    marginBottom: ".5rem",
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<NavigateBeforeIcon sx={{ fontSize: "1.2rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(255, 255, 255, .05)" : "none",
  flexDirection: "row",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(-90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "justify",
  display: "flex",
}));

const BlogItem = ({ data, type, src }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(true);
  };

  return (
    <>
      {type === "specialNews" ? (
        <div
          className={`w-full h-[390px] rounded-xl bg-white ${styles.container} overflow-hidden`}
        >
          <div
            onClick={() => setExpanded(!expanded)}
            className={`w-full h-full cursor-pointer`}
            style={{
              background: `linear-gradient(179.8deg, #FFFFFF 12.36%, rgba(255, 255, 255, 0) 28.83%) , url(${blogItem.src}) center center no-repeat `,
              backgroundSize: "100% 100%",
            }}
          >
            <Accordion
              expanded={expanded}
              sx={{ margin: 0, width: "100%", border: "none", borderRadius: 0 }}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
                sx={{
                  margin: 0,
                  "& .MuiAccordionSummary-expandIconWrapper": {
                    background: "var(--theme-color-green)",
                    borderRadius: "50%",
                    color: "#fff",
                    padding: ".4rem",
                  },
                }}
              >
                <Typography>پکیج های 2 دوربین داهوا</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{ height: "400px", overflowY: "auto", maxHeight: "342px" }}
              >
                <Typography sx={{ fontSize: "14px" }}>
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                  استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و
                  مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی
                  تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود .لورم ایپسوم
                  متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از
                  طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و
                  سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و
                  کاربردهای متنوع با هدف بهبود .لورم ایپسوم متن ساختگی با تولید
                  سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است
                  چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم
                  است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با
                  هدف بهبود .لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از
                  صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه
                  روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط
                  فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود .
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      ) : (
        <Link
          href="/"
          className={` w-full bg-white rounded-lg ${styles.container} flex flex-col justify-between`}
        >
          <Image
            src={src}
            alt="blog"
            className={`rounded-se-lg rounded-ss-lg`}
            // style={{ height: `100%`, width: `100%` }}
          />

          <section className={` p-2 flex flex-col justify-between`}>
            <p className={`text-sm mb-4`}>
              دوربین سیم کارتی یا دوربین بیسیم با مودم سیمکارتی
            </p>
            <div className={`flex justify-between items-center`}>
              <div className={`flex items-center`}>
                <CalendarMonthIcon />
                <span className={`text-xs mr-1`}>28 مرداد 1400</span>
              </div>
              <div
                className={`h-5 w-5 opacity-75 rounded-full bg-theme text-white flex justify-center items-center`}
              >
                <ChevronLeftIcon sx={{ fontSize: "16px" }} />
              </div>
            </div>
          </section>
        </Link>
      )}
    </>
  );
};

export default BlogItem;
