import Navbar from "@organisms/Navbar";
import notionService from "@services/notion";
import RecentPostsSection from "@organisms/RecentPostsSection/RecentPostsSection";

const Home = async () => {
  const posts = await notionService.getPosts();
  return (
    <>
      <Navbar />
      <main>
        <RecentPostsSection posts={posts} />
      </main>
    </>
  );
};

export default Home;
