import notionService from "@/services/notion";
import Link from "next/link";

const Home = async () => {
  const posts = await notionService.getPosts();
  return (
    <main>
      <h4>Posts</h4>
      {posts.map((post) => (
        <Link href={`/posts/${post.slug}`} key={post.slug}>
          <h2>{post.title}</h2>
          <p>{post.summary}</p>
        </Link>
      ))}
    </main>
  );
};

export default Home;
