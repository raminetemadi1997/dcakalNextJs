"use client";
import React, { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import Skeleton from "@mui/material/Skeleton";
import axios from "@/lib/axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SearchBox = dynamic(() => import("@/components/header/SearchBox"), {
  ssr: false,
});

const SearchIconDynamic = dynamic(() => import("@mui/icons-material/Search"), {
  ssr: false,
  loading: () => (
    <Skeleton animation="pulse" variant="circular" width={25} height={25} />
  ),
});

export default function SearchBar({ className, shownSearchBoxHandler }) {
  const router = useRouter();
  const [shownSearchBox, setShownSearchBox] = useState(false);
  const [searchData, setSearchData] = useState(null);
  const [searchText, setSearchText] = useState(null);
  const searchContainer = useRef(null);
  const searchBarContainer = useRef(null);

  function checkClickOutside(e) {
    if (
      shownSearchBox &&
      searchContainer.current &&
      !searchContainer.current.contains(e.target) &&
      searchBarContainer.current &&
      !searchBarContainer.current.contains(e.target)
    ) {
      setShownSearchBox(false);
      setSearchText(null);
      setSearchData(null);
    }
  }


  const clickHandler = () => {
    setShownSearchBox(false);
    setSearchText(null);
    setSearchData(null);
  };

  let timeout;

  function searchHandler(event) {
    if (event.target.value.length > 2) {
      setShownSearchBox(true);
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
          })
          .catch((error) => {
            setShownSearchBox(true);
          });
      }, 500);
    } else {
      setShownSearchBox(false);
      setSearchData(null);
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

  useEffect(() => {
    document.addEventListener("mousedown", checkClickOutside);

    return () => document.removeEventListener("mousedown", checkClickOutside);
  }, [shownSearchBox]);

  return (
    <>
      <div
        ref={searchBarContainer}
        className={`h-full ${className} bg-white rounded-full justify-between items-center px-2 py-1 sm:flex hidden searchbar_container`}
      >
        <input
          className="focus:outline-none h-full w-full placeholder:text-xs placeholder:text-center pr-1"
          placeholder="جستجو در دی سی ای کالا"
          type="search"
          onChange={searchHandler}
          onKeyUp={handleKeyDown}
        />
        <Link href={searchText ? `/search?search=${searchText}` : `/search`}>
          <SearchIconDynamic sx={{ color: "var(--theme-color)" }} />
        </Link>
      </div>

      <SearchBox
        shownSearchBox={shownSearchBox}
        data={searchData}
        searchSlug={searchText}
        searchContainer={searchContainer}
        onClick={clickHandler}
      />
    </>
  );
}
