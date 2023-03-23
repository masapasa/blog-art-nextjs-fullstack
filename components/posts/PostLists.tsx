"use client";

import { PostList } from "@/types/post-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import Button from "../Button";
import Modal from "../Modal";
import PageLoader from "../PageLoader";

interface RCProps extends PostList {
  isAuthenticated: boolean;
}
const PostLists: React.FC<RCProps> = ({
  user,
  title,
  id,
  isAuthenticated,
  _count: { Comment },
}) => {
  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (id: string) => {
      return await axios.delete("/api/posts/deletePost", { data: id });
    },
    onError: (err: any) => {
      setLoader(false);
      toast.success("Failed to remove it!");
      setOpen(!open);
    },
    onSuccess: (data: any) => {
      console.log(data, "ting");
      setLoader(false);
      queryClient.invalidateQueries(["FETCH_POSTS_AUTH"]);
      toast.success("Post deleted successfully!");
    },
  });
  const handelClose = () => {
    setOpen(!open);
  };

  const handleAlertOpen = () => {
    setOpen(!open);
  };

  const handelConfirm = () => {
    setLoader(true);
    setOpen(!open);
    mutate(id || "");
  };
  return (
    <>
      {loader && <PageLoader />}
      <Modal isOpen={open} onClose={handelClose} onConfirm={handelConfirm} />
      <li className="p-6 my-8 rounded-lg bg-white dark:bg-gray-800 border-0 shadow-md ">
        <div className="flex item-center space-x-4">
          <div className="flex-shrink-0">
            <Image
              className="w-8 h-8 rounded-full"
              width={32}
              height={32}
              src={user.image}
              alt="Neil image"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
              {user.name}
            </p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
              {user.email}
            </p>
          </div>
          <div className="inline-flex text-base font-semibold text-gray-900 dark:text-white">
            $320
          </div>
        </div>
        <div className="flex my-6 justify-between">
          {title}
          <Link href={`/posts/${id}`}>
            <span className="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
              {Comment} Comments
            </span>
          </Link>
        </div>
        <div className="flex gap-4 cursor-pointer justify-end">
          {isAuthenticated && (
            <Button
              onClick={() => handleAlertOpen()}
              className="hover:ring-0 text-red-500 text-sm"
            >
              Delete
            </Button>
          )}
        </div>
      </li>
    </>
  );
};

export default PostLists;
