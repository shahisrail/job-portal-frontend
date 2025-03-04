"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";
import Header from "./Header";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const hideHeaderFooter = ["/auth/login", "/auth/signup", "/404"].includes(
    pathname
  );

  return (
    <>
      {!hideHeaderFooter && <Header />}
      {children}
      {!hideHeaderFooter && <Footer />}
    </>
  );
}
