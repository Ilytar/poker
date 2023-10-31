const NONE_WIN = 0;
const OPPONENT_WIN = 1;
const PLAYER_WIN = 2;

export function whoWin(playerCombinationPower, opponentCombinationPower) {
    if (playerCombinationPower > opponentCombinationPower) {
        return PLAYER_WIN;
    }
    if (playerCombinationPower < opponentCombinationPower) {
        return OPPONENT_WIN;
    }
    return NONE_WIN;
}
export { NONE_WIN, OPPONENT_WIN, PLAYER_WIN };
