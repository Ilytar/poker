import React from "react";
import styles from "./NavButton.module.scss";
import classNames from "classnames";

const NavButton = ({ type, handleClick }) => {
    const buttonClasses = classNames(styles.navButton, {
        [styles.navButton_left]: type === "left",
        [styles.navButton_right]: type === "right",
    });

    const imageClasses = classNames(styles.image, {
        [styles.image_left]: type === "left",
        [styles.image_right]: type === "right",
    });

    return (
        <div className={buttonClasses} onClick={handleClick}>
            <div
                className={imageClasses}
                style={{ backgroundImage: `url("./img/arrows/arrow.png")` }}
            ></div>
        </div>
    );
};

export default NavButton;
