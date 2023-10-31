import React from "react";
import styles from "./ContentWrapper.module.scss";
import classNames from "classnames";

const ContentWrapper = ({ content, isOneBlock = false }) => {
    // isOneBlock используется когда внутри центрального блока только кнопки для повышения ставки
    const classes = classNames(styles.content, {
        [styles.row]: isOneBlock,
    });

    return <div className={classes}>{content}</div>;
};

export default ContentWrapper;
