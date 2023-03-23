"use client";

import classNames from "@/utils/customClassname";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  // * Creating a new Post
  const mutation = useMutation({
    mutationFn: async (title: string) => {
      return await axios.post("/api/posts/addPost", { title });
    },
    onSuccess: (res) => {
      // Invalidate and refetch
      console.log("Success is wrong", res);
      setTitle("");
      setLoading(false);
      queryClient.invalidateQueries(["FETCH_POSTS"]);
      toast.success("Post added successfully!");
    },
    onError: (err) => {
      console.log("Something went wrong", err);
      toast.error("Something went wrong!");
    },
  });

  const handelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    mutation.mutate(title);
  };
  return (
    <>
      <form onSubmit={handelSubmit}>
        <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
            <label htmlFor="Thoughts" className="sr-only">
              Your Thoughts...
            </label>
            <textarea
              id="Thoughts"
              rows={4}
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className="w-full px-0 text-sm text-gray-900 focus:outline-none
              bg-white border-0 dark:bg-gray-800  dark:text-white dark:placeholder-gray-400"
              placeholder="Write a Thoughts..."
              required
            ></textarea>
          </div>
          <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-violet-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-violet-800 disabled:bg-violet-200 disabled:cursor-not-allowed"
            >
              {loading ? "Posting...." : "Send It"}
            </button>
            <div className="flex pl-0 space-x-1 sm:pl-2">
              <p
                className={classNames(
                  "font-bold text-sm text-orange-100",
                  title.length > 250 && title.length < 500
                    ? "text-orange-300"
                    : "",
                  title.length >= 500 ? "!text-red-500" : ""
                )}
              >
                {title.length}/500
              </p>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreatePost;
