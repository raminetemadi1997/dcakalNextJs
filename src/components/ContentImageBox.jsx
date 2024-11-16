import { Box } from "@mui/material";
import imgCo from "../../public/images/card/Cctv/camera.jpg";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { purple } from "@mui/material/colors";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import TabCustom from "./constantElements/TabCustom";
import Link from "next/link";
import styles from "../assets/css/ContentImageBox.module.css";
import ImageCustom from "./constantElements/ImageCustom";
import useMediaQuery from "@mui/material/useMediaQuery";
import Skeleton from "@mui/material/Skeleton";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: "#007C70",
  "&:hover": {
    backgroundColor: "#fff",
    color: "var(--theme-color-orange)",
    border: "1px solid var(--theme-color-orange)",
  },
}));

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  position: "absolute",
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: 10,
  height: 216,
  overflowY: "auto",
  textAlign: "justify",
}));

const ContentImageBox = ({ type, firstContentData, title, data = [] }) => {
  const [client, setClient] = useState(false);
  const miniMobile = useMediaQuery("(max-width:375px)");
  const mobile = useMediaQuery("(max-width:600px)");
  const portraitTablets = useMediaQuery(
    "(min-width:600px)  and (max-width:768px) "
  );
  const landscapeTablets = useMediaQuery(
    "(min-width:768px) and (max-width:992px)"
  );
  const laptops = useMediaQuery("(min-width:992px) and (max-width:1200px)");

  useEffect(() => {
    setClient(true);
  }, []);

  function response(porpose) {
    if (porpose == "width") {
      if (miniMobile) {
        return 130;
      } else if (mobile) {
        return 140;
      } else if (portraitTablets) {
        return 150;
      } else if (landscapeTablets) {
        return 130;
      } else if (laptops) {
        return 140;
      } else {
        return 150;
      }
    } else if (porpose == "height") {
      if (miniMobile) {
        return 130;
      } else if (mobile) {
        return 140;
      } else if (portraitTablets) {
        return 150;
      } else if (landscapeTablets) {
        return 130;
      } else if (laptops) {
        return 140;
      } else {
        return 150;
      }
    }
  }

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL_IMAGE;
  const [expanded, setExpanded] = useState(null);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const [query, setQuery] = useState("(max-width: 540px)");

  return (
    <>
      {type == "firstArticle" ? (
        <>
          <p className="bg-[#A4A4A4] w-fit px-12 py-2   text-white rounded-tr-2xl rounded-tl-2xl relative">
            {title}
          </p>
          <Box
            className="flex justify-center mb-4"
            sx={{
              width: "100%",
              border: "1px solid #A4A4A4",
              borderRadius: "0 .5rem .5rem .5rem",
            }}
          >
            <ul className="h-full w-full grid xl:grid-cols-4 sm:grid-cols-3 grid-cols-2 grid-flow-row-dense sm:gap-8 gap-2 p-4">
              {firstContentData.map((first) => {
                return client ? (
                  <li
                    key={first.id}
                    className={`${styles.list} group sm:bg-[#ff7900] text-center inline-flex flex-wrap w-full h-fit rounded-[9px] mt relative px-[1px] pb-[1px]`}
                  >
                    <Link
                      className="w-full"
                      href={first.link != null ? `${first.link}` : "#"}
                    >
                      <div className="mx-auto mt-1 p-3 px-0 relative inline-flex justify-center items-center z-10 overflow-hidden">
                        <ImageCustom
                          data={first.image}
                          alt={first.image_alt}
                          title={first.image_alt}
                          // props
                          loading={"lazy"}
                          // width={120}
                          // height={120}
                          fullWidth={false}
                          width={response("width")}
                          height={response("height")}
                          size="original"
                        />
                      </div>
                      <div className="w-[100%] bg-[#fff] rounded-lg sm:p-6 sm:pt-12 sm:pb-[1.05rem] mx-auto sm:mt-[-48px] leading-6 z-0">
                        <div
                          className={`pb-1 flex justify-center mx-auto relative sm:text-base text-sm sm:font-bold sm:mb-4 before:w-1/5 before:conte sm:before:h-[2px] before:bg-theme before:content-[" "] before:absolute before:-bottom-1 before:group-hover:w-2/4 before:transition-all before:duration-200 `}
                        >
                          {first.title}
                        </div>
                      </div>
                    </Link>
                  </li>
                ) : (
                  <div className={styles.skeleton} key={first.id}>
                    <Skeleton
                      variant="rectangular"
                      animation="wave"
                      sx={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "8px",
                      }}
                    />
                  </div>
                );
              })}
            </ul>
          </Box>
        </>
      ) : type == "secondArticle" ? (
        <>
          {data.length > 0 && (
            <>
              <TabCustom value={[title]} />
              {data.map((second, i) => {
                return (
                  <div
                    key={second.id}
                    className="w-full h-[300px] p-2 relative my-4"
                  >
                    <div className="w-full h-[90%] bg-gradient-to-b from-[#ff770059] to-[#ff770012] absolute right-0 top-0 z-0 rounded-xl"></div>
                    <div className="sm:w-[95%] w-full h-[90%] bg-[#fff] flex sm:flex-row flex-col absolute left-0 top-[10%] z-10 border border-[#ff7900] rounded-xl sm:ml-1 ml-0 sm:overscroll-none overflow-hidden">
                      <div className="sm:w-[40%] w-full h-full inline-block float-right">
                        <ImageCustom
                          data={second.image}
                          alt={second.image_alt}
                          title={second.image_alt}
                          // props
                          loading={"lazy"}
                          width={120}
                          height={120}
                          size="original"
                        />
                      </div>
                      {mobile && true ? (
                        <Accordion
                          sx={{ width: "100%" }}
                          expanded={expanded === `panel${i}`}
                          onChange={handleChange(`panel${i}`)}
                        >
                          <AccordionSummary
                            aria-controls="panel1d-content"
                            id="panel1d-header"
                          >
                            <Typography>{second.title}</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            {/* <Typography>{item.description}</Typography> */}
                          </AccordionDetails>
                        </Accordion>
                      ) : (
                        <div className="sm:w-[59%] w-full sm:bg-none bg-white h-full sm:inline-block sm:static float-left sm:mr-1 mr-0 px-6">
                          <p className={`${styles.pType2} my-4 mx-2 font-bold`}>
                            {second.title}
                          </p>
                          <p
                            className="leading-7 text-justify h-full"
                            dangerouslySetInnerHTML={{
                              __html: second.body,
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </>
      ) : type == "contentImageV3" ? (
        data.length > 0 && (
          <div className="mb-12">
            <TabCustom value={[title]} />
            <section className="grid sm:grid-cols-3 grid-cols-1 gap-4 grid-flow-row-dense my-5">
              <>
                {data.map((third) => (
                  <div key={third.id} className={`w-full h-full`}>
                    <div
                      className={`w-full h-full rounded-2xl flex justify-center relative`}
                      style={{
                        background:
                          " linear-gradient(180deg, #FF7900 52.6%, #FEA802 100%)",
                      }}
                    >
                      <div
                        className={`p-4 w-[95%] group relative  bg-white rounded-2xl top-[18px] border border-theme flex flex-col items-center`}
                        style={{
                          boxShadow: "0px -4px 15px 0px #FF79004D inset",
                        }}
                      >
                        <ImageCustom
                          data={third.image}
                          alt={third.image_alt}
                          title={third.image_alt}
                          // props
                          loading={"lazy"}
                          width={120}
                          height={120}
                          size="original"
                        />
                        <p
                          className={`pb-1 flex justify-center mx-auto relative text-base font-bold mb-4 before:w-1/2 before:conte before:h-[2px] before:bg-theme before:content-[" "] before:absolute before:-bottom-1 before:group-hover:w-full before:transition-all before:duration-200 before:ease-in-out`}
                        >
                          {third.title}
                        </p>
                        <p
                          className="leading-7 text-justify h-full"
                          dangerouslySetInnerHTML={{
                            __html: third.body,
                          }}
                        />
                        {third.link && (
                          <div className="flex justify-center absolute -bottom-[7%]">
                            <div
                              className={`text-center w-fit h-fit bg-theme rounded`}
                            >
                              <Link href={third.link}>
                                <ColorButton variant="contained">
                                  مشاهده بیشتر
                                </ColorButton>
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </>
            </section>
          </div>
        )
      ) : null}
    </>
  );
};
export default ContentImageBox;
