import {
    STAGE_GAME_START,
    STAGE_ROUND_START,
    STAGE_PLAYER_FIRST_THROW,
    STAGE_OPPONENT_FIRST_THROW,
    STAGE_RESULTS_OF_FIRST_THROW,
    STAGE_PLAYER_CHOOSE_DICE_TO_THROW,
    STAGE_PLAYER_SECOND_THROW,
    STAGE_OPPONENT_CHOOSE_DICE_TO_THROW,
    STAGE_OPPONENT_SECOND_THROW,
    STAGE_RESULT_OF_ROUND,
    STAGE_PLAYER_CHOICE_OPPONENT,
    STAGE_OPPONENT_MAKES_BET,
    STAGE_OPPONENT_THINK,
} from "./gameStages";

function* createGameStageGenerator() {
    yield STAGE_PLAYER_CHOICE_OPPONENT;
    // Инициализация игры
    yield STAGE_GAME_START;
    // 11 этапов в раунде
    const gameStages = [
        STAGE_ROUND_START,
        STAGE_PLAYER_FIRST_THROW,
        STAGE_OPPONENT_FIRST_THROW,
        STAGE_RESULTS_OF_FIRST_THROW,
        STAGE_OPPONENT_THINK,
        // опциональная стадия
        STAGE_OPPONENT_MAKES_BET,

        STAGE_PLAYER_CHOOSE_DICE_TO_THROW,
        STAGE_PLAYER_SECOND_THROW,
        STAGE_OPPONENT_CHOOSE_DICE_TO_THROW,
        STAGE_OPPONENT_SECOND_THROW,
        STAGE_RESULT_OF_ROUND,
    ];

    let i = 0;
    while (true) {
        if (i > gameStages.length - 1) {
            i = 0;
        }
        yield gameStages[i];
        i++;
    }
}

export default createGameStageGenerator;
