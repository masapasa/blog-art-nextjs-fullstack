import { ThemeToggler } from "@/components/ThemeToggler";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Login } from "./Signin";
import Profile from "@/components/Profile";

export const NavBar = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <nav className="flex justify-between items-center py-8">
      <Link href={"/"}>
        <h2 className="font-bold text-xl">Send it.</h2>
      </Link>
      <ul className="flex items-center gap-4">
        {!session?.user && <Login />}
        <li>
          <ThemeToggler />
        </li>
        <Profile session={session} />
      </ul>
    </nav>
  );
};
