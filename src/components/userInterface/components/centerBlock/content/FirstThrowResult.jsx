import React from "react";
import CenterBlockTitle from "./centerBlockTitle/CenterBlockTitle";
import BlockWithButtonsIncreaseBet from "../components/blockWithButtonsIncreaseBet/BlockWithButtonsIncreaseBet";
import TopSectionWrapper from "./contentWrapper/topSectionWrapper/TopSectionWrapper";

import ThrowResultsOfPlayers from "../components/throwResult/ThrowResultsOfPlayers";
import ExitButton from "../buttons/ExitButton";
import ContentWrapper from "./contentWrapper/ContentWrapper";
import BottomSectionWrapper from "./contentWrapper/bottomSectionWrapper/BottomSectionWrapper";
import useGameStage from "../../../../../hooks/useGameStage";
import { STAGE_RESULTS_OF_FIRST_THROW } from "../../../../../store/data/gameStages";

const FirstThrowResult = () => {
    const { gameStage } = useGameStage();
    return (
        <>
            <CenterBlockTitle
                titleText={
                    gameStage === STAGE_RESULTS_OF_FIRST_THROW
                        ? "Хотите поднять ставку?"
                        : "Заявка оппонента"
                }
            />
            <ContentWrapper
                content={
                    <>
                        <TopSectionWrapper
                            content={
                                <ThrowResultsOfPlayers isShowBank={false} />
                            }
                        />

                        <BottomSectionWrapper
                            content={<BlockWithButtonsIncreaseBet />}
                        />
                    </>
                }
            />
            <ExitButton
                buttonText={"Пас"}
                promptText={"Выйти из раунда и потерять ставку"}
            />
        </>
    );
};

export default FirstThrowResult;
