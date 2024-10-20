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

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid #007C70`,
  borderRadius: "15px",
  width: "99%",
  marginTop: "14px",
  marginBottom: ".5rem",
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

export default function Accordions({ type, faqData, data = [] }) {
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
              <div
                key={accordion.id}
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
            ))}
        </>
      ) : type === "FAQ" ? (
        faqData ? (
          <section>
            <div class="flex justify-between items-center mb-2 border-b">
              <p class="font-bold mb-2">سوالات متداول</p>
            </div>

            {faqData.map((faq, i) => {
              return (
                <>
                  <div
                    className="w-full h-fit relative flex justify-end last:mb-5"
                    key={faq.id}
                  >
                    <div className="w-[98%] h-16 bg-[var(--theme-color-green)] rounded-xl absolute right-3"></div>
                    <Accordion
                      expanded={i == expanded ? true : false}
                      onChange={() => handleChange(i)}
                    >
                      <AccordionSummary
                        aria-controls="panel3d-content"
                        id="panel3d-header"
                        sx={{
                          "& .MuiAccordionSummary-expandIconWrapper": {
                            background: "var(--theme-color-green)",
                            borderRadius: "50%",
                            color: "#fff",
                            padding: ".4rem",
                            position: "absolute",
                            left: "-1.5%",
                          },
                        }}
                      >
                        <Typography>{faq.question}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <section
                          className="w-full ckeditor"
                          dangerouslySetInnerHTML={{ __html: faq.answer }}
                        />
                      </AccordionDetails>
                    </Accordion>
                  </div>
                </>
              );
            })}
          </section>
        ) : (
          <></>
        )
      ) : null}
    </div>
  );
}
