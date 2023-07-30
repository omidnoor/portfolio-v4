import React, { memo, useEffect, useState } from "react";

import styles from "./content-embed.module.scss";
import { Html } from "@react-three/drei";
import { useStore } from "@/stores/store";
import { Deep_Blue } from "../utilComponents/variables/colors";
import { Suspense } from "react";
import { normals } from "./Utils/Normals";
import { pages } from "@/stores/data";
import Image from "next/image";
import ContactForm from "./ContactMeComponents/ContactForm";
import Home from "../pageComponents/home/Home";

const FrameContent = ({ props, frameRef }) => {
  const geoNormalArray = useStore((state) => state.geoNormalArray);
  const setGeoNormalArray = useStore((state) => state.setGeoNormalArray);
  const setHtmlClicked = useStore((state) => state.setHtmlClicked);
  const setPlateClicked = useStore((state) => state.setPlateClicked);
  const isSceneClicked = useStore((state) => state.isSceneClicked);
  const arrowCount = useStore((state) => state.arrowCount);
  const activeMenuButton = useStore((state) => state.activeMenuButton);
  const setLastClick = useStore((state) => state.setLastClick);
  const setFrameHovered = useStore((state) => state.setFrameHovered);
  const frameHovered = useStore((state) => state.frameHovered);

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
    setLastClick("html");
  };

  useEffect(() => {
    setHtmlClicked(false);
  }, [isSceneClicked, activeMenuButton, arrowCount]);

  const handleEnter = (e) => {
    e.stopPropagation();
    document.body.style.cursor = "pointer";
    setFrameHovered(true);
  };

  const handleLeave = (e) => {
    e.stopPropagation();
    document.body.style.cursor = "auto";
    setFrameHovered(false);
  };

  return (
    <>
      {/* {props.name !== "Home" && ( */}
      <Html
        as="div"
        position={[0, 0, 0.1]}
        zIndexRange={[0, 0]}
        wrapperClass={styles.wrapper}
        transform
        occlude={props.name === "Contact Me" ? false : true}
      >
        <div
          className={styles.main}
          name={props.name}
          onClick={(e) => e.stopPropagation(e)}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          {props.name === "About Me" && <iframe src={props.url} />}
          {props.name === "Contact Me" && <iframe src={props.url} />}
          {props.name === "Home" && <Home />}
          {props.contentUrl && (
            <div
              onClick={handleClick}
              // onMouseEnter={handleEnter}
              // onMouseLeave={handleLeave}
            >
              <Image
                src={props.contentUrl}
                width={700}
                height={900}
                alt="project content image"
              />
            </div>
          )}
          {/* {props.name === "Contact Me" && <ContactForm />} */}
        </div>
      </Html>
      {/* )} */}
    </>
  );
};
export default memo(FrameContent);
