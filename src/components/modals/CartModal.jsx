import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";
import ButtonCustom from "../constantElements/ButtonCustom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: ".5rem",
};

const ColorButton = styled(Button)(({ theme }) => ({
  marginTop: "1rem",
  backgroundColor: "var(--theme-color) !important",
}));

const CartModal = ({ openModal, setOpen }) => {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            component="div"
            sx={{ textAlign: "center", position: "relative" }}
          >
            ثبت محصول
            
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, textAlign: "center" }}
          >
            محصول شما با موفقیت ثبت شد
          </Typography>
          <div className="text-center flex gap-2 justify-center mt-4">
            
            <ButtonCustom
              color="#A4A4A4"
              text='ادامه خرید'
              onClick={handleClose}
            />
            <ButtonCustom
              text='سبد خرید'
              link='/cart'
            />
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default CartModal;
