import React, { useCallback } from "react";
import { styles } from "./CopyPasteSlide.styles";
import {
  Button,
  TextInput,
  Notification,
  Heading,
} from "@contentful/f36-components";
import { CopyIcon, PageIcon, DeleteIcon } from "@contentful/f36-icons";

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
      <Heading as="h2" marginBottom="spacingL">
        Clipboard API
      </Heading>
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
