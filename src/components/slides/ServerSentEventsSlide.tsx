import React, { useEffect, useState } from "react";
import { SlideHeader } from "../core/SlideHeader";
import sseScreenshot from "../../compatibility/server-sent-events.png";
import { STATUS_ACTIVE, STATUS_INACTIVE } from "../../constants";
import { Status } from "../core/Status";
import { Flex } from "@contentful/f36-components";

export const ServerSentEventsSlide = () => {
  const [status, setStatus] = useState<undefined | true | string>();
  const [data, setData] = useState<string>();

  useEffect(() => {
    try {
      const evtSource = new EventSource("/web/event-stream.php");
      evtSource.addEventListener("message", (event) => {
        console.debug("received", event, event.data);
        try {
          setData(event.data);
          setStatus(STATUS_ACTIVE);
        } catch (error) {
          setStatus(`Handler failed: ${error}`);
        }
      });
      return () => evtSource.close();
    } catch (error) {
      setStatus(`Failed initialising SSE: ${error}`);
    }
  }, []);

  return (
    <Flex flexDirection="column" alignItems="center" justifyContent="center">
      <SlideHeader
        title="Server Sent Events"
        link="https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#browser_compatibility"
        imgSrc={sseScreenshot}
        imgDate="2023-10-16"
      />
      <Status status={status} isBlinking={status === STATUS_ACTIVE}>
        {status === true
          ? "Connected to server"
          : status === undefined
          ? "Connecting..."
          : status}
      </Status>
      <p>Server-generated random number: {data}</p>
    </Flex>
  );
};
