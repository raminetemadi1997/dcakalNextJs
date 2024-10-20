import React, { useEffect, useState } from 'react';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import dynamic from "next/dynamic";
import Skeleton from "@mui/material/Skeleton";

const Radio = dynamic(() => import("@mui/material/Radio"), {
    ssr: false,
    loading: () => (
      <Skeleton variant="circular" width={38} height={38} animation="pulse" />
    ),
  });

  const radioStyle = {
    color: "var(--theme-color)",
    "&.Mui-checked": { color: "var(--theme-color)" },
}

const RadioCustom = ({ row = true, label, selected, values = [], ...props }) => {

    return (
        <FormControl>
            <FormLabel id="demo-radio-buttons-group-label" sx={{ "&.Mui-focused": { color: "var(--theme-color)" } }}>{label}</FormLabel>
            <RadioGroup
                row={row}
                aria-labelledby="demo-radio-buttons-group-label"
                value={selected}
                name="radio-buttons-group"
                {...props} 
            >
                {values.length > 0 && (
                    <>
                        {values.map((value, index) => (
                            <FormControlLabel key={index} value={index} control={<Radio size='small' sx={radioStyle} />} label={value} />
                        ))}
                    </>
                )}
            </RadioGroup>
        </FormControl>
    );
};

export default RadioCustom;