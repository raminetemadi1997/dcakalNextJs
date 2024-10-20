"use client";
import React, { Fragment } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import styled from "@emotion/styled";

const Breadcrumb = ({
  breadcrumb,
  parentId,
  categoryName,
  type,
  categorySlug,
  productSlug,
}) => {
  const StackContainer = styled(Stack)({
    maxWidth: 1358,
    height: "auto",
    width: "100%",
    padding: "0 1rem",
    overflowX: "auto",
    margin: ".5rem 0",
    "& > nav": {
      width: "max-content",
    },
    "&::-webkit-scrollbar": {
      display: "none",
    },
    "@media (max-width: 540px)": {
      padding: "0 .5rem",
    },
  });
  let counter = 2;
  return (
    <StackContainer spacing={2}>
      <Breadcrumbs
        component="div"
        separator={<NavigateBeforeIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <Link href="/" title="خانه">
          <HomeIcon />
        </Link>

        {parentId != null || (type == "product" && breadcrumb)
          ? breadcrumb.map((breadcrumbItems, i) => {
              return (
                <Link
                  href={`/${breadcrumbItems.slug}`}
                  style={{ fontSize: "12px" }}
                  key={i}
                >
                  {breadcrumbItems.name}
                </Link>
              );
            })
          : null}

        {(parentId != null || type == "product") && (
          <Typography
            component="span"
            color="text.primary"
            sx={{ fontSize: "12px", fontWeight: type == "product" && "bold" }}
          >
            {categoryName}
          </Typography>
        )}
        {parentId == null && type == "brand" && (
          <Link href={`/brand`} style={{ fontSize: "12px" }}>
            برندها
          </Link>
        )}
        {parentId == null && type != "product" && (
          <Typography color="text.primary" sx={{ fontSize: "12px" }} component="span">
            {categoryName}
          </Typography>
        )}
      </Breadcrumbs>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "خانه",
              item: "https://dcakala.com",
            },

            {
              ...(parentId != null || (type == "product" && breadcrumb)
                ? breadcrumb.map((breadcrumbItems, i) => {
                    return JSON.stringify({
                      "@type": "ListItem",
                      position: counter++,
                      name: breadcrumbItems.name,
                      item: `${breadcrumbItems.slug}`,
                    });
                  })
                : null),

              ...(parentId != null || type == "product"
                ? {
                    "@type": "ListItem",
                    position: counter,
                    name: categoryName,
                    item: `/${categorySlug}`,
                  }
                : null),

              ...(parentId == null && type == "brand"
                ? {
                    "@type": "ListItem",
                    position: counter,
                    name: "برندها",
                    item: `/brand`,
                  }
                : null),

              ...(parentId == null && type != "product"
                ? {
                    "@type": "ListItem",
                    position: counter,
                    name: categoryName,
                    item: `/${categorySlug}`,
                  }
                : null),
            },
          ],
        })}
      </script>
    </StackContainer>
  );
};

export default Breadcrumb;
