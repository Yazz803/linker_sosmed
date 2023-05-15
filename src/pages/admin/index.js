import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Logout } from "../components/Logout";
import { useAuth } from "yazz/context/AuthContext";
import NavbarAdmin from "../components/Admin/NavbarAdmin";

export default function AdminPage() {
  const router = useRouter();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) router.push("/login");
  }, [currentUser, router]);

  return (
    <>
      {currentUser && (
        <>
          <NavbarAdmin />
          <h1>Udah login bang</h1>
          <Logout />
        </>
      )}
    </>
  );
}
