import React, { useEffect } from "react";
import "./App.css";
import { Heading, IconButton } from "@contentful/f36-components";
import { ArrowBackwardIcon, ArrowForwardIcon } from "@contentful/f36-icons";
import { styles } from "./App.styles";
import { cx } from "@emotion/css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { MAX_SLIDES, Slide } from "./Slide";
import { GithubIcon } from "./GithubIcon";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const slideIndex = Number.parseInt(
    location.pathname.match(/\/slides\/(\d+)/)?.[1] ?? "0"
  );

  return (
    <div className="App">
      {slideIndex !== 0 && (
        <div className={styles.topBar}>
          <span className={styles.desktopOnly}>
            Web APIs - How cool is that?
          </span>
          <span className={styles.desktopOnly}>
            <GithubIcon />
            Thomas Kellermeier
          </span>
          <span className={styles.mobileOnly}>Web APIs</span>
          <span className={styles.mobileOnly}>
            <GithubIcon />
            Thomas K.
          </span>
        </div>
      )}
      <div className={styles.playground}>
        <Routes>
          <Route
            index
            element={<Heading as="h1">Web APIs - How cool is that?</Heading>}
          />
          <Route element={<Slide />} path="/slides/:slideIndex" />
        </Routes>
      </div>
      <div className={styles.navigationBar}>
        <IconButton
          variant="transparent"
          aria-label="Previous slide"
          icon={<ArrowBackwardIcon />}
          onClick={() =>
            navigate(slideIndex <= 1 ? "/" : `/slides/${slideIndex - 1}`)
          }
          className={cx({ [styles.hidden]: slideIndex === 0 })}
        />
        <progress max={MAX_SLIDES} value={slideIndex}></progress>
        <IconButton
          variant="transparent"
          aria-label="Next slide"
          icon={<ArrowForwardIcon />}
          onClick={() =>
            navigate(
              slideIndex > MAX_SLIDES - 1 ? "/" : `/slides/${slideIndex + 1}`
            )
          }
          className={cx({ [styles.hidden]: slideIndex === MAX_SLIDES })}
        />
      </div>
    </div>
  );
}

export default App;
