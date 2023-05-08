"use client";
import classNames from "@/utils/customClassname";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
const uploadFile = async (file: File) => {
  const fileName = `${Date.now()}-${file.name}`;
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: fileName,
    Body: file,
    ContentType: file.type,
    ACL: 'public-read'
  };

  try {
    const result = await s3.upload(params).promise();
    return result.Location;
  } catch (error) {
    console.error('Failed to upload file:', error.message);
    console.error(error.stack);
    throw new Error('Failed to upload file');
  }
};
// const uploadFile = async (file: File) => {
//   const fileName = `${Date.now()}-${file.name}`;
//   const params = {
//     Bucket: process.env.AWS_S3_BUCKET_NAME,
//     Key: fileName,
//     Body: file,
//     ContentType: file.type,
//     ACL: 'public-read'
//   };

//   try {
//     const result = await s3.upload(params).promise();
//     return result.Location;
//   } catch (error) {
//     console.log(error);
//     throw new Error('Failed to upload file');
//   }
// };

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [pictures, setPictures] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  // * Creating a new Post
  const mutation = useMutation({
    mutationFn: async (data: { title: string; content: string; pictures: string[]; videos: string[] }) => {
      return await axios.post("/api/posts/addPost", data);
    },
    onSuccess: (res) => {
      // Invalidate and refetch
      console.log("Success is wrong", res);
      setTitle("");
      setContent("");
      setPictures([]);
      setVideos([]);
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
    mutation.mutate({ title, content, pictures, videos });
  };

  const handleUploadPicture = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    try {
      const url = await uploadFile(file);
      setPictures([...pictures, url]);
    } catch (error) {
      console.log(error);
      toast.error('Failed to upload picture');
    }
  };

  const handleUploadVideo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    try {
      const url = await uploadFile(file);
      setVideos([...videos, url]);
    } catch (error) {
      console.log(error);
      toast.error('Failed to upload video');
    }
  };

  return (
    <>
      <form onSubmit={handelSubmit}>
        <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
            <label htmlFor="Thoughts" className="sr-only">
              Your Thoughts...
            </label>
            <input
              id="Title"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className="w-full px-0 text-sm text-gray-900 focus:outline-none bg-white border-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
              placeholder="Title"
              required
            />
            <textarea
              id="Content"
              rows={4}
              onChange={(e) => setContent(e.target.value)}
              value={content}
              className="w-full px-0 text-sm text-gray-900 focus:outline-none bg-white border-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
              placeholder="Content"
              required
            ></textarea>
            <input
              id="Pictures"
              type="file"
              accept="image/*"
              onChange={handleUploadPicture}
            />
            <ul>
              {pictures.map((picture) => (
                <li key={picture}>
                  <img src={picture} alt="Picture" />
                </li>
              ))}
            </ul>
            <input
              id="Videos"
              type="file"
              accept="video/*"
              onChange={handleUploadVideo}
            />
            <ul>
              {videos.map((video) => (
                <li key={video}>
                  <video src={video} controls />
                </li>
              ))}
            </ul>
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
                  title.length > 250 && title.length < 500 ? "text-orange-300" : "",
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
// import classNames from "@/utils/customClassname";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";
// import { useState } from "react";
// import { toast } from "react-toastify";

// const CreatePost = () => {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [pictures, setPictures] = useState([]);
//   const [videos, setVideos] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const queryClient = useQueryClient();

//   // * Creating a new Post
//   const mutation = useMutation({
//     mutationFn: async (data: { title: string; content: string; pictures: string[]; videos: string[] }) => {
//       return await axios.post("/api/posts/addPost", data);
//     },
//     onSuccess: (res) => {
//       // Invalidate and refetch
//       console.log("Success is wrong", res);
//       setTitle("");
//       setContent("");
//       setPictures([]);
//       setVideos([]);
//       setLoading(false);
//       queryClient.invalidateQueries(["FETCH_POSTS"]);
//       toast.success("Post added successfully!");
//     },
//     onError: (err) => {
//       console.log("Something went wrong", err);
//       toast.error("Something went wrong!");
//     },
//   });

//   const handelSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     mutation.mutate({ title, content, pictures, videos });
//   };
//   return (
//     <>
//       <form onSubmit={handelSubmit}>
//         <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
//           <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
//             <label htmlFor="Thoughts" className="sr-only">
//               Your Thoughts...
//             </label>
//             <input
//               id="Title"
//               type="text"
//               onChange={(e) => setTitle(e.target.value)}
//               value={title}
//               className="w-full px-0 text-sm text-gray-900 focus:outline-none bg-white border-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
//               placeholder="Title"
//               required
//             />
//             <textarea
//               id="Content"
//               rows={4}
//               onChange={(e) => setContent(e.target.value)}
//               value={content}
//               className="w-full px-0 text-sm text-gray-900 focus:outline-none bg-white border-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
//               placeholder="Content"
//               required
//             ></textarea>
//             <input
//               id="Pictures"
//               type="text"
//               onChange={(e) => setPictures(e.target.value.split(","))}
//               value={pictures.join(",")}
//               className="w-full px-0 text-sm text-gray-900 focus:outline-none bg-white border-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
//               placeholder="Pictures (comma-separated URLs)"
//             />
//             <input
//               id="Videos"
//               type="text"
//               onChange={(e) => setVideos(e.target.value.split(","))}
//               value={videos.join(",")}
//               className="w-full px-0 text-sm text-gray-900 focus:outline-none bg-white border-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
//               placeholder="Videos (comma-separated URLs)"
//             />
//           </div>
//           <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
//             <button
//               type="submit"
//               disabled={loading}
//               className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-violet-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-violet-800 disabled:bg-violet-200 disabled:cursor-not-allowed"
//             >
//               {loading ? "Posting...." : "Send It"}
//             </button>
//             <div className="flex pl-0 space-x-1 sm:pl-2">
//               <p
//                 className={classNames(
//                   "font-bold text-sm text-orange-100",
//                   title.length > 250 && title.length < 500 ? "text-orange-300" : "",
//                   title.length >= 500 ? "!text-red-500" : ""
//                 )}
//               >
//                 {title.length}/500
//               </p>
//             </div>
//           </div>
//         </div>
//       </form>
//     </>
//   );
// };

// export default CreatePost;
