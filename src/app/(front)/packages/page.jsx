import Package from "@/components/packages/Package";
import BreadcrumbCustom from "@/components/constantElements/BreadcrumbCustom";

import axios from "@/lib/axios";
export default async function Page({ params, searchParams }) {
  const pageData = await axios
    .get(
      searchParams ? `api/packages?page=${searchParams.page}` : `api/packages`
    )
    .then((res) => res);

  const newSearchParams = new URLSearchParams(searchParams).toString();

  return (
    <>
      <BreadcrumbCustom
        parentId={null}
        categorySlug={null}
        categoryName={"پکیج ها"}
        structure={null}
        uniqueSlug={"/packages"}
      />

      <Package
        apiData={pageData.data}
        pages={searchParams.page}
        scrollTo={newSearchParams}
      />
    </>
  );
}
