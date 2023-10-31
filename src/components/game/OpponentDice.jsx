import React from "react";
import {
    KEY_DICE_OPPONENT_REDUCER,
    setOpponentUnselectedDiceAll,
} from "../../store/diceOpponentReducer";
import { setOpponentScore } from "../../store/opponentReducer";
import {
    STAGE_OPPONENT_FIRST_THROW,
    STAGE_OPPONENT_SECOND_THROW,
} from "../../store/data/gameStages";
import DiceList from "./dice/DiceList";

const OpponentDice = ({ geometry, material, size }) => {
    const diceOpponentListKey = KEY_DICE_OPPONENT_REDUCER;
    return (
        <DiceList
            geometry={geometry}
            material={material}
            size={size}
            diceProfileListKey={diceOpponentListKey}
            setProfileScore={setOpponentScore}
            keyFirstThrow={STAGE_OPPONENT_FIRST_THROW}
            keySecondThrow={STAGE_OPPONENT_SECOND_THROW}
            setProfileUnselectedDiceAll={setOpponentUnselectedDiceAll}
        />
    );
};

export default OpponentDice;
