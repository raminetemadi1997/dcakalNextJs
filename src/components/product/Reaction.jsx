import React, { useContext, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import axios from "@/lib/axios";
import { SnakebarContext } from "@/context/snakebar";

const Reaction = ({ type, likes, dislikes, id, position }) => {
  const [like, setLike] = useState(Number(likes));
  const [dislike, setDisLike] = useState(Number(dislikes));
  const { setOpenAlarm, setModes, setMessage, setDuration } = useContext(SnakebarContext);
  const likeHandler = () => {
    position == "question"
      ? axios.get(`api/product-actions/forum-like/${id}`).then(() => {
          setLike((prev) => prev + 1);
          setOpenAlarm(true);
          setModes("success");
          setMessage("به تعداد علاقه مندی ها افزوده شد");
          setDuration(2000);
        })
      : axios.get(`api/product-actions/comment-like/${id}`).then(() => {
          setLike((prev) => prev + 1);
          setOpenAlarm(true);
          setModes("success");
          setMessage("به تعداد علاقه مندی ها افزوده شد");
          setDuration(2000);
        });
  };

  const dislikeHandler = () => {
    position == "question"
      ? axios.get(`api/product-actions/forum-dislike/${id}`).then(() => {
          setDisLike((prev) => prev + 1);
          setOpenAlarm(true);
          setModes("error");
          setMessage("از تعداد علاقه مندی ها کم شد");
          setDuration(2000);
        })
      : axios.get(`api/product-actions/comment-dislike/${id}`).then(() => {
          setDisLike((prev) => prev + 1);
          setOpenAlarm(true);
          setModes("error");
          setMessage("از تعداد علاقه مندی ها کم شد");
          setDuration(2000);
        });
  };

  return (
    <Stack direction="row" spacing={1} className="last:mr-2">
      {type === "like" ? (
        <div className={`flex items-center`}>
          <IconButton
            color="success"
            aria-label="add a deslike"
            size="small"
            onClick={likeHandler}
          >
            <ThumbUpIcon fontSize="small" />
          </IconButton>
          <p className="text-sm">{like}</p>
        </div>
      ) : type === "dislike" ? (
        <div className={`flex items-end`}>
          <IconButton
            color="error"
            aria-label="add a like"
            size="small"
            onClick={dislikeHandler}
          >
            <ThumbDownIcon fontSize="small" />
          </IconButton>
          <p>{dislike}</p>
        </div>
      ) : null}
    </Stack>
  );
};

export default Reaction;
