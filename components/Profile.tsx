"use client";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Session } from "next-auth";
import { getSorterName } from "@/utils/getSortname";
import Link from "next/link";
import classNames from "@/utils/customClassname";
import { signOut } from "next-auth/react";
import Image from "next/image";

const Profile: React.FC<{ session: Session | null }> = ({ session }) => {
  if (!session) {
    return null;
  }
  return (
    <li className="flex gap-8 item-center">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-full px-2 py-2 text-sm font-medium text-gray-700 rounded-md shadow-sm bg-gray-200 hover:ring-2 hover:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-600 dark:text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
              />
            </svg>
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href={"/dashboard"}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "px-4 py-2 text-sm flex gap-2 items-center",
                      "border border-spacing-4"
                    )}
                  >
                    <Image
                      src={session?.user?.image || ""}
                      width="40"
                      style={{
                        borderRadius: "50%",
                      }}
                      alt="Profile Image"
                      height="40"
                    />
                    {getSorterName(session?.user?.name || "")}
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => {
                  return (
                    <button
                      type="submit"
                      onClick={() => signOut()}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        " w-full text-left px-4 py-2 text-sm flex gap-2 items-center"
                      )}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                        />
                      </svg>
                      Sign out
                    </button>
                  );
                }}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </li>
  );
};

export default Profile;
