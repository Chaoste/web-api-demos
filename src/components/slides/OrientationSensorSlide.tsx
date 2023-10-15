import React, { useEffect } from "react";
import * as THREE from "three";
import { Cuboid } from "../core/Cuboid";
import { SlideHeader } from "../core/SlideHeader";
import orientationScreenshot from "../../compatibility/orientation.png";
import { STATUS_INACTIVE } from "../../constants";
import { Status } from "../core/Status";
import { Flex } from "@contentful/f36-components";

export const OrientationSensorSlide = () => {
  const [rotations, setRotations] = React.useState<[number, number, number]>([
    -5, -10, 0,
  ]);
  const initialRotations = React.useRef<typeof rotations>();
  const [status, setStatus] = React.useState<undefined | true | string>();

  useEffect(() => {
    try {
      const sensor = new (window as any).AbsoluteOrientationSensor({
        frequency: 20,
        referenceFrame: "device",
      });

      sensor.addEventListener("reading", (event: Event) => {
        console.debug(
          `Linear acceleration: ${sensor.x} | ${sensor.y} | ${sensor.z}`
        );
        const quaternion = new THREE.Quaternion();
        quaternion.fromArray(sensor.quaternion);
        quaternion.invert();
        const euler = new THREE.Euler();
        euler.setFromQuaternion(quaternion);
        const currentRotations = [
          (Math.round(euler.x * 10) * 60) / 10,
          (Math.round(euler.y * 10) * 60) / 10,
          (Math.round(euler.z * 10) * 60) / 10,
        ] as [number, number, number];
        if (!initialRotations.current) {
          initialRotations.current = currentRotations;
          setRotations([0, 0, 0]);
        } else {
          setRotations([
            currentRotations[0] - initialRotations.current[0],
            currentRotations[1] - initialRotations.current[1],
            currentRotations[2] - initialRotations.current[2],
          ]);
        }
      });
      sensor.addEventListener("activate", (event: Event) => {
        console.debug("activate", event);
        setStatus(true);
      });
      sensor.addEventListener("error", (event: any) => {
        console.debug("error", event);
        setStatus(`Failed getting sensor data: ${event?.error}`);
      });

      Promise.all([
        navigator.permissions.query({ name: "accelerometer" as any }),
        navigator.permissions.query({ name: "magnetometer" as any }),
        navigator.permissions.query({ name: "gyroscope" as any }),
      ]).then((results) => {
        if (results.every((result) => result.state === "granted")) {
          sensor.start();
        } else {
          setStatus("No permissions to use AbsoluteOrientationSensor.");
        }
      });
      return () => sensor.stop();
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
