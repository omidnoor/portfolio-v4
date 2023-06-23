import ImageFrame from "./ImageFrame";
import { useEffect, useRef, useState } from "react";
import { Quaternion, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import { damp3, dampQ } from "maath/easing";
import { useStore } from "@/stores/store";
import { useCallback } from "react";
import { memo } from "react";
import { PerspectiveCamera, RenderTexture, Text } from "@react-three/drei";

const GOLDENRATIO = 1.6;

const ImageFrames = ({
  pages,
  portal,
  targetPosition = new Vector3(),
  targetQuaternion = new Quaternion(),
}) => {
  const textRef = useRef();
  useFrame(
    (state) =>
      textRef.current &&
      (textRef.current.position.x = Math.sin(state.clock.elapsedTime) * 2),
  );
  const [frameEventName, _] = useState(null);
  const [pagesName, setPagesName] = useState([]);
  const [title, setTitle] = useState("");
  const [camera, setCamera] = useState(null);

  const framesRef = useRef({});

  const activeFrame = useStore((state) => state.activeFrame);
  const setActiveFrame = useStore((state) => state.setActiveFrame);
  const isLetsTalk = useStore((state) => state.isLetsTalk);
  const setIsLetsTalk = useStore((state) => state.setIsLetsTalk);

  useEffect(() => {
    pages.map((page) => {
      pagesName.push(page.name);
    });
  }, []);

  const handleClick = useCallback(
    (e) => {
      // e.stopPropagation();
      if (e.object && framesRef.current) {
        const frameName = e.object.name;
        setActiveFrame({ name: frameName });
        // setIsLetsTalk(false);
      }
    },
    [framesRef, activeFrame.name, title, isLetsTalk],
  );
  useEffect(() => {
    if (activeFrame.name && framesRef.current) {
      const frame = framesRef.current.getObjectByName(activeFrame.name);
      frame.updateWorldMatrix(true, true);
      frame.localToWorld(targetPosition.set(0, GOLDENRATIO * 0, 22));
      frame.getWorldQuaternion(targetQuaternion);
    } else {
      targetPosition.set(0, 0, 5.5);
      targetQuaternion.identity();
    }
  });

  useFrame((state, delta) => {
    damp3(state.camera.position, targetPosition, 0.4, delta);
    dampQ(state.camera.quaternion, targetQuaternion, 0.4, delta);
    setCamera(state.camera);
  });

  useEffect(() => {
    window.addEventListener("resize", () => {
      const aspect = window.innerWidth / window.innerHeight;
      // console.log(camera);
      if (camera) {
        camera.aspect = aspect;
        camera.updateProjectionMatrix();
      }
    });
    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, [window.innerWidth, window.innerHeight]);

  useEffect(() => {
    setActiveFrame({ name: title });
  }, [title]);

  useEffect(() => {
    if (isLetsTalk) {
      setActiveFrame({ name: "ContactMe" });
    }
    setIsLetsTalk(false);
  }, [isLetsTalk]);

  return (
    <group ref={framesRef} onClick={handleClick}>
      {pages?.map((props, index) => (
        <ImageFrame
          key={props.name}
          portal={portal}
          setTitle={setTitle}
          {...props}
        />
      ))}
    </group>
  );
};
export default memo(ImageFrames);
