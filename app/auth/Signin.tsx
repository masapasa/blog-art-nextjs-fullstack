"use client";
import Button from "@/components/Button";
import { signIn } from "next-auth/react";

export const Login = () => {
  return (
    <li className="list-none">
      <Button
        className="bg-purple-600 rounded dark:bg-purple-400 text-white text-sm"
        onClick={() => signIn()}
      >
        Sign In
      </Button>
    </li>
  );
};
