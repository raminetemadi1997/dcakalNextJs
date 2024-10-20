import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { usePathname } from "next/navigation";

const CircularProgressWithLabel = (props) => {
  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
        width: "213px",
        height: "213px",
        "@media (max-width: 540px)": {
          width: "162px",
          height: "162px",
        },
      }}
    >
      <CircularProgress
        variant="determinate"
        {...props}
        sx={{
          width: "213px !important",
          height: "213px !important",
          backgroundColor: "#3DAFA540",
          borderRadius: "50%",
          color: "#007C70",
          "@media (max-width: 540px)": {
            width: "162px !important",
            height: "162px !important",
          },
        }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
          sx={{
            backgroundColor: "#fff",
            width: "82%",
            height: "82%",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "30px",
            fontWeight: "bold",
            color: "#000000",
          }}
        >
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
};

const LinearProgressWithLabel = (props) => {
  const passName = usePathname();

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress
          variant="determinate"
          {...props}
          sx={{
            ...(passName === "/product"
              ? {
                  backgroundColor: "#ff790036",
                }
              : {
                  backgroundColor: "#3DAFA540",
                }),
            "& .MuiLinearProgress-bar": {
              ...(passName === "/product"
                ? {
                    backgroundColor: "var(--theme-color)",
                  }
                : {
                    backgroundColor: "#007C70",
                  }),
            },
          }}
        />
      </Box>
    </Box>
  );
};

CircularProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

const Progress = ({ range, type, progressValue , rangesKey , rangesValue }) => {
  

  return (
    <>
      {type === "Circular" ? (
        <CircularProgressWithLabel value={range} />
      ) : type === `Linear` ? (
        !rangesKey ?
        <Box sx={{ display:'grid' , gridTemplateColumns:'1fr 1fr' , gap:'1rem'  }}>
          {progressValue ? progressValue.map((progress) => {
            return (
              <Fragment key={progress.id}>

              <Box key={progress.id}>
                <Typography color="text.primary" sx={{ fontSize: "12px" }}>
                  {progress.title}
                </Typography>
                <LinearProgressWithLabel
                  value={parseInt(progress.percentage)}
                />
              </Box>
              </Fragment>
            );
          }):<></>}
        </Box>
        :
        <Box sx={{ display:'grid' , gridTemplateColumns:'1fr' , gap:'1rem' , width:'100%' }}>
        {rangesKey && rangesKey.map((progress , i) => {
          return (
            <Fragment key={i}>
            <Box>
              <Typography color="text.primary" sx={{ fontSize: "12px" }}>
                {progress == 'very_bad' ? "خیلی بد" : progress == 'bad' ? 'بد' :progress == 'middle' ? 'متوسط' : progress == 'good' ? 'خوب' : progress == 'very_good' ? 'خیلی خوب' : null}
              </Typography>
              <LinearProgressWithLabel
                value={rangesValue[i]}
              />
            </Box>
            </Fragment>
          );
        })}
      </Box>
      ) : null}
    </>
  );
};

export default Progress;
