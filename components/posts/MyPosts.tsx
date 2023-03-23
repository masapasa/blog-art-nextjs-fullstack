"use client";

import { AuthUserPost, PostList } from "@/types/post-types";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Modal from "../Modal";
import SkeletonLoading from "../SkeletonLoading";
import PostLists from "./PostLists";

const fetchMyPosts = async () => {
  const res = await fetch("/api/posts/getUserUpdatedPost");
  const results = await res.json();
  return results;
};
const MyPosts = () => {
  const { data: session, status } = useSession();
  const { data, error, isLoading } = useQuery<AuthUserPost>({
    queryFn: fetchMyPosts,
    queryKey: ["FETCH_POSTS_AUTH"],
  });
  
  if (isLoading) return <SkeletonLoading />;
  
  return (
    <>
      
      <ul className="max-w-2xl divide-y divide-gray-200 dark:divide-gray-700 ">
        {!isLoading &&
          data &&
          data?.Post.length > 0 &&
          data.Post.map((post: PostList) => (
            <PostLists
              {...post}
              user={{
                name: data?.name,
                email: data?.email,
                image: data?.image,
                id: data?.id,
              }}
              key={post.id}
              isAuthenticated={status === "authenticated"}
            />
          ))}
      </ul>
    </>
  );
};

export default MyPosts;
