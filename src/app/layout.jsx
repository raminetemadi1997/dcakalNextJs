import "@/styles/globals.css";
import ReactDOM from 'react-dom'
import { MuiRtlProvider } from "@/context/muiRtlContext";
import { getGlobalPageMetadata } from "@/data/loaders";
import SnakebarContextProvider from "@/context/snakebar";
import MainModalContextProvider from "@/context/modal/mainModal";

import ResetApiContext from "@/context/ResetApiContext";
import Setting from "@/context/api/Setting";
import Header from "@/layouts/Header";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL_IMAGE;

const metaData = await getGlobalPageMetadata("api/home/header");

export const viewport = {
  themeColor: metaData.data.data.theme_color,
  width: "device-width",
  initialScale: 1.0,
};


export async function generateMetadata() {
  return {
    
    title: metaData.data.data.title,
    description: metaData.data.data.description,
    keywords: metaData.data.data.keywords,

    openGraph: {
      title: metaData.data.data.title,
      description: metaData.data.data.description,
      keywords: metaData.data.data.keywords,
      locale: metaData.data.data.site_lang,
      type: "website",
      siteName: metaData.data.data.title,
      url: metaData.data.data.generator,
    },

    icons: {
      icon: `${backendUrl}${metaData.data.data.web_app.indexArray.original}`,
      shortcut: `${backendUrl}${metaData.data.data.web_app.indexArray.samll}`,
      apple: `${backendUrl}${metaData.data.data.web_app.indexArray.large}`,
      other: [
        {
          rel: 'preconnect',
          url: 'https://dashboard.dcakala.com',
        },
      ],
    },
    authors: { name: metaData.data.data.author },
    generator: metaData.data.data.generator,

    robots: {
      index: true,
      follow: true,
    },
    
  };
}





export default function RootLayout({ children }) {

  return (
    <>
      <html lang={"fa"} dir="rtl">
        <body>
          <ResetApiContext>
            <Setting>
              <MuiRtlProvider>
                <SnakebarContextProvider>
                  <MainModalContextProvider>
                    {children}
                  </MainModalContextProvider>
                </SnakebarContextProvider>
              </MuiRtlProvider>
            </Setting>
          </ResetApiContext>
        </body>
      </html>
    </>
  );
}
