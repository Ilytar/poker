import React, { useEffect, useRef, useState } from "react";
import styles from "./Button.module.scss";
import Prompt from "../prompt/Prompt";
import useHover from "../../../../hooks/useHover";

const Button = ({
    buttonText,
    promptText,
    disabledReasonText,
    buttonActiveImagePath,
    buttonHoverImagePath,
    buttonDisabledImagePath,
    disabled,
    clickHandler = () => {},
}) => {
    const [promptCurrentText, setPromptCurrentText] = useState("");

    const buttonRef = useRef();
    const buttonIsHover = useHover(buttonRef);

    let image = buttonActiveImagePath; // Изображение по умолчанию

    if (disabled) {
        image = buttonDisabledImagePath || image;
    } else if (buttonIsHover && !disabled) {
        image = buttonHoverImagePath || image;
    }

    useEffect(() => {
        if (disabled) {
            setPromptCurrentText(disabledReasonText);
        } else {
            setPromptCurrentText(promptText);
        }
    }, [disabled, disabledReasonText, promptText]);

    return (
        <button
            className={styles.button}
            onClick={clickHandler}
            ref={buttonRef}
            disabled={disabled}
        >
            <img src={image} alt="" />
            {buttonText && <span className={styles.text}>{buttonText}</span>}
            {buttonIsHover && promptCurrentText && (
                <Prompt text={promptCurrentText} />
            )}
        </button>
    );
};

export default Button;
