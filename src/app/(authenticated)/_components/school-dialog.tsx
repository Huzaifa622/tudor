"use client";
import {
  Dialog,
  DialogContent,
  // DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CgAttachment } from "react-icons/cg";
// import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import api from "@/lib/axiosInstance";
import React, { useState } from "react";
import Loader from "./loader";
import toast from "react-hot-toast";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
type FileType = File;
export function SchoolDialog({
  groupId,
  selectedSchool,
}: {
  groupId: string;
  selectedSchool: string[];
}) {
  const [files, setFiles] = useState<FileType[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
      e.target.value = "";
    }
  };

  // Handle file removal
  const handleRemoveFile = (idx: number) => {
    setFiles((prevFiles) => prevFiles.filter((file , index) => index !== idx));
  };

  const [loader, setLoader] = useState(false);
  const [plan, setPlan] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");
  // const [cycle, setCycle] = useState<number>(0);
  if (loader) {
    return (
      <div className="fixed min-h-screen h-full flex justify-center items-center w-screen top-0 z-[9999] bg-[#0000005b]">
        {" "}
        <div className="flex items-center flex-col h-screen justify-center">
          {" "}
          <Loader />
          <div className="text-white relative">Generating...</div>
        </div>
      </div>
    );
  }
  // console.log(cycle);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-white text-[#1D52A1] p-2 rounded-md">
          Generate Now
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-center text-red-600"></DialogTitle>
        </DialogHeader>
        {/* <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right">
              Name
            </label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="username" className="text-right">
              Username
            </label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
        </div> */}
        {loader && "loading...."}
        {!loader && (
          <>
         <h1 className="text-xl text-center" >Select a Plan</h1>
            <Select onValueChange={(val) => setPlan(val)} defaultValue="">
              <SelectTrigger className="w-full bg-white transition-all ease-linear">
                <SelectValue placeholder="Select a plan" />
              </SelectTrigger>
              <SelectContent className="bg-white text-black">
                <SelectGroup>
                  {/* {groupNames?.map((g) => ( */}

                  <SelectItem
                    className="hover:bg-gray-100 cursor-pointer"
                    // key={g.id}
                    value={"regular"}
                  >
                    {"Regular"}
                  </SelectItem>
                  <SelectItem
                    className="hover:bg-gray-100 cursor-pointer"
                    // key={g.id}
                    value={"committed"}
                  >
                    {"Committed"}
                  </SelectItem>
                  <SelectItem
                    className="hover:bg-gray-100 cursor-pointer"
                    // key={g.id}
                    value={"young"}
                  >
                    {"Young"}
                  </SelectItem>

                  {/* ))} */}
                  {/* <SelectLabel>Fruits</SelectLabel> */}
                  {/* <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem> */}
                </SelectGroup>
              </SelectContent>
            </Select>
          </>
        )}
    
          <div className="relative">
            <Textarea
              placeholder="Prompt(optional)"
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button className="absolute bottom-1 right-1 hover:bg-gray-300 rounded-full p-2">
              <label htmlFor="fileInput">
                {" "}
                <CgAttachment />
                <input
            id="fileInput"
            accept=".doc, .docx, .pdf"
            multiple
            className="hidden"
            type="file"
            onChange={handleFileChange}
          />
              </label>
            </button>
          </div>
      
          {files.length > 0 && (
        <div className="  bg-white  rounded  ">
          <ul>
            {files.map((file, idx) => (
              <li key={idx} className="flex justify-between items-center p-2 border  mb-2 w-64 text-sm ">
                <span>{file.name}</span>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleRemoveFile(idx)}
                >
                  <X/>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
        <DialogFooter className="flex justify-center items-center w-full">
          <button
            onClick={async (e: React.SyntheticEvent) => {
              e.preventDefault();
              if (plan == "") {
                toast.error("Plan can't be empty");
                return;
              }
              setLoader(true);

              if (plan == "regular") {
                const formData = new FormData();

                // Append the files to FormData
                files.forEach((file) => {
                  formData.append("files[]", file); // 'files[]' is the key for files
                });
            
                // Append other fields to FormData
                formData.append("group_id", groupId);
                // formData.append("selected_cycle", String(cycle));
                formData.append("school_ids", JSON.stringify(selectedSchool)); // Assuming selectedSchool is an array
                formData.append("prompt", prompt);
                for (const value of formData.values()) {
                  console.log(value);
                }
                await api
                  .post(
                    "regular_plan",
                   formData
                  )
                  .then((res) => {
                    // await api.get("preview")
                    console.log(res.data);
                    toast.success(res.data.status);
                    window.location.reload();
                    setLoader(false);
                  }).catch(err=>{
                    setLoader(false);
                    // console.log(err)
                    toast.error(err.response.data.detail)
                  });
                return;
              }

              if (plan == "committed") {
                const formData = new FormData();

                // Append the files to FormData
                files.forEach((file) => {
                  formData.append("files[]", file); // 'files[]' is the key for files
                });
            
                // Append other fields to FormData
                formData.append("group_id", groupId);
                // formData.append("selected_cycle", String(cycle));
                formData.append("school_ids", JSON.stringify(selectedSchool)); // Assuming selectedSchool is an array
                formData.append("prompt", prompt);
                for (const value of formData.values()) {
                  console.log(value);
                }
                await api
                  .post(
                    "committed_plan",
                    formData
                  )
                  .then((res) => {
                    // await api.get("preview")
                    console.log(res.data);
                    toast.success(res.data.status);
                    window.location.reload();
                    setLoader(false);
                  }).catch(err=>{
                    setLoader(false);
                    // console.log(err)
                    toast.error(err.response.data.detail)
                  });
                return;
              }

              if (plan == "young") {
                const formData = new FormData();

                // Append the files to FormData
                files.forEach((file) => {
                  formData.append("files[]", file); // 'files[]' is the key for files
                });
            
                // Append other fields to FormData
                formData.append("group_id", groupId);
                // formData.append("selected_cycle",  String(cycle));
                formData.append("school_ids", JSON.stringify(selectedSchool)); // Assuming selectedSchool is an array
                formData.append("prompt", prompt);
                await api
                  .post(
                    "young_plan",
                    formData
                  )
                  .then((res) => {
                    // await api.get("preview")
                    console.log(res.data);
                    toast.success(res.data.status);
                    window.location.reload();
                    setLoader(false);
                  }).catch(err=>{
                    setLoader(false);
                    // console.log(err)
                    toast.error(err.response.data.detail)
                  });
                return;
              }

              setLoader(false);
            }}
            className="bg-[#1D52A1] p-2 rounded-md text-white w-full"
            type="submit"
            disabled={loader}
          >
            Confirm
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
