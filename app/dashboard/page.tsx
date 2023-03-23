import MyPosts from "@/components/posts/MyPosts";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    <section>
      <h1 className="text-2xl font-bold my-2 text-center">Welcome Back</h1>
      <h3 className="text-center text-primary font-bold">
        {session.user?.name}
      </h3>
      <MyPosts />
    </section>
  );
};

export default Dashboard;
