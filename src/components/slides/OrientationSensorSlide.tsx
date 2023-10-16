import React, { useEffect, useState } from "react";
import { Cuboid } from "../core/Cuboid";
import { SlideHeader } from "../core/SlideHeader";
import orientationScreenshot from "../../compatibility/orientation.png";
import { STATUS_INACTIVE } from "../../constants";
import { Status } from "../core/Status";
import { Flex } from "@contentful/f36-components";

export const OrientationSensorSlide = () => {
  const [rotations, setRotations] = useState<[number, number, number]>([
    -5, -10, 0,
  ]);
  const [status, setStatus] = useState<undefined | true | string>();

  useEffect(() => {
    try {
      if (!window.DeviceOrientationEvent) {
        setStatus(`DeviceOrientationEvent is not available`);
        return;
      }
      window.addEventListener(
        "deviceorientation",
        (event) => {
          const rotateDegrees = event.alpha ?? -5; // alpha: rotation around z-axis
          const leftToRight = event.gamma ?? -10; // gamma: left to right
          const frontToBack = event.beta ?? 0; // beta: front back motion

          setRotations([-frontToBack, leftToRight, rotateDegrees]);
        },
        true
      );
    } catch (error) {
      setStatus(`Failed initialising sensor: ${error}`);
    }
  }, []);

  return (
    <Flex flexDirection="column" alignItems="center" justifyContent="center">
      <SlideHeader
        title="Orientation Sensor"
        link="https://developer.mozilla.org/en-US/docs/Web/API/AbsoluteOrientationSensor#browser_compatibility"
        imgSrc={orientationScreenshot}
      />
      <Status status={status} isBlinking={status === STATUS_INACTIVE}>
        {status === true
          ? "Sensor Connected"
          : status === undefined
          ? "Connecting..."
          : status}
      </Status>
      <Cuboid rotations={rotations} />
      <p>Tilt your phone.</p>
    </Flex>
  );
};
