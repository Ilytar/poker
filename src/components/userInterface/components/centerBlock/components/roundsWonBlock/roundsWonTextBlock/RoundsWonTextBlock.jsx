import React from "react";
import styles from "./RoundsWonTextBlock.module.scss";

const RoundsWonTextBlock = () => {
    return (
        <div className={styles.block}>
            <span className={styles.text}>Выиграно матчей</span>
        </div>
    );
};

export default RoundsWonTextBlock;
