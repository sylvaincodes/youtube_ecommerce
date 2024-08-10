import React from "react";
import FiltersMobile from "./FiltersMobile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,

  DropdownMenuSeparator,

  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";

export default function TopBar({
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  loading,
  slug,
  perpage,
  filter,
  setPerPages,
  setFilter,
}: {
  minPrice: number;
  maxPrice: number;
  setMinPrice: (value: number) => void;
  setMaxPrice: (value: number) => void;
  loading: boolean;
  slug?: string;
  perpage: number;
  filter: string;
  setPerPages: (value: number) => void;
  setFilter: (value: string) => void;
}) {
  return (
    <div className="items-center gap-4 flex-1 justify-between lg:flex">
      <div className="flex w-full item-center gap-4 flex-1 justify-between">
        <FiltersMobile
          minPrice={minPrice}
          maxPrice={maxPrice}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
          loading={loading}
        />

        <div className="ms-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">{filter ? filter : slug}</Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56">
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value="bottom">
                <DropdownMenuRadioItem
                  value="top"
                  onClick={() => setFilter("alphabetic")}
                >
                  Alphabetic
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value={filter}
                  onClick={() => setFilter("priceLowToHigh")}
                >
                  Price: Low to High
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value={filter}
                  onClick={() => setFilter("priceHighToLow")}
                >
                  Price: High to Low
                </DropdownMenuRadioItem>

                <DropdownMenuRadioItem
                  value={filter}
                  onClick={() => setFilter("latest")}
                >
                  Latest
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <span className="ms-10">Show: </span>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">{perpage}</Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56">
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value="bottom">
                <DropdownMenuRadioItem
                  value="30"
                  onClick={() => setPerPages(30)}
                >
                  30
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value="30"
                  onClick={() => setPerPages(20)}
                >
                  20
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value="10"
                  onClick={() => setPerPages(10)}
                >
                  10
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value="10"
                  onClick={() => setPerPages(5)}
                >
                  5
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
