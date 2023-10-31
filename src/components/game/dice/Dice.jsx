import React, { useState } from "react";
import { useBox } from "@react-three/cannon";

import { useFrame } from "@react-three/fiber";
import { useDispatch, useSelector } from "react-redux";
import { setPlayerSelectedDice } from "../../../store/dicePlayerReducer";
import {
    STAGE_OPPONENT_MAKES_BET,
    STAGE_PLAYER_CHOOSE_DICE_TO_THROW,
    STAGE_RESULTS_OF_FIRST_THROW,
    STAGE_RESULT_OF_ROUND,
} from "../../../store/data/gameStages";
import { getScore, getRotationByScore } from "./getScore";
import useOneOfStagesCorrespondsToCurrentStage from "../../../hooks/useOneOfStagesCorrespondsToCurrentStage";

const isDiceStatic = (velocity) => {
    const EPSILON = 0.01;
    const isStatic =
        Math.abs(velocity[0]) < EPSILON &&
        Math.abs(velocity[1]) < EPSILON &&
        Math.abs(velocity[2]) < EPSILON;
    return isStatic;
};

function Dice({
    geometry,
    material,
    size,
    position,
    rotation,
    idDice,
    isSelect,
    addScoreInList,
    positionToThrow,
    positionInit,
    keyFirstThrow,
    keySecondThrow,
    isPlayerDice,
    startThrowTime,
}) {
    let [geometryRef, api] = useBox(() => ({
        mass: 0,
        position: positionInit,
        args: size,
        sleepTimeLimit: 0.1,
        rotation: rotation,
        allowSleep: true,
        type: "Dynamic",
    }));
    const dispatch = useDispatch();
    const [currentQuaternion, setCurrentQuaternion] = useState([]);
    // сила должна применять 1 раз в начале броска
    const [isForceApplied, setIsForceApplied] = useState(false);
    // в начале игры стартовая позиция кубиков - в пустоте, а в слудующих раундах - доска

    const force = 0.5 + 0.5 * Math.random();

    // задание начальной позиции для броска и случайного вращение должно происходить 1 раз
    const [isMoved, setIsMoved] = useState(false);
    const gameStage = useSelector((state) => state.gameStage.gameStage);
    const [isInit, setIsInit] = useState(true);

    const [isDiceNeedToFreeze, setIsDiceNeedToFreeze] = useState(false);

    // используется чтобы при получении очков не проводить лишние вычисления в цикле
    const [isScoreGot, setIsScoreGot] = useState(false);

    const [rotationOnBoard, setRotationOnBoard] = useState([0, 0, 0]);

    const handleMouseOver = () => {
        document.body.style.cursor =
            "url('./img/cursor/Cursor_grab.png'), auto";
    };
    const handleMouseOut = () => {
        document.body.style.cursor = "";
    };

    const clickHandler = () => {
        dispatch(setPlayerSelectedDice(idDice));
    };

    const isInteractive =
        gameStage === STAGE_PLAYER_CHOOSE_DICE_TO_THROW && isPlayerDice;

    useFrame(() => {
        api.wakeUp();
        if (gameStage === keyFirstThrow || gameStage === keySecondThrow) {
            setIsInit(false);
            if (isSelect && !isScoreGot) {
                api.mass.set(1);
                // подготовка положения и вражения кубика к броску
                if (!isMoved) {
                    api.position.set(
                        positionToThrow[0],
                        positionToThrow[1],
                        positionToThrow[2]
                    );
                    api.rotation.set(
                        2 * Math.PI * Math.random(),
                        0,
                        2 * Math.PI * Math.random()
                    );
                    setIsMoved(true);
                }

                const quaternionUnSub = api.quaternion.subscribe(
                    (quaternion) => {
                        setCurrentQuaternion(quaternion);
                        quaternionUnSub();
                    }
                );

                if (!isForceApplied) {
                    if (isPlayerDice) {
                        api.applyImpulse(
                            [1.5 * force, -force, force / 2],
                            [0, 0, 0.1]
                        );
                    } else {
                        api.applyImpulse(
                            [-1.5 * force, force, -force / 2],
                            [0, 0, 0.1]
                        );
                    }

                    setIsForceApplied(true);
                }

                const velocityUnSub = api.velocity.subscribe((velocity) => {
                    let score = null;
                    if (isDiceStatic(velocity)) {
                        score = getScore(currentQuaternion, false);
                    }
                    // если время вышло, округляем углы и получаем очки
                    if (Date.now() - startThrowTime > 15_000 && !score) {
                        score = getScore(currentQuaternion, true);
                    }

                    if (score) {
                        setRotationOnBoard(getRotationByScore(score));
                        addScoreInList(idDice, score);
                        setIsDiceNeedToFreeze(true);
                        setIsScoreGot(true);
                    }
                    // если кубик имел очень маленькую скорость и не были получены очки, значит он ещё не завершил своё движение
                    else {
                        api.allowSleep = false;
                        api.wakeUp();
                    }
                    velocityUnSub();
                });
            }
        } else if (isInit) {
            api.position.set(positionInit[0], positionInit[1], positionInit[2]);
        } else {
            // выполняем операции заморозки 1 раз чтобы не нагружать useFrame
            if (isDiceNeedToFreeze) {
                api.allowSleep = true;

                api.rotation.set(
                    rotationOnBoard[0],
                    rotationOnBoard[1],
                    rotationOnBoard[2]
                );
                api.position.set(position[0], position[1], position[2]);

                setIsMoved(false);
                setIsForceApplied(false);
                setIsDiceNeedToFreeze(false);

                api.mass.set(0);
                api.sleep();
                setIsScoreGot(false);
            }
        }
    });

    const isNeedToLight = useOneOfStagesCorrespondsToCurrentStage(
        STAGE_PLAYER_CHOOSE_DICE_TO_THROW,
        STAGE_RESULT_OF_ROUND,
        STAGE_OPPONENT_MAKES_BET,
        STAGE_RESULTS_OF_FIRST_THROW
    );

    return (
        <>
            {isSelect && isNeedToLight && (
                <pointLight
                    position={position}
                    intensity={4}
                    decay={1}
                    distance={1 / 6}
                    color={"yellow"}
                    power={888}
                />
            )}
            <group ref={geometryRef}>
                <mesh
                    onClick={isInteractive && clickHandler}
                    geometry={geometry}
                    material={material}
                    onPointerOver={isInteractive && handleMouseOver}
                    onPointerOut={isInteractive && handleMouseOut}
                />
            </group>
        </>
    );
}

export default Dice;
