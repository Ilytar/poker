import { useDispatch, useSelector } from "react-redux";
import { goToNextGameStage } from "../store/gameStateReducer";

export default function useGameStage() {
    const gameStage = useSelector((state) => state.gameStage.gameStage);
    const dispatch = useDispatch();
    const nextStageDispatch = () => {
        dispatch(goToNextGameStage());
    };
    return { goToNextGameStage: nextStageDispatch, gameStage: gameStage };
}
