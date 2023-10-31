import React from "react";
import styles from "./BlockWithButtonThrowDice.module.scss";
import Button from "../../base/button/Button";
import useGameStage from "../../../../hooks/useGameStage";
import useOneOfStagesCorrespondsToCurrentStage from "../../../../hooks/useOneOfStagesCorrespondsToCurrentStage";
import {
    STAGE_PLAYER_CHOOSE_DICE_TO_THROW,
    STAGE_ROUND_START,
} from "../../../../store/data/gameStages";

const BUTTON_ACTIVE_IMAGE_PATH = "./img/btn_throw_dice/btnThrow_active.png";
const BUTTON_HOVER_IMAGE_PATH = "./img/btn_throw_dice/btnThrow_hover.png";
const BUTTON_DISABLED_IMAGE_PATH = "./img/btn_throw_dice/btnThrow_disabled.png";

const BlockWithButtonThrowDice = () => {
    const { goToNextGameStage } = useGameStage();
    let clickHandler = () => {
        goToNextGameStage();
    };

    const isAllowThrow = useOneOfStagesCorrespondsToCurrentStage(
        STAGE_ROUND_START,
        STAGE_PLAYER_CHOOSE_DICE_TO_THROW
    );

    return (
        <div className={styles.block}>
            <Button
                buttonActiveImagePath={BUTTON_ACTIVE_IMAGE_PATH}
                buttonDisabledImagePath={BUTTON_DISABLED_IMAGE_PATH}
                buttonHoverImagePath={BUTTON_HOVER_IMAGE_PATH}
                promptText={"Бросить кости"}
                disabled={!isAllowThrow}
                clickHandler={clickHandler}
            />
        </div>
    );
};

export default BlockWithButtonThrowDice;
