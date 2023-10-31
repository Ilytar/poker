import React from "react";
import styles from "./CenterBlock.module.scss";
import FirstThrowResult from "./content/FirstThrowResult";
import ResultOfRound from "./content/ResultOfRound";
import useOneOfStagesCorrespondsToCurrentStage from "../../../../hooks/useOneOfStagesCorrespondsToCurrentStage";
import {
    STAGE_GAME_START,
    STAGE_OPPONENT_MAKES_BET,
    STAGE_RESULTS_OF_FIRST_THROW,
    STAGE_RESULT_OF_ROUND,
} from "../../../../store/data/gameStages";
import StartGame from "./content/StartGame";

const BACKGROUND_IMAGE_PATH = "./img/center_block/centerBlockClear.png";
const BACKGROUND_IMAGE_WITH_MONEY_PATH =
    "./img/center_block/centerBlockMoney.png";

const CenterBlock = () => {
    let imagePath = BACKGROUND_IMAGE_PATH;

    if (useOneOfStagesCorrespondsToCurrentStage(STAGE_RESULT_OF_ROUND)) {
        imagePath = BACKGROUND_IMAGE_WITH_MONEY_PATH;
    }

    return (
        <div className={styles.block}>
            <img src={imagePath} alt="" />
            <div className={styles.innerWrap}>
                {useOneOfStagesCorrespondsToCurrentStage(STAGE_GAME_START) && (
                    <StartGame />
                )}
                {useOneOfStagesCorrespondsToCurrentStage(
                    STAGE_RESULTS_OF_FIRST_THROW,
                    STAGE_OPPONENT_MAKES_BET
                ) && <FirstThrowResult />}
                {useOneOfStagesCorrespondsToCurrentStage(
                    STAGE_RESULT_OF_ROUND
                ) && <ResultOfRound />}
            </div>
        </div>
    );
};

export default CenterBlock;
