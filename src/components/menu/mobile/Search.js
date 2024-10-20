'use client'
import React, { useEffect, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import SearchIconDynamic from '@mui/icons-material/Search';
import axios from "@/lib/axios";
import ImageCustom from '@/components/constantElements/ImageCustom';
import Link from 'next/link';
import ButtonCustom from '@/components/constantElements/ButtonCustom';
import { useRouter } from "next/navigation";
import Skeleton from "@mui/material/Skeleton";

const Search = ({ openMenu = false, onClose, search = [] }) => {
    const [shownSearchBox, setShownSearchBox] = useState(false);
    const [searchData, setSearchData] = useState(null);
    const [searchText, setSearchText] = useState(null);
    const [open, setOpen] = useState(false)
    const router = useRouter();



    useEffect(() => {
        if (!openMenu) {
            setSearchData(null)
            setSearchText(null)
        }

    }, [openMenu, searchData])

    let timeout;

    function searchHandler(event) {
        if (event.target.value.length >= 3) {
            setOpen(true)
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }

            timeout = setTimeout(function () {
                axios
                    .get(`api/quick-search`, {
                        params: {
                            search: event.target.value,
                        },
                    })
                    .then((response) => {
                        setSearchText(event.target.value);
                        setSearchData(response.data.data);
                        setShownSearchBox(true);
                    })
                    .catch((error) => { });
            }, 2000);
        } else {
            setShownSearchBox(false);
            setSearchData(null)
            setOpen(false)
        }
    }

    function handleKeyDown(event) {
        if (event.keyCode === 13) {
            setSearchText(event.target.value);

            if (searchText) {
                router.push(`/search?search=${searchText}`);
            }
        }
    }

    return (
        <Drawer open={openMenu} anchor={'right'} onClose={onClose} >
            {/* head */}
            <div className='p-2 border-b bg-white sticky top-0 flex items-center justify-between z-10 w-80'>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </div>
            {/* head */}


            {/* body */}
            <div className='px-4 py-8 bg-[#f8f8f8] h-full'>
                <div className={`h-10 bg-white rounded-full justify-between items-center px-2 py-1 flex mb-4`}>
                    <SearchIconDynamic sx={{ color: "#9c9d9e" }} />
                    <input
                        className='bg-white px-4 focus:outline-none h-full w-full placeholder:text-xs placeholder:text-right '
                        placeholder='جستجو در دی سی ای کالا'
                        type='text'
                        onChange={searchHandler}
                        onKeyUp={handleKeyDown}
                    />

                </div>

                {open
                    &&
                    <>
                        {
                            searchData ?
                                <div className='mb-4 flex items-center justify-between'>
                                    <div className='text-xs'>تعداد محصولات: {searchData.search_count}</div>
                                    <ButtonCustom
                                        text="مشاهده نتایج"
                                        fontWeight="12px"
                                        link={searchText ? `/search?search=${searchText}` : `/search`}
                                    />
                                </div>
                                :
                                <div className="h-auto w-full p-4 grid grid-cols-1 gap-2">
                                    <Skeleton
                                        animation="wave"
                                        variant="rounded"
                                        height={40}
                                        sx={{ width: "100%" }}
                                    />
                                </div>
                        }

                        <ul className={`max-h-96 bg-white rounded-lg p-2 flex flex-col gap-2 overflow-y-auto`}>
                            {
                                searchData ?


                                    searchData.products.length > 0
                                    &&
                                    <>

                                        {searchData.products.map(item => (
                                            <li key={item.id} className='bg-[#f8f8f8] p-2 rounded-lg'>
                                                <Link href={`/${item.slug}`} title={item.name} className='grid grid-cols-3 gap-2 items-center'>
                                                    <ImageCustom
                                                        data={item.image}
                                                        alt={item.image_alt}
                                                        title={item.image_alt}
                                                    />
                                                    <div className='text-xs col-span-2'>{item.alt_name}</div>

                                                </Link>
                                            </li>
                                        ))}
                                    </>

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
                    </>
                }
            </div>
            {/* body */}


        </Drawer>
    );
};

export default Search;