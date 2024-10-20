import React, { useRef } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Link from "next/link";
import ImageCustom from "../constantElements/ImageCustom";
import { memo } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));



const ComparisonTable = ({ similars, attributeSimilars }) => {
  const tableRef = useRef();
  return (
    <>
      <div className="flex justify-between items-center mb-2 mt-12">
        <p className="font-bold mb-2">مقایسه با دیگر محصولات</p>
      </div>
      <TableContainer
        id="tableRef"
        ref={tableRef}
        sx={{
          scrollMarginTop: "124px",
          marginBottom: "2.5rem",
          boxShadow:
            "rgb(60 64 67 / 30%) 0px 1px 2px 0px, rgb(60 64 67 / 15%) 0px 1px 3px 1px",
          border: "1px solid #e5e7eb",
        }}
        component={Paper}
      >
        <Table
          sx={{ minWidth: 700 }}
          aria-label="customized table"
          size="medium"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>عکس</StyledTableCell>
              {similars.map((similarsValue) => {
                return (
                  <StyledTableCell align="right" key={similarsValue.id}>
                    <Link
                      href={`/${similarsValue.slug}`}
                      title={similarsValue.image_alt}
                    >
                      <ImageCustom
                          data={similarsValue.image}
                          alt={similarsValue.image_alt}
                          title={similarsValue.image_alt}
                
                          // props 
                          loading={"lazy"}
                          height={210}
                          width={210}
                      />
                    </Link>
                  </StyledTableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
          <StyledTableRow>
              <StyledTableCell component="th" scope="row">
                نام محصول
              </StyledTableCell>
              {similars.map((similarsValue) => {
                return (
                  <StyledTableCell
                    component="th"
                    scope="row"
                    align="center"
                    key={similarsValue.id}
                  >
                    {similarsValue.alt_name}
                  </StyledTableCell>
                );
              })}
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell component="th" scope="row">
                قیمت
              </StyledTableCell>
              {similars.map((similarsValue) => {
                return (
                  <StyledTableCell
                    component="th"
                    scope="row"
                    align="center"
                    key={similarsValue.id}
                  >
                    {`${Number(similarsValue.price).toLocaleString()} تومان`}
                  </StyledTableCell>
                );
              })}
            </StyledTableRow>

            {attributeSimilars.map((attribute, index) => {
              return (
                <StyledTableRow key={index}>
                  <StyledTableCell component="td" scope="row">
                    {attribute[0]}
                  </StyledTableCell>
                  {attribute[1].map((value, i) => {
                    return (
                      <StyledTableCell align="center" key={i}>
                        {value}
                      </StyledTableCell>
                    );
                  })}
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default memo(ComparisonTable);
