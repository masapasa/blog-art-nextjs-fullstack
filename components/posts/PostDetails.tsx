"use client";

import { PostList } from "@/types/post-types";
import { useQuery } from "@tanstack/react-query";
import { url } from "inspector";
import React from "react";
import axios from "axios";
import PageLoader from "../PageLoader";
import Image from "next/image";
import AddComment from "./AddComment";

const fetchSinglePostDetails = async (slug: string) => {
  const response = await axios.get(`/api/post/${slug}`);
  return response.data;
};

const PostDetails = ({ slug }: { slug: string }) => {
  const { data, isLoading } = useQuery<PostList>({
    queryKey: ["FETCH_SINGLE_RECORD"],
    queryFn: () => fetchSinglePostDetails(slug),
  });

  return (
    <>
      {isLoading && <PageLoader />}
      {data?.user && (
        <div className="w-full p-6 shadow-lg bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
          <div className="flex item-center space-x-4 mb-7">
            <div className="flex-shrink-0">
              <Image
                className="w-8 h-8 rounded-full"
                width={32}
                height={32}
                src={data.user.image}
                alt="Neil image"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {data.title}
              </h5>
            </div>
          </div>

          {data.Comment &&
            data.Comment.map((ele) => (
              <>
                <div
                  className="p-6 my-8 rounded-lg bg-white dark:bg-slate-900 border-0 shadow-md "
                  key={ele.id}
                >
                  <div className="flex item-center space-x-4 my-3">
                    <div className="flex-shrink-0">
                      <Image
                        className="w-8 h-8 rounded-full"
                        width={32}
                        height={32}
                        src={ele.user.image}
                        alt="Neil image"
                      />
                    </div>
                    <div className="flex-1 min-w-0 m-auto">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {ele.content}
                      </p>
                    </div>
                    <div className="inline-flex text-base font-semibold text-gray-900 dark:text-white">
                      $320
                    </div>
                  </div>
                </div>
              </>
            ))}
          <p className="text-sm text-primary font-bold my-3">
            {data.Comment?.length} Comments.
          </p>
          <AddComment id={data.id || ""} />
        </div>
      )}
    </>
  );
};

export default PostDetails;
