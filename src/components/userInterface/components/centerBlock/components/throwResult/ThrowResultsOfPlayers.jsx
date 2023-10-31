import React from "react";
import ThrowResult from "./ThrowResult";
import Bank from "../bank/Bank";
import { useSelector } from "react-redux";
import { KEY_PLAYER_REDUCER } from "../../../../../../store/playerReducer";
import { KEY_OPPONENT_REDUCER } from "../../../../../../store/opponentReducer";
import { getCombinationPower } from "../../../../../../combinations/getCombination";
import { getCombinationDescription } from "../../../../../../combinations/combinationsDescriptions";

const ThrowResultsOfPlayers = ({ isShowBank = true }) => {
    const playerData = useSelector((state) => {
        return state[KEY_PLAYER_REDUCER][KEY_PLAYER_REDUCER];
    });
    const playerName = playerData.name;
    const playerScores = playerData.combinations;
    const playerCombination = getCombinationPower(Object.values(playerScores));
    const playerCombinationDescription = getCombinationDescription(
        Math.floor(playerCombination / 100)
    );

    const opponentData = useSelector((state) => {
        return state[KEY_OPPONENT_REDUCER][KEY_OPPONENT_REDUCER];
    });
    const opponentName = opponentData.name;
    const opponentScores = opponentData.combinations;
    const opponentCombination = getCombinationPower(
        Object.values(opponentScores)
    );
    const opponentCombinationDescription = getCombinationDescription(
        Math.floor(opponentCombination / 100)
    );

    const bankValue = useSelector((state) => {
        return state.gameBank.gameBank;
    });

    return (
        <>
            <ThrowResult
                playerName={playerName}
                combinationText={playerCombinationDescription.title}
                combinationImagePath={playerCombinationDescription.imagePath}
            />

            {isShowBank && <Bank bankValue={bankValue} />}

            <ThrowResult
                playerName={opponentName}
                combinationText={opponentCombinationDescription.title}
                combinationImagePath={opponentCombinationDescription.imagePath}
            />
        </>
    );
};

export default ThrowResultsOfPlayers;
