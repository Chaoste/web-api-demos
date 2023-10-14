import { css } from "@emotion/css";
import tokens from '@contentful/f36-tokens';

export const styles = {
  root: css({
    display: "flex",
    alignItems: "center",
  }),
  infoIcon: css({
    marginLeft: tokens.spacingM,
    cursor: 'pointer',
  }),
  img: css({
    display: "block",
    width: "100%",
    maxWidth: 800,
    margin: "0 auto",
    marginBottom: tokens.spacingM,
    "@media (max-width: 600px)": {
      marginLeft: "-16px",
      marginRight: "-16px",
      width: "calc(100% + 32px)",
    }
  }),
  modalContent: css({
    textAlign: "right",
    flexDirection: "column",
  })
}