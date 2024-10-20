"use client";
import React, { useContext, useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import TextField from "@mui/material/TextField";
import UploadImage from "../UploadImage";
import axios from "@/lib/axios";
import CloseIcon from "@mui/icons-material/Close";
import TextFieldCustom from "@/components/constantElements/TextFieldCustom";
import TextareaCustom from "../../components/constantElements/TextareaCustom";
import ButtonCustom from "@/components/constantElements/ButtonCustom";
import { SnakebarContext } from "../../context/snakebar";
import styles from "@/assets/css/category/MainCategory.module.css";
import { SettingApi } from "@/context/api/Setting";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  height: "auto",
  overflowY: "auto",
  "@media (max-width: 540px)": {
    width: 350,
  },
  bgcolor: "background.paper",
  border: "1px solid #e5e7eb",
  boxShadow: 24,
  p: 1,
  borderRadius: ".75rem",
};

const ColorButtonOrder = styled(Button)(({ theme }) => ({
  color: "#fff",
  padding: ".5rem 0",
  width: "80%",
  "@media (max-width: 540px)": {
    width: "100%",
  },
  backgroundColor: "var(--theme-color) !important",
  "&:hover": {
    backgroundColor: "var(--theme-color)",
  },
}));

const labels = {
  1: "خیلی بد",
  2: "بد",
  3: "متوسط",
  4: "خوب",
  5: "خیلی خوب",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

function ChildModal({
  openChildModal = false,
  closeChildModal,
  value,
  childPhone,
  childSubmit,
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Modal
        open={openChildModal}
        onClose={closeChildModal}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style }} className="flex flex-col gap-4 w-1/4">
          <div className="flex justify-between items-center">
            <h3 id="child-modal-title">کد ارسال شده را وارد نمائید</h3>
            <CloseIcon sx={{ cursor: "pointer" }} onClick={closeChildModal} />
          </div>
          <form className="flex flex-col gap-4" onSubmit={childSubmit}>
            <TextFieldCustom
              type="number"
              fullWidth
              value={value}
              onChange={childPhone}
            />
            <ButtonCustom text="ثبت" justifyContent="center" />
          </form>
        </Box>
      </Modal>
    </>
  );
}

