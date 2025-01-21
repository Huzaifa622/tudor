"use client";
import { Input } from "@/components/ui/input";
import { LogIn } from "@/lib/auth";
import { Eye, EyeClosed } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Login() {
  const [formData, setFormData] = useState<{
    username: string;
    password: string;
  }>({ username: "", password: "" });
  const router = useRouter()
  const [visible, setVisible] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  
    const res = await LogIn(formData);
  
    if (res) {
      setFormData({ username: "", password: "" });
      router.push("/");
    }
  };


  return (
    <div>
      <div className="flex relative">
        
          <Image src={"/logo.svg"} alt="logo" width={200} height={100} className="absolute top-4 left-4" />
       
        <div className="  w-full bg-gradient-to-r from-blue-300 via-slate-700 to-blue-900 h-screen   ">
          <div className="flex justify-center items-center h-full">
          <form
              onSubmit={handleSubmit}
              className="flex absolute top-[50%] left-[50%] transition-all translate-x-[-50%] translate-y-[-50%] flex-col justify-center items-center gap-4 w-[90%] md:w-[40%] py-4 bg-white p-2 rounded-xl drop-shadow-2xl drop-shadow-black"
            >
              <div className="flex gap-2 w-full text-white p-2" >
                <Link href={"/login"} className="w-1/2 bg-theme text-center p-2 rounded-sm" >Login</Link>
                <Link href={"/register"} className="w-1/2 text-center text-black rounded-sm hover:text-white p-2 hover:bg-theme transition-all" >Register</Link>
              </div>
              {/* <h1 className="text-3xl font-bold text-gray-800">Login</h1> */}

              {/* <p className="capitalize text-sm">
                Don&apos;t have an account?{" "}
                <span>
                  <Link href={"/register"} className="hover:underline">
                    Sign Up
                  </Link>
                </span>{" "}
              </p> */}
              {/* <Input type="email" placeholder="Email"    value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                } /> */}
              <Input
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, username: e.target.value }))
                }
              />
              <div className="relative w-full">
                <Input
                  type={visible ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                />
                <div onClick={()=>setVisible(!visible)} className="absolute right-3 top-3">
                  {visible ? <Eye size={15} /> : <EyeClosed size={15} />}
                </div>
              </div>
              <button type="submit" className="w-full p-2 rounded-md bg-theme text-white">
              Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
