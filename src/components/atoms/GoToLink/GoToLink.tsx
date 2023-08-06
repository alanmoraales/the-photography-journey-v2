import Flex from "@atoms/Flex/Flex";
import Heading from "@atoms/Heading/Heading";
import Link from "next/link";
import { ReactNode } from "react";
import GoToArrow from "./GoToArrow";

interface IGoToLinkProps {
  children: ReactNode;
  href: string;
}

const GoToLink = ({ children, href }: IGoToLinkProps) => (
  <Link href={href}>
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
  </Link>
);

export default GoToLink;
