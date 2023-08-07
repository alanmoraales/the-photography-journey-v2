import { css } from "@styled/css";
import { ReactNode } from "react";

interface IFadeInAnimationProps {
  children: ReactNode;
}

const FadeInAnimation = ({ children }: IFadeInAnimationProps) => (
  <div
    className={css({
      animation: "fadeIn",
    })}
  >
    {children}
  </div>
);

export default FadeInAnimation;
