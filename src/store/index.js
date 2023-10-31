import { combineReducers, legacy_createStore as createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import {
    dicePlayerReducer,
    KEY_DICE_PLAYER_REDUCER,
} from "./dicePlayerReducer";
import { gameStagesReducer } from "./gameStateReducer";
import { KEY_PLAYER_REDUCER, playerReducer } from "./playerReducer";
import { KEY_OPPONENT_REDUCER, opponentReducer } from "./opponentReducer";
import {
    KEY_DICE_OPPONENT_REDUCER,
    diceOpponentReducer,
} from "./diceOpponentReducer";
import { gameBankReducer } from "./gameBankReducer";

const rootReducer = combineReducers({
    [KEY_DICE_PLAYER_REDUCER]: dicePlayerReducer,
    [KEY_DICE_OPPONENT_REDUCER]: diceOpponentReducer,
    gameStage: gameStagesReducer,
    gameBank: gameBankReducer,
    [KEY_OPPONENT_REDUCER]: opponentReducer,
    [KEY_PLAYER_REDUCER]: playerReducer,
});
export const store = createStore(rootReducer, composeWithDevTools());
