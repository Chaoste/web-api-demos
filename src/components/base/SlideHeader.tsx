import React, { useState } from "react";
import { styles } from "./SlideHeader.styles";
import { Heading, Modal, TextLink } from "@contentful/f36-components";
import { ExternalLinkIcon, InfoCircleIcon } from "@contentful/f36-icons";

export const SlideHeader = (props: {
  title: string;
  link: string;
  imgSrc: string;
}) => {
  const { title, link, imgSrc } = props;
  const [isModalVisible, setModalVisible] = useState(false);
  return (
    <Heading as="h2" marginBottom="spacingL" className={styles.root}>
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
              <TextLink
                icon={<ExternalLinkIcon />}
                alignIcon="end"
                href={link}
                target="_blank"
                rel="noopener noreferrer"
              >
                See data in MDN
              </TextLink>
            </Modal.Content>
          </>
        )}
      </Modal>
    </Heading>
  );
};
