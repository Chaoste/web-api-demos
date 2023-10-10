import React, { useEffect } from "react";
import { styles } from "./Cube.styles";
import { cx } from "@emotion/css";
import * as THREE from "three";

// Alternatives:
// - https://codepen.io/jonDiaz/pen/vMKogO
// - https://polypane.app/css-3d-transform-examples/
// - https://css-tricks.com/simplifying-css-cubes-custom-properties/
// - https://codepen.io/iGeriya/pen/ZLzobK
export const Cube = () => {
  const [rotations, setRotations] = React.useState<[number, number, number]>([
    -5, -10, 0,
  ]);
  const initialRotations = React.useRef<typeof rotations>();
  const [status, setStatus] = React.useState<undefined | true | string>();
  const [isStatusOpen, setStatusOpen] = React.useState(false);

  useEffect(() => {
    try {
      // @ts-ignore
      const sensor = new AbsoluteOrientationSensor({
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
    <div className={styles.root}>
      <div
        className={cx(styles.status, {
          [styles.statusLoading]: status === undefined,
          [styles.statusSuccess]: status === true,
          [styles.statusOpen]: isStatusOpen,
        })}
        onClick={() => setStatusOpen((isOpen) => !isOpen)}
      >
        <span>
          {status === true
            ? "Connected"
            : status === undefined
            ? "Connecting"
            : status}
        </span>
      </div>
      <div
        className={styles.cuboid}
        style={{
          transform: `rotateX(${rotations[0]}deg) rotateY(${rotations[1]}deg) rotateZ(${rotations[2]}deg)`,
        }}
      >
        <div className={styles.side}></div>
        <div className={styles.side}></div>
        <div className={styles.side}></div>
        <div className={styles.side}></div>
        <div className={styles.side}></div>
        <div className={styles.side}></div>
      </div>

      <p>Tilt your phone.</p>
    </div>
  );
};
