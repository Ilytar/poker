import React from "react";
import styles from "./CountOfRoundsWon.module.scss";

const ROUND_WIN_IMAGE_PATH = "./img/icons/pokerWinner.png";
const CountOfRoundsWon = ({ top, left, zIndex, right, icoHeight }) => {
    return (
        <div
            className={styles.block}
            style={{ top: top, left: left, right: right }}
        >
            <img
                src={ROUND_WIN_IMAGE_PATH}
                style={{ height: icoHeight }}
                alt=""
            />
        </div>
    );
};

export default CountOfRoundsWon;
