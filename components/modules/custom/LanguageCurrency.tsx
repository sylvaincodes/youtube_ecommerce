"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import Currency from "./Currency";
import Language from "./Language";

export default function LanguageCurrency({
  className,
}: {
  className?: string;
}) {
  const [languages, setLanguages] = useState("English");
  const [currency, setCurrency] = useState("Usd");

  const handleCurrency = (value: string) => {
    setCurrency(value);
  };

  const handleLanguage = (value: string) => {
    setLanguages(value);
  };

  return (
    <div className={cn("", className)}>
      <Language languages={languages} handleLanguage={handleLanguage} />
      <Currency currency={currency} handleCurrency={handleCurrency} />
    </div>
  );
}
