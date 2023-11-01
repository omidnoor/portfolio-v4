import React, { memo, useEffect, useRef, useState } from "react";

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
import Iframe from "react-iframe";
import Projects from "../pageComponents/Projects";
import { useRouter } from "next/router";
import { useWindowWidth } from "./Utils/useWindowWidth";
import AboutMe from "../pageComponents/aboutMe/AboutMe";
import PageAboutMe from "@/pages/PageAboutMe";

const FrameContent = ({ props, frameRef }) => {
  const router = useRouter();
  const [isIframeHovered, setIsIframeHovered] = useState(false);
  const {
    geoNormalArray,
    setGeoNormalArray,
    setHtmlClicked,
    setPlateClicked,
    isSceneClicked,
    arrowCount,
    activeMenuButton,
    setActiveMenuButton,
    setLastClick,
    setFrameHovered,
    frameHovered,
    setWidth,
    width,
  } = useStore((state) => state);

  const widthState = useWindowWidth();
  const iframeRef = useRef(null);

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

  useEffect(() => {
    if (activeMenuButton === "Contact Me") {
      router.push("/PageContactMe");
    }
  }, [activeMenuButton]);

  useEffect(() => {
    const handleReceiveMessage = (e) => {
      if (e.data.type === "updateState") {
        setActiveMenuButton(e.data.payload);
      }
    };
    window.addEventListener("message", handleReceiveMessage);
    return () => {
      window.removeEventListener("message", handleReceiveMessage);
    };
  }, [setActiveMenuButton]);

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
          {/* {props.name === "About Me" && <Iframe src={props.url} />} */}
          {props.name === "About Me" && <PageAboutMe />}
          {props.name === "Contact Me" && <Iframe src={props.url} />}
          {/* {props.name === "Home" && <Home />} */}
          {props.name === "Home" && (
            <div
              // style={{ zIndex: 100 }}
              onMouseOver={() => setIsIframeHovered(true)}
              onMouseLeave={() => setIsIframeHovered(false)}
            >
              <Iframe src={props.url} />
            </div>
          )}
          {props.contentUrl && props.plate && (
            // <div
            //   onClick={handleClick}
            //   onMouseEnter={handleEnter}
            //   onMouseLeave={handleLeave}
            //   className={styles.projects}
            // >
            <Projects plate={props.plate} image={props.contentUrl} />
            // <Image
            //   src={props.contentUrl}
            //   width={700}
            //   height={900}
            //   alt="project content image"
            // />
            // </div>
          )}
          {/* {props.name === "Contact Me" && <ContactForm />} */}
        </div>
      </Html>
      {/* )} */}
    </>
  );
};
export default memo(FrameContent);
