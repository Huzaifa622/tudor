"use client";
import React from "react";
// import ProtectedRoute from "../hooks/protected-route";
// import { useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  // const token = localStorage.getItem("token");
  // const router = useRouter();
  // if (!token) {
  //   return router.push("/login");
  // }

  return <div className="overflow-x-hidden">{children}</div>;
}
