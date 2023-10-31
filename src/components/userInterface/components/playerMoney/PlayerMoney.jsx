import React from "react";
import styles from "./PlayerMoney.module.scss";
import { useSelector } from "react-redux";
import { KEY_PLAYER_REDUCER } from "../../../../store/playerReducer";

const IMAGE_PATH = "./img/player_money_visual/playerMoneyVisual.png";

const PlayerMoney = () => {
    const playerMoney = useSelector(
        (state) => state[KEY_PLAYER_REDUCER][KEY_PLAYER_REDUCER].money
    );

    return (
        <div className={styles.block}>
            <img src={IMAGE_PATH} alt="" />
            <span className={styles.text}>{playerMoney}</span>
        </div>
    );
};

export default PlayerMoney;
