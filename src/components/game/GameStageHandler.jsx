import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    STAGE_GAME_END,
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
} from "../../store/data/gameStages";
import {
    setPlayerSelectedDice,
    setPlayerSelectedDiceAll,
    setPlayerUnselectedDiceAll,
} from "../../store/dicePlayerReducer";
import { resetPlayerWin } from "../../store/playerReducer";
import {
    KEY_OPPONENT_REDUCER,
    resetOpponentWin,
} from "../../store/opponentReducer";
import {
    setOpponentSelectedDice,
    setOpponentSelectedDiceAll,
    setOpponentUnselectedDiceAll,
} from "../../store/diceOpponentReducer";
import { getCombinationScoreList } from "../../combinations/getCombination";
import {
    goToNextGameStage,
    resetGameStage,
} from "../../store/gameStateReducer";
import { opponents } from "../../store/opponents/opponents";
import { resetBank } from "../../store/gameBankReducer";
import usePlayer from "../../hooks/usePlayer";
import useOpponent from "../../hooks/useOpponent";

const GameStageHandler = () => {
    const gameStage = useSelector((state) => {
        return state.gameStage.gameStage;
    });
    const player = usePlayer();
    const opponent = useOpponent();

    const opponentCombinations = useSelector((state) => {
        return state[KEY_OPPONENT_REDUCER][KEY_OPPONENT_REDUCER].combinations;
    });

    const dispatch = useDispatch();

    const highlightDice = (scores, functionForSelect) => {
        // выбирает кубики, которые формируют комбинацию
        const combinationScoreList = getCombinationScoreList(
            Object.values(scores)
        );
        for (const key in scores) {
            if (combinationScoreList.includes(scores[key])) {
                dispatch(functionForSelect(key));
            }
        }
    };

    useEffect(() => {
        const playerScores = player.combinations;
        const opponentScores = opponent.combinations;

        switch (gameStage) {
            case STAGE_PLAYER_CHOICE_OPPONENT:
                break;

            case STAGE_GAME_START:
                break;

            case STAGE_ROUND_START:
                dispatch(setPlayerSelectedDiceAll());
                dispatch(setOpponentSelectedDiceAll());
                break;

            case STAGE_PLAYER_FIRST_THROW:
                break;

            case STAGE_OPPONENT_FIRST_THROW:
                break;

            case STAGE_RESULTS_OF_FIRST_THROW:
                highlightDice(playerScores, setPlayerSelectedDice);
                highlightDice(opponentScores, setOpponentSelectedDice);
                break;
            case STAGE_OPPONENT_THINK:
                setTimeout(() => {
                    dispatch(goToNextGameStage());
                }, 1000);
                break;
            // опциональные стадии
            case STAGE_OPPONENT_MAKES_BET:
                break;

            case STAGE_PLAYER_CHOOSE_DICE_TO_THROW:
                dispatch(setPlayerUnselectedDiceAll());
                dispatch(setOpponentUnselectedDiceAll());
                break;

            case STAGE_PLAYER_SECOND_THROW:
                break;

            case STAGE_OPPONENT_CHOOSE_DICE_TO_THROW:
                const idsDiceToReroll = opponents
                    .getOpponetById(opponent.id)
                    .selectDiceToReroll(opponentCombinations);
                idsDiceToReroll.forEach((diceKey) => {
                    dispatch(setOpponentSelectedDice(diceKey));
                });
                setTimeout(() => {
                    dispatch(goToNextGameStage());
                }, 1000);
                break;

            case STAGE_OPPONENT_SECOND_THROW:
                break;

            case STAGE_RESULT_OF_ROUND:
                highlightDice(playerScores, setPlayerSelectedDice);
                highlightDice(opponentScores, setOpponentSelectedDice);
                break;

            case STAGE_GAME_END:
                dispatch(resetPlayerWin());
                dispatch(resetOpponentWin());
                dispatch(resetGameStage());
                dispatch(resetBank());
                break;

            default:
                break;
        }
    }, [gameStage]);

    return null;
};

export default GameStageHandler;
