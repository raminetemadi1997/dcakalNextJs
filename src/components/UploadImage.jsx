"use client";
import React, { useState, useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import Image from "next/image";
import DeleteIcon from "@mui/icons-material/Delete";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import uploadDegree from "../../public/images/Dashboard/DegreeIcon.png";
import { SnakebarContext } from "@/context/snakebar";

let counter = -1;

const UploadImage = ({ reviewImages, type ,value, ...props }) => {
  const { setOpenAlarm, setModes, setMessage, setDuration } =
    useContext(SnakebarContext);

  const [file, setFile] = useState(null);

  const [profile, setProfile] = useState("");
  const [degree, setDegree] = useState(uploadDegree);

  const handleChange = (e) => {
    if (e.target.files.length) {
      setFile(URL.createObjectURL(e.target.files[0]));
      reviewImages(URL.createObjectURL(e.target.files[0]));
      e.target.value = null;
    }
  };

  const deleteHandler = (index, e) => {
    setFile(null);
    reviewImages(null);
    setOpenAlarm(true);
    setModes("error");
    setMessage("تصویر مورد نظر حذف شد");
    setDuration(1500);
  };

  const ProfileHandler = (e) => {
    if (e.target.files.length) {
      setProfile(URL.createObjectURL(e.target.files[0]));
    }
  };
  const degreeHandler = (e) => {
    if (e.target.files.length) {
      setDegree(URL.createObjectURL(e.target.files[0]));
    }
  };

  return type == "profile" ? (
    <div
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "4px",
        border: "1px solid rgba(0, 0, 0, 0.3)",
        display: "flex",
        alignItems: "center",
        padding: "0 .5rem",
        justifyContent: "space-between",
      }}
    >
      <Avatar sx={{ width: 32, height: 32 }} src={profile} />
      <Button
        component="label"
        sx={{ color: "var(--theme-color)" }}
        size="small"
      >
        افزودن عکس
        <input type="file" hidden onChange={ProfileHandler} />
      </Button>
    </div>
  ) : type == "degree" ? (
    <div className="border-[#A1A3A8] border-2 rounded-[4px] relative p-4">
      <p
        className="bg-white w-fit px-1 right-0 absolute text-[#72777A]"
        style={{
          fontSize: ".75rem",
          bottom: "calc(100% - 18px / 2)",
          right: "10px",
        }}
      >
        لطفا کارت ویزیت و یا جواز کسب خود را بارگزاری کنید.
      </p>
      <div className=" flex items-center justify-between">
        <input
          type="file"
          name="degreeUpload"
          id="degreeUpload"
          className="hidden"
          onChange={degreeHandler}
          {...props}
        />
        <Image src={value} alt="degree" width={214} height={93} />
        <label
          htmlFor="degreeUpload"
          className="cursor-pointer text-theme font-normal"
        >
          افزودن عکس
        </label>
      </div>
    </div>
  ) : (
    <ul className="grid grid-cols-4 gap-4">
      <li
        className={`list-none rounded-lg overflow-hidden relative group ${
          file ? "block" : "hidden"
        }`}
      >
        {file && (
          <Image
            src={file ? file : ""}
            alt="uploaded image"
            width={96}
            height={144}
            style={{
              borderRadius: "0.5rem",
              width: "100%",
              height: "144px",
            }}
          />
        )}

        <div className="absolute w-full h-full bg-red-500 rounded-3xl -top-[100%] -right-[100%] flex items-end justify-end p-2 bg-opacity-75 duration-150 ease-in group-hover:-top-[78%] group-hover:-right-[71%] hover:bg-opacity-100">
          <DeleteIcon
            fontSize="small"
            sx={{ color: "#fff", cursor: "pointer" }}
            onClick={deleteHandler}
          />
        </div>
      </li>
      <label
        htmlFor="upload"
        className={`w-full h-36 ${
          file ? "hidden" : "flex"
        } rounded-lg border border-dashed items-center justify-center cursor-pointer border-stone-600 bg-stone-200`}
      >
        <AddIcon
          sx={{
            fontSize: 35,
          }}
        />
      </label>
      <input
        type="file"
        id="upload"
        name="upload"
        onChange={handleChange}
        hidden
      />
    </ul>
  );
};

export default UploadImage;
