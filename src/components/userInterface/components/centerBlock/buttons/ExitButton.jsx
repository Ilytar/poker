import React from "react";
import BottomButton from "./bottomButton/BottomButton";
import { goToGameEndStage } from "../../../../../store/gameStateReducer";
import { useDispatch } from "react-redux";

const ExitButton = ({ buttonText = "Выход", promptText = "Выйти из игры" }) => {
    const dispatch = useDispatch();
    const clickHandler = () => {
        dispatch(goToGameEndStage());
    };
    return (
        <BottomButton
            buttonText={buttonText}
            promptText={promptText}
            clickHandler={clickHandler}
        />
    );
};

export default ExitButton;
