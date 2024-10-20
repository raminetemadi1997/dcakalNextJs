"use client";
import React, { useContext } from "react";
import Fab from "@mui/material/Fab";
import { AppBarContext } from "@/context/dashboard/AppBar";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import useMediaQuery from '@mui/material/useMediaQuery';

const FloatingButton = () => {
    const {setAppBarOpen } = useContext(AppBarContext);
    const mobile = useMediaQuery("(max-width:540px)");
  
  return mobile &&(
    <Fab
      onClick={() => setAppBarOpen(true)}
      size="medium"
      aria-label="add"
      sx={{
        position: "fixed",
        bottom: "11%",
        left: "4%",
        color: "#fff",
        backgroundColor: "var(--theme-color) !important",
      }}
    >
      <MoreVertIcon />
    </Fab>
  );
};

export default FloatingButton;
