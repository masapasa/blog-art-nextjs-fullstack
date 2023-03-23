import CreatePost from "@/components/posts/createPost";
import { Post } from "@/components/posts/Post";

export default function Home() {
  return (
    <>
      <CreatePost />
      <Post />
    </>
  );
}
