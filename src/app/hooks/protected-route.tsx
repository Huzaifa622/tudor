"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
//   const token = localStorage.getItem("token");
  const router = useRouter();
  const [token , setToken] = useState("")
useEffect(()=>{
    const tok = localStorage.getItem("token");
    setToken(tok!)
},[])
  if (!token) {
    // Redirect to login if no token is present
    return router.push("/login");
  }

  // Return children if authenticated
  return <>{children}</>;
}
