import React, { useEffect, useState } from "react";
import { Cuboid } from "../core/Cuboid";
import { SlideHeader } from "../core/SlideHeader";
import orientationScreenshot from "../../compatibility/orientation.png";
import { STATUS_ACTIVE, STATUS_INACTIVE } from "../../constants";
import { Status } from "../core/Status";
import { Button, Flex } from "@contentful/f36-components";

type Rotations = [number, number, number];

// Safari-only -> requestPermission
const isPermissionRequired = () =>
  window.DeviceOrientationEvent &&
  "requestPermission" in window.DeviceOrientationEvent;

export const OrientationSensorSlide = () => {
  const [rotations, setRotations] = useState<Rotations>([-5, -10, 0]);
  const [status, setStatus] = useState<undefined | true | string>();
  const [isAttached, setAttached] = useState(false);

  const handleOrientation = (event: DeviceOrientationEvent) => {
    const rotateDegrees = event.alpha ?? -5; // alpha: rotation around z-axis
    const leftToRight = event.gamma ?? -10; // gamma: left to right
    const frontToBack = event.beta ?? 0; // beta: front back motion
    setRotations([-frontToBack, leftToRight, rotateDegrees]);
    setStatus(STATUS_ACTIVE);
  };

  const attachListener = async () => {
    try {
      // Should return "granted"
      await (window.DeviceOrientationEvent as any).requestPermission();
      window.addEventListener("deviceorientation", handleOrientation, true);
      setAttached(true);
    } catch (error) {
      setStatus(`Failed initialising sensor: ${error}`);
    }
  };

  useEffect(() => {
    try {
      if (!window.DeviceOrientationEvent) {
        setStatus(`DeviceOrientationEvent is not available`);
        return;
      }
      if (!isPermissionRequired()) {
        window.addEventListener("deviceorientation", handleOrientation, true);
      }
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
      {isPermissionRequired() && !isAttached ? (
        <Button onClick={attachListener} isDisabled={isAttached}>
          Grant Permission
        </Button>
      ) : (
        <p>Tilt your phone.</p>
      )}
    </Flex>
  );
};
