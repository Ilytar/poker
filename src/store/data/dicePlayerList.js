import createDiceList from "./createDiceList";

const DICE_KEY = "LIGHT";
const height = 0.72;
const diceLightStartPosition = [
    [0.153, height, -1.225],
    [0.628, height, -1.19],
    [1.104, height, -1.081],
    [1.534, height, -0.896],
    [1.913, height, -0.618],
];
const dicePlayerList = createDiceList(
    DICE_KEY,
    diceLightStartPosition,
    [-1, 1, -0.4],
    true
);

export { diceLightStartPosition, dicePlayerList };
