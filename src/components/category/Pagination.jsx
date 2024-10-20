"use client";
import React, { useState , useEffect } from "react";
import PaginationContainer from "@mui/material/Pagination";
import { useRouter ,usePathname } from "next/navigation";
import Stack from "@mui/material/Stack";
import PaginationItem from "@mui/material/PaginationItem";
import Link from "next/link";

const Pagination = ({ type, pages, slug, links, currentPage , pagel }) => {


  const [defaultPage , setDefaultPage] = useState(1)



  useEffect(()=>{
    if (currentPage) {
      setDefaultPage(currentPage)
    }

  },[currentPage])


  


  const [page, setPage] = useState();
  const router = useRouter();
  const pathName = usePathname()

  function filterPage(pages) {
    if (links.length > 0) {
      // const filterSelect = links;
      let filterSelect = pagel;
      let selectUrl = filterSelect.split("page=")[0]
      const result = `${pathName}?${selectUrl}page=${pages}`
      return result;
    }
  }

  const handleChange = (event, value) => {
    
    const element = document.getElementById("products");

    if (type == "brands") {
      router.push(`/brand/${slug}?page=${value}`);
      setPage(value);
      setTimeout(() => {
        const element = document.getElementById("products");
        element?.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }, 2000);
    } else if (type == "search") {
      router.push(`/${slug}&page=${value}`);
      setPage(value);
    } else if(type == "package"){
      
      router.push(`/${slug}?page=${value}`);
      setPage(value);
      setTimeout(() => {
        const element = document.getElementById("products");
        element?.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }, 2000);
    } else{
      const filters = filterPage(value);


      
      router.push(filters);
      // setPage(value);
      setTimeout(() => {
        const element = document.getElementById("products");
        element?.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }, 3000);
    }
  };
  return (
    <Stack spacing={2} mb={4}>
      <PaginationContainer
        count={pages}
        variant="outlined"
        // defaultPage={Number(currentPage) ? Number(currentPage) : 1}
        onChange={handleChange}
        page={Number(defaultPage)}
        shape="rounded"
        sx={{ display: "flex", justifyContent: "center" }}
        renderItem={(item) => {
          return <PaginationItem {...item}/>;
        }}
      />
    </Stack>
  );
};

export default Pagination;
