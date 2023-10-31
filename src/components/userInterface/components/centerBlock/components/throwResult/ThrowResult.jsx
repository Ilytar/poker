import React from "react";
import styles from "./ThrowResult.module.scss";

const ThrowResult = ({ combinationImagePath, combinationText, playerName }) => {
    return (
        <div className={styles.throwResultCard}>
            <div className={styles.playerName}>{playerName}</div>
            <img className={styles.image} src={combinationImagePath} alt="" />
            <div className={styles.text}> {combinationText}</div>
        </div>
    );
};

export default ThrowResult;
