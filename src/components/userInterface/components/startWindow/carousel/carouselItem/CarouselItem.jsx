import React, { useEffect, useState } from "react";
import styles from "./CarouselItem.module.scss";
import classNames from "classnames";
import { useSwiperSlide } from "swiper/react";
import ItemDescription from "./itemDescription/ItemDescription";
import ButtonStartGame from "../buttonStartGame/ButtonStartGame";
import usePlayer from "../../../../../../hooks/usePlayer";

const CarouselItem = ({ slide }) => {
    const [isDisabled, setIsDisabled] = useState(slide.isNotReadyToPlay);
    const [disabledReason, setDisabledReason] = useState("");
    const { isActive } = useSwiperSlide();
    const classes = classNames(styles.carouselItem, {
        [styles.carouselItem_active]: isActive,
    });
    const player = usePlayer();

    useEffect(() => {
        if (slide.isNotReadyToPlay) {
            setIsDisabled(true);
            setDisabledReason("У оппонента недостаточно денег для ставок");
        }
        if (player.money <= slide.playerNeedMoneyToPlay) {
            setIsDisabled(true);
            setDisabledReason("У вас недостаточно денег для ставок");
        }
    }, [player.money, slide.isNotReadyToPlay, slide.playerNeedMoneyToPlay]);

    return (
        <div className={classes}>
            <div className={styles.title}>
                <span>{slide.name}</span>
            </div>
            {/* фон слайда */}
            <div className={styles.background}></div>

            <div className={styles.contentWrapper}>
                <div className={styles.imageWrapper}>
                    <div className={styles.imageLeft}>
                        <div
                            className={styles.image}
                            style={{ backgroundImage: `url(${slide.image})` }}
                        ></div>
                    </div>
                    <div className={styles.imageRight}>
                        <div
                            className={styles.image}
                            style={{ backgroundImage: `url(${slide.image})` }}
                        ></div>
                    </div>
                </div>

                <div className={styles.rightSection}>
                    <div className={styles.descriptionWrapper}>
                        <ItemDescription
                            money={slide.money}
                            tacticDescription={slide.tacticDescription}
                            betsDescription={slide.betsDescription}
                            playerNeedMoneyToPlay={slide.playerNeedMoneyToPlay}
                            countRoundToWin={slide.countRoundToWin}
                        />
                    </div>

                    <div className={styles.buttonWrapper}>
                        <ButtonStartGame
                            opponentId={slide.id}
                            opponentMoney={slide.money}
                            opponentName={slide.name}
                            isDisabled={isDisabled}
                            disabledReasonText={disabledReason}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarouselItem;
