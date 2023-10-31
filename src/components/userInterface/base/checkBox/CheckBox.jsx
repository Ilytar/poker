import React, { useEffect, useRef, useState } from "react";
import useHover from "../../../../hooks/useHover";
import styles from "./CheckBox.module.scss";

const HOVER_IMAGE_PATH = "./img/checkbox/checkbox_hover.png";
const DEFAULT_IMAGE_PATH = "./img/checkbox/checkbox_active.png";
const CHECKED_IMAGE_PATH = "./img/checkbox/success.png";

const CheckBox = ({
    text,
    checked = false,
    checkHandler = () => {},
    noCheckHandler = () => {},
}) => {
    const checkBoxRef = useRef();
    const checkBoxIsHover = useHover(checkBoxRef);
    const [imagePath, setImagePath] = useState(DEFAULT_IMAGE_PATH);
    const [isChecked, setIsChecked] = useState(checked);

    const clickHandler = () => {
        setIsChecked((prev) => !prev);
    };

    useEffect(() => {
        if (checkBoxIsHover) {
            setImagePath(HOVER_IMAGE_PATH);
        } else {
            setImagePath(DEFAULT_IMAGE_PATH);
        }
    }, [checkBoxIsHover]);

    useEffect(() => {
        if (isChecked) {
            checkHandler();
        } else {
            noCheckHandler();
        }
    }, [checkHandler, isChecked, noCheckHandler]);

    return (
        <div
            ref={checkBoxRef}
            onClick={clickHandler}
            className={styles.container}
        >
            <div className={styles.imgContainer}>
                <img src={imagePath} alt="" />
                <div className={styles.check}>
                    {isChecked && <img src={CHECKED_IMAGE_PATH} alt="" />}
                </div>
            </div>
            <div>{text}</div>
        </div>
    );
};

export default CheckBox;
