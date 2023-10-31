import React from "react";
import InfoItem from "../infoItem/InfoItem";
import CombinationDescription from "./combinationDescription/CombinationDescription";
import { getAllCombinationDescription } from "../../../../combinations/combinationsDescriptions";

const Combinations = () => {
    const combinationsList = getAllCombinationDescription();

    return (
        <InfoItem title={"Комбинации"}>
            <div>
                <p>Старшинство комбинаций на костях:</p>
                <div>
                    {combinationsList.map((combination, _) => (
                        <CombinationDescription
                            key={_}
                            title={combination.title}
                            imagePath={combination.imagePath}
                            description={combination.description}
                        />
                    ))}
                </div>
            </div>
            <div>
                <p>
                    Если у противников выпадает одна и та же комбинация, победа
                    присуждается игроку с большим количеством очков в
                    комбинации. Если комбинации у игрока и соперника одного
                    достоинства, объявляется ничья.
                </p>
            </div>
        </InfoItem>
    );
};

export default Combinations;
