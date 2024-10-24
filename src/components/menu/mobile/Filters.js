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
import BeatLoader from "react-spinners/BeatLoader";
import InputLabel from "@mui/material/InputLabel";
import useMediaQuery from "@mui/material/useMediaQuery";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import {
    useRouter,
    usePathname,
    redirect,
    useSearchParams,
} from "next/navigation";

const Filters = ({ type, sendData, id, openMenu = false, onClose, data = [], scrollTo, currentSlug }) => {
    const mobile = useMediaQuery("(max-width : 540px)");
    const [trigger, setTrigger] = useState(false);

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
    const [chipValue, setChipValue] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // تعریف state برای وضعیت checked هر چک باکس
    const [checkedItems, setCheckedItems] = useState(data.map(e => Array(e.values.length).fill(false)));



    const myMap = new Map();
    const myMapChip = new Map();

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

        if (data.length > 0) {
            if (type != "brand") {
                data.map((items) => {
                    return items.values.map((subItems, i) => {
                        if (urlValue.indexOf(subItems.id) != -1) {
                            myMapChip.set(i, subItems.value);
                        }
                    });
                });
            }
        }

        const newDataChip = Array.from(myMapChip.values());

        if (JSON.stringify(newDataChip) !== JSON.stringify(chipValue)) {
            setChipValue(newDataChip);
        }



    }, []);



    function testHandler(event, value, index, i) {
        let array = [...checkedItems]
        if (event.target.checked) {
            array[index][i] = value
        } else {
            array[index][i] = false
        }
        setCheckedItems(array)
    }



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

        const checkboxes = document.querySelectorAll('.attr-class-mobile > input[type="checkbox"]:checked');
        // const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        

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
        setIsLoading(true)
        setOpen(false)
        axios
            .get(`api/filter`, {
                params: {
                    id: id,
                    attr: data,
                    order_by: productValue,
                },
            })
            .then((response) => {
                setTrigger((prevTrigger) => !prevTrigger);
                // sendData(response);
                let urlFilter = response.data.products.first_page_url;
                urlFilter = urlFilter.split("?");
                // مسیر جدید URL
                const newUrl = urlFilter[1].toString();
                // window.history.pushState({ path: `${pathName}?${newUrl}` }, "", `${pathName}?${newUrl}`);
                if (chipValue.length > 0) {

                    router.push(`${pathName}?${newUrl}`);
                } else {
                    router.push(`${pathName}`);
                }

                setTimeout(() => {
                    setIsLoading(false)
                }, 3000);
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

        // const newArrayService = [...checked];


        // if (newArrayService[mainId][id] == true) {
        //     newArrayService[mainId][id] = false;
        // } else {
        //     newArrayService[mainId][id] = true;
        // }
        // setChecked(newArrayService);

    }



    function resetHandler() {
        setTrigger((prevTrigger) => !prevTrigger);
        setIsLoading(true)
        setOpen(false)
        router.push(`/${currentSlug}`);
        setCheckedValue([]);
        setChipValue([])
        // const findElems = document.querySelectorAll(".attr-class");
        // [...findElems].map((elem) => {
        //   if (elem.querySelector("input").checked == true) {
        //     elem.querySelector("input").click();
        //   }
        // });
        setTimeout(()=>{
            setIsLoading(false);
          } , 3000)
    }



    const handleDelete = (event, value) => {

        const findElems = document.querySelectorAll(".attr-class-mobile");


        [...findElems].map((elem) => {


            if (elem.getAttribute("data-name") == value) {
                elem.querySelector("input").click();
            }
        });
        submitHandler();
    };



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
                            <div className='p-2 border-b bg-white sticky top-0  z-10 w-full'>


                                <div className='flex items-center justify-between'>
                                    <IconButton onClick={() => setOpen(false)}>
                                        <CloseIcon />
                                    </IconButton >
                                    <div className='flex gap-2'>
                                        {
                                            urlValue.length > 0
                                            &&
                                            <ButtonCustom color={'#DE1616'} text="حذف فیلتر" onClick={resetHandler} />
                                        }

                                        <ButtonCustom color={chechedValue.length > 0 ? "var(--theme-color)" : '#A4A4A4'} text="اعمال فیلتر" onClick={submitHandler} />
                                    </div>

                                </div>


                                {chipValue.length > 0
                                    &&
                                    <ul className='max-h-28 overflow-y-auto grid grid-cols-1 gap-2 mt-2'>
                                        {chipValue.map((items, i) => (
                                            <li key={i} className='text-xs bg-[#f1f1f1] rounded-md p-2 flex items-center justify-between'>
                                                <div>{items}</div>
                                                <IconButton size='small' onClick={(event) => handleDelete(event, items)}>
                                                    <CloseIcon fontSize='small' />
                                                </IconButton >
                                            </li>
                                        ))}
                                    </ul>

                                }

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
                                            <ul className={`bg-[hsl(0,0%,95%)] p-4 ${mainMenu[index] ? 'block' : 'hidden'} grid-cols-1 gap-2`}>
                                                {main.values.map((sub, i) => (
                                                    <li key={sub.id}>
                                                        <FormControl component="fieldset">
                                                            <FormGroup aria-label="position">
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            className="attr-class-mobile"
                                                                            data-name={sub.value}
                                                                            value={sub.id}
                                                                            name={main.name}
                                                                            size="small"
                                                                            onChange={(event) => changeHandler(event, sub.id, sub)}
                                                                            checked={
                                                                                chechedValue.indexOf(sub.id) == -1
                                                                                    ? false
                                                                                    : true
                                                                            }
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
                                                                            {sub.value}
                                                                        </span>
                                                                    }

                                                                />
                                                            </FormGroup>
                                                        </FormControl>

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
            {isLoading && (
                <div className="fixed top-0 left-0 w-full h-full flex flex-col gap-4 justify-center items-center bg-[#fff] z-[999] bg-opacity-50">
                    <BeatLoader
                        color="var(--theme-color)"
                        loading={true}
                        size={28}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            )}


        </>
    );
};

export default Filters;
