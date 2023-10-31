import React from "react";
import styles from "./InfoItem.module.scss";

const InfoItem = ({ title, children }) => {
    return (
        <div className={styles.wrapper}>
            <span className={styles.title}>{title}</span>
            <div className={styles.content}>{children}</div>
        </div>
    );
};

export default InfoItem;
