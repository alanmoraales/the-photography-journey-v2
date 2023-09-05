import Body from "@atoms/Body/Body";
import Flex from "@atoms/Flex";
import Heading from "@atoms/Heading";
import GoBackLink, {
  GoBackLinkFallback,
} from "@molecules/PostHeader/GoBackLink";
import { Suspense } from "react";

interface IPrintHeaderProps {
  title: string;
  collectionName: string;
}

const PrintHeader = ({ title, collectionName }: IPrintHeaderProps) => (
  <Flex flexDirection="column" gap="md" paddingBottom="xl">
    <Flex flexDirection="column" gap="sm">
      <Heading level="h4">{title}</Heading>
      <Body color="primary" weight="light" fontStyle="italic">
        {collectionName}
      </Body>
    </Flex>
    <Suspense fallback={<GoBackLinkFallback />}>
      <GoBackLink />
    </Suspense>
  </Flex>
);

export default PrintHeader;