import React from "react";
import BottomButton from "./bottomButton/BottomButton";
import { useDispatch } from "react-redux";
import { goToNextGameStage } from "../../../../../store/gameStateReducer";

const NextRoundButton = () => {
    const dispatch = useDispatch();
    const clickHandler = () => {
        dispatch(goToNextGameStage());
    };
    return (
        <BottomButton
            buttonText={"Следующий раунд"}
            promptText={"Начать следующий раунд"}
            clickHandler={clickHandler}
        />
    );
};

export default NextRoundButton;
