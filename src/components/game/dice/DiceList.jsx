import React, { useEffect, useState } from "react";
import Dice from "./Dice";
import { useDispatch, useSelector } from "react-redux";
import useGameStage from "../../../hooks/useGameStage";

const DiceList = ({
    geometry,
    material,
    size,
    diceProfileListKey,
    setProfileScore,
    keyFirstThrow,
    keySecondThrow,
    setProfileUnselectedDiceAll,
    isPlayerDice = false,
}) => {
    const dispatch = useDispatch();
    const { goToNextGameStage, gameStage } = useGameStage();

    // сюда передаётся ключ
    const diceProfileList = useSelector(
        (state) => state[diceProfileListKey][diceProfileListKey]
    );
    const [startThrowTime, setStartThrowTime] = useState(Date.now());
    const diceToThrow = {};
    diceProfileList.forEach((dice) => {
        if (dice.isSelect) {
            diceToThrow[dice.id] = null;
        }
    });
    const [scoreData, setScoreData] = useState(diceToThrow);

    useEffect(() => {
        const updatedIds = {};
        diceProfileList.forEach((dice) => {
            if (dice.isSelect) {
                updatedIds[dice.id] = null;
            }
        });
        setScoreData(updatedIds);
    }, [diceProfileList]);

    useEffect(() => {
        //
        if (gameStage === keyFirstThrow || gameStage === keySecondThrow) {
            setStartThrowTime(Date.now());
            const keys = Object.keys(scoreData);
            let isAllDiceGetScore = true;
            for (let key of keys) {
                if (!scoreData[key]) {
                    isAllDiceGetScore = false;
                }
            }

            if (isAllDiceGetScore) {
                for (let key of keys) {
                    dispatch(
                        setProfileScore({
                            id: key,
                            score: scoreData[key],
                        })
                    );
                }

                dispatch(setProfileUnselectedDiceAll(Object.keys(scoreData)));
                goToNextGameStage();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scoreData, gameStage, goToNextGameStage]);

    const addScoreInList = (id, score) => {
        setScoreData((prev) => {
            return { ...prev, [id]: score };
        });
    };

    return (
        <>
            {diceProfileList.map((dice) => {
                return (
                    <Dice
                        key={dice.id}
                        idDice={dice.id}
                        rotation={dice.rotation}
                        position={dice.position}
                        isSelect={dice.isSelect}
                        positionInit={dice.positionInit}
                        positionToThrow={dice.positionToThrow}
                        size={size}
                        geometry={geometry}
                        material={material}
                        keyFirstThrow={keyFirstThrow}
                        addScoreInList={addScoreInList}
                        keySecondThrow={keySecondThrow}
                        isPlayerDice={isPlayerDice}
                        startThrowTime={startThrowTime}
                    />
                );
            })}
        </>
    );
};

export default DiceList;
