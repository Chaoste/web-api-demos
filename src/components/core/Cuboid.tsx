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
  > & { rotations: [number, number, number] }
) => {
  return (
    <div className={styles.cuboidWrapper}>
      <div
        className={styles.cuboid}
        {...props}
        style={{
          transform: `rotateX(${props.rotations[0]}deg) rotateY(${props.rotations[1]}deg) rotateZ(${props.rotations[2]}deg)`,
          ...props.style,
        }}
      >
        <div className={styles.side}></div>
        <div className={styles.side}></div>
        <div className={styles.side}></div>
        <div className={styles.side}></div>
        <div className={styles.side}></div>
        <div className={styles.side}></div>
      </div>
      {props.children}
    </div>
  );
};
