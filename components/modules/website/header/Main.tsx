"use client";
import React, { useState } from "react";
import Container from "../../custom/Container";
import Row from "../../custom/Row";
import SearchInput from "../../custom/SearchInput";
import IconsGroup from "../../custom/IconsGroup";
import SidebarMenu from "../../custom/SidebarMenu";
import Logo from "../../custom/Logo";
import { cn } from "@/lib/utils";
import SearchMobile from "../../custom/SearchMobile";
import LanguageCurrencyModal from "../../custom/LanguageCurrencyModal";

export default function Main() {
  const [openSearchMobile, setOpenSearchMobile] = useState(false);
  return (
    <section className="w-full py-2">
      <Container>
        <Row className="justify-between h-[84px] lg:gap-x-24">
          <div
            className={cn(
              "flex items-center gap-4 ",
              openSearchMobile && " hidden lg:flex"
            )}
          >
            <SidebarMenu />
            <div className="flex">
              <Logo />
            </div>
          </div>
          <div className="flex items-center gap-2 w-full justify-end lg:hidden">
            <SearchMobile
              openSearchMobile={openSearchMobile}
              setOpenSearchMobile={setOpenSearchMobile}
            />
            <LanguageCurrencyModal
              className={cn("", openSearchMobile && "hidden")}
            />
          </div>
          <SearchInput />
          <IconsGroup />
        </Row>
      </Container>
    </section>
  );
}
