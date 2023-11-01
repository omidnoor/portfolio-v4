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
    title: "Full Stack Web Application Dev",
    subtitle: "From Concept to Deployment",
    description: "Craft tailored web apps for seamless user experiences.",
  },
  {
    icon: "FaSearch",
    title: "Advanced Data Search Solutions",
    subtitle: "Effortless Data Retrieval",
    description: "Retrieve insights from databases, PDFs, and images rapidly.",
  },
  {
    icon: "FaCube",
    title: "Web Dev & 3D Web Experience",
    subtitle: "Digital Designs that Come to Life",
    description: "Blend web design with interactive 3D landscapes.",
  },
  {
    icon: "FaRobot",
    title: "Chatbot & AI Automation",
    subtitle: "Smart Interactions & Processes",
    description: "Launch smart chatbots and automate routine tasks.",
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
              key={index}
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
