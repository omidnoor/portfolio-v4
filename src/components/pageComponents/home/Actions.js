import { Button } from "@mui/material";
import styles from "./home.module.scss";
import ButtonUI from "@/components/utilComponents/UI/Button";

const Actions = () => {
  return (
    <div className={styles.actions}>
      <ButtonUI type="primary">let&apos;s talk</ButtonUI>
      {/* <Link href="/files/Omid_Noorshams_Web_Dev_Resume.pdf" target="_blank"> */}
      <ButtonUI type="secondary">Services</ButtonUI>
      {/* </Link> */}
    </div>
  );
};
export default Actions;
