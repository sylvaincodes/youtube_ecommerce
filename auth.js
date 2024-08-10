import axios from "axios";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const { auth, handlers, signIn, signOut } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      name: "credentials",
      async authorize(credentials) {
        const email = credentials.email;
        const password = credentials.password;
        if (!email || !password) {
          throw new Error("fill credentials");
        }

        const promise = await axios.get(
          process.env.NEXT_PUBLIC_API_URL + "/api/user",
          {
            params: {
              email: email,
            },
          }
        );

        const user = promise.data.data;
        if (!user) {
          throw new Error("User not found");
        }
        const isCorrectPass = await bcrypt.compare(password, user.password);

        if (!isCorrectPass) {
          throw new Error("Pass not valid");
        }
        return user;
      },
    }),
  ],

  callbacks: {
    async session({ session, user }) {
      const promise = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "/api/user",
        {
          params: {
            email: session.user.email,
          },
        }
      );

      const userData = promise.data.data;
      user = userData;

      session.user.id = userData._id;
      session.user.verfiedEmail = user.emailVerified;
      session.user.role = userData.role;

      return session;
    },
    async jwt({ token }) {
      return token;
    },
  },

  pages: {
    signIn: "/signin",
  },

  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
});
