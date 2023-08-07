import { Suspense } from "react";
import Body from "@atoms/Body/Body";
import Flex from "@atoms/Flex";
import Heading from "@atoms/Heading";
import GoBackLink, { GoBackLinkFallback } from "./GoBackLink";

interface IPostHeaderProps {
  title: string;
  publishedAt: string;
}

const PostHeader = ({ title, publishedAt }: IPostHeaderProps) => (
  <Flex flexDirection="column" gap="lg" paddingTop="md" paddingBottom="xl">
    <Flex flexDirection="column" gap="sm">
      <Heading level="h1">{title}</Heading>
      <Flex gap="sm">
        <Body color="primary">Post</Body>
        <Body color="light">&bull;</Body>
        <Body color="light" weight="light">
          {publishedAt}
        </Body>
      </Flex>
    </Flex>
    <Flex justifyContent="space-between" gap="lg">
      <Suspense fallback={<GoBackLinkFallback />}>
        <GoBackLink />
      </Suspense>
    </Flex>
  </Flex>
);

export default PostHeader;
