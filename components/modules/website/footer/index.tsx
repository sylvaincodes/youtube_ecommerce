import React from "react";
import Container from "../../custom/Container";
import Logo from "../../custom/Logo";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mb-20 lg:mb-0 py-4">
      <Container>
        <div className="w-full flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8">
          <Logo />
          <ul className="flex flex-wrap items-center justify-center mb-6 text-sm font-medium text-gray-500 sm:mb-0">
            <li>
              <Link href="#" className="hover:underline me-4 md:me-6">
                About
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline me-4 md:me-6">
                Privacy policy
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline me-4 md:me-6">
                Mentions
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline me-4 md:me-6">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 " />

        <div className="flex items-center justify-center gap-4 text-center py-4">
          <span className="text-sm text-gray-500 text-center">@2024</span>
          <Link href="#" className="hover:underline">
            Carrefour
          </Link>
          All right reserved
        </div>
      </Container>
    </footer>
  );
}
