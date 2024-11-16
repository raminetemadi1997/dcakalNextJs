"use client";
import React, { useState, useEffect } from "react";
import PaginationContainer from "@mui/material/Pagination";
import { useRouter, usePathname } from "next/navigation";
import Stack from "@mui/material/Stack";
import PaginationItem from "@mui/material/PaginationItem";
import styles from "../../assets/css/Pagination.module.css";
import Skeleton from "@mui/material/Skeleton";

const Pagination = ({ type, pages, slug, links, currentPage, pagel }) => {
  const [defaultPage, setDefaultPage] = useState(1);
  const [client, setClient] = useState(false);

  useEffect(() => {
    if (currentPage) {
      setDefaultPage(currentPage);
    }
  }, [currentPage]);


  // set client side
  useEffect(() => {
    setClient(true);
  }, []);

  const [page, setPage] = useState();
  const router = useRouter();
  const pathName = usePathname();

  function filterPage(pages) {
    if (links.length > 0) {
      let filterSelect = pagel;
      let selectUrl = filterSelect.split("page=")[0];
      const result = `${pathName}?${selectUrl}page=${pages}`;
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
    } else if (type == "package") {
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
    } else {
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
    <Stack spacing={2} mb={4} alignItems='center'>
      {client ? (
        <PaginationContainer
          count={pages}
          variant="outlined"
          // defaultPage={Number(currentPage) ? Number(currentPage) : 1}
          onChange={handleChange}
          page={Number(defaultPage)}
          shape="rounded"
          sx={{ display: "flex", justifyContent: "center" }}
          renderItem={(item) => {
            return <PaginationItem {...item} />;
          }}
        />
      ) : (
        <div className={styles.skeleton}>
          <Skeleton
            variant="rectangular"
            animation="pulse"
            sx={{ width: "100%", height: "100%", borderRadius: "4px" }}
          />
          <Skeleton
            variant="rectangular"
            animation="pulse"
            sx={{ width: "100%", height: "100%", borderRadius: "4px" }}
          />
          <Skeleton
            variant="rectangular"
            animation="pulse"
            sx={{ width: "100%", height: "100%", borderRadius: "4px" }}
          />
          <Skeleton
            variant="rectangular"
            animation="pulse"
            sx={{ width: "100%", height: "100%", borderRadius: "4px" }}
          />
          <Skeleton
            variant="rectangular"
            animation="pulse"
            sx={{ width: "100%", height: "100%", borderRadius: "4px" }}
          />
          <Skeleton
            variant="rectangular"
            animation="pulse"
            sx={{ width: "100%", height: "100%", borderRadius: "4px" }}
          />
          <Skeleton
            variant="rectangular"
            animation="pulse"
            sx={{ width: "100%", height: "100%", borderRadius: "4px" }}
          />
          <Skeleton
            variant="rectangular"
            animation="pulse"
            sx={{ width: "100%", height: "100%", borderRadius: "4px" }}
          />
          <Skeleton
            variant="rectangular"
            animation="pulse"
            sx={{ width: "100%", height: "100%", borderRadius: "4px" }}
          />
        </div>
      )}
    </Stack>
  );
};

export default Pagination;
