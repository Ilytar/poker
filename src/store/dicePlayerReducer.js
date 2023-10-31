import { createDiceListReducer } from "./createReducers/createDiceListReducer";
import { dicePlayerList } from "./data/dicePlayerList";

const KEY_DICE_PLAYER_REDUCER = "dicePlayerList";
const defaultState = { [KEY_DICE_PLAYER_REDUCER]: dicePlayerList };
const diceList = createDiceListReducer(defaultState);

export { KEY_DICE_PLAYER_REDUCER };
export const dicePlayerReducer = diceList.diceListReducer;
export const setPlayerSelectedDice = diceList.setPlayerSelectedDice;
export const setPlayerUnselectedDiceAll = diceList.setPlayerUnselectedDiceAll;
export const setPlayerSelectedDiceAll = diceList.setPlayerSelectedDiceAll;
