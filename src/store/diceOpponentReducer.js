import { createDiceListReducer } from "./createReducers/createDiceListReducer";
import diceOpponentList from "./data/diceOpponentList";

const KEY_DICE_OPPONENT_REDUCER = "diceOpponentList";
const defaultState = { [KEY_DICE_OPPONENT_REDUCER]: diceOpponentList };
const diceList = createDiceListReducer(defaultState);

export { KEY_DICE_OPPONENT_REDUCER };
export const diceOpponentReducer = diceList.diceListReducer;
export const setOpponentSelectedDice = diceList.setPlayerSelectedDice;
export const setOpponentUnselectedDiceAll = diceList.setPlayerUnselectedDiceAll;
export const setOpponentSelectedDiceAll = diceList.setPlayerSelectedDiceAll;
