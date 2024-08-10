import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import React, { useState } from "react";
import FiltersPrice from "../../custom/FiltersPrice";

export default function FiltersMobile({
  loading,
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
}: {
  loading: boolean;
  setMaxPrice: (value: number) => void;
  setMinPrice: (value: number) => void;
  minPrice: number;
  maxPrice: number;
}) {
  const [sheetOpen, setSheetOpen] = useState(false);
  return (
    <div className="lg:hidden">
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetTrigger>
          <div className="flex gap-2 items-center">Filters</div>
        </SheetTrigger>
        <SheetContent className="px-4 w-full md:w-[400px] p-0" side="left">
          <SheetHeader className="bg-primary-200 p-4 justify-start">
            <SheetTitle className="text-sm">Filters</SheetTitle>
            <SheetDescription>All filters here</SheetDescription>
          </SheetHeader>

          <div className="flex flex-col h-screen p-4">
            <FiltersPrice
              minPrice={minPrice}
              maxPrice={maxPrice}
              setMinPrice={setMinPrice}
              setMaxPrice={setMaxPrice}
              loading={loading}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
