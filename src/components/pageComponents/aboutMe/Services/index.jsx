import { useWindowWidth } from "@/components/3d/Utils/useWindowWidth";
import Item from "./Item";
import styles from "./services.module.scss";
import { useEffect, useRef, useState } from "react";
import { useStore } from "@/stores/store";
import { DragCard, DragContainer } from "../DragePages";
import { useSprings, animated } from "react-spring";
import useMeasure from "react-use-measure";

const servicesData = [
  {
    icon: "FaCode",
    title: "Custom Web App Development",
    subtitle: "Bespoke Solutions, Front to Back",
    description:
      "Developing unique web applications optimized for performance and user engagement.",
  },
  {
    icon: "FaSearch",
    title: "Data Search and Extraction",
    subtitle: "Unlocking Data Potential",
    description:
      "Efficient extraction of valuable insights from databases, documents, and digital media.",
  },
  {
    icon: "FaCube",
    title: "Interactive Web and 3D Design",
    subtitle: "Engaging Digital Environments",
    description:
      "Creating immersive web experiences with cutting-edge 3D visualization techniques.",
  },
  {
    icon: "FaRobot",
    title: "Generative AI Solutions",
    subtitle: "Innovative AI-Driven Content",
    description:
      "Utilize AI to generate dynamic content, enhance creativity, and streamline processes.",
  },
];

const Services = () => {
  const { arrowCount } = useStore();
  const width = useWindowWidth();
  const index = useRef(0);
  // const [ref, { width }] = useMeasure();
  const [activeIndex, setActiveIndex] = useState(0);
  const [props, api] = useSprings(
    servicesData.length,
    (i) => ({
      x: i * width,
      scale: width === 0 ? 0 : 1,
      display: "block",
    }),
    [width, arrowCount],
  );

  useEffect(() => {
    let count = arrowCount % servicesData.length;

    api.start((i) => {
      // if (i < count - 1 || i > count + 1) return { display: "none" };
      const x = (i - count) * (width * 3);
      const scale = i === count ? (0.8 * width) / 370 : 0.6;
      return { x, scale, display: "block" };
    });
  }, [arrowCount, width]);

  const windowWidth = useWindowWidth();

  return (
    <div className={styles.container}>
      {props.map(({ x, scale, display }, index) => (
        <>
          {windowWidth < 500 ? (
            <animated.div
              key={`${index}-${x}`}
              style={{
                x,
                scale,
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Item {...servicesData[index]} />
            </animated.div>
          ) : (
            <Item {...servicesData[index]} />
          )}
        </>
      ))}
    </div>
  );
};

export default Services;

{
  /* {width < 500 ? (
        <DragContainer>
          {servicesData.map((service, index) => (
            <DragCard key={index} cardIndex={index}>
              <Item {...service} index={index} />
            </DragCard>
          ))}
        </DragContainer>
      ) : (
        servicesData.map((service, index) => (
          <Item key={index} {...service} index={index} />
        ))
      )} */
}
