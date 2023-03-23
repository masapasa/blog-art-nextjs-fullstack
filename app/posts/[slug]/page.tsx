import PostDetails from "@/components/posts/PostDetails";

const SinglePostProcess = async (url: {
  params: {
    slug: string;
  };
}) => {
  return (
    <div>
      <PostDetails slug={url.params.slug} />
    </div>
  );
};

export default SinglePostProcess;
