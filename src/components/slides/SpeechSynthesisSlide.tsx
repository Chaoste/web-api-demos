import React, { useCallback, useEffect } from "react";
import { styles as cuboidStyles } from "./Cuboid.styles";
import { styles } from "./SpeechSynthesisSlide.styles";
import { cx } from "@emotion/css";
import { Cuboid } from "./Cuboid";
import { IconButton } from "@contentful/f36-components";
import speechSynthesisScreenshot from "../compatibility/speech-synthesis.png";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from "@contentful/f36-icons";
import { applyDirection } from "../utils";
import { SlideHeader } from "../base/SlideHeader";

const STATUS_ACTIVE = true;
const STATUS_INACTIVE = undefined;

export const SpeechSynthesisSlide = () => {
  const [rotations, setRotations] = React.useState<[number, number, number]>([
    0, 0, 0,
  ]);
  const [status, setStatus] = React.useState<undefined | true | string>();
  const [isStatusOpen, setStatusOpen] = React.useState(false);

  const speak = useCallback((text: string) => {
    try {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
      } else {
        setStatus(`Failed initialising speech synthesis`);
      }
    } catch (error) {
      setStatus(`Failed initialising speech synthesis: ${error}`);
    }
  }, []);

  const createClickHandler = useCallback(
    (command: string) => () => {
      speak(command);
      setStatus(STATUS_ACTIVE);
      setRotations(applyDirection(rotations, command));
    },
    [rotations, speak]
  );

  useEffect(() => {
    if (status === STATUS_ACTIVE) {
      const interval = setInterval(() => {
        if (
          status === STATUS_ACTIVE &&
          "speechSynthesis" in window &&
          !window.speechSynthesis.speaking
        ) {
          setStatus(STATUS_INACTIVE);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [status]);

  return (
    <div className={cuboidStyles.root}>
      <SlideHeader
        title="Speech Synthesis"
        link="https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis#browser_compatibility"
        imgSrc={speechSynthesisScreenshot}
        marginBottom="spacing2Xl"
      />
      <div
        className={cx(cuboidStyles.status, {
          [cuboidStyles.statusLoading]: status === STATUS_INACTIVE,
          [cuboidStyles.statusSuccess]: status === STATUS_ACTIVE,
          [cuboidStyles.statusBlinking]: status === STATUS_ACTIVE,
          [cuboidStyles.statusOpen]: isStatusOpen,
        })}
        onClick={() => setStatusOpen((isOpen) => !isOpen)}
      >
        <span>
          {status === STATUS_INACTIVE
            ? "Ready"
            : status === STATUS_ACTIVE
            ? "Speaking"
            : status}
        </span>
      </div>
      <Cuboid
        style={{
          transform: `rotateX(${rotations[0]}deg) rotateY(${rotations[1]}deg) rotateZ(${rotations[2]}deg)`,
          transitionDuration: "300ms",
        }}
        onClick={createClickHandler("Doing a barrel roll")}
      >
        <IconButton
          icon={<ChevronLeftIcon />}
          aria-label="Left"
          size="small"
          className={styles.leftButton}
          onClick={createClickHandler("Turning left")}
        />
        <IconButton
          icon={<ChevronRightIcon />}
          aria-label="Right"
          size="small"
          className={styles.rightButton}
          onClick={createClickHandler("Turning right")}
        />
        <IconButton
          icon={<ChevronUpIcon />}
          aria-label="Up"
          size="small"
          className={styles.upButton}
          onClick={createClickHandler("Turning up")}
        />
        <IconButton
          icon={<ChevronDownIcon />}
          aria-label="Down"
          size="small"
          className={styles.downButton}
          onClick={createClickHandler("Turning down")}
        />
      </Cuboid>
      <p>Click on an arrow or the cube directly.</p>
    </div>
  );
};
