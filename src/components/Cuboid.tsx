import React from "react";
import { styles } from "./Cuboid.styles";

// Alternatives:
// - https://codepen.io/jonDiaz/pen/vMKogO
// - https://polypane.app/css-3d-transform-examples/
// - https://css-tricks.com/simplifying-css-cubes-custom-properties/
// - https://codepen.io/iGeriya/pen/ZLzobK
export const Cuboid = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
) => {
  return (
    <div className={styles.cuboid} {...props}>
      <div className={styles.side}></div>
      <div className={styles.side}></div>
      <div className={styles.side}></div>
      <div className={styles.side}></div>
      <div className={styles.side}></div>
      <div className={styles.side}></div>
    </div>
  );
};
