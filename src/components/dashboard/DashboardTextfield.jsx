"use client";
import React from "react";
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField'

const DashboardTextfield = ({label , className}) => {
  return (
    <Box component="div" noValidate autoComplete="off" className={className}>
      <TextField
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
        id="outlined-basic"
        label={label}
        variant="outlined"
        size="small"
        fullWidth={true}
      />
    </Box>
  );
};

export default DashboardTextfield;
