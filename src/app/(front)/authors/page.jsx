import { getSsrData } from "@/data/loaders";
import BreadcrumbCustom from "@/components/constantElements/BreadcrumbCustom";
import ImageCustom from "@/components/constantElements/ImageCustom";
import Layout from "@/components/Layout";
import Link from "next/link";

export const metadata = {
  title: "نویسنده ها",
  description: "نویسنده ها",
  keywords: "نویسنده ها",
};

export default async function Authors({ params }) {
  const fetchedData = await getSsrData(`api/authors`);

  return (
    <Layout>
      <main className="main_container">
        <BreadcrumbCustom
          parentId={null}
          categorySlug={null}
          categoryName={"نویسنده ها"}
        />

        <h1 className="mb-12">نویسنده ها</h1>
        {fetchedData.data.data.length > 0 && (
          <section className="grid grid-cols-3 gap-4">
            {fetchedData.data.data.map((author) => (
              <Link
                href={author.slug ? `authors/${author.slug} ` : "#"}
                title={author.full_name}
                className="bg-stone-200 rounded-lg p-4 grid grid-cols-3 gap-4"
                key={author.id}
              >
                <ImageCustom size="original" data={author.image_path} />
                <div className="col-span-2">
                  <div className="border-b border-theme pb-2 mb-2">
                    {author.full_name}
                  </div>
                  <div
                    className="text-justify text-sm text-gray-500"
                    dangerouslySetInnerHTML={{ __html: author && author.introduction }}
                  />
                </div>
              </Link>
            ))}
          </section>
        )}
      </main>
    </Layout>
  );
}
