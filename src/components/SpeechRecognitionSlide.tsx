import React, { useEffect } from "react";
import { styles } from "./Cuboid.styles";
import { cx } from "@emotion/css";
import { Cuboid } from "./Cuboid";

const STATUS_ACTIVE = true;
const STATUS_INACTIVE = undefined;
const directions = ["left", "up", "right", "down", "barrel", "flip", "stop"];
const grammar = `#JSGF V1.0; grammar directions; public <direction> = ${directions.join(
  " | "
)};`;

const applyDirection = (
  rotations: [number, number, number],
  direction: string
): [number, number, number] => {
  if (direction.includes("left")) {
    return [rotations[0], rotations[1] - 90, rotations[2]];
  }
  if (direction.includes("right")) {
    return [rotations[0], rotations[1] + 90, rotations[2]];
  }
  if (direction.includes("up")) {
    return [rotations[0] + 90, rotations[1], rotations[2]];
  }
  if (direction.includes("down")) {
    return [rotations[0] - 90, rotations[1], rotations[2]];
  }
  if (direction.includes("flip")) {
    return [rotations[0], rotations[1], rotations[2] - 90];
  }
  if (direction.includes("barrel")) {
    return [rotations[0], rotations[1], rotations[2] + 360];
  }
  return rotations;
};

const createSpeechRecognition = () => {
  const recognition = new ((window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition)();
  const speechRecognitionList = new ((window as any).SpeechGrammarList ||
    (window as any).webkitSpeechGrammarList)();
  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;
  recognition.continuous = true;
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  return recognition;
};

export const SpeechRecognitionSlide = () => {
  const [rotations, setRotations] = React.useState<[number, number, number]>([
    0, 0, 0,
  ]);
  const [status, setStatus] = React.useState<undefined | true | string>(
    STATUS_INACTIVE
  );
  const [transcript, setTranscript] = React.useState<string>();
  const [confidence, setConfidence] = React.useState<number>(0);
  const [isStatusOpen, setStatusOpen] = React.useState(false);
  const recognition = React.useRef<any>();

  useEffect(() => {
    try {
      recognition.current = createSpeechRecognition();
      recognition.current.addEventListener("start", () => {
        setStatus(STATUS_ACTIVE);
      });
      recognition.current.addEventListener("end", () => {
        setStatus(STATUS_INACTIVE);
      });
      recognition.current.addEventListener("nomatch", (event: any) => {
        console.log("Did not understand!", event);
      });
      recognition.current.addEventListener("error", (event: any) => {
        console.log("Error occured!", event);
        setStatus(`Speech recognition failed: ${event.error}`);
        recognition.current.stop();
      });
      recognition.current.start();
    } catch (error) {
      setStatus(`Failed initialising speech recognition: ${error}`);
    }
  }, []);

  useEffect(() => {
    try {
      if (!recognition.current) return;
      // event: SpeechRecognitionEvent
      const handleResult = (event: any) => {
        const results = event.results;
        const currentResult = results[results.length - 1][0];
        const currentTranscript = currentResult.transcript.trim();
        console.log(`Result received: ${currentTranscript}`, results);
        setTranscript(currentTranscript);
        setConfidence(currentResult.confidence);
        if (currentTranscript.includes("stop")) {
          recognition.current?.stop();
        } else {
          setRotations(applyDirection(rotations, currentTranscript));
        }
      };
      recognition.current.addEventListener("result", handleResult);
      return () => {
        recognition.current.removeEventListener("result", handleResult);
      };
    } catch (error) {
      setStatus(`Failed initialising speech recognition: ${error}`);
    }
  }, [rotations]);

  return (
    <div className={styles.root}>
      <div
        className={cx(styles.status, {
          [styles.statusLoading]: status === undefined,
          [styles.statusSuccess]: status === true,
          [styles.statusBlinking]: status === true,
          [styles.statusOpen]: isStatusOpen,
        })}
        onClick={() => {
          if (status === STATUS_INACTIVE) {
            try {
              recognition.current?.start();
            } catch (error) {
              console.error(error);
              recognition.current?.stop();
            }
          } else if (status === STATUS_ACTIVE) {
            try {
              recognition.current?.stop();
            } catch (error) {
              console.error(error);
            }
          } else {
            setStatusOpen((isOpen) => !isOpen);
          }
        }}
      >
        <span>
          {status === STATUS_ACTIVE
            ? "Microphone recording (stop)"
            : status === STATUS_INACTIVE
            ? "Microphone not active (start)"
            : status}
        </span>
      </div>
      <Cuboid
        style={{
          transform: `rotateX(${rotations[0]}deg) rotateY(${rotations[1]}deg) rotateZ(${rotations[2]}deg)`,
          transitionDuration: "300ms",
        }}
      />
      <p>Talk to me.</p>
      {transcript ? (
        <p
          style={{
            color: "gray",
          }}
        >
          I understood: "{transcript}" ({Math.round(confidence * 100)} %)
        </p>
      ) : (
        <p>&nbsp;</p>
      )}
    </div>
  );
};
