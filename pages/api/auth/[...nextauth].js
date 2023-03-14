import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../prisma";

/**
 * Set up the authentication options with the prisma adapter which we need to pass to the Next auth
 */
export const authOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET_KEY,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};

export default NextAuth(authOptions);
