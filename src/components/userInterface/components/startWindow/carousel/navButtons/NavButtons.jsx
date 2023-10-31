import React from "react";
import NavButton from "./NavButton/NavButton";
import styles from "./NavButtons.module.scss";
import { useSwiper } from "swiper/react";

const NavButtons = () => {
    const swiper = useSwiper();

    return (
        <div className={styles.NavButtons}>
            <NavButton type={"left"} handleClick={() => swiper.slidePrev()} />
            <NavButton type={"right"} handleClick={() => swiper.slideNext()} />
        </div>
    );
};

export default NavButtons;
