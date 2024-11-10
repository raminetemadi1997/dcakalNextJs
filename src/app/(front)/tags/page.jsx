import BreadcrumbCustom from "@/components/constantElements/BreadcrumbCustom";
import React from "react";
import axios from "@/lib/axios";
import styles from "@/assets/css/Tag.module.css";
import Link from "next/link";

const fetchedData = await axios
  .get("api/tags")
  .then((result) => result)
  .catch((err) => err);

export default async function Page() {
  return (
    <>
      <BreadcrumbCustom
        parentId={null}
        categorySlug={null}
        categoryName={"تگ ها"}
        structure={null}
        uniqueSlug={`tag`}
      />
      <section className="p-4 w-full mb-12">
        {fetchedData.data.tags.length > 0 ? (
          <div
            className={`w-full grid sm:grid-cols-4 grid-cols-2 gap-4 p-4 rounded-lg ${styles.container}`}
          >
            {fetchedData.data.tags.map((tag) => (
              <Link
                title={tag.en_name}
                href={tag.slug}
                key={tag.id}
                className={`bg-white sm:text-base text-xs text-center p-4 rounded-lg ${styles.tag_item}`}
              >
                <div className={styles.truncate}>{tag.name}</div>
              </Link>
            ))}
          </div>
        ) : (
          <p>محصولی موجود نیست</p>
        )}
      </section>
    </>
  );
}
