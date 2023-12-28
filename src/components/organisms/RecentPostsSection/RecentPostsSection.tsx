import PostCard from "@molecules/PostCard";
import PreviewSectionTemplate from "@templates/PreviewSectionTemplate";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import type { IPost } from "@services/notion";
import Flex from "@atoms/Flex";
import { Fragment } from "react";
import When from "@atoms/When/When";
import Divider from "@atoms/Divider/Divider";

interface IRecentPostsSectionProps {
  posts: IPost[];
}

const RecentPostsSection = ({ posts }: IRecentPostsSectionProps) => (
  <PreviewSectionTemplate
    title="Lecturas"
    // No index page yet
    // goToHref="/posts"
    isHalfWidth
  >
    <Flex flexDirection="column" gap="lg">
      {posts.map((post, index) => (
        <Fragment key={post.slug}>
          <PostCard
            {...post}
            href={`/posts/${post.slug}?from=home`}
            key={post.slug}
            publishedAt={format(post.publishedAt, "PP", { locale: es })}
          />
          <When condition={index + 1 !== posts.length}>
            <Divider />
          </When>
        </Fragment>
      ))}
    </Flex>
  </PreviewSectionTemplate>
);

export default RecentPostsSection;
