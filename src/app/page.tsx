import Navbar from "@organisms/Navbar";
import Flex from "@atoms/Flex";
import RecentPostsSection from "@organisms/RecentPostsSection/RecentPostsSection";
import notionService from "@services/notion";
// import RecentPrintsSection from "@organisms/RecentPrintsSection/RecentPrintsSection";
// import FeaturedPrintSection from "@organisms/FeaturedPrintSection/FeaturedPrintSection";
import mixpanelService from "@services/mixpanel";

const Home = async () => {
  const posts = await notionService.getPosts();
  // const prints = await notionService.getPrints();
  // const featuredPrint = await notionService.getFeaturedPrint();
  mixpanelService.trackEnterPage("Home");

  return (
    <Flex flexDirection="column" gap="xl" paddingY="xl">
      <Navbar />
      <main>
        <Flex flexDirection="column" gap="xl">
          {/**
           * Temporary disabled
           */}
          {/* <FeaturedPrintSection print={featuredPrint} /> */}
          {/* <RecentPrintsSection prints={prints} /> */}
          <RecentPostsSection posts={posts} />
        </Flex>
      </main>
    </Flex>
  );
};

export default Home;
