import { useSelector } from "react-redux";
import { KEY_PLAYER_REDUCER } from "../store/playerReducer";

export default function usePlayer() {
    const player = useSelector((state) => {
        return state[KEY_PLAYER_REDUCER][KEY_PLAYER_REDUCER];
    });

    return player;
}
