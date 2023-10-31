import createDiceList from "./createDiceList";

// TODO СМЕЩЕНИЕ В ПРОТИВПОЛОЖН СТОРОНУ, СИЛА В ПРОТИВОПОЛЖН СТОРОНУ
const DICE_KEY = "DARK";
const height = 0.72;
const diceDarkStartPosition = [
    [-0.153, height, 1.225],
    [-0.628, height, 1.19],
    [-1.104, height, 1.081],
    [-1.534, height, 0.896],
    [-1.913, height, 0.618],
];
const diceOpponentList = createDiceList(
    DICE_KEY,
    diceDarkStartPosition,
    [1, 1, 0.4]
);

export default diceOpponentList;
