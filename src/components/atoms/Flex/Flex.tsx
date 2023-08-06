import { ReactNode } from "react";
import { css } from "@styled/css";
import { JsxStyleProps } from "@styled/types";

interface IFlexProps extends Omit<JsxStyleProps, "display"> {
  children: ReactNode;
}

const Flex = ({ children, ...flexCssProps }: IFlexProps) => (
  <div
    className={css({
      ...flexCssProps,
      display: "flex",
    })}
  >
    {children}
  </div>
);

export default Flex;
