import React, { useEffect, useState } from "react";
import ButtonIncreaseBet from "../../buttons/buttonIncreaseBet/ButtonIncreaseBet";
import useGameStage from "../../../../../../hooks/useGameStage";
import {
    STAGE_GAME_START,
    STAGE_OPPONENT_MAKES_BET,
    STAGE_RESULTS_OF_FIRST_THROW,
} from "../../../../../../store/data/gameStages";
import usePlayer from "../../../../../../hooks/usePlayer";
import useOpponent from "../../../../../../hooks/useOpponent";
import { opponents } from "../../../../../../store/opponents/opponents";
import { useDispatch } from "react-redux";
import { goToNextGameStage } from "../../../../../../store/gameStateReducer";
import { getCombinationPower } from "../../../../../../combinations/getCombination";

const BUTTON_BIG_BET_ACTIVE_PATH = "./img/btn_bet/bigBet_active.png";
const BUTTON_BIG_BET_HOVER_PATH = "./img/btn_bet/bigBet_hover.png";
const BUTTON_BIG_BET_DISABLED_PATH = "./img/btn_bet/bigBet_disabled.png";
const BUTTON_MEDIUM_BET_ACTIVE_PATH = "./img/btn_bet/mediumBet_active.png";
const BUTTON_MEDIUM_BET_HOVER_PATH = "./img/btn_bet/mediumBet_hover.png";
const BUTTON_MEDIUM_BET_DISABLED_PATH = "./img/btn_bet/mediumBet_disabled.png";
const BUTTON_SMALL_BET_ACTIVE_PATH = "./img/btn_bet/smallBet_active.png";
const BUTTON_SMALL_BET_HOVER_PATH = "./img/btn_bet/smallBet_hover.png";
const BUTTON_SMALL_BET_DISABLED_PATH = "./img/btn_bet/smallBet_disabled.png";

const BlockWithButtonsIncreaseBet = () => {
    const dispatch = useDispatch();
    const playerData = usePlayer();
    const opponentData = useOpponent();
    const { gameStage } = useGameStage();
    const [bet, setBet] = useState({ small: 0, medium: 0, big: 0 });

    useEffect(() => {
        if (gameStage === STAGE_GAME_START) {
            const startBet = opponents
                .getOpponetById(opponentData.id)
                .generateStartBet();
            setBet(startBet);
        }

        if (gameStage === STAGE_RESULTS_OF_FIRST_THROW) {
            const bet = opponents
                .getOpponetById(opponentData.id)
                .generateBetAfterFirsThrowOfRound();
            setBet(bet);
        }

        if (gameStage === STAGE_OPPONENT_MAKES_BET) {
            const playerPower = getCombinationPower(
                Object.values(playerData.combinations)
            );
            const opponentPower = getCombinationPower(
                Object.values(opponentData.combinations)
            );
            const bet = opponents
                .getOpponetById(opponentData.id)
                .generateOptionalBet(playerPower, opponentPower);

            if (!bet) {
                dispatch(goToNextGameStage());
            } else {
                // переход к следующей стадии осуществляется нажатием на кнопку
                setBet(bet);
            }
        }
    }, [gameStage]);
    return (
        <>
            <ButtonIncreaseBet
                betValue={bet.small}
                buttonActiveImagePath={BUTTON_SMALL_BET_ACTIVE_PATH}
                buttonHoverImagePath={BUTTON_SMALL_BET_HOVER_PATH}
                buttonDisabledImagePath={BUTTON_SMALL_BET_DISABLED_PATH}
            />
            <ButtonIncreaseBet
                betValue={bet.medium}
                buttonHoverImagePath={BUTTON_MEDIUM_BET_HOVER_PATH}
                buttonActiveImagePath={BUTTON_MEDIUM_BET_ACTIVE_PATH}
                buttonDisabledImagePath={BUTTON_MEDIUM_BET_DISABLED_PATH}
            />
            <ButtonIncreaseBet
                betValue={bet.big}
                buttonActiveImagePath={BUTTON_BIG_BET_ACTIVE_PATH}
                buttonHoverImagePath={BUTTON_BIG_BET_HOVER_PATH}
                buttonDisabledImagePath={BUTTON_BIG_BET_DISABLED_PATH}
            />
        </>
    );
};

export default BlockWithButtonsIncreaseBet;
