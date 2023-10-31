import React from "react";
import styles from "./Menu.module.scss";
import Button from "../userInterface/base/button/Button";
import ModalWindow from "../userInterface/base/modalWindow/ModalWindow";
import Info from "./info/Info";
import useModal from "../../hooks/useModal";
import Settings from "./settings/Settings";

const BUTTON_INFO_IMAGE_PATH = "./img/menuButtons/info_active.png";
const BUTTON_INFO_HOVER_IMAGE_PATH = "./img/menuButtons/info_hover.png";

const BUTTON_SETTINGS_IMAGE_PATH = "./img/menuButtons/settings_active.png";
const BUTTON_SETTINGS_HOVER_IMAGE_PATH = "./img/menuButtons/settings_hover.png";

const Menu = () => {
    const startModal = localStorage.getItem("startModal");
    let isModalShow = true;
    if (!startModal) {
        localStorage.setItem("startModal", "1");
    } else {
        startModal === "1" ? (isModalShow = true) : (isModalShow = false);
    }

    const {
        isModalOpen: isInfoModalOpen,
        modalToggleActivity: modalInfoToggleActive,
    } = useModal(isModalShow);

    const {
        isModalOpen: isSettingsModalOpen,
        modalToggleActivity: modalSettingsToggleActive,
    } = useModal();

    return (
        <>
            <div className={styles.wrapper}>
                <Button
                    buttonActiveImagePath={BUTTON_INFO_IMAGE_PATH}
                    buttonDisabledImagePath={BUTTON_INFO_IMAGE_PATH}
                    buttonHoverImagePath={BUTTON_INFO_HOVER_IMAGE_PATH}
                    promptText={"Обучение"}
                    clickHandler={modalInfoToggleActive}
                />
                <Button
                    buttonActiveImagePath={BUTTON_SETTINGS_IMAGE_PATH}
                    buttonDisabledImagePath={BUTTON_SETTINGS_IMAGE_PATH}
                    buttonHoverImagePath={BUTTON_SETTINGS_HOVER_IMAGE_PATH}
                    promptText={"Настройки"}
                    clickHandler={modalSettingsToggleActive}
                />
            </div>

            <ModalWindow
                active={isInfoModalOpen}
                setActive={modalInfoToggleActive}
            >
                <Info />
            </ModalWindow>

            <ModalWindow
                active={isSettingsModalOpen}
                setActive={modalSettingsToggleActive}
            >
                <Settings />
            </ModalWindow>
        </>
    );
};

export default Menu;
