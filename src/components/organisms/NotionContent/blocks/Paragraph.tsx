import { Fragment } from "react";
import Body from "@atoms/Body";
import When from "@atoms/When";
import { ExternalArrow } from "./Bookmark";
import { cva } from "@styled/css";
import { ParagraphBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

interface IParagraphProps {
  block: ParagraphBlockObjectResponse;
}

const richTextRecipes = cva({
  base: {},
  variants: {
    italic: {
      true: {
        fontStyle: "italic",
      },
    },
    bold: {
      true: {
        fontWeight: "bold",
      },
    },
    link: {
      true: {
        color: "black",
        textDecoration: "underline",
        _hover: {
          color: "primary.light",
        },
      },
    },
  },
});

const Paragraph = ({ block }: IParagraphProps) => {
  const text = block.paragraph.rich_text
    .map((text) => text.plain_text)
    .join("");
  return (
    <When condition={Boolean(text)}>
      <Body size="blog" paddingBottom="md">
        {block.paragraph.rich_text.map((text) => {
          const isItalic = text.annotations.italic;
          const isBold = text.annotations.bold;
          const isLink = Boolean(text.href);
          const plainText = text.plain_text;
          const isNormalText = !isItalic && !isBold && !isLink;
          const isRichText = (isItalic || isBold) && !isLink;

          return (
            <Fragment key={plainText}>
              <When condition={isNormalText}>{plainText}</When>
              <When condition={isLink}>
                <span
                  className={richTextRecipes({
                    italic: isItalic,
                    bold: isBold,
                    link: isLink,
                  })}
                >
                  <ExternalArrow
                    display="inline-block"
                    width="10px"
                    height="10px"
                    marginLeft="xsm"
                  />
                  <a href={text.href || ""} target="_blank">
                    {plainText}
                  </a>
                </span>
              </When>
              <When condition={isRichText}>
                <span
                  className={richTextRecipes({
                    italic: isItalic,
                    bold: isBold,
                    link: isLink,
                  })}
                >
                  {plainText}
                </span>
              </When>
            </Fragment>
          );
        })}
      </Body>
    </When>
  );
};

export default Paragraph;
