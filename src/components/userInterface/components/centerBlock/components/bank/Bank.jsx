import React from "react";
import styles from "./Bank.module.scss";

const Bank = ({ bankValue }) => {
    return (
        <div className={styles.block}>
            <div className={styles.text}>Пул</div>
            <div className={styles.bankValue}>{bankValue}</div>
        </div>
    );
};

export default Bank;
