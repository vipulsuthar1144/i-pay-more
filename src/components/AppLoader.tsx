"use client";
import { Loader } from "lucide-react";

const AppLoader = () => {
  return (
    <div className="flex justify-center items-center py-8">
      {/* <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div> */}
      <Loader className="animate-spin text-black h-10 w-10" />
    </div>
  );
};

export default AppLoader;
