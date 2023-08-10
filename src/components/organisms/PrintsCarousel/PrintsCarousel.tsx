import Body from "@atoms/Body/Body";
import Flex from "@atoms/Flex";
import Heading from "@atoms/Heading/Heading";
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

const carouselItemRecipes = cva({
  base: {
    scrollSnapAlign: "start",
    whiteSpace: "normal",
  },
  variants: {
    padding: {
      initial: {
        // paddingLeft: "max(5%, calc((100% - 1024px) / 2))",
        paddingLeft: "0",
        paddingRight: "lg",
      },
      normal: {
        paddingLeft: "0",
        paddingRight: "lg",
      },
      last: {
        paddingLeft: "0",
        // paddingRight: "max(5%, calc((100% - 1024px) / 2))",
        paddingRight: "0",
      },
    },
  },
});

interface IPrintsCarouselProps {
  prints: IPrint[];
}

const PrintsCarousel = ({ prints }: IPrintsCarouselProps) => (
  <div
    className={css({
      position: "relative",
      width: "100%",
    })}
  >
    <div
      className={css({
        position: "relative",
        width: "100%",
        maxWidth: "1024px",
        margin: "0 auto",
      })}
    >
      <Flex
        height="100%"
        padding="0px"
        listStyle="none"
        overflow="scroll hidden"
        scrollSnapType="x mandatory"
        scrollBehavior="smooth"
        marginBottom="md"
      >
        <ul
          className={css({
            display: "flex",
            width: "100%",
            height: "100%",
            margin: "0px",
            padding: "0px",
            listStyle: "none",
            whiteSpace: "nowrap",
            alignItems: "baseline",
          })}
        >
          {prints.map((print, index) => {
            const isInitial = index === 0;
            const isLast = index === prints.length - 1;
            const padding = isInitial ? "initial" : isLast ? "last" : "normal";
            return (
              <li key={print.id} className={carouselItemRecipes({ padding })}>
                <div
                  className={css({
                    paddingBottom: "lg",
                    _hover: {
                      "&:hover h6": {
                        color: "primary",
                      },
                    },
                  })}
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
                        <Heading
                          level="blogH6"
                          textDecoration="underline"
                          paddingY="0"
                        >
                          {print.title}
                        </Heading>
                        <Body>Desde ${print.minPrice} MXN</Body>
                      </Flex>
                    </Flex>
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </Flex>
    </div>
  </div>
);

export default PrintsCarousel;
