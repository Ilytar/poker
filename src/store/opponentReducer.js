import { createProfileReducer } from "./createReducers/createProfileReducer";
import createProfile from "./data/createProfile";

const KEY_OPPONENT_REDUCER = "opponent";
const defaultOpponentState = {
    [KEY_OPPONENT_REDUCER]: createProfile("odo", "Бабка Шани"),
};

const profile = createProfileReducer(defaultOpponentState);
export { KEY_OPPONENT_REDUCER };
export const opponentReducer = profile.profileReducer;
export const addMoneyToOpponent = profile.addMoneyToProfile;
export const setMoneyOfOpponent = profile.setMoneyOfProfile;
export const removeMoneyFromOpponent = profile.removeMoneyFromProfile;
export const setOpponentScore = profile.setProfileScore;
export const setOpponentRoundWin = profile.setProfileRoundWin;
export const resetOpponentWin = profile.resetProfileWin;
export const setOpponentId = profile.setProfileId;
export const setOpponentName = profile.setProfileName;
