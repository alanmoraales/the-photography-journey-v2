import { token } from "@styled/tokens";
import { css } from "@styled/css";

const NavbarLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 29 29"
    fill="none"
    className={css({ width: "25px", height: "25px" })}
  >
    <circle cx="14.5" cy="14.5" r="12.5" fill={token.var("colors.white")} />
    <path
      stroke={token.var("colors.primary")}
      strokeMiterlimit="10"
      strokeWidth="1.094"
      d="M14.5 22.239a7.738 7.738 0 0 0 7.736-7.74A7.738 7.738 0 0 0 14.5 6.762 7.737 7.737 0 0 0 6.764 14.5a7.737 7.737 0 0 0 7.736 7.739Z"
    />
    <path
      stroke={token.var("colors.primary.light")}
      strokeMiterlimit="10"
      strokeWidth="2.188"
      d="M14.5 27C21.404 27 27 21.404 27 14.5S21.404 2 14.5 2 2 7.596 2 14.5 7.596 27 14.5 27Z"
    />
  </svg>
);

export default NavbarLogo;
