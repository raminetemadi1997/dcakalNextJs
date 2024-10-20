"use client";
import React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const OrderStepper = ({ steps }) => {
  const stepsData = [
    "در حال بررسی",
    "تایید سفارش",
    "آماده سازی سفارش",
    "خروج از انبار",
    "تحویل به پست",
    "تحویل به مشتری",
  ];


  
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper
        activeStep={
          steps.delivery_status != 0
            ? steps.delivery_status == 2
              ? 4
              : steps.delivery_status == 3
              ? 5
              : null
            : steps.order_status == 1
            ? 0
            : steps.order_status == 3
            ? 2
            : null
        }
        alternativeLabel
        sx={{
          "& .MuiStepIcon-root.Mui-active": {
            color: "var(--theme-color)",
          },
          "& .MuiStepIcon-root.Mui-completed": {
            color: "var(--theme-color)",
          },
        }}
      >
        {stepsData.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default OrderStepper;
