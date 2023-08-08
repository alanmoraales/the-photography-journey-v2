import Heading from "@atoms/Heading/Heading";
import {
  Heading1BlockObjectResponse,
  Heading2BlockObjectResponse,
  Heading3BlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

interface IGetHeadingProps {
  level: 1 | 2 | 3;
}

interface IHeadingProps {
  block:
    | Heading1BlockObjectResponse
    | Heading2BlockObjectResponse
    | Heading3BlockObjectResponse;
}

const mapBlockLevelToHeadingLevel = {
  /**
   * @todo define new size for heading 1
   */
  1: "blogH4",
  2: "blogH4",
  3: "blogH6",
};

const GetHeading = ({ level }: IGetHeadingProps) => {
  const BlockHeading = ({ block }: IHeadingProps) => {
    // @ts-ignore - Typing is confusing, but code it's correct.
    const text = block[`heading_${level}`].rich_text
      // @ts-ignore - Typing is confusing, but code it's correct.
      .map((text) => text.plain_text)
      .join("");
    const headingLevel = mapBlockLevelToHeadingLevel[level];

    // @ts-ignore - Typing is confusing, but code it's correct.
    return <Heading level={headingLevel}>{text}</Heading>;
  };

  return BlockHeading;
};

export default GetHeading;
