import {
    getAllIdsDiceToRerolling,
    getIdsDiceToGetSameScores,
    getIdsDiceToGetStraightToRerolling,
    getIdsDiceToRerollingByUsingMathematicalExpectation,
    getRandomIdsDiceToRerolling,
    getZeroIdsDiceToRerolling,
} from "../../combinations/findDiceToReroll";
import { Opponent, Opponents } from "./opponents.class";

const opponents = new Opponents(
    new Opponent({
        id: Opponents.HAREN,
        image: "./img/opponents/haren.png",
        name: "Харен",
        initMoney: 300,
        money: 300,
        betsDescription: "низкие",
        countRoundToWin: 1,
        tacticDescription: "не перебрасывает кости",
        minimalBet: 10,
        selectDiceToRerollFunction: getZeroIdsDiceToRerolling,
    }),
    new Opponent({
        id: Opponents.ODO,
        image: "./img/opponents/odo.png",
        name: "Одо",
        initMoney: 500,
        money: 500,
        betsDescription: "низкие",
        countRoundToWin: 2,
        tacticDescription: "перебрасывает случайные кости",
        minimalBet: 20,
        selectDiceToRerollFunction: getRandomIdsDiceToRerolling,
    }),
    new Opponent({
        id: Opponents.TALER,
        image: "./img/opponents/taler.png",
        name: "Талер",
        initMoney: 25000,
        money: 25000,
        betsDescription: "средние",
        countRoundToWin: 3,
        tacticDescription: "перебрасывает все кости",
        minimalBet: 200,
        selectDiceToRerollFunction: getAllIdsDiceToRerolling,
    }),
    new Opponent({
        id: Opponents.ZOLTAN,
        image: "./img/opponents/zoltan.png",
        name: "Золтан",
        initMoney: 30000,
        money: 30000,
        betsDescription: "средние",
        countRoundToWin: 3,
        tacticDescription:
            "перебрасывает кости так, чтобы получить б. или м. стрейт",
        minimalBet: 100,
        selectDiceToRerollFunction: getIdsDiceToGetStraightToRerolling,
    }),
    new Opponent({
        id: Opponents.KING,
        image: "./img/opponents/king.png",
        name: "Король Фольтест",
        initMoney: 125000,
        money: 125000,
        betsDescription: "высокие",
        countRoundToWin: 5,
        tacticDescription: "стремится получить комбинацию из одинаковых костей",
        minimalBet: 500,
        selectDiceToRerollFunction: getIdsDiceToGetSameScores,
    }),
    new Opponent({
        id: Opponents.GHOST,
        image: "./img/opponents/ghost.png",
        name: "Призрак игрока",
        initMoney: 77777,
        money: 77777,
        betsDescription: "высокие",
        countRoundToWin: 4,
        tacticDescription:
            "руководствуется принципами теории вероятности и комбинаторики",
        minimalBet: 300,
        selectDiceToRerollFunction:
            getIdsDiceToRerollingByUsingMathematicalExpectation,
    })
);

opponents.loadOpponentsDataFromLocalStorage();

export { opponents, Opponents };