export default function ReviewModal({ dataState, imageData, slug }) {
  const { dataUser } = useContext(SettingApi);

  const [reviewState, setReviewState] = useState({
    title: "",
    name: "",
    family: "",
    phoneNumber: "",
    email: "",
    review: "",
  });

  useEffect(() => {
    if (dataUser) {
      if (dataUser.data.activation == 1) {
        setReviewState((prev) => ({
          ...prev,
          name: dataUser.data.first_name ? dataUser.data.first_name : "",
          family: dataUser.data.last_name ? dataUser.data.last_name : "",
          phoneNumber: dataUser.data.mobile ? `0${dataUser.data.mobile}` : "",
        }));
      }
    }
  }, [dataUser]);

  const { setOpenAlarm, setModes, setMessage, setDuration } =
    useContext(SnakebarContext);

  const [open, setOpen] = useState(false);
  const [token, setToken] = useState(null);
  const [childPhone, setChildPhone] = useState(null);
  const [openChildModal, setOpenChildModal] = useState(false);
  const [value, setValue] = useState(3);
  const [hover, setHover] = useState(-1);
  const [imageItems, setImageitems] = useState();

  const handleOpen = () => {
    setOpen(true);
    setValue(3);
    setState((prevValue) => ({
      ...prevValue,
      currentLength: 0,
    }));
  };

  const handleClose = () => {
    setOpen(false);
    setValue(3);
    setState((prevValue) => ({
      ...prevValue,
      currentLength: 0,
    }));
  };

  const [state, setState] = useState({
    minimumTextarea: 5,
    minimumInput: 3,
    currentLength: 0,
    maxLength: 350,
    titleLength: 0,
    selectImages: [],
  });

  const data = (e) => {
    setImageitems(e);
    setState((current) => ({
      ...current,
      selectImages: [...state.selectImages, e],
    }));
  };

  const submitForm = async (event) => {
    event.preventDefault();
    axios.get("/sanctum/csrf-cookie");
    axios
      .post(`api/product-actions/comment/${slug}`, {
        body: reviewState.review,
        title: reviewState.title,
        rate: value,
        image: imageItems,
        first_name: reviewState.name,
        last_name: reviewState.family,
        email: reviewState.email,
        mobile: reviewState.phoneNumber,
        token: token,
      })
      .then((response) => {
        if (response.data.type == "success") {
          setOpenAlarm(true);
          setModes("success");
          setMessage(response.data.message);
          setDuration(2000);
          setOpen(false);
          setReviewState((prev) => ({
            ...prev,
            title : '',
            review :''
          }));
        } else {
          setOpenChildModal(true);
          setToken(response.data.data.token);
        }
      })
      .catch((error) => {
        if (error.status == 422) {
          if (error.response.data.type == "comment_code") {
            setOpenChildModal(true);
            setOpenAlarm(true);
            setModes("error");
            setMessage(error.response.data.message);
            setDuration(2000);
          }
        }
      });
  };

  const childSubmit = async (event) => {
    event.preventDefault();
    axios.get("/sanctum/csrf-cookie");
    axios
      .post(`api/product-actions/comment/${slug}`, {
        body: reviewState.review,
        title: reviewState.title,
        rate: value,
        image: imageItems,
        first_name: reviewState.name,
        last_name: reviewState.family,
        email: reviewState.email,
        mobile: reviewState.phoneNumber,
        token: token,
        comment_code: childPhone,
      })
      .then((response) => {
        if (response.data.type == "success") {
          setOpenAlarm(true);
          setModes("success");
          setMessage(response.data.message);
          setDuration(2000);
          setOpen(false);
          setOpenChildModal(false);
          setChildPhone(null);
          setReviewState((prev) => ({
            ...prev,
            title: "",
            name: "",
            family: "",
            phoneNumber: "",
            email: "",
            review: "",
          }));
        } else {
          // setOpenAlarm(true);
          // setModes("success");
          // setMessage(response.data.message);
          // setDuration(2000);
        }
      })
      .catch((error) => {
        setOpenAlarm(true);
        setModes("success");
        // setMessage(error.data.message);
        setDuration(2000);
      });
  };

  return (
    <>
      <div>
        <ColorButtonOrder variant="contained" onClick={handleOpen}>
          <p className={`text-sm`}>ثبت نظر</p>
        </ColorButtonOrder>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <form onSubmit={submitForm}>
                <Box
                  sx={{
                    borderBottom: "1px solid #e5e7eb",
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 2,
                    paddingBottom: ".75rem",
                  }}
                >
                  <Typography
                    id="transition-modal-title"
                    variant="h6"
                    component="p"
                    sx={{
                      fontSize: 14,
                    }}
                  >
                    نظر خود را ثبت کنید
                  </Typography>
                  <CloseIcon
                    sx={{ cursor: "pointer" }}
                    onClick={() => setOpen(false)}
                  />
                </Box>

                <div
                  className={`${styles.items} h-[450px] overflow-y-auto pl-2`}
                >
                  <div className="mb-4">
                    <h2 className="mb-2 text-sm">امتیاز شما به این محصول</h2>
                    <div className="flex items-center">
                      <Rating
                        size="medium"
                        name="hover-feedback"
                        value={value}
                        precision={1}
                        getLabelText={getLabelText}
                        onChange={(event, newValue) => {
                          setValue(newValue);
                        }}
                        onChangeActive={(event, newHover) => {
                          setHover(newHover);
                        }}
                        emptyIcon={
                          <StarIcon
                            style={{ opacity: 0.55 }}
                            fontSize="inherit"
                          />
                        }
                        sx={{ color: "var(--theme-color)" }}
                      />
                      {value !== null && (
                        <Box sx={{ ml: 2, fontSize: 14 }}>
                          {labels[hover !== -1 ? hover : value]}
                        </Box>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <TextFieldCustom
                      size="small"
                      label="عنوان"
                      required={true}
                      fullWidth
                      onChange={(event) =>
                        setReviewState((prev) => ({
                          ...prev,
                          title: event.target.value,
                        }))
                      }
                      value={reviewState ? reviewState.title : ""}
                    />
                    <TextFieldCustom
                      size="small"
                      label="نام"
                      required={true}
                      fullWidth
                      onChange={(event) =>
                        setReviewState((prev) => ({
                          ...prev,
                          name: event.target.value,
                        }))
                      }
                      value={reviewState ? reviewState.name : ""}
                    />

                    <TextFieldCustom
                      size="small"
                      label="نام خانوادگی"
                      required={true}
                      fullWidth
                      onChange={(event) =>
                        setReviewState((prev) => ({
                          ...prev,
                          family: event.target.value,
                        }))
                      }
                      value={reviewState ? reviewState.family : ""}
                    />

                    <TextFieldCustom
                      size="small"
                      label="شماره همراه"
                      required={true}
                      type="number"
                      fullWidth
                      onChange={(event) =>
                        setReviewState((prev) => ({
                          ...prev,
                          phoneNumber: event.target.value,
                        }))
                      }
                      value={reviewState ? reviewState.phoneNumber : ""}
                    />
                    <TextFieldCustom
                      size="small"
                      label="ایمیل"
                      fullWidth
                      onChange={(event) =>
                        setReviewState((prev) => ({
                          ...prev,
                          email: event.target.value,
                        }))
                      }
                      value={reviewState ? reviewState.email : ""}
                    />
                    <TextareaCustom
                      fullWidth
                      maxLength={1500}
                      required={true}
                      size="small"
                      label="بررسی یا نظر"
                      className="col-span-2"
                      onChange={(event) =>
                        setReviewState((prev) => ({
                          ...prev,
                          review: event.target.value,
                        }))
                      }
                      value={reviewState ? reviewState.review : ""}
                    />
                  </div>

                  <div className="h-[144px] overflow-y-auto pl-2 mb-4">
                    <UploadImage reviewImages={data} />
                  </div>
                </div>
                <ButtonCustom text="ثبت نظر" fullWidth className="mt-5" />
              </form>
            </Box>
          </Fade>
        </Modal>
      </div>
      <ChildModal
        openChildModal={openChildModal}
        closeChildModal={() => setOpenChildModal(false)}
        childPhone={(event) => setChildPhone(event.target.value)}
        value={childPhone}
        childSubmit={childSubmit}
      />
    </>
  );
}
