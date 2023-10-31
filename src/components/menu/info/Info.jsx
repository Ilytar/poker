import React from "react";
import styles from "./Info.module.scss";
import CheckBox from "../../userInterface/base/checkBox/CheckBox";
import Combinations from "./combinations/Combinations";
import "./styles.scss";
import GameRules from "./gameRules/GameRules";
import OpponentsDescription from "./opponentsDescription/OpponentsDescription";

const Info = () => {
    const checkHandler = () => {
        localStorage.setItem("startModal", "0");
    };
    const noCheckHandler = () => {
        localStorage.setItem("startModal", "1");
    };
    const isChecked = localStorage.getItem("startModal") === "0";

    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <GameRules />
                <Combinations />
                <OpponentsDescription />
            </div>

            <div>
                <CheckBox
                    text={"не показывать это окно при запуске игры."}
                    checked={isChecked}
                    checkHandler={checkHandler}
                    noCheckHandler={noCheckHandler}
                />
            </div>
        </div>
    );
};

export default Info;
