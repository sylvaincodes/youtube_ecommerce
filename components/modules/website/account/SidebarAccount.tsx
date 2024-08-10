"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { User as TUser } from "@/types";
import {
  AlignJustify,
  BadgeDollarSign,
  BookUser,
  LayoutDashboard,
  LogOut,
  User,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SidebarAccount({ user }: { user: TUser }) {
  const [openSidebar, setSidebar] = useState(false);

  const router = useRouter();
  return (
    <div className="h-screen relative">
      <Button 
        className="absolute top-0 left-0"
        type="button"
        variant="default"
        onClick={() => setSidebar(!openSidebar)}
      >
        <AlignJustify />
      </Button>

      <aside
        className={cn(
          "h-full bg-white shadow-md absolute xl:relative xl:translate-x-0 top-10 left-0 z-40 w-64 transition-transform -translate-x-full",
          openSidebar && "translate-x-0"
        )}
        aria-label="sidebar"
      >
        <div className="h-full px-3 py-4 overflow-auto bg-gray-50 ">
          <ul className="space-y-2 font-medium flex flex-col gap-10">
            <li>
              <Image
                width="80"
                height="80"
                alt="product"
                src={
                  user?.image
                    ? user.image
                    : "https://cdn-icons-png.flaticon.com/128/236/236831.png"
                }
              />
            </li>

            <li>
              <Link
                className="flex items-center p-2 text-gray-900 rounded-lg"
                href="/account/dashboard"
              >
                <LayoutDashboard />
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>

            <li>
              <Link
                className="flex items-center p-2 text-gray-900 rounded-lg"
                href="/account/profil"
              >
                <User />
                <span className="ms-3">Profil</span>
              </Link>
            </li>

            <li>
              <Link
                className="flex items-center p-2 text-gray-900 rounded-lg"
                href="/account/order"
              >
                <BadgeDollarSign />
                <span className="ms-3">Order</span>
              </Link>
            </li>

            <li>
              <Link
                className="flex items-center p-2 text-gray-900 rounded-lg"
                href="/account/address"
              >
                <BookUser />
                <span className="ms-3">Address</span>
              </Link>
            </li>

            <li>
              <Button
                onClick={() => {
                  signOut();
                  router.push("/");
                }}
                className="flex items-center "
              >
                <LogOut />
                <span className="ms-3">LogOut</span>
              </Button>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
