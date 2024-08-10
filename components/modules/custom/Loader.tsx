import { LoaderIcon } from "lucide-react";
import React from "react";

export default function Loader() {
  return (
    <div className="min-h-screen w-full bg-white flex justify-center items-center ">
      <div className="" role="status">
        <LoaderIcon className="text-primary-800 animate-spin" size={100} />
      </div>
    </div>
  );
}
