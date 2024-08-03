import Image from "next/image";
import * as React from 'react'

export default function Home() {
  return (
    <main className="">
      here is our app home
      <Image
        src="/assets/images/logo.svg"
        width="200"
        height="200"
        alt="logo"
      />
    </main>
  );
}
