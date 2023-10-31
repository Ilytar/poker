import React from "react";
import DiceList from "./dice/DiceList";
import {
    KEY_DICE_PLAYER_REDUCER,
    setPlayerUnselectedDiceAll,
} from "../../store/dicePlayerReducer";
import { setPlayerScore } from "../../store/playerReducer";
import {
    STAGE_PLAYER_FIRST_THROW,
    STAGE_PLAYER_SECOND_THROW,
} from "../../store/data/gameStages";

const PlayerDice = ({ geometry, material, size }) => {
    const dicePlayerListKey = KEY_DICE_PLAYER_REDUCER;
    return (
        <DiceList
            geometry={geometry}
            material={material}
            size={size}
            diceProfileListKey={dicePlayerListKey}
            setProfileScore={setPlayerScore}
            keyFirstThrow={STAGE_PLAYER_FIRST_THROW}
            keySecondThrow={STAGE_PLAYER_SECOND_THROW}
            setProfileUnselectedDiceAll={setPlayerUnselectedDiceAll}
            isPlayerDice
        />
    );
};

export default PlayerDice;
