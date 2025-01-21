"use client";
import { Input } from "@/components/ui/input";
import { SignUp } from "@/lib/auth";
import { Eye, EyeClosed } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const [formData, setFormData] = useState<{
    username: string;
    // email:string;
    password: string;
  }>({ username: "", password: "" });
  const router = useRouter()
  const [visible, setVisible] = useState(false);
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(formData);
   const res = await SignUp(formData);
    setFormData({ username: "", password: "" });
    if(res){
      router.push("/")
    }
  };
  return (
    <div>
      <div className="flex">
        <div className="bg-theme h-screen w-full lg:w-1/2">
          <div className="flex justify-center items-center h-full ">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col justify-center items-center gap-4 w-[90%] md:w-[60%] py-4 bg-white p-2 rounded-xl drop-shadow-2xl drop-shadow-black"
            >
              <h1 className="text-3xl font-bold text-gray-800">Register</h1>

              <p className="capitalize text-sm">
                already have an account?{" "}
                <span>
                  <Link href={"/login"} className="hover:underline">
                    Sign In
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
              <button className="w-full p-2 rounded-md bg-theme text-white">
                Sign Up
              </button>
            </form>
          </div>
        </div>
        <div className="bg-white h-screen hidden lg:flex w-1/2 p-8  justify-end items-start">
          <Image src={"/logo.svg"} alt="logo" width={200} height={100} />
        </div>
      </div>
    </div>
  );
}
