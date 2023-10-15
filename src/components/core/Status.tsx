import React, { ReactNode, useState } from "react";
import { styles } from "./Status.styles";
import { cx } from "@emotion/css";
import { STATUS_ACTIVE, STATUS_INACTIVE } from "../../constants";

export const Status = ({
  status,
  isBlinking,
  children,
  onClickNonErrorStatus,
}: {
  status: typeof STATUS_INACTIVE | typeof STATUS_ACTIVE | string;
  isBlinking?: boolean;
  children: ReactNode;
  onClickNonErrorStatus?: () => void;
}) => {
  const [isStatusOpen, setStatusOpen] = useState(false);
  const isLoading = status === STATUS_INACTIVE;
  const isSuccess = status === STATUS_ACTIVE;

  return (
    <div
      className={cx(styles.status, {
        [styles.statusLoading]: isLoading,
        [styles.statusSuccess]: isSuccess,
        [styles.statusBlinking]: isBlinking,
        [styles.statusOpen]: isStatusOpen,
      })}
      onClick={() => {
        if (!isLoading && !isSuccess && onClickNonErrorStatus) {
          onClickNonErrorStatus();
        } else {
          setStatusOpen((isOpen) => !isOpen);
        }
      }}
    >
      <span>{children}</span>
    </div>
  );
};
