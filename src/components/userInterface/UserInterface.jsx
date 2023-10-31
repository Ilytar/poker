import React from "react";
import PlayerMoney from "./components/playerMoney/PlayerMoney";
import BlockWithButtonThrowDice from "./components/blockWithButtonThrowDice/BlockWithButtonThrowDice";
import RightBotDecor from "./components/rightBotDecor/RightBotDecor";
import GameStageVisual from "./components/gameStageVisual/GameStageVisual";
import GameStageText from "./components/gameStageText/GameStageText";
import CenterBlock from "./components/centerBlock/CenterBlock";
import useOneOfStagesCorrespondsToCurrentStage from "../../hooks/useOneOfStagesCorrespondsToCurrentStage";
import {
    STAGE_GAME_START,
    STAGE_OPPONENT_MAKES_BET,
    STAGE_PLAYER_CHOICE_OPPONENT,
    STAGE_RESULTS_OF_FIRST_THROW,
    STAGE_RESULT_OF_ROUND,
} from "../../store/data/gameStages";

const UserInterface = () => {
    return (
        <>
            <PlayerMoney />
            {!useOneOfStagesCorrespondsToCurrentStage(
                STAGE_PLAYER_CHOICE_OPPONENT
            ) && <BlockWithButtonThrowDice />}
            <RightBotDecor />
            <GameStageVisual />

            <GameStageText />
            {useOneOfStagesCorrespondsToCurrentStage(
                STAGE_GAME_START,
                STAGE_RESULT_OF_ROUND,
                STAGE_RESULTS_OF_FIRST_THROW,
                STAGE_OPPONENT_MAKES_BET
            ) && <CenterBlock />}
        </>
    );
};

export default UserInterface;
