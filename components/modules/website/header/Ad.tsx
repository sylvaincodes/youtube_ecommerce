"use client";
import React, { useState } from "react";
import Container from "../../custom/Container";
import Row from "../../custom/Row";
import Link from "next/link";
import { LogOut, Mail, User } from "lucide-react";
import LanguageCurrency from "../../custom/LanguageCurrency";
import UserMenu from "../../custom/UserMenu";
import { useSession } from "next-auth/react";

export default function Ad() {
  const { status } = useSession();

  const [openUserMenu, setOpenUserMenu] = useState(false);

  return (
    <section className="hidden relative lg:flex w-full border-b border-neutral-200">
      <Container>
        <Row className="justify-between">
          <div className="flex">Welcome to Carrefour Store</div>
          <div className="flex gap-8 items-center">
            <Link
              id="contact"
              href="/contact"
              data-testid="contact"
              className="flex items-center px-4 py-2 h-full rounded-md hover:bg-neutral-100"
            >
              <Mail className="text-primary-500 h-4 w-4" />
              <span className="mx-2">Contact</span>
            </Link>

            <LanguageCurrency className="flex gap-4" />

            {/* TODO:Auth logic here */}
            <div className="flex justify-flex-end items-center gap-4 px-4 py-2 h-full hover:bg-neutral-100">
              {/* If login  */}

              {status === "authenticated" ? (
                <div className="flex gap-2 hover:cursor-pointer">
                  <User className="h-4 w-4 text-primary-500" />
                  <span onClick={() => setOpenUserMenu(!openUserMenu)}>
                    Account
                  </span>
                  <UserMenu openUserMenu={openUserMenu} />
                </div>
              ) : (
                <Link
                  href="/signin"
                  className="cursor-pointer flex gap-4 items-center"
                >
                  <LogOut className="h-4 w-4 text-primary-500" />
                  <span>Login</span>
                </Link>
              )}
            </div>
          </div>
        </Row>
      </Container>
    </section>
  );
}
