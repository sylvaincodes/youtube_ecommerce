import React from "react";

export default function Col({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`flex flex-col h-full w-full   ${className}`}>{
    children
  }</div>;
}
