import { isEqualArrays } from "../utils/utils";
import {
    COMBINATION_FIVE_HIGH_STRAIGHT,
    COMBINATION_FIVE_OF_KIND,
    COMBINATION_FOUR_OF_KIND,
    COMBINATION_FULL_HOUSE,
    COMBINATION_NONE,
    COMBINATION_PAIR,
    COMBINATION_SIX_HIGH_STRAIGHT,
    COMBINATION_THREE_OF_KIND,
    COMBINATION_TWO_PAIRS,
} from "./combinationsDescriptions";

export function getCombinationPowerAndScoreList(throwResultList) {
    const FiveHighStraightCombination = [1, 2, 3, 4, 5];
    const SixHighStraightCombination = [2, 3, 4, 5, 6];
    let scoresCount = {};
    // сколько раз выпало одно и тоже число
    throwResultList.forEach((throwResult) => {
        if (scoresCount[throwResult]) {
            scoresCount[throwResult] = scoresCount[throwResult] + 1;
        } else {
            scoresCount[throwResult] = 1;
        }
    });
    const scoresCountKeys = Object.keys(scoresCount).map((key) =>
        parseInt(key)
    );

    // возвращаемые переменные
    let combinationPower = COMBINATION_NONE; // сила комбинации рассчитывается как константа * 100 + число, образующее сильную подкомбинацию * 10 + число, образующее слабую подкомбинацию * 1
    // для фулл-хауса [1,1,1,6,6]: число сильной комбинации 1, а для слабой 6
    let combinationScoreList = []; // Массив из очков, которые формируют комбинацию

    // большой стрейт
    if (isEqualArrays(scoresCountKeys, FiveHighStraightCombination)) {
        combinationPower = COMBINATION_FIVE_HIGH_STRAIGHT * 100;
        combinationScoreList = [...FiveHighStraightCombination];
    }
    // малый стрейт
    if (isEqualArrays(scoresCountKeys, SixHighStraightCombination)) {
        combinationPower = COMBINATION_SIX_HIGH_STRAIGHT * 100;
        combinationScoreList = [...SixHighStraightCombination];
    }

    // scoreKey - цифра из комбинации
    // count - сколько раз эта цифра встретилась в комбинации
    for (let [scoreKey, count] of Object.entries(scoresCount)) {
        const score = parseInt(scoreKey);
        // Покер
        if (count === 5) {
            combinationPower = COMBINATION_FIVE_OF_KIND * 100 + score * 10;
            combinationScoreList.push(score);
        }
        // Каре
        if (count === 4) {
            combinationPower = COMBINATION_FOUR_OF_KIND * 100 + score * 10;
            combinationScoreList.push(score);
        }
        // Либо сет, либо фулл-хаус
        if (count === 3) {
            // если до этого нашли пару в комбианации, то будет фулл-хаус
            if (combinationPower > 100) {
                combinationPower +=
                    score * 10 +
                    (COMBINATION_FULL_HOUSE - COMBINATION_PAIR) * 100;
                combinationScoreList.push(score);
                // если до этого не было никаких комбинаций, получается сет
            } else {
                combinationPower = COMBINATION_THREE_OF_KIND * 100 + score * 10;
                combinationScoreList.push(score);
            }
        }
        // Либо пара, либо две пары, либо фулл-хаус
        if (count === 2) {
            // если раньше нашли сет, то будет фулл-хаус
            if (combinationPower > 300) {
                combinationPower +=
                    score * 1 +
                    (COMBINATION_FULL_HOUSE - COMBINATION_THREE_OF_KIND) * 100;
                combinationScoreList.push(score);
                // если раньше была пара, то получится две пары
            } else if (combinationPower > 100 && combinationPower < 200) {
                combinationPower +=
                    score * 1 +
                    (COMBINATION_TWO_PAIRS - COMBINATION_PAIR) * 100;
                combinationScoreList.push(score);
                // если до этого не было никаких комбинаций, то будет пара
            } else {
                combinationPower = COMBINATION_PAIR * 100 + score * 1;
                combinationScoreList.push(score);
            }
        }
    }
    return { combinationPower, combinationScoreList };
}

export function getCombinationPower(throwResultList) {
    const { combinationPower } =
        getCombinationPowerAndScoreList(throwResultList);
    return combinationPower;
}

export function getCombinationScoreList(throwResultList) {
    const { combinationScoreList } =
        getCombinationPowerAndScoreList(throwResultList);
    return combinationScoreList;
}
