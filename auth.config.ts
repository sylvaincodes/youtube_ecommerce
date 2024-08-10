import GitHub from "next-auth/providers/github";
// @ts-expect-error: auth is not updated
import type { NextAuthConfig } from "next-auth";

export default { providers: [GitHub] } satisfies NextAuthConfig;
