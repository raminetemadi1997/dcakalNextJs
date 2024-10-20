import React, { useContext, useState, useRef, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { SnakebarContext } from "../../context/snakebar";
import ButtonCustom from "../constantElements/ButtonCustom";
import TextareaCustom from "../constantElements/TextareaCustom";
import TextFieldCustom from "@/components/constantElements/TextFieldCustom";
import CloseIcon from "@mui/icons-material/Close";
import { SettingApi } from "@/context/api/Setting";
import axios from "@/lib/axios";




const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  "@media (max-width: 540px)": {
    width: 350,
  },
  bgcolor: "background.paper",
  border: "1px solid #e5e7eb",
  boxShadow: 24,
  p: 1,
  borderRadius: ".75rem",
};

let idCount = -1;
const AnswerQuestion = ({ id, text, clickHandler, onSubmited, itemIndex }) => {
  const { dataUser } = useContext(SettingApi);
  const textareaRef = useRef();
  const [open, setOpen] = useState(false);
  const [textArea, setTextArea] = useState("");
  const [name, setName] = useState("");
  const [family, setFamily] = useState("");
  const [email, setEmail] = useState("");
  const [mobileValue, setMobileValue] = useState("");
  const [answer, setAnswer] = useState({
    maxLength: 150,
    currentLength: 0,
  });


  useEffect(() => {
    if (dataUser) {
      setName(dataUser.data.first_name ? dataUser.data.first_name : "");
      setFamily(dataUser.data.last_name ? dataUser.data.last_name : "");
      setMobileValue(dataUser.data.mobile ? dataUser.data.mobile : "");
      setMobileValue(dataUser.data.email ? dataUser.data.email : "");
    }
  }, [dataUser]);

  const { setOpenAlarm, setModes, setMessage, setDuration } =
  useContext(SnakebarContext);
  const handleOpen = (index) => {
    setOpen(true);
    setAnswer((prev) => ({ ...prev, currentLength: 0 }));
    itemIndex(index);
  };

  const handleClose = () => {
    setOpen(false);
    setAnswer((prev) => ({ ...prev, currentLength: 0 }));
  };

  const acceptedHandler = () => {
    idCount++;
    setOpen(false);
    setOpenAlarm(false);
    onSubmited(textareaRef.current.value);
  };

  const acceptHandler = (e) => {
    e.preventDefault();
    // get csrf token
    axios.get("/sanctum/csrf-cookie").then((getcsrvf) => {});
    return axios({
      method: "post",
      url: `api/product-actions/forum-answer/${id}`,
      data: {
        body: textArea,
        first_name: name,
        last_name: family,
        email: email,
        mobile: mobileValue,
      },
      responseType: "json",
    }).then(
      (response) => {
        setOpenAlarm(true);
        setModes("success");
        setMessage(response.data.message);
        setDuration(2000);
        setOpen(false);
      },
      (error) => {}
    );
  };

  return (
    <div>
      <ButtonCustom
        onClick={() => setOpen(true)}
        text={text}
        variant="text"
        fontSize="13px"
        chevron={true}
      />
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
          <form onSubmit={acceptHandler}>
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
                  پاسخ خود را ثبت کنید
                </Typography>
                <CloseIcon
                  sx={{ cursor: "pointer" }}
                  onClick={() => setOpen(false)}
                />
              </Box>

              <div className="flex flex-col gap-2">
                <div className="grid grid-cols-2 gap-2">
                  <TextFieldCustom
                    onChange={(event) => setName(event.target.value)}
                    size="small"
                    fullWidth
                    required={true}
                    value={name}
                    label="نام"
                  />
                  <TextFieldCustom
                    onChange={(event) => setFamily(event.target.value)}
                    size="small"
                    fullWidth
                    required={true}
                    value={family}
                    label="نام خانوادگی"
                  />
                  <TextFieldCustom
                    onChange={(event) => setEmail(event.target.value)}
                    size="small"
                    fullWidth
                    value={email}
                    label="ایمیل"
                  />
                  <TextFieldCustom
                    onChange={(event) => setMobileValue(event.target.value)}
                    size="small"
                    fullWidth
                    required={true}
                    value={mobileValue}
                    type="number"
                    label="موبایل"
                  />
                </div>

                <TextareaCustom
                  fullWidth
                  maxLength={1500}
                  required={true}
                  size="small"
                  label="پاسخ"
                  onChange={(event) => setTextArea(event.target.value)}
                  value={textArea ? textArea : ""}
                />

                <ButtonCustom text="ثبت پاسخ" fullWidth />
              </div>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default AnswerQuestion;
