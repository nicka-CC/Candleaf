'use client'
import type { Metadata } from "next";
import "@/src/app/styles/index.css";
import App from "@/src/app/app";
import Header from "@/src/widgets/header";
import Footer from "@/src/widgets/footer";
import {Provider} from "react-redux";
import {store} from "@/src/app/store"

export const metadata: Metadata = {
  title: "Candleaf",
  description: "Добро пожаловать в Candleaf",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ru">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
      <Provider store={store}>
        <Header />
        <App>{children}</App>
        <Footer/>
      </Provider>
      </body>
    </html>
  );
};
export default RootLayout;
