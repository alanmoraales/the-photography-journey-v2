import PageLimitContainer from "@atoms/PageLimitContainer";
import NotionContent from "@organisms/NotionContent";
import notionService from "@services/notion";
import PostHeader from "@molecules/PostHeader/PostHeader";
import FadeInAnimation from "@molecules/FadeInAnimation/FadeInAnimation";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import mixpanelService from "@services/mixpanel";

interface IPostPageParams {
  slug: string;
}

interface IPostPageProps {
  params: IPostPageParams;
}

const PostPage = async ({ params }: IPostPageProps) => {
  const post = await notionService.getPostBySlug(params.slug);
  const contentBlocks = await notionService.getPostContentBlocks(post.id);
  mixpanelService.trackEnterPage("Post", { title: post.title });

  return (
    <PageLimitContainer isBlogPost paddingY="xl">
      <FadeInAnimation>
        <PostHeader
          title={post.title}
          publishedAt={format(post.publishedAt, "PP", { locale: es })}
        />
        <main>
          <NotionContent blocks={contentBlocks} />
        </main>
      </FadeInAnimation>
    </PageLimitContainer>
  );
};

const generateStaticParams = async (): Promise<IPostPageParams[]> => {
  const posts = await notionService.getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
};

export { generateStaticParams };
export default PostPage;
