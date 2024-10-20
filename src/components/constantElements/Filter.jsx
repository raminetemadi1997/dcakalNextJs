"use client";

import React, { useEffect, useState, useContext } from "react";

import FormControl from "@mui/material/FormControl";

import InputLabel from "@mui/material/InputLabel";

import NativeSelect from "@mui/material/NativeSelect";

import Box from "@mui/material/Box";

import useMediaQuery from "@mui/material/useMediaQuery";

import Accordion from "@mui/material/Accordion";

import AccordionSummary from "@mui/material/AccordionSummary";

import Typography from "@mui/material/Typography";

import AccordionDetails from "@mui/material/AccordionDetails";

import Checkbox from "@mui/material/Checkbox";

import FormGroup from "@mui/material/FormGroup";

import FormControlLabel from "@mui/material/FormControlLabel";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import ButtonCustom from "./ButtonCustom";

import axios from "@/lib/axios";

import Chip from "@mui/material/Chip";

import Stack from "@mui/material/Stack";

import {
  useRouter,
  usePathname,
  redirect,
  useSearchParams,
} from "next/navigation";

export default function Filter({
  id,
  filters = [],
  type,
  sendData,
  scrollTo,
  currentSlug,
}) {

  let urlValue = [];

  let defaultOrder = "";
  let urlRegex = /=\d+&/g;

  if (scrollTo) {
    //مقدار اولیه تگ ها
    if (scrollTo.length > 10) {
      if (urlRegex.test(scrollTo)) {
        let orderurl = scrollTo
          .split("&")
          [scrollTo.split("&").length - 2].split("=")[1];
        defaultOrder = orderurl;

        let match = scrollTo.match(urlRegex);

        match.map((e) => {
          urlValue.push(Number(e.replace("=", "").replace("&", "")));
        });
      } else {
        let orderurl = scrollTo
          .split("&")
          [scrollTo.split("&").length - 2].split("=")[1];
        defaultOrder = orderurl;
      }
    }
  }

  const router = useRouter();
  const pathName = usePathname();

  let productValue;

  const mobile = useMediaQuery("(max-width : 540px)");

  const [expanded, setExpanded] = useState(
    filters.map((_, i) => (i == 0 ? true : false))
  );
  const [chipValue, setChipValue] = useState([]);
  const [order, setOrder] = useState("");

  const myMap = new Map();

  useEffect(() => {
    if (filters.length > 0) {
      if (type != "brand") {
        filters.map((items) => {
          return items.values.map((subItems, i) => {
            if (urlValue.indexOf(subItems.id) != -1) {
              myMap.set(i, subItems.value);
            }
          });
        });
      }
    }

    const newData = Array.from(myMap.values());

    if (JSON.stringify(newData) !== JSON.stringify(chipValue)) {
      setChipValue(newData);
    }
  }, []);

  const tags = [];

  function productFilterHandler(event) {
    productValue = event.target.value;

    submitHandler();
  }

  function submitHandler() {
    function collectSelectedValues() {
      const selectedValues = {};

      const checkboxes = document.querySelectorAll(
        'input[type="checkbox"]:checked'
      );

      checkboxes.forEach((checkbox) => {
        const name = checkbox.name;
        const value = checkbox.value;

        if (!selectedValues[name]) {
          selectedValues[name] = [];
        }

        selectedValues[name].push(value);
      });
      return selectedValues;
    }
    const data = collectSelectedValues();

    axios
      .get(`api/filter`, {
        params: {
          id: id,
          ...(type != "brand"
            ? {
                attr: data,
              }
            : {
                manufacturer: data,
              }),

          order_by: productValue,
        },
      })
      .then((response) => {
        // sendData(response);
        let urlFilter = response.data.products.first_page_url;
        urlFilter = urlFilter.split("?");

        // مسیر جدید URL
        const newUrl = urlFilter[1].toString();
        // window.history.pushState({ path: `${pathName}?${newUrl}` }, "", `${pathName}?${newUrl}`);
        router.push(`${pathName}?${newUrl}`);

        setTimeout(() => {
          const element = document.getElementById("products");
          element?.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
          });
        }, 5000);
      });
  }

  function handleChange(i) {
    let array = [...expanded];
    if (array[i]) {
      array[i] = false;
    } else {
      array[i] = true;
    }
    setExpanded(array);
  }

  const handleDelete = (event, value) => {
    const findElems = document.querySelectorAll(".attr-class");

    [...findElems].map((elem) => {
      if (elem.getAttribute("data-name") == value) {
        elem.querySelector("input").click();
      }
    });
  };

  function clickChange(event, elem) {
    if (type != "brand") {
      if (event.target.checked) {
        if (!chipValue.includes(elem.value)) {
          setChipValue((prev) => [...chipValue, elem.value]);
        }
      } else {
        let duplicateElem = chipValue.indexOf(elem.value);
        chipValue.splice(duplicateElem, 1);
        setChipValue([...chipValue]);
      }
    } else {
      if (event.target.checked) {
        if (!chipValue.includes(elem.name)) {
          setChipValue((prev) => [...chipValue, elem.name]);
        }
      } else {
        let duplicateElem = chipValue.indexOf(elem.name);
        chipValue.splice(duplicateElem, 1);
        setChipValue([...chipValue]);
      }
    }
  }

  function resetHandler() {
    router.push(`/${currentSlug}`);
    setChipValue([]);
    const findElems = document.querySelectorAll(".attr-class");
    [...findElems].map((elem) => {
      if (elem.querySelector("input").checked == true) {
        elem.querySelector("input").click();
      }
    });
  }

  return type == "product" ? (
    <>
      <Box
        sx={{
          minWidth: 120,
          marginRight: `${mobile === true ? 0 : "1rem"}`,
        }}
      >
        <FormControl fullWidth sx={{ color: "var(--theme-color)" }}>
          <InputLabel
            variant="standard"
            htmlFor="uncontrolled-native"
            sx={{
              "&.MuiInputLabel-root.Mui-focused": {
                color: "var(--theme-color)",
              },
            }}
          >
            نمایش براساس
          </InputLabel>
          <NativeSelect
            onChange={productFilterHandler}
            defaultValue={defaultOrder}
            inputProps={{
              name: "order_by",
              id: "uncontrolled-native",
              className: "product_filter",
            }}
            sx={{
              fontSize: "0.875rem",
              "&.MuiInputBase-root::after": {
                borderBottom: "2px solid var(--theme-color) !important",
              },
            }}
          >
            <option value={0} className="sm:text-base text-xs">
              ردیف
            </option>
            <option value="newest" className="sm:text-base text-xs">
              ابتدا محصولات جدید
            </option>

            <option value="min_price" className="sm:text-base text-xs">
              قیمت، کم به زیاد
            </option>
            <option value="max_price" className="sm:text-base text-xs">
              قیمت، زیاد به کم
            </option>
          </NativeSelect>
        </FormControl>
      </Box>
    </>
  ) : type == "brand" ? (
    <>
      <ButtonCustom
        onClick={submitHandler}
        text="اعمال فیلتر"
        color={
          chipValue.length > 0 || tags.length > 0
            ? "var(--theme-color)"
            : "#A4A4A4"
        }
        fullWidth
        className="sticky top-20 z-10"
        disabled={chipValue.length || tags.length > 0 > 0 ? false : true}
      />
      <Stack
        direction="row"
        spacing={1}
        paddingY={2}
        flexWrap="wrap"
        gap=".5rem"
      >
        {chipValue.map((name, index) => (
          <Chip
            key={index}
            label={name}
            onDelete={(event) => handleDelete(event, name)}
          />
        ))}
      </Stack>
      <Accordion
        sx={{
          boxShadow: "none",
          position: "static",
          borderBottom: ".5px solid #e5e7eb",
          margin: "0px 0px",
        }}
        expanded={true}
        // onChange={packageHandler}
        // onChange={() => handleChange(i)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{ paddingLeft: 0, paddingRight: 0 }}
        >
          <Typography sx={{ fontSize: "0.875rem" }}>برندها</Typography>
        </AccordionSummary>
        {filters &&
          filters.map((value) => {
            return (
              <AccordionDetails key={value.id} sx={{ padding: "0 0 .5rem 0" }}>
                <FormControl component="fieldset">
                  <FormGroup aria-label="position">
                    <FormControlLabel
                      value="end"
                      control={
                        <Checkbox
                          onChange={(event) => clickChange(event, value)}
                          className="attr-class"
                          value={value.id}
                          data-name={value.name}
                          name={value.en_name}
                          size="small"
                          sx={{
                            padding: "5px",
                            "&.Mui-checked": {
                              color: "#ff7900",
                            },
                            "& .MuiSvgIcon-root": {
                              fontSize: 18,
                            },
                          }}
                        />
                      }
                      label={
                        <span style={{ fontSize: "0.875rem" }}>
                          {value.name}
                        </span>
                      }
                      labelPlacement="end"
                      sx={{ margin: "0" }}
                    />
                  </FormGroup>
                </FormControl>
              </AccordionDetails>
            );
          })}
      </Accordion>
    </>
  ) : (
    <>
      {filters.length > 0 && (
        <>
          <div className="sticky top-20 z-10 flex flex-col gap-2">
            <ButtonCustom
              onClick={submitHandler}
              text="اعمال فیلتر"
              color={
                chipValue.length > 0 || tags.length > 0
                  ? "var(--theme-color)"
                  : "#A4A4A4"
              }
              fullWidth
              disabled={chipValue.length || tags.length > 0 > 0 ? false : true}
            />

            {urlValue.length > 0 && (
              <ButtonCustom
                text="حذف فیلتر"
                fullWidth
                color="red"
                // variant="text"
                onClick={resetHandler}
              />
            )}
          </div>
          <Stack
            direction="row"
            spacing={1}
            paddingY={2}
            flexWrap="wrap"
            gap=".5rem"
          >
            {chipValue.map((name, index) => (
              <Chip
                key={index}
                label={name}
                onDelete={(event) => handleDelete(event, name)}
              />
            ))}
          </Stack>
        </>
      )}
      {filters.map((attribute, i) => {
        return (
          attribute.values.length > 0 && (
            <Accordion
              key={attribute.id}
              sx={{
                boxShadow: "none",
                position: "static",
                borderBottom: ".5px solid #e5e7eb",
                margin: "0px 0px",
              }}
              expanded={expanded[i]}
              onChange={() => handleChange(i)}
              className={"attribute-name"}
              data-id-attr={attribute.id}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{ paddingLeft: 0, paddingRight: 0 }}
              >
                <Typography sx={{ fontSize: "0.875rem" }}>
                  {attribute.name}
                </Typography>
              </AccordionSummary>
              {attribute.values &&
                attribute.values.map((value, index) => {
                  return (
                    <AccordionDetails
                      key={value.id}
                      sx={{ padding: "0 0 .5rem 0" }}
                    >
                      <FormControl component="fieldset">
                        <FormGroup aria-label="position">
                          <FormControlLabel
                            control={
                              <Checkbox
                                defaultChecked={
                                  urlValue.indexOf(value.id) == -1
                                    ? false
                                    : true
                                }
                                onChange={(event) => clickChange(event, value)}
                                className="attr-class"
                                data-counter={index}
                                data-name={value.value}
                                name={`${attribute.name.replaceAll(" ", "-")}_${
                                  attribute.id
                                }`}
                                value={value.id}
                                data-id-attr-parent={attribute.id}
                                size="small"
                                sx={{
                                  padding: "5px",
                                  "&.Mui-checked": {
                                    color: "#ff7900",
                                  },
                                  "& .MuiSvgIcon-root": {
                                    fontSize: 18,
                                  },
                                }}
                              />
                            }
                            label={
                              <span
                                style={{
                                  fontSize: "0.875rem",
                                }}
                              >
                                {value.value}
                              </span>
                            }
                            labelPlacement="end"
                            sx={{ margin: "0" }}
                          />
                        </FormGroup>
                      </FormControl>
                    </AccordionDetails>
                  );
                })}
            </Accordion>
          )
        );
      })}
    </>
  );
}
