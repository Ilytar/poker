import React from "react";
import styles from "./GameStageVisual.module.scss";
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

const IMG_GAME_START = "./img/game_stage_visual/gameStart.png";
const IMG_BET_AND_RESULTS = "./img/game_stage_visual/betAndResults.png";
const IMG_CHOOSE_DICE = "./img/game_stage_visual/chooseDice.png";
const IMG_OPPONENT_THINK = "./img/game_stage_visual/opponentThink.png";
const IMG_THROW_DICE = "./img/game_stage_visual/throwDice.png";

const GameStageVisual = () => {
    let imagePath = "";
    if (
        useOneOfStagesCorrespondsToCurrentStage(
            STAGE_GAME_START,
            STAGE_ROUND_START
        )
    ) {
        imagePath = IMG_GAME_START;
    }
    if (
        useOneOfStagesCorrespondsToCurrentStage(
            STAGE_PLAYER_FIRST_THROW,
            STAGE_PLAYER_SECOND_THROW,
            STAGE_OPPONENT_FIRST_THROW,
            STAGE_OPPONENT_SECOND_THROW
        )
    ) {
        imagePath = IMG_THROW_DICE;
    }

    if (
        useOneOfStagesCorrespondsToCurrentStage(
            STAGE_RESULTS_OF_FIRST_THROW,
            STAGE_RESULT_OF_ROUND
        )
    ) {
        imagePath = IMG_BET_AND_RESULTS;
    }
    if (
        useOneOfStagesCorrespondsToCurrentStage(
            STAGE_PLAYER_CHOOSE_DICE_TO_THROW
        )
    ) {
        imagePath = IMG_CHOOSE_DICE;
    }

    if (
        useOneOfStagesCorrespondsToCurrentStage(
            STAGE_OPPONENT_CHOOSE_DICE_TO_THROW,
            STAGE_OPPONENT_MAKES_BET,
            STAGE_OPPONENT_THINK,
            STAGE_PLAYER_CHOICE_OPPONENT
        )
    ) {
        imagePath = IMG_OPPONENT_THINK;
    }
    return (
        <div className={styles.block}>
            <img src={imagePath} alt="" />
        </div>
    );
};

export default GameStageVisual;
