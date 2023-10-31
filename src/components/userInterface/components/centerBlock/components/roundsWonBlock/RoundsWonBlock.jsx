import React, { useEffect, useState } from "react";
import CountOfRoundsWon from "./countOfRoundsWon/CountOfRoundsWon";
import RoundsWonTextBlock from "./roundsWonTextBlock/RoundsWonTextBlock";
import { useSelector } from "react-redux";
import { KEY_PLAYER_REDUCER } from "../../../../../../store/playerReducer";
import { KEY_OPPONENT_REDUCER } from "../../../../../../store/opponentReducer";

const icoSize = 50;

function generateWonImagesPositionsToPlayer(
    imageCount,
    topStartPosition = 35,
    leftStartPosition = -20
) {
    const positions = [];
    for (let i = 0; i < imageCount; i++) {
        const x =
            i === 0 ? leftStartPosition : positions[i - 1].x + icoSize / 2;
        const y = i === 0 ? topStartPosition : positions[i - 1].y + 12;
        const zIndex = i + 1;

        positions.push({ y, x, zIndex });
    }

    return positions;
}

const RoundsWonBlock = () => {
    const playerRoundsWinCount = useSelector((state) => {
        return state[KEY_PLAYER_REDUCER][KEY_PLAYER_REDUCER].roundsWinCount;
    });

    const opponentRoundsWinCount = useSelector((state) => {
        return state[KEY_OPPONENT_REDUCER][KEY_OPPONENT_REDUCER].roundsWinCount;
    });
    // Нужно использовать useState, иначе компонент получит значения из хранилища и не обновит их при их изменеии
    const [playerWins, setPlayerWins] = useState(0);
    const [opponentWins, setOpponentWins] = useState(0);

    // Получаем обновленное количество побед для каждого игрока
    useEffect(() => {
        setPlayerWins(playerRoundsWinCount);
        setOpponentWins(opponentRoundsWinCount);
    }, [playerRoundsWinCount, opponentRoundsWinCount]);
    return (
        <>
            {generateWonImagesPositionsToPlayer(playerWins).map(
                (position, index) => (
                    <CountOfRoundsWon
                        key={index}
                        top={position.y}
                        left={position.x}
                        zIndex={position.zIndex}
                        icoHeight={icoSize}
                    />
                )
            )}

            <RoundsWonTextBlock />
            {generateWonImagesPositionsToPlayer(opponentWins).map(
                (position, index) => (
                    <CountOfRoundsWon
                        key={index}
                        top={position.y}
                        right={position.x}
                        zIndex={position.zIndex}
                        icoHeight={icoSize}
                    />
                )
            )}
        </>
    );
};

export default RoundsWonBlock;
