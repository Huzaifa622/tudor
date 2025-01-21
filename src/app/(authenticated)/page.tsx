"use client"
import { useLayoutEffect } from "react";
import Home from "./_components/Home";
import { redirect } from "next/navigation";


export default function Page(){
    useLayoutEffect(() => {
        const isAuth = localStorage.getItem("token");
        if(!isAuth){
          redirect("/login")
        }
      }, [])
    return (
        <div className="">
            <Home/>
        </div>
    )
}