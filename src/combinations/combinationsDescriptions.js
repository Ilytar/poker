// Описание комбинаций
export const COMBINATION_NONE = 0;
export const COMBINATION_PAIR = 1;
export const COMBINATION_TWO_PAIRS = 2;
export const COMBINATION_THREE_OF_KIND = 3;
export const COMBINATION_FIVE_HIGH_STRAIGHT = 4;
export const COMBINATION_SIX_HIGH_STRAIGHT = 5;
export const COMBINATION_FULL_HOUSE = 6;
export const COMBINATION_FOUR_OF_KIND = 7;
export const COMBINATION_FIVE_OF_KIND = 8;

// combination - сила комбинации (цифра)
export function getCombinationDescription(combination) {
    const folderPath = "./img/combinations/";

    switch (combination) {
        case COMBINATION_PAIR:
            return {
                title: "Пара",
                imagePath: folderPath + "Pair.png",
                description: "две кости одного достоинства (две шестёрки).",
            };
        case COMBINATION_TWO_PAIRS:
            return {
                title: "Две пары",
                imagePath: folderPath + "TwoPair.png",
                description:
                    "две пары костей одного достоинства каждая (две пятёрки и две шестёрки).",
            };
        case COMBINATION_THREE_OF_KIND:
            return {
                title: "Сет",
                imagePath: folderPath + "ThreeOfKind.png",
                description: "три кости одного достоинства (три шестёрки).",
            };
        case COMBINATION_FIVE_HIGH_STRAIGHT:
            return {
                title: "Малый стрейт",
                imagePath: folderPath + "FiveHighStraight.png",
                description:
                    "все кости разного достоинства в последовательности от 1 до 5.",
            };
        case COMBINATION_SIX_HIGH_STRAIGHT:
            return {
                title: "Большой стрейт",
                imagePath: folderPath + "SixHighStraight.png",
                description:
                    "все кости разного достоинства в последовательности от 2 до 6.",
            };
        case COMBINATION_FULL_HOUSE:
            return {
                title: "Фулл хаус",
                imagePath: folderPath + "FullHouse.png",
                description:
                    "пара и сет костей разных достоинств (две пятёрки и три шестёрки).",
            };
        case COMBINATION_FOUR_OF_KIND:
            return {
                title: "Каре",
                imagePath: folderPath + "FourOfKind.png",
                description:
                    "четыре кости одного достоинства (четыре шестёрки).",
            };
        case COMBINATION_FIVE_OF_KIND:
            return {
                title: "Покер",
                imagePath: folderPath + "FiveOfKind.png",
                description:
                    "все кости одного достоинства (пример: пять шестёрок).",
            };
        default:
            return {
                title: "Ничего",
                imagePath: folderPath + "Nothing.png",
                description:
                    "кости не образуют ни одну из перечисленных комбинаций",
            };
    }
}

export function getAllCombinationDescription() {
    const combinations = [
        COMBINATION_NONE,
        COMBINATION_PAIR,
        COMBINATION_TWO_PAIRS,
        COMBINATION_THREE_OF_KIND,
        COMBINATION_FIVE_HIGH_STRAIGHT,
        COMBINATION_SIX_HIGH_STRAIGHT,
        COMBINATION_FULL_HOUSE,
        COMBINATION_FOUR_OF_KIND,
        COMBINATION_FIVE_OF_KIND,
    ];

    return combinations.map((combination) =>
        getCombinationDescription(combination)
    );
}
