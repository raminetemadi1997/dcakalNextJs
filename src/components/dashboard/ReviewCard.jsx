"use client";
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import DashboardButton from "./DashboardButton";

const ReviewCard = ({slug='/',alt , image, name }) => {
  return (
    <Card
    component='a'
    title={alt}
    href={slug}
    >
      <CardActionArea
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3 , 1fr)",
          gap: ".5rem",
          padding: 1,
        }}
      >
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt={alt}
          title={alt}
        />
        <CardContent sx={{ gridColumn: "2 span" }}>
          <Typography variant="body2" color="text.secondary">
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ReviewCard;
