import { ReactNode } from "react";
import { css } from "@styled/css";

interface IPageLimitContainerProps {
  children: ReactNode;
}

const PageLimitContainer = ({ children }: IPageLimitContainerProps) => (
  <div
    className={css({
      paddingY: "xl",
      width: "90%",
      margin: "0 auto",
      maxWidth: "1024px",
    })}
  >
    {children}
  </div>
);

export default PageLimitContainer;
