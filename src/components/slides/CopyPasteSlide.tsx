import React, { useCallback } from "react";
import { styles } from "./CopyPasteSlide.styles";
import { Button, TextInput, Notification } from "@contentful/f36-components";
import { CopyIcon, PageIcon, DeleteIcon } from "@contentful/f36-icons";
import { SlideHeader } from "../base/SlideHeader";
import clipboardScreenshot from "../compatibility/clipboard.png";

export const CopyPasteSlide = () => {
  const [inputText, setInputText] = React.useState("Hello World");
  const copyTextToClipboard = useCallback(() => {
    navigator.clipboard
      .writeText(inputText)
      .then(() => Notification.success("Text copied to clipboard"))
      .catch((error) => {
        console.error("Failed to copy text: ", error);
        Notification.error("Failed to copy text");
      });
  }, [inputText]);
  const pasteTextFromClipboard = useCallback(() => {
    navigator.clipboard
      .readText()
      .then((clipText) => {
        setInputText(clipText);
        Notification.success("Text pasted from clipboard");
      })
      .catch((error) => {
        console.error("Failed to read text from clipboard: ", error);
        Notification.error("Failed to read text from clipboard");
      });
  }, [setInputText]);
  return (
    <div className={styles.root}>
      <SlideHeader
        title="Clipboard API"
        link="https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API#browser_compatibility"
        imgSrc={clipboardScreenshot}
      />
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
      <Button startIcon={<DeleteIcon />} onClick={() => setInputText("")}>
        Clear
      </Button>
    </div>
  );
};
