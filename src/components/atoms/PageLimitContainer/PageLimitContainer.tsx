import { ReactNode } from "react";
import { css } from "@styled/css";
import { JsxStyleProps } from "@styled/types";

interface IPageLimitContainerProps
  extends Omit<
    JsxStyleProps,
    "width" | "margin" | "maxWidth" | "display" | "gridTemplateColumns"
  > {
  children: ReactNode;
  isHalfWidth?: boolean;
  isBlogPost?: boolean;
}

const PageLimitContainer = ({
  children,
  isHalfWidth = false,
  isBlogPost = false,
  ...cssProps
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
        ...cssProps,
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
