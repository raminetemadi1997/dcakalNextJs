import styles from "@/assets/css/category/MainCategory.module.css";
// context
import VideoSrcContextProvider from "@/context/videoSrcContext";
// context
import Layout from "@/components/Layout";

export default function DynamicPagesLayout({ children }) {
  return (
    <Layout>
      <VideoSrcContextProvider>
        <main className={`flex flex-col items-center ${styles.mainContainer}`}>
          {children}
        </main>
      </VideoSrcContextProvider>
    </Layout>
  );
}
