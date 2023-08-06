import NextImage from "next/image";
import { ImageBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { getPlaiceholder } from "plaiceholder";
import { css } from "@styled/css";

interface IImageProps {
  block: ImageBlockObjectResponse;
}

const Image = async ({ block }: IImageProps) => {
  const imageSrc =
    block.image.type === "external"
      ? block.image.external.url
      : block.image.file.url;
  const imageAlt = block.image.caption[0]?.plain_text || "";
  const imageBuffer = await fetch(imageSrc).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
  );
  const {
    base64,
    metadata: { width, height },
  } = await getPlaiceholder(imageBuffer, { size: 10 });

  return (
    <div
      className={css({
        paddingTop: "md",
        paddingBottom: "lg",
      })}
    >
      <NextImage
        src={imageSrc}
        alt={imageAlt}
        width={width}
        height={height}
        blurDataURL={base64}
        placeholder="blur"
      />
    </div>
  );
};

export default Image;
