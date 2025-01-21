import toast from "react-hot-toast";
// import { api } from "./axiosInstance";
// import { headers } from "next/headers";
import axios from "axios";

export async function LogIn(data: { username: string; password: string }) {
  try {
    console.log("Login request:", data);

    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("password", data.password);

    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/login`, formData);

    console.log("Login response:", res.data);

    // Store the token if login is successful
    if (res.data?.access_token) {
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("user" , JSON.stringify(res.data.username))
      toast.success("User Login Successfully");
    }

    return res;
  } catch (error: any) {// eslint-disable-line
    // console.error("Login error:", error);

    // Display an error toast message
    toast.error(error.response?.data?.detail || "Login failed");

    return null; // Return null on failure
  }
}



export async function SignUp(data: {
  // email: string;
  username: string;
  password: string;
}) {
  try {
    console.log(JSON.stringify(data));
    const formData = new FormData();
    formData.append("username" , data.username);
    formData.append("password" , data.password);
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/signup`, formData, {
      // headers: {
      //   "Content-Type": "application/json", 
      //   Accept: "application/json",
      // },
    });

    console.log(res.data)
    localStorage.setItem("token" , res.data.access_token);
    localStorage.setItem("user" , JSON.stringify(res.data.username))

    toast.success("User Registered Successfully");
    
    return res
  } catch (error: any) {// eslint-disable-line
    
    console.log(error)
    toast.error(error.response.data.detail);
    
  }
}
