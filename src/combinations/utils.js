import { getCombinationPower } from "./getCombination";
function getUniqueCombinationsAndItsProbability(countOfDiceRolled) {
    const combinations = [];
    const allSituationCount =
        findAllCountOfSituationOfRollingDice(countOfDiceRolled);
    // Вспомогательная рекурсивная функция для генерации сочетаний
    // numberOfRemainingPositionsToIncrease - количество оставшихся чисел, которые надо добавить к текущей комбинации
    function generateCombinations(
        currentCombination,
        numberOfRemainingPositionsToIncrease,
        start
    ) {
        if (numberOfRemainingPositionsToIncrease === 0) {
            const probability =
                findPermutations(currentCombination) / allSituationCount;
            combinations.push({
                combination: [...currentCombination],
                probability,
            });
            return;
        }

        for (let i = start; i <= 6; i++) {
            currentCombination.push(i);
            generateCombinations(
                currentCombination,
                numberOfRemainingPositionsToIncrease - 1,
                i
            );
            // pop откатывает текущую комбинацию до внесения нового элемента, таким образом push добавит новое значение в "подготовленный" массив
            currentCombination.pop();
        }
    }
    generateCombinations([], countOfDiceRolled, 1);

    return combinations;
}

// определяем числитель для нахождения вероятности выпадения комбинации
// числитель/количество_всех_исходов_при_перебрасывании_N_кубиков
function findPermutations(arr) {
    // реализация формулы n!/(n1!*n2!*...*nk!), где n - длина массива
    const n = arr.length;
    const elementCounts = new Map();

    // Считаем количество повторений каждого элемента в массиве
    for (const item of arr) {
        if (elementCounts.has(item)) {
            elementCounts.set(item, elementCounts.get(item) + 1);
        } else {
            elementCounts.set(item, 1);
        }
    }

    // Вычисляем произведение факториалов для каждого уникального элемента
    let denominator = 1;
    for (const count of elementCounts.values()) {
        denominator *= findFactorial(count);
    }

    // Вычисляем количество различных перестановок
    const permutations = findFactorial(n) / denominator;
    return permutations;
}

// две комбинации являются различающимися, если хотя бы в одной из них присутсвует как минимум 1 отличающаяся цифра (порядок неважен)
function isEqualCombinations(combination1, combination2) {
    if (combination1.length !== combination2.length) {
        return false;
    }

    combination1.sort();
    combination2.sort();

    for (let i = 0; i < combination1.length; i++) {
        if (combination1[i] !== combination2[i]) {
            return false;
        }
    }

    return true;
}
function findAllPossibleDiceRerollOptionsList(
    arr,
    index = 0,
    subset = [],
    result = new Set()
) {
    // Если индекс достигает конца массива, добавляем текущее подмножество в результат
    if (index === arr.length) {
        // Сортируем подмножество, чтобы избежать дубликатов
        const sortedSubset = [...subset].sort((a, b) => a - b);
        result.add(JSON.stringify(sortedSubset));
        return;
    }

    subset.push(arr[index]);
    findAllPossibleDiceRerollOptionsList(arr, index + 1, subset, result);

    /* subset.pop() используется для удаления последнего элемента из subset, чтобы вернуться к предыдущему состоянию subset перед 
    рассмотрением другой ветви рекурсии. Это нужно, чтобы не оставлять элементы в subset, 
    которые не должны быть включены в текущее подмножество.
     */
    subset.pop();
    findAllPossibleDiceRerollOptionsList(arr, index + 1, subset, result);
}

// Функция для получения уникальных множеств
function findPossibleDiceRerollOptionsList(arr) {
    const result = new Set();
    findAllPossibleDiceRerollOptionsList(arr, 0, [], result);
    return [...result].map((subset) => JSON.parse(subset));
}

function findAllCountOfSituationOfRollingDice(countDice) {
    const differentScrores = 6;
    return Math.pow(differentScrores, countDice);
}

