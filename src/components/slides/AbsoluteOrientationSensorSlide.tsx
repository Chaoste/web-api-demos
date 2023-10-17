import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Cuboid } from "../core/Cuboid";
import { SlideHeader } from "../core/SlideHeader";
import orientationScreenshot from "../../compatibility/orientation.png";
import { STATUS_INACTIVE } from "../../constants";
import { Status } from "../core/Status";
import { Flex } from "@contentful/f36-components";

type Rotations = [number, number, number];

const checkSensorPermissions = async () => {
  const results = await Promise.all([
    navigator.permissions.query({ name: "accelerometer" as any }),
    navigator.permissions.query({ name: "magnetometer" as any }),
    navigator.permissions.query({ name: "gyroscope" as any }),
  ]);
  return results.every((result) => result.state === "granted");
};

const createSensor = () => {
  return new (window as any).AbsoluteOrientationSensor({
    frequency: 20,
    referenceFrame: "device",
  });
};

const quaternionToEuler = (quaternionList: number[]) => {
  const quaternion = new THREE.Quaternion();
  quaternion.fromArray(quaternionList);
  quaternion.invert();
  const euler = new THREE.Euler();
  euler.setFromQuaternion(quaternion);
  return [
    (Math.round(euler.x * 10) * 60) / 10,
    (Math.round(euler.y * 10) * 60) / 10,
    (Math.round(euler.z * 10) * 60) / 10,
  ] as Rotations;
};

const toRelative = (rotations: Rotations, initialRotations: Rotations) => {
  return [
    rotations[0] - initialRotations[0],
    rotations[1] - initialRotations[1],
    rotations[2] - initialRotations[2],
  ] as Rotations;
};

export const AbsoluteOrientationSensorSlide = () => {
  const [rotations, setRotations] = useState<Rotations>([-5, -10, 0]);
  const initialRotations = useRef<typeof rotations>();
  const [status, setStatus] = useState<undefined | true | string>();

  useEffect(() => {
    (async function () {
      try {
        const sensor = createSensor();
        sensor.addEventListener("reading", () => {
          const newRotations = quaternionToEuler(sensor.quaternion);
          if (!initialRotations.current) {
            initialRotations.current = newRotations;
            setRotations([0, 0, 0]);
          } else {
            setRotations(toRelative(newRotations, initialRotations.current));
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

        const isGranted = await checkSensorPermissions();
        if (isGranted) {
          sensor.start();
        } else {
          setStatus("No permissions to use AbsoluteOrientationSensor.");
        }
        return () => sensor.stop();
      } catch (error) {
        setStatus(`Failed initialising sensor: ${error}`);
      }
    })();
  }, []);

  return (
    <Flex flexDirection="column" alignItems="center" justifyContent="center">
      <SlideHeader
        title="Orientation Sensor"
        link="https://developer.mozilla.org/en-US/docs/Web/API/AbsoluteOrientationSensor#browser_compatibility"
        imgSrc={orientationScreenshot}
        imgDate="2023-10-16"
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
