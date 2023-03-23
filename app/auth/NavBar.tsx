import { ThemeToggler } from "@/components/ThemeToggler";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Login } from "./Signin";
import Profile from "@/components/Profile";
import { Permanent_Marker } from "next/font/google";
import classNames from "@/utils/customClassname";

const roboto = Permanent_Marker({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
});
export const NavBar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <nav className="flex justify-between items-center py-8">
      <Link href={"/"}>
        <h2 className="font-bold text-xl">
          Post{" "}
          <span
            className={classNames(
              "text-primary uppercasetext-primary font-extrabold uppercase",
              roboto.className
            )}
          >
            It
          </span>
        </h2>
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
