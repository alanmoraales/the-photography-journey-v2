import { ReactNode } from "react";
import { css, cva } from "@styled/css";
import { JsxStyleProps } from "@styled/types";

const headingLevels = {
  h1: "h1",
  h4: "h4",
  blogH4: "blogH4",
  h5: "h5",
  h6: "h6",
  blogH6: "blogH6",
};

interface IHeadingTagProps {
  children: ReactNode;
  className: string;
}

type THeadingLevelToTagMap = {
  [K in keyof typeof headingLevels]: ({
    children,
    className,
  }: IHeadingTagProps) => JSX.Element;
};

const headingTags: THeadingLevelToTagMap = {
  h1: (props: IHeadingTagProps) => <h1 {...props} />,
  h4: (props: IHeadingTagProps) => <h4 {...props} />,
  blogH4: (props: IHeadingTagProps) => <h4 {...props} />,
  h5: (props: IHeadingTagProps) => <h5 {...props} />,
  h6: (props: IHeadingTagProps) => <h6 {...props} />,
  blogH6: (props: IHeadingTagProps) => <h6 {...props} />,
};

const headingColors = {
  primary: "primary",
  normal: "normal",
  light: "light",
  inherit: "inherit",
  white: "white",
};

const headingRecipes = cva({
  base: {
    fontFamily: "heading",
    fontWeight: "medium",
  },
  variants: {
    level: {
      h1: {
        fontSize: "clamp(token(fontSizes.7xl), 3vw, token(fontSizes.8xl))",
      },
      h4: {
        fontSize: "clamp(token(fontSizes.xl), 2vw, token(fontSizes.3xl))",
      },
      blogH4: {
        fontSize: "clamp(token(fontSizes.2xl), 2vw, token(fontSizes.3xl))",
        paddingTop: "lg",
        paddingBottom: "md",
      },
      h5: {
        fontSize: "clamp(token(fontSizes.lg), 2vw, token(fontSizes.2xl))",
      },
      h6: {
        fontSize: "clamp(token(fontSizes.md), 1vw, token(fontSizes.lg))",
      },
      blogH6: {
        fontSize: "clamp(token(fontSizes.lg), 1vw, token(fontSizes.xl))",
        paddingY: "md",
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
      white: {
        color: "white",
      },
    },
  },
  defaultVariants: {
    level: "h5",
    color: "normal",
  },
});

interface IHeadingProps extends JsxStyleProps {
  children: ReactNode;
  level?: keyof typeof headingLevels;
  color?: keyof typeof headingColors;
}

const Heading = ({ children, level, color, ...cssProps }: IHeadingProps) => {
  const HeadingTag = headingTags[level || "h5"];
  const headingClassName = headingRecipes({
    level,
    color,
  });
  const cssClassName = css({
    ...cssProps,
  });
  return (
    <HeadingTag className={`${headingClassName} ${cssClassName}`}>
      {children}
    </HeadingTag>
  );
};

export default Heading;
