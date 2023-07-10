import React, { memo, useEffect, useState } from "react";
import { useTransition, animated } from "react-spring";

import styles from "./content-embed.module.scss";
import { Html } from "@react-three/drei";
import { useStore } from "@/stores/store";
import { Deep_Blue } from "../utilComponents/variables/colors";
import { Suspense } from "react";
import { normals } from "./Utils/Normals";
import { pages } from "@/stores/data";
import Image from "next/image";
import ContactForm from "./ContactMeComponents/ContactForm";

const FrameContent = ({ props, frameRef }) => {
  const activeFrames = useStore((state) => state.activeFrames);
  const geoNormalArray = useStore((state) => state.geoNormalArray);
  const setGeoNormalArray = useStore((state) => state.setGeoNormalArray);
  const setHtmlClicked = useStore((state) => state.setHtmlClicked);
  const htmlClicked = useStore((state) => state.htmlClicked);
  const setPlateClicked = useStore((state) => state.setPlateClicked);
  const plateClicked = useStore((state) => state.plateClicked);
  const isSceneClicked = useStore((state) => state.isSceneClicked);
  const arrowCount = useStore((state) => state.arrowCount);
  const activeMenuButton = useStore((state) => state.activeMenuButton);
  const setDollyCount = useStore((state) => state.setDollyCount);
  const setLastClick = useStore((state) => state.setLastClick);

  useEffect(() => {
    if (frameRef.current) {
      const normal = normals(frameRef.current);
      const exists = geoNormalArray.some((item) => item.name === props.name);
      if (!exists) {
        setGeoNormalArray(props.name || pages.name, normal);
      }
    }
  }, []);

  const handleClick = (e) => {
    e.stopPropagation();
    setHtmlClicked(true);
    setPlateClicked(false);
    setDollyCount(1);
    setLastClick("html");
  };

  useEffect(() => {
    setHtmlClicked(false);
    setDollyCount(0);
  }, [isSceneClicked, activeMenuButton, arrowCount]);

  const handleEnter = (e) => {
    e.stopPropagation();
    document.body.style.cursor = "pointer";
  };

  const handleLeave = (e) => {
    e.stopPropagation();
    document.body.style.cursor = "auto";
  };

  return (
    <>
      {props.name !== "Home" && (
        <Html
          as="div"
          position={[0, 0, 1.05]}
          zIndexRange={[0, 0]}
          wrapperClass={styles.wrapper}
          transform
          occlude
        >
          <div className={styles.main} name={props.name}>
            {props.url && <iframe src={props.url} />}
            {props.contentUrl && (
              <div
                onClick={(e) => handleClick(e)}
                onMouseEnter={(e) => handleEnter(e)}
                onMouseLeave={(e) => handleLeave(e)}
              >
                <Image
                  src={props.contentUrl}
                  width={700}
                  height={900}
                  alt="project content image"
                />
              </div>
            )}
            {props.name === "Contact Me" && <ContactForm />}
          </div>
        </Html>
      )}
    </>
  );
};
export default FrameContent;
