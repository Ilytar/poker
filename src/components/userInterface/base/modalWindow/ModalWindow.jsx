import React from "react";
import styles from "./ModalWindow.module.scss";
import classNames from "classnames";

const ModalWindow = ({ active, setActive, children }) => {
    const classes = classNames(styles.modal, {
        [styles.modal_active]: active,
    });
    return (
        <div className={classes} onClick={setActive}>
            <div
                className={styles.content}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};

export default ModalWindow;
