import React, { useContext, useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import LabelIcon from "@mui/icons-material/Label";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import dynamic from "next/dynamic";
import Skeleton from "@mui/material/Skeleton";
import ButtonCustom from "../constantElements/ButtonCustom";

const Button = dynamic(() => import("@mui/material/Button"), {
  ssr: false,
  loading: () => (
    <Skeleton variant="rounded" height={32} sx={{ width: "100%" }} />
  ),
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  "@media (max-width: 540px)": {
    width: 350,
  },
  bgcolor: "background.paper",
  border: "1px solid #e5e7eb",
  boxShadow: 24,
  p: 3,
  borderRadius: ".75rem",
};

const ColorButtonOrder = styled(Button)(({ theme }) => ({
  color: "#fff",
  padding: ".5rem 0",
  width: "100%",
  "&:hover": {
    backgroundColor: "var(--theme-color)",
  },
}));

export default function TransitionsModal({ title }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [captcha, setCaptcha] = useState("");

  useEffect(() => {
    let allCharacters = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
    ];

    const getCaptcha = () => {
      let text = "";
      for (let i = 0; i < 6; i++) {
        let randomCharacter =
          allCharacters[Math.floor(Math.random() * allCharacters.length)];
        text += ` ${randomCharacter}`;
      }
      setCaptcha(text);
    };
    getCaptcha();
  }, []);

  return (
    <div>
      <ButtonCustom
        text="آیا قیمت بهتری سراغ دارید"
        variant="text"
        onClick={handleOpen}
        justifyContent="end"
        className="mt-2"
        fontSize=".65rem"
        color="rgb(62 62 62 / 75%)"
      />
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
            <form action="">
              <div
                className="flex items-center justify-between"
                style={{
                  borderBottom: "1px solid #e5e7eb",
                  paddingBottom: ".7rem",
                }}
              >
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="div"
                  fontSize={16}
                >
                  گزارش قیمت مناسب تر
                  <p style={{ fontSize: 12, marginTop: ".5rem" }}>{title}</p>
                </Typography>
                <IconButton  onClose={handleClose}>
                  <CloseIcon />
                </IconButton>
              </div>
              <Typography
                component={"div"}
                id="transition-modal-description"
                sx={{ mt: 2 }}
              >
                <div className="mb-4">
                  <p className="mb-3 text-sm">کالا را با چه قیمتی دیده اید؟</p>
                  <TextField
                    id="outlined-basic"
                    size="small"
                    label="قیمت کالا"
                    variant="outlined"
                    placeholder="قیمت کالا را به تومان وارد کنید"
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                          borderColor: "var(--theme-color)",
                        },
                      },
                      "& label.Mui-focused": {
                        color: "var(--theme-color)",
                      },
                    }}
                  />
                </div>

                <div className="mb-4">
                  <FormControl component="fieldset">
                    <FormGroup aria-label="position">
                      <FormControlLabel
                        value="end"
                        control={
                          <Checkbox
                            size="small"
                            sx={{
                              padding: "5px",
                              "&.Mui-checked": {
                                color: "#ff7900",
                              },
                              "& .MuiSvgIcon-root": { fontSize: 18 },
                            }}
                          />
                        }
                        label={
                          <span style={{ fontSize: "0.875rem" }}>
                            در فروشگاه اینترنتی دیده ام
                          </span>
                        }
                        labelPlacement="end"
                        sx={{ margin: "0" }}
                      />
                    </FormGroup>
                  </FormControl>
                </div>

                <div className="mb-4">
                  <p className="mb-3 text-sm">نام فروشگاه</p>
                  <TextField
                    id="outlined-basic"
                    size="small"
                    label="نام فروشگاه "
                    variant="outlined"
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                          borderColor: "var(--theme-color)",
                        },
                      },
                      "& label.Mui-focused": {
                        color: "var(--theme-color)",
                      },
                    }}
                  />
                </div>

                <div className="mb-4">
                  <p className="mb-3 text-sm">شماره تماس</p>
                  <TextField
                    id="outlined-basic"
                    size="small"
                    label="شماره تماس"
                    variant="outlined"
                    placeholder="شماره تماس خود را وارد کنید"
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                          borderColor: "var(--theme-color)",
                        },
                      },
                      "& label.Mui-focused": {
                        color: "var(--theme-color)",
                      },
                    }}
                  />
                </div>

                <span className="text-sm text-theme mb-4 block">
                  در صورت تایید قیمت گزارش شده، کالا به همان قیمت + تخفیف به شما
                  اعطا می شود. برای دریافت حتما شماره تماس خود را وارد نمایید
                </span>

                <div className="bg-theme rounded-[4px]">
                  <ColorButtonOrder variant="contained">
                    <p className={`text-sm`}>ثبت</p>
                  </ColorButtonOrder>
                </div>
              </Typography>
              <div className="my-4">
                <p dir="ltr" className="w-fit px-2 border">
                  {captcha}
                </p>
              </div>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
