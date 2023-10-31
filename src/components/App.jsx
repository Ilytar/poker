import React, { useEffect, useState } from "react";
import Game from "./game/Game";
import UserInterface from "./userInterface/UserInterface";
import LoadingScreen from "./loadingScreen/LoadingScreen";
import StartWindow from "./userInterface/components/startWindow/StartWindow";
import useGameStage from "../hooks/useGameStage";
import { STAGE_PLAYER_CHOICE_OPPONENT } from "../store/data/gameStages";
import Menu from "./menu/Menu";
import usePlayer from "../hooks/usePlayer";
import { opponents } from "../store/opponents/opponents";

function App() {
    const [start, setStart] = useState(false);
    const { gameStage } = useGameStage();
    const player = usePlayer();

    useEffect(() => {
        localStorage.setItem("playerMoney", player.money);
    }, [player.money]);

    useEffect(() => {
        const beforeUnloadHandler = () => {
            opponents.saveOpponentsInLocalStorage();
        };

        window.addEventListener("beforeunload", beforeUnloadHandler);

        return () => {
            window.removeEventListener("beforeunload", beforeUnloadHandler);
        };
    }, []);

    return (
        <>
            <Menu />
            {start && <UserInterface />}
            {start && gameStage !== STAGE_PLAYER_CHOICE_OPPONENT && <Game />}
            {gameStage === STAGE_PLAYER_CHOICE_OPPONENT && <StartWindow />}
            {!start && <LoadingScreen onStartHandler={setStart} />}
        </>
    );
}

export default App;
