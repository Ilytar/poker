import React, { forwardRef, useEffect, useRef, useState } from "react";

import styles from "./Prompt.module.scss";
import { usePrompt } from "../../../../hooks/usePrompt";
import classNames from "classnames";

const PROMPT_SHORT_IMAGE_PATH = "./img/prompt/promptShort.png";
const PROMPT_LONG_IMAGE_PATH = "./img/prompt/promptLong.png";

const Prompt = ({ text }) => {
    const [isVisible, setIsVisible] = useState(false);
    let imagePath = PROMPT_SHORT_IMAGE_PATH;
    if (text.length > 25) {
        imagePath = PROMPT_LONG_IMAGE_PATH;
    }
    const classes = classNames(styles.prompt, {
        [styles.prompt_visible]: isVisible,
    });
    const ref = useRef();
    const position = usePrompt(ref);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsVisible(true);
        }, 100);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div
            className={classes}
            style={{
                bottom: position.y,
                right: position.x,
            }}
            ref={ref}
        >
            {<img src={imagePath} alt="" />}
            {text && <span className={styles.text}>{text}</span>}
        </div>
    );
};

export default Prompt;
