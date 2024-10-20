"use client";
import React, { createContext, useState } from "react";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
export const SnakebarContext = createContext(null);

export default function SnakebarContextProvider({ children }) {
  const [openAlarm, setOpenAlarm] = useState(false);
  const [message, setMessage] = useState(
    " پرسش شما با موفقیت ثبت شد، پس از تایید کارشناسان نمایش داده خواهد شد"
  );
  const [modes, setModes] = useState("success");
  const [duration, setDuration] = useState(6000);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlarm(false);
  };

  return (
    <>
      <SnakebarContext.Provider
        value={{
          openAlarm,
          setOpenAlarm,
          modes,
          setModes,
          message,
          setMessage,
          setDuration,
        }}
      >
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
          open={openAlarm}
          autoHideDuration={duration}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity={modes} sx={{ width: "100%" }}>
            {message}
          </Alert>
        </Snackbar>
        {children}
      </SnakebarContext.Provider>
    </>
  );
}
