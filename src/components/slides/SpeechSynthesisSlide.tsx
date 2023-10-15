import React, { useCallback, useEffect, useState } from "react";
import { styles } from "./SpeechSynthesisSlide.styles";
import { Cuboid } from "../core/Cuboid";
import { Flex, IconButton } from "@contentful/f36-components";
import speechSynthesisScreenshot from "../../compatibility/speech-synthesis.png";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from "@contentful/f36-icons";
import { applyDirection } from "../utils";
import { SlideHeader } from "../core/SlideHeader";
import { STATUS_ACTIVE, STATUS_INACTIVE } from "../../constants";
import { Status } from "../core/Status";

export const SpeechSynthesisSlide = () => {
  const [rotations, setRotations] = useState<[number, number, number]>([
    -5, -10, 0,
  ]);
  const [status, setStatus] = useState<undefined | true | string>();

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
    <Flex flexDirection="column" alignItems="center" justifyContent="center">
      <SlideHeader
        title="Speech Synthesis"
        link="https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis#browser_compatibility"
        imgSrc={speechSynthesisScreenshot}
        marginBottom="spacing2Xl"
        howToSrc="https://dev.to/jankapunkt/cross-browser-speech-synthesis-the-hard-way-and-the-easy-way-353"
      />
      <Status status={status} isBlinking={status === STATUS_ACTIVE}>
        {status === STATUS_INACTIVE
          ? "Ready"
          : status === STATUS_ACTIVE
          ? "Speaking"
          : status}
      </Status>
      <Cuboid
        rotations={rotations}
        style={{ transitionDuration: "300ms" }}
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
    </Flex>
  );
};
