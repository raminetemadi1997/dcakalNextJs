"use client";
import React, {  useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Title from "../../components/main/Title";
import styled from "@emotion/styled";
import OrderStepper from "../dashboard/OrderStepper";
import Card from '../Card';
import TabCustom from "@/components/constantElements/TabCustom";

const OrderDetails = ({data = null , openModal , onClick , ...props }) => {


  
  
  const Container = styled("div")({
    padding: ".5rem",
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "1rem",
  });

  const DetailContainer = styled("div")({
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: ".5rem",
    padding: ".5rem",
  });

  const Details = styled("div")({
    display: "flex",
    alignItems: "center",
    fontSize: ".875rem",
  });
  
  const DetailBold = styled("p")({
    fontWeight: "bold",
  });

  const Head = styled('div')({
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
    padding:'1rem',
    backgroundColor:'#fff',
    position:'sticky',
    top:0,
    zIndex:10,
    boxShadow:' rgba(0, 0, 0, 0.04) 0px 3px 5px',
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 900,
    "@media (max-width: 540px)":{
      width:'95%',
      maxHeight: "95vh",
    },
    bgcolor: "background.paper",
    border: "1px solid var(--border-color)",
    boxShadow: 24,
    borderRadius: ".5rem",
    overflow: "auto",
    maxHeight: "99vh",
  };

  const [page, setPage] = useState(0);
  

  return data && (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        closeAfterTransition
        {...props}
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openModal}>
          <Box sx={style}>
            <Head>
              <p>جزییات سفارش</p>
              <IconButton onClick={onClick}>
                <CloseIcon />
              </IconButton>
            </Head>
            
            <TabCustom 
            value={["جزییات سفارش", "سبد سفارش"]}
            onChange={(event, newValue) => setPage(newValue)}
            selected={page}
            />
            {page == "0" ? (
              <Container>
                <div>
                  <Title position="line" titleValue="وضعیت سفارش" />
                  <OrderStepper steps={data} />
                </div>
                
                <div className="grid sm:grid-cols-2 grid-cols-1 gap-2">
                  <div>
                    <Title position="line" titleValue="اطلاعات سفارش" />
                    <DetailContainer>
                      <Details>
                        <p>شماره سفارش : </p>
                        <DetailBold>{data.order_code}</DetailBold>
                      </Details>
                      
                    </DetailContainer>
                  </div>

                  <div>
                    <Title position="line" titleValue="اطلاعات تحویل گیرنده" />
                    <DetailContainer>
                      <Details>
                        <p>نام و نام خانوادگی :</p>
                        <DetailBold>{data.address.recipient}</DetailBold>
                      </Details>
                      <Details>
                        <p>تلفن همراه :</p>
                        <DetailBold>{data.address.mobile}</DetailBold>
                      </Details>
                      <Details>
                        <p>آدرس :</p>
                        <DetailBold>
                        {data.address.full_address}
                        </DetailBold>
                      </Details>
                    </DetailContainer>
                  </div>

                  <div>
                    <Title position="line" titleValue="اطلاعات پرداخت" />
                    <DetailContainer>
                      <Details>
                        <p>مبلغ پرداخت شده :</p>
                        <DetailBold>
                          {Number(data.order_final_amount).toLocaleString()} تومان
                        </DetailBold>
                      </Details>
                      <Details>
                        <p>روش پرداخت :</p>
                        <DetailBold>خرید اینترنتی</DetailBold>
                      </Details>
                    </DetailContainer>
                  </div>

                  <div>
                    <Title position="line" titleValue="اطلاعات ارسال" />
                    <DetailContainer>
                      <Details>
                        <p>ارسال از طریق :</p>
                        <DetailBold></DetailBold>
                      </Details>
                      <Details>
                        <p>هزینه ارسال :</p>
                        <DetailBold></DetailBold>
                      </Details>
                      <Details>
                        <p>کد پیگیری مرسوله :</p>
                        <DetailBold></DetailBold>
                      </Details>
                      <Details>
                        <p>زمان ارسال :</p>
                        <DetailBold></DetailBold>
                      </Details>
                      <Details>
                        <p>زمان تحویل :</p>
                        <DetailBold></DetailBold>
                      </Details>
                    </DetailContainer>
                  </div>
                </div>
              </Container>
            ) : (
              <Container>
                <Card type='slider' position='list' data='cctv'/>
                <Card type='slider' position='list' data='alarm'/>
              </Container>
            )}
            
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default OrderDetails;
