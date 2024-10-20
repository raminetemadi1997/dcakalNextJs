"use client";
import React, { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Image from "next/image";
import styled from "@emotion/styled";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import DashboardTextfield from "./dashboard/DashboardTextfield";
import TextField from "@mui/material/TextField";
import DashboardButton from "./dashboard/DashboardButton";
import calculate from "../../public/images/Forms/calculate-1.png";
import styles from "../assets/css/forms/Form.module.css";
import DashboardRadio from "./dashboard/DashboardRadio";
import { InputAdornment } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Tooltip from "@mui/material/Tooltip";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  maxHeight: "99vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  "@media (max-width: 540px)": {
    width: "90%",
    maxHeight: "95vh",
  },
  borderRadius: ".5rem",
  overflow: "auto",
  "&:focus-visible": {
    outline: "none",
  },
};

const ImageContainer = styled(Image)({
  borderRadius: ".5rem",
  cursor: "pointer",
  marginBottom: "1rem",
});

const Head = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: ".5rem",
  backgroundColor: "#fff",
  position: "sticky",
  top: 0,
  zIndex: 10,
  boxShadow: " rgba(0, 0, 0, 0.04) 0px 3px 5px",
});

const FormContainer = styled("form")({
  padding: "1.5rem 1rem",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "1rem",
  "@media (max-width: 540px)": {
    gridTemplateColumns: "1fr",
    gap: ".5rem",
  },
});

const CalculateContainer = styled("div")({
  marginBottom: "1rem",
  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
  borderRadius: ".5rem",
  overflow: "hidden",
});

