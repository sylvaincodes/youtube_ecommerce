import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CiMoneyBill } from "react-icons/ci";

export default function Currency({
  currency,
  handleCurrency,
}: {
  currency: string;
  handleCurrency: (value: string) => void;
}) {
  return (
    <Select onValueChange={handleCurrency}>
      <SelectTrigger className=" w-[140px] border-0 focus:outline-none  focus:visible-none focus:ring-0 ring-white">
        <CiMoneyBill className="text-primary-500 h-4 w-4" />
        <SelectValue placeholder={currency} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="en">USD</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
