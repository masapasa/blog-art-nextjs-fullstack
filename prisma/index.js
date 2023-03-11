import { PrismaClient } from "@prisma/client";

const client = globalThis.prisma || new PrismaClient(); // Check if the global prisma exist or not if not then create a new instance.

// Checking if the app run in the production mode then it always call it once so we need to be instance the client for the production mode.

if (process.env.NODE_ENV === "production") {
  globalThis.prisma = new PrismaClient();
}

export default client;
