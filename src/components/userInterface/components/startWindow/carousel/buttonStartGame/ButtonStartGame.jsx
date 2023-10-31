import React from "react";
import Button from "../../../../base/button/Button";
import { useDispatch } from "react-redux";
import { goToNextGameStage } from "../../../../../../store/gameStateReducer";
import {
    setMoneyOfOpponent,
    setOpponentId,
    setOpponentName,
} from "../../../../../../store/opponentReducer";

const BUTTON_ACTIVE_IMAGE_PATH = "./img/btn_start_game/btnStartGame_active.png";
const BUTTON_HOVER_IMAGE_PATH = "./img/btn_start_game/btnStartGame_hover.png";
const BUTTON_DISABLED_IMAGE_PATH =
    "./img/btn_start_game/btnStartGame_disabled.png";

const ButtonStartGame = ({
    opponentId,
    opponentMoney,
    opponentName,
    isDisabled,
    disabledReasonText,
}) => {
    const dispatch = useDispatch();
    const clickHandler = () => {
        dispatch(setOpponentId(opponentId));
        dispatch(setOpponentName(opponentName));
        dispatch(setMoneyOfOpponent(opponentMoney));
        dispatch(goToNextGameStage());
    };

    return (
        <Button
            promptText={"Начать игру с выбранным противником"}
            clickHandler={clickHandler}
            buttonActiveImagePath={BUTTON_ACTIVE_IMAGE_PATH}
            buttonHoverImagePath={BUTTON_HOVER_IMAGE_PATH}
            buttonDisabledImagePath={BUTTON_DISABLED_IMAGE_PATH}
            disabled={isDisabled}
            disabledReasonText={disabledReasonText}
        />
    );
};

export default ButtonStartGame;
