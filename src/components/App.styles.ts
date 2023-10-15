import { css } from "@emotion/css";

export const styles = {
  topBar: css({
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    fontSize: "125%",
    color: "#999",
    background: "white",
  }),
  desktopOnly: css({
    display: "block",
    "@media (max-width: 540px)": {
      display: "none",
    },
  }),
  mobileOnly: css({
    display: "none",
    "@media (max-width: 540px)": {
      display: "block",
    },
  }),
  playground: css({
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  }),
  navigationBar: css({
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    padding: 16,
  }),
  hidden: css({
    visibility: "hidden",
    pointerEvents: "none",
  }),
};
