import { getUserById } from "@/actions/user";
import { auth } from "@/auth";
import Container from "@/components/modules/custom/Container";
import SidebarAccount from "@/components/modules/website/account/SidebarAccount";
import { redirect } from "next/navigation";
import React from "react";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const user = await getUserById(session?.user?.id);
  if (!session) {
    redirect("/");
  }

  return (
    <section className="py-10 relative h-screen">
      <Container className="overflow-x-auto overflow-y-hidden">
        <div className="flex relative">
          <SidebarAccount user={user} />
          <div className="flex-1">{children} </div>
        </div>
      </Container>
    </section>
  );
}
