import React from "react";
import Button from "../../../../base/button/Button";
import styles from "./BottomButton.module.scss";

const BUTTON_ACTIVE_IMAGE_PATH = "./img/btn_center/btnCenter_active.png";
const BUTTON_HOVER_IMAGE_PATH = "./img/btn_center/btnCenter_hover.png";
const BUTTON_DISABLED_IMAGE_PATH = BUTTON_ACTIVE_IMAGE_PATH;

const BottomButton = ({ promptText, buttonText, clickHandler }) => {
    return (
        <div className={styles.blockWithBottomButton}>
            <Button
                buttonActiveImagePath={BUTTON_ACTIVE_IMAGE_PATH}
                buttonDisabledImagePath={BUTTON_DISABLED_IMAGE_PATH}
                buttonHoverImagePath={BUTTON_HOVER_IMAGE_PATH}
                promptText={promptText}
                isDisabled={false}
                clickHandler={clickHandler}
                buttonText={buttonText}
            />
        </div>
    );
};

export default BottomButton;
