import React from "react";
import styles from "./ButtonIncreaseBet.module.scss";
import { useDispatch } from "react-redux";
import { removeMoneyFromPlayer } from "../../../../../../store/playerReducer";
import { goToNextGameStage } from "../../../../../../store/gameStateReducer";
import Button from "../../../../base/button/Button";
import { removeMoneyFromOpponent } from "../../../../../../store/opponentReducer";
import { increaseBank } from "../../../../../../store/gameBankReducer";
import usePlayer from "../../../../../../hooks/usePlayer";

const ButtonIncreaseBet = ({
    betValue = 0,
    buttonActiveImagePath,
    buttonHoverImagePath,
    buttonDisabledImagePath,
}) => {
    const dispatch = useDispatch();
    const player = usePlayer();
    const clickHandler = () => {
        dispatch(removeMoneyFromPlayer(betValue));
        dispatch(removeMoneyFromOpponent(betValue));
        dispatch(increaseBank(betValue * 2));
        dispatch(goToNextGameStage());
    };
    return (
        <div className={styles.block}>
            <Button
                clickHandler={clickHandler}
                promptText={"Повысить ставку на " + betValue}
                buttonActiveImagePath={buttonActiveImagePath}
                buttonHoverImagePath={buttonHoverImagePath}
                buttonDisabledImagePath={buttonDisabledImagePath}
                disabled={player.money < betValue}
            />
            <span className={styles.betText}>{betValue}</span>
        </div>
    );
};

export default ButtonIncreaseBet;
