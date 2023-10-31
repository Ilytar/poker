import React from "react";
import CenterBlockTitle from "./centerBlockTitle/CenterBlockTitle";
import BlockWithButtonsIncreaseBet from "../components/blockWithButtonsIncreaseBet/BlockWithButtonsIncreaseBet";
import ExitButton from "../buttons/ExitButton";
import ContentWrapper from "./contentWrapper/ContentWrapper";

const StartGame = () => {
    return (
        <>
            <CenterBlockTitle titleText={"Начать игру"} />
            <ContentWrapper
                isOneBlock
                content={<BlockWithButtonsIncreaseBet />}
            />
            <ExitButton />
        </>
    );
};
export default StartGame;
