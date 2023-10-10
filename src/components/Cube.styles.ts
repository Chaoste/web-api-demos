import { css } from "@emotion/css";

// Inspritations:
// - https://css-tricks.com/css-in-3d-learning-to-think-in-cubes-instead-of-boxes/
// - https://css-tricks.com/simplifying-css-cubes-custom-properties/
export const styles = {
  root: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  }),
  status: css({
    position: 'absolute',
    top: 64,
    left: 16,
    padding: 6,
    borderRadius: 8,
    maxWidth: '250px',
    border: '1px solid lightgray',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    cursor: 'pointer',
    '&:before': {
      backgroundColor: 'red',
      content: '""',
      display: "inline-block",
      height: 15,
      width: 15,
      borderRadius: "100%",
      marginBottom: -2,
      marginRight: 8,
    }
  }),
  statusOpen: css({
    whiteSpace: 'initial',
    '&:before': {
      display: "block",
      margin: "0 auto",
    }
  }),
  statusLoading: css({
    whiteSpace: 'initial',
    '&:before': {
      backgroundColor: 'yellow',
    }
  }),
  statusSuccess: css({
    whiteSpace: 'initial',
    '&:before': {
      backgroundColor: 'green',
    }
  }),
  cuboid: css({
    "--width": "100px",
    "--height": "100px",
    "--depth": "100px",
    width: "var(--width)",
    height: "var(--height)",
    position: "relative",
    transform: "rotateX(-14deg) rotateY(-22deg) rotateZ(0deg)",
    transition: 'transform 100ms ease-in-out',
    transformStyle: "preserve-3d",
    marginBottom: "100px",
    willChange: "transform",
  }),
  side: css({
    backgroundColor: "hsla(0, 0%, 100%, 0.2)",
    background: "linear-gradient(var(--gradient-angle), var(--gradient-stops))",
    // border: "1px solid hsla(0, 0%, 10%)",
    position: "absolute",
    "&:nth-of-type(1), &:nth-of-type(2)": {
      "--gradient-angle": `${Math.floor(Math.random() * 360)}deg`,
      "--gradient-stops": "#feffaa, #b2ff90",
      "--coefficient": -0.5,
      width: "var(--width)",
      height: "var(--height)",
      transform: "translate3d(0, 0, calc(var(--depth) * var(--coefficient)))",
    },
    "&:nth-of-type(2)": {
      "--gradient-angle": `${Math.floor(Math.random() * 360)}deg`,
      "--gradient-stops": "#fbc2eb, #a6c1ee",
      "--coefficient": 0.5,
    },
    "&:nth-of-type(3), &:nth-of-type(4)": {
      "--gradient-angle": `${Math.floor(Math.random() * 360)}deg`,
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
      "--gradient-angle": `${Math.floor(Math.random() * 360)}deg`,
      "--gradient-stops": "#a1c4fd, #c2e9fb",
      "--rotation": "-90deg",
    },
    "&:nth-of-type(5), &:nth-of-type(6)": {
      "--gradient-angle": `${Math.floor(Math.random() * 360)}deg`,
      "--gradient-stops": "#f6d365, #fda085",
      "--rotation": "-90deg",
      height: "var(--depth)",
      width: "var(--width)",
      left: "50%",
      top: "50%",
      transform:
        "translate(-50%, -50%) rotateX(var(--rotation)) translate3d(0, 0, calc(var(--width) * -0.5))",
    },
    "&:nth-of-type(6)": {
      "--gradient-angle": `${Math.floor(Math.random() * 360)}deg`,
      "--gradient-stops": "#ffecd2, #fcb69f",
      "--rotation": "90deg",
    },
  }),
};
