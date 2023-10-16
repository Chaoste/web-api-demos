import React, { useCallback } from "react";
import { Button, Notification, Stack } from "@contentful/f36-components";
import { EnvironmentIcon } from "@contentful/f36-icons";
import { SlideHeader } from "../core/SlideHeader";
import shareScreenshot from "../../compatibility/share.png";
import { PAGE_TITLE } from "../../constants";

const SHARE_DATA = {
  title: PAGE_TITLE,
  text: "Check out these five exemplary Web APIs that will make your life easier!",
  url: window.location.href.replace(/\/slides(.*)/, ""),
};

export const ShareSlide = () => {
  const share = useCallback(async () => {
    try {
      await navigator.share(SHARE_DATA);
      Notification.success("Shared successfully a link to this page");
    } catch (error) {
      Notification.error(`Failed to share content: ${error}`);
    }
  }, []);
  return (
    <Stack flexDirection="column">
      <SlideHeader
        title="Share API"
        link="https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API#browser_compatibility"
        imgSrc={shareScreenshot}
      />
      <Button startIcon={<EnvironmentIcon />} onClick={share}>
        Sharing is caring
      </Button>
    </Stack>
  );
};
