"use client";
import {
  Dialog,
  DialogContent,
  // DialogDescription,
  // DialogFooter,
  // DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  // CardDescription,
  // CardFooter,
  // CardHeader,
  // CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";
// import api from "@/lib/axiosInstance";
import Link from "next/link";
import { Eye } from "lucide-react";
// import { commitedPreview, ordinaryPreview, youngPreview } from "@/lib/actions";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

interface IPlans {
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
  }

const PreviewDialog = ({youngP , ordinaryP , commitedP}:{youngP:IPlans[]; commitedP:IPlans[]; ordinaryP:IPlans[]; }) => {

  // const [preview, setPreview] = useState<string>("");

  // const fetchAll = async () => {
  //   try {
  //     const promise1 = await ordinaryPreview();  // Data from ordinaryPreview
  //     const promise2 = await commitedPreview();  // Data from commitedPreview
  //     const promise3 = await youngPreview();    // Data from youngPreview
  
  //     console.log(promise1, promise2, promise3); // Log the data
  
  //     // Assuming you want to update state after fetching the data:
  //     setOrdinaryP(promise1!); // Set state with data from ordinaryPreview
  //     setCommitedP(promise2!); // Set state with data from commitedPreview
  //     setYoungP(promise3!);     // Set state with data from youngPreview
  //   } catch (error) {
  //     console.error("Error fetching all previews:", error);
  //   }
  // };
  
  // console.log(commitedP);

  // useEffect(() => {
  //   fetchAll();
  // }, []);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-white bg-[#1D52A1] p-2 text-xs md:text-base rounded-md">
          Preview
        </button>
      </DialogTrigger>
    <DialogContent className="sm:max-w-[80%] bg-[#1D52A1] overflow-y-auto">
  <DialogTitle></DialogTitle>
  <Tabs defaultValue="account" className="">
    <TabsList className="grid w-full grid-cols-3">
      <TabsTrigger className="" value="ordinary">Regular Plan</TabsTrigger>
      <TabsTrigger value="committed">Committed Plan</TabsTrigger>
      <TabsTrigger value="young">Young Plan</TabsTrigger>
    </TabsList>
    <TabsContent value="ordinary">
      <Card className="bg-[#1d51a0]">
        <CardContent className="space-y-2 overflow-y-auto max-h-[40vh]">
          <Accordion type="single" collapsible className="w-full text-white">
            {ordinaryP?.map((s) => (
              <AccordionItem key={s.id} value={s.id}>
                <AccordionTrigger>{s.GroupName}</AccordionTrigger>
                <AccordionContent>
                  {s.Schools.map((a) => (
                    <div
                      key={a.school_id}
                      className="bg-white text-black my-2 hover:bg-blue-400 px-6 w-full py-4 flex justify-between rounded-md transition-all ease-linear"
                    >
                      <div>{a.school_name}</div>
                      {a.docx_files.map((d) => (
                        <Link key={d.file_id} href={`https://drive.google.com/file/d/${d.file_id}/view`} target="_blank">
                          <Eye />
                        </Link>
                      ))}
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </TabsContent>
    <TabsContent value="committed">
      <Card className="bg-[#1d51a0]">
        <CardContent className="space-y-2 overflow-y-auto max-h-[40vh]">
          <Accordion type="single" collapsible className="w-full text-white">
            {commitedP?.map((s) => (
              <AccordionItem key={s.id} value={s.id}>
                <AccordionTrigger>{s.GroupName}</AccordionTrigger>
                <AccordionContent>
                  {s.Schools.map((a) => (
                    <div
                      key={a.school_id}
                      className="bg-white text-black my-2 hover:bg-blue-400 px-6 w-full py-4 flex justify-between rounded-md transition-all ease-linear"
                    >
                      <div>{a.school_name}</div>
                      {a.docx_files.map((d) => (
                        <Link key={d.file_id} href={`https://drive.google.com/file/d/${d.file_id}/view`} target="_blank">
                          <Eye />
                        </Link>
                      ))}
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </TabsContent>
    <TabsContent value="young">
      <Card className="bg-[#1d51a0]">
        <CardContent className="space-y-2 overflow-y-auto max-h-[40vh]">
          <Accordion type="single" collapsible className="w-full text-white">
            {youngP?.map((s) => (
              <AccordionItem key={s.id} value={s.id}>
                <AccordionTrigger>{s.GroupName}</AccordionTrigger>
                <AccordionContent>
                  {s.Schools.map((a) => (
                    <div
                      key={a.school_id}
                      className="bg-white text-black my-2 hover:bg-blue-400 px-6 w-full py-4 flex justify-between rounded-md transition-all ease-linear"
                    >
                      <div>{a.school_name}</div>
                      {a.docx_files.map((d) => (
                        <Link key={d.file_id} href={`https://drive.google.com/file/d/${d.file_id}/view`} target="_blank">
                          <Eye />
                        </Link>
                      ))}
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </TabsContent>
  </Tabs>
</DialogContent>
    </Dialog>
  );
}

export default React.memo(PreviewDialog);
