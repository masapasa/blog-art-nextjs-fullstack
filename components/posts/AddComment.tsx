"use client";

import classNames from "@/utils/customClassname";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const AddComment = ({ id }: { id: string }) => {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (data: { comment: string; postId: string }) => {
      return await axios.post("/api/posts/addComments", { data });
    },
    onSettled(data, error, variables, context) {
      console.log(data);
      setLoading(false);
      setComment("");
      if (error) {
        toast.error("Something went wrong! Please try again later.");
      } else {
        toast.success("Comments added successfully.");
        queryClient.invalidateQueries(["FETCH_SINGLE_RECORD"]);
      }
    },
  });
  const handelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    mutate({ comment, postId: id });
  };
  return (
    <div>
      <>
        <form onSubmit={handelSubmit}>
          <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
            <div className="px-4 py-2 bg-gray-200 rounded-t-lg dark:bg-gray-800">
              <label htmlFor="Comments" className="sr-only">
                Your Comments 😀⌨️...
              </label>
              <textarea
                id="Comments"
                rows={4}
                onChange={(e) => setComment(e.target.value)}
                value={comment}
                className="w-full px-0 text-sm text-gray-900 focus:outline-none
              bg-gray-200 border-0 placeholder:text-gray-900 dark:bg-gray-800  dark:text-white dark:placeholder-gray-400"
                placeholder="Write a Comments..."
                required
              ></textarea>
            </div>
            <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-violet-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-violet-800 disabled:bg-violet-200 disabled:cursor-not-allowed"
              >
                {"Post comments 🚀"}
              </button>
              <div className="flex pl-0 space-x-1 sm:pl-2">
                <p
                  className={classNames(
                    "font-bold text-sm text-orange-100",
                    comment.length > 250 && comment.length < 500
                      ? "text-orange-300"
                      : "",
                    comment.length >= 500 ? "!text-red-500" : ""
                  )}
                >
                  {comment.length}/500
                </p>
              </div>
            </div>
          </div>
        </form>
      </>
    </div>
  );
};

export default AddComment;
