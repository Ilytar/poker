import React, { useEffect, useState } from "react";
import CenterBlockTitle from "./centerBlockTitle/CenterBlockTitle";
import TopSectionWrapper from "./contentWrapper/topSectionWrapper/TopSectionWrapper";
import ThrowResultsOfPlayers from "../components/throwResult/ThrowResultsOfPlayers";
import { useDispatch, useSelector } from "react-redux";
import {
    addMoneyToPlayer,
    setPlayerRoundWin,
} from "../../../../../store/playerReducer";
import {
    addMoneyToOpponent,
    setOpponentRoundWin,
} from "../../../../../store/opponentReducer";

import NextRoundButton from "../buttons/NextRoundButton";
import ExitButton from "../buttons/ExitButton";
import ContentWrapper from "./contentWrapper/ContentWrapper";
import RoundsWonBlock from "../components/roundsWonBlock/RoundsWonBlock";
import BottomSectionWrapper from "./contentWrapper/bottomSectionWrapper/BottomSectionWrapper";
import { getCombinationPower } from "../../../../../combinations/getCombination";
import {
    OPPONENT_WIN,
    PLAYER_WIN,
    whoWin,
} from "../../../../../combinations/whoWin";
import { opponents } from "../../../../../store/opponents/opponents";
import useOpponent from "../../../../../hooks/useOpponent";
import usePlayer from "../../../../../hooks/usePlayer";

const ResultOfRound = () => {
    const [isGame, setIsGame] = useState(true);

    const bank = useSelector((state) => {
        return state.gameBank.gameBank;
    });

    const dispatch = useDispatch();
    const player = usePlayer();
    const opponent = useOpponent();

    const playerCombination = getCombinationPower(
        Object.values(player.combinations)
    );
    const opponentCombination = getCombinationPower(
        Object.values(opponent.combinations)
    );
    const resultOfRound = whoWin(playerCombination, opponentCombination);

    const [message, setMessage] = useState("Ничья");

    const countRoundToWin = opponents.getOpponetById(
        opponent.id
    ).countRoundToWin;
    // Победитель в игре
    useEffect(() => {
        if (player.roundsWinCount === countRoundToWin) {
            dispatch(addMoneyToPlayer(bank));
            opponents.getOpponetById(opponent.id).addMoney((-1 * bank) / 2);
            setIsGame(false);
        }
        if (opponent.roundsWinCount === countRoundToWin) {
            dispatch(addMoneyToOpponent(bank));
            opponents.getOpponetById(opponent.id).addMoney(bank);
            setIsGame(false);
        }
    }, [opponent.roundsWinCount, player.roundsWinCount]);

    // Обработка победителя в текущем раунде
    useEffect(() => {
        if (resultOfRound === OPPONENT_WIN) {
            setMessage(player.name + " проиграл!");
            dispatch(setOpponentRoundWin());
        }
        if (resultOfRound === PLAYER_WIN) {
            setMessage(player.name + " выиграл!");
            dispatch(setPlayerRoundWin());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resultOfRound]);

    return (
        <>
            <CenterBlockTitle titleText={message} />
            <ContentWrapper
                content={
                    <>
                        <TopSectionWrapper
                            content={<ThrowResultsOfPlayers />}
                        />
                        <BottomSectionWrapper content={<RoundsWonBlock />} />
                    </>
                }
            />

            {isGame ? <NextRoundButton /> : <ExitButton />}
        </>
    );
};

export default ResultOfRound;
