import Link from "next/link";
import Flex from "@atoms/Flex";
import Heading from "@atoms/Heading";
import { BookmarkBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { JsxStyleProps } from "@styled/types";
import { css } from "@styled/css";

export const ExternalArrow = (props: JsxStyleProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    color="currentColor"
    viewBox="0 0 12 12"
    className={css({
      ...props,
    })}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M12 .5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L.146 11.146a.501.501 0 0 0 .708.708L11 1.707V6.5a.5.5 0 0 0 1 0v-6Z"
      clipRule="evenodd"
    />
  </svg>
);

interface IBookmarkProps {
  block: BookmarkBlockObjectResponse;
}

const Bookmark = ({ block }: IBookmarkProps) => {
  const href = block.bookmark.url;
  // @ts-ignore - Typing is messed up
  const text = block.bookmark.caption[0]?.plain_text || href;

  return (
    <Flex width="fit-content" paddingBottom="md">
      <Link href={href} target="_blank">
        <Flex
          gap="sm"
          alignItems="center"
          color="black"
          _hover={{ color: "primary" }}
        >
          <ExternalArrow />
          <Heading level="h6" textDecoration="underline" color="inherit">
            {text}
          </Heading>
        </Flex>
      </Link>
    </Flex>
  );
};

export default Bookmark;
