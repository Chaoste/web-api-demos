import React, { useCallback, useState } from "react";
import {
  Button,
  TextInput,
  Notification,
  Flex,
} from "@contentful/f36-components";
import { CopyIcon, PageIcon, DeleteIcon } from "@contentful/f36-icons";
import { SlideHeader } from "../core/SlideHeader";
import clipboardScreenshot from "../../compatibility/clipboard.png";

export const CopyPasteSlide = () => {
  const [inputText, setInputText] = useState("Hello World");

  const copyTextToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(inputText);
      Notification.success("Text copied to clipboard");
    } catch (error) {
      console.error("Failed to copy text: ", error);
      Notification.error("Failed to copy text");
    }
  }, [inputText]);

  const pasteTextFromClipboard = useCallback(async () => {
    try {
      const clipText = await navigator.clipboard.readText();
      setInputText(clipText);
      Notification.success("Text pasted from clipboard");
    } catch (error) {
      console.error("Failed to read text from clipboard: ", error);
      Notification.error("Failed to read text from clipboard");
    }
  }, []);

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      flexWrap="wrap"
      padding="spacingM"
      gap="spacingM"
    >
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
      <Button startIcon={<DeleteIcon />} onClick={() => setInputText("")}>
        Clear
      </Button>
      <Button startIcon={<PageIcon />} onClick={pasteTextFromClipboard}>
        Paste
      </Button>
    </Flex>
  );
};
