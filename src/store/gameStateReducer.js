import createGameStageGenerator from "./data/gameStageGenerator";
import { STAGE_GAME_END } from "./data/gameStages";

// инициализируем переменную-генератор с помощью let чтобы иметь возможность изменить ей ссылку на другой генератор
let gameStageGenerator = createGameStageGenerator();

const defaultState = {
    gameStage: gameStageGenerator.next().value,
};
const GO_TO_NEXT_GAME_STAGE = "GO_TO_NEXT_STAGE";

export const gameStagesReducer = (state = defaultState, action) => {
    switch (action.type) {
        case GO_TO_NEXT_GAME_STAGE:
            return {
                ...state,
                gameStage: action.payload,
            };
        default:
            return state;
    }
};

export const goToNextGameStage = () => ({
    type: GO_TO_NEXT_GAME_STAGE,
    payload: gameStageGenerator.next().value,
});

export const goToGameEndStage = () => ({
    type: GO_TO_NEXT_GAME_STAGE,
    payload: STAGE_GAME_END,
});

export const resetGameStage = () => {
    // записываем в переменную новую ссылку на генератор, тем самым начиная генерировать этапы по новой
    gameStageGenerator = createGameStageGenerator();
    return {
        type: GO_TO_NEXT_GAME_STAGE,
        payload: gameStageGenerator.next().value,
    };
};
