"use client";
import React from "react";
import dynamic from "next/dynamic";
import Skeleton from '@mui/material/Skeleton';
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const CheckboxDynamic = dynamic(()=>import('@mui/material/Checkbox') , {ssr:false , loading:()=> <Skeleton variant="rectangular" width={42} height={42} animation='pulse' />})

const DashboardCheckbox = ({ value }) => {
  return (
    <FormControlLabel
      control={
        <CheckboxDynamic
          defaultChecked 
          sx={{
            color: 'var(--theme-color)',
            "&.Mui-checked": {
              color: 'var(--theme-color)',
            },
          }}
        />
      }
      label={value}
    />
  );
};

export default DashboardCheckbox;
