"use client";
import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

const QuickTabs = ({ title, selectValue }) => {
  const [scrollYPosition, setScrollYPosition] = useState(0);
  const dataTarget = [
    "1",
    "productSpecifications",
    "question",
    "tableRef",
    "review",
  ];
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleScroll = () => {
    const newScrollYPosition = window.scrollY;
    setScrollYPosition(newScrollYPosition);
  };
  useEffect(() => {
    if (title.length > 1) {
      selectValue(value);
    }
  }, [value, selectValue, title , scrollYPosition]);

  const ClickHandler = (index) => {
    const element = document.getElementById(index);
    element?.scrollIntoView({
      behavior: "smooth",
      inline: "nearest",
    });
  };

  return (
    <Box
      sx={{
        width: "100%",
        position: "absolute",
        backgroundColor: "#fff",
        boxShadow:
          "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
      }}
    >
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
          <Tab
            key={i}
            value={i}
            label={data}
            onClick={() => ClickHandler(dataTarget[i])}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default QuickTabs;
