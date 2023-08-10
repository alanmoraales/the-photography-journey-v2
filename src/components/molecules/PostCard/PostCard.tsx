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
  <Link href={href}>
    <Grid
      gap="md"
      gridTemplateColumns={{ base: "auto", xsm: "35% auto" }}
      alignItems="end"
      _hover={{
        "&:hover h6": {
          color: "primary",
        },
      }}
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
          <GoToLink renderAsATag={false}>Seguir leyendo</GoToLink>
        </Flex>
      </Grid>
    </Grid>
  </Link>
);

export default PostCard;
