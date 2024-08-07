import { cn } from "@/lib/utils";
import React, { useState } from "react";
import Language from "./Language";
import Currency from "./Currency";

export default function LanguagesCurrency({
  className,
}: {
  className?: string;
}) {

  const [ languages, setLanguages ] = useState("English")
  const [ currency, setCurrency ] = useState("USD")

  const handleLanguage = (value: string) => {
      setLanguages(value);
  }
  
  const handleCurrency = (value: string) => {
      setCurrency(value);
  }
  

  return (
    <div className={cn("", className)}>
      <Language languages={languages} handleLanguage={handleLanguage} />
      <Currency currency={currency} handleCurrency={handleCurrency} />
    </div>
  );
}
