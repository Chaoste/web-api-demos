import { css } from "@emotion/css";

export const styles = {
  leftButton: css({
    position: 'absolute',
    left: -4,
    top: "50%",
    transform: "translate(-100%,-50%)",
  }),
  rightButton: css({
    position: 'absolute',
    right: -4,
    top: "50%",
    transform: "translate(100%,-50%)",
  }),
  upButton: css({
    position: 'absolute',
    top: -4,
    left: "50%",
    transform: "translate(-50%,-100%)",
  }),
  downButton: css({
    position: 'absolute',
    bottom: -4,
    left: "50%",
    transform: "translate(-50%,100%)",
  })
}