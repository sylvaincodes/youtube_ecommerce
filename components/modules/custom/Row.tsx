import React from "react";

export default function Row({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`flex items-center h-full w-full  ${className}`}>{
    children
  }</div>;
}
