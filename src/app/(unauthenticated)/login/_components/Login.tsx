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
      <div className="flex">
        <div className=" h-screen bg-white hidden lg:flex items-start w-1/2 p-8">
          <Image src={"/logo.svg"} alt="logo" width={200} height={100} />
        </div>
        <div className=" bg-theme w-full lg:w-1/2 h-screen  ">
          <div className="flex justify-center items-center h-full">
          <form
              onSubmit={handleSubmit}
              className="flex flex-col justify-center items-center gap-4 w-[90%] md:w-[60%] py-4 bg-white p-2 rounded-xl drop-shadow-2xl drop-shadow-black"
            >
              <h1 className="text-3xl font-bold text-gray-800">Login</h1>

              <p className="capitalize text-sm">
                Dont have an account?{" "}
                <span>
                  <Link href={"/register"} className="hover:underline">
                    Sign Up
                  </Link>
                </span>{" "}
              </p>
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
