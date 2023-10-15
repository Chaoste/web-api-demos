import { css } from "@emotion/css";

export const styles = {
  leftButton: css({
    position: 'absolute',
    left: -8,
    top: "50%",
    transform: "translate(-100%,-50%)",
  }),
  rightButton: css({
    position: 'absolute',
    right: -8,
    top: "50%",
    transform: "translate(100%,-50%)",
  }),
  upButton: css({
    position: 'absolute',
    top: -8,
    left: "50%",
    transform: "translate(-50%,-100%)",
  }),
  downButton: css({
    position: 'absolute',
    bottom: -8,
    left: "50%",
    transform: "translate(-50%,100%)",
  })
}