export function createDiceListReducer(defaultState) {
    const STORE_KEY = Object.keys(defaultState)[0];
    // Нужно делать уникальные action.type чтобы не вызывались action у другого редуктора, полученного с помощью этой функции
    const SET_SELECT = "SET_SELECT" + STORE_KEY;
    const SET_NOT_SELECT_ALL = "SET_NOT_SELECT_ALL" + STORE_KEY;
    const SET_SELECT_ALL = "SET_SELECT_ALL" + STORE_KEY;
    const diceListReducer = (state = defaultState, action) => {
        switch (action.type) {
            case SET_SELECT:
                return {
                    ...state,
                    [STORE_KEY]: state[STORE_KEY].map((dice) => {
                        if (action.payload === dice.id) {
                            return {
                                ...dice,
                                isSelect: !dice.isSelect,
                            };
                        } else {
                            return {
                                ...dice,
                            };
                        }
                    }),
                };

            case SET_NOT_SELECT_ALL:
                return {
                    ...state,
                    [STORE_KEY]: state[STORE_KEY].map((dice) => {
                        return {
                            ...dice,
                            isSelect: false,
                        };
                    }),
                };

            case SET_SELECT_ALL:
                return {
                    ...state,
                    [STORE_KEY]: state[STORE_KEY].map((dice) => {
                        return {
                            ...dice,
                            isSelect: true,
                        };
                    }),
                };
            default:
                return state;
        }
    };

    const setPlayerUnselectedDiceAll = (payload) => ({
        type: SET_NOT_SELECT_ALL,
        payload,
    });
    const setPlayerSelectedDiceAll = (payload) => ({
        type: SET_SELECT_ALL,
        payload,
    });
    const setPlayerSelectedDice = (payload) => ({ type: SET_SELECT, payload });

    return {
        diceListReducer,
        setPlayerSelectedDice,
        setPlayerUnselectedDiceAll,
        setPlayerSelectedDiceAll,
    };
}
