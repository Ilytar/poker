export default function createDiceList(
    diceKey,
    positionArray,
    positionToThrow,
    isPlayerDice = false
) {
    return positionArray.map((position, index) => {
        return {
            id: diceKey + index,
            position: position,
            positionToThrow: [
                (isPlayerDice ? -index : index) * 0.1 + positionToThrow[0],
                index * 0.25 + positionToThrow[1],
                positionToThrow[2],
            ],
            positionInit: [0, -10, 0],
            rotation: [0, 0, 0],
            isSelect: true,
        };
    });
}
