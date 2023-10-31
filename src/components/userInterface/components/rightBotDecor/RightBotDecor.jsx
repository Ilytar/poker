import React from "react";
import styles from "./RightBotDecor.module.scss";

const IMAGE_PATH = "./img/decor_right_bot/decorRightBot.png";

const RightBotDecor = () => {
    return (
        <div className={styles.block}>
            <img src={IMAGE_PATH} alt="" />
        </div>
    );
};

export default RightBotDecor;
