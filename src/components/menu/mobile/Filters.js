"use client"
import React, { useEffect, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckboxCustom from '../../constantElements/CheckboxCustom'
import ButtonCustom from '../../constantElements/ButtonCustom';
import axios from "@/lib/axios";
import TuneIcon from '@mui/icons-material/Tune';
import Skeleton from "@mui/material/Skeleton";
import NativeSelect from "@mui/material/NativeSelect";
import FormControl from "@mui/material/FormControl";

import InputLabel from "@mui/material/InputLabel";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import {
    useRouter,
    usePathname,
    redirect,
    useSearchParams,
} from "next/navigation";

const Filters = ({ type, sendData, id, openMenu = false, onClose, data = [], scrollTo }) => {
    const mobile = useMediaQuery("(max-width : 540px)");

    let productValue;
    let urlValue = [];
    let defaultOrder = "";
    let urlRegex = /=\d+&/g;
    if (scrollTo && scrollTo.length > 10) {
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

    const [chechedValue, setCheckedValue] = useState([])


    



    const myMap = new Map();

    useEffect(() => {
        if (urlValue.length > 0) {
            urlValue.map((items, i) => {
                myMap.set(i, items);
            });
        } else {
            urlValue = []
        }
        const newData = Array.from(myMap.values());


        if (JSON.stringify(newData) !== JSON.stringify(chechedValue)) {
            setCheckedValue(newData);
        }
    }, []);

    const router = useRouter();
    const pathName = usePathname();



    const [open, setOpen] = useState(false)

    const [mainMenu, setMainMenu] = useState(data.length > 0 ? data.map(e => null) : null);

    const openHandler = (index) => {
        const newArrayService = [...mainMenu];

        if (newArrayService[index] == true) {
            newArrayService[index] = false;
        } else {
            newArrayService[index] = true;
        }
        setMainMenu(newArrayService);
    }



    function productFilterHandler(event) {
        productValue = event.target.value;

        submitHandler();

    }







    function collectSelectedValues() {
        const selectedValues = {};
        let filterProduct;

        const checkboxes = document.querySelectorAll(
            'input[type="checkbox"]:checked'
        );


        const mobile_filter = document.querySelector(".mobileFilter")
        // filterProduct = mobile_filter.value

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

    function submitHandler(event) {
        // axios.get("/sanctum/csrf-cookie");
        const data = collectSelectedValues();
        axios
            .get(`api/filter`, {
                params: {
                    id: id,
                    attr: data,
                    order_by: productValue,
                },
            })
            .then((response) => {
                setOpen(false)
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


    function changeHandler(event, id, elem) {

        if (event.target.checked) {
            if (!chechedValue.includes(id)) {
                setCheckedValue((prev) => [...chechedValue, id]);
            }
        } else {
            let duplicateElem = chechedValue.indexOf(id);
            chechedValue.splice(duplicateElem, 1);
            setCheckedValue([...chechedValue]);
        }

        // const newArrayService = [...checked];


        // if (newArrayService[mainId][id] == true) {
        //     newArrayService[mainId][id] = false;
        // } else {
        //     newArrayService[mainId][id] = true;
        // }
        // setChecked(newArrayService);

    }




    return (
        <>
            {type == 'product'
                ?
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
                                    className: "product_filter mobileFilter",
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

                :
                <>



                    <div className="flex items-center gap-2 border rounded-lg px-2" onClick={() => setOpen(true)}>
                        <IconButton >
                            <TuneIcon />
                        </IconButton>
                        <div className="text-sm">فیلترها</div>
                    </div>

                    <Drawer open={open} anchor={'bottom'} onClose={open}>
                        <div>
                            {/* head */}
                            <div className='p-2 border-b bg-white sticky top-0 flex items-center justify-between z-10 w-full'>
                                <IconButton onClick={() => setOpen(false)}>
                                    <CloseIcon />
                                </IconButton >

                                <ButtonCustom color={chechedValue.length > 0 ? "var(--theme-color)":'#A4A4A4'} text="اعمال فیلتر" onClick={submitHandler} />
                            </div>
                            {/* head */}

                            {/* body */}
                            <div>
                                <ul>
                                    {data ? data.map((main, index) => (
                                        <li key={main.id} className={"attribute-name"}>
                                            <div className='text-sm p-4 py-2 border-b flex items-center justify-between' onClick={() => openHandler(index)}>
                                                {main.name}
                                                <IconButton size='small'>
                                                    {mainMenu[index] ?
                                                        <ExpandMoreIcon />
                                                        :
                                                        <ChevronLeftIcon />
                                                    }
                                                </IconButton>
                                            </div>
                                            <ul className={`bg-[#f3f3f3] p-4 ${mainMenu[index] ? 'block' : 'hidden'} grid-cols-1 gap-2`}>
                                                {main.values.map((sub, i) => (
                                                    <li key={sub.id}>
                                                        <CheckboxCustom
                                                            label={sub.value}
                                                            color='#A4A4A4'
                                                            value={sub.id}
                                                            name={main.name}
                                                            // checked={checked[index][i]}
                                                            onChange={(event) => changeHandler(event, sub.id, sub)}
                                                            checked={
                                                                chechedValue.indexOf(sub.id) == -1
                                                                    ? false
                                                                    : true
                                                            }
                                                        />
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                    ))
                                        :

                                        <div className="h-auto w-full p-4 grid grid-cols-1 gap-2">
                                            <Skeleton
                                                animation="wave"
                                                variant="rounded"
                                                height={56}
                                                sx={{ width: "100%" }}
                                            />
                                            <Skeleton
                                                animation="wave"
                                                variant="rounded"
                                                height={56}
                                                sx={{ width: "100%" }}
                                            />
                                            <Skeleton
                                                animation="wave"
                                                variant="rounded"
                                                height={56}
                                                sx={{ width: "100%" }}
                                            />
                                            <Skeleton
                                                animation="wave"
                                                variant="rounded"
                                                height={56}
                                                sx={{ width: "100%" }}
                                            />
                                            <Skeleton
                                                animation="wave"
                                                variant="rounded"
                                                height={56}
                                                sx={{ width: "100%" }}
                                            />
                                            <Skeleton
                                                animation="wave"
                                                variant="rounded"
                                                height={56}
                                                sx={{ width: "100%" }}
                                            />
                                        </div>

                                    }
                                </ul>
                            </div>
                            {/* body */}
                        </div>

                    </Drawer>
                </>


            }



        </>
    );
};

export default Filters;
