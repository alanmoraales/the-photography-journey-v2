import Flex from "@atoms/Flex";
import Heading from "@atoms/Heading/Heading";
import PageLimitContainer from "@atoms/PageLimitContainer/PageLimitContainer";
import NotionContent from "@organisms/NotionContent";
import notionService from "@services/notion";
import { css } from "@styled/css";

interface IPostPageParams {
  slug: string;
}

interface IPostPageProps {
  params: IPostPageParams;
}

const PostPage = async ({ params }: IPostPageProps) => {
  const post = await notionService.getPostBySlug(params.slug);
  const contentBlocks = await notionService.getPostContentBlocks(post.id);
  return (
    <div
      className={css({
        paddingY: "xl",
      })}
    >
      <PageLimitContainer isBlogPost>
        <Flex paddingBottom="lg">
          <Heading level="h1">{post.title}</Heading>
        </Flex>
        <NotionContent blocks={contentBlocks} />
      </PageLimitContainer>
    </div>
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
