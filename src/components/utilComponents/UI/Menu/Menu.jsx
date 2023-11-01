import DockMenu from "@/components/3d/UI/DockFrames/";
import { memo } from "react";
import styles from "./styles.module.scss";
import Notification from "./Notification";
import ChatContainer from "../Chat/ChatContainer";
import Instruction from "../Instruction/Instruction";

const Menu = () => {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <DockMenu />
        {/* <Notification /> */}
      </div>
      <div className={styles.chat}>
        <ChatContainer />
      </div>
    </div>
  );
};
export default memo(Menu);
