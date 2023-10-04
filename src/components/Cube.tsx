import React, { useEffect } from "react";
import { styles } from "./Cube.styles";

// Alternatives:
// - https://codepen.io/jonDiaz/pen/vMKogO
// - https://polypane.app/css-3d-transform-examples/
// - https://css-tricks.com/simplifying-css-cubes-custom-properties/
// - https://codepen.io/iGeriya/pen/ZLzobK
export const Cube = () => {
  const [rotationX, setRotationX] = React.useState(-13);
  const [rotationY, setRotationY] = React.useState(-26);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      console.log(event.key, rotationX, rotationY);
      switch (event.key) {
        case "ArrowUp":
          setRotationX((rotationX) => rotationX + 5);
          break;
        case "ArrowDown":
          setRotationX((rotationX) => rotationX - 5);
          break;
        case "ArrowLeft":
          setRotationY((rotationY) => rotationY + 5);
          break;
        case "ArrowRight":
          setRotationY((rotationY) => rotationY - 5);
          break;
        default:
          break;
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [rotationX, rotationY]);
  return (
    <div className={styles.root}>
      <div
        className={styles.cuboid}
        style={{
          transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`,
        }}
      >
        <div className={styles.side}></div>
        <div className={styles.side}></div>
        <div className={styles.side}></div>
        <div className={styles.side}></div>
        <div className={styles.side}></div>
        <div className={styles.side}></div>
      </div>

      <p>Tilt your phone.</p>
    </div>
  );
};
