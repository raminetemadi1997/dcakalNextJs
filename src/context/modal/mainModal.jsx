"use client";
import React, { createContext, useState, useContext } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "@/lib/axios";
import { SnakebarContext } from "../snakebar";

export const MainModalContext = createContext();

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
  p: 1,
  borderRadius: ".75rem",
};

export default function MainModalContextProvider({ children }) {
  const { setOpenAlarm, setModes, setMessage, setDuration } =
    useContext(SnakebarContext);
  const [open, setOpen] = useState(false);
  const [idPosition, setIdPostion] = useState(null);
  const [position, setPosition] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [accept, setAccept] = useState(false);
  const [url, setUrl] = useState();
  //   const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setIdPostion(null);
  };
  const acceptHandler = () => {
    position == "all products"
      ? axios.get(`api/remove-cart`).then((response) => {
          setUrl(response.config.url);
          setOpenAlarm(true);
          setModes("error");
          setMessage("تمامی محصولات با موفقیت حذف شدند");
          setDuration(3000);
        })
      : axios.get(`api/remove-from-cart/${idPosition}`).then((response) => {
          setUrl(response.config.url);
          setOpenAlarm(true);
          setModes("error");
          setMessage("محصول مورد نظر با موفقیت حذف شد");
          setDuration(3000);
        });
    setAccept(true);
    setOpen(false);
    setTimeout(() => {
      setAccept(false);
    }, 500);
  };

  return (
    <>
      <MainModalContext.Provider
        value={{
          open,
          setOpen,
          setDescription,
          setTitle,
          accept,
          setPosition,
          position,
          idPosition,
          setIdPostion,
          url,
        }}
      >
        {/* <Button onClick={handleOpen}>Open modal</Button> */}
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
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h5"
                sx={{ borderBottom: "1px solid var(--border-color)", pb: 2 }}
              >
                {title}
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                {description}
              </Typography>
              <div className="grid grid-cols-6 gap-4 mt-4">
                <Button
                  className="col-start-2 col-span-2"
                  color="success"
                  variant="contained"
                  onClick={acceptHandler}
                  sx={{ backgroundColor: "#2e7d32 !important" }}
                >
                  تایید
                </Button>
                <Button
                  className="col-span-2"
                  color="error"
                  variant="contained"
                  onClick={handleClose}
                  sx={{ backgroundColor: "#d32f2f !important" }}
                >
                  انصراف
                </Button>
              </div>
            </Box>
          </Fade>
        </Modal>
        {children}
      </MainModalContext.Provider>
    </>
  );
}
