"use client";

import {  useEffect } from "react";
import { redirect } from "next/navigation";


export default function ProtectedRoute(Component: any) {// eslint-disable-line




    useEffect(() => {
        const token = localStorage.getItem("token")
      if (!token) {
        return redirect("/login");
      }
    }, []);




    return Component;
  };
