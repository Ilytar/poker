import { findDiceToRerolling, getIdsDiceToRerollByScoreList } from "./utils";

export function getIdsDiceToRerollingByUsingMathematicalExpectation(
    resultOfThrow
) {
    const rerollDiceList = findDiceToRerolling(resultOfThrow);
    return getIdsDiceToRerollByScoreList(resultOfThrow, rerollDiceList);
}

export function getRandomIdsDiceToRerolling(throwData) {
    const result = [];
    for (let diceId of Object.keys(throwData)) {
        if (Math.random() >= 0.5) {
            result.push(diceId);
        }
    }
    return result;
}

export function getZeroIdsDiceToRerolling() {
    return [];
}

export function getAllIdsDiceToRerolling(throwData) {
    return Object.keys(throwData);
}
export function getIdsDiceToGetStraightToRerolling(throwData) {
    const five = [];
    const six = [];
    let FiveHighStraightCombination = [1, 2, 3, 4, 5];
    let SixHighStraightCombination = [2, 3, 4, 5, 6];
    for (let [diceId, diceScore] of Object.entries(throwData)) {
        if (FiveHighStraightCombination.includes(diceScore)) {
            five.push(diceId);
            FiveHighStraightCombination = FiveHighStraightCombination.filter(
                (el) => el !== diceScore
            );
        }
        if (SixHighStraightCombination.includes(diceScore)) {
            six.push(diceId);
            SixHighStraightCombination = SixHighStraightCombination.filter(
                (el) => el !== diceScore
            );
        }
    }
    // актуально для комбинации типа { l1: 1, l2: 1, l3: 2, l4: 2, l5: 6 };
    if (five.length > six.length) {
        return Object.keys(throwData).filter(
            (diceId) => !five.includes(diceId)
        );
    }
    return Object.keys(throwData).filter((diceId) => !six.includes(diceId));
}

export function getIdsDiceToGetSameScores(throwData) {
    // старается получить комбинацию из одинаковых очков
    const result = [];
    let maxCount = 0;
    let maxScore = 0;
    let scoresCount = {};
    for (let diceScore of Object.values(throwData)) {
        if (scoresCount[diceScore]) {
            scoresCount[diceScore] = scoresCount[diceScore] + 1;
            if (scoresCount[diceScore] > maxCount) {
                maxCount = scoresCount[diceScore];
                maxScore = diceScore;
            }
            if (scoresCount[diceScore] === maxCount) {
                if (diceScore > maxScore) {
                    maxScore = diceScore;
                }
            }
        } else {
            scoresCount[diceScore] = 1;
            if (scoresCount[diceScore] > maxCount) {
                maxCount = scoresCount[diceScore];
                maxScore = diceScore;
            }
            if (scoresCount[diceScore] === maxCount) {
                if (diceScore > maxScore) {
                    maxScore = diceScore;
                }
            }
        }
    }

    for (const [idDice, diceScore] of Object.entries(throwData)) {
        if (diceScore !== maxScore) {
            result.push(idDice);
        }
    }

    return result;
}
