import type { Metadata } from "next";
import "@/src/app/styles/index.css";
import App from "@/src/app/app";
import Header from "@/src/widgets/header";

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
        <Header />
        <App>{children}</App>
      </body>
    </html>
  );
};
export default RootLayout;
