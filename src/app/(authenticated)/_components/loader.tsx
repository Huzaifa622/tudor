import React from "react";

export default function Loader() {
  return (
    <div className="flex justify-center items-center w-full z-[99999] ">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
