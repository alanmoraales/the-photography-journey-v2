import { ReactNode } from "react";
import { css } from "@styled/css";

interface IPageLimitContainerProps {
  children: ReactNode;
  isHalfWidth?: boolean;
  isBlogPost?: boolean;
}

const PageLimitContainer = ({
  children,
  isHalfWidth = false,
  isBlogPost = false,
}: IPageLimitContainerProps) => {
  const isHalfWidthStyle = isHalfWidth
    ? {
        display: { base: "block", lg: "grid" },
        gridTemplateColumns: { base: "unset", lg: "65% auto" },
      }
    : {};
  const maxWidth = isBlogPost ? "60ch" : "1024px";

  return (
    <div
      className={css({
        width: "90%",
        margin: "0 auto",
        maxWidth,
        ...isHalfWidthStyle,
      })}
    >
      {children}
    </div>
  );
};

export default PageLimitContainer;
