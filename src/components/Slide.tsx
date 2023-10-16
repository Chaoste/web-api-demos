import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { CopyPasteSlide } from "./slides/CopyPasteSlide";
import { OrientationSensorSlide } from "./slides/OrientationSensorSlide";
import { SpeechRecognitionSlide } from "./slides/SpeechRecognitionSlide";
import { SpeechSynthesisSlide } from "./slides/SpeechSynthesisSlide";
import { ShareSlide } from "./slides/ShareSlide";

export const MAX_SLIDES = 6;

export const Slide = () => {
  const params = useParams();
  const slideIndex = Number.parseInt(params?.slideIndex ?? "1");
  return (
    <div>
      {slideIndex === 1 && <CopyPasteSlide />}
      {slideIndex === 2 && <ShareSlide />}
      {slideIndex === 3 && <OrientationSensorSlide />}
      {slideIndex === 4 && <SpeechRecognitionSlide />}
      {slideIndex === 5 && <SpeechSynthesisSlide />}
      {slideIndex === 6 && <div>TODO</div>}
      {slideIndex < 1 && <Navigate to="/" />}
      {slideIndex > MAX_SLIDES && <Navigate to="/" />}
    </div>
  );
};
