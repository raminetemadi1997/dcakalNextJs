"use client";
import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import dynamic from "next/dynamic";
import { Skeleton } from "@mui/material";

const Box = dynamic(()=>import('@mui/material/Box') , {ssr:false , loading:()=><Skeleton variant="rectangular" height={49} style={{width :'100%'}} animation='wave' />});

const DashboardTabs = ({ title, selectValue }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (title.length > 1) {
      selectValue(value);
    }
  }, [value, selectValue, title]);

  return (
    <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="secondary tabs example"
        sx={{
          "& .MuiTab-root.Mui-selected": {
            color: "var(--theme-color)",
          },
          "& .MuiTabs-indicator": {
            backgroundColor: "var(--theme-color)",
          },
        }}
      >
        {title.map((data, i) => (
          <Tab key={i} value={i} label={data} />
        ))}
      </Tabs>
    </Box>
  );
};

export default DashboardTabs;
