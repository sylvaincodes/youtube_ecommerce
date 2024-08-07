import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCheck, X } from "lucide-react";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import { m } from "framer-motion";

export default function Toast({
  status = "success",
  message,
  link,
  toastId,
}: {
  status?: "error" | "success";
  message: string;
  link?: string;
  toastId?: string;
}) {
  return (
    <m.div
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      className={cn(
        "flex items-center justify-between gap-10 shadow-md p-4 mb-4 text-primary-800 border-primary-400 bg-primary-50 ",
        status === "error" && "text-red-800 border-t-4 border-red-300"
      )}
      role="alert"
    >
      {status === "success" ? (
        <CheckCheck className="w-8 h-8 text-primary-700" />
      ) : (
        <AlertCircle className="w-8 h-8 text-red-700" />
      )}

      <div className="ms-3 text-sm font-medium">
        {message}
        {link && (
          <Link
            href={link}
            className="font-semibold underline hover:no-underline "
          ></Link>
        )}
      </div>
      <Button
        onClick={() => toast.remove(toastId)}
        size="icon"
        variant="outline"
        className="ms-auto rounded-lg "
      >
        <X
          className={cn(
            "text-black h-8 w-8",
            status === "error" && "text-red-800 "
          )}
        />
      </Button>
    </m.div>
  );
}
