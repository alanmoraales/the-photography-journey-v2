import { ReactNode } from "react";
import { css, cva } from "@styled/css";
import { JsxStyleProps } from "@styled/types";

const bodyRecipes = cva({
  base: {
    fontFamily: "body",
    fontWeight: "normal",
  },
  variants: {
    size: {
      normal: {
        fontSize: "clamp(token(fontSizes.md), 1vw, token(fontSizes.lg))",
      },
      blog: {
        fontSize: "clamp(token(fontSizes.lg), 1vw, token(fontSizes.2xl))",
      },
      sm: {
        fontSize: "sm",
      },
    },
    color: {
      primary: {
        color: "primary",
      },
      normal: {
        color: "black",
      },
      light: {
        color: "black.light",
      },
      inherit: {
        color: "inherit",
      },
      error: {
        color: "red",
      },
      white: {
        color: "white",
      },
    },
    weight: {
      normal: {
        fontWeight: "normal",
      },
      light: {
        fontWeight: "light",
      },
    },
  },
  defaultVariants: {
    size: "normal",
    color: "normal",
    weight: "normal",
  },
});

const bodyColors = {
  primary: "primary",
  normal: "normal",
  light: "light",
  inherit: "inherit",
  error: "error",
  white: "white",
};

const bodyWeights = {
  normal: "normal",
  light: "light",
};

const bodySizes = {
  normal: "normal",
  blog: "blog",
  sm: "sm",
};

interface IBodyProps extends JsxStyleProps {
  children: ReactNode;
  color?: keyof typeof bodyColors;
  weight?: keyof typeof bodyWeights;
  size?: keyof typeof bodySizes;
}

const Body = ({ children, color, weight, size, ...cssProps }: IBodyProps) => {
  const bodyClassName = bodyRecipes({ color, weight, size });
  const cssClassName = css({
    ...cssProps,
  });
  return <p className={`${bodyClassName} ${cssClassName}`}>{children}</p>;
};

export default Body;
