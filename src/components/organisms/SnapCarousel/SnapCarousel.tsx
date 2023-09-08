import Flex from "@atoms/Flex";
import { styled } from "@styled/jsx";
import { css } from "@styled/css";
import { Children, ReactNode } from "react";

const CarouselItem = styled("li", {
  base: {
    scrollSnapAlign: "start",
    whiteSpace: "normal",
  },
  variants: {
    padding: {
      initial: {
        paddingLeft: "0",
        paddingRight: "md",
      },
      normal: {
        paddingLeft: "0",
        paddingRight: "md",
      },
      last: {
        paddingLeft: "0",
        paddingRight: "0",
      },
    },
  },
});

const carouselItemsListStyle = css({
  display: "flex",
  width: "100%",
  height: "100%",
  margin: "0px",
  padding: "0px",
  listStyle: "none",
  whiteSpace: "nowrap",
  alignItems: "baseline",
});

interface ISnapCarouselProps {
  children: ReactNode;
}

const SnapCarousel = ({ children }: ISnapCarouselProps) => {
  return (
    <Flex
      height="100%"
      padding="0px"
      listStyle="none"
      overflow="scroll hidden"
      scrollSnapType="x mandatory"
      scrollBehavior="smooth"
      marginBottom="md"
    >
      <ul className={carouselItemsListStyle}>
        {Children.map(children, (child, index) => {
          const isInitial = index === 0;
          const isLast = index === Children.count(children) - 1;
          const padding = isInitial ? "initial" : isLast ? "last" : "normal";
          return <CarouselItem padding={padding}>{child}</CarouselItem>;
        })}
      </ul>
    </Flex>
  );
};

export default SnapCarousel;
