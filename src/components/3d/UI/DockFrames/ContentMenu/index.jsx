import ImageContent from "./ImageContent";
import { useSpring } from "react-spring";
import NoteContent from "./NoteContent";

import styles from "./styles.module.scss";

const ContentMenu = () => {
  return (
    <div className={styles.container}>
      <ImageContent />
      <NoteContent />
    </div>
  );
};
export default ContentMenu;
