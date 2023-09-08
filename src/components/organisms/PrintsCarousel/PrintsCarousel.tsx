import Body from "@atoms/Body/Body";
import Flex from "@atoms/Flex";
import Heading from "@atoms/Heading/Heading";
import SnapCarousel from "@organisms/SnapCarousel/SnapCarousel";
import { IPrint } from "@services/notion";
import { css, cva } from "@styled/css";
import Image from "next/image";
import Link from "next/link";

const printCollectionRecipes = cva({
  base: {
    opacity: 1,
  },
  variants: {
    isEmpty: {
      true: {
        opacity: 0,
      },
    },
  },
});

interface IPrintsCarouselProps {
  prints: IPrint[];
}

const PrintsCarousel = ({ prints }: IPrintsCarouselProps) => (
  <SnapCarousel>
    {prints.map((print) => {
      return (
        <div
          className={css({
            paddingBottom: "lg",
            _hover: {
              "&:hover h6": {
                color: "primary",
              },
            },
          })}
          key={print.slug}
        >
          <Link href={`/prints/${print.slug}`}>
            <Flex
              flexDirection="column"
              gap="sm"
              width="200px"
              justifyContent="flex-end"
            >
              <Image
                src={print.cover.src}
                width={print.cover.width}
                height={print.cover.height}
                alt={print.title}
                blurDataURL={print.cover.base64Placeholder}
                placeholder="blur"
              />
              <Flex flexDirection="column" gap="xsm">
                <div
                  className={printCollectionRecipes({
                    isEmpty: !Boolean(print.collectionName),
                  })}
                >
                  <Body color="light" fontStyle="italic">
                    {print.collectionName || "Sin colección"}
                  </Body>
                </div>
                <Heading level="blogH6" textDecoration="underline" paddingY="0">
                  {print.title}
                </Heading>
                <Body>Desde ${print.minPrice} MXN</Body>
              </Flex>
            </Flex>
          </Link>
        </div>
      );
    })}
  </SnapCarousel>
);

export default PrintsCarousel;
