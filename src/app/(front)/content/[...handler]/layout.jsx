import Layout from "@/components/Layout";
import styles from "@/assets/css/category/MainCategory.module.css"

const ContentLayout = ({ children }) => {
  return (
    <Layout>
      <main className={styles.mainContainer}>{children}</main>
    </Layout>
  );
};

export default ContentLayout;
