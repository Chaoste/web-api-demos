import { css, keyframes } from "@emotion/css";

const blinking = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`

export const styles = {
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
    boxShadow: '2px 2px 5px gray',
    zIndex: 5,
    background: 'white',
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
  statusBlinking: css({
    '&:before': {
      animation: `${blinking} 1.5s ease-in-out infinite`,
      animationDirection: "alternate",
    }
  }),
}