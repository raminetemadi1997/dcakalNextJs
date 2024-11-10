import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import imageAccordion from "../../public/images/Banners/bannerRight.jpg";
import ImageCustom from "./constantElements/ImageCustom";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TabCustom from "./constantElements/TabCustom";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid #666`,
  borderRadius: "15px",
  width: "100%",
  // marginTop: "14px",
  
  // marginBottom: ".5rem",
  position: "relative",
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
    expandIcon={<ExpandMoreIcon fontSize="large" sx={{color:'#666'}} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(255, 255, 255, .05)" : "none",
  flexDirection: "row",
  
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
  "@media (max-width: 540px)": {
    paddingLeft: "1.5rem",
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "justify",
  display: "flex",
  "@media (max-width: 540px)": {
    flexDirection: "column",
    alignItems: "center",
  },
}));

export default function Accordions({ type, faqData, data = [] , ...props }) {
  
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL_IMAGE;
  const [expanded, setExpanded] = useState(0);

  const handleChange = (i) => {
    if (i == expanded) {
      setExpanded(null);
    } else {
      setExpanded(i);
    }
  };

  return (
    <div>
      {type === "photoContent" ? (
        <>
          {/* accordion 1 */}
          {data.length > 0 &&
            data.map((accordion, i) => (
              <>
              
              
              <div
                key={i}
                className="w-full h-fit relative flex justify-end last:mb-5"
              >
                <div className="w-[98%] h-16 bg-[var(--theme-color-green)] rounded-xl absolute right-0"></div>
                <Accordion
                  expanded={i == expanded ? true : false}
                  onChange={() => handleChange(i)}
                >
                  <AccordionSummary
                    aria-controls="panel1d-content"
                    id="panel1d-header"
                  >
                    <Typography>{accordion.title}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <section className="sm:w-1/4 w-full sm:ml-4 ml-0 sm:mb-0 mb-2">
                      <ImageCustom
                        data={accordion.image}
                        alt={accordion.image_alt}
                        title={accordion.image_alt}
                        // props
                        loading={"lazy"}
                        width={350}
                        height={400}
                        size = 'original'
                      />
                    </section>
                    <section className="sm:w-3/4 w-full ckeditor">
                      <section
                        className="w-full ckeditor"
                        dangerouslySetInnerHTML={{
                          __html: accordion.description,
                        }}
                      />
                    </section>
                  </AccordionDetails>
                </Accordion>
              </div>
              </>
            ))}
        </>
      ) : type === "FAQ" ? (
        faqData ? (
          <section {...props}>
            {/* <div className="flex justify-between items-center border-b mb-8">
              <p className="font-bold mb-2">سوالات متداول</p>
            </div> */}
            <TabCustom className="mb-8" bold={true} value={["سوالات متداول"]} type='accordion' />
            <section className="grid gap-4">
            {faqData.map((faq, i) => {
              return (
                  <div
                  
                    className="w-full h-fit relative flex justify-end last:mb-5"
                    key={faq.id}
                  >
                    {/* <div className="w-full h-16 bg-[#666] rounded-xl absolute right-3"></div> */}
                    <Accordion
                      expanded={i == expanded ? true : false}
                      onChange={() => handleChange(i)}
                      sx={{boxShadow:   i == 0 ? "0 -15px 0 0 #666, 0 0 5px 2px #dddddda3" : "unset"}}
                    >
                      <AccordionSummary
                        aria-controls="panel3d-content"
                        id="panel3d-header"
                        sx={{
                          "& .MuiAccordionSummary-expandIconWrapper": {
                            color: "#000",
                          },
                        }}
                      >
                        <Typography sx={{fontWeight:500 , fontSize:16}}>{faq.question}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <section
                          className="w-full ckeditor"
                          dangerouslySetInnerHTML={{ __html: faq.answer }}
                        />
                      </AccordionDetails>
                    </Accordion>
                  </div>
              );
            })}
            </section>
          </section>
        ) : (
          <></>
        )
      ) : null}
    </div>
  );
}
