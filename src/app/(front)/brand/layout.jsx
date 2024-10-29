import Layout from "@/components/Layout";
import styles from "@/assets/css/category/MainCategory.module.css";

export const metadata = {
  title: "همه برند ها",
  // robots: "index",
  robots: {
    index: true,
    follow: true,
  },
};

export default function BrandLayout({ children }) {
  return (
    <Layout>
      <main className={`flex flex-col items-center ${styles.mainContainer}`}>
        {children}
      </main>
    </Layout>
  );
}

