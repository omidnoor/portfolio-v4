import { Button } from "@mui/material";
import styles from "./home.module.scss";
import ButtonUI from "@/components/utilComponents/UI/Button";

const Actions = () => {
  return (
    <div className={styles.actions}>
      <ButtonUI type="primary">let&apos;s talk</ButtonUI>
      <ButtonUI type="secondary">Services</ButtonUI>
    </div>
  );
};
export default Actions;