const Forms = ({ type }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const FormHead = styled("div")({
    padding: "1rem",
    backgroundColor: "var(--theme-color-green)",
    marginBottom: ".5rem",
    "& > p": {
      color: "#fff",
    },
    display: "flex",
    alignItems: "center",
  });

  const FormBody = styled("div")({
    "& > .startPage": {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
    },
    "& .startContainer": {
      display: "grid",
      gridTemplateColumns: "1fr",
      placeItems: "center",
    },
    minHeight: 270,
  });

  const RadioContainer = styled("div")({
    padding: ".5rem 1rem",
  });

  const StartPage = () => {
    return (
      <div className="startPage">
        <picture>
          <Image src={calculate} alt="caculate" width={500} height={270} />
        </picture>
        <div className="startContainer">
          <p>برای دریافت پیش فاکتور آنلاین شروع محاسبه کلیک کنید</p>
          <DashboardButton value="شروع محاسبه" styleCss="--theme-color-green" />
        </div>
      </div>
    );
  };

  const Page1 = () => {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
        <RadioContainer>
          <DashboardRadio
            values={["فروشگاه", "پارکینگ", "پنجره", "سوله", "درب نفررو"]}
            label="نوع کاربری کرکره برقی را مشخص کنید"
            direction="column"
          />
        </RadioContainer>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gridTemplateRows: "repeat(2 , max-content)",
            gap: "1rem",
            padding: ".5rem 1rem",
          }}
        >
          <TextField
            label="عرض دهانه ورودی را وارد نمائید"
            size="small"
            dir="ltr"
            id="outlined-start-adornment"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">cm</InputAdornment>
              ),
            }}
          />
          <TextField
            label="ارتفاع دهانه ورودی را وارد نمائید"
            size="small"
            dir="ltr"
            id="outlined-start-adornment"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">cm</InputAdornment>
              ),
            }}
          />
        </div>
        <picture>
          <Image
            src={
              "https://www.dcakala.com/img/img-si/banner/rolling-shutters/pre-invoice/store.png"
            }
            alt="https://www.dcakala.com/img/img-si/banner/rolling-shutters/pre-invoice/store.png"
            width={322}
            height={225}
          />
        </picture>
      </div>
    );
  };

  const Page2 = () => {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <RadioContainer>
          <DashboardRadio
            direction="column"
            label="نوع ریل کرکره را انتخاب کنید"
            values={[
              "انتخاب خودکار براساس ارتفاع و عرض",
              "ریل 6 سانتیمتر آلومینیوم زواردار",
              "ریل 6 سانتیمتر فولادی زواردار",
              "ریل 10 سانتیمتر فولادی زواردار",
            ]}
          />
        </RadioContainer>
        <picture>
          <Image
            src={
              "https://www.dcakala.com/img/img-si/banner/rolling-shutters/pre-invoice/6cm.png"
            }
            alt="https://www.dcakala.com/img/img-si/banner/rolling-shutters/pre-invoice/6cm.png"
            width={322}
            height={225}
          />
        </picture>
      </div>
    );
  };

  const Page3 = () => {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "2rem",
          padding: ".5rem 1rem",
        }}
      >
        <div>
          <FormControl fullWidth size="small" sx={{ marginBottom: "1rem" }}>
            <InputLabel id="demo-simple-select-label">
              نوع تیغه را انتخاب کنید
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="نوع تیغه را انتخاب کنید"
              onChange={handleChange}
            >
              <MenuItem value={10}>
                تیغه آلومینیوم 8 سانت دوپل وزن استاندارد
              </MenuItem>
              <MenuItem value={20}>تیغه آلومینیوم 8 سانت دوپل وزن سبک</MenuItem>
              <MenuItem value={30}>
                تیغه آلومینیوم 10 سانت دوپل وزن سبک
              </MenuItem>
              <MenuItem value={40}>
                تیغه آلومینیوم 10 سانت دوپل وزن استاندارد
              </MenuItem>
              <MenuItem value={50}>تیغه آلومینیوم 8 سانت تک پل آکرول</MenuItem>
              <MenuItem value={60}>تیغه آلومینیوم 10 سانت دوپل آکرول</MenuItem>
              <MenuItem value={70}>تیغه گالوانیزه فوم دار 8 سانت</MenuItem>
              <MenuItem value={80}>تیغه فولادی ضخامت 1 میلیمتر</MenuItem>
              <MenuItem value={90}>
                تیغه پلی کربنات 4 میلیمتر با لوله استیل
              </MenuItem>
              <MenuItem value={100}>
                تیغه پلی کربنات 2 میلیمتر با یراق آلومینیوم
              </MenuItem>
              <MenuItem value={110}>تیغه 8 سانت دوپل لمینت طرح چوب</MenuItem>
            </Select>
          </FormControl>
          <p className="text-sm">
            مساحت کرکره شما با دورپیچ و کسر اندازه قوطی 5.3928 مترمربع محاسبه
            گردید.
          </p>
          <span className="text-xs text-[#777]">
            راهنمایی:
            <br />
            برای مساحت های زیر 30 متر مربع تیغه های 8 سانتیمتر یا پلی کربنات
            لوله آلومینیومی پیشنهاد می شود.
          </span>
        </div>
        <FormControl component="fieldset" variant="standard">
          <FormLabel
            component="legend"
            sx={{
              "&.Mui-focused": { color: "var(--theme-color-green)" },
              fontSize: ".875rem",
            }}
          >
            رنگ تیغه را انتخاب کنید
          </FormLabel>
          <FormGroup row>
            <FormControlLabel
              control={
                <Tooltip title="سفید" arrow>
                  <Checkbox
                    size="small"
                    sx={{
                      color: "#f3f3f3",
                      "&.Mui-checked": {
                        color: "#f3f3f3",
                      },
                    }}
                  />
                </Tooltip>
              }
            />
            <FormControlLabel
              control={
                <Tooltip title="بژ" arrow>
                  <Checkbox
                    size="small"
                    sx={{
                      color: "#FFDEAD",
                      "&.Mui-checked": {
                        color: "#FFDEAD",
                      },
                    }}
                  />
                </Tooltip>
              }
            />
            <FormControlLabel
              control={
                <Tooltip title="مشکی" arrow>
                  <Checkbox
                    size="small"
                    sx={{
                      color: "#000",
                      "&.Mui-checked": {
                        color: "#000",
                      },
                    }}
                  />
                </Tooltip>
              }
            />
            <FormControlLabel
              control={
                <Tooltip title="قهوه ای" arrow>
                  <Checkbox
                    size="small"
                    sx={{
                      color: "#914D03",
                      "&.Mui-checked": {
                        color: "#914D03",
                      },
                    }}
                  />
                </Tooltip>
              }
            />
            <FormControlLabel
              control={
                <Tooltip title="قرمز" arrow>
                  <Checkbox
                    size="small"
                    sx={{
                      color: "#C72100",
                      "&.Mui-checked": {
                        color: "#C72100",
                      },
                    }}
                  />
                </Tooltip>
              }
            />
            <FormControlLabel
              control={
                <Tooltip title="نارنجی" arrow>
                  <Checkbox
                    size="small"
                    sx={{
                      color: "var(--theme-color)",
                      "&.Mui-checked": {
                        color: "var(--theme-color)",
                      },
                    }}
                  />
                </Tooltip>
              }
            />

            <FormControlLabel
              control={
                <Tooltip title="آبی" arrow>
                  <Checkbox
                    size="small"
                    sx={{
                      color: "#1063B0",
                      "&.Mui-checked": {
                        color: "#1063B0",
                      },
                    }}
                  />
                </Tooltip>
              }
            />

            <FormControlLabel
              control={
                <Tooltip title="سبز" arrow>
                  <Checkbox
                    size="small"
                    sx={{
                      color: "#97AA00",
                      "&.Mui-checked": {
                        color: "#97AA00",
                      },
                    }}
                  />
                </Tooltip>
              }
            />

            <FormControlLabel
              control={
                <Tooltip title="زرد" arrow>
                  <Checkbox
                    size="small"
                    sx={{
                      color: "#FFB600",
                      "&.Mui-checked": {
                        color: "#FFB600",
                      },
                    }}
                  />
                </Tooltip>
              }
            />

            <FormControlLabel
              control={
                <Tooltip title="خاکستری" arrow>
                  <Checkbox
                    size="small"
                    sx={{
                      color: "#808080",
                      "&.Mui-checked": {
                        color: "#808080",
                      },
                    }}
                  />
                </Tooltip>
              }
            />
          </FormGroup>
          <span className="text-xs text-[#777] leading-8">
            *می توانید چند رنگ را انتخاب کنید.
            <br />
            *با انتخاب هررنگ به جز رنگ سفید مبلغ نهایی فاکتور بیشتر خواهد شد.
          </span>
        </FormControl>
      </div>
    );
  };

  return type == 0 ? (
    <>
      <picture onClick={handleOpen}>
        <ImageContainer
          src="https://www.dcakala.com/img/img-si/banner/automatic-glass-doors/send-free-catalog-desktop-2.jpg"
          alt="forms"
          width={1200}
          height={625}
        />
      </picture>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Head>
              <p>ارسال رایگان کاتالوگ و کارشناس</p>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Head>
            <picture>
              <Image
                src="https://www.dcakala.com/img/img-si/banner/automatic-glass-doors/Send-free-catalog-and-expert.jpg"
                alt="forms"
                width={1200}
                height={625}
              />
            </picture>
            <FormContainer>
              <DashboardTextfield label="نام" />
              <DashboardTextfield label="شماره تماس" />
              <TextField
                id="outlined-multiline-static"
                label="آدرس"
                multiline
                rows={4}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "var(--theme-color)",
                    },
                  },
                  "& label.Mui-focused": {
                    color: "var(--theme-color)",
                  },
                  gridColumn: "2 span",
                }}
              />
              <div>
                <DashboardButton value="ارسال درخاست" />
              </div>
            </FormContainer>
          </Box>
        </Fade>
      </Modal>
    </>
  ) : type == 1 ? (
    <CalculateContainer>
      <FormHead>
        <div className={styles.blob}></div>
        <p>محاسبه و دریافت آنلاین پیش فاکتور</p>
      </FormHead>
      <FormBody>
        <Page3 />
      </FormBody>
    </CalculateContainer>
  ) : null;
};

export default Forms;
