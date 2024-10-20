import axios from "@/lib/axios";
import BreadcrumbCustom from "@/components/constantElements/BreadcrumbCustom";
import PackageItem from "@/components/packages/PackageItem";
import { notFound, redirect } from "next/navigation";

const frontUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;

export async function generateMetadata({ params, searchParams }) {
  let video = false;
  const slug = params.handler.join("/");
  const pageData = await axios
    .get(
      searchParams
        ? `api/packages/${slug}?page=${searchParams.page}`
        : `api/packages/${slug}`
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
    title: pageData.data.package.title,
    description: pageData.data.package.description,
    keywords: pageData.data.package.keywords,
    openGraph: {
      title: pageData.data.package.title,
      description: pageData.data.package.description,
      keywords: pageData.data.package.keywords,
    },
    alternates: {
      canonical: `${frontUrl}packages/${pageData.data.package.slug}`,
    },

    robots: {
      index: pageData.data.package.index_status == 0 ? false : true,
      follow: pageData.data.package.index_status == 0 ? false : true,
    },
    ...(video
      ? pageData.data.package.products
        ? pageData.data.package.products.next_page_url &&
          pageData.data.package.products.prev_page_url
          ? {
              icons: {
                other: [
                  {
                    rel: "next",
                    url: `${pageData.data.package.products.next_page_url}`,
                  },
                  {
                    rel: "prev",
                    url: `${pageData.data.package.products.prev_page_url}`,
                  },
                  {
                    rel: "preconnect",
                    url: "https://upload.vidbeen.ir",
                  },
                  {
                    rel: "dns-prefetch",
                    url: "https://upload.vidbeen.ir",
                  },
                  {
                    rel: "preconnect",
                    url: "https://dashboard.dcakala.com",
                  },
                ],
              },
            }
          : pageData.data.package.products.prev_page_url &&
            !pageData.data.package.products.next_page_url
          ? {
              icons: {
                other: [
                  {
                    rel: "prev",
                    url: `${pageData.data.package.products.prev_page_url}`,
                  },
                  {
                    rel: "preconnect",
                    url: "https://upload.vidbeen.ir",
                  },
                  {
                    rel: "dns-prefetch",
                    url: "https://upload.vidbeen.ir",
                  },
                  {
                    rel: "preconnect",
                    url: "https://dashboard.dcakala.com",
                  },
                ],
              },
            }
          : pageData.data.package.products.next_page_url &&
            !pageData.data.package.products.prev_page_url
          ? {
              icons: {
                other: [
                  {
                    rel: "next",
                    url: `${pageData.data.package.products.next_page_url}`,
                  },
                  {
                    rel: "preconnect",
                    url: "https://upload.vidbeen.ir",
                  },
                  {
                    rel: "dns-prefetch",
                    url: "https://upload.vidbeen.ir",
                  },
                  {
                    rel: "preconnect",
                    url: "https://dashboard.dcakala.com",
                  },
                ],
              },
            }
          : {
              icons: {
                other: [
                  {
                    rel: "preconnect",
                    url: "https://upload.vidbeen.ir",
                  },
                  {
                    rel: "dns-prefetch",
                    url: "https://upload.vidbeen.ir",
                  },
                  {
                    rel: "preconnect",
                    url: "https://dashboard.dcakala.com",
                  },
                ],
              },
            }
        : {
            icons: {
              other: [
                {
                  rel: "preconnect",
                  url: "https://upload.vidbeen.ir",
                },
                {
                  rel: "dns-prefetch",
                  url: "https://upload.vidbeen.ir",
                },
                {
                  rel: "preconnect",
                  url: "https://dashboard.dcakala.com",
                },
              ],
            },
          }
      : pageData.data.package.products
      ? pageData.data.package.products.next_page_url &&
        pageData.data.package.products.prev_page_url
        ? {
            icons: {
              other: [
                {
                  rel: "next",
                  url: `${pageData.data.package.products.next_page_url}`,
                },
                {
                  rel: "prev",
                  url: `${pageData.data.package.products.prev_page_url}`,
                },
                {
                  rel: "preconnect",
                  url: "https://dashboard.dcakala.com",
                },
              ],
            },
          }
        : pageData.data.package.products.prev_page_url &&
          !pageData.data.package.products.next_page_url
        ? {
            icons: {
              other: [
                {
                  rel: "prev",
                  url: `${pageData.data.package.products.prev_page_url}`,
                },
                {
                  rel: "preconnect",
                  url: "https://dashboard.dcakala.com",
                },
              ],
            },
          }
        : pageData.data.package.products.next_page_url &&
          !pageData.data.package.products.prev_page_url
        ? {
            icons: {
              other: [
                {
                  rel: "next",
                  url: `${pageData.data.package.products.next_page_url}`,
                },
                {
                  rel: "preconnect",
                  url: "https://dashboard.dcakala.com",
                },
              ],
            },
          }
        : {
            icons: {
              other: [
                {
                  rel: "preconnect",
                  url: "https://dashboard.dcakala.com",
                },
              ],
            },
          }
      : null),
  };
}

export default async function Page({ params, searchParams }) {
  const slug = params.handler.join("/");
  const pageData = await axios.get(
    searchParams
      ? `api/packages/${slug}?page=${searchParams.page}`
      : `api/packages/${slug}`
  );

  const newSearchParams = new URLSearchParams(searchParams).toString();

  return (
    <>
      <BreadcrumbCustom
        categorySlug={pageData.data.package.bread_crumb.slug}
        breadcrumb={pageData.data.package.bread_crumb}
        parentId={pageData.data.package.parent_id}
        categoryName={pageData.data.package.name}
        type="package"
        structure={pageData.data.package.json_bread_crumb}
      />
      <PackageItem
        apiData={pageData.data.package}
        pages={searchParams.page}
        scrollTo={newSearchParams}
      />
    </>
  );
}
