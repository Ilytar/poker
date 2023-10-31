import React from "react";
import styles from "./ItemDescription.module.scss";

const ItemDescription = ({
    money,
    tacticDescription,
    betsDescription,
    playerNeedMoneyToPlay,
    countRoundToWin,
}) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.descriptionSection}>
                <span className={styles.descriptionProperty}>
                    Золото оппонента:
                </span>
                {money}
            </div>
            <div className={styles.descriptionSection}>
                <span className={styles.descriptionProperty}>
                    Мин. начальная ставка:
                </span>
                {playerNeedMoneyToPlay}
            </div>
            <div className={styles.descriptionSection}>
                <span className={styles.descriptionProperty}>Ставки:</span>
                {betsDescription}
            </div>
            <div className={styles.descriptionSection}>
                <span className={styles.descriptionProperty}>
                    Количество раундов для победы:
                </span>
                {countRoundToWin}
            </div>
            <div className={styles.descriptionSection}>
                <span className={styles.descriptionProperty}>Тактика:</span>
                {tacticDescription}
            </div>
        </div>
    );
};

export default ItemDescription;
