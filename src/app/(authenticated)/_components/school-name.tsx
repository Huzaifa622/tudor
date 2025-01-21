import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Eye } from "lucide-react";
import Link from "next/link";
import { SchoolDialog } from "./school-dialog";
import { useState } from "react";

interface ISchools {
  schools: {
    files: {
      file_id: string;
      file_name: string;
      mimeType: string;
    }[];
    school_id: string;
    school_name: string;
  }[];
  groupId: string;
}
export default function SchoolName({ schools, groupId }: ISchools) {
  const [selectedFileIds, setSelectedFileIds] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleFileCheckboxChange = (fileId:string ) => {
    setSelectedFileIds((prevSelected) => {
      if (prevSelected.includes(fileId)) {
        // Remove the fileId if it's already in the array
        return prevSelected.filter((id) => id !== fileId);
      } else {
        // Add the fileId to the array
        return [...prevSelected, fileId];
      }
    });
  };
  // useEffect(() => {
  //   const totalFiles = schools.flatMap((school) => school.files).length;
  //   if (totalFiles === selectedFileIds.length) {
  //     setSelectAll(true); // Check "select all" if all files are selected
  //   } else {
  //     setSelectAll(false); // Uncheck "select all" otherwise
  //   }
  // }, [selectedFileIds, schools]);
  console.log(selectedFileIds)
  return (
    <div className="bg-[#1D52A1] text-white p-4 rounded-lg my-12 w-[80%] mx-auto">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="all" key="all">
          <AccordionTrigger>
            <input
              type="checkbox"
              checked={selectAll}
              onChange={() => {setSelectAll(!selectAll); setSelectedFileIds([])}}
              className="mr-2"
            />
            Select/Deselect All
          </AccordionTrigger>
        </AccordionItem>
        {schools.map((s) => (
          <AccordionItem value={s.school_id} key={s.school_id}>
            <div className=" flex w-full">
              <input
                type="checkbox"
                checked={selectedFileIds.includes(s.school_id) || selectAll}
                onChange={() => handleFileCheckboxChange(s.school_id)}
                className="mr-2 "
              />
              <AccordionTrigger className="w-[90%]">
                {" "}
                {s.school_name}{" "}
              </AccordionTrigger>
            </div>

            <AccordionContent>
              {s.files.map((f) => (
                <div
                  key={f.file_id}
                  className=" bg-white text-black my-2 hover:bg-blue-400 px-6 w-full py-4 flex justify-between rounded-md transition-all ease-linear "
                >
                  <div>{f.file_name}</div>
                  <Link
                    href={`https://drive.google.com/file/d/${f.file_id}/view`}
                    target="_blank"
                  >
                    {" "}
                    <Eye />{" "}
                  </Link>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      {(selectAll || selectedFileIds.length !== 0) && (
        <div className="flex justify-center items-center py-4">
          <SchoolDialog groupId={groupId} selectedSchool={selectAll ? [] : selectedFileIds} />
        </div>
      )}
    </div>
  );
}
