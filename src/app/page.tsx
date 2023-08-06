import Link from "next/link";
import Heading from "@atoms/Heading";
import PageLimitContainer from "@atoms/PageLimitContainer";
import Navbar from "@organisms/Navbar";
import notionService from "@services/notion";

const Home = async () => {
  const posts = await notionService.getPosts();
  return (
    <>
      <Navbar />
      <PageLimitContainer>
        <main>
          <Heading>Posts</Heading>
          {posts.map((post) => (
            <Link href={`/posts/${post.slug}`} key={post.slug}>
              <h2>{post.title}</h2>
              <p>{post.summary}</p>
            </Link>
          ))}
        </main>
      </PageLimitContainer>
    </>
  );
};

export default Home;
