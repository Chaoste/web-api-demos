import React, { useCallback, useEffect, useRef, useState } from "react";
import { Cuboid } from "../core/Cuboid";
import { applyDirection } from "../utils";
import { SlideHeader } from "../core/SlideHeader";
import speechRecognitionScreenshot from "../../compatibility/speech-recognition.png";
import { STATUS_ACTIVE, STATUS_INACTIVE } from "../../constants";
import { Flex } from "@contentful/f36-components";
import { Status } from "../core/Status";

const directions = [
  "left",
  "up",
  "right",
  "down",
  "barrel",
  "flip",
  "flipendo",
  "stop",
];
const grammar = `#JSGF V1.0; grammar directions; public <direction> = ${directions.join(
  " | "
)};`;

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
  const [rotations, setRotations] = useState<[number, number, number]>([
    -5, -10, 0,
  ]);
  const [status, setStatus] = useState<undefined | true | string>(
    STATUS_INACTIVE
  );
  const [transcript, setTranscript] = useState<string>();
  const [confidence, setConfidence] = useState<number>(0);
  const recognition = useRef<any>();

  useEffect(() => {
    try {
      recognition.current = createSpeechRecognition();
      recognition.current.addEventListener("start", () => {
        setStatus(STATUS_ACTIVE);
      });
      recognition.current.addEventListener("end", () => {
        setStatus((status) => (status === true ? STATUS_INACTIVE : status));
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
    return () => {
      try {
        recognition.current?.stop();
      } catch (error) {
        console.error(error);
      }
    };
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

  const toggleRecognition = useCallback(() => {
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
    }
  }, [status]);

  return (
    <Flex flexDirection="column" alignItems="center" justifyContent="center">
      <SlideHeader
        title="Speech Recognition"
        link="https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API#api.speechrecognition"
        imgSrc={speechRecognitionScreenshot}
      />
      <Status
        status={status}
        isBlinking={status === STATUS_ACTIVE}
        onClickNonErrorStatus={toggleRecognition}
      >
        {status === STATUS_ACTIVE
          ? "Microphone recording (stop)"
          : status === STATUS_INACTIVE
          ? "Microphone not active (start)"
          : status}
      </Status>
      <Cuboid
        rotations={rotations}
        style={{ transitionDuration: "300ms", marginBottom: -52 }}
      />
      <p>Talk to me.</p>
      {transcript ? (
        <p style={{ color: "gray" }}>
          I understood: "{transcript}" ({Math.round(confidence * 100)} %)
        </p>
      ) : (
        <p>&nbsp;</p>
      )}
    </Flex>
  );
};
