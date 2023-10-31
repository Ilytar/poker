const defaultState = {
    gameBank: 0,
};
const INCREASE_BANK = "INCREASE_BANK";
const RESET_BANK = "RESET_BANK";

export const gameBankReducer = (state = defaultState, action) => {
    switch (action.type) {
        case INCREASE_BANK:
            return {
                ...state,
                gameBank: state.gameBank + action.payload,
            };
        case RESET_BANK:
            return {
                ...state,
                gameBank: 0,
            };
        default:
            return state;
    }
};

export const increaseBank = (payload) => ({
    type: INCREASE_BANK,
    payload,
});

export const resetBank = () => ({
    type: RESET_BANK,
});
