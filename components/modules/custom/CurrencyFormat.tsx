import { cn } from "@/lib/utils";
import React from "react";
import { NumericFormat } from "react-number-format";

export default function CurrencyFormat({
  className,
  value,
}: {
  className?: string;
  value: number;
}) {
  return (
    <NumericFormat
      className={cn(
        "tracking-wider font-normal inline-flex max-w-[160px] outline-none",
        className
      )}
      prefix="$"
      value={value}
      decimalScale={3}
      thousandSeparator=","
      decimalSeparator="."
    />
  );
}
