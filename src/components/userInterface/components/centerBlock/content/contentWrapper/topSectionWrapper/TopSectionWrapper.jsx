import React from "react";
import styles from "./TopSectionWrapper.module.scss";

const CenterBlockContentTopSection = ({ content }) => {
    return <div className={styles.topSection}>{content}</div>;
};

export default CenterBlockContentTopSection;
