import React, { useCallback } from "react";
import { styles } from "./CopyPasteSlide.styles";
import { Button, TextInput } from "@contentful/f36-components";
import { CopyIcon, PageIcon } from "@contentful/f36-icons";

export const CopyPasteSlide = () => {
  const [inputText, setInputText] = React.useState("");
  const copyTextToClipboard = useCallback(() => {
    // TODO:
  }, []);
  const pasteTextFromClipboard = useCallback(() => {
    // TODO:
  }, []);
  return (
    <div className={styles.root}>
      <TextInput
        value={inputText}
        onChange={(event) => setInputText(event.target.value)}
      ></TextInput>
      <Button startIcon={<CopyIcon />} onClick={copyTextToClipboard}>
        Copy
      </Button>
      <Button startIcon={<PageIcon />} onClick={pasteTextFromClipboard}>
        Paste
      </Button>
    </div>
  );
};
