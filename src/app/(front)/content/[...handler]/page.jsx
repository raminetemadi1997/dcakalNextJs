import React from "react";
import axios from "@/lib/axios";
import { notFound, redirect } from "next/navigation";
import dynamic from "next/dynamic";
import Skeleton from "@mui/material/Skeleton";
import "@/styles/styles.css";
import BreadcrumbCustom from "@/components/constantElements/BreadcrumbCustom";

export async function generateMetadata({ params, searchParams }) {
  const slug = params.handler.join("/");

  const dataFetch = await axios
    .get(
      searchParams
        ? `api/content/${slug}?page=${searchParams.page}`
        : `api/content/${slug}`
    )
    .then((result) => {
      return result;
    })
    .catch((error) => {
      if (error.response.status == "301" || error.response.status == "302") {
        if (
          error.response.data.type == "error" &&
          error.response.data.message == "redirect" &&
          error.response.data.redirect
        ) {
          redirect(error.response.data.redirect);
        } else {
          redirect(notFound());
        }
      } else {
        redirect(notFound());
      }
    });

  return {
    title: dataFetch.data.page.title,
    description: dataFetch.data.page.description,
    keywords: dataFetch.data.page.keywords,
    openGraph: {
      title: dataFetch.data.page.title,
      description: dataFetch.data.page.description,
    },
    
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function page({ params, searchParams }) {
  const slug = params.handler.join("/");

  const dataFetch = await axios
    .get(
      searchParams
        ? `api/content/${slug}?page=${searchParams.page}`
        : `api/content/${slug}`
    )
    .then((result) => {
      return result;
    })
    .catch((error) => {
      if (error.response.status == "301" || error.response.status == "302") {
        if (
          error.response.data.type == "error" &&
          error.response.data.message == "redirect" &&
          error.response.data.redirect
        ) {
          redirect(error.response.data.redirect);
        } else {
          redirect(notFound());
        }
      } else {
        redirect(notFound());
      }
    });

  return (
    <>
      <BreadcrumbCustom
        categorySlug={null}
        parentId={null}
        categoryName={dataFetch.data.page.name}
        structure={null}
        uniqueSlug={`content/${dataFetch.data.page.slug}`}
      />

      <div
        className={`viewContents`}
        dangerouslySetInnerHTML={{ __html: dataFetch.data.page.body }}
      />
    </>
  );
}
