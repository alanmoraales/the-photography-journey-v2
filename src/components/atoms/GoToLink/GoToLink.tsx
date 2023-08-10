import Flex from "@atoms/Flex/Flex";
import Heading from "@atoms/Heading/Heading";
import Link from "next/link";
import { ReactNode } from "react";
import GoToArrow from "./GoToArrow";

interface IGoToLinkProps {
  children: ReactNode;
  href?: string;
  renderAsATag?: boolean;
}

const GoToLink = ({
  children,
  href = "",
  renderAsATag = true,
}: IGoToLinkProps) => {
  const baseGoToComponent = (
    <Flex
      gap="sm"
      alignItems="center"
      color="black"
      _hover={{ color: "primary" }}
    >
      <Heading level="h6" textDecoration="underline" color="inherit">
        {children}
      </Heading>
      <GoToArrow />
    </Flex>
  );

  return renderAsATag ? (
    <Link href={href}>{baseGoToComponent}</Link>
  ) : (
    <>{baseGoToComponent}</>
  );
};

export default GoToLink;
