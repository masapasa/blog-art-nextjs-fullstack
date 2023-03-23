"use client";
import { PostList } from "@/types/post-types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import SkeletonLoading from "../SkeletonLoading";
import PostLists from "./PostLists";

const fetchPosts = async () => {
  const res = await fetch("/api/getPosts");
  const results = await res.json();
  return results;
};

export const Post = () => {
  const [loadingCount, setLoadingCount] = useState(0);
  const { data, error, isLoading } = useQuery<PostList[]>({
    queryFn: fetchPosts,
    queryKey: ["FETCH_POSTS"],
  });

  return (
    <div>
      {loadingCount < 1 && isLoading && <SkeletonLoading />}
      <ul className="max-w-2xl divide-y divide-gray-200 dark:divide-gray-700 ">
        {!isLoading &&
          data &&
          data.length > 0 &&
          data.map((post: PostList) => (
            <PostLists
              handelOpen={() => null}
              {...post}
              key={post.id}
              isAuthenticated={false}
            />
          ))}
      </ul>
    </div>
  );
};
