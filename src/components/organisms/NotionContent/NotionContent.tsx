import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import Paragraph from "./blocks/Paragraph";
import Image from "./blocks/Image";
import GetHeading from "./blocks/Heading";
import Bookmark from "./blocks/Bookmark";

/**
 * Target block types for fist version:
 * paragraph, image, heading_2, heading_3, bookmark, quote, bulleted_list_item
 *
 * To know more about block types and all available block types:
 * @see https://developers.notion.com/reference/block
 */
const supportedBlockTypes = {
  paragraph: Paragraph,
  image: Image,
  heading_1: GetHeading({ level: 1 }),
  heading_2: GetHeading({ level: 2 }),
  heading_3: GetHeading({ level: 3 }),
  bookmark: Bookmark,
};

interface INotionContentProps {
  blocks: BlockObjectResponse[];
}

const NotionContent = ({ blocks }: INotionContentProps) => {
  return (
    <div>
      {blocks.map((block) => {
        // @ts-ignore - I know that supportedBlockTypes[blockType] can be null
        const Component = supportedBlockTypes[block.type];
        if (!Component) return null;
        return <Component block={block} key={block.id} />;
      })}
    </div>
  );
};

export default NotionContent;
