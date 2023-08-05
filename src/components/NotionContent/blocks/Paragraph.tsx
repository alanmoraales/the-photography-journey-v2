import { ParagraphBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

interface IParagraphProps {
  block: ParagraphBlockObjectResponse;
}

const Paragraph = ({ block }: IParagraphProps) => {
  return (
    <p>{block.paragraph.rich_text.map((text) => text.plain_text).join("")}</p>
  );
};

export default Paragraph;
