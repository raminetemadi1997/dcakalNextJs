"use client";
import React, { useState, Fragment } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SwiperCarousel from "../../components/SwiperCarousel";
import Accordion from "@mui/material/Accordion";
import StickyBox from "react-sticky-box";
import BannerCarousel from "../constantElements/BannerCarousel";
import Filter from "../constantElements/Filter";
import useMediaQuery from "@mui/material/useMediaQuery";

//Components

const SideBar = ({
  className,
  sideBanner = [],
  filters = [],
  type,
  popularData,
  id,
  sendData,
  scrollTo,
  currentSlug,
}) => {
  const mobile = useMediaQuery("(max-width:540px)");

  const [packageExpanded, setPackageExpanded] = useState(true);

  const packageHandler = () => {
    setPackageExpanded(!packageExpanded);
  };

  return (
    <aside className={`${className} h-auto relative z-20`}>
      <StickyBox offsetTop={70} offsetBottom={2}>
        <section className="grid grid-cols-1 gap-4">
          {filters.length > 0 ? (
            type != "brand" ? (
              <div
                className={`filter w-full h-auto bg-[#A4A4A4] rounded-lg flex flex-col items-center justify-between `}
              >
                <h3 className={`text-white my-1`}>فیلتر محصولات</h3>
                <div
                  className={`content h-auto bg-white w-full border border-[#A4A4A4] rounded-lg p-2 min-h-[320px] relative`}
                >
                  <Filter
                    filters={filters}
                    id={id}
                    sendData={sendData}
                    scrollTo={scrollTo}
                    currentSlug={currentSlug}
                  />
                </div>
              </div>
            ) : (
              <div
                className={`filter w-full h-auto bg-[#A4A4A4] rounded-lg flex flex-col items-center justify-between `}
              >
                <h3 className={`text-white my-1`}>فیلتر محصولات</h3>
                <div
                  className={`content h-auto bg-white w-full border border-[#A4A4A4] rounded-lg p-2`}
                >
                  <Filter
                    filters={filters}
                    id={id}
                    sendData={sendData}
                    scrollTo={scrollTo}
                    type={type}
                  />
                </div>
              </div>
            )
          ) : null}

          {/*  filters  */}

          {/*    banner    */}
          {sideBanner.length > 0 && !mobile ? (
            <BannerCarousel data={sideBanner} className="mb-0" autoplayDelay={3500} />
          ) : null}
          {/*    banner    */}

          {popularData && popularData.length > 0 && !mobile ? (
            <div
              className={`filter w-full h-auto bg-theme rounded-lg flex flex-col items-center justify-between `}
            >
              <h3 className={`text-white my-1`}>محبوب ترینها</h3>
              <div
                className={`content h-auto bg-white w-full border border-theme rounded-lg p-2`}
              >
                <SwiperCarousel type="asideCarousel" data={popularData} />
              </div>
            </div>
          ) : null}
        </section>
      </StickyBox>
    </aside>
  );
};

export default SideBar;
