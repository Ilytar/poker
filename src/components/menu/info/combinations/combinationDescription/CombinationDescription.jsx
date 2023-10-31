import React from "react";
import styles from "./CombinationDescription.module.scss";

const CombinationDescription = ({ title, imagePath, description }) => {
    return (
        <div className={styles.container}>
            <div className={styles.imgContainer}>
                <img src={imagePath} alt="" />
            </div>
            <div className={styles.textContainer}>
                <span className={styles.combinationName}>{title}</span>
                <span>—</span>
                <span>{description}</span>
            </div>
        </div>
    );
};

export default CombinationDescription;
