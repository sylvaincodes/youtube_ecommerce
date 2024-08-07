import React from "react";
import { ClipLoader } from "react-spinners";

export default function Loading({
  isLoading,
  size = 100,
  color = "#1c1b4b",
}: {
  isLoading: boolean;
  size?: number;
  color?: string;
}) {
  return (
    <div className="z-50">
      {isLoading && (
        <ClipLoader
          className="absolute inset-0 m-auto z-50"
          size={size}
          color={color}
        />
      )}
    </div>
  );
}
