import { cn } from "@/lib/utils";
import { Option, Style } from "@/types";
import Image from "next/image";
import React from "react";

export default function ProductStyleOptions({
  style,
  styles,
  setStyle,
  setActive,
  setOption,
  setOptionActive,
  setImages,
  getStock,
  option,
  options,
}: {
  style: Style;
  styles: Style[];
  setStyle: (value: Style) => void;
  setActive: (value: number) => void;
  setOption: (value: Option) => void;
  setOptionActive: (value: number) => void;
  setImages: (value: string[]) => void;
  getStock: () => void;
  option: Option;
  options: Option[];
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full">
      {/* styles  */}
      <div className="flex flex-col gap-4">
        <h2>
          <span className="font-bold text-xl">Styles:</span>
          <span className="text-sm font-normal ms-10">{style.name}</span>
        </h2>

        <div className="flex items-center gap-4">
          {styles.map((item: Style, idx: number) => (
            <div
              onMouseEnter={() => {
                setStyle(item);
                setActive(idx);
              }}
              key={idx}
              className={cn(
                "relative w-[100px] h-[60px] border border-gray-300  outline-slate-300 cursor-pointer rounded-lg overflow-hidden hover:outline-primary-400 outline-offset-2 flex items-center justify-center",
                item === style && "outline outline-primary-600 outline-offset-2"
              )}
            >
              <Image
                src={item.image}
                className="w-[400px] h-[400px] object-contain"
                width={180}
                height={180}
                alt="style image"
              />
              {!item.image && (
                <span className="absolute inset-0 top-2 text-center text-slate-900">
                  {item.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Options  */}
      <div className="flex flex-col gap-4 flex-1 w-full">
        <h2>
          <span className="text-xl font-bold">Options:</span>
          <span className="text-sm ms-10 font-normal text-red-400">
            {option.qty > 0 ? option.qty + "left in stock" : "Out of stock"}
          </span>
        </h2>

        <div className="flex items-center flex-wrap  gap-4">
          {options.map((item: Option, idx2: number) => (
            <div
              key={idx2}
              onMouseEnter={() => {
                setOption(item);
                setImages(item.images);
                setOptionActive(idx2);
                getStock();
              }}
              className={cn(
                "w-[300px] lg:w-[200px] outline-slate-300 border border-gray-300 p-4  cursor-pointer rounded-lg overflow-hidden hover:outline-primary-400  outline-offset-2 flex items-center justify-center",
                item === option &&
                  "outline outline-primary-600 outline-offset-2"
              )}
            >
              <div>{item.option}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
