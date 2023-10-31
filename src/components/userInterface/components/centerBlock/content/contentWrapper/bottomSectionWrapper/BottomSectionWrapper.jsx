import React from "react";
import styles from "./BottomSectionWrapper.module.scss";

const BottomSectionWrapper = ({ content }) => {
    return <div className={styles.bottomSection}>{content}</div>;
};

export default BottomSectionWrapper;
