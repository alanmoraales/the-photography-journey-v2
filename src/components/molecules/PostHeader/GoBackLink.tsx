"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Heading from "@atoms/Heading";
import Flex from "@atoms/Flex";
import GoBackArrow from "./GoBackArrow";

const mapFromToProps = {
  home: {
    href: "/",
    text: "Volver al inicio",
  },
  print: {
    href: "/prints",
    text: "Volver a la tienda",
  },
  default: {
    href: "/",
    text: "Explorar más contenido",
  },
};

interface IGoBackLinkProps {
  href: string;
  text: string;
}

const GoBackLink = ({ href, text }: IGoBackLinkProps) => (
  <Link href={href}>
    <Flex
      gap="sm"
      alignItems="center"
      color="black"
      _hover={{ color: "primary" }}
    >
      <GoBackArrow />
      <Heading level="h6" textDecoration="underline" color="inherit">
        {text}
      </Heading>
    </Flex>
  </Link>
);

const GoBackLinkFallback = () => {
  const props = mapFromToProps.default;
  return <GoBackLink {...props} />;
};

const DynamicGoBackLink = () => {
  const searchParams = useSearchParams();
  const fromParam = searchParams.get("from");
  const printSlugParam = searchParams.get("printSlug");
  // @ts-ignore - I know that the map can return null, that's why I have a default value
  const { href, text } = mapFromToProps[fromParam] || mapFromToProps.default;
  const hrefProp = printSlugParam ? `${href}/${printSlugParam}` : href;

  return <GoBackLink text={text} href={hrefProp} />;
};

export { GoBackLinkFallback };
export default DynamicGoBackLink;
