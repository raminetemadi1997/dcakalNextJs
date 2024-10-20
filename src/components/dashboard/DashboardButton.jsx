"use client";
import React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const DashboardButton = ({ value, justifyContent, styleCss , marginButton  }) => {
  const ColorButton = styled(Button)(({ theme }) => ({
    backgroundColor: styleCss
      ? `var(${styleCss}) !important`
      : "var(--theme-color) !important",
  }));

  return (
    <Stack spacing={2} direction="row" justifyContent={justifyContent} mb={marginButton}>
      <ColorButton variant="contained">{value}</ColorButton>
    </Stack>
  );
};

export default DashboardButton;
