import useGameStage from "./useGameStage";

export default function useOneOfStagesCorrespondsToCurrentStage(...stages) {
    // Нужна для условной отрисовки компонентов или элементов компонентов
    // Получает массив игровых стадий и возвращает true, если одна из переданных стадий соответсвует текущей игровой
    const { gameStage } = useGameStage();
    for (let stage of stages) {
        if (stage === gameStage) {
            return true;
        }
    }
    return false;
}
