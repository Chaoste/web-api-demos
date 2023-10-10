import React from "react";
import "./App.css";
import { Cube } from "./Cube";
import { IconButton } from "@contentful/f36-components";
import { ArrowBackwardIcon, ArrowForwardIcon } from "@contentful/f36-icons";
import { styles } from "./App.styles";
import { cx } from "@emotion/css";
import { CopyPasteSlide } from "./CopyPasteSlide";

const MAX_SLIDES = 6;

function App() {
  const [slideIndex, setSlideIndex] = React.useState(0);
  return (
    <div className="App">
      {slideIndex !== 0 && (
        <div className={styles.topBar}>
          <span className={styles.desktopOnly}>
            Web APIs - How cool is that?
          </span>
          <span className={styles.desktopOnly}>Thomas Kellermeier</span>
          <span className={styles.mobileOnly}>Web APIs</span>
          <span className={styles.mobileOnly}>Thomas K.</span>
        </div>
      )}
      <div className={styles.playground}>
        {slideIndex === 0 && (
          <>
            <h1>Web APIs - How cool is that?</h1>
          </>
        )}

        {slideIndex === 1 && <CopyPasteSlide />}
        {slideIndex === 2 && <Cube />}
      </div>
      <div className={styles.navigationBar}>
        <IconButton
          variant="transparent"
          aria-label="Previous slide"
          icon={<ArrowBackwardIcon />}
          onClick={() => setSlideIndex((slideIndex) => slideIndex - 1)}
          className={cx({ [styles.hidden]: slideIndex === 0 })}
        />
        <progress max={MAX_SLIDES} value={slideIndex}></progress>
        <IconButton
          variant="transparent"
          aria-label="Next slide"
          icon={<ArrowForwardIcon />}
          onClick={() => setSlideIndex((slideIndex) => slideIndex + 1)}
          className={cx({ [styles.hidden]: slideIndex === MAX_SLIDES })}
        />
      </div>
    </div>
  );
}

export default App;
