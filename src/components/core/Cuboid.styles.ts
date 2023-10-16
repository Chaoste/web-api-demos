import { css } from "@emotion/css";

// Inspiritations:
// - https://css-tricks.com/css-in-3d-learning-to-think-in-cubes-instead-of-boxes/
// - https://css-tricks.com/simplifying-css-cubes-custom-properties/
export const styles = {
  cuboid: css({
    "--width": "100px",
    "--height": "100px",
    "--depth": "100px",
    width: "var(--width)",
    height: "var(--height)",
    position: "relative",
    transform: "rotateX(-14deg) rotateY(-22deg) rotateZ(0deg)",
    transition: "transform 0ms ease-in-out",
    transformStyle: "preserve-3d",
    willChange: "transform",
    zIndex: -1,
  }),
  cuboidWrapper: css({
    position: "relative",
    marginBottom: "100px",
    zIndex: 0,
  }),
  side: css({
    backgroundColor: "hsla(0, 0%, 100%, 0.2)",
    background: "linear-gradient(var(--gradient-angle), var(--gradient-stops))",
    // border: "1px solid hsla(0, 0%, 10%)",
    position: "absolute",
    "&:nth-of-type(1), &:nth-of-type(2)": {
      "--gradient-angle": "224deg",
      "--gradient-stops": "#feffaa, #b2ff90",
      "--coefficient": -0.5,
      width: "var(--width)",
      height: "var(--height)",
      transform: "translate3d(0, 0, calc(var(--depth) * var(--coefficient)))",
    },
    "&:nth-of-type(2)": {
      "--gradient-angle": "138deg",
      "--gradient-stops": "#f6d365, #fda085",
      "--coefficient": 0.5,
    },
    "&:nth-of-type(3), &:nth-of-type(4)": {
      "--gradient-angle": "114deg",
      "--gradient-stops": "#84fab0, #8fd3f4",
      "--rotation": "90deg",
      height: "var(--height)",
      width: "var(--depth)",
      left: "50%",
      top: "50%",
      transform:
        "translate(-50%, -50%) rotateY(var(--rotation)) translate3d(0, 0, calc(var(--width) * -0.5))",
    },
    "&:nth-of-type(4)": {
      "--gradient-angle": "58deg",
      "--gradient-stops": "#a1c4fd, #c2e9fb",
      "--rotation": "-90deg",
    },
    "&:nth-of-type(5), &:nth-of-type(6)": {
      "--gradient-angle": "208deg",
      "--gradient-stops": "#fbc2eb, #a6c1ee",
      "--rotation": "-90deg",
      height: "var(--depth)",
      width: "var(--width)",
      left: "50%",
      top: "50%",
      transform:
        "translate(-50%, -50%) rotateX(var(--rotation)) translate3d(0, 0, calc(var(--width) * -0.5))",
    },
    "&:nth-of-type(6)": {
      "--gradient-angle": "32deg",
      "--gradient-stops": "#ffecd2, #fcb69f",
      "--rotation": "90deg",
    },
  }),
};
