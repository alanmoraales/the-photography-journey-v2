import { css } from "@styled/css";

const Divider = () => (
  <hr
    className={css({
      width: "100%",
      margin: "0",
      borderTop: "1px solid token(colors.divider)",
    })}
  />
);

export default Divider;