function findFactorial(n) {
    let result = 1;
    while (n) {
        result *= n--;
    }
    return result;
}

function findUniqueCountOfSituationOfRollingDice(countDice) {
    const differentScrores = 6;

    return (
        findFactorial(differentScrores + countDice - 1) /
        (findFactorial(countDice) *
            findFactorial(differentScrores + countDice - 1 - countDice))
    );
}

// используется для формирования массива, для которого мы будем находить вероятности переброса входящих в него кубиков
function findArrayDifference(arr1, arr2) {
    const countMap = new Map();

    // Создаем карту для подсчета количества элементов в arr1
    for (const item of arr1) {
        if (countMap.has(item)) {
            countMap.set(item, countMap.get(item) + 1);
        } else {
            countMap.set(item, 1);
        }
    }

    // Уменьшаем количество элементов в arr1 на основе arr2
    for (const item of arr2) {
        if (countMap.has(item)) {
            countMap.set(item, countMap.get(item) - 1);
        }
    }

    // Создаем массив на основе оставшихся элементов в countMap
    const difference = [];
    for (const [item, count] of countMap) {
        for (let i = 0; i < count; i++) {
            difference.push(item);
        }
    }

    return difference;
}

function findDiceToRerolling(throwData) {
    // возвращает массив с очками кубиков, которые надо перебросить
    let resultOfThrow = [];
    if (Array.isArray(throwData)) {
        resultOfThrow = throwData;
    } else if (typeof throwData === "object") {
        resultOfThrow = Object.values(throwData);
    } else {
        throw new Error(
            "Нужно передать либо массив с результами броска каждого кубика, либо объект типа Id_кубика: очки"
        );
    }
    let maxCombinationPower = getCombinationPower(resultOfThrow);
    let diceToRerollingList = [];
    // все возможные варианты для повторного броска кубиков
    const diceRerollOptionsList =
        findPossibleDiceRerollOptionsList(resultOfThrow);
    // рассматриваем каждый вариант с целью получить его мат ожидание
    for (let diceRerollOption of diceRerollOptionsList) {
        // мат ожидание выигрыша, если из массива текущего броска мы перебросим кубики, содержащиеся в diceRerollOption
        let mathematicalExpectationOfRerollOption = 0;
        const arrayDifference = findArrayDifference(
            resultOfThrow,
            diceRerollOption
        );
        // находим все возможные уникальные исходы для перебрасывания n кубиков и их вероятности
        const differentDiceRerollResults =
            getUniqueCombinationsAndItsProbability(diceRerollOption.length);

        for (let i = 0; i < differentDiceRerollResults.length; i++) {
            // к каждому уникальному исходу перебрасывания n кубиков добавляем отрезанную часть от исходного массива с результатами броска
            differentDiceRerollResults[i].combination.push(...arrayDifference);
            mathematicalExpectationOfRerollOption +=
                getCombinationPower(differentDiceRerollResults[i].combination) *
                differentDiceRerollResults[i].probability;
        }

        // если найден оптимальный вариан для переброса кубиков, то добавить этот результат в возвращаемую переменную
        if (mathematicalExpectationOfRerollOption > maxCombinationPower) {
            maxCombinationPower = mathematicalExpectationOfRerollOption;
            diceToRerollingList = diceRerollOption;
        }
    }

    return diceToRerollingList;
}

function getIdsDiceToRerollByScoreList(resultOfThrow, scoreList) {
    // необходимо выбрать id в количестве scoreList.lenght
    const result = [];
    for (const [idDice, diceScore] of Object.entries(resultOfThrow)) {
        if (scoreList.includes(diceScore)) {
            result.push(idDice);
            // удаляем из scoreList совпавшее значение чтобы не выбрать лишние кубики
            scoreList = scoreList.filter((score) => score !== diceScore);
        }
    }
    return result;
}

export { findDiceToRerolling, getIdsDiceToRerollByScoreList };
