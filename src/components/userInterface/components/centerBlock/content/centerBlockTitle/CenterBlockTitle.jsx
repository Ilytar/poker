import React from "react";
import styles from "./CenterBlockTitle.module.scss";

const CenterBlockTitle = ({ titleText }) => {
    return <div className={styles.title}>{titleText}</div>;
};

export default CenterBlockTitle;
