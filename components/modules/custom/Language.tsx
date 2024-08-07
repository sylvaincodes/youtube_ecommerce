import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Languages } from "lucide-react";
import React from "react";

export default function Language({
  languages,
  handleLanguage,
}: {
  languages: string;
  handleLanguage: (value: string) => void;
}) {
  return (
    <Select onValueChange={handleLanguage}>
      <SelectTrigger className=" w-[140px] border-0 focus:outline-none  focus:visible-none focus:ring-0  ring-white">
        <Languages className="text-primary-500 h-4 w-4" />
        <SelectValue placeholder={languages} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="en">English</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
