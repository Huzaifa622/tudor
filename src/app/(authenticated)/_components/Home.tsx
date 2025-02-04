"use client";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  // SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import api from "@/lib/axiosInstance";
import SchoolName from "./school-name";
import PreviewDialog from "./home-preview-dialog";
// import { flushAllTraces } from "next/dist/trace";
import Loader from "./loader";
import { LogOut } from "lucide-react";
import { commitedPreview, ordinaryPreview, youngPreview } from "@/lib/actions";

export default function Home() {
  const [user,setUser] = useState()
  const [groupNames, setGroupNames] =
    useState<{ id: string; GroupName: string }[]>();
  const [groupId, setGroupId] = useState<string>();
  const [loader, setLoader] = useState(false);
  const [schools, setSchools] = useState<
    {
      files: {
        file_id: string;
        file_name: string;
        mimeType: string;
      }[];
      school_id: string;
      school_name: string;
    }[]
  >();
  const [ordinaryP, setOrdinaryP] = useState<
  {
    id: string;
    GroupName: string;
    Schools: {
      school_id: string;
      school_name: string;
      docx_files: {
        file_name: string;
        file_id: string;
      }[];
    }[];
  }[]
>();
const [commitedP, setCommitedP] = useState<
  {
    id: string;
    GroupName: string;
    Schools: {
      school_id: string;
      school_name: string;
      docx_files: {
        file_name: string;
        file_id: string;
      }[];
    }[];
  }[]
>();
const [youngP, setYoungP] = useState<
  {
    id: string;
    GroupName: string;
    Schools: {
      school_id: string;
      school_name: string;
      docx_files: {
        file_name: string;
        file_id: string;
      }[];
    }[];
  }[]
>();
  const fetchAll = async () => {
    setLoader(true);
    const response = await api.get("/group_names");
    const data = response.data;
    setGroupNames(data);
   const promise1 = await ordinaryPreview();  
      const promise2 = await commitedPreview();  
      const promise3 = await youngPreview();    
      console.log(promise1, promise2, promise3); 
  
      
      setOrdinaryP(promise1!); 
      setCommitedP(promise2!); 
      setYoungP(promise3!); 

    setLoader(false);
  };
  useEffect(() => {
const name = JSON.parse(localStorage.getItem("user")!)
setUser(name)
    fetchAll();
  }, []);
  if (loader) {
    return (
      <div className="flex items-center justify-center h-screen">
        {" "}
        <Loader />
      </div>
    );
  }
  return (
    <div>
      <div className=" flex flex-col gap-8 items-center justify-center">
        <div className=" p-4 flex justify-between items-center w-full">
          <Image src={"/logo.svg"} width={200} height={200} alt="logo" className="w-[25%] md:w-[15%]" />
            <h1 className="text-lg" >Welcome {user}</h1>
          <div className="flex items-center gap-2 pr-4">
            <PreviewDialog commitedP={commitedP!} ordinaryP={ordinaryP!} youngP={youngP!}  />
            <button
              className="flex text-sm md:text-base items-center gap-2 border border-[#1D52A1] transition-all ease-linear hover:bg-gray-100 py-2 rounded-md px-2 "
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
            >
              <LogOut size={15} />
              Logout
            </button>
          </div>
        </div>
        <h1 className="text-2xl text-center md:text-5xl text-primary font-bold">
          Total Recruiting Solution
        </h1>
        <Select
          value={groupId}
          onValueChange={async (val) => {
            setLoader(true);
            setGroupId(val);
            await api.get(`filter_group?group_id=${val}`).then((res) => {
              console.log(res.data);
              setSchools(res.data.Schools);
            });
            setLoader(false);
          }}
        >
          <SelectTrigger className="w-[280px] bg-white transition-all ease-linear">
            <SelectValue placeholder="Select a Group" />
          </SelectTrigger>
          <SelectContent className="bg-white text-black">
            <SelectGroup>
              {groupNames?.map((g) => (
                <SelectItem
                  className="hover:bg-gray-100 cursor-pointer"
                  key={g.id}
                  value={g.id}
                >
                  {g.GroupName}
                </SelectItem>
              ))}
              {/* <SelectLabel>Fruits</SelectLabel> */}
              {/* <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem> */}
            </SelectGroup>
          </SelectContent>
        </Select>
        {loader && "loading...."}
        {schools && <SchoolName schools={schools} groupId={groupId!} />}
      </div>
    </div>
  );
}
