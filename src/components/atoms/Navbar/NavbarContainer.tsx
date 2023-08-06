import { ReactNode } from "react";
import { css } from "@styled/css";

interface INavbarContainerProps {
  children: ReactNode;
}

const NavbarContainer = ({ children }: INavbarContainerProps) => (
  <div
    className={css({
      paddingY: "xl",
    })}
  >
    {children}
  </div>
);

export default NavbarContainer;
