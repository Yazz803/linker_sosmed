import React from "react";
import { useMediaQuery } from "react-responsive";
import Navbar from "./Navbar";
import NavbarMobile from "./NavbarMobile";

export default function NavbarAdmin() {
  const isMobile = useMediaQuery({ query: "(max-width: 764px)" });

  return <>{isMobile ? <NavbarMobile /> : <Navbar />}</>;
}
