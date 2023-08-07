import Navbar from "@organisms/Navbar";
import Flex from "@atoms/Flex";
import RecentPostsSection from "@organisms/RecentPostsSection/RecentPostsSection";
import notionService from "@services/notion";

const Home = async () => {
  const posts = await notionService.getPosts();
  return (
    <Flex flexDirection="column" gap="xl" paddingY="xl">
      <Navbar />
      <main>
        <RecentPostsSection posts={posts} />
      </main>
    </Flex>
  );
};

export default Home;
