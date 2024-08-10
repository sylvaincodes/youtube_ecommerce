import { NextRequest } from "next/server";
import authConfig from "./auth.config";
import NextAuth from "next-auth";

// Use only one of the two middleware options below
// 1. Use middleware directly
// export const { auth: middleware } = NextAuth(authConfig)

// 2. Wrapped middleware option
// @ts-expect-error: auth is not updated
const { auth } = NextAuth(authConfig);
export default auth(async function middleware(req: NextRequest) {
  console.log(req);
});
// Your custom middleware logic goes here
//   const { nextUrl } = req;
//   // console.log(auth);
//   //if is auth and try to reconnecte redirect
//   const url = ["/signin", "/register"];
//   if (url.includes(nextUrl.pathname)) {
//     return Response.redirect(new URL(`${process.env.NEXT_PUBLIC_SERVER_URL}`));
//   }
