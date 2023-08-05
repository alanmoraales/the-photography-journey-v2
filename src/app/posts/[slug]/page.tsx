import NotionContent from "@/components/NotionContent/NotionContent";
import notionService from "@/services/notion";

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
    <div>
      <h1>{post.title}</h1>
      <NotionContent blocks={contentBlocks} />
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
