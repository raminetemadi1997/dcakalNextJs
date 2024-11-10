"use client"
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { useFormContext } from "@/context/FormContext";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  border: "unset",
  boxShadow: 24,
  //   p: " 0 .5rem 0 0",
  borderRadius: ".5rem",
};

const tableStyle = {
  height: 528,
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#f1f1f1",
    borderRadius: " 20px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "gray",
    borderRadius: " 20px",
  },
};

function createData(name, calories) {
  return { name, calories };
}

export default function FormModal({ open, close, userInfo }) {
  //   const [open, setOpen] = useState(true);
  const {
    productType,
    area,
    rollPrice,
    bladePrice,
    rollingMotorValue,
    accessoriesValue,
    ironValue,
    supportPrice,
    finalprice,
    setPrint
  } = useFormContext();
  const rows = [
    createData("نام", userInfo ? userInfo.name : "-"),
    createData("نام خانوادگی", userInfo ? userInfo.family : "-"),
    createData("شماره تماس", userInfo ? userInfo.phoneNumber : "-"),
    createData("نوع کاربری", productType),
    createData("مساحت کرکره برقی", area ? `${Math.round(area)} متر مربع` : "-"),
    createData(
      "قیمت ریل",
      rollPrice > 0 ? `${rollPrice.toLocaleString()} تومان` : "-"
    ),
    createData(
      "قیمت تیغه",
      bladePrice > 0 ? `${bladePrice.toLocaleString()} تومان` : "-"
    ),
    createData(
      "قیمت موتور",
      rollingMotorValue > 0
        ? `${rollingMotorValue.toLocaleString()} تومان`
        : "-"
    ),
    createData(
      "آپشن های انتخابی",
      accessoriesValue.length > 0 ? accessoriesValue.length : 0
    ),
    createData(
      "هزینه آهنکشی",
      ironValue > 0 ? `${ironValue.toLocaleString()} تومان` : "-"
    ),
    createData(
      "هزینه نصب",
      supportPrice > 0 ? `${supportPrice.toLocaleString()} تومان` : "-"
    ),
    createData(
      "جمع پیش فاکتور",
      finalprice > 0 ? `${finalprice.toLocaleString()} تومان` : "-"
    ),
    createData("نوع سفارش شما", "-"),
  ];

 
  const printHandler =()=>{
    // setPrint(prevPrint => !prevPrint)
    // window.print()
    // printData()
  }
  

  function printData() {
    var divToPrint = document.querySelector(".printTable");
    let newWin
    newWin = window.open("");
    newWin.document.write("<html><head><title>پیش فاکتور محاسبه شده</title>");
    newWin.document.write(
        `<style>
        <title{font-size:20px;}
        @font-face{font-display:swap;font-family:IRANSans;font-style:normal;font-weight:300;src:url(/fonts/woff2/IRANSansWeb_FaNum_Bold.woff2)}
        *{font-family:iranSans;}
        td{line-height: 2.5;font-weight: 300;padding-right: 10px;text-align: justify;width: 50%;padding: 10px;border: 1px solid #d5d5d5;color: #000000;font-size: 16px;font-size:14px;}
        td:nth-child(even){background: #f2f2f2;}
        td:nth-child(odd){background: darkgray;} 
        table{direction:rtl;width: 100%;border: 1px solid #cecece;padding: 5px;diplay:block;margib:0 auto;}
        </style>`
    );
    newWin.document.write("</head>");
    newWin.document.write("<body>");
    newWin.document.write(divToPrint.outerHTML);
    newWin.document.write("</body></html>");
    newWin.print();
    newWin.close();
}



  return (
    <div>
      <Modal
        open={open}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TableContainer component={Paper} sx={tableStyle}>
            <div className="grid grid-cols-3 p-2" >
              {/* <ButtonCustom 
              text="چاپ پیش فاکتور"
              title="چاپ پیش فاکتور"
               color="#a4a4a4" 
               /> */}
               
              
              <div className="col-start-2 flex items-center justify-center font-bold">
                پیش فاکتور
              </div>
              <div className="flex items-center justify-end">
                <IconButton onClick={close}>
                  <CloseIcon />
                </IconButton>
              </div>
            </div>
            <Table
                className="print_table"
              stickyHeader
              sx={{ minWidth: 650 }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>اقلام</TableCell>
                  <TableCell align="left">قیمت</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="left">{row.calories}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {/* <div onClick={printHandler} className="print">چاپ پیش فاکتور</div> */}
          </TableContainer>
        </Box>
        
      </Modal>
    </div>
  );
}
