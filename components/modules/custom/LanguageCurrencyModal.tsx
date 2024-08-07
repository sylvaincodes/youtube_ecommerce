import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import React from "react";
import { CiGlobe } from "react-icons/ci";
import LanguagesCurrency from "./LanguagesCurrency";

export default function LanguageCurrencyModal({
  className,
}: {
  className?: string;
}) {
  return (
    <Sheet>
      <SheetTrigger>
        <div className="lg:hidden">
          <span>
            <CiGlobe className={cn("h-8 w-8", className)} />
          </span>
        </div>
      </SheetTrigger>
      <SheetContent side="bottom" className="rounded-t-3xl">
        <SheetHeader>
          <SheetTitle>Language/currency</SheetTitle>
          <SheetDescription>Select an option</SheetDescription>
        </SheetHeader>

        <div className="mt-10">
          <LanguagesCurrency className="px-8 flex justify-between items-center " />
        </div>
      </SheetContent>
    </Sheet>
  );
}
