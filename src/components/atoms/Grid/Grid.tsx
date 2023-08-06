import { ReactNode } from "react";
import { css } from "@styled/css";
import { JsxStyleProps } from "@styled/types";

interface IGridProps extends Omit<JsxStyleProps, "display"> {
  children: ReactNode;
}

const Grid = ({ children, ...gripCssProps }: IGridProps) => (
  <div
    className={css({
      ...gripCssProps,
      display: "grid",
    })}
  >
    {children}
  </div>
);

export default Grid;
