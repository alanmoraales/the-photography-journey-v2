import Image from "next/image";
import Grid from "@atoms/Grid";
import Body from "@atoms/Body";
import Heading from "@atoms/Heading";
import Link from "next/link";
import Flex from "@atoms/Flex";
import GoToLink from "@atoms/GoToLink/GoToLink";

interface IPostCardProps {
  title: string;
  summary: string;
  href: string;
  publishedAt: string;
  cover: {
    src: string;
    base64Placeholder: string;
    width: number;
    height: number;
  };
}

const PostCard = ({
  title,
  summary,
  href,
  publishedAt,
  cover,
}: IPostCardProps) => (
  <Grid
    gap="md"
    gridTemplateColumns={{ base: "auto", xsm: "35% auto" }}
    alignItems="end"
  >
    <Image
      src={cover.src}
      width={cover.width}
      height={cover.height}
      alt={title}
      blurDataURL={cover.base64Placeholder}
      placeholder="blur"
    />
    <Grid gap="sm" height="fit-content">
      <Heading level="h4">{title}</Heading>
      <Body>{summary}</Body>
      <Flex justifyContent="space-between" gap="lg">
        <Body weight="light" color="light">
          {publishedAt}
        </Body>
        <GoToLink href={href}>Seguir leyendo</GoToLink>
      </Flex>
    </Grid>
  </Grid>
);

export default PostCard;
