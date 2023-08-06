import { ReactNode } from "react";
import { css, cva } from "@styled/css";
import { JsxStyleProps } from "@styled/types";

const headingLevels = {
  h5: "h5",
  h6: "h6",
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
  h5: (props: IHeadingTagProps) => <h5 {...props} />,
  h6: (props: IHeadingTagProps) => <h6 {...props} />,
};

const headingColors = {
  primary: "primary",
  normal: "normal",
  gray: "gray",
};

const headingRecipes = cva({
  base: {
    fontFamily: "heading",
    fontWeight: "medium",
  },
  variants: {
    level: {
      h5: {
        fontSize: "clamp(token(fontSizes.lg), 2vw, token(fontSizes.2xl))",
      },
      h6: {
        fontSize: "md",
      },
    },
    color: {
      primary: {
        color: "primary",
      },
      normal: {
        color: "black",
      },
      gray: {
        color: "black.light",
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
