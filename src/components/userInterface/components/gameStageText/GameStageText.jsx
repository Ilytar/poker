import React, { useState } from "react";
import styles from "./GameStageText.module.scss";
import useOneOfStagesCorrespondsToCurrentStage from "../../../../hooks/useOneOfStagesCorrespondsToCurrentStage";
import {
    STAGE_GAME_START,
    STAGE_OPPONENT_CHOOSE_DICE_TO_THROW,
    STAGE_OPPONENT_FIRST_THROW,
    STAGE_OPPONENT_MAKES_BET,
    STAGE_OPPONENT_SECOND_THROW,
    STAGE_OPPONENT_THINK,
    STAGE_PLAYER_CHOICE_OPPONENT,
    STAGE_PLAYER_CHOOSE_DICE_TO_THROW,
    STAGE_PLAYER_FIRST_THROW,
    STAGE_PLAYER_SECOND_THROW,
    STAGE_RESULTS_OF_FIRST_THROW,
    STAGE_RESULT_OF_ROUND,
    STAGE_ROUND_START,
} from "../../../../store/data/gameStages";

const IMAGE_PATH = "./img/game_stage_text_block/gameStageTextBlock.png";
const GameStageText = () => {
    let text = "Текст";
    if (useOneOfStagesCorrespondsToCurrentStage(STAGE_PLAYER_CHOICE_OPPONENT)) {
        text = "Выберите оппонента для игры";
    }
    if (useOneOfStagesCorrespondsToCurrentStage(STAGE_GAME_START)) {
        text = "Выбрать начальную ставку";
    }
    if (useOneOfStagesCorrespondsToCurrentStage(STAGE_ROUND_START)) {
        text = 'Нажмите кнопку "Бросить кости"';
    }
    if (
        useOneOfStagesCorrespondsToCurrentStage(
            STAGE_PLAYER_FIRST_THROW,
            STAGE_PLAYER_SECOND_THROW
        )
    ) {
        text = "Бросок";
    }
    if (
        useOneOfStagesCorrespondsToCurrentStage(
            STAGE_OPPONENT_FIRST_THROW,
            STAGE_OPPONENT_SECOND_THROW
        )
    ) {
        text = "Противник бросает";
    }
    if (useOneOfStagesCorrespondsToCurrentStage(STAGE_RESULTS_OF_FIRST_THROW)) {
        text = "Заявка";
    }

    if (useOneOfStagesCorrespondsToCurrentStage(STAGE_OPPONENT_MAKES_BET)) {
        text = "Заявка противника";
    }
    if (
        useOneOfStagesCorrespondsToCurrentStage(
            STAGE_PLAYER_CHOOSE_DICE_TO_THROW
        )
    ) {
        text = "Выберите кости для повторного броска";
    }
    if (
        useOneOfStagesCorrespondsToCurrentStage(
            STAGE_OPPONENT_CHOOSE_DICE_TO_THROW,
            STAGE_OPPONENT_THINK
        )
    ) {
        text = "Противник думает";
    }

    if (useOneOfStagesCorrespondsToCurrentStage(STAGE_RESULT_OF_ROUND)) {
        text = "Результаты";
    }
    return (
        <div className={styles.block}>
            {<img src={IMAGE_PATH} alt="" />}
            {text && <span className={styles.text}>{text}</span>}
        </div>
    );
};

export default GameStageText;
