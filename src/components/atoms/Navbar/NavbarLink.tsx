import Link from "next/link";
import { ReactNode } from "react";
import Heading from "../Heading/Heading";

interface INavbarLinkProps {
  children: ReactNode;
  href: string;
}

const NavbarLink = ({ children, href }: INavbarLinkProps) => (
  <Link href={href}>
    <Heading
      level="h6"
      color="light"
      textDecoration="underline"
      _hover={{
        color: "primary",
      }}
    >
      {children}
    </Heading>
  </Link>
);

export default NavbarLink;
