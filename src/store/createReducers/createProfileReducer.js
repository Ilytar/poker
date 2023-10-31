export function createProfileReducer(defaultState) {
    const STORE_KEY = Object.keys(defaultState)[0];
    const ADD_MONEY = "ADD_MONEY" + STORE_KEY;
    const REMOVE_MONEY = "REMOVE_MONEY" + STORE_KEY;
    const SET_COMBINATIONS = "SET_COMBINATIONS" + STORE_KEY;
    const SET_ROUND_WIN = "SET_ROUND_RESULT" + STORE_KEY;
    const RESET_WIN = "RESET_WIN" + STORE_KEY;
    const SET_ID = "SET_ID" + STORE_KEY;
    const SET_MONEY = "SET_MONEY" + STORE_KEY;
    const SET_NAME = "SET_NAME" + STORE_KEY;

    const profileReducer = (state = defaultState, action) => {
        switch (action.type) {
            case ADD_MONEY:
                return {
                    ...state,
                    [STORE_KEY]: {
                        ...state[STORE_KEY],
                        money: state[STORE_KEY].money + action.payload,
                    },
                };
            case REMOVE_MONEY:
                return {
                    ...state,
                    [STORE_KEY]: {
                        ...state[STORE_KEY],
                        money: state[STORE_KEY].money - action.payload,
                    },
                };
            case SET_MONEY:
                return {
                    ...state,
                    [STORE_KEY]: {
                        ...state[STORE_KEY],
                        money: action.payload,
                    },
                };
            case SET_COMBINATIONS:
                return {
                    ...state,
                    [STORE_KEY]: {
                        ...state[STORE_KEY],
                        combinations: {
                            ...state[STORE_KEY].combinations,
                            [action.payload.id]: action.payload.score,
                        },
                    },
                };
            case SET_ROUND_WIN:
                return {
                    ...state,
                    [STORE_KEY]: {
                        ...state[STORE_KEY],
                        roundsWinCount:
                            state[STORE_KEY].roundsWinCount + action.payload,
                    },
                };
            case RESET_WIN:
                return {
                    ...state,
                    [STORE_KEY]: {
                        ...state[STORE_KEY],
                        roundsWinCount: 0,
                    },
                };
            case SET_ID:
                return {
                    ...state,
                    [STORE_KEY]: {
                        ...state[STORE_KEY],
                        id: action.payload,
                    },
                };
            case SET_NAME:
                return {
                    ...state,
                    [STORE_KEY]: {
                        ...state[STORE_KEY],
                        name: action.payload,
                    },
                };
            default:
                return state;
        }
    };

    const addMoneyToProfile = (payload) => ({ type: ADD_MONEY, payload });
    const setMoneyOfProfile = (payload) => ({ type: SET_MONEY, payload });
    const removeMoneyFromProfile = (payload) => ({
        type: REMOVE_MONEY,
        payload,
    });
    const setProfileScore = (payload) => ({
        type: SET_COMBINATIONS,
        payload,
    });
    const setProfileRoundWin = (payload = 1) => ({
        type: SET_ROUND_WIN,
        payload,
    });
    const resetProfileWin = () => ({
        type: RESET_WIN,
    });
    const setProfileId = (payload) => ({
        type: SET_ID,
        payload,
    });
    const setProfileName = (payload) => ({
        type: SET_NAME,
        payload,
    });
    return {
        profileReducer,
        addMoneyToProfile,
        setMoneyOfProfile,
        removeMoneyFromProfile,
        setProfileScore,
        setProfileRoundWin,
        resetProfileWin,
        setProfileId,
        setProfileName,
    };
}
