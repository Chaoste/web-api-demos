import React, { useState } from "react";
import { styles } from "./SlideHeader.styles";
import {
  Heading,
  HeadingProps,
  Modal,
  TextLink,
  Text,
} from "@contentful/f36-components";
import { ExternalLinkIcon, InfoCircleIcon } from "@contentful/f36-icons";

export const SlideHeader = ({
  title,
  link,
  imgSrc,
  imgDate,
  howToSrc,
  marginBottom = "spacingL",
}: {
  title: string;
  link: string;
  imgSrc: string;
  imgDate: string;
  howToSrc?: string;
  marginBottom?: HeadingProps["marginBottom"];
}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  return (
    <Heading
      as="h2"
      marginBottom={marginBottom}
      marginTop="spacingXl"
      className={styles.root}
    >
      {title}
      <InfoCircleIcon
        variant="muted"
        className={styles.infoIcon}
        tabIndex={0}
        aria-label="Show compatibility data"
        onClick={() => setModalVisible(true)}
      />
      <Modal
        onClose={() => setModalVisible(false)}
        isShown={isModalVisible}
        size="fullscreen"
        className={styles.modal}
      >
        {() => (
          <>
            <Modal.Header
              title={`Compatibility Data for ${title}`}
              onClose={() => setModalVisible(false)}
            />
            <Modal.Content className={styles.modalContent}>
              <img
                src={imgSrc}
                alt={`Compatibility for ${title}`}
                className={styles.img}
              />
              <Text className={styles.link} fontColor="gray500">
                Screenshot taken at {imgDate}
              </Text>
              <TextLink
                icon={<ExternalLinkIcon />}
                alignIcon="end"
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                See data in MDN
              </TextLink>
              {howToSrc && (
                <TextLink
                  icon={<ExternalLinkIcon />}
                  alignIcon="end"
                  href={howToSrc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  Guide for advanced usage
                </TextLink>
              )}
            </Modal.Content>
          </>
        )}
      </Modal>
    </Heading>
  );
};
