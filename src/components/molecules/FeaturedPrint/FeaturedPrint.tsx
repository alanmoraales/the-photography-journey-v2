import Body from "@atoms/Body/Body";
import Flex from "@atoms/Flex/Flex";
import GoToLink from "@atoms/GoToLink/GoToLink";
import Grid from "@atoms/Grid";
import Heading from "@atoms/Heading/Heading";
import { css } from "@styled/css";
import Image from "next/image";
import Link from "next/link";

interface IFeaturedPrintProps {
  title: string;
  collectionName: string;
  minPrice: number;
  buyUrl: string;
  cover: {
    src: string;
    width: number;
    height: number;
    base64Placeholder: string;
  };
}

const FeaturedPrint = ({
  title,
  collectionName,
  minPrice,
  buyUrl,
  cover,
}: IFeaturedPrintProps) => (
  <Flex width="fit-content">
    <Link href={buyUrl}>
      <div
        className={css({
          width: "fit-content",
          _hover: {
            "&:hover h6": {
              color: "primary",
            },
            "&:hover svg": {
              color: "primary",
            },
          },
        })}
      >
        <Grid
          gridTemplateColumns={{ base: "auto", xsm: "auto auto" }}
          gap="lg"
          width={{ base: "100%", xsm: "fit-content" }}
        >
          <div
            style={{
              maxHeight: "45vh",
              width: "auto",
              aspectRatio: `${cover.width} / ${cover.height}`,
            }}
          >
            <Image
              src={cover.src}
              width={cover.width}
              height={cover.height}
              alt={title}
              placeholder="blur"
              blurDataURL={cover.base64Placeholder}
              style={{
                objectFit: "contain",
              }}
            />
          </div>
          <Flex
            flexDirection={{ base: "row", xsm: "column" }}
            justifyContent={{ base: "space-between", xsm: "flex-end" }}
            gap="lg"
          >
            <Flex flexDirection="column" gap="xsm">
              <Heading level="h5">{title}</Heading>
              <Body color="light" fontStyle="italic">
                {collectionName}
              </Body>
            </Flex>
            <Flex flexDirection="column" gap="xsm">
              <Body color="light" fontStyle="italic" weight="light">
                Comprar
              </Body>
              <GoToLink renderAsATag={false}>Desde ${minPrice} MXN</GoToLink>
            </Flex>
          </Flex>
        </Grid>
      </div>
    </Link>
  </Flex>
);

export default FeaturedPrint;
