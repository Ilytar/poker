import { createProfileReducer } from "./createReducers/createProfileReducer";
import createProfile from "./data/createProfile";

// action = {type:"", payload:""}
const KEY_PLAYER_REDUCER = "player";
const defaultPlayerState = {
    [KEY_PLAYER_REDUCER]: createProfile(
        "geralt",
        "Геральт",
        localStorage.getItem("playerMoney") || 1000
    ),
};

const profile = createProfileReducer(defaultPlayerState);
export { KEY_PLAYER_REDUCER };
export const playerReducer = profile.profileReducer;
export const addMoneyToPlayer = profile.addMoneyToProfile;
export const setMoneyOfPlayer = profile.setMoneyOfProfile;
export const removeMoneyFromPlayer = profile.removeMoneyFromProfile;
export const setPlayerScore = profile.setProfileScore;
export const setPlayerRoundWin = profile.setProfileRoundWin;
export const resetPlayerWin = profile.resetProfileWin;
