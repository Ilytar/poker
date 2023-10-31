import React from "react";
import styles from "./StartWindow.module.scss";
import classNames from "classnames";
import Carousel from "./carousel/Carousel";
import { opponents } from "../../../../store/opponents/opponents.js";
import useOpponent from "../../../../hooks/useOpponent";

const BACKGROUND_IMAGE_PATH = "./img/backgrounds/background.png";

const StartWindow = () => {
    const wrapBlockClasses = classNames(styles.startWindow);
    const opponent = useOpponent();
    opponents.setCurrentOpponentFirstInList(opponent.id);
    const opponentsList = opponents.getOpponentsInfoList();

    return (
        <div className={wrapBlockClasses}>
            <img
                className={styles.backgroundImage}
                src={BACKGROUND_IMAGE_PATH}
                alt=""
            />
            <div className={styles.contentWrapper}>
                <div className={styles.content}>
                    <Carousel opponentsList={opponentsList} />
                </div>
            </div>
        </div>
    );
};

export default StartWindow;
