import { cn } from "@/lib/utils";
import { ChevronDownCircle } from "lucide-react";
import React from "react";

export default function CartHeader({ active }: { active: string }) {
  return (
    <div className="my-10">
      <ol className="items-center flex flex-wrap md:flex-nowrap gap-y-4 w-full text-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:text-base">
        <li
          className={cn(
            "after:border-1 flex items-center  after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10",
            active === "cart" && "text-primary-700"
          )}
        >
          <span className="flex items-center gap-4 after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
            <ChevronDownCircle className={cn("text-slate-400", active === "cart" && "text-primary-700" )} />
            Cart
          </span>
        </li>

        <li
          className={cn(
            "after:border-1 flex items-center after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10",
            active === "checkout" && "text-primary-700"
          )}
        >
          <span className="flex items-center gap-4 after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
            <ChevronDownCircle className={cn("text-slate-400", active === "checkout" && "text-primary-700" )} />
            Checkout
          </span>
        </li>

        <li
          className={cn(
            "flex shrink-0 gap-4 items-center",
            active === "order" && "text-primary-700"
          )}
        >
          <ChevronDownCircle className={cn("text-slate-400",  active === "order" && "text-primary-700" )} />
          Order summary
        </li>
      </ol>
    </div>
  );
}
