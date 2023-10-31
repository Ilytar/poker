import { useSelector } from "react-redux";
import { KEY_OPPONENT_REDUCER } from "../store/opponentReducer";

export default function useOpponent() {
    const opponent = useSelector((state) => {
        return state[KEY_OPPONENT_REDUCER][KEY_OPPONENT_REDUCER];
    });

    return opponent;
}
