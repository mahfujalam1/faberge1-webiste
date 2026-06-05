'use client'
import { Poppins, Pacifico, EB_Garamond } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { PerformanceMonitor } from "@/components/PerformanceMonitor";

// Import Poppins font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // optional: add weights you need
  variable: "--font-poppins",
});

// Hero heading font
const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
});

// Hero paragraph font
const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-eb-garamond",
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${pacifico.variable} ${ebGaramond.variable} font-sans antialiased`}>
        <Provider store={store}>
          {/* <PerformanceMonitor /> */}
          {children}
          <Toaster richColors position="top-center" />
        </Provider>
      </body>
    </html>
  );
}
