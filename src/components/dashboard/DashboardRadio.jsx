"use client";
import React, { useEffect, useState , memo } from "react";
import dynamic from "next/dynamic";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Skeleton from "@mui/material/Skeleton";
import DashboardTextfield from "./DashboardTextfield";
import styled from "@emotion/styled";

const RadioDynamic = dynamic(() => import("@mui/material/Radio"), {
  ssr: false,
  loading: () => (
    <Skeleton variant="circular" width={38} height={38} animation="pulse" />
  ),
});

const TextFieldContainer = styled("div")({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  "@media (max-width:540px)": {
    gridTemplateColumns: "1fr",
  },
});

const DashboardRadio = ({
  label,
  values,
  type,
  direction,
  image,
  setImage,
}) => {
  const [select, setSelect] = useState(true);
  const [count , setCount] = useState(0)

  const changeHandler = (value, index) => {
    if (type === "booloan") {
      if (value === "بله") {
        setSelect(true);
      } else {
        setSelect(false);
      }
    }
    
    setImage && setImage(index);
  };

  

  return (
    <>
      <FormControl sx={{ my: 2 }}>
        <FormLabel
          id="demo-row-radio-buttons-group-label"
          sx={{ "&.Mui-focused": { color: "var(--theme-color)" } }}
        >
          {label}
        </FormLabel>
        <RadioGroup
          row={direction == "column" ? false : true}
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          defaultValue={0}
        >
          {values.map((data, i) => {
            return (
              <FormControlLabel
                onChange={() => changeHandler(data, i)}
                value={i}
                control={
                  <RadioDynamic
                    size="small"
                    sx={{
                      color: "var(--theme-color)",
                      "&.Mui-checked": { color: "var(--theme-color)" },
                    }}
                  />
                }
                label={data}
                key={i}
              />
            );
          })}
        </RadioGroup>
      </FormControl>
      {type === "booloan" && select == true ? (
        <TextFieldContainer>
          <DashboardTextfield label="درصورت لزوم شماره دیگری را وارد نمایید" />
        </TextFieldContainer>
      ) : null}
    </>
  );
};

export default memo(DashboardRadio);
