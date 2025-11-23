'use client'
import { Poppins } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

// Import Poppins font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // optional: add weights you need
  variable: "--font-poppins",
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans antialiased`}>
        <Provider store={store}>
          {children}
          <Toaster richColors position="top-center" />
        </Provider>
      </body>
    </html>
  );
}
